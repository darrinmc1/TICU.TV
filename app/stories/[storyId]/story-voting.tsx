"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2, Vote } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ActOption = {
  id: string
  title: string
  description: string
  risk?: string
  votePercent?: number
}

type Props = {
  storyId: string
  chapterSlug: string
  actOptions: ActOption[]
  isComplete: boolean
  accentTextClass: string
  gradientClass: string
  ringClass: string
  ctaLabel?: string
}

export default function StoryVoting({
  storyId,
  chapterSlug,
  actOptions,
  isComplete,
  accentTextClass,
  gradientClass,
  ringClass,
  ctaLabel = "Cast Your Vote",
}: Props) {
  const [userId, setUserId] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [liveCounts, setLiveCounts] = useState<Record<string, number>>({})
  const [totalVotes, setTotalVotes] = useState(0)
  const gridClass =
    actOptions.length === 2
      ? "md:grid-cols-2"
      : actOptions.length === 4
        ? "md:grid-cols-2 xl:grid-cols-4"
        : "md:grid-cols-3"

  const fallbackTotalVotes = 1284
  const hasLiveData = totalVotes > 0
  const formatVotes = (value: number) => value.toLocaleString("en-US")
  const totalVotesLabel = hasLiveData
    ? `${formatVotes(totalVotes)} total votes (live)`
    : `${formatVotes(fallbackTotalVotes)} total votes (preview estimate)`

  useEffect(() => {
    const storageKey = `ticu-voter-id:${storyId}:${chapterSlug}`
    const existingId = window.localStorage.getItem(storageKey)
    if (existingId) {
      setUserId(existingId)
      return
    }
    const generatedId = `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
    window.localStorage.setItem(storageKey, generatedId)
    setUserId(generatedId)
  }, [chapterSlug, storyId])

  useEffect(() => {
    if (!userId) return
    const params = new URLSearchParams({ storyId, chapterSlug, userId })
    fetch(`/api/chapter-votes?${params.toString()}`)
      .then((response) => response.json())
      .then((payload) => {
        const counts: Record<string, number> = {}
        for (const result of payload?.results ?? []) {
          counts[result.id] = result.voteCount ?? 0
        }
        setLiveCounts(counts)
        setTotalVotes(payload?.totalVotes ?? 0)
        if (payload?.userVote) {
          setSelected(payload.userVote)
          setVoted(true)
        }
      })
      .catch(() => {
        setLiveCounts({})
        setTotalVotes(0)
      })
  }, [chapterSlug, storyId, userId])

  const optionStats = useMemo(() => {
    return actOptions.map((option) => {
      const liveCount = liveCounts[option.id] ?? 0
      const fallbackPercent = option.votePercent ?? Math.round(100 / Math.max(actOptions.length, 1))
      const fallbackCount = Math.round((fallbackPercent / 100) * fallbackTotalVotes)
      const displayCount = hasLiveData ? liveCount : fallbackCount
      const displayPercent = hasLiveData
        ? Math.round((liveCount / Math.max(totalVotes, 1)) * 100)
        : fallbackPercent
      return {
        ...option,
        displayCount,
        displayPercent,
      }
    })
  }, [actOptions, liveCounts, totalVotes])

  async function submitVote() {
    if (!selected || !userId) return
    setLoading(true)
    setSubmitError(null)
    try {
      const writeResponse = await fetch("/api/chapter-votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId, chapterSlug, userId, optionId: selected }),
      })

      if (!writeResponse.ok) {
        const payload = await writeResponse.json().catch(() => null)
        if (writeResponse.status === 429 && payload?.retryAfterMs) {
          const waitSeconds = Math.max(1, Math.ceil(payload.retryAfterMs / 1000))
          setSubmitError(`You are voting too fast. Please wait ${waitSeconds}s and try again.`)
          return
        }
        setSubmitError(payload?.error ?? "Failed to save your vote. Please try again.")
        return
      }

      const params = new URLSearchParams({ storyId, chapterSlug, userId })
      const response = await fetch(`/api/chapter-votes?${params.toString()}`)
      const payload = await response.json()
      const counts: Record<string, number> = {}
      for (const result of payload?.results ?? []) {
        counts[result.id] = result.voteCount ?? 0
      }
      setLiveCounts(counts)
      setTotalVotes(payload?.totalVotes ?? 0)
      setVoted(true)
    } finally {
      setLoading(false)
    }
  }

  if (isComplete) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-white/50">
          This story is complete. Here&apos;s how the community voted at this chapter:
        </p>
        <p className="text-xs text-white/40">{totalVotesLabel}</p>
        <div className={`grid gap-4 ${gridClass}`}>
          {optionStats.map((act, i) => (
            <div
              key={act.id}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md"
            >
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/40">
                Option {String.fromCharCode(65 + i)}
              </div>
              <h3 className={`mb-2 text-sm font-bold ${accentTextClass}`}>{act.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-white/70">{act.description}</p>
              <div className="mb-1 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${gradientClass}`}
                  style={{ width: `${act.displayPercent}%` }}
                />
              </div>
              <div className={`text-xs font-semibold ${accentTextClass}`}>
                {act.displayPercent}% of votes ({formatVotes(act.displayCount)})
                {!hasLiveData ? " preview" : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (voted) {
    const chosen = actOptions.find((a) => a.id === selected)
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-slate-900/60 py-10 text-center backdrop-blur-md">
        <CheckCircle2 className={`h-14 w-14 ${accentTextClass}`} aria-hidden="true" />
        <div>
          <p className="mb-1 text-xl font-bold text-white">Vote Recorded!</p>
          <p className="text-sm text-white/60">
            You voted for:{" "}
            <span className={`font-bold ${accentTextClass}`}>{chosen?.title}</span>
          </p>
        </div>
        <p className="max-w-xs text-xs text-white/40">
          Results update live as more readers cast their votes.
        </p>
        <button
          onClick={() => {
            setVoted(false)
            setSelected(null)
          }}
          className={`text-xs underline underline-offset-4 ${accentTextClass} hover:opacity-80`}
        >
          Change my vote
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 text-xs text-white/40">
        {totalVotesLabel}
      </div>
      <div className={`mb-6 grid gap-4 ${gridClass}`}>
        {optionStats.map((act, i) => (
          <button
            key={act.id}
            onClick={() => setSelected(act.id)}
            className={`ring-2 text-left rounded-xl border p-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-white/40 ${
              selected === act.id
                ? `border-transparent ${ringClass} bg-slate-800/90`
                : "border-white/10 ring-transparent bg-slate-900/60 hover:border-white/20 hover:bg-slate-800/40"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Option {String.fromCharCode(65 + i)}
              </span>
              {selected === act.id && (
                <span className={`text-xs font-semibold ${accentTextClass}`}>✓ Selected</span>
              )}
            </div>
            <h3
              className={`mb-2 text-base font-bold transition-colors ${
                selected === act.id ? accentTextClass : "text-white"
              }`}
            >
              {act.title}
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-white/70">{act.description}</p>
            <p className="mb-3 text-xs text-white/40">
              {act.displayPercent}% • {formatVotes(act.displayCount)} {hasLiveData ? "votes" : "preview votes"}
            </p>
            {act.risk ? (
              <p className="border-t border-white/10 pt-3 text-xs italic text-white/40">{act.risk}</p>
            ) : null}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          disabled={!selected || loading || !userId}
          onClick={submitVote}
          className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <Vote className="mr-2 h-4 w-4" aria-hidden="true" />
          {loading ? "Saving Vote..." : ctaLabel}
        </Button>
        {!selected && (
          <p className="text-sm text-white/40">Select an option above to cast your vote</p>
        )}
        {submitError ? <p className="text-sm text-red-400">{submitError}</p> : null}
      </div>
    </div>
  )
}
