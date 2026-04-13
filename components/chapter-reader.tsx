"use client"

import { type ReactNode, useEffect, useState } from "react"
import ReadingProgress from "@/components/reading-progress"
import NarrationControlBar from "@/components/narration-control-bar"
import ActTableOfContents from "@/components/act-table-of-contents"
import { useNarrationSync, type TimingSegment } from "@/hooks/use-narration-sync"
import type { NarrationSegment } from "@/lib/narration-data"

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
  /** Flat array of narration segments for paragraph ID mapping. */
  narrationSegments: NarrationSegment[]
  children: ReactNode
}

type TimingData = {
  audioFile: string
  segments: TimingSegment[]
}

/**
 * Client wrapper for the chapter reader page.
 * Loads timing data at runtime, creates an audio player,
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
  const [timingData, setTimingData] = useState<TimingData | null>(null)

  // Load timing JSON at mount time (client-side fetch from public/)
  useEffect(() => {
    const url = `/data/narration/chapter-${chapterNumber}-timing.json`
    fetch(url)
      .then((res) => {
        if (!res.ok) return null
        return res.json()
      })
      .then((data) => {
        if (data && data.audioFile && data.segments) {
          setTimingData({ audioFile: data.audioFile, segments: data.segments })
        }
      })
      .catch(() => {
        // No timing data yet for this chapter
      })
  }, [chapterNumber])

  const narration = useNarrationSync({
    audioUrl: timingData?.audioFile ?? null,
    timingSegments: timingData?.segments ?? [],
    segments: narrationSegments,
  })

  const hasAudio = timingData !== null

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
