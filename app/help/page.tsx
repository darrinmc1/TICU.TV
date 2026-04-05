import Link from "next/link"

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-purple-500/30 bg-slate-900/60 p-10 text-center backdrop-blur-md">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-purple-300">Help Center</p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-purple-100 md:text-5xl">Need Help Getting Started?</h1>
          <p className="mx-auto mb-8 max-w-xl text-white/75">
            Start with the Instructions page for a simple guide to stories, voting, and how act releases are decided.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/instructions"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700"
            >
              Open Instructions
            </Link>
            <Link
              href="/vote"
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Go To Voting
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
