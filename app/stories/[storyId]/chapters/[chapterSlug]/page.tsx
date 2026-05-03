import Link from "next/link"
import { notFound } from "next/navigation"
import StoryVoting from "@/app/stories/[storyId]/story-voting"
import StoryArt from "@/components/story-art"
import ChapterReader from "@/components/chapter-reader"
import { getSerialStory, getSerialStoryChapter } from "@/lib/serial-stories"
import { getActContent } from "@/lib/acts-content"
import { getChapterVoteSummary } from "@/lib/chapter-votes"
import { loadNarrationData, flattenSegments } from "@/lib/narration-data"

// Reads live vote totals on each request — must not be statically prerendered.
export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ storyId: string; chapterSlug: string }>
}

/**
 * Known character names mapped to their identifiers for dialogue tagging.
 * When a paragraph contains dialogue and a known speaker can be identified
 * from the attribution text, a data-speaker attribute is added.
 */
const KNOWN_SPEAKERS: Record<string, string> = {
  caelin: "caelin",
  vex: "vex",
  vharisax: "vharisax",
  thornik: "thornik",
  serana: "serana",
  gareth: "gareth",
  mira: "mira",
  elowen: "elowen",
  nyxara: "nyxara",
  durgan: "durgan",
  aldric: "aldric",
}

/**
 * Detect dialogue in a paragraph and attempt to identify the speaker.
 * Returns the speaker ID if found, or null.
 *
 * Looks for patterns like:
 *   "dialogue," Speaker said/asked/whispered/etc.
 *   Speaker said, "dialogue"
 */
