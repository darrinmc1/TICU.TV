import Link from "next/link"

const STEPS = [
  {
    title: "Start With A Story",
    body: "Open any active story card from the home page to read the opening act and context before voting.",
  },
  {
    title: "Review The Three Act Options",
    body: "Each story includes three next-act choices with short descriptions so you can decide which direction is best.",
  },
  {
    title: "Cast Or Update Your Vote",
    body: "Choose one option per story. You can change your vote later as the story evolves.",
  },
  {
    title: "Track Results",
    body: "After voting, check the current totals to see which act is leading for each story.",
  },
]

export default function InstructionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300">Instructions</p>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">How Voting Works</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Follow these steps to vote on the next act for each story and help decide what gets released next.
          </p>
        </div>

        <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-8 backdrop-blur-md">
          <ol className="space-y-5">
            {STEPS.map((step, idx) => (
              <li key={step.title} className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-cyan-300">Step {idx + 1}</p>
                <h2 className="text-xl font-semibold text-white">{step.title}</h2>
                <p className="mt-2 text-white/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/vote"
            className="inline-flex items-center rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-cyan-700 hover:to-blue-700"
          >
            Go To Voting
          </Link>
          <Link
            href="/help"
            className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back To Help
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </main>
  )
}
