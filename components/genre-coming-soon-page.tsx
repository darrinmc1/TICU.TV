import Link from "next/link"

type GenreComingSoonPageProps = {
  genreTitle: string
}

export function GenreComingSoonPage({ genreTitle }: GenreComingSoonPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-purple-500/30 bg-slate-900/60 p-10 text-center backdrop-blur-md">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-purple-300">Genre Coming Soon</p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-purple-100 md:text-5xl">{genreTitle}</h1>
          <p className="mx-auto mb-8 max-w-xl text-white/75">
            New stories in this genre are coming soon. Vote for your favourite movie genre while we build this experience.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/vote"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700"
            >
              Vote For Your Favourite Genre
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
