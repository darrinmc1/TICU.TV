import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, ArrowLeft, Home, Rocket, Satellite, Cpu, Atom, Globe, Monitor } from "lucide-react"
import Link from "next/link"

export default function SciFiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950">
      {/* Sci-Fi Navigation */}
      <nav className="border-b border-cyan-500/20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-sans text-sm">All Genres</span>
              </Link>
              <div className="flex items-center gap-3">
                <Rocket className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="font-sans text-xl font-bold text-cyan-100">Sci-Fi Universe</h1>
                  <p className="text-xs text-cyan-300/70">Advanced technology and space exploration</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-cyan-600 text-cyan-100">18 Active Stories</Badge>
              <Badge variant="outline" className="border-cyan-600 text-cyan-400">
                8 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Sci-Fi Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Holographic grid background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating tech particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Rocket className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 text-cyan-100 text-balance">Future Frontiers</h1>
          <p className="text-xl md:text-2xl text-cyan-200/80 mb-8 text-balance">
            Navigate the cosmos, shape civilizations, and determine humanity's destiny among the stars
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-cyan-100 text-lg px-8 py-6">
              <Link href="/vote">
                <Rocket className="w-5 h-5 mr-2" />
                Launch Mission
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-cyan-100 bg-transparent"
            >
              <Link href="/creator">
                <Satellite className="w-5 h-5 mr-2" />
                Scan Systems
              </Link>
            </Button>
          </div>

          {/* Sci-Fi Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-cyan-900/30 backdrop-blur-sm border-cyan-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-cyan-100">Active</div>
                <div className="text-xs text-cyan-300/70">Explorers</div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-900/30 backdrop-blur-sm border-cyan-600/30">
              <CardContent className="p-4 text-center">
                <Globe className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-cyan-100">Live</div>
                <div className="text-xs text-cyan-300/70">Worlds</div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-900/30 backdrop-blur-sm border-cyan-600/30">
              <CardContent className="p-4 text-center">
                <Cpu className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-cyan-100">Active</div>
                <div className="text-xs text-cyan-300/70">AI Systems</div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-900/30 backdrop-blur-sm border-cyan-600/30">
              <CardContent className="p-4 text-center">
                <Atom className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-cyan-100">Live</div>
                <div className="text-xs text-cyan-300/70">Technologies</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sci-Fi Specific Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl font-bold mb-4 text-cyan-100 text-balance">Technology Development</h2>
            <p className="text-xl text-cyan-200/80 text-balance">
              Guide technological advancement and shape the future of human civilization
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Timeline Selector */}
            <Card className="bg-cyan-900/20 border-cyan-600/30 hover:shadow-cyan-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-cyan-100">Timeline Selection</h3>
                  <p className="text-sm text-cyan-200/70">Choose the era for upcoming stories</p>
                </div>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-cyan-100 bg-transparent"
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    Near Future (2050-2100)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-cyan-100 bg-transparent"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Space Age (2200-2500)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-cyan-100 bg-transparent"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Galactic Era (3000+)
                  </Button>
                </div>
                <Button asChild className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-cyan-100">
                  <Link href="/vote">
                    <Clock className="w-4 h-4 mr-2" />
                    Set Timeline
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Technology Voting */}
            <Card className="bg-cyan-900/20 border-cyan-600/30 hover:shadow-cyan-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Cpu className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-cyan-100">Tech Development</h3>
                  <p className="text-sm text-cyan-200/70">Vote on technological advancement paths</p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-cyan-950/30 rounded-lg border border-cyan-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-cyan-200">AI Consciousness</span>
                      <span className="text-cyan-400 font-semibold text-sm">67%</span>
                    </div>
                    <div className="w-full bg-cyan-950/50 rounded-full h-1.5">
                      <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: "67%" }} />
                    </div>
                  </div>
                  <div className="p-3 bg-cyan-950/30 rounded-lg border border-cyan-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-cyan-200">Faster-Than-Light Travel</span>
                      <span className="text-cyan-400 font-semibold text-sm">33%</span>
                    </div>
                    <div className="w-full bg-cyan-950/50 rounded-full h-1.5">
                      <div className="bg-cyan-600 h-1.5 rounded-full" style={{ width: "33%" }} />
                    </div>
                  </div>
                </div>
                <Button asChild className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-cyan-100">
                  <Link href="/vote">
                    <Cpu className="w-4 h-4 mr-2" />
                    Advance Tech
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Alien Contact Protocols */}
            <Card className="bg-cyan-900/20 border-cyan-600/30 hover:shadow-cyan-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Satellite className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-cyan-100">First Contact</h3>
                  <p className="text-sm text-cyan-200/70">Determine humanity's approach to alien species</p>
                </div>
                <div className="space-y-3">
                  <div className="p-2 bg-cyan-950/30 rounded border border-cyan-600/20 text-center">
                    <span className="text-xs text-cyan-200">Diplomatic Approach</span>
                    <div className="text-cyan-400 font-semibold">45%</div>
                  </div>
                  <div className="p-2 bg-cyan-950/30 rounded border border-cyan-600/20 text-center">
                    <span className="text-xs text-cyan-200">Scientific Study</span>
                    <div className="text-cyan-400 font-semibold">35%</div>
                  </div>
                  <div className="p-2 bg-cyan-950/30 rounded border border-cyan-600/20 text-center">
                    <span className="text-xs text-cyan-200">Defensive Stance</span>
                    <div className="text-cyan-400 font-semibold">20%</div>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-cyan-100 bg-transparent"
                >
                  <Link href="/vote">
                    <Satellite className="w-4 h-4 mr-2" />
                    Set Protocol
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
