import { getChapterVoteSummary } from "./chapter-votes"
import { SERIAL_STORIES } from "./serial-stories"
import {
  getStoryState,
  saveStoryState,
  StoryStateFile,
  ChapterTallyRecord,
} from "./story-state"

export type TallyReport = {
  storyId: string
  chapterSlug: string
  result: "winner" | "no-votes" | "skipped"
  winningOptionId?: string
  totalVotes: number
  nextChapterSlug?: string
  message: string
}

export async function runWeeklyTally(): Promise<TallyReport[]> {
  const reports: TallyReport[] = []

  for (const [storyId, story] of Object.entries(SERIAL_STORIES)) {
    // Determine which chapter is active for voting
    let state = await getStoryState(storyId)

    const activeChapterSlug =
      state?.activeChapterSlug ??
      story.chapters.find((ch) => ch.status === "voting")?.slug

    if (!activeChapterSlug) continue

    const activeChapter = story.chapters.find((ch) => ch.slug === activeChapterSlug)
    if (!activeChapter) continue
    if (!activeChapter.voteOptions || activeChapter.voteOptions.length === 0) continue

    // Build or hydrate state
    if (!state) {
      state = {
        storyId,
        activeChapterSlug,
        chapters: { [activeChapterSlug]: { status: "voting" } },
        tallyHistory: [],
        updatedAt: new Date().toISOString(),
      } satisfies StoryStateFile
    }

    const chapterState = state.chapters[activeChapterSlug]

    // Skip chapters already tallied this cycle
    if (chapterState?.status === "tallied") {
      reports.push({
        storyId,
        chapterSlug: activeChapterSlug,
        result: "skipped",
        totalVotes: chapterState.totalVotes ?? 0,
        message: `Already tallied — winner was "${chapterState.winningOptionId}"`,
      })
      continue
    }

    const optionIds = activeChapter.voteOptions.map((o) => o.id)
    const summary = await getChapterVoteSummary(storyId, activeChapterSlug, optionIds)

    if (summary.totalVotes === 0) {
      // No votes cast — story does NOT advance
      const weeksWithoutVotes = (chapterState?.weeksWithoutVotes ?? 0) + 1
      state.chapters[activeChapterSlug] = {
        ...(chapterState ?? {}),
        status: "voting",
        weeksWithoutVotes,
      }

      const record: ChapterTallyRecord = {
        runAt: new Date().toISOString(),
        chapterSlug: activeChapterSlug,
        result: "no-votes",
        totalVotes: 0,
        weeksWithoutVotes,
      }
      state.tallyHistory.push(record)
      state.updatedAt = new Date().toISOString()
      await saveStoryState(state)

      reports.push({
        storyId,
        chapterSlug: activeChapterSlug,
        result: "no-votes",
        totalVotes: 0,
        message: `No votes cast. Story stalled at "${activeChapterSlug}" (${weeksWithoutVotes} week${weeksWithoutVotes > 1 ? "s" : ""} without votes).`,
      })
    } else {
      // Votes found — record winner and advance
      const winningOptionId = summary.winningOptionId!

      state.chapters[activeChapterSlug] = {
        status: "tallied",
        winningOptionId,
        totalVotes: summary.totalVotes,
        tallyDate: new Date().toISOString(),
      }

      // Find next chapter
      const chapterIndex = story.chapters.findIndex((ch) => ch.slug === activeChapterSlug)
      const nextChapter = story.chapters[chapterIndex + 1]

      if (nextChapter) {
        state.activeChapterSlug = nextChapter.slug
        if (!state.chapters[nextChapter.slug]) {
          state.chapters[nextChapter.slug] = { status: "voting" }
        }
      } else {
        state.activeChapterSlug = null // Story complete
      }

      const record: ChapterTallyRecord = {
        runAt: new Date().toISOString(),
        chapterSlug: activeChapterSlug,
        result: "winner",
        winningOptionId,
        totalVotes: summary.totalVotes,
      }
      state.tallyHistory.push(record)
      state.updatedAt = new Date().toISOString()
      await saveStoryState(state)

      reports.push({
        storyId,
        chapterSlug: activeChapterSlug,
        result: "winner",
        winningOptionId,
        totalVotes: summary.totalVotes,
        nextChapterSlug: nextChapter?.slug,
        message: `Winner: "${winningOptionId}" with ${summary.totalVotes} vote${summary.totalVotes !== 1 ? "s" : ""}. ${nextChapter ? `Next chapter unlocked: "${nextChapter.slug}"` : "Story complete — all chapters tallied."}`,
      })
    }
  }

  return reports
}
