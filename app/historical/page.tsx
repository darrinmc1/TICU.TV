import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Clock, ArrowLeft, Home, Crown, Scroll, Globe, Calendar } from "lucide-react"
import Link from "next/link"

export default function HistoricalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-brown-900 to-emerald-950">
      {/* Historical Navigation */}
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
                <BookOpen className="w-8 h-8 text-amber-400" />
                <div>
                  <h1 className="font-serif text-xl font-bold text-amber-100">Historical Archives</h1>
                  <p className="text-xs text-amber-300/70">Period pieces and cultural authenticity</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-amber-600 text-amber-100">12 Active Stories</Badge>
              <Badge variant="outline" className="border-amber-600 text-amber-400">
                5 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Historical Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Parchment texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-yellow-800/20 to-emerald-900/30" />

        {/* Historical elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-amber-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                fontSize: `${14 + Math.random() * 6}px`,
              }}
            >
              ⚜
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <BookOpen className="w-20 h-20 text-amber-400 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-amber-100 text-balance">
            Chronicles of Time
          </h1>
          <p className="text-xl md:text-2xl text-amber-200/80 mb-8 text-balance">
            Journey through history, shape pivotal moments, and experience authentic period storytelling
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-amber-100 text-lg px-8 py-6">
              <Link href="/vote">
                <Clock className="w-5 h-5 mr-2" />
                Travel Through Time
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
            >
              <Link href="/creator">
                <Scroll className="w-5 h-5 mr-2" />
                Read Chronicles
              </Link>
            </Button>
          </div>

          {/* Historical Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">Active</div>
                <div className="text-xs text-amber-300/70">Time Travelers</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Globe className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">Live</div>
                <div className="text-xs text-amber-300/70">Time Periods</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Crown className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">Active</div>
                <div className="text-xs text-amber-300/70">Historical Figures</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-900/30 backdrop-blur-sm border-amber-600/30">
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-100">Live</div>
                <div className="text-xs text-amber-300/70">Major Events</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Historical-Specific Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-amber-100 text-balance">Historical Accuracy</h2>
            <p className="text-xl text-amber-200/80 text-balance">
              Balance historical authenticity with creative storytelling across different time periods
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Time Period Selection */}
            <Card className="bg-amber-900/20 border-amber-600/30 hover:shadow-amber-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Clock className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-amber-100">Era Selection</h3>
                  <p className="text-sm text-amber-200/70">Vote on time periods for new stories</p>
                </div>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Medieval (1000-1500)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                  >
                    <Scroll className="w-4 h-4 mr-2" />
                    Renaissance (1400-1600)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Victorian Era (1837-1901)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    World Wars (1914-1945)
                  </Button>
                </div>
                <Button asChild className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-amber-100">
                  <Link href="/vote">
                    <Clock className="w-4 h-4 mr-2" />
                    Choose Era
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Accuracy vs Creative Liberty */}
            <Card className="bg-amber-900/20 border-amber-600/30 hover:shadow-amber-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-amber-100">Authenticity Balance</h3>
                  <p className="text-sm text-amber-200/70">Control historical accuracy vs creative freedom</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-200">Current Setting</span>
                      <Badge className="bg-amber-600 text-amber-100 text-xs">Balanced</Badge>
                    </div>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-amber-400">Historical Accuracy</div>
                      <div className="text-xs text-amber-200/70">75% Authentic</div>
                    </div>
                    <div className="w-full bg-amber-950/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-amber-200/70 mt-1">
                      <span>Creative Liberty</span>
                      <span>Historical Accuracy</span>
                    </div>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-amber-100 bg-transparent"
                >
                  <Link href="/vote">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Adjust Balance
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Cultural Integration */}
            <Card className="bg-amber-900/20 border-amber-600/30 hover:shadow-amber-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Globe className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-amber-100">Cultural Elements</h3>
                  <p className="text-sm text-amber-200/70">Vote on social issues and cultural representation</p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-200">Current Vote</span>
                      <Badge className="bg-amber-600 text-amber-100 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-amber-200/70 mb-3">
                      "Should the Victorian story address women's suffrage movement?"
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-amber-200">Include Social Issues</span>
                        <span className="text-amber-400 font-semibold">68%</span>
                      </div>
                      <div className="w-full bg-amber-950/50 rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "68%" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <Button asChild className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-amber-100">
                  <Link href="/vote">
                    <Globe className="w-4 h-4 mr-2" />
                    Shape Culture
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
