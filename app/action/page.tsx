import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, Target, ArrowLeft, Home, Swords, Car, Plane, Bomb, Shield } from "lucide-react"
import Link from "next/link"

export default function ActionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-red-900 to-yellow-950">
      {/* Action Navigation */}
      <nav className="border-b border-orange-500/20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-sans text-sm">All Genres</span>
              </Link>
              <div className="flex items-center gap-3">
                <Swords className="w-8 h-8 text-orange-400" />
                <div>
                  <h1 className="font-sans text-xl font-bold text-orange-100">Action Zone</h1>
                  <p className="text-xs text-orange-300/70">High-octane thrills and epic battles</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-orange-600 text-orange-100">19 Active Stories</Badge>
              <Badge variant="outline" className="border-orange-600 text-orange-400">
                11 Votes Open
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Action Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Dynamic energy lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse" />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-red-500 to-transparent animate-pulse" />
        </div>

        {/* Explosive particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/60 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 1}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Swords className="w-20 h-20 text-orange-400 mx-auto mb-6" />
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 text-orange-100 text-balance">
            Adrenaline Rush
          </h1>
          <p className="text-xl md:text-2xl text-orange-200/80 mb-8 text-balance">
            Command explosive action sequences and guide heroes through death-defying adventures
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-orange-100 text-lg px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              Join the Action
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-orange-100 bg-transparent"
            >
              <Target className="w-5 h-5 mr-2" />
              Lock and Load
            </Button>
          </div>

          {/* Action Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-orange-900/30 backdrop-blur-sm border-orange-600/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-100">Active</div>
                <div className="text-xs text-orange-300/70">Action Heroes</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/30 backdrop-blur-sm border-orange-600/30">
              <CardContent className="p-4 text-center">
                <Bomb className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-100">Live</div>
                <div className="text-xs text-orange-300/70">Explosions</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/30 backdrop-blur-sm border-orange-600/30">
              <CardContent className="p-4 text-center">
                <Car className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-100">Active</div>
                <div className="text-xs text-orange-300/70">Chase Scenes</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/30 backdrop-blur-sm border-orange-600/30">
              <CardContent className="p-4 text-center">
                <Shield className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-100">Live</div>
                <div className="text-xs text-orange-300/70">Stunts</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Action-Specific Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl font-bold mb-4 text-orange-100 text-balance">Action Choreography</h2>
            <p className="text-xl text-orange-200/80 text-balance">
              Design epic battle sequences and control the intensity of high-octane adventures
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Combat Style */}
            <Card className="bg-orange-900/20 border-orange-600/30 hover:shadow-orange-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Swords className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-orange-100">Combat Style</h3>
                  <p className="text-sm text-orange-200/70">Vote on action sequence choreography</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-200">Hand-to-Hand Combat</span>
                    <span className="text-orange-400 font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-orange-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-200">Weapons & Gadgets</span>
                    <span className="text-orange-400 font-semibold">35%</span>
                  </div>
                  <div className="w-full bg-orange-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-orange-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-200">Vehicle Chases</span>
                    <span className="text-orange-400 font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-orange-950/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-700 to-orange-600 h-2 rounded-full"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-orange-100">
                  <Swords className="w-4 h-4 mr-2" />
                  Set Combat Style
                </Button>
              </CardContent>
            </Card>

            {/* Stunt Complexity */}
            <Card className="bg-orange-900/20 border-orange-600/30 hover:shadow-orange-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Plane className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-orange-100">Stunt Level</h3>
                  <p className="text-sm text-orange-200/70">Control the complexity of action sequences</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-orange-950/30 rounded-lg border border-orange-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-200">Current Vote</span>
                      <Badge className="bg-orange-600 text-orange-100 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-orange-200/70 mb-3">
                      "Should the helicopter chase include a mid-air transfer?"
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-orange-100 bg-transparent"
                      >
                        Epic Stunt
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-orange-100 bg-transparent"
                      >
                        Keep Simple
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-orange-100 bg-transparent"
                >
                  <Plane className="w-4 h-4 mr-2" />
                  Plan Stunts
                </Button>
              </CardContent>
            </Card>

            {/* Realism vs Spectacle */}
            <Card className="bg-orange-900/20 border-orange-600/30 hover:shadow-orange-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Target className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <h3 className="font-sans text-xl font-bold mb-2 text-orange-100">Action Balance</h3>
                  <p className="text-sm text-orange-200/70">Choose between realism and over-the-top action</p>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-orange-950/30 rounded-lg border border-orange-600/20">
                    <div className="text-2xl font-bold text-orange-400 mb-1">Spectacle</div>
                    <div className="text-xs text-orange-200/70 mb-2">Current Setting</div>
                    <div className="w-full bg-orange-950/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-orange-200/70 mt-1">
                      <span>Realistic</span>
                      <span>Over-the-Top</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-orange-100">
                  <Target className="w-4 h-4 mr-2" />
                  Adjust Balance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
