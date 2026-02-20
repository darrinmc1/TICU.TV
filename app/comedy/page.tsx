import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Laugh, Smile, ArrowLeft, Home, Zap, MessageCircle, Star, Volume2 } from "lucide-react"
import Link from "next/link"

export default function ComedyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-orange-900 to-pink-950">
      {/* Comedy Navigation */}
      <nav className="border-b border-yellow-500/20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-sans text-sm">All Genres</span>
              </Link>
              <div className="flex items-center gap-3">
                <Laugh className="w-8 h-8 text-yellow-400" />
                <div>
                  <h1 className="font-sans text-xl font-bold text-yellow-100">Comedy Central</h1>
                  <p className="text-xs text-yellow-300/70">Hilarious situations and witty dialogue</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-yellow-600 text-yellow-100">16 Active Shows</Badge>
              <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                9 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Comedy Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Bouncing elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400/30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 1}s`,
                fontSize: `${16 + Math.random() * 8}px`,
              }}
            >
              😂
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Laugh className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 text-yellow-100 text-balance">Laugh Out Loud</h1>
          <p className="text-xl md:text-2xl text-yellow-200/80 mb-8 text-balance">
            Create hilarious moments, perfect comedic timing, and guide characters through side-splitting adventures
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-yellow-100 text-lg px-8 py-6">
              <Laugh className="w-5 h-5 mr-2" />
              Get the Laughs
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-yellow-100 bg-transparent"
            >
              <Smile className="w-5 h-5 mr-2" />
              Perfect Timing
            </Button>
          </div>

          {/* Comedy Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-yellow-900/30 backdrop-blur-sm border-yellow-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-100">Active</div>
                <div className="text-xs text-yellow-300/70">Comedy Fans</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-900/30 backdrop-blur-sm border-yellow-600/30">
              <CardContent className="p-4 text-center">
                <Laugh className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-100">Live</div>
                <div className="text-xs text-yellow-300/70">Jokes Told</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-900/30 backdrop-blur-sm border-yellow-600/30">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-100">Active</div>
                <div className="text-xs text-yellow-300/70">Running Gags</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-900/30 backdrop-blur-sm border-yellow-600/30">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-100">Live</div>
                <div className="text-xs text-yellow-300/70">Perfect Punchlines</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comedy-Specific Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl font-bold mb-4 text-yellow-100 text-balance">Comedy Workshop</h2>
            <p className="text-xl text-yellow-200/80 text-balance">
              Fine-tune humor styles, perfect comedic timing, and create memorable running gags
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Comedy Style */}
            <Card className="bg-yellow-900/20 border-yellow-600/30 hover:shadow-yellow-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Laugh className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-yellow-100">Comedy Style</h3>
                  <p className="text-sm text-yellow-200/70">Vote on the type of humor for episodes</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-200">Slapstick Physical</span>
                    <span className="text-yellow-400 font-semibold">35%</span>
                  </div>
                  <div className="w-full bg-yellow-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-200">Witty Banter</span>
                    <span className="text-yellow-400 font-semibold">40%</span>
                  </div>
                  <div className="w-full bg-yellow-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 h-2 rounded-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-200">Parody & Satire</span>
                    <span className="text-yellow-400 font-semibold">25%</span>
                  </div>
                  <div className="w-full bg-yellow-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-700 to-yellow-600 h-2 rounded-full"
                      style={{ width: "25%" }}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-yellow-100">
                  <Laugh className="w-4 h-4 mr-2" />
                  Set Comedy Style
                </Button>
              </CardContent>
            </Card>

            {/* Comedic Timing */}
            <Card className="bg-yellow-900/20 border-yellow-600/30 hover:shadow-yellow-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-yellow-100">Timing Control</h3>
                  <p className="text-sm text-yellow-200/70">Perfect the delivery of punchlines</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-950/30 rounded-lg border border-yellow-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-yellow-200">Current Vote</span>
                      <Badge className="bg-yellow-600 text-yellow-100 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-yellow-200/70 mb-3">
                      "Should the punchline come immediately or after a dramatic pause?"
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-yellow-100 bg-transparent"
                      >
                        Quick Fire
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-yellow-100 bg-transparent"
                      >
                        Dramatic Pause
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-yellow-100 bg-transparent"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Perfect Timing
                </Button>
              </CardContent>
            </Card>

            {/* Laugh Track Rating */}
            <Card className="bg-yellow-900/20 border-yellow-600/30 hover:shadow-yellow-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Volume2 className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-yellow-100">Laugh Meter</h3>
                  <p className="text-sm text-yellow-200/70">Rate the funniness of comedy moments</p>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-yellow-950/30 rounded-lg border border-yellow-600/20">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">9.2</div>
                    <div className="text-xs text-yellow-200/70">Average Laugh Rating</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Laugh
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-yellow-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-yellow-950/30 rounded border border-yellow-600/20">
                      <Smile className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                      <span className="text-xs text-yellow-200">Chuckle</span>
                      <div className="text-yellow-400 font-semibold text-sm">7.8</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-950/30 rounded border border-yellow-600/20">
                      <Laugh className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                      <span className="text-xs text-yellow-200">Belly Laugh</span>
                      <div className="text-yellow-400 font-semibold text-sm">9.8</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-yellow-100">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Rate Comedy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
