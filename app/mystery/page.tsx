import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Eye, ArrowLeft, Home, MapPin, FileText, Lightbulb, Fingerprint } from "lucide-react"
import Link from "next/link"

export default function MysteryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950">
      {/* Mystery Navigation */}
      <nav className="border-b border-purple-500/20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-serif text-sm">All Genres</span>
              </Link>
              <div className="flex items-center gap-3">
                <Search className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="font-serif text-xl font-bold text-purple-100">Mystery Bureau</h1>
                  <p className="text-xs text-purple-300/70">Detective work and criminal investigations</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-600 text-purple-100">13 Active Cases</Badge>
              <Badge variant="outline" className="border-purple-600 text-purple-400">
                7 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Mystery Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Detective board grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(purple 1px, transparent 1px),
              linear-gradient(90deg, purple 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Evidence markers */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Search className="w-20 h-20 text-purple-400 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-purple-100 text-balance">
            Case Files Open
          </h1>
          <p className="text-xl md:text-2xl text-purple-200/80 mb-8 text-balance">
            Uncover clues, solve puzzles, and guide detectives through complex criminal investigations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-purple-100 text-lg px-8 py-6">
              <Link href="/vote">
                <Search className="w-5 h-5 mr-2" />
                Start Investigation
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
            >
              <Link href="/creator">
                <Eye className="w-5 h-5 mr-2" />
                Examine Evidence
              </Link>
            </Button>
          </div>

          {/* Mystery Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-purple-900/30 backdrop-blur-sm border-purple-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-100">Active</div>
                <div className="text-xs text-purple-300/70">Detectives</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/30 backdrop-blur-sm border-purple-600/30">
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-100">Live</div>
                <div className="text-xs text-purple-300/70">Cold Cases</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/30 backdrop-blur-sm border-purple-600/30">
              <CardContent className="p-4 text-center">
                <Lightbulb className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-100">Active</div>
                <div className="text-xs text-purple-300/70">Clues Found</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/30 backdrop-blur-sm border-purple-600/30">
              <CardContent className="p-4 text-center">
                <Fingerprint className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-100">Live</div>
                <div className="text-xs text-purple-300/70">Cases Solved</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mystery-Specific Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-purple-100 text-balance">Investigation Control</h2>
            <p className="text-xl text-purple-200/80 text-balance">
              Guide detective work, control clue discovery, and shape the investigation process
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Clue Difficulty */}
            <Card className="bg-purple-900/20 border-purple-600/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Lightbulb className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-purple-100">Clue Difficulty</h3>
                  <p className="text-sm text-purple-200/70">Set the complexity of evidence discovery</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-200">Obvious Clues</span>
                    <span className="text-purple-400 font-semibold">25%</span>
                  </div>
                  <div className="w-full bg-purple-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full"
                      style={{ width: "25%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-200">Hidden Evidence</span>
                    <span className="text-purple-400 font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-purple-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-purple-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-200">Cryptic Puzzles</span>
                    <span className="text-purple-400 font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-purple-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-700 to-purple-600 h-2 rounded-full"
                      style={{ width: "30%" }}
                    />
                  </div>
                </div>
                <Button asChild className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-purple-100">
                  <Link href="/vote">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Set Difficulty
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Red Herring Frequency */}
            <Card className="bg-purple-900/20 border-purple-600/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-purple-100">Red Herrings</h3>
                  <p className="text-sm text-purple-200/70">Control false leads and misdirection</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-200">Current Vote</span>
                      <Badge className="bg-purple-600 text-purple-100 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-purple-200/70 mb-3">
                      "Should the suspicious neighbor be a red herring or the real culprit?"
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
                      >
                        Red Herring
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
                      >
                        Real Culprit
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
                >
                  <Link href="/vote">
                    <MapPin className="w-4 h-4 mr-2" />
                    Plant Evidence
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Investigation Timeline */}
            <Card className="bg-purple-900/20 border-purple-600/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <FileText className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-purple-100">Case Progress</h3>
                  <p className="text-sm text-purple-200/70">Track investigation milestones</p>
                </div>
                <div className="space-y-3">
                  <div className="p-2 bg-purple-950/30 rounded border border-green-600/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-purple-200">Crime Scene Examined</span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-950/30 rounded border border-green-600/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-purple-200">Witnesses Interviewed</span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-950/30 rounded border border-yellow-600/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span className="text-xs text-purple-200">Evidence Analysis</span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-950/30 rounded border border-gray-600/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span className="text-xs text-purple-200">Suspect Identification</span>
                    </div>
                  </div>
                </div>
                <Button asChild className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-purple-100">
                  <Link href="/vote">
                    <FileText className="w-4 h-4 mr-2" />
                    Update Case
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
