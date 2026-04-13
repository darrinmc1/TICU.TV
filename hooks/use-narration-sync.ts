"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { NarrationSegment } from "@/lib/narration-data"

export type TimingSegment = {
  id: string
  start: number
  end: number
  speaker: string
  type: string
  text: string
}

export type NarrationState = {
  isPlaying: boolean
  currentSegmentIndex: number
  totalSegments: number
  playbackRate: number
  currentTime: number
  duration: number
  activeParagraphId: string | null
  activeSegment: TimingSegment | null
  audioReady: boolean
}

export type NarrationControls = {
  play: () => void
  pause: () => void
  togglePlayPause: () => void
  nextSegment: () => void
  prevSegment: () => void
  jumpToSegment: (index: number) => void
  jumpToParagraph: (paragraphId: string) => void
  setPlaybackRate: (rate: number) => void
  seek: (time: number) => void
}

type UseNarrationSyncOptions = {
  /** URL to the chapter MP3 file (e.g. /audio/chapters/chapter-1.mp3) */
  audioUrl: string | null
  /** Timing data with start/end timestamps per segment */
  timingSegments: TimingSegment[]
  /** Flat segment data for paragraph ID mapping */
  segments: NarrationSegment[]
  autoScroll?: boolean
  scrollBehavior?: ScrollBehavior
  scrollOffset?: number
}

// ── Paragraph ID mapping ──────────────────────────────────────────────────

function getParagraphDomId(segment: NarrationSegment): string {
  const actMatch = segment.id.match(/ch(\d+)-act(\d+)/)
  if (!actMatch) return ""
  return `ch${actMatch[1]}-act${actMatch[2]}-p${segment.paragraphIndex + 1}`
}

function getParagraphDomIdFromTiming(segId: string, segments: NarrationSegment[]): string {
  const seg = segments.find((s) => s.id === segId)
  return seg ? getParagraphDomId(seg) : ""
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useNarrationSync(
  options: UseNarrationSyncOptions
): NarrationState & NarrationControls {
  const {
    audioUrl,
    timingSegments,
    segments,
    autoScroll = true,
    scrollBehavior = "smooth",
    scrollOffset = 120,
  } = options

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRateState] = useState(1)
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1)
  const [audioReady, setAudioReady] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timingRef = useRef(timingSegments)
  timingRef.current = timingSegments
  const segmentsRef = useRef(segments)
  segmentsRef.current = segments
  const animFrameRef = useRef<number | null>(null)

  // Create audio element
  useEffect(() => {
    if (!audioUrl) return

    const audio = new Audio(audioUrl)
    audio.preload = "auto"
    audioRef.current = audio

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
      setAudioReady(true)
    })

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    })

    audio.addEventListener("error", (e) => {
      console.error("Audio load error:", e)
      setAudioReady(false)
    })

    return () => {
      audio.pause()
      audio.src = ""
      audioRef.current = null
      setAudioReady(false)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [audioUrl])

  // Time-tracking loop via requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    const tick = () => {
      const audio = audioRef.current
      if (!audio) return

      const t = audio.currentTime
      setCurrentTime(t)

      // Find which segment we're in
      const timing = timingRef.current
      let idx = -1
      for (let i = 0; i < timing.length; i++) {
        if (t >= timing[i].start && t < timing[i].end) {
          idx = i
          break
        }
      }
      // If between segments, stay on the last one that ended
      if (idx === -1 && t > 0) {
        for (let i = timing.length - 1; i >= 0; i--) {
          if (t >= timing[i].start) {
            idx = i
            break
          }
        }
      }
      setCurrentSegmentIndex(idx)

      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying])

  // Active segment derived from index
  const activeTimingSegment =
    currentSegmentIndex >= 0 && currentSegmentIndex < timingSegments.length
      ? timingSegments[currentSegmentIndex]
      : null

  const activeParagraphId = activeTimingSegment
    ? getParagraphDomIdFromTiming(activeTimingSegment.id, segments)
    : null

  // Scroll to active paragraph
  const scrollToElement = useCallback(
    (elementId: string) => {
      if (!autoScroll) return
      const el = document.getElementById(elementId)
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top < scrollOffset || rect.bottom > window.innerHeight - 80) {
        const top = rect.top + window.scrollY - scrollOffset
        window.scrollTo({ top, behavior: scrollBehavior })
      }
    },
    [autoScroll, scrollBehavior, scrollOffset]
  )

  useEffect(() => {
    if (activeParagraphId) {
      scrollToElement(activeParagraphId)
    }
  }, [activeParagraphId, scrollToElement])

  // Apply/remove active highlight class
  useEffect(() => {
    document
      .querySelectorAll(".narration-active")
      .forEach((el) => el.classList.remove("narration-active"))

    if (activeParagraphId) {
      const el = document.getElementById(activeParagraphId)
      if (el) el.classList.add("narration-active")
    }

    return () => {
      document
        .querySelectorAll(".narration-active")
        .forEach((el) => el.classList.remove("narration-active"))
    }
  }, [activeParagraphId])

  // ── Controls ──────────────────────────────────────────────────────────

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => setIsPlaying(true)).catch(console.error)
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  const nextSegment = useCallback(() => {
    const timing = timingRef.current
    const nextIdx = Math.min(currentSegmentIndex + 1, timing.length - 1)
    if (nextIdx >= 0 && nextIdx < timing.length) {
      seek(timing[nextIdx].start)
    }
  }, [currentSegmentIndex, seek])

  const prevSegment = useCallback(() => {
    const timing = timingRef.current
    const prevIdx = Math.max(currentSegmentIndex - 1, 0)
    if (prevIdx >= 0 && prevIdx < timing.length) {
      seek(timing[prevIdx].start)
    }
  }, [currentSegmentIndex, seek])

  const jumpToSegment = useCallback(
    (index: number) => {
      const timing = timingRef.current
      const clamped = Math.max(0, Math.min(index, timing.length - 1))
      if (timing[clamped]) {
        seek(timing[clamped].start)
      }
    },
    [seek]
  )

  const jumpToParagraph = useCallback(
    (paragraphId: string) => {
      const segs = segmentsRef.current
      const seg = segs.find((s) => getParagraphDomId(s) === paragraphId)
      if (seg) {
        const timing = timingRef.current
        const idx = timing.findIndex((t) => t.id === seg.id)
        if (idx >= 0) {
          seek(timing[idx].start)
        }
      }
      scrollToElement(paragraphId)
    },
    [seek, scrollToElement]
  )

  const setPlaybackRate = useCallback((rate: number) => {
    setPlaybackRateState(rate)
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = rate
    }
  }, [])

  return {
    isPlaying,
    currentSegmentIndex,
    totalSegments: timingSegments.length,
    playbackRate,
    currentTime,
    duration,
    activeParagraphId,
    activeSegment: activeTimingSegment,
    audioReady,
    play,
    pause,
    togglePlayPause,
    nextSegment,
    prevSegment,
    jumpToSegment,
    jumpToParagraph,
    setPlaybackRate,
    seek,
  }
}
