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

import { GENRES, STORY_CARDS, CHARACTERS, MERCH_ITEMS } from "@/lib/constants"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="TICU.tv home">
              <Film className="w-8 h-8 text-purple-500" aria-hidden="true" />
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TICU.tv
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              <a href="#genres" className="text-white/90 hover:text-purple-400 transition-colors">
                Genres
              </a>
              <a href="#stories" className="text-white/90 hover:text-purple-400 transition-colors">
                Stories
              </a>
              <Link href="/products" className="text-white/90 hover:text-purple-400 transition-colors">
                Products
              </Link>
              <Link href="/trending" className="text-white/90 hover:text-purple-400 transition-colors">
                Trending
              </Link>
              <Link href="/leaderboard" className="text-white/90 hover:text-purple-400 transition-colors">
                Leaderboard
              </Link>
              <Link href="/instructions" className="text-white/90 hover:text-purple-400 transition-colors">
                Instructions
              </Link>
              <Link href="/admin" className="text-white/90 hover:text-purple-400 transition-colors">
                Admin
              </Link>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                aria-label="Sign in to your account"
              >
                Sign In
              </Button>
            </nav>
            <button
              className="md:hidden text-white/90 hover:text-purple-400 transition-colors"
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
          <nav className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10" aria-label="Mobile navigation">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              <a
                href="#genres"
                className="text-white/90 hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Genres
              </a>
              <a
                href="#stories"
                className="text-white/90 hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stories
              </a>
              <Link
                href="/products"
                className="text-white/90 hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/trending"
                className="text-white/90 hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                href="/leaderboard"
                className="text-white/90 hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/instructions"
                className="text-white/90 hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructions
              </Link>
              <Link
                href="/admin"
                className="text-white/90 hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full"
                aria-label="Sign in to your account"
              >
                Sign In
              </Button>
            </div>
          </nav>
        )}
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/epic-fantasy-dragon-castle-cinematic.jpg')] bg-cover bg-top opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/20 to-slate-950" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-blue-400 leading-tight">
              The Interactive Cinema Universe
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-medium mb-4">Your Votes Shape Every Story</p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Experience AI-generated weekly episodes across 12+ genres. Vote on plot decisions, character fates, and
              story directions in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="#stories" aria-label="Read current stories">
              <Card className="bg-slate-900/60 backdrop-blur-md border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2">Read Current Stories</h3>
                  <p className="text-sm text-white/60">Explore ongoing adventures</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/vote" aria-label="Vote on latest episodes">
              <Card className="bg-slate-900/60 backdrop-blur-md border-pink-500/30 hover:border-pink-500/60 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Vote className="w-12 h-12 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2">Vote on Latest</h3>
                  <p className="text-sm text-white/60">Shape the narrative</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/creator" aria-label="Start a new story">
              <Card className="bg-slate-900/60 backdrop-blur-md border-blue-500/30 hover:border-blue-500/60 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <PlusCircle className="w-12 h-12 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2">Start New Story</h3>
                  <p className="text-sm text-white/60">Create your adventure</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section id="stories" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Active Stories
            </h2>
            <p className="text-xl text-white/70">Vote on ongoing narratives and shape their outcomes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORY_CARDS.map((story) => (
              <Card
                key={story.id}
                className={`bg-slate-900/60 backdrop-blur-md ${story.borderColor} transition-all group cursor-pointer`}
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
                <CardContent className="p-6">
                  <div className={`mb-5 aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${story.gradientColor} p-[1px]`}>
                    <div className="flex h-full items-center justify-center rounded-[11px] bg-slate-950/90">
                      <div className="text-center">
                        <div className={`mb-2 text-4xl ${story.iconColor}`} aria-hidden="true">🎬</div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Image Placeholder</p>
                      </div>
                    </div>
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
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent" aria-label={`Follow ${story.title}`}>
                          <Star className="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
                          Follow
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
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              aria-label="View all available stories"
            >
              View All Stories
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Characters
            </h2>
            <p className="text-xl text-white/70">Meet heroes and villains from across the multiverse</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHARACTERS.map((character) => (
            <Card key={character.id} className={`bg-slate-900/60 backdrop-blur-md ${character.borderColor} transition-all group`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${character.gradientColor} flex items-center justify-center text-2xl`} aria-hidden="true">
                    {character.emoji}
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
                  <Button size="sm" variant="outline" className="w-full bg-transparent" aria-label={`${character.name} from completed story`}>
                    <Star className="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
                    Completed Story
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full bg-transparent" aria-label={`Vote for ${character.name} to have more focus`}>
                    <Vote className="w-3 h-3 mr-1" aria-hidden="true" />
                    Vote for Focus
                  </Button>
                )}
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Official Merchandise
            </h2>
            <p className="text-xl text-white/70">Bring your favorite stories home</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MERCH_ITEMS.map((item) => (
            <Card key={item.id} className={`bg-slate-900/60 backdrop-blur-md ${item.borderColor} transition-all group`}>
              <CardContent className="p-6">
                <div className={`aspect-square bg-gradient-to-br ${item.gradientColor} rounded-lg mb-4 flex items-center justify-center text-6xl`} aria-hidden="true">
                  {item.emoji}
                </div>
                <h3 className={`font-serif text-lg font-bold mb-2 group-hover:${item.textColor} transition-colors`}>
                  {item.name}
                </h3>
                <p className="text-sm text-white/60 mb-2">{item.collection}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-bold ${item.textColor}`}>{item.price}</span>
                  <Button size="sm" className={`bg-gradient-to-r ${item.borderColor.replace('border-', '').replace('/30 hover:border-', ' hover:').replace('/60', '')}`} aria-label={`Shop for ${item.name}`}>
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              aria-label="Browse all available merchandise"
            >
              Browse All Merchandise
            </Button>
          </div>
        </div>
      </section>

      <section id="genres" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore Genres
            </h2>
            <p className="text-xl text-white/70">Choose your adventure across 12+ immersive genres</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {GENRES.map((genre) => (
              <Link
                key={genre.name}
                href={`/${genre.name.toLowerCase().replace(/\s+/g, "-")}`}
                aria-label={`Explore ${genre.name} genre`}
                className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Card className="bg-slate-900/60 backdrop-blur-md border-white/10 transition-all cursor-pointer group-hover:border-purple-500/50">
                  <CardContent className="p-4 text-center">
                    <div className={`mb-4 aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${genre.color} p-[1px]`}>
                      <div className="flex h-full flex-col items-center justify-center rounded-[11px] bg-slate-950/90 px-3">
                        <div className="mb-2 text-4xl group-hover:scale-110 transition-transform" aria-hidden="true">{genre.icon}</div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">Genre Art</p>
                      </div>
                    </div>
                    <h3 className="font-semibold">{genre.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10" role="contentinfo">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="w-6 h-6 text-purple-500" aria-hidden="true" />
            <span className="font-serif text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TICU.tv
            </span>
          </div>
          <p className="text-white/60 mb-4">The Interactive Cinema Universe - Where Your Votes Shape Every Story</p>
          <nav className="flex justify-center gap-6 text-sm text-white/60" aria-label="Footer navigation">
            <Link href="/about" className="hover:text-purple-400 transition-colors">
              About
            </Link>
            <Link href="/help" className="hover:text-purple-400 transition-colors">
              Help
            </Link>
            <Link href="/terms" className="hover:text-purple-400 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
