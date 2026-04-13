"use client"

import { type ReactNode, useEffect, useState } from "react"
import ReadingProgress from "@/components/reading-progress"
import NarrationControlBar from "@/components/narration-control-bar"
import ActTableOfContents from "@/components/act-table-of-contents"
import { useNarrationSync } from "@/hooks/use-narration-sync"
import type { NarrationSegment, ActAudioEntry, ChapterAudioManifest, ActTimingData } from "@/lib/narration-data"

type ActEntry = {
  id: string
  title: string
}

type ChapterReaderProps = {
  chapterTitle: string
  chapterNumber: number
  acts: ActEntry[]
  accentTextClass: string
  gradientClass: string
  narrationSegments: NarrationSegment[]
  children: ReactNode
}

/**
 * Client wrapper for the chapter reader page.
 * Loads per-act timing data at runtime, creates audio players per act,
 * and syncs text highlighting with audio playback.
 */
export default function ChapterReader({
  chapterTitle,
  chapterNumber,
  acts,
  accentTextClass,
  gradientClass,
  narrationSegments,
  children,
}: ChapterReaderProps) {
  const [actEntries, setActEntries] = useState<ActAudioEntry[]>([])

  // Load chapter manifest → then fetch each act's timing JSON in parallel
  useEffect(() => {
    const url = `/data/narration/chapter-${chapterNumber}-manifest.json`
    fetch(url)
      .then((res) => {
        if (!res.ok) return null
        return res.json() as Promise<ChapterAudioManifest>
      })
      .then(async (manifest) => {
        if (!manifest?.acts?.length) return

        const entries = await Promise.all(
          manifest.acts.map(async (act) => {
            try {
              const res = await fetch(act.timingFile)
              if (!res.ok) return null
              const timing: ActTimingData = await res.json()
              return {
                act: act.act,
                actTitle: act.actTitle,
                audioUrl: act.audioFile,
                timingSegments: timing.segments,
                totalDuration: timing.totalDuration,
              } satisfies ActAudioEntry
            } catch {
              return null
            }
          })
        )

        setActEntries(entries.filter((e): e is ActAudioEntry => e !== null))
      })
      .catch(() => {
        // No manifest yet for this chapter
      })
  }, [chapterNumber])

  const narration = useNarrationSync({
    acts: actEntries,
    segments: narrationSegments,
  })

  const hasAudio = actEntries.length > 0

  return (
    <>
      <ReadingProgress gradientClass={gradientClass} />

      <div className="mb-6">
        <ActTableOfContents
          acts={acts}
          chapterTitle={chapterTitle}
          accentTextClass={accentTextClass}
        />
      </div>

      {children}

      <NarrationControlBar
        accentTextClass={accentTextClass}
        gradientClass={gradientClass}
        narration={hasAudio ? narration : null}
      />
    </>
  )
}
