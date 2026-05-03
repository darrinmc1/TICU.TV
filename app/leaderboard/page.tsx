import Link from "next/link"
import { SERIAL_STORIES } from "@/lib/serial-stories"
import { getChapterVoteSummary } from "@/lib/chapter-votes"

// Vote counts change with every cast; render on each request so users
// see live results rather than build-time-stale HTML.
export const dynamic = "force-dynamic"

type LeaderboardOption = {
  id: string
  title: string
  count: number
  percent: number
  isPreview: boolean
}

type LeaderboardChapter = {
  storyId: string
  storyTitle: string
  chapterSlug: string
  chapterLabel: string
  chapterTitle: string
  totalVotes: number
  options: LeaderboardOption[]
  isPreview: boolean
}

async function buildChapterLeaderboard(): Promise<LeaderboardChapter[]> {
  // Collect every chapter that has vote options into a flat list, then
  // run all the summary queries in parallel — much faster than awaiting
  // sequentially across many stories.
  const chapterTasks: Array<{
    story: ReturnType<typeof Object.values<typeof SERIAL_STORIES>>[number]
    chapter: typeof SERIAL_STORIES[string]["chapters"][number]
    optionIds: string[]
  }> = []

  for (const story of Object.values(SERIAL_STORIES)) {
    for (const chapter of story.chapters) {
      if (!chapter.voteOptions?.length) continue
      chapterTasks.push({
        story,
        chapter,
        optionIds: chapter.voteOptions.map((option) => option.id),
      })
    }
  }

  const summaries = await Promise.all(
    chapterTasks.map((task) =>
      getChapterVoteSummary(task.story.id, task.chapter.slug, task.optionIds)
    )
  )

  const rows: LeaderboardChapter[] = chapterTasks.map((task, i) => {
    const { story, chapter } = task
    const summary = summaries[i]
    const hasLiveVotes = summary.totalVotes > 0
    const previewBaseVotes = 1000

    const options = chapter.voteOptions!
      .map((option) => {
        if (hasLiveVotes) {
          const count = summary.counts[option.id] ?? 0
          const percent = Math.round((count / Math.max(summary.totalVotes, 1)) * 100)
          return {
            id: option.id,
            title: option.title,
            count,
            percent,
            isPreview: false,
          }
        }

        const percent = option.votePercent ?? Math.round(100 / chapter.voteOptions!.length)
        return {
          id: option.id,
          title: option.title,
          count: Math.round((percent / 100) * previewBaseVotes),
          percent,
          isPreview: true,
        }
      })
      .sort((a, b) => b.count - a.count)

    return {
      storyId: story.id,
      storyTitle: story.title,
      chapterSlug: chapter.slug,
      chapterLabel: chapter.label,
      chapterTitle: chapter.title,
      totalVotes: hasLiveVotes
        ? summary.totalVotes
        : options.reduce((sum, option) => sum + option.count, 0),
      options,
      isPreview: !hasLiveVotes,
    }
  })

  return rows.sort((a, b) => b.totalVotes - a.totalVotes)
}

export default async function LeaderboardPage() {
  const chapters = await buildChapterLeaderboard()

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">Leaderboard</p>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">Top Chapter Votes</h1>
            <p className="mt-3 text-white/70">
              Live chapter leaders across stories. Chapters without live votes show preview totals.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>

        <div className="space-y-4">
          {chapters.map((chapter) => {
            const leader = chapter.options[0]
            return (
              <section
                key={`${chapter.storyId}:${chapter.chapterSlug}`}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">{chapter.storyTitle}</p>
                    <h2 className="text-xl font-bold text-white">
                      {chapter.chapterLabel}: {chapter.chapterTitle}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{chapter.totalVotes.toLocaleString()} votes</p>
                    <p className="text-xs text-white/50">{chapter.isPreview ? "preview" : "live"}</p>
                  </div>
                </div>

                <div className="mb-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                  <p className="text-xs uppercase tracking-wider text-cyan-300">Current Leader</p>
                  <p className="mt-1 font-semibold text-white">{leader.title}</p>
                  <p className="text-sm text-cyan-200">{leader.percent}% ({leader.count.toLocaleString()} votes)</p>
                </div>

                <div className="space-y-2">
                  {chapter.options.map((option, index) => (
                    <div key={option.id} className="rounded-lg border border-white/10 bg-slate-950/40 p-3">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-white">
                          {index + 1}. {option.title}
                        </p>
                        <p className="text-xs text-white/60">
                          {option.percent}% · {option.count.toLocaleString()}
                        </p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${option.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
