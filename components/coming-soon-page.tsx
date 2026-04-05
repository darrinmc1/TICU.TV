import Link from "next/link"

type ComingSoonPageProps = {
  title: string
  description: string
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-purple-500/30 bg-slate-900/60 p-10 backdrop-blur-md text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-purple-300">Coming Soon</p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-purple-100 md:text-5xl">{title}</h1>
          <p className="mx-auto mb-8 max-w-xl text-white/75">{description}</p>
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
