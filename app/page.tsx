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
  Shield,
  Zap,
  Heart,
  Star,
  Trophy,
  Target,
  Award,
  Calendar,
  Clock,
  Filter,
  Eye,
  UserPlus,
  Flame,
  TrendingUp,
  BarChart3,
  Gamepad2,
  Skull,
  Sparkles,
  Mountain,
  Shuffle,
  Film,
  Rocket,
  Ghost,
  Compass,
  Trees,
  Castle,
  Bell,
  Leaf,
  Utensils,
  Search,
  Music,
  Cog,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-primary" />
              <span className="font-serif text-xl font-bold">TICU.tv</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#genres" className="text-muted-foreground hover:text-primary transition-colors">
                Genres
              </a>
              <a href="#trending" className="text-muted-foreground hover:text-primary transition-colors">
                Trending
              </a>
              <a href="/creator" className="text-muted-foreground hover:text-primary transition-colors">
                Creator Studio
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </nav>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Users className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Sword & Sorcery Focus */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-48">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('/epic-fantasy-dragon-castle-cinematic.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 cinematic-overlay" />
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Sword className="w-20 h-20 text-primary mx-auto mb-6 fantasy-glow" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 fantasy-text-glow text-balance">
              The Interactive Cinema Universe . TV
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance">Your Votes Shape Every Story</p>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
              Oath of Flame – The Dragon's Legacy
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 text-balance">
              When a dying red dragon leaves behind a cryptic prophecy and a magical egg, a mismatched group of
              adventurers must unravel the truth behind an ancient pact made between dragons and mortals—or risk
              igniting a war that could consume the realm.
            </p>
            <div className="text-center mb-8">
              <p className="font-serif text-lg text-primary italic">
                "A promise forged in flame. A destiny sealed in blood"
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="fantasy-glow">
              <Play className="w-5 h-5 mr-2" />
              Watch Latest Episode
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent">
              <Vote className="w-5 h-5 mr-2" />
              Cast Your Vote
            </Button>
          </div>

          {/* Latest Updates Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 fantasy-glow">
            <CardContent className="p-6">
              <h3 className="font-serif text-2xl font-bold mb-4 text-primary flex items-center justify-center">
                <Zap className="w-6 h-6 mr-2" />
                Latest Updates
                <Zap className="w-6 h-6 ml-2" />
              </h3>
              <p className="text-muted-foreground mb-6">Current voting opportunities and live events</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Active Votes */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center text-primary">
                    <Vote className="w-4 h-4 mr-2" />
                    Active Votes
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-card/50 rounded-lg border border-primary/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Dragon's Final Choice</span>
                        <Badge variant="destructive">2h left</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Fantasy • Critical decision</p>
                      <Button size="sm" className="w-full mt-2">
                        Vote Now
                      </Button>
                    </div>

                    <div className="p-3 bg-card/50 rounded-lg border border-secondary/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">New Character Introduction</span>
                        <Badge variant="secondary">6h left</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Character voting • Story-changing</p>
                      <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                        Vote Now
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Live Events */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center text-primary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Live Events
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-card/50 rounded-lg border border-green-600/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">New Chapter Released</span>
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                          Live
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Chapter 8: "The Dragon's Egg Awakens" • Just dropped
                      </p>
                      <Button size="sm" className="w-full mt-2">
                        Watch Now
                      </Button>
                    </div>

                    <div className="p-3 bg-card/50 rounded-lg border border-amber-600/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Chapter Vote Opening</span>
                        <span className="text-amber-400 text-sm">Starting soon</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Vote on Chapter 9 direction • Opens in 1 hour</p>
                      <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                        <Bell className="w-3 h-3 mr-1" />
                        Get Notified
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button variant="outline" className="bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Active Votes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Heroes & Villains Database */}
      <section className="py-20 px-6 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-balance">Heroes & Villains of the Realm</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Meet the legendary characters whose fates you control. Vote for new heroes, keep beloved characters, or
              suggest your own creations.
            </p>
          </div>

          {/* Character Voting Features */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Character Battle Royale */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">Character Battle Royale</h3>
                  <p className="text-sm text-muted-foreground">Vote between potential new characters</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                        <Sword className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">Kael the Berserker</span>
                    </div>
                    <span className="text-primary font-semibold">Active</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "67%" }} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                        <Wand2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">Lyra the Enchantress</span>
                    </div>
                    <span className="text-primary font-semibold">Active</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Vote className="w-4 h-4 mr-2" />
                  Cast Battle Vote
                </Button>
              </CardContent>
            </Card>

            {/* Character Focus Vote */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">Character Focus Vote</h3>
                  <p className="text-sm text-muted-foreground">Which character should get more screen time?</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Theron the Paladin</span>
                    <span className="text-primary font-semibold">Active</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "42%" }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Zara the Rogue</span>
                    <span className="text-primary font-semibold">Active</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "35%" }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Eldric the Wizard</span>
                    <span className="text-primary font-semibold">Active</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "23%" }} />
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <Star className="w-4 h-4 mr-2" />
                  Vote for Focus
                </Button>
              </CardContent>
            </Card>

            {/* Character Suggestion */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <UserPlus className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">Suggest New Character</h3>
                  <p className="text-sm text-muted-foreground">Create the next hero or villain</p>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-4 border-2 border-dashed border-primary/30 rounded-lg">
                    <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Upload character portrait</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Badge variant="outline">Warrior</Badge>
                    <Badge variant="outline">Mage</Badge>
                    <Badge variant="outline">Rogue</Badge>
                    <Badge variant="outline">Cleric</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Submit Character
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Character Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Character 1 - Serana Valeblade */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Serana%20Valeblade%20%E2%80%94%20Knight%20%20Scholar%20of%20Faith2.jpg-OKEWrPNoznehd6RLzBgM87AaoKFuxm.jpeg"
                    alt="Serana Valeblade - Knight Scholar of Faith"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <Crown className="w-3 h-3 mr-1" />
                  Knight Scholar
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    Active
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Serana Valeblade
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  A noble knight-scholar whose faith guides her blade and whose wisdom illuminates the darkest paths
                  ahead.
                </p>

                {/* Character Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Role</span>
                    <span className="text-primary font-semibold">Main Character</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Class</span>
                    <span>Paladin</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Status</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Intro
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote Keep
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 2 - Nyxara Veilthorn */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nyxara%20Veilthorn%20%20ethereal%20high-elf-R0DaQXnpIucuIqZeVfytXsWX4NITsi.png"
                    alt="Nyxara Veilthorn - Ethereal High-Elf"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-purple-600 text-white">High-Elf</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    Active
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Nyxara Veilthorn
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  An ethereal high-elf whose ancient magic and mysterious past hold keys to the dragon's prophecy.
                </p>

                {/* Character Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Role</span>
                    <span className="text-primary font-semibold">Main Character</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Class</span>
                    <span>Mystic</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Status</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Intro
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote Keep
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 3 - Caelin Thorne */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caelin%20Thorne%2C%20flame-born%20sorcerer-XA74fnjuy845l89rVzY552wAVQQnzS.png"
                    alt="Caelin Thorne - Flame-born Sorcerer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-red-600 text-white">Flame-born</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    Active
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Caelin Thorne
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  A flame-born sorcerer whose fiery magic and troubled past make him both powerful ally and dangerous
                  wildcard.
                </p>

                {/* Character Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Role</span>
                    <span className="text-primary font-semibold">Main Character</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Class</span>
                    <span>Sorcerer</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Status</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Intro
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote Keep
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 4 - Thornik Bramblebrew */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thornik%20Bramblebrew%2C%20stocky%20dwarf-EtvYrRLS1e3UBuiBvmu6SZXrSQHGrh.png"
                    alt="Thornik Bramblebrew - Stocky Dwarf"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-orange-600 text-white">Dwarf Craftsman</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    Active
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Thornik Bramblebrew
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  A master craftsman whose forge-hardened strength and ancient dwarven knowledge prove invaluable to the
                  quest.
                </p>

                {/* Character Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Role</span>
                    <span className="text-primary font-semibold">Main Character</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Class</span>
                    <span>Artificer</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Status</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Intro
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote Keep
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 5 - Elowen Greenbloom */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Elowen%20Greenbloom%20Druid-3FHKYyio0ZY6SW3XIKmHllobU9Muh1.png"
                    alt="Elowen Greenbloom - Druid"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">Nature's Guardian</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    Active
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Elowen Greenbloom
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  A druid whose deep connection to nature and the ancient world provides wisdom about the dragon's
                  legacy.
                </p>

                {/* Character Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Role</span>
                    <span className="text-primary font-semibold">Main Character</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Class</span>
                    <span>Druid</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Status</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Intro
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote Keep
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 6 - Fenna Mudroot */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fenna%20Mudroot%20%E2%80%94%20Druid%20of%20Fungus%20%26%20Rot.jpg-n5VMpGo1PfbEiEyZYEM8DXxTsl1UZ5.jpeg"
                    alt="Fenna Mudroot - Druid of Fungus & Rot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                  <Leaf className="w-3 h-3 mr-1" />
                  Druid Candidate
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Vote className="w-3 h-3 mr-1 text-primary" />
                    Voting
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Fenna Mudroot
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  Cast out druid who found her calling in decay magic. Her mushroom gardens are temples to renewal
                  through death.
                </p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Specialization</span>
                    <span className="text-green-400 font-semibold">Fungus & Rot</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Unique Skill</span>
                    <span>Decay Detection</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Plot Value</span>
                    <span className="text-orange-400">High</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Vote Add
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 7 - Grizzle Nocktooth */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grizzle%20Nocktooth%20%E2%80%94%20Goblin%20Cook%20%26%20Poison%20Taster.jpg-Ek7PQ9iY5eTKcfUYWNzvo7ul3w0Hhl.jpeg"
                    alt="Grizzle Nocktooth - Goblin Cook & Poison Taster"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-red-600 text-white">
                  <Utensils className="w-3 h-3 mr-1" />
                  Cook Candidate
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Vote className="w-3 h-3 mr-1 text-primary" />
                    Voting
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Grizzle Nocktooth
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  Former royal poison taster with legendary immunity. His terrible cooking accidentally neutralizes most
                  toxins.
                </p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Specialization</span>
                    <span className="text-purple-400 font-semibold">Poison Immunity</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Unique Skill</span>
                    <span>Toxic Resistance</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Plot Value</span>
                    <span className="text-orange-400">High</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Vote Add
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 8 - Puddle Thrym */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puddle%20Thrym%20%E2%80%94%20Half-Orc%20Ratcatcher2.jpg-L17FVJ38G7bgvz2NSCvM7ImOvuMBIu.jpeg"
                    alt="Puddle Thrym - Half-Orc Ratcatcher"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-gray-600 text-white">
                  <Search className="w-3 h-3 mr-1" />
                  Scout Candidate
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Vote className="w-3 h-3 mr-1 text-primary" />
                    Voting
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Puddle Thrym
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  Half-orc raised by rats in city sewers. His underground network spans multiple kingdoms.
                </p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Specialization</span>
                    <span className="text-gray-400 font-semibold">Underground Scout</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Unique Skill</span>
                    <span>Rat Communication</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Plot Value</span>
                    <span className="text-orange-400">High</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Vote Add
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 9 - Merricka Bumblebarrel */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Merricka%20Bumblebarrel%20%E2%80%94%20Bard1.jpg-c9uF7c6VSwi5HrmKaqnJhDUJpqAVt9.jpeg"
                    alt="Merricka Bumblebarrel - Bard"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-pink-600 text-white">
                  <Music className="w-3 h-3 mr-1" />
                  Bard Candidate
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Vote className="w-3 h-3 mr-1 text-primary" />
                    Voting
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Merricka Bumblebarrel
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  Former court jester with illusion magic. Exiled for a prank that nearly started a war.
                </p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Specialization</span>
                    <span className="text-pink-400 font-semibold">Illusion & Spy</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Unique Skill</span>
                    <span>Court Intrigue</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Plot Value</span>
                    <span className="text-orange-400">High</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Vote Add
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 10 - Bogglewort Crickensnap */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bogglewort%20%E2%80%9CBoggle%E2%80%9D%20Crickensnap%20%E2%80%94%20Tinkerer%20of%20Useless%20Devices.jpg-S6unXDEPd34ivmxBcWRXYHE3EAJsga.jpeg"
                    alt="Bogglewort Crickensnap - Tinkerer of Useless Devices"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-yellow-600 text-white">
                  <Cog className="w-3 h-3 mr-1" />
                  Tinkerer Candidate
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium flex items-center">
                    <Vote className="w-3 h-3 mr-1 text-primary" />
                    Voting
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Bogglewort "Boggle" Crickensnap
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  Gnome tinkerer expelled from academy. His "useless" inventions sometimes reshape reality in wonderful
                  ways.
                </p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Specialization</span>
                    <span className="text-yellow-400 font-semibold">Chaos Engineering</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Unique Skill</span>
                    <span>Impossible Solutions</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Plot Value</span>
                    <span className="text-orange-400">High</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Vote Add
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character 11 - Community Suggestion Slot */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden border-dashed border-2 border-primary/30">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-muted to-card flex items-center justify-center">
                  <UserPlus className="w-16 h-16 text-primary" />
                </div>
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <UserPlus className="w-3 h-3 mr-1" />
                  Open Slot
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                  Your Character Here
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  Submit your own character concept and let the community vote on whether they join the dragon's legacy.
                </p>

                {/* Submission Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span>Submissions</span>
                    <span className="text-primary font-semibold">Open</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Community Reviews</span>
                    <span>Active</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Acceptance Rate</span>
                    <span className="text-green-400">Varies</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Submit
                  </Button>
                  <Button size="sm" className="flex-1 text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    Browse
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Character Relationship Map */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl font-bold mb-2">Character Relationships</h3>
              <p className="text-muted-foreground">
                Explore the complex web of alliances, rivalries, and bonds in "Oath of Flame"
              </p>
            </div>

            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Relationship Vote 1 */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Serana%20Valeblade%20%E2%80%94%20Knight%20%20Scholar%20of%20Faith2.jpg-OKEWrPNoznehd6RLzBgM87AaoKFuxm.jpeg"
                          alt="Serana"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Heart className="w-6 h-6 text-red-500" />
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caelin%20Thorne%2C%20flame-born%20sorcerer-XA74fnjuy845l89rVzY552wAVQQnzS.png"
                          alt="Caelin"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2">Serana & Caelin</h4>
                    <p className="text-sm text-muted-foreground mb-3">Should faith and flame find common ground?</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Allies</span>
                        <span className="text-primary font-semibold">Active Vote</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "58%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Relationship Vote 2 */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nyxara%20Veilthorn%20%20ethereal%20high-elf-R0DaQXnpIucuIqZeVfytXsWX4NITsi.png"
                          alt="Nyxara"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Sword className="w-6 h-6 text-purple-600" />
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thornik%20Bramblebrew%2C%20stocky%20dwarf-EtvYrRLS1e3UBuiBvmu6SZXrSQHGrh.png"
                          alt="Thornik"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2">Nyxara & Thornik</h4>
                    <p className="text-sm text-muted-foreground mb-3">Ancient magic meets dwarven craft</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Collaboration</span>
                        <span className="text-primary font-semibold">Active Vote</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "42%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Relationship Vote 3 */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Elowen%20Greenbloom%20Druid-3FHKYyio0ZY6SW3XIKmHllobU9Muh1.png"
                          alt="Elowen"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Users className="w-6 h-6 text-primary" />
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Serana%20Valeblade%20%E2%80%94%20Knight%20%20Scholar%20of%20Faith2.jpg-OKEWrPNoznehd6RLzBgM87AaoKFuxm.jpeg"
                          alt="Serana"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2">Elowen & Serana</h4>
                    <p className="text-sm text-muted-foreground mb-3">Nature's wisdom guides divine purpose</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Mentorship</span>
                        <span className="text-primary font-semibold">Active Vote</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "71%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" className="bg-transparent">
                    <Vote className="w-4 h-4 mr-2" />
                    Vote on All Relationships
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chapter Progression Voting */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-balance">Choose the Next Adventure</h2>
            <p className="text-xl text-muted-foreground text-balance">
              The dragon's prophecy has been triggered. Vote on which story should unfold next in the realm, as each
              path reveals more of the Nine relics and the growing influence of the Tenth Seal.
            </p>
          </div>

          {/* Chapter Voting Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Chapter Option 1 - Depthspire */}
            <Card className="group hover:fantasy-glow transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Deathspire%20-%20The%20Dungeon%20Below-GHufmUqEBa311i42GLyDB6hDT239On.jpeg"
                    alt="Deathspire - The Dungeon Below"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-slate-600 text-white">
                  <Mountain className="w-3 h-3 mr-1" />
                  Dungeon
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Next Story</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  "Depthspire – The Dungeon Below"
                </h3>
                <p className="text-sm text-muted-foreground mb-2 italic">
                  "Some depths were never meant to be travelled"
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  A legendary prison dungeon awakens, sending monsters flooding into the overworld. Five strangers must
                  descend into its ever-shifting maze where reality warps and another relic stirs beneath the world.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span>Relic Connection</span>
                    <span className="text-primary font-semibold">Fragment of the Concord</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Story Tone</span>
                    <span className="text-slate-400">Horror/Survival</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Vote className="w-4 h-4 mr-2" />
                  Vote for Depthspire
                </Button>
              </CardContent>
            </Card>

            {/* Chapter Option 2 - Crownless */}
            <Card className="group hover:fantasy-glow transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Crownless%20%E2%80%93%20The%20Forgotten%20King-jrrwxuaxGfiTKY1wPQT4s9U9YwXRqJ.jpeg"
                    alt="Crownless – The Forgotten King"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Political
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Next Story</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  "Crownless – The Forgotten King"
                </h3>
                <p className="text-sm text-muted-foreground mb-2 italic">
                  "Power has a price—and madness always collects"
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  A cursed crown reappears after a thousand years, promising power but whispering madness. A rogue,
                  cleric, and disgraced prince must destroy it, but secrets among them may doom their quest.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span>Relic Connection</span>
                    <span className="text-primary font-semibold">Cursed Crown of Nine</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Story Tone</span>
                    <span className="text-purple-400">Political Intrigue</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Vote className="w-4 h-4 mr-2" />
                  Vote for Crownless
                </Button>
              </CardContent>
            </Card>

            {/* Chapter Option 3 - Mimic Hollow */}
            <Card className="group hover:fantasy-glow transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mimic%20Hollow%20%E2%80%93%20City%20of%20Lies-8M9XZDOaqAjqGA5qH7gmLTQNO3VwmZ.jpeg"
                    alt="Mimic Hollow – City of Lies"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                  <Eye className="w-3 h-3 mr-1" />
                  Mystery
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Next Story</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  "Mimic Hollow – City of Lies"
                </h3>
                <p className="text-sm text-muted-foreground mb-2 italic">"What you see will deceive you"</p>
                <p className="text-sm text-muted-foreground mb-4">
                  In a metropolis built on ancient ruins, gruesome murders reveal shape-shifting mimics. A
                  bard-detective and goblin sidekick go undercover to expose the creature behind the growing mimic
                  horde.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span>Relic Connection</span>
                    <span className="text-primary font-semibold">City-wide Illusion Relic</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Story Tone</span>
                    <span className="text-green-400">Detective Mystery</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Vote className="w-4 h-4 mr-2" />
                  Vote for Mimic Hollow
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Voting Status */}
          <Card className="border-primary/20 mb-8">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-bold mb-2">Next Story Voting Status</h3>
                <p className="text-muted-foreground">Voting closes in 5 days, 8 hours</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Depthspire – The Dungeon Below</span>
                  <span className="text-primary font-semibold">Active</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-slate-500 h-3 rounded-full relative" style={{ width: "38%" }}>
                    <span className="absolute right-2 top-0 text-xs text-white font-semibold leading-3">38%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Crownless – The Forgotten King</span>
                  <span className="text-primary font-semibold">Active</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full relative" style={{ width: "34%" }}>
                    <span className="absolute right-2 top-0 text-xs text-white font-semibold leading-3">34%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Mimic Hollow – City of Lies</span>
                  <span className="text-primary font-semibold">Active</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full relative" style={{ width: "28%" }}>
                    <span className="absolute right-2 top-0 text-xs text-white font-semibold leading-3">28%</span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <Button size="lg">
                  <Vote className="w-5 h-5 mr-2" />
                  Cast Your Story Vote
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Future Chapters Preview */}
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold mb-4">The Nine Relics Await</h3>
            <p className="text-muted-foreground mb-6">
              Each story reveals more about the ancient pact between dragons and mortals. Your choices will determine
              which relics are discovered next and how the Tenth Seal's influence grows across the realm.
            </p>
            <Button variant="outline" className="bg-transparent">
              <Scroll className="w-4 h-4 mr-2" />
              View Prophecy Timeline
            </Button>
          </div>
        </div>
      </section>

      {/* Cross-Genre Features */}
      <section className="py-20 px-6 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-balance">Universal Features</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Experience platform-wide voting systems and cross-genre storytelling innovations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Hot Right Now Carousel */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Flame className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">Hot Right Now</h3>
                  <p className="text-sm text-muted-foreground">Trending stories across all genres</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Crown className="w-6 h-6 text-amber-400" />
                      <div>
                        <div className="font-medium text-sm">The Dragon's Gambit</div>
                        <div className="text-xs text-muted-foreground">Fantasy</div>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">🔥 Hot</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Rocket className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="font-medium text-sm">Mars Colony Crisis</div>
                        <div className="text-xs text-muted-foreground">Sci-Fi</div>
                      </div>
                    </div>
                    <Badge variant="outline">Trending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-pink-400" />
                      <div>
                        <div className="font-medium text-sm">Love in Paris</div>
                        <div className="text-xs text-muted-foreground">Romance</div>
                      </div>
                    </div>
                    <Badge variant="outline">Rising</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View All Trending
                </Button>
              </CardContent>
            </Card>

            {/* Genre Mixer */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Shuffle className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">Genre Mixer</h3>
                  <p className="text-sm text-muted-foreground">Vote to blend elements from multiple genres</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-card/50 rounded-lg border border-primary/20">
                    <h4 className="font-semibold mb-2 text-sm">Current Mix Vote</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Fantasy 60%
                      </Badge>
                      <span className="text-xs">+</span>
                      <Badge variant="outline" className="text-xs">
                        Sci-Fi 40%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      "Space Fantasy: Magic meets technology in distant galaxies"
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      <Crown className="w-3 h-3 mr-1" />
                      Fantasy
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      <Rocket className="w-3 h-3 mr-1" />
                      Sci-Fi
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      <Ghost className="w-3 h-3 mr-1" />
                      Horror
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      <Heart className="w-3 h-3 mr-1" />
                      Romance
                    </Button>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Create Mix
                </Button>
              </CardContent>
            </Card>

            {/* Global Voting Countdown */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">Urgent Decisions</h3>
                  <p className="text-sm text-muted-foreground">Most critical votes closing soon</p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Dragon's Gambit</span>
                      <Badge variant="destructive" className="text-xs">
                        2h left
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Fantasy • 12,847 votes</p>
                  </div>
                  <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Mars Colony Crisis</span>
                      <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">
                        8h left
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Sci-Fi • 8,234 votes</p>
                  </div>
                  <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Haunted Manor</span>
                      <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                        1d left
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Horror • 5,678 votes</p>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Vote className="w-4 h-4 mr-2" />
                  Vote Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Cross-Genre Recommendations */}
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold mb-4">Personalized Recommendations</h3>
            <p className="text-muted-foreground mb-6">Based on your voting history and preferences</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="outline" className="text-sm">
                <Compass className="w-3 h-3 mr-1" />
                Since you love Fantasy, try Space Fantasy
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Star className="w-3 h-3 mr-1" />
                Horror fans also enjoy Psychological Thrillers
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Heart className="w-3 h-3 mr-1" />
                Romance + Historical = Perfect Match
              </Badge>
            </div>
            <Button size="lg" variant="outline" className="bg-transparent">
              <Compass className="w-4 h-4 mr-2" />
              Get My Recommendations
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Episode Showcase */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-balance">Latest Epic Adventure</h2>
            <p className="text-xl text-muted-foreground text-balance">
              The fate of the realm hangs in the balance. What happens next is up to you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video Player */}
            <div className="relative">
              <div className="aspect-video bg-card rounded-lg overflow-hidden fantasy-glow">
                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Episode 12: The Dragon's Gambit</p>
                  </div>
                </div>
              </div>
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">New Episode</Badge>
            </div>

            {/* Episode Info */}
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-2">The Dragon's Gambit</h3>
                <p className="text-muted-foreground mb-4">
                  As our heroes stand before the ancient dragon's lair, they must choose their approach. Will they
                  attempt diplomacy, prepare for battle, or seek another path entirely?
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">Fantasy</Badge>
                  <Badge variant="outline">Adventure</Badge>
                  <Badge variant="outline">Dragon</Badge>
                </div>
              </div>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Vote className="w-4 h-4 mr-2 text-primary" />
                    Current Vote: What should the party do?
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Attempt to negotiate with the dragon</span>
                      <span className="text-primary font-semibold">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Prepare for epic battle</span>
                      <span className="text-primary font-semibold">35%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Search for a secret entrance</span>
                      <span className="text-primary font-semibold">20%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">Voting closes in 2 days, 14 hours</p>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Episode
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Vote className="w-4 h-4 mr-2" />
                  Cast Your Vote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Grid Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-balance">All Epic Adventures</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Explore ongoing stories, cast your votes, and shape legendary tales
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button variant="default" size="sm" className="fantasy-glow">
              <Filter className="w-4 h-4 mr-2" />
              Currently Voting
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              In Production
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Recently Released
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Complete Series
            </Button>
          </div>

          {/* Episode Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Episode 1 - Currently Voting */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">The Dragon's Gambit</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <Vote className="w-3 h-3 mr-1" />
                  Voting Active
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Episode 12</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  The Dragon's Gambit
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  The party stands before the ancient dragon's lair. Will they negotiate, fight, or find another path?
                  Your vote decides their fate in this epic confrontation.
                </p>

                {/* Voting Status */}
                <div className="mb-4 p-3 bg-card/50 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Vote</span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      2d 14h left
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Negotiate</span>
                      <span className="text-primary font-semibold">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "45%" }} />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Story Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Episode 2 - In Production */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-purple-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Sword className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">The Cursed Crown</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">In Production</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Episode 8</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  The Cursed Crown
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  The royal artifact pulses with dark magic. Based on your votes, the party chose to investigate its
                  origins. Production begins next week!
                </p>

                {/* Production Status */}
                <div className="mb-4 p-3 bg-card/50 rounded-lg border border-muted">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Production Status</span>
                    <span className="text-xs text-muted-foreground">Scripting Phase</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Story Progress</span>
                    <span>50%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled>
                    <Eye className="w-3 h-3 mr-1" />
                    Coming Soon
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Scroll className="w-3 h-3 mr-1" />
                    Behind Scenes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Episode 3 - Recently Released */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">The Forest Awakens</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">New Release</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Episode 15</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  The Forest Awakens
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  The ancient trees respond to the party's call for aid. Your collective choice to seek nature's
                  alliance has awakened powerful forest guardians.
                </p>

                {/* View Stats */}
                <div className="mb-4 p-3 bg-card/50 rounded-lg border border-green-600/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Episode Stats</span>
                    <span className="text-xs text-green-400">Released 2 days ago</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Views:</span>
                      <span className="ml-1 font-semibold">8,432</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="ml-1 font-semibold text-primary">4.8/5</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Story Progress</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: "90%" }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Now
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Users className="w-3 h-3 mr-1" />
                    Discuss
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Episode 4 - Complete Series */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-amber-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Scroll className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">The Lost Kingdom</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-amber-600 text-white">Complete</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Season 1</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  The Lost Kingdom
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  A completed epic saga where heroes reclaimed their homeland. Experience the full journey shaped by
                  thousands of community votes.
                </p>

                {/* Series Stats */}
                <div className="mb-4 p-3 bg-card/50 rounded-lg border border-amber-600/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Series Complete</span>
                    <span className="text-xs text-amber-400">12 Episodes</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Total Views:</span>
                      <span className="ml-1 font-semibold">156K</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Rating:</span>
                      <span className="ml-1 font-semibold text-primary">4.9/5</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar - Complete */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Story Progress</span>
                    <span className="text-amber-400 font-semibold">Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-primary h-2 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Binge Watch
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Crown className="w-3 h-3 mr-1" />
                    Hall of Fame
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Episode 5 - Currently Voting */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-red-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Sword className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">The Demon's Pact</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <Vote className="w-3 h-3 mr-1" />
                  Voting Active
                </Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Episode 6</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  The Demon's Pact
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  A powerful demon offers forbidden knowledge in exchange for a terrible price. Should the party accept
                  this dangerous bargain?
                </p>

                {/* Voting Status */}
                <div className="mb-4 p-3 bg-card/50 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Vote</span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      5d 8h left
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Accept the pact</span>
                      <span className="text-primary font-semibold">28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "28%" }} />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Story Progress</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Vote className="w-3 h-3 mr-1" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Episode 6 - Recently Released */}
            <Card className="group hover:fantasy-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">The Merchant's Tale</p>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">New Release</Badge>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">Episode 3</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  The Merchant's Tale
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  Your votes led the party to trust the mysterious merchant. Now they possess a map to legendary
                  treasure, but at what cost?
                </p>

                {/* View Stats */}
                <div className="mb-4 p-3 bg-card/50 rounded-lg border border-green-600/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Episode Stats</span>
                    <span className="text-xs text-green-400">Released 1 week ago</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Views:</span>
                      <span className="ml-1 font-semibold">12,156</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="ml-1 font-semibold text-primary">4.7/5</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Story Progress</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Watch Now
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Users className="w-3 h-3 mr-1" />
                    Discuss
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="bg-transparent">
              <Scroll className="w-4 h-4 mr-2" />
              Load More Adventures
            </Button>
          </div>
        </div>
      </section>

      {/* Advanced Voting System Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 text-balance">Advanced Voting Hub</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Experience next-generation storytelling through sophisticated voting mechanisms and predictive gameplay
            </p>
          </div>

          {/* Voting Dashboard */}
          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {/* User Voting Stats */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">47</div>
                <div className="text-sm text-muted-foreground mb-2">Voting Streak</div>
                <Badge variant="outline" className="text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  On Fire!
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">89%</div>
                <div className="text-sm text-muted-foreground mb-2">Prediction Accuracy</div>
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Oracle Tier
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">2,847</div>
                <div className="text-sm text-muted-foreground mb-2">Influence Score</div>
                <Badge variant="outline" className="text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Legendary
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground mb-2">Active Votes</div>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Expires Soon
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Voting Types */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Ranked Choice Voting */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-serif text-xl font-bold">Ranked Choice Voting</h3>
                    <p className="text-sm text-muted-foreground">Complex decisions with multiple preferences</p>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-card/50 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-3">How should the party approach the ancient temple?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-background/50 rounded border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          1st
                        </Badge>
                        <span className="text-sm">Stealth infiltration at night</span>
                      </div>
                      <span className="text-primary font-semibold text-sm">34%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/50 rounded border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          2nd
                        </Badge>
                        <span className="text-sm">Direct frontal assault</span>
                      </div>
                      <span className="text-primary font-semibold text-sm">28%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/50 rounded border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          3rd
                        </Badge>
                        <span className="text-sm">Seek diplomatic audience</span>
                      </div>
                      <span className="text-primary font-semibold text-sm">22%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/50 rounded border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          4th
                        </Badge>
                        <span className="text-sm">Research ancient rituals first</span>
                      </div>
                      <span className="text-primary font-semibold text-sm">16%</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Vote className="w-4 h-4 mr-2" />
                    Rank Choices
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Results
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Consequences Simulator */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gamepad2 className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-serif text-xl font-bold">Consequences Simulator</h3>
                    <p className="text-sm text-muted-foreground">Preview potential outcomes before voting</p>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-card/50 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-3">Simulate: "Accept the demon's pact"</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Skull className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400">High Risk Outcome</span>
                        <Badge variant="destructive" className="text-xs">
                          73% Chance
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Party gains forbidden knowledge but Morgana's power increases dramatically. Two party members
                        may be corrupted.
                      </p>
                    </div>
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Beneficial Outcome</span>
                        <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                          27% Chance
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Party outsmarts the demon, gaining power without corruption. Unlocks secret ending path.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Run Simulation
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View All Paths
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visual Voting Systems */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {/* Scene Setting Vote */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Mountain className="w-10 h-10 text-primary mx-auto mb-2" />
                  <h3 className="font-serif text-lg font-bold">Scene Setting Vote</h3>
                  <p className="text-xs text-muted-foreground">Choose the next adventure location</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="relative group cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-blue-900 to-slate-900 rounded-lg flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-colors">
                      <Mountain className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-semibold">Frozen Peaks</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Frozen Peaks</span>
                      <span className="text-primary font-semibold text-xs">45%</span>
                    </div>
                  </div>

                  <div className="relative group cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-green-900 to-slate-900 rounded-lg flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-colors">
                      <Trees className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-semibold">Enchanted Forest</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Enchanted Forest</span>
                      <span className="text-primary font-semibold text-xs">35%</span>
                    </div>
                  </div>

                  <div className="relative group cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-amber-900 to-slate-900 rounded-lg flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-colors">
                      <Castle className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-semibold">Ruined Citadel</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Ruined Citadel</span>
                      <span className="text-primary font-semibold text-xs">20%</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Vote className="w-3 h-3 mr-2" />
                  Cast Scene Vote
                </Button>
              </CardContent>
            </Card>

            {/* Character Mood Board */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Heart className="w-10 h-10 text-primary mx-auto mb-2" />
                  <h3 className="font-serif text-lg font-bold">Character Mood Board</h3>
                  <p className="text-xs text-muted-foreground">Visual voting for character emotions</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3">How should Theron react to Zara's betrayal?</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative group cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-colors">
                        <Flame className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs">Rage</span>
                        <div className="text-primary font-semibold text-xs">42%</div>
                      </div>
                    </div>
                    <div className="relative group cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-colors">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs">Heartbreak</span>
                        <div className="text-primary font-semibold text-xs">38%</div>
                      </div>
                    </div>
                    <div className="relative group cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-colors">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs">Understanding</span>
                        <div className="text-primary font-semibold text-xs">20%</div>
                      </div>
                    </div>
                    <div className="relative group cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-colors">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs">Forgiveness</span>
                        <div className="text-primary font-semibold text-xs">0%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Heart className="w-3 h-3 mr-2" />
                  Vote Emotion
                </Button>
              </CardContent>
            </Card>

            {/* Combat Style Vote */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Sword className="w-10 h-10 text-primary mx-auto mb-2" />
                  <h3 className="font-serif text-lg font-bold">Combat Style Vote</h3>
                  <p className="text-xs text-muted-foreground">Choose battle choreography</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-card/50 rounded-lg border cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Sword className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Brutal Melee</span>
                      <Badge variant="outline" className="text-xs ml-auto">
                        52%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Close-quarters combat with visceral sword work</p>
                  </div>

                  <div className="p-3 bg-card/50 rounded-lg border cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Magical Duel</span>
                      <Badge variant="outline" className="text-xs ml-auto">
                        31%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Spectacular spell-casting battle</p>
                  </div>

                  <div className="p-3 bg-card/50 rounded-lg border cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Tactical Strike</span>
                      <Badge variant="outline" className="text-xs ml-auto">
                        17%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Strategic positioning and teamwork</p>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Sword className="w-3 h-3 mr-2" />
                  Vote Combat Style
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Gamification Features */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Voting Achievements */}
            <Card className="border-primary/20 hover:fantasy-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-serif text-xl font-bold">Voting Achievements</h3>
                    <p className="text-sm text-muted-foreground">Unlock rewards through active participation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Flame className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">Voting Streak Master</span>
                        <Badge className="text-xs">Unlocked</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Vote for 30 consecutive episodes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">Oracle's Vision</span>
                        <Badge variant="outline" className="text-xs">
                          7/10
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Predict 10 story outcomes correctly</p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: "70%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">Community Champion</span>
                        <Badge className="text-xs">Unlocked</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Engage in 50 community discussions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
