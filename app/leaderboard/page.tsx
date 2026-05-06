import Link from "next/link"
import { Trophy, BarChart3, ArrowLeft, Eye, Activity } from "lucide-react"
import { getAllStories, type SerialStory, type StoryChapter } from "@/lib/content"
import { getChapterVoteSummary, type ChapterVoteSummary } from "@/lib/chapter-votes"

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
    story: SerialStory
    chapter: StoryChapter
    optionIds: string[]
  }> = []

  for (const story of Object.values(await getAllStories())) {
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
      getChapterVoteSummary(task.story.id, task.chapter.slug, task.optionIds).catch((error): ChapterVoteSummary => {
        console.error(`Failed to fetch votes for ${task.story.id}/${task.chapter.slug}:`, error)
        return {
          counts: {},
          totalVotes: 0,
          winningOptionId: null,
          userVote: null,
        }
      })
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

function ChapterLeaderboardCard({ chapter }: { chapter: LeaderboardChapter }) {
  const leader = chapter.options[0]

  return (
    <section className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-slate-900/80">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400/80">
            {chapter.storyTitle}
          </p>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {chapter.chapterLabel}: {chapter.chapterTitle}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-950/50 px-3 py-1 ring-1 ring-white/10">
            <span className="text-sm font-semibold text-white">
              {chapter.totalVotes.toLocaleString()}
            </span>
            <span className="text-xs text-white/50">votes</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-white/40">
            {chapter.isPreview ? (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </>
            ) : (
              <>
                <Activity className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400/80">Live</span>
              </>
            )}
          </div>
        </div>
      </div>

      {leader && (
        <div className="mb-5 relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-4 shadow-inner">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Trophy className="h-24 w-24 text-cyan-300" />
          </div>
          <div className="relative z-10">
            <div className="mb-1 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-cyan-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                Current Leader
              </p>
            </div>
            <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
              {leader.title}
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="font-bold text-cyan-200">{leader.percent}%</span>
              <span className="text-cyan-200/60">({leader.count.toLocaleString()} votes)</span>
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-3" role="list">
        {chapter.options.map((option, index) => (
          <li
            key={option.id}
            className="group/item relative overflow-hidden rounded-xl border border-white/5 bg-slate-950/40 p-4 transition-colors hover:bg-slate-950/60"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <p className="text-sm font-medium leading-snug text-white/90">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs text-white/60">
                  {index + 1}
                </span>
                {option.title}
              </p>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{option.percent}%</p>
                <p className="text-xs text-white/50">{option.count.toLocaleString()}</p>
              </div>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-slate-800/50"
              role="progressbar"
              aria-valuenow={option.percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${option.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function LeaderboardPage() {
  const chapters = await buildChapterLeaderboard()

  return (
    <main className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Leaderboard
              </p>
            </div>
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Top Chapter Votes
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/60">
              Live standings across all active stories. See how your favorite choices are performing in real-time.
            </p>
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:pr-6"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {chapters.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/40 p-16 text-center backdrop-blur-sm">
            <BarChart3 className="mb-4 h-12 w-12 text-white/20" />
            <h3 className="mb-2 text-xl font-bold text-white">No active votes</h3>
            <p className="text-white/60">Check back later when new story chapters are released.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {chapters.map((chapter) => (
              <ChapterLeaderboardCard
                key={`${chapter.storyId}:${chapter.chapterSlug}`}
                chapter={chapter}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
