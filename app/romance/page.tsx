import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Clock, Sparkles, ArrowLeft, Home, Coffee, Gift, Flower } from "lucide-react"
import Link from "next/link"

export default function RomancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-900 to-purple-950">
      {/* Romance Navigation */}
      <nav className="border-b border-pink-500/20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-serif text-sm">All Genres</span>
              </Link>
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-400" />
                <div>
                  <h1 className="font-serif text-xl font-bold text-pink-100">Romance Haven</h1>
                  <p className="text-xs text-pink-300/70">Love stories and emotional journeys</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-pink-600 text-pink-100">21 Active Stories</Badge>
              <Badge variant="outline" className="border-pink-600 text-pink-400">
                14 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Romance Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Soft romantic glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-rose-800/20 to-purple-900/30" />

        {/* Floating hearts */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${12 + Math.random() * 8}px`,
              }}
            >
              ♥
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Heart className="w-20 h-20 text-pink-400 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-pink-100 text-balance">
            Affairs of the Heart
          </h1>
          <p className="text-xl md:text-2xl text-pink-200/80 mb-8 text-balance">
            Guide love stories, shape relationships, and determine the course of romantic destiny
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-pink-100 text-lg px-8 py-6">
              <Heart className="w-5 h-5 mr-2" />
              Find Love
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-pink-100 bg-transparent"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Magic
            </Button>
          </div>

          {/* Romance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-pink-900/30 backdrop-blur-sm border-pink-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-pink-100">Active</div>
                <div className="text-xs text-pink-300/70">Romantics</div>
              </CardContent>
            </Card>
            <Card className="bg-pink-900/30 backdrop-blur-sm border-pink-600/30">
              <CardContent className="p-4 text-center">
                <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-pink-100">Live</div>
                <div className="text-xs text-pink-300/70">Love Stories</div>
              </CardContent>
            </Card>
            <Card className="bg-pink-900/30 backdrop-blur-sm border-pink-600/30">
              <CardContent className="p-4 text-center">
                <Sparkles className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-pink-100">Active</div>
                <div className="text-xs text-pink-300/70">Magical Moments</div>
              </CardContent>
            </Card>
            <Card className="bg-pink-900/30 backdrop-blur-sm border-pink-600/30">
              <CardContent className="p-4 text-center">
                <Gift className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-pink-100">Live</div>
                <div className="text-xs text-pink-300/70">Happy Endings</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Romance-Specific Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-pink-100 text-balance">Romance Dynamics</h2>
            <p className="text-xl text-pink-200/80 text-balance">
              Shape romantic relationships and guide characters through matters of the heart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Romance Tropes */}
            <Card className="bg-pink-900/20 border-pink-600/30 hover:shadow-pink-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Heart className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-pink-100">Romance Tropes</h3>
                  <p className="text-sm text-pink-200/70">Vote on romantic storyline directions</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-pink-200">Enemies to Lovers</span>
                    <span className="text-pink-400 font-semibold">42%</span>
                  </div>
                  <div className="w-full bg-pink-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-pink-400 h-2 rounded-full"
                      style={{ width: "42%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-pink-200">Second Chance Romance</span>
                    <span className="text-pink-400 font-semibold">35%</span>
                  </div>
                  <div className="w-full bg-pink-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-600 to-pink-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-pink-200">Forbidden Love</span>
                    <span className="text-pink-400 font-semibold">23%</span>
                  </div>
                  <div className="w-full bg-pink-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-700 to-pink-600 h-2 rounded-full"
                      style={{ width: "23%" }}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-pink-100">
                  <Heart className="w-4 h-4 mr-2" />
                  Choose Trope
                </Button>
              </CardContent>
            </Card>

            {/* Relationship Pacing */}
            <Card className="bg-pink-900/20 border-pink-600/30 hover:shadow-pink-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Clock className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-pink-100">Relationship Pacing</h3>
                  <p className="text-sm text-pink-200/70">Control the speed of romantic development</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-pink-950/30 rounded-lg border border-pink-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-pink-200">Current Vote</span>
                      <Badge className="bg-pink-600 text-pink-100 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-pink-200/70 mb-3">
                      "Should Emma and James have their first kiss in this episode?"
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-pink-100 bg-transparent"
                      >
                        Yes, Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-pink-100 bg-transparent"
                      >
                        Wait Longer
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-pink-100 bg-transparent"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Set Pace
                </Button>
              </CardContent>
            </Card>

            {/* Swoon Meter */}
            <Card className="bg-pink-900/20 border-pink-600/30 hover:shadow-pink-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-pink-100">Swoon Meter</h3>
                  <p className="text-sm text-pink-200/70">Rate romantic moments and scenes</p>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-pink-950/30 rounded-lg border border-pink-600/20">
                    <div className="text-3xl font-bold text-pink-400 mb-1">8.7</div>
                    <div className="text-xs text-pink-200/70">Average Swoon Rating</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Heart
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "text-pink-400 fill-current" : "text-pink-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-pink-950/30 rounded border border-pink-600/20">
                      <Coffee className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                      <span className="text-xs text-pink-200">Coffee Shop Meet</span>
                      <div className="text-pink-400 font-semibold text-sm">9.2</div>
                    </div>
                    <div className="text-center p-2 bg-pink-950/30 rounded border border-pink-600/20">
                      <Flower className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                      <span className="text-xs text-pink-200">Garden Proposal</span>
                      <div className="text-pink-400 font-semibold text-sm">9.8</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-pink-100">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Rate Romance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
