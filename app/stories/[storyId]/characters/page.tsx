import Link from "next/link"
import { notFound } from "next/navigation"
import { getStory } from "@/lib/content"
import type { CharacterData } from "../_data"
import { STORIES } from "../_data"

// Reads story data from Supabase on each request — must not be statically prerendered.
export const dynamic = "force-dynamic"

type CastCharacter = CharacterData & {
  status?: "Active" | "Inactive"
  castClass?: string
}

type CastPageData = {
  storyId: string
  title: string
  subtitle: string
  coverGradient: string
  accentTextClass: string
  introHref: string
  characters: CastCharacter[]
}

function deriveClassFromRole(role: string): string {
  if (role.includes("&")) {
    const parts = role.split("&").map((part) => part.trim())
    return parts[parts.length - 1]
  }

  if (role.includes("/")) {
    const parts = role.split("/").map((part) => part.trim())
    return parts[0]
  }

  return role
}

async function getCastPageData(storyId: string): Promise<CastPageData | undefined> {
  const serialStory = await getStory(storyId)

  if (serialStory) {
    const firstPublishedChapter = serialStory.chapters.find((chapter) => chapter.status !== "draft")

    return {
      storyId,
      title: serialStory.title,
      subtitle: `Meet the key characters shaping ${serialStory.title}. Vote to keep fan favorites, spotlight underdogs, and influence who drives the next chapter.`,
      coverGradient: serialStory.coverGradient,
      accentTextClass: serialStory.accentTextClass,
      introHref: firstPublishedChapter
        ? `/stories/${storyId}/chapters/${firstPublishedChapter.slug}`
        : `/stories/${storyId}`,
      characters: serialStory.characters.map((character) => ({
        ...character,
        castClass: deriveClassFromRole(character.role),
        status: "Active",
      })),
    }
  }

  const fallback = STORIES[storyId]

  if (!fallback) {
    return undefined
  }

  return {
    storyId,
    title: fallback.title,
    subtitle: `Meet the key characters shaping ${fallback.title}. Vote to keep fan favorites, spotlight underdogs, and influence who drives the next chapter.`,
    coverGradient: fallback.coverGradient,
    accentTextClass: fallback.accentTextClass,
    introHref: `/stories/${storyId}`,
    characters: fallback.characters.map((character) => ({
      ...character,
      castClass: deriveClassFromRole(character.role),
      status: "Active",
    })),
  }
}

type CharacterCardProps = {
  character: CastCharacter
  introHref: string
}

function CharacterCard({ character, introHref }: CharacterCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/80 shadow-[0_18px_50px_-30px_rgba(34,211,238,0.45)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-amber-300/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        {character.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${character.gradient}`}>
            <span className="select-none text-7xl" role="img" aria-label={character.role}>
              {character.emoji}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">
          {character.castClass}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white">
          {character.status ?? "Active"}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-3xl font-bold leading-tight text-white">{character.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/70">{character.bio}</p>
        </div>

        <dl className="space-y-1 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-white">Role</dt>
            <dd className="text-amber-300">{character.role}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-white">Class</dt>
            <dd className="text-cyan-300">{character.castClass}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-white">Status</dt>
            <dd className="text-emerald-300">{character.status ?? "Active"}</dd>
          </div>
        </dl>

        <div className="flex gap-2">
          <Link
            href={introHref}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Watch Intro
          </Link>
          <Link
            href="/vote"
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Vote Keep
          </Link>
        </div>
      </div>
    </article>
  )
}

type PageProps = { params: Promise<{ storyId: string }> }

export default async function StoryCharactersPage({ params }: PageProps) {
  const { storyId } = await params
  const data = await getCastPageData(storyId)

  if (!data) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-10 pt-24 sm:px-6">
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${data.coverGradient} opacity-15`} />
        <div className={`pointer-events-none absolute -top-36 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br ${data.coverGradient} opacity-20 blur-3xl`} />

        <div className="relative mx-auto max-w-6xl text-center">
          <Link
            href={`/stories/${data.storyId}`}
            className="mb-6 inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Back to Story
          </Link>

          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">Heroes & Villains of the Realm</h1>
          <p className={`mx-auto mt-4 max-w-3xl text-lg leading-relaxed ${data.accentTextClass}`}>
            {data.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {data.characters.map((character) => (
            <CharacterCard key={character.name} character={character} introHref={data.introHref} />
          ))}
        </div>
      </section>
    </main>
  )
}
