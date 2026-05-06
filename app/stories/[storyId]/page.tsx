import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import StoryVoting from "./story-voting"
import type { ActOption } from "./story-voting"
import { getStory } from "@/lib/content"
import type { SerialStory } from "@/lib/content"
import { STORIES } from "./_data"
import type { CharacterData, StoryDetailData } from "./_data"

// Reads story data from Supabase on each request — must not be statically prerendered.
export const dynamic = "force-dynamic"

// ─── Character Card ───────────────────────────────────────────────────────────
function CharacterCard({ character }: { character: CharacterData }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
      <div className="mb-4 flex justify-center">
        {character.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={character.image}
            alt={character.name}
            className="h-28 w-28 rounded-full object-cover border-2 border-white/20 shadow-lg"
          />
        ) : (
          <div
            className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${character.gradient} shadow-lg`}
          >
            <span className="text-5xl select-none" role="img" aria-label={character.role}>
              {character.emoji}
            </span>
          </div>
        )}
      </div>
      <div className="mb-1 text-center text-xs font-semibold uppercase tracking-wider text-white/40">
        {character.role}
      </div>
      <h3 className="mb-3 text-center text-lg font-bold text-white">{character.name}</h3>
      <p className="text-sm leading-relaxed text-white/70">{character.bio}</p>
    </div>
  )
}

function SerialStoryHub({ story }: { story: SerialStory }) {
  const latestChapter = story.chapters[story.chapters.length - 1]
  const publishedChapters = story.chapters.filter((chapter) => chapter.status !== "draft")

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="relative min-h-[500px] overflow-hidden bg-slate-950 pb-16 pt-24 flex items-end">
        {/* Cinematic Hero Background */}
        {story.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={story.heroImage}
              alt={story.title}
              fill
              className="object-cover object-[center_25%] opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/20" />
          </div>
        )}

        {!story.heroImage && (
          <>
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${story.coverGradient} opacity-10`}
            />
            <div
              className={`pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br ${story.coverGradient} opacity-20 blur-3xl`}
            />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-5xl w-full px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Back to Stories
          </Link>

          <div className="text-left md:max-w-3xl">
            {!story.heroImage && (
              <div
                className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${story.coverGradient} shadow-2xl`}
              >
                <span className="text-6xl select-none" role="img" aria-label={story.genre}>
                  {story.genreEmoji}
                </span>
              </div>
            )}

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                Voting Open
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {story.genre}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {publishedChapters.length} published chapter{publishedChapters.length === 1 ? "" : "s"}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">{story.title}</h1>
            <blockquote
              className={`max-w-2xl border-l-4 border-current pl-5 text-left text-lg italic leading-relaxed ${story.accentTextClass} drop-shadow-lg`}
            >
              {story.hook}
            </blockquote>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-14">
        <section>
          <div className="mb-6 flex flex-wrap gap-3">
            <Link
              href={`/stories/${story.id}/chapters/${story.chapters[0].slug}`}
              className={`inline-flex items-center rounded-md bg-gradient-to-r ${story.coverGradient} px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
            >
              Start at Chapter 1
            </Link>
            <Link
              href={`/stories/${story.id}/chapters/${latestChapter.slug}`}
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read Latest Chapter
            </Link>
            <Link
              href={`/stories/${story.id}/characters`}
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Character Gallery
            </Link>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-white">Story Overview</h2>
          <p className="text-base leading-relaxed text-white/80">{story.synopsis}</p>
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">Chapter Index</h2>
              <p className="text-sm text-white/50">
                Readers can start from the beginning or jump to the latest published chapter.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {publishedChapters.map((chapter) => {
              const isLatest = chapter.slug === latestChapter.slug

              return (
                <Link
                  key={chapter.slug}
                  href={`/stories/${story.id}/chapters/${chapter.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-white/20 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isLatest ? "border border-green-500/30 bg-green-500/20 text-green-400" : "border border-white/20 text-white/60"}`}>
                      {isLatest ? "Latest Chapter" : chapter.label}
                    </span>
                    <span className="text-xs text-white/40">
                      {chapter.sections.filter((section) => section.isPublished).length} acts published
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{chapter.title}</h3>
                  <p className="text-sm leading-relaxed text-white/65">{chapter.shortDescription}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-white">Main Characters</h2>
          <p className="mb-6 text-sm text-white/50">These profiles stay visible at the story level so late-arriving readers can catch up quickly.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {story.characters.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
type PageProps = { params: Promise<{ storyId: string }> }

export default async function StoryPage({ params }: PageProps) {
  const { storyId } = await params
  const serialStory = await getStory(storyId)

  if (serialStory) {
    return <SerialStoryHub story={serialStory} />
  }

  const story: StoryDetailData | undefined = STORIES[storyId]
  if (!story) notFound()

  const statusConfig = {
    voting: { label: "Voting Open", badge: "bg-green-500/20 text-green-400 border border-green-500/30" },
    new: { label: "New", badge: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
    "in-progress": {
      label: "In Progress",
      badge: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    },
    complete: { label: "Complete", badge: "bg-white/10 text-white/60 border border-white/20" },
  }
  const { label: statusLabel, badge: statusBadge } = statusConfig[story.status]

  const chapterLabel = story.chapter || "Chapter 1"
  const chapterSlug = chapterLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[500px] overflow-hidden bg-slate-950 pb-16 pt-24 flex items-end">
        {/* Cinematic Hero Background */}
        {story.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={story.heroImage}
              alt={story.title}
              fill
              className="object-cover object-[center_25%] opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/20" />
          </div>
        )}

        {!story.heroImage && (
          <>
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${story.coverGradient} opacity-10`}
            />
            <div
              className={`pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br ${story.coverGradient} opacity-20 blur-3xl`}
            />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-5xl w-full px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Back to Stories
          </Link>

          <div className="text-left md:max-w-3xl">
            {/* Cover icon */}
            {!story.heroImage && (
              <div
                className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${story.coverGradient} shadow-2xl`}
              >
                <span className="text-6xl select-none" role="img" aria-label={story.genre}>
                  {story.genreEmoji}
                </span>
              </div>
            )}

            {/* Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge}`}>
                {statusLabel}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {story.genre}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {chapterLabel}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">{story.title}</h1>

            <blockquote
              className={`max-w-2xl border-l-4 border-current pl-5 text-left text-lg italic leading-relaxed ${story.accentTextClass} drop-shadow-lg`}
            >
              {story.hook}
            </blockquote>
          </div>
        </div>
      </div>

      {/* ─── Content ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl space-y-16 px-6 py-14">
        {/* Synopsis */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Story Synopsis</h2>
          <p className="mb-5 text-base leading-relaxed text-white/80">{story.synopsis}</p>
          <blockquote className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
            <p className="text-base italic leading-relaxed text-white/70">{story.opening}</p>
          </blockquote>
        </section>

        {/* Characters */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-white">Meet the Characters</h2>
          <p className="mb-6 text-sm text-white/50">The key figures shaping this story&apos;s fate.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {story.characters.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))}
          </div>
        </section>

        {/* Voting */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-white">
            {story.status === "complete" ? "How It Was Decided" : "What Happens Next?"}
          </h2>
          <p className="mb-6 text-sm text-white/50">
            {story.status === "complete"
              ? "Here's how readers voted at this pivotal chapter."
              : "Choose the path for this chapter. Your vote shapes the story."}
          </p>
          <StoryVoting
            storyId={storyId}
            chapterSlug={chapterSlug}
            actOptions={story.actOptions || []}
            isComplete={story.status === "complete"}
            accentTextClass={story.accentTextClass}
            gradientClass={story.coverGradient}
            ringClass={story.ringClass}
          />
        </section>

        {/* Footer CTAs */}
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-8">
          <Link
            href={`/stories/${storyId}/characters`}
            className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Character Gallery
          </Link>
          <Link
            href="/vote"
            className={`inline-flex items-center rounded-md bg-gradient-to-r ${story.coverGradient} px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
          >
            View All Story Votes
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
