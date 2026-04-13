"use client"

import { useState } from "react"
import type { NarrationState, NarrationControls } from "@/hooks/use-narration-sync"

type NarrationControlBarProps = {
  accentTextClass: string
  gradientClass: string
  narration: (NarrationState & NarrationControls) | null
}

const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5, 2]

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export default function NarrationControlBar({
  accentTextClass,
  gradientClass,
  narration,
}: NarrationControlBarProps) {
  const [isSpeedOpen, setIsSpeedOpen] = useState(false)

  const hasNarration = narration !== null && narration.audioReady
  const actProgress =
    hasNarration && narration.duration > 0
      ? (narration.currentTime / narration.duration) * 100
      : 0

  const speakerLabel =
    narration?.activeSegment?.speaker === "narrator"
      ? "Narrator"
      : narration?.activeSegment?.speaker
        ? narration.activeSegment.speaker.charAt(0).toUpperCase() +
          narration.activeSegment.speaker.slice(1)
        : null

  const segmentType = narration?.activeSegment?.type ?? null

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasNarration || narration.duration <= 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    narration.seek(pct * narration.duration)
  }

  return (
    <div className="sticky bottom-0 z-40 border-t border-white/10 bg-slate-950/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-3">
        {/* Prev act */}
        {hasNarration && narration.totalActs > 1 ? (
          <button
            onClick={narration.prevAct}
            disabled={narration.currentActIndex <= 0}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent"
            aria-label="Previous act"
            title="Previous act"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
            </svg>
          </button>
        ) : null}

        {/* Skip back */}
        {hasNarration ? (
          <button
            onClick={narration.prevSegment}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
            aria-label="Previous segment"
            title="Previous segment"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>
        ) : null}

        {/* Play / Pause */}
        <button
          disabled={!hasNarration}
          onClick={hasNarration ? narration.togglePlayPause : undefined}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
            hasNarration
              ? narration.isPlaying
                ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                : "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
              : "border-white/10 text-white/20"
          }`}
          aria-label={
            hasNarration
              ? narration.isPlaying
                ? "Pause narration"
                : "Play narration"
              : "Narration not available"
          }
        >
          {hasNarration && narration.isPlaying ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Skip forward */}
        {hasNarration ? (
          <button
            onClick={narration.nextSegment}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
            aria-label="Next segment"
            title="Next segment"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        ) : null}

        {/* Next act */}
        {hasNarration && narration.totalActs > 1 ? (
          <button
            onClick={narration.nextAct}
            disabled={narration.currentActIndex >= narration.totalActs - 1}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent"
            aria-label="Next act"
            title="Next act"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
            </svg>
          </button>
        ) : null}

        {/* Time + Progress bar */}
        <div className="flex flex-1 items-center gap-3">
          {hasNarration ? (
            <>
              <span className="w-10 text-right text-xs tabular-nums text-white/40">
                {formatTime(narration.currentTime)}
              </span>
              <div className="relative flex-1">
                {/* Chapter progress (thin background line) */}
                <div className="absolute -top-1 left-0 h-0.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-white/15 transition-[width] duration-300"
                    style={{ width: `${narration.chapterProgress * 100}%` }}
                  />
                </div>
                {/* Act progress (main bar) */}
                <div
                  className="relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/10"
                  onClick={handleProgressClick}
                >
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${gradientClass} transition-[width] duration-150`}
                    style={{ width: `${actProgress}%` }}
                  />
                </div>
              </div>
              <span className="w-10 text-xs tabular-nums text-white/40">
                {formatTime(narration.duration)}
              </span>
            </>
          ) : (
            <>
              <span className="w-10 text-right text-xs tabular-nums text-white/30">
                0:00
              </span>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${gradientClass} opacity-30`}
                  style={{ width: "0%" }}
                />
              </div>
              <span className="w-10 text-xs tabular-nums text-white/30">
                --:--
              </span>
            </>
          )}
        </div>

        {/* Act label */}
        {hasNarration && narration.currentActTitle ? (
          <span className="hidden text-xs text-white/30 lg:block">
            {narration.currentActTitle}
          </span>
        ) : null}

        {/* Active speaker badge */}
        {hasNarration && speakerLabel ? (
          <span
            className={`hidden items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs sm:inline-flex ${
              segmentType === "dialogue"
                ? accentTextClass
                : segmentType === "verse"
                  ? "italic text-amber-400/80"
                  : "text-white/40"
            }`}
          >
            {segmentType === "dialogue" ? (
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            ) : null}
            {speakerLabel}
          </span>
        ) : null}

        {/* Speed control */}
        <div className="relative">
          <button
            disabled={!hasNarration}
            onClick={() => setIsSpeedOpen(!isSpeedOpen)}
            className={`rounded-md border px-2 py-1 text-xs font-medium transition ${
              hasNarration
                ? "border-white/20 text-white/60 hover:bg-white/10 hover:text-white"
                : "border-white/10 text-white/20"
            }`}
            title="Playback speed"
          >
            {hasNarration ? narration.playbackRate : 1}x
          </button>
          {isSpeedOpen && hasNarration ? (
            <div className="absolute bottom-full right-0 mb-2 rounded-lg border border-white/10 bg-slate-900 p-1 shadow-xl">
              {PLAYBACK_RATES.map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    narration.setPlaybackRate(rate)
                    setIsSpeedOpen(false)
                  }}
                  className={`block w-full rounded px-3 py-1 text-left text-xs transition ${
                    rate === narration.playbackRate
                      ? `${accentTextClass} bg-white/10`
                      : "text-white/50 hover:bg-white/5"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Status */}
        <span className="hidden text-xs text-white/20 sm:block">
          {hasNarration
            ? narration.isPlaying
              ? "Playing"
              : "Ready"
            : narration !== null
              ? "Loading..."
              : "Coming soon"}
        </span>
      </div>
    </div>
  )
}
