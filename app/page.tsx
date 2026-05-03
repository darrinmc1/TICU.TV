"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Play,
  Vote,
  Film,
  Clock,
  Star,
  BookOpen,
  Sparkles,
  PlusCircle,
  Menu,
  X,
} from "@/components/icons"

import { GENRES, STORY_CARDS, CHARACTERS, MERCH_ITEMS, getStoryCardImage } from "@/lib/constants"

const STORY_ART_BY_GENRE: Record<string, { icon: string; tint: string; texture: string; tag: string }> = {
  fantasy: {
    icon: "DRAGON",
    tint: "from-orange-300/40 via-amber-300/20 to-rose-300/20",
    texture: "bg-[radial-gradient(circle_at_18%_24%,rgba(255,245,157,0.5),transparent_42%)]",
    tag: "Mythic",
  },
  romance: {
    icon: "PARIS",
    tint: "from-rose-300/40 via-pink-300/20 to-orange-200/20",
    texture: "bg-[radial-gradient(circle_at_78%_20%,rgba(253,164,175,0.45),transparent_42%)]",
    tag: "Intimate",
  },
  western: {
    icon: "DUST",
    tint: "from-amber-300/45 via-orange-300/25 to-yellow-200/20",
    texture: "bg-[radial-gradient(circle_at_20%_78%,rgba(251,191,36,0.45),transparent_45%)]",
    tag: "Frontier",
  },
  "sci-fi": {
    icon: "ORBIT",
    tint: "from-cyan-300/45 via-blue-300/25 to-indigo-300/20",
    texture: "bg-[radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.5),transparent_42%)]",
    tag: "Future",
  },
}

