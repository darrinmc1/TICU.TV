"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2, Lock, Mail, Vote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

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
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [liveCounts, setLiveCounts] = useState<Record<string, number>>({})
  const [totalVotes, setTotalVotes] = useState(0)

  // Sign-in modal state
  const [signInOpen, setSignInOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [signInLoading, setSignInLoading] = useState(false)
  const [signInError, setSignInError] = useState<string | null>(null)
  const [signInSent, setSignInSent] = useState(false)

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

  // Subscribe to auth state. Updates when user signs in/out in any tab.
  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setAuthLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      // If they just signed in, close the modal.
      if (session?.user) {
        setSignInOpen(false)
        setSignInSent(false)
        setEmail("")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load tallies. Re-fetched whenever auth state changes so userVote
  // updates when someone signs in.
  useEffect(() => {
    const params = new URLSearchParams({ storyId, chapterSlug })
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
        } else {
          setVoted(false)
        }
      })
      .catch(() => {
        setLiveCounts({})
        setTotalVotes(0)
      })
  }, [chapterSlug, storyId, user?.id])

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
    if (!selected || !user) return
    setLoading(true)
    setSubmitError(null)
    try {
      const writeResponse = await fetch("/api/chapter-votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId, chapterSlug, optionId: selected }),
      })

      if (!writeResponse.ok) {
        const payload = await writeResponse.json().catch(() => null)
        if (writeResponse.status === 401) {
          setSubmitError("Your sign-in expired. Please sign in again.")
          return
        }
        if (writeResponse.status === 429 && payload?.retryAfterMs) {
          const waitSeconds = Math.max(1, Math.ceil(payload.retryAfterMs / 1000))
          setSubmitError(`You are voting too fast. Please wait ${waitSeconds}s and try again.`)
          return
        }
        setSubmitError(payload?.error ?? "Failed to save your vote. Please try again.")
        return
      }

      const params = new URLSearchParams({ storyId, chapterSlug })
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

  async function sendMagicLink() {
    if (!email.trim()) {
      setSignInError("Please enter your email address.")
      return
    }
    setSignInLoading(true)
    setSignInError(null)
    try {
      const supabase = createSupabaseBrowserClient()
      // Build a redirect_to that brings them back to this chapter after sign-in.
      const redirectTo = `${window.location.origin}/auth/callback?redirect_to=${encodeURIComponent(
        window.location.pathname
      )}`
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo },
      })
      if (error) {
        setSignInError(error.message ?? "Failed to send sign-in link. Please try again.")
        return
      }
      setSignInSent(true)
    } finally {
      setSignInLoading(false)
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
            className={`ring-2 text-left rounded-xl border p-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-white/40 ${selected === act.id
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
              className={`mb-2 text-base font-bold transition-colors ${selected === act.id ? accentTextClass : "text-white"
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

      {user ? (
        <>
          <Button
            disabled={!selected || loading}
            onClick={submitVote}
            className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Vote className="mr-2 h-4 w-4" aria-hidden="true" />
            {loading ? "Saving Vote..." : ctaLabel}
          </Button>
          {!selected && (
            <p className="mt-2 text-sm text-white/40">Select an option above to cast your vote</p>
          )}
        </>
      ) : authLoading ? (
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
          <p className="text-sm text-white/50">Loading...</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
          {!signInOpen ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className={`h-5 w-5 ${accentTextClass}`} aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-white">Sign in to vote</p>
                  <p className="text-xs text-white/50">
                    We&apos;ll email you a sign-in link. No password needed.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setSignInOpen(true)}
                disabled={!selected}
                className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
              >
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Sign in
              </Button>
            </div>
          ) : signInSent ? (
            <div className="flex flex-col gap-2 text-center">
              <Mail className={`mx-auto h-10 w-10 ${accentTextClass}`} aria-hidden="true" />
              <p className="text-base font-semibold text-white">Check your inbox</p>
              <p className="text-sm text-white/60">
                We sent a sign-in link to <span className="font-semibold">{email}</span>.
                Click it and you&apos;ll come right back here to cast your vote.
              </p>
              <button
                onClick={() => {
                  setSignInSent(false)
                  setSignInOpen(false)
                  setEmail("")
                  setSignInError(null)
                }}
                className={`mt-2 text-xs underline underline-offset-4 ${accentTextClass} hover:opacity-80`}
              >
                Use a different email
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Mail className={`h-5 w-5 ${accentTextClass}`} aria-hidden="true" />
                <p className="text-sm font-semibold text-white">Sign in with email</p>
              </div>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMagicLink()
                }}
                placeholder="you@example.com"
                disabled={signInLoading}
                className="rounded-lg border border-white/15 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
              />
              {signInError ? (
                <p className="text-xs text-red-400">{signInError}</p>
              ) : null}
              <div className="flex items-center gap-2">
                <Button
                  onClick={sendMagicLink}
                  disabled={signInLoading || !email.trim()}
                  className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {signInLoading ? "Sending..." : "Send sign-in link"}
                </Button>
                <button
                  onClick={() => {
                    setSignInOpen(false)
                    setSignInError(null)
                  }}
                  className="text-xs text-white/50 underline underline-offset-4 hover:text-white/80"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-white/40">
                By signing in you agree to our{" "}
                <a href="/terms" className="underline hover:text-white/60">Terms</a> and{" "}
                <a href="/privacy" className="underline hover:text-white/60">Privacy Policy</a>.
              </p>
            </div>
          )}
        </div>
      )}

      {submitError ? <p className="mt-3 text-sm text-red-400">{submitError}</p> : null}
    </div>
  )
}