import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Vote,
  Users,
  Scroll,
  Crown,
  Sword,
  Wand2,
  Clock,
  Filter,
  Eye,
  Flame,
  Skull,
  Sparkles,
  ArrowLeft,
  Home,
  Dice6,
} from "lucide-react"
import Link from "next/link"

export default function FantasyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950">
      {/* Fantasy Navigation */}
      <nav className="border-b border-amber-600/20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-serif text-sm">All Genres</span>
              </Link>
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-amber-400" />
                <div>
                  <h1 className="font-serif text-xl font-bold text-amber-100">Fantasy & D&D Realm</h1>
                  <p className="text-xs text-amber-300/70">Epic quests and magical adventures</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-amber-600 text-amber-100">23 Active Stories</Badge>
              <Badge variant="outline" className="border-amber-600 text-amber-400">
                12 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Fantasy Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Parchment texture background */}
        <div className="absolute inset-0 bg-[url('/epic-fantasy-dragon-castle-cinematic.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/50 via-transparent to-slate-900/50" />

        {/* Floating magical particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Crown className="w-20 h-20 text-amber-400 mx-auto mb-6 fantasy-glow" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-amber-100 fantasy-text-glow text-balance">
            Realm of Legends
          </h1>
          <p className="text-xl md:text-2xl text-amber-200/80 mb-8 text-balance">
            Where magic meets destiny, and your choices forge epic tales of heroism and adventure
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-amber-100 text-lg px-8 py-6 fantasy-glow">
              <Sword className="w-5 h-5 mr-2" />
              Begin Your Quest
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
            >
              <Dice6 className="w-5 h-5 mr-2" />
              Roll for Adventure
            </Button>
          </div>

          {/* Fantasy Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">8,247</div>
                <div className="text-xs text-amber-300/70">Adventurers</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Crown className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">23</div>
                <div className="text-xs text-amber-300/70">Epic Quests</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Wand2 className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">156</div>
                <div className="text-xs text-amber-300/70">Spells Cast</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Skull className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">47</div>
                <div className="text-xs text-amber-300/70">Dragons Slain</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fantasy-Specific Voting Systems */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-amber-100 text-balance">Magical Decision Making</h2>
            <p className="text-xl text-amber-200/80 text-balance">
              Shape kingdoms, command magic, and determine the fate of legendary heroes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Magic System Voting */}
            <Card className="bg-amber-900/20 border-amber-600/30 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Wand2 className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-amber-100">Magic System Complexity</h3>
                  <p className="text-sm text-amber-200/70">Vote on magical power levels for upcoming episodes</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-200">High Magic (Godlike Powers)</span>
                    <span className="text-amber-400 font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-amber-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-200">Low Magic (Subtle Effects)</span>
                    <span className="text-amber-400 font-semibold">35%</span>
                  </div>
                  <div className="w-full bg-amber-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-600 to-amber-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-200">No Magic (Gritty Realism)</span>
                    <span className="text-amber-400 font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-amber-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-700 to-amber-600 h-2 rounded-full"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-amber-100">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Cast Magic Vote
                </Button>
              </CardContent>
            </Card>

            {/* Kingdom Politics */}
            <Card className="bg-amber-900/20 border-amber-600/30 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Crown className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-amber-100">Political Intrigue Level</h3>
                  <p className="text-sm text-amber-200/70">Determine the complexity of royal court drama</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-200">Current Vote</span>
                      <Badge className="bg-amber-600 text-amber-100 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-amber-200/70 mb-3">
                      "Should the kingdom face internal rebellion or external invasion?"
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                      >
                        Internal Strife
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                      >
                        Foreign Threat
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Shape the Realm
                </Button>
              </CardContent>
            </Card>

            {/* Creature Introduction */}
            <Card className="bg-amber-900/20 border-amber-600/30 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Skull className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-amber-100">Creature Encounters</h3>
                  <p className="text-sm text-amber-200/70">Vote on which mythical beasts to introduce</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-950/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                        <Flame className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-amber-200 text-sm">Ancient Dragon</span>
                    </div>
                    <span className="text-amber-400 font-semibold text-sm">67%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-950/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-amber-200 text-sm">Fey Court</span>
                    </div>
                    <span className="text-amber-400 font-semibold text-sm">33%</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-amber-100">
                  <Skull className="w-4 h-4 mr-2" />
                  Summon Creatures
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fantasy Episodes Grid */}
      <section className="py-20 px-6 bg-amber-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-amber-100 text-balance">Epic Adventures</h2>
            <p className="text-xl text-amber-200/80 text-balance">
              Ongoing quests where your choices determine the fate of heroes and kingdoms
            </p>
          </div>

          {/* Fantasy Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700 text-amber-100">
              <Filter className="w-4 h-4 mr-2" />
              Active Quests
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
            >
              Legendary Completed
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
            >
              In Production
            </Button>
          </div>

          {/* Fantasy Episodes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* The Dragon's Gambit */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden bg-amber-900/20 border-amber-600/30">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-amber-700 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                    <p className="text-sm text-amber-200">The Dragon's Gambit</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-amber-600 text-amber-100">
                  <Vote className="w-3 h-3 mr-1" />
                  Voting Active
                </Badge>
                <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-amber-200">Episode 12</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors text-amber-100">
                  The Dragon's Gambit
                </h3>
                <p className="text-sm text-amber-200/70 mb-4 line-clamp-3">
                  Ancient Dracolich Vorthak offers a terrible bargain. Will the heroes accept his dark knowledge to save
                  the realm, or find another path?
                </p>

                {/* Fantasy Voting Status */}
                <div className="mb-4 p-3 bg-amber-950/30 rounded-lg border border-amber-600/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-200">Current Vote</span>
                    <span className="text-xs text-amber-300/70 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      2d 14h left
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-amber-200">Accept the bargain</span>
                      <span className="text-amber-400 font-semibold">45%</span>
                    </div>
                    <div className="w-full bg-amber-950/50 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "45%" }} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-100">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                  >
                    <Vote className="w-3 h-3 mr-1" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* The Cursed Crown */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden bg-amber-900/20 border-amber-600/30">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-purple-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                    <p className="text-sm text-amber-200">The Cursed Crown</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-purple-600 text-white">In Production</Badge>
                <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-amber-200">Episode 8</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors text-amber-100">
                  The Cursed Crown
                </h3>
                <p className="text-sm text-amber-200/70 mb-4 line-clamp-3">
                  The royal regalia pulses with necromantic energy. Your votes determined the party would investigate
                  its dark origins in the ancient crypts.
                </p>

                <div className="mb-4 p-3 bg-amber-950/30 rounded-lg border border-purple-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-200">Production Status</span>
                    <span className="text-xs text-purple-400">Filming Phase</span>
                  </div>
                  <div className="w-full bg-amber-950/50 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-amber-600 text-amber-400 bg-transparent"
                    disabled
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Coming Soon
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                  >
                    <Scroll className="w-3 h-3 mr-1" />
                    Behind Scenes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* The Elven Prophecy */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden bg-amber-900/20 border-amber-600/30">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                    <p className="text-sm text-amber-200">The Elven Prophecy</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-emerald-600 text-white">New Release</Badge>
                <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-amber-200">Episode 15</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors text-amber-100">
                  The Elven Prophecy
                </h3>
                <p className="text-sm text-amber-200/70 mb-4 line-clamp-3">
                  Ancient elven seers reveal a prophecy of doom. Your choice to trust their wisdom has unlocked a path
                  to prevent the coming darkness.
                </p>

                <div className="mb-4 p-3 bg-amber-950/30 rounded-lg border border-emerald-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-200">Episode Stats</span>
                    <span className="text-xs text-emerald-400">Released 3 days ago</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-amber-200/70">Views:</span>
                      <span className="ml-1 font-semibold text-amber-200">12,847</span>
                    </div>
                    <div>
                      <span className="text-amber-200/70">Rating:</span>
                      <span className="ml-1 font-semibold text-amber-400">4.9/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-100">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                  >
                    <Users className="w-3 h-3 mr-1" />
                    Discuss
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