const DEFAULT_STORY_ART = {
  icon: "EPIC",
  tint: "from-cyan-300/40 via-amber-300/20 to-slate-300/20",
  texture: "bg-[radial-gradient(circle_at_26%_24%,rgba(148,163,184,0.45),transparent_42%)]",
  tag: "Featured",
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [failedCardImages, setFailedCardImages] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const markCardImageFailed = (storyId: string) => {
    setFailedCardImages((prev) => ({ ...prev, [storyId]: true }))
  }

  return (
    <div className="story-atmosphere relative min-h-screen overflow-hidden">
      <div className="film-grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-14 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-28 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-amber-200/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="TICU.tv home">
              <Film className="w-8 h-8 text-amber-300" aria-hidden="true" />
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                TICU.tv
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              <a href="#genres" className="text-white/90 hover:text-amber-300 transition-colors">
                Genres
              </a>
              <a href="#stories" className="text-white/90 hover:text-amber-300 transition-colors">
                Stories
              </a>
              <Link href="/products" className="text-white/90 hover:text-amber-300 transition-colors">
                Products
              </Link>
              <Link href="/leaderboard" className="text-white/90 hover:text-amber-300 transition-colors">
                Leaderboard
              </Link>
              <Link href="/instructions" className="text-white/90 hover:text-amber-300 transition-colors">
                Instructions
              </Link>
              <Link href="/admin" className="text-white/90 hover:text-amber-300 transition-colors">
                Admin
              </Link>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 hover:from-amber-400 hover:to-cyan-400"
                aria-label="Sign in to your account"
              >
                <Link href="/admin/login">Sign In</Link>
              </Button>
            </nav>
            <button
              className="md:hidden text-white/90 hover:text-amber-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-amber-200/15" aria-label="Mobile navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
              <a
                href="#genres"
                className="text-white/90 hover:text-amber-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Genres
              </a>
              <a
                href="#stories"
                className="text-white/90 hover:text-amber-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stories
              </a>
              <Link
                href="/products"
                className="text-white/90 hover:text-amber-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/leaderboard"
                className="text-white/90 hover:text-amber-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/instructions"
                className="text-white/90 hover:text-amber-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructions
              </Link>
              <Link
                href="/admin"
                className="text-white/90 hover:text-amber-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 hover:from-amber-400 hover:to-cyan-400 w-full"
                aria-label="Sign in to your account"
              >
                <Link href="/admin/login">Sign In</Link>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <section className="relative z-10 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/epic-fantasy-dragon-castle-cinematic.jpg"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
          >
            <source src="https://cdn.pixabay.com/video/2020/07/19/44919-442468352_large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-the-clouds-at-sunset-10020-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/20 to-slate-950" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 reveal-up">
          <div className="mb-8 space-y-4">
            <Badge className="border border-amber-200/25 bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-200">
              New Episodes Every Week
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-100 via-orange-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              The Interactive Cinema Universe
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-3 sm:mb-4">Your Votes Shape Every Story</p>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Experience AI-generated weekly episodes across 12+ genres. Vote on plot decisions, character fates, and
              story directions in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto reveal-up delay-2 reveal-stagger">
            <Link href="#stories" aria-label="Read current stories">
              <Card className="glass-panel border-amber-300/30 hover:border-amber-300/70 hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                  <img src="/images/hero_read_stories.png" alt="" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-5 sm:p-6 text-center relative z-10">
                  <BookOpen className="w-12 h-12 text-amber-300 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2 text-white">Read Current Stories</h3>
                  <p className="text-sm text-white/60">Explore ongoing adventures</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/stories/dragons-last-breath" aria-label="Open trending story and vote on latest">
              <Card className="glass-panel border-orange-300/30 hover:border-orange-300/70 hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                  <img src="/images/hero_trending.png" alt="" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-5 sm:p-6 text-center relative z-10">
                  <Vote className="w-12 h-12 text-orange-300 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2 text-white">Trending / Vote on Latest</h3>
                  <p className="text-sm text-white/60">The Dragon's Last Breath</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/creator" aria-label="Start a new story">
              <Card className="glass-panel border-cyan-300/30 hover:border-cyan-300/70 hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                  <img src="/images/hero_create.png" alt="" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-5 sm:p-6 text-center relative z-10">
                  <PlusCircle className="w-12 h-12 text-cyan-300 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2 text-white">Start New Story</h3>
                  <p className="text-sm text-white/60">Create your adventure</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section id="stories" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 bg-slate-950/40 backdrop-blur-[1px] reveal-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="editorial-kicker mb-3">Currently Voting</p>
            <h2 className="section-title font-serif mb-4 bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
              Active Stories
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/75">Vote on ongoing narratives and shape their outcomes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 reveal-stagger">
            {STORY_CARDS.map((story, index) => {
              const genreKey = story.genre.toLowerCase().replace(/\s+/g, "-")
              const art = STORY_ART_BY_GENRE[genreKey] ?? DEFAULT_STORY_ART
              const mappedImageSrc = getStoryCardImage(story.id, story.chapter)
              const showMappedImage = Boolean(mappedImageSrc) && !failedCardImages[story.id]

              return (
              <Card
                key={story.id}
                style={{ animationDelay: `${index * 90}ms` }}
                className={`glass-panel ${story.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(251,191,36,0.7)] group cursor-pointer`}
                role="link"
                tabIndex={0}
                aria-label={`Open ${story.title}`}
                onClick={() => router.push(`/stories/${story.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    router.push(`/stories/${story.id}`)
                  }
                }}
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="cinematic-frame mb-5 aspect-[16/9] p-[1px]">
                    {showMappedImage ? (
                      <div className="relative h-full rounded-[11px] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mappedImageSrc}
                          alt={`${story.title} ${story.chapter} establishing beat`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={() => markCardImageFailed(story.id)}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                          <p className="text-xs text-white/70">{story.chapter}</p>
                          <h4 className="font-serif text-lg font-bold text-white line-clamp-1 drop-shadow-sm">{story.title}</h4>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-full rounded-[11px] overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${story.gradientColor} opacity-70`} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${art.tint}`} />
                        <div className={`absolute inset-0 ${art.texture}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />
                        <div className="relative flex h-full flex-col justify-between p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">{art.tag}</p>
                            <p className="font-mono text-[10px] tracking-[0.28em] text-white/75">{art.icon}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/60">{story.chapter}</p>
                            <h4 className="font-serif text-lg font-bold text-white line-clamp-1">{story.title}</h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`bg-gradient-to-r ${story.gradientColor}`}>
                      {story.status === "voting" && <Vote className="w-3 h-3 mr-1" aria-hidden="true" />}
                      {story.status === "new" && <Sparkles className="w-3 h-3 mr-1" aria-hidden="true" />}
                      {story.status.toUpperCase().replace("-", " ")}
                    </Badge>
                    {(story.timeLeft || story.timeAgo) && (
                      <div className="flex items-center text-xs text-white/60">
                        <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                        {story.timeLeft || story.timeAgo}
                      </div>
                    )}
                    {story.rating && (
                      <div className="flex items-center text-xs text-white/60">
                        <Star className="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
                        {story.rating}
                      </div>
                    )}
                  </div>
                  <h3 className={`font-serif text-xl font-bold mb-2 group-hover:${story.iconColor} transition-colors`}>
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {story.genre}
                    </Badge>
                    <span className="text-xs text-white/60">{story.chapter}</span>
                  </div>
                  <p className="text-sm text-white/70 mb-4 line-clamp-2">
                    {story.description}
                  </p>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {story.status === "complete" ? (
                      <Button asChild size="sm" className={`w-full bg-gradient-to-r ${story.gradientColor}`} aria-label={`Read ${story.title}`}>
                        <Link href={`/stories/${story.id}`}>
                          <BookOpen className="w-3 h-3 mr-1" aria-hidden="true" />
                          Read Story
                        </Link>
                      </Button>
                    ) : story.status === "in-progress" ? (
                      <>
                        <Button asChild size="sm" className={`flex-1 bg-gradient-to-r ${story.gradientColor}`} aria-label={`Read ${story.title}`}>
                          <Link href={`/stories/${story.id}`}>
                            <BookOpen className="w-3 h-3 mr-1" aria-hidden="true" />
                            Read
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent" aria-label={`Follow ${story.title}`}>
                          <Link href={`/stories/${story.id}`}>
                            <Star className="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
                            Follow
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild size="sm" className={`flex-1 bg-gradient-to-r ${story.gradientColor}`} aria-label={`Read ${story.title}`}>
                          <Link href={`/stories/${story.id}`}>
                            <BookOpen className="w-3 h-3 mr-1" aria-hidden="true" />
                            Read
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent" aria-label={`Vote on ${story.title}`}>
                          <Link href="/vote">
                            <Vote className="w-3 h-3 mr-1" aria-hidden="true" />
                            Vote
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 hover:from-amber-400 hover:to-cyan-400"
              aria-label="View all available stories"
            >
              <Link href="/trending">View All Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 reveal-up delay-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="editorial-kicker mb-3">Cast Highlights</p>
            <h2 className="section-title font-serif mb-4 bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
              Featured Characters
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/75">Meet heroes and villains from across the multiverse</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 reveal-stagger">
            {CHARACTERS.map((character, index) => (
            <Card key={character.id} className={`glass-panel ${character.borderColor} transition-all duration-300 hover:-translate-y-1 group`}>
              <CardContent className="p-5 sm:p-6" style={{ animationDelay: `${index * 75}ms` }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${character.borderColor.split(' ')[0]} flex-shrink-0 group-hover:scale-105 transition-transform`} aria-hidden="true">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-serif text-lg font-bold mb-1 group-hover:${character.textColor} transition-colors`}>
                      {character.name}
                    </h3>
                    <p className="text-xs text-white/60 mb-2">{character.story} • {character.genre}</p>
                    <Badge variant="outline" className="text-xs">
                      {character.role}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  {character.description}
                </p>
                {character.isCompleted ? (
                  <Button asChild size="sm" variant="outline" className="w-full bg-transparent" aria-label={`${character.name} from completed story`}>
                    <Link href="/trending">
                      <Star className="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
                      Completed Story
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="sm" variant="outline" className="w-full bg-transparent" aria-label={`Vote for ${character.name} to have more focus`}>
                    <Link href="/vote">
                      <Vote className="w-3 h-3 mr-1" aria-hidden="true" />
                      Vote for Focus
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>


      <section id="genres" className="py-16 sm:py-20 px-4 sm:px-6 reveal-up delay-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="editorial-kicker mb-3">Pick Your Lane</p>
            <h2 className="section-title font-serif mb-4 bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
              Explore Genres
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/75">Choose your adventure across 12+ immersive genres</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 reveal-stagger">
            {GENRES.map((genre) => (
              <Link
                key={genre.name}
                href={`/${genre.name.toLowerCase().replace(/\s+/g, "-")}`}
                aria-label={`Explore ${genre.name} genre`}
                className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Card className="glass-panel border-white/10 transition-all cursor-pointer group-hover:border-amber-300/50">
                  <CardContent className="p-4 text-center">
                    <div className={`mb-4 aspect-[4/5] overflow-hidden rounded-xl border border-white/10 relative group`}>
                      <img
                        src={genre.image}
                        alt={genre.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity`} />
                    </div>
                    <h3 className="font-semibold flex items-center justify-center gap-2 group-hover:text-amber-300 transition-colors">
                      <span className="text-xl" aria-hidden="true">{genre.icon}</span>
                      {genre.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-950/35 reveal-up delay-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="editorial-kicker mb-2 text-xs uppercase tracking-widest text-amber-300">Collector's Shelf</p>
            <h2 className="text-3xl font-serif mb-3 bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
              Official Merchandise
            </h2>
            <p className="mx-auto max-w-xl text-sm text-white/60">Limited edition collectibles from your favorite story universes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal-stagger">
            {MERCH_ITEMS.map((item, index) => (
            <Card key={item.id} className={`glass-panel ${item.borderColor} transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full`}>
              <CardContent className="p-3 sm:p-4 flex flex-col h-full" style={{ animationDelay: `${index * 50}ms` }}>
                <div className={`aspect-square bg-slate-900 rounded-md mb-3 overflow-hidden relative group-hover:ring-2 ${item.borderColor.split(' ')[0]} transition-all`} aria-hidden="true">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${item.gradientColor} flex items-center justify-center text-4xl`}>
                      {item.emoji}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:opacity-0 transition-opacity" />
                </div>
                <div className="flex-1 min-h-[4rem]">
                  <h3 className={`font-serif text-[13px] leading-tight font-bold mb-1 line-clamp-2 group-hover:${item.textColor} transition-colors`}>
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter mb-2">{item.collection.split(' ')[0]}</p>
                </div>
                <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-2">
                  <span className={`text-sm font-bold ${item.textColor}`}>${item.price}</span>
                  <Button 
                    size="sm" 
                    className={`w-full h-7 text-[9px] uppercase tracking-wider font-bold bg-gradient-to-r ${item.borderColor.replace('border-', '').replace('/30 hover:border-', ' hover:').replace('/60', '')}`} 
                    aria-label={`Request ${item.name}`}
                    onClick={() => {
                      const subject = encodeURIComponent(`Merchandise Request: ${item.name}`);
                      const body = encodeURIComponent(`I would like to request information about purchasing the ${item.name} ($${item.price}) from the ${item.collection}.`);
                      window.location.href = `mailto:admin@ticu.tv?subject=${subject}&body=${body}`;
                    }}
                  >
                    Request Item
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 sm:py-12 px-4 sm:px-6 border-t border-white/10" role="contentinfo">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="w-6 h-6 text-amber-300" aria-hidden="true" />
            <span className="font-serif text-lg font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
              TICU.tv
            </span>
          </div>
          <p className="text-white/60 mb-4">The Interactive Cinema Universe - Where Your Votes Shape Every Story</p>
          <nav className="flex justify-center gap-6 text-sm text-white/60" aria-label="Footer navigation">
            <Link href="/about" className="hover:text-amber-300 transition-colors">
              About
            </Link>
            <Link href="/help" className="hover:text-amber-300 transition-colors">
              Help
            </Link>
            <Link href="/terms" className="hover:text-amber-300 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-amber-300 transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
