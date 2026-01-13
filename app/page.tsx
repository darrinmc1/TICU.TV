"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Play = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M8 5v10l8-5-8-5z" />
  </svg>
)
const Vote = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)
const Film = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
      clipRule="evenodd"
    />
  </svg>
)
const Clock = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)
const Star = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)
const BookOpen = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13M3 6.253C4.168 5.477 5.754 5 7.5 5c1.747 0 3.332.477 4.5 1.253v13C11.832 18.477 10.246 18 8.5 18s-2.254.477-3 1.253"
    />
  </svg>
)
const Sparkles = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)
const PlusCircle = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)
const Sword = () => <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"></svg>
const Bell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)
const Zap = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
      clipRule="evenodd"
    />
  </svg>
)
const Heart = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
)

export default function HomePage() {
  const genres = [
    { name: "Fantasy", icon: "🗡️", color: "from-purple-600 to-pink-600" },
    { name: "Sci-Fi", icon: "🚀", color: "from-blue-600 to-cyan-600" },
    { name: "Horror", icon: "👻", color: "from-red-600 to-orange-600" },
    { name: "Romance", icon: "💕", color: "from-pink-600 to-rose-600" },
    { name: "Mystery", icon: "🔍", color: "from-indigo-600 to-purple-600" },
    { name: "Thriller", icon: "⚡", color: "from-yellow-600 to-red-600" },
    { name: "Western", icon: "🤠", color: "from-amber-600 to-orange-600" },
    { name: "Historical", icon: "📜", color: "from-stone-600 to-amber-600" },
    { name: "Comedy", icon: "😂", color: "from-green-600 to-teal-600" },
    { name: "Adventure", icon: "🗺️", color: "from-emerald-600 to-green-600" },
    { name: "Dystopian", icon: "🏚️", color: "from-gray-600 to-slate-600" },
    { name: "Supernatural", icon: "✨", color: "from-violet-600 to-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-purple-500" />
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TICU.tv
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#genres" className="text-white/90 hover:text-purple-400 transition-colors">
                Genres
              </a>
              <a href="#stories" className="text-white/90 hover:text-purple-400 transition-colors">
                Stories
              </a>
              <a href="#trending" className="text-white/90 hover:text-purple-400 transition-colors">
                Trending
              </a>
              <Link href="/admin" className="text-white/90 hover:text-purple-400 transition-colors">
                Admin
              </Link>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/epic-fantasy-dragon-castle-cinematic.jpg')] bg-cover bg-[center_40%] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950" />
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
            <Card className="bg-slate-900/60 backdrop-blur-md border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Read Current Stories</h3>
                <p className="text-sm text-white/60">Explore ongoing adventures</p>
              </CardContent>
            </Card>

            <Link href="/vote">
              <Card className="bg-slate-900/60 backdrop-blur-md border-pink-500/30 hover:border-pink-500/60 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Vote className="w-12 h-12 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-2">Vote on Latest</h3>
                  <p className="text-sm text-white/60">Shape the narrative</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="bg-slate-900/60 backdrop-blur-md border-blue-500/30 hover:border-blue-500/60 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <PlusCircle className="w-12 h-12 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Start New Story</h3>
                <p className="text-sm text-white/60">Create your adventure</p>
              </CardContent>
            </Card>
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

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <Card
                key={genre.name}
                className="bg-slate-900/60 backdrop-blur-md border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl mb-3 group-hover:scale-110 transition-transform`}>{genre.icon}</div>
                  <h3 className="font-semibold">{genre.name}</h3>
                </CardContent>
              </Card>
            ))}
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
            {/* Story Card 1 - Voting */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-purple-500/30 hover:border-purple-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Vote className="w-3 h-3 mr-1" />
                    VOTING
                  </Badge>
                  <div className="flex items-center text-xs text-white/60">
                    <Clock className="w-3 h-3 mr-1" />
                    2d 14h left
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  The Dragon's Gambit
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Fantasy
                  </Badge>
                  <span className="text-xs text-white/60">Chapter 12</span>
                  <span className="text-xs text-white/60">• 12,847 votes</span>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  The party stands before the ancient dragon's lair. Will they negotiate, fight, or find another path?
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Story Card 2 - New */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-blue-500/30 hover:border-blue-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                  <div className="flex items-center text-xs text-white/60">
                    <Clock className="w-3 h-3 mr-1" />
                    2h ago
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  Mars Colony Crisis
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Sci-Fi
                  </Badge>
                  <span className="text-xs text-white/60">Chapter 1</span>
                  <span className="text-xs text-white/60">• 8,234 votes</span>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A mysterious signal from Mars threatens the colony. Your choices will determine humanity's fate.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Story Card 3 - In Progress */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-pink-500/30 hover:border-pink-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-pink-600 to-rose-600">IN PROGRESS</Badge>
                  <div className="flex items-center text-xs text-white/60">
                    <Clock className="w-3 h-3 mr-1" />
                    1d ago
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                  Love in Paris
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Romance
                  </Badge>
                  <span className="text-xs text-white/60">Chapter 8</span>
                  <span className="text-xs text-white/60">• 15,432 votes</span>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  Two strangers meet in the City of Light. Will fate bring them together or tear them apart?
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Story Card 4 - Complete */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-green-500/30 hover:border-green-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">COMPLETE</Badge>
                  <div className="flex items-center text-xs text-white/60">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    4.8
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  The Haunted Manor
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Horror
                  </Badge>
                  <span className="text-xs text-white/60">12 Chapters</span>
                  <span className="text-xs text-white/60">• 23,891 votes</span>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A complete horror saga where your votes determined every terrifying twist and turn.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600">
                    <Play className="w-3 h-3 mr-1" />
                    Binge Watch
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Story Card 5 - Voting */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-red-500/30 hover:border-red-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-red-600 to-orange-600">
                    <Vote className="w-3 h-3 mr-1" />
                    VOTING
                  </Badge>
                  <div className="flex items-center text-xs text-white/60">
                    <Clock className="w-3 h-3 mr-1" />
                    8h left
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                  Showdown at Sunset
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Western
                  </Badge>
                  <span className="text-xs text-white/60">Chapter 5</span>
                  <span className="text-xs text-white/60">• 6,543 votes</span>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  The sheriff faces the outlaw gang. Will justice prevail or will chaos reign in the frontier town?
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-red-600 to-orange-600">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Story Card 6 - New */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                  <div className="flex items-center text-xs text-white/60">
                    <Clock className="w-3 h-3 mr-1" />
                    5h ago
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                  The Missing Heiress
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Mystery
                  </Badge>
                  <span className="text-xs text-white/60">Chapter 1</span>
                  <span className="text-xs text-white/60">• 4,123 votes</span>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A wealthy heiress vanishes. Follow the clues and vote on which suspects to investigate.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
            {/* Character 1 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-purple-500/30 hover:border-purple-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                    🗡️
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-purple-400 transition-colors">
                      Serana Valeblade
                    </h3>
                    <p className="text-xs text-white/60 mb-2">The Dragon's Gambit • Fantasy</p>
                    <Badge variant="outline" className="text-xs">
                      Paladin
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A noble knight whose faith guides her blade through the darkest challenges.
                </p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Vote className="w-3 h-3 mr-1" />
                  Vote for Focus
                </Button>
              </CardContent>
            </Card>

            {/* Character 2 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-blue-500/30 hover:border-blue-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-2xl">
                    🚀
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">
                      Commander Aria Chen
                    </h3>
                    <p className="text-xs text-white/60 mb-2">Mars Colony Crisis • Sci-Fi</p>
                    <Badge variant="outline" className="text-xs">
                      Leader
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A brilliant commander facing impossible choices to save humanity's first colony.
                </p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Vote className="w-3 h-3 mr-1" />
                  Vote for Focus
                </Button>
              </CardContent>
            </Card>

            {/* Character 3 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-pink-500/30 hover:border-pink-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-2xl">
                    💕
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-pink-400 transition-colors">
                      Juliet Moreau
                    </h3>
                    <p className="text-xs text-white/60 mb-2">Love in Paris • Romance</p>
                    <Badge variant="outline" className="text-xs">
                      Artist
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A passionate artist searching for love and meaning in the City of Light.
                </p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Vote className="w-3 h-3 mr-1" />
                  Vote for Focus
                </Button>
              </CardContent>
            </Card>

            {/* Character 4 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-red-500/30 hover:border-red-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-2xl">
                    👻
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-red-400 transition-colors">
                      Dr. Eleanor Blackwood
                    </h3>
                    <p className="text-xs text-white/60 mb-2">The Haunted Manor • Horror</p>
                    <Badge variant="outline" className="text-xs">
                      Paranormal Investigator
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A skeptical scientist confronting supernatural forces beyond comprehension.
                </p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Completed Story
                </Button>
              </CardContent>
            </Card>

            {/* Character 5 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-amber-500/30 hover:border-amber-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-2xl">
                    🤠
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-amber-400 transition-colors">
                      Sheriff Jake "Iron" Morgan
                    </h3>
                    <p className="text-xs text-white/60 mb-2">Showdown at Sunset • Western</p>
                    <Badge variant="outline" className="text-xs">
                      Lawman
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A legendary sheriff facing his greatest challenge in the lawless frontier.
                </p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Vote className="w-3 h-3 mr-1" />
                  Vote for Focus
                </Button>
              </CardContent>
            </Card>

            {/* Character 6 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl">
                    🔍
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-indigo-400 transition-colors">
                      Detective Marcus Vale
                    </h3>
                    <p className="text-xs text-white/60 mb-2">The Missing Heiress • Mystery</p>
                    <Badge variant="outline" className="text-xs">
                      Detective
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  A brilliant detective unraveling a web of secrets and lies.
                </p>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Vote className="w-3 h-3 mr-1" />
                  Vote for Focus
                </Button>
              </CardContent>
            </Card>
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
            {/* Merch 1 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-purple-500/30 hover:border-purple-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  🗡️
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  Serana's Blade Replica
                </h3>
                <p className="text-sm text-white/60 mb-2">The Dragon's Gambit Collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-purple-400">$149.99</span>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Merch 2 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-blue-500/30 hover:border-blue-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  🚀
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  Mars Colony Poster Set
                </h3>
                <p className="text-sm text-white/60 mb-2">Mars Colony Crisis Collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-400">$29.99</span>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Merch 3 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-pink-500/30 hover:border-pink-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  💕
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors">
                  Paris Romance Novel
                </h3>
                <p className="text-sm text-white/60 mb-2">Love in Paris Collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-pink-400">$19.99</span>
                  <Button size="sm" className="bg-gradient-to-r from-pink-600 to-rose-600">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Merch 4 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-red-500/30 hover:border-red-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  👻
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">
                  Haunted Manor Board Game
                </h3>
                <p className="text-sm text-white/60 mb-2">The Haunted Manor Collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-400">$59.99</span>
                  <Button size="sm" className="bg-gradient-to-r from-red-600 to-orange-600">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Merch 5 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-amber-500/30 hover:border-amber-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  🤠
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">
                  Sheriff's Badge Replica
                </h3>
                <p className="text-sm text-white/60 mb-2">Showdown at Sunset Collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-amber-400">$39.99</span>
                  <Button size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Merch 6 */}
            <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  🔍
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                  Detective's Case Files
                </h3>
                <p className="text-sm text-white/60 mb-2">The Missing Heiress Collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-indigo-400">$24.99</span>
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Browse All Merchandise
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="w-6 h-6 text-purple-500" />
            <span className="font-serif text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TICU.tv
            </span>
          </div>
          <p className="text-white/60 mb-4">The Interactive Cinema Universe - Where Your Votes Shape Every Story</p>
          <div className="flex justify-center gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-purple-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Help
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