function detectSpeaker(text: string): string | null {
  // Pattern: "...", SpeakerName verb
  const afterQuoteMatch = text.match(
    /["\u201D]\s*([A-Z][a-z]+)\s+(?:said|asked|whispered|murmured|called|hissed|rasped|growled|shouted|replied|answered|observed|continued|added|muttered|breathed|snapped|demanded|offered|suggested|warned|noted|told|began|finished|started|insisted)/
  )
  if (afterQuoteMatch) {
    const name = afterQuoteMatch[1].toLowerCase()
    if (KNOWN_SPEAKERS[name]) return KNOWN_SPEAKERS[name]
  }

  // Pattern: SpeakerName verb, "..."
  const beforeQuoteMatch = text.match(
    /([A-Z][a-z]+)\s+(?:said|asked|whispered|murmured|called|hissed|rasped|growled|shouted|replied|answered|observed|continued|added|muttered|breathed|snapped|demanded|offered|suggested|warned|noted|told|began|finished|started|insisted)\s*[,:]?\s*["\u201C]/
  )
  if (beforeQuoteMatch) {
    const name = beforeQuoteMatch[1].toLowerCase()
    if (KNOWN_SPEAKERS[name]) return KNOWN_SPEAKERS[name]
  }

  return null
}

/** Check if a paragraph contains dialogue (text in quotes). */
function hasDialogue(text: string): boolean {
  return /[""\u201C]/.test(text) && /[""\u201D]/.test(text)
}

export default async function StoryChapterPage({ params }: PageProps) {
  const { storyId, chapterSlug } = await params
  const story = getSerialStory(storyId)
  const chapter = getSerialStoryChapter(storyId, chapterSlug)

  if (!story || !chapter) {
    notFound()
  }

  const currentChapterIndex = story.chapters.findIndex((entry) => entry.slug === chapter.slug)
  const previousChapter = currentChapterIndex > 0 ? story.chapters[currentChapterIndex - 1] : null
  const nextChapter = currentChapterIndex < story.chapters.length - 1 ? story.chapters[currentChapterIndex + 1] : null

  // Merge prose from uploaded act files; falls back to the embedded summary if no file exists
  const publishedSections = chapter.sections
    .filter((section) => section.isPublished)
    .map((section) => {
      const fileContent = getActContent(story.id, chapter.slug, section.id)
      return fileContent ? { ...section, summary: fileContent } : section
    })

  const latestChapter = story.chapters[story.chapters.length - 1]
  const isLatest = latestChapter.slug === chapter.slug

  const previousChapterSummary = previousChapter?.voteOptions?.length
    ? await getChapterVoteSummary(
        story.id,
        previousChapter.slug,
        previousChapter.voteOptions.map((option) => option.id)
      )
    : null
  const previousChapterWinningOptionId = previousChapterSummary?.winningOptionId ?? previousChapter?.winningOptionId
  const showPreviousChapterChoice =
    Boolean(previousChapter) && Boolean(previousChapterWinningOptionId) && Boolean(previousChapter?.voteOptions?.length)
  const previousChapterVoteOptions = previousChapter?.voteOptions ?? []

  // Build act entries for table of contents
  const actEntries = publishedSections.map((s) => ({ id: s.id, title: s.title }))

  // Load narration segments for paragraph ID mapping (timing data loaded client-side)
  const narrationData = loadNarrationData(chapter.chapterNumber)
  const narrationSegments = narrationData ? flattenSegments(narrationData) : []

  // Chapter number prefix for paragraph IDs
  const chPrefix = `ch${chapter.chapterNumber}`

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="relative overflow-hidden bg-slate-950 pb-14 pt-24">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${story.coverGradient} opacity-10`}
        />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-white/60">
            <Link href={`/stories/${story.id}`} className="transition-colors hover:text-white">
              ← Back to Story Hub
            </Link>
            <span>•</span>
            <span>{story.title}</span>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
              {chapter.label}
            </span>
            {isLatest ? (
              <span className="rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                Latest Voting Chapter
              </span>
            ) : null}
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{chapter.title}</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/75">{chapter.opening}</p>

          {/* Top navigation */}
          <div className="mt-8 flex flex-wrap gap-3">
            {previousChapter ? (
              <Link
                href={`/stories/${story.id}/chapters/${previousChapter.slug}`}
                className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                ← {previousChapter.label}
              </Link>
            ) : null}
            {nextChapter ? (
              <Link
                href={`/stories/${story.id}/chapters/${nextChapter.slug}`}
                className={`inline-flex items-center rounded-md bg-gradient-to-r ${story.coverGradient} px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90`}
              >
                {nextChapter.label} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <ChapterReader
          chapterTitle={chapter.title}
          chapterNumber={chapter.chapterNumber}
          acts={actEntries}
          accentTextClass={story.accentTextClass}
          gradientClass={story.coverGradient}
          narrationSegments={narrationSegments}
        >
          <div className="space-y-12">
            {/* Community Choice That Led Here — shows previous chapter's concluded vote */}
            {showPreviousChapterChoice && previousChapter ? (
              <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md">
                <div className="mb-1 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Community Choice — {previousChapter.label}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                {previousChapterSummary?.totalVotes ? (
                  <p className="mb-3 text-xs text-white/40">
                    {previousChapterSummary.totalVotes.toLocaleString()} recorded votes
                  </p>
                ) : null}
                <h2 className="mb-6 text-lg font-semibold text-white/70">{previousChapter.voteQuestion}</h2>
                <div className="space-y-3">
                  {previousChapterVoteOptions.map((option) => {
                    const isWinner = option.id === previousChapterWinningOptionId
                    const liveCount = previousChapterSummary?.counts[option.id] ?? 0
                    const livePercent =
                      previousChapterSummary && previousChapterSummary.totalVotes > 0
                        ? Math.round((liveCount / previousChapterSummary.totalVotes) * 100)
                        : undefined
                    const votePercent = livePercent ?? option.votePercent
                    return (
                      <div
                        key={option.id}
                        className={`rounded-xl border p-4 ${
                          isWinner ? "border-white/20 bg-white/[0.07]" : "border-white/5 bg-transparent opacity-40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            {isWinner ? (
                              <p className={`mb-0.5 text-xs font-bold uppercase tracking-wider ${story.accentTextClass}`}>
                                ★ Community Chose This
                              </p>
                            ) : null}
                            <p className={`font-semibold ${isWinner ? "text-white" : "text-white/60"}`}>
                              {option.title}
                            </p>
                            <p className={`mt-1 text-sm leading-relaxed ${isWinner ? "text-white/65" : "text-white/40"}`}>
                              {option.description}
                            </p>
                          </div>
                          {votePercent !== undefined ? (
                            <span className={`shrink-0 text-xl font-bold ${isWinner ? story.accentTextClass : "text-white/25"}`}>
                              {votePercent}%
                            </span>
                          ) : null}
                        </div>
                        {isWinner && votePercent !== undefined ? (
                          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${story.coverGradient}`}
                              style={{ width: `${votePercent}%` }}
                            />
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </section>
            ) : null}

            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white">Chapter Sections</h2>
                  <p className="text-sm text-white/50">
                    Only completed acts are shown here. New acts can be added as you provide them.
                  </p>
                </div>
                <span className="text-sm text-white/40">{publishedSections.length} act{publishedSections.length === 1 ? "" : "s"} published</span>
              </div>

              <div className="space-y-10">
                {publishedSections.map((section, index) => {
                  const imageOnLeft = index % 2 === 0
                  const paragraphs = section.summary.split("\n").filter(Boolean)
                  const actNum = section.id.replace("act-", "")
                  const revealAfter = section.imageRevealAfterParagraph
                  const imageInsertAt =
                    typeof revealAfter === "number"
                      ? Math.min(Math.max(revealAfter, 0), paragraphs.length)
                      : paragraphs.length >= 2
                        ? Math.floor(paragraphs.length / 2)
                        : 0
                  const beforeParas = paragraphs.slice(0, imageInsertAt)
                  const afterParas = paragraphs.slice(imageInsertAt)

                  return (
                    <article
                      key={section.id}
                      id={`section-${section.id}`}
                      className="overflow-hidden border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
                    >
                      <h3 className={`mb-5 text-xl font-semibold ${story.accentTextClass}`}>{section.title}</h3>

                      {/* Paragraphs before the portrait image */}
                      {beforeParas.map((paragraph, i) => {
                        const pId = `${chPrefix}-act${actNum}-p${i + 1}`
                        const speaker = hasDialogue(paragraph) ? detectSpeaker(paragraph) : null
                        return (
                          <p
                            key={pId}
                            id={pId}
                            className={`narration-paragraph mb-4 text-base leading-relaxed text-white/80 ${
                              hasDialogue(paragraph) ? "dialogue" : ""
                            }`}
                            {...(speaker ? { "data-speaker": speaker } : {})}
                          >
                            {paragraph}
                          </p>
                        )
                      })}

                      {/* Portrait image — floated inline, appears mid-act as reader reaches it */}
                      <div className={`mb-3 w-32 md:w-40 ${imageOnLeft ? "float-left mr-6" : "float-right ml-6"}`}>
                        <StoryArt
                          src={section.imageSrc}
                          alt={section.imageCaption ?? section.title}
                          caption={section.imageCaption}
                          accentTextClass={story.accentTextClass}
                          gradientClass={story.coverGradient}
                          placeholderLabel="Scene Art"
                          placeholderHint="Drop in art for this act later."
                          icon="🎨"
                          aspectClass="aspect-[3/4]"
                        />
                      </div>

                      {/* Remaining paragraphs flow around the portrait image */}
                      {afterParas.map((paragraph, i) => {
                        const globalIndex = imageInsertAt + i
                        const pId = `${chPrefix}-act${actNum}-p${globalIndex + 1}`
                        const speaker = hasDialogue(paragraph) ? detectSpeaker(paragraph) : null
                        return (
                          <p
                            key={pId}
                            id={pId}
                            className={`narration-paragraph mb-4 text-base leading-relaxed text-white/80 ${
                              hasDialogue(paragraph) ? "dialogue" : ""
                            }`}
                            {...(speaker ? { "data-speaker": speaker } : {})}
                          >
                            {paragraph}
                          </p>
                        )
                      })}

                      <div className="clear-both" />
                    </article>
                  )
                })}
              </div>
            </section>

            {chapter.voteQuestion && chapter.voteOptions?.length ? (
              <section>
                <div className="mb-5">
                  <h2 className="mb-2 text-2xl font-bold text-white">{chapter.voteQuestion}</h2>
                  {chapter.votePrompt ? (
                    <p className="text-sm leading-relaxed text-white/50">{chapter.votePrompt}</p>
                  ) : null}
                </div>

                <StoryVoting
                  storyId={story.id}
                  chapterSlug={chapter.slug}
                  actOptions={chapter.voteOptions}
                  isComplete={chapter.status === "published" && !isLatest}
                  accentTextClass={story.accentTextClass}
                  gradientClass={story.coverGradient}
                  ringClass={story.ringClass}
                  ctaLabel="Vote on This Chapter"
                />
              </section>
            ) : null}

            {/* Bottom navigation */}
            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Chapter Navigation</h2>
                  <p className="text-sm text-white/50">Move through the archive or return to the full chapter list.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {previousChapter ? (
                    <Link
                      href={`/stories/${story.id}/chapters/${previousChapter.slug}`}
                      className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      ← Previous Chapter
                    </Link>
                  ) : null}
                  {nextChapter ? (
                    <Link
                      href={`/stories/${story.id}/chapters/${nextChapter.slug}`}
                      className={`inline-flex items-center rounded-md bg-gradient-to-r ${story.coverGradient} px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90`}
                    >
                      Next Chapter →
                    </Link>
                  ) : null}
                  <Link
                    href={`/stories/${story.id}`}
                    className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    All Chapters
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </ChapterReader>
      </div>
    </main>
  )
}
