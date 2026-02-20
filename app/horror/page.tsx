import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Eye, Skull, ArrowLeft, Home, Ghost, Moon, Crosshair, Volume2 } from "lucide-react"
import Link from "next/link"

export default function HorrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-gray-950">
      {/* Horror Navigation */}
      <nav className="border-b border-red-600/20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-serif text-sm">All Genres</span>
              </Link>
              <div className="flex items-center gap-3">
                <Ghost className="w-8 h-8 text-red-400" />
                <div>
                  <h1 className="font-serif text-xl font-bold text-red-100">Horror Realm</h1>
                  <p className="text-xs text-red-300/70">Supernatural terror and psychological suspense</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-red-600 text-red-100">15 Active Stories</Badge>
              <Badge variant="outline" className="border-red-600 text-red-400">
                6 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Horror Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Eerie fog effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/20 to-transparent opacity-60" />

        {/* Floating shadows */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-red-600/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Ghost className="w-20 h-20 text-red-400 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-red-100 text-balance">
            Embrace the Darkness
          </h1>
          <p className="text-xl md:text-2xl text-red-200/80 mb-8 text-balance">
            Face your deepest fears and guide survivors through supernatural nightmares
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-red-100 text-lg px-8 py-6">
              <Ghost className="w-5 h-5 mr-2" />
              Enter the Nightmare
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-red-600 text-red-400 hover:bg-red-600 hover:text-red-100 bg-transparent"
            >
              <Moon className="w-5 h-5 mr-2" />
              Survive the Night
            </Button>
          </div>

          {/* Horror Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-red-900/30 backdrop-blur-sm border-red-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-red-100">Active</div>
                <div className="text-xs text-red-300/70">Survivors</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 backdrop-blur-sm border-red-600/30">
              <CardContent className="p-4 text-center">
                <Ghost className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-red-100">Live</div>
                <div className="text-xs text-red-300/70">Entities</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 backdrop-blur-sm border-red-600/30">
              <CardContent className="p-4 text-center">
                <Skull className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-red-100">Active</div>
                <div className="text-xs text-red-300/70">Scares</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 backdrop-blur-sm border-red-600/30">
              <CardContent className="p-4 text-center">
                <Moon className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-red-100">Live</div>
                <div className="text-xs text-red-300/70">Nightmares</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Horror-Specific Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-red-100 text-balance">Terror Management</h2>
            <p className="text-xl text-red-200/80 text-balance">
              Control the intensity of fear and guide characters through supernatural encounters
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scare Intensity */}
            <Card className="bg-red-900/20 border-red-600/30 hover:shadow-red-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Volume2 className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-red-100">Scare Intensity</h3>
                  <p className="text-sm text-red-200/70">Vote on fear levels for upcoming episodes</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-red-200">Psychological Terror</span>
                    <span className="text-red-400 font-semibold">52%</span>
                  </div>
                  <div className="w-full bg-red-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
                      style={{ width: "52%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-red-200">Jump Scares</span>
                    <span className="text-red-400 font-semibold">28%</span>
                  </div>
                  <div className="w-full bg-red-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-700 to-red-600 h-2 rounded-full"
                      style={{ width: "28%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-red-200">Gore & Violence</span>
                    <span className="text-red-400 font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-red-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-800 to-red-700 h-2 rounded-full"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-red-100">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Set Fear Level
                </Button>
              </CardContent>
            </Card>

            {/* Monster Visibility */}
            <Card className="bg-red-900/20 border-red-600/30 hover:shadow-red-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Eye className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-red-100">Monster Reveal</h3>
                  <p className="text-sm text-red-200/70">Decide how much of the threat to show</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-red-950/30 rounded-lg border border-red-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-200">Current Vote</span>
                      <Badge className="bg-red-600 text-red-100 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-red-200/70 mb-3">
                      "Should the shadow entity be fully revealed or remain mysterious?"
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-red-600 text-red-400 hover:bg-red-600 hover:text-red-100 bg-transparent"
                      >
                        Keep Hidden
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-red-600 text-red-400 hover:bg-red-600 hover:text-red-100 bg-transparent"
                      >
                        Full Reveal
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-red-600 text-red-400 hover:bg-red-600 hover:text-red-100 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Control Visibility
                </Button>
              </CardContent>
            </Card>

            {/* Survival Scenarios */}
            <Card className="bg-red-900/20 border-red-600/30 hover:shadow-red-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Crosshair className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-red-100">Survival Choices</h3>
                  <p className="text-sm text-red-200/70">Vote on character survival strategies</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-950/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                        <Crosshair className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-red-200 text-sm">Fight Back</span>
                    </div>
                    <span className="text-red-400 font-semibold text-sm">45%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-950/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-red-200 text-sm">Hide & Wait</span>
                    </div>
                    <span className="text-red-400 font-semibold text-sm">55%</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-red-100">
                  <Crosshair className="w-4 h-4 mr-2" />
                  Choose Strategy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
