"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

type VoteOption = {
  id: string
  title: string
  description: string
  vote_count: number
}

type Story = {
  id: string
  title: string
  genre: string
}

const Film = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
      clipRule="evenodd"
    />
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

const ArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

export default function VotePage() {
  const [stories, setStories] = useState<Story[]>([])
  const [voteOptions, setVoteOptions] = useState<Record<string, VoteOption[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({})
  const [userId] = useState(() => crypto.randomUUID())
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const storiesRes = await fetch('/api/stories/active')
        const storiesData = await storiesRes.json()
        
        if (storiesData.stories && storiesData.stories.length > 0) {
          setStories(storiesData.stories)
          
          for (const story of storiesData.stories) {
            const optionsRes = await fetch(`/api/stories?storyId=${story.id}`)
            const optionsData = await optionsRes.json()
            if (optionsData.options) {
              setVoteOptions(prev => ({ ...prev, [story.id]: optionsData.options }))
            }
          }
        }
      } catch (error) {
        console.error('Failed to load voting data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSelectOption = (category: string, optionId: string) => {
    setSelectedVotes(prev => ({ ...prev, [category]: optionId }))
  }

  const submitVotes = async () => {
    setSubmitting(true)
    try {
      for (const [category, optionId] of Object.entries(selectedVotes)) {
        await fetch('/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storyId: 'default-story',
            userId,
            optionId
          })
        })
      }
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit votes:', error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="story-atmosphere relative min-h-screen overflow-hidden">
      <div className="film-grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-14 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-28 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-amber-200/15">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-amber-300">
              <Film />
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                TICU.tv
              </span>
            </Link>
            <Button asChild variant="outline" size="sm" className="border-amber-200/35 bg-transparent text-amber-100 hover:bg-amber-200/10">
              <Link href="/">
                <ArrowLeft />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-amber-300" />
              <span className="ml-3 text-white/70">Loading votes...</span>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-amber-100 mb-4">No Active Votes</h2>
              <p className="text-white/70 mb-6">Check back soon for new voting opportunities!</p>
              <Button asChild className="bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 hover:from-amber-400 hover:to-cyan-400">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div className="text-center mb-12">
                <p className="editorial-kicker mb-3">Audience Control Room</p>
                <h1 className="section-title font-serif mb-4 bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                  Cast Your Vote
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-white/75">Shape the future of our stories with your choices</p>
              </div>

              {/* Voting Categories */}
              <div className="space-y-8">
            {/* Next Chapter Plot */}
            <Card className="glass-panel border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Vote />
                  Next Chapter Plot
                </CardTitle>
                <p className="text-sm text-white/60">Choose the direction for the next chapter</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: 'plot-1', title: 'The Ancient Temple Discovery', desc: 'The party discovers ruins of an ancient civilization with mysterious powers', votes: '45%' },
                  { id: 'plot-2', title: 'The Betrayal Revealed', desc: "A trusted ally's dark secret comes to light, threatening the group", votes: '32%' },
                  { id: 'plot-3', title: "The Dragon's Challenge", desc: 'Face the dragon in a test of wit and courage rather than combat', votes: '23%' },
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption('nextChapter', option.id)}
                    className={`p-4 rounded-lg bg-slate-800/50 border transition-all cursor-pointer ${
                      selectedVotes['nextChapter'] === option.id 
                        ? 'border-purple-500 bg-purple-900/30' 
                        : 'border-purple-500/20 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{option.title}</h4>
                      <Badge className="bg-purple-600">{option.votes}</Badge>
                    </div>
                    <p className="text-sm text-white/70">{option.desc}</p>
                    <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600" style={{ width: option.votes }} />
                    </div>
                  </div>
                ))}

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={submitVotes}
                  disabled={submitting || submitted}
                >
                  <Vote />
                  {submitted ? 'Votes Submitted!' : submitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Character */}
            <Card className="glass-panel border-pink-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Favorite Character
                </CardTitle>
                <p className="text-sm text-white/60">Vote for your favorite character</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: 'fav-1', name: "Serana Valeblade", role: "Paladin", votes: "38%", story: "The Dragon's Gambit" },
                  { id: 'fav-2', name: "Commander Aria Chen", role: "Leader", votes: "27%", story: "Mars Colony Crisis" },
                  { id: 'fav-3', name: "Juliet Moreau", role: "Artist", votes: "19%", story: "Love in Paris" },
                  { id: 'fav-4', name: "Sheriff Jake Morgan", role: "Lawman", votes: "16%", story: "Showdown at Sunset" },
                ].map((character) => (
                  <div
                    key={character.id}
                    onClick={() => handleSelectOption('favoriteCharacter', character.id)}
                    className={`p-4 rounded-lg bg-slate-800/50 border transition-all cursor-pointer ${
                      selectedVotes['favoriteCharacter'] === character.id 
                        ? 'border-pink-500 bg-pink-900/30' 
                        : 'border-pink-500/20 hover:border-pink-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{character.name}</h4>
                        <p className="text-xs text-white/60">
                          {character.role} • {character.story}
                        </p>
                      </div>
                      <Badge className="bg-pink-600">{character.votes}</Badge>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-600 to-rose-600"
                        style={{ width: character.votes }}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                  onClick={submitVotes}
                  disabled={submitting || submitted}
                >
                  <Vote />
                  {submitted ? 'Votes Submitted!' : submitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </CardContent>
            </Card>

            {/* Least Favorite Character */}
            <Card className="glass-panel border-red-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Least Favorite Character
                </CardTitle>
                <p className="text-sm text-white/60">Vote for the character you'd like to see less of</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Lord Vex the Cruel", role: "Antagonist", votes: "42%", story: "The Dragon's Gambit" },
                  { name: "Dr. Marcus Webb", role: "Scientist", votes: "31%", story: "Mars Colony Crisis" },
                  { name: "Baron Ashford", role: "Rival", votes: "17%", story: "Love in Paris" },
                  { name: "Black Jack McGraw", role: "Outlaw", votes: "10%", story: "Showdown at Sunset" },
                ].map((character) => (
                  <div
                    key={character.name}
                    onClick={() => handleSelectOption('leastFavoriteCharacter', character.name)}
                    className={`p-4 rounded-lg bg-slate-800/50 border transition-all cursor-pointer ${
                      selectedVotes['leastFavoriteCharacter'] === character.name
                        ? 'border-red-500 bg-red-900/30'
                        : 'border-red-500/20 hover:border-red-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{character.name}</h4>
                        <p className="text-xs text-white/60">
                          {character.role} • {character.story}
                        </p>
                      </div>
                      <Badge className="bg-red-600">{character.votes}</Badge>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-orange-600"
                        style={{ width: character.votes }}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  onClick={submitVotes}
                  disabled={submitting || submitted}
                >
                  <Vote />
                  {submitted ? 'Votes Submitted!' : submitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </CardContent>
            </Card>

            {/* Vote for New Character */}
            <Card className="glass-panel border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Vote for New Character
                </CardTitle>
                <p className="text-sm text-white/60">Choose which new character should join the story</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "Kael the Berserker",
                    role: "Warrior",
                    votes: "35%",
                    desc: "A fierce warrior with unmatched combat skills",
                  },
                  {
                    name: "Lyra the Enchantress",
                    role: "Mage",
                    votes: "29%",
                    desc: "A mysterious sorceress with ancient knowledge",
                  },
                  {
                    name: "Finn the Rogue",
                    role: "Thief",
                    votes: "22%",
                    desc: "A charming thief with a heart of gold",
                  },
                  {
                    name: "Sister Mora",
                    role: "Cleric",
                    votes: "14%",
                    desc: "A devoted healer seeking redemption",
                  },
                ].map((character) => (
                  <div
                    key={character.name}
                    onClick={() => handleSelectOption('newCharacter', character.name)}
                    className={`p-4 rounded-lg bg-slate-800/50 border transition-all cursor-pointer ${
                      selectedVotes['newCharacter'] === character.name
                        ? 'border-blue-500 bg-blue-900/30'
                        : 'border-blue-500/20 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{character.name}</h4>
                        <p className="text-xs text-white/60 mb-1">{character.role}</p>
                        <p className="text-sm text-white/70">{character.desc}</p>
                      </div>
                      <Badge className="bg-blue-600">{character.votes}</Badge>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
                        style={{ width: character.votes }}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={submitVotes}
                  disabled={submitting || submitted}
                >
                  <Vote />
                  {submitted ? 'Votes Submitted!' : submitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </CardContent>
            </Card>

            {/* Character Screen Time */}
            <Card className="glass-panel border-indigo-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  More Screen Time
                </CardTitle>
                <p className="text-sm text-white/60">Which character should get more focus in upcoming episodes?</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Thornik Bramblebrew", role: "Dwarf Craftsman", votes: "33%", story: "The Dragon's Gambit" },
                  { name: "Dr. Elena Vasquez", role: "Engineer", votes: "28%", story: "Mars Colony Crisis" },
                  { name: "Pierre Dubois", role: "Chef", votes: "24%", story: "Love in Paris" },
                  { name: "Deputy Sarah Cole", role: "Deputy", votes: "15%", story: "Showdown at Sunset" },
                ].map((character) => (
                  <div
                    key={character.name}
                    onClick={() => handleSelectOption('moreScreenTime', character.name)}
                    className={`p-4 rounded-lg bg-slate-800/50 border transition-all cursor-pointer ${
                      selectedVotes['moreScreenTime'] === character.name
                        ? 'border-indigo-500 bg-indigo-900/30'
                        : 'border-indigo-500/20 hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{character.name}</h4>
                        <p className="text-xs text-white/60">
                          {character.role} • {character.story}
                        </p>
                      </div>
                      <Badge className="bg-indigo-600">{character.votes}</Badge>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                        style={{ width: character.votes }}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={submitVotes}
                  disabled={submitting || submitted}
                >
                  <Vote />
                  {submitted ? 'Votes Submitted!' : submitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </CardContent>
            </Card>

            {/* Suggest New Character */}
            <Card className="glass-panel border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Suggest a New Character
                </CardTitle>
                <p className="text-sm text-white/60">Create and submit your own character idea</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Character Name</label>
                  <Input placeholder="Enter character name" className="bg-slate-800/50 border-green-500/30" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Character Role/Class</label>
                  <Input placeholder="e.g., Warrior, Mage, Detective" className="bg-slate-800/50 border-green-500/30" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Story Genre</label>
                  <select className="w-full p-2 rounded-md bg-slate-800/50 border border-green-500/30 text-white">
                    <option>Fantasy</option>
                    <option>Sci-Fi</option>
                    <option>Horror</option>
                    <option>Romance</option>
                    <option>Mystery</option>
                    <option>Thriller</option>
                    <option>Western</option>
                    <option>Historical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Character Description</label>
                  <Textarea
                    placeholder="Describe your character's background, personality, and abilities..."
                    className="bg-slate-800/50 border-green-500/30 min-h-[120px]"
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={submitVotes}
                  disabled={submitting || submitted}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {submitted ? 'Votes Submitted!' : submitting ? 'Submitting...' : 'Submit Character'}
                </Button>
              </CardContent>
            </Card>

            {/* Vote for Main Villain */}
            <Card className="glass-panel border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Vote for Main Villain
                </CardTitle>
                <p className="text-sm text-white/60">Choose the next major antagonist the heroes will face</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "The Shadow King",
                    threat: "Ancient Evil",
                    votes: "41%",
                    desc: "A dark sorcerer seeking to plunge the world into eternal darkness",
                  },
                  {
                    name: "Admiral Zara Kross",
                    threat: "Military Tyrant",
                    votes: "29%",
                    desc: "A ruthless military commander with plans to control all colonies",
                  },
                  {
                    name: "The Collector",
                    threat: "Serial Killer",
                    votes: "18%",
                    desc: "A mysterious figure targeting the city's elite with deadly precision",
                  },
                  {
                    name: "Mordecai the Betrayer",
                    threat: "Former Ally",
                    votes: "12%",
                    desc: "A once-trusted companion now seeking revenge against the party",
                  },
                ].map((villain) => (
                  <div
                    key={villain.name}
                    onClick={() => handleSelectOption('mainVillain', villain.name)}
                    className={`p-4 rounded-lg bg-slate-800/50 border transition-all cursor-pointer ${
                      selectedVotes['mainVillain'] === villain.name
                        ? 'border-orange-500 bg-orange-900/30'
                        : 'border-orange-500/20 hover:border-orange-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{villain.name}</h4>
                        <p className="text-xs text-white/60 mb-1">{villain.threat}</p>
                        <p className="text-sm text-white/70">{villain.desc}</p>
                      </div>
                      <Badge className="bg-orange-600">{villain.votes}</Badge>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-600 to-red-600"
                        style={{ width: villain.votes }}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  onClick={submitVotes}
                  disabled={submitting || submitted}
                >
                  <Vote />
                  {submitted ? 'Votes Submitted!' : submitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </CardContent>
            </Card>
          </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <Card className="glass-panel border-amber-300/30">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-3">Your Voice Matters</h3>
                  <p className="text-white/70 mb-6">
                    Every vote shapes the narrative. Join thousands of viewers creating the future of interactive
                    storytelling.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 hover:from-amber-400 hover:to-cyan-400"
                  >
                    <Link href="/">
                      <ArrowLeft />
                      Back to Stories
                    </Link>
                  </Button>
              </CardContent>
            </Card>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
