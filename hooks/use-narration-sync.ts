"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { NarrationSegment, ActAudioEntry, ActTimingSegment } from "@/lib/narration-data"

export type { ActTimingSegment as TimingSegment }

export type NarrationState = {
  isPlaying: boolean
  currentSegmentIndex: number
  totalSegments: number
  playbackRate: number
  currentTime: number
  duration: number
  activeParagraphId: string | null
  activeSegment: ActTimingSegment | null
  audioReady: boolean
  currentActIndex: number
  totalActs: number
  currentActTitle: string | null
  /** 0-1 progress across the entire chapter */
  chapterProgress: number
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
  nextAct: () => void
  prevAct: () => void
  jumpToAct: (actIndex: number) => void
}

type UseNarrationSyncOptions = {
  /** Per-act audio entries (audio URL + timing per act) */
  acts: ActAudioEntry[]
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
    acts,
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
  const [currentActIndex, setCurrentActIndex] = useState(0)

  const activeAudioRef = useRef<HTMLAudioElement | null>(null)
  const preloadAudioRef = useRef<HTMLAudioElement | null>(null)
  const segmentsRef = useRef(segments)
  segmentsRef.current = segments
  const actsRef = useRef(acts)
  actsRef.current = acts
  const animFrameRef = useRef<number | null>(null)
  const wasPlayingRef = useRef(false)
  const loadingActRef = useRef(0)
  const playbackRateRef = useRef(1)

  const totalActs = acts.length
  const currentAct = acts[currentActIndex] ?? null
  const currentActTitle = currentAct?.actTitle ?? null

  // Compute total segments across all acts
  const totalSegments = acts.reduce((sum, a) => sum + a.timingSegments.length, 0)

  // Compute global segment index: sum of all previous acts' segments + local index
  const globalSegmentIndex = (() => {
    if (currentSegmentIndex < 0) return -1
    let offset = 0
    for (let i = 0; i < currentActIndex; i++) {
      offset += (acts[i]?.timingSegments.length ?? 0)
    }
    return offset + currentSegmentIndex
  })()

  // Chapter progress: combine completed acts' durations + current act progress
  const chapterTotalDuration = acts.reduce((sum, a) => sum + a.totalDuration, 0)
  const chapterProgress = (() => {
    if (chapterTotalDuration <= 0) return 0
    let elapsed = 0
    for (let i = 0; i < currentActIndex; i++) {
      elapsed += (acts[i]?.totalDuration ?? 0)
    }
    elapsed += currentTime
    return Math.min(1, elapsed / chapterTotalDuration)
  })()

  // ── Audio element lifecycle ────────────────────────────────────────────

  const disposeAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (!audio) return
    audio.pause()
    audio.removeAttribute("src")
    audio.load()
  }, [])

  const createAudio = useCallback((url: string, autoplay: boolean): HTMLAudioElement => {
    const audio = new Audio(url)
    audio.preload = "auto"
    audio.playbackRate = playbackRateRef.current
    if (autoplay) {
      audio.addEventListener("canplay", () => {
        audio.play().catch(() => {})
      }, { once: true })
    }
    return audio
  }, [])

  // Load active audio when act changes
  useEffect(() => {
    if (acts.length === 0) {
      setAudioReady(false)
      return
    }

    const act = acts[currentActIndex]
    if (!act) return

    loadingActRef.current = currentActIndex

    // Dispose previous
    disposeAudio(activeAudioRef.current)
    activeAudioRef.current = null
    setAudioReady(false)

    const audio = new Audio(act.audioUrl)
    audio.preload = "auto"
    audio.playbackRate = playbackRateRef.current
    activeAudioRef.current = audio

    const onLoaded = () => {
      if (loadingActRef.current !== currentActIndex) return
      setDuration(audio.duration)
      setAudioReady(true)
      // If we were playing before act switch, auto-play the new act
      if (wasPlayingRef.current) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {})
        wasPlayingRef.current = false
      }
    }

    const onEnded = () => {
      // Auto-advance to next act
      if (currentActIndex + 1 < actsRef.current.length) {
        wasPlayingRef.current = true
        setCurrentSegmentIndex(-1)
        setCurrentTime(0)
        setCurrentActIndex((prev) => prev + 1)
      } else {
        setIsPlaying(false)
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      }
    }

    const onError = () => {
      if (loadingActRef.current !== currentActIndex) return
      setAudioReady(false)
    }

    audio.addEventListener("loadedmetadata", onLoaded)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("error", onError)

    // Preload next act
    disposeAudio(preloadAudioRef.current)
    preloadAudioRef.current = null
    if (currentActIndex + 1 < acts.length) {
      const nextAct = acts[currentActIndex + 1]
      const preload = new Audio(nextAct.audioUrl)
      preload.preload = "auto"
      preloadAudioRef.current = preload
    }

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("error", onError)
      disposeAudio(audio)
      activeAudioRef.current = null
      setAudioReady(false)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [acts, currentActIndex, disposeAudio])

  // Time-tracking loop via requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    const tick = () => {
      const audio = activeAudioRef.current
      if (!audio) return

      const t = audio.currentTime
      setCurrentTime(t)

      // Find which segment we're in (act-local timing)
      const act = actsRef.current[currentActIndex]
      const timing = act?.timingSegments ?? []
      let idx = -1
      for (let i = 0; i < timing.length; i++) {
        if (t >= timing[i].start && t < timing[i].end) {
          idx = i
          break
        }
      }
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
  }, [isPlaying, currentActIndex])

  // Active segment derived from index
  const activeTimingSegment =
    currentAct && currentSegmentIndex >= 0 && currentSegmentIndex < currentAct.timingSegments.length
      ? currentAct.timingSegments[currentSegmentIndex]
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
    const audio = activeAudioRef.current
    if (!audio) return
    audio.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [])

  const pause = useCallback(() => {
    const audio = activeAudioRef.current
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
    const audio = activeAudioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  const nextSegment = useCallback(() => {
    const act = actsRef.current[currentActIndex]
    if (!act) return
    const timing = act.timingSegments
    const nextIdx = currentSegmentIndex + 1

    if (nextIdx < timing.length) {
      seek(timing[nextIdx].start)
    } else if (currentActIndex + 1 < actsRef.current.length) {
      // Cross act boundary
      wasPlayingRef.current = isPlaying
      setCurrentSegmentIndex(-1)
      setCurrentTime(0)
      setCurrentActIndex(currentActIndex + 1)
    }
  }, [currentSegmentIndex, currentActIndex, seek, isPlaying])

  const prevSegment = useCallback(() => {
    const act = actsRef.current[currentActIndex]
    if (!act) return
    const timing = act.timingSegments
    const prevIdx = currentSegmentIndex - 1

    if (prevIdx >= 0) {
      seek(timing[prevIdx].start)
    } else if (currentActIndex > 0) {
      // Cross act boundary to previous act's last segment
      wasPlayingRef.current = isPlaying
      const prevAct = actsRef.current[currentActIndex - 1]
      const lastIdx = prevAct.timingSegments.length - 1
      setCurrentSegmentIndex(lastIdx)
      setCurrentTime(0)
      setCurrentActIndex(currentActIndex - 1)
      // After audio loads, seek to last segment — handled via effect below
    }
  }, [currentSegmentIndex, currentActIndex, seek, isPlaying])

  const jumpToSegment = useCallback(
    (globalIndex: number) => {
      // Find which act this global index falls in
      let remaining = globalIndex
      for (let i = 0; i < acts.length; i++) {
        const actLen = acts[i].timingSegments.length
        if (remaining < actLen) {
          if (i !== currentActIndex) {
            wasPlayingRef.current = isPlaying
            setCurrentActIndex(i)
          }
          const seg = acts[i].timingSegments[remaining]
          if (seg) seek(seg.start)
          return
        }
        remaining -= actLen
      }
    },
    [acts, currentActIndex, seek, isPlaying]
  )

  const jumpToParagraph = useCallback(
    (paragraphId: string) => {
      const segs = segmentsRef.current
      const seg = segs.find((s) => getParagraphDomId(s) === paragraphId)
      if (!seg) return

      // Find the segment across all acts' timing data
      for (let i = 0; i < acts.length; i++) {
        const idx = acts[i].timingSegments.findIndex((t) => t.id === seg.id)
        if (idx >= 0) {
          if (i !== currentActIndex) {
            wasPlayingRef.current = isPlaying
            setCurrentActIndex(i)
          }
          seek(acts[i].timingSegments[idx].start)
          break
        }
      }
      scrollToElement(paragraphId)
    },
    [acts, currentActIndex, seek, scrollToElement, isPlaying]
  )

  const setPlaybackRate = useCallback((rate: number) => {
    setPlaybackRateState(rate)
    playbackRateRef.current = rate
    const audio = activeAudioRef.current
    if (audio) {
      audio.playbackRate = rate
    }
  }, [])

  const nextAct = useCallback(() => {
    if (currentActIndex + 1 >= acts.length) return
    wasPlayingRef.current = isPlaying
    setCurrentSegmentIndex(-1)
    setCurrentTime(0)
    setCurrentActIndex(currentActIndex + 1)
  }, [currentActIndex, acts.length, isPlaying])

  const prevAct = useCallback(() => {
    if (currentActIndex <= 0) return
    wasPlayingRef.current = isPlaying
    setCurrentSegmentIndex(-1)
    setCurrentTime(0)
    setCurrentActIndex(currentActIndex - 1)
  }, [currentActIndex, isPlaying])

  const jumpToAct = useCallback(
    (actIndex: number) => {
      const clamped = Math.max(0, Math.min(actIndex, acts.length - 1))
      if (clamped === currentActIndex) {
        seek(0)
        return
      }
      wasPlayingRef.current = isPlaying
      setCurrentSegmentIndex(-1)
      setCurrentTime(0)
      setCurrentActIndex(clamped)
    },
    [acts.length, currentActIndex, seek, isPlaying]
  )

  return {
    isPlaying,
    currentSegmentIndex: globalSegmentIndex,
    totalSegments,
    playbackRate,
    currentTime,
    duration,
    activeParagraphId,
    activeSegment: activeTimingSegment,
    audioReady,
    currentActIndex,
    totalActs,
    currentActTitle,
    chapterProgress,
    play,
    pause,
    togglePlayPause,
    nextSegment,
    prevSegment,
    jumpToSegment,
    jumpToParagraph,
    setPlaybackRate,
    seek,
    nextAct,
    prevAct,
    jumpToAct,
  }
}
