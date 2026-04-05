import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Video,
  BarChart3,
  Settings,
  Upload,
  Eye,
  ThumbsUp,
  TrendingUp,
  Calendar,
  Edit,
  Play,
  Star,
  Award,
  DollarSign,
  Globe,
  Zap,
  Target,
  BookOpen,
  Film,
  Gamepad2,
  Crown,
  Sparkles,
  ArrowLeft,
  Home,
} from "lucide-react"
import Link from "next/link"

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Creator Navigation */}
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
                <span className="font-medium text-sm">Back to Platform</span>
              </Link>
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-xl font-bold text-purple-100">Creator Studio</h1>
                  <p className="text-xs text-purple-300/70">Manage your interactive stories</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-600 text-purple-100">Pro Creator</Badge>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-purple-100">
                <Upload className="w-4 h-4 mr-2" />
                New Story
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Creator Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300/70">Total Views</p>
                  <p className="text-2xl font-bold text-purple-100">—</p>
                  <p className="text-xs text-purple-300/70">Analytics unavailable</p>
                </div>
                <Eye className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300/70">Active Stories</p>
                  <p className="text-2xl font-bold text-purple-100">12</p>
                  <p className="text-xs text-purple-300/70">3 voting now</p>
                </div>
                <Film className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300/70">Community Votes</p>
                  <p className="text-2xl font-bold text-purple-100">—</p>
                  <p className="text-xs text-purple-300/70">Connect analytics to track</p>
                </div>
                <Gamepad2 className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300/70">Revenue</p>
                  <p className="text-2xl font-bold text-purple-100">—</p>
                  <p className="text-xs text-purple-300/70">Monetization coming soon</p>
                </div>
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="stories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger
              value="stories"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100"
            >
              <Film className="w-4 h-4 mr-2" />
              Stories
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100"
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger
              value="monetization"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue
            </TabsTrigger>
          </TabsList>

          {/* Stories Management */}
          <TabsContent value="stories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-purple-100">Your Stories</h2>
              <Button className="bg-purple-600 hover:bg-purple-700 text-purple-100">
                <Upload className="w-4 h-4 mr-2" />
                Create New Story
              </Button>
            </div>

            <div className="grid gap-6">
              {/* Active Stories */}
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-100 flex items-center gap-2">
                    <Play className="w-5 h-5 text-green-400" />
                    Active Stories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "The Dragon's Gambit",
                      genre: "Fantasy",
                      status: "Voting Active",
                    },
                    {
                      title: "Neon Shadows",
                      genre: "Sci-Fi",
                      status: "In Production",
                    },
                    {
                      title: "Victorian Mysteries",
                      genre: "Historical",
                      status: "Voting Active",
                    },
                  ].map((story, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-purple-950/30 rounded-lg border border-purple-500/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                          <Film className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-100">{story.title}</h3>
                          <p className="text-sm text-purple-300/70">{story.genre}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge
                              className={
                                story.status === "Voting Active"
                                  ? "bg-green-600 text-green-100"
                                  : "bg-yellow-600 text-yellow-100"
                              }
                            >
                              {story.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-purple-100">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-100">Performance Analytics</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-100">Voting Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Voting Activity</span>
                      <span className="text-purple-100 font-semibold">Monitoring...</span>
                    </div>
                    <div className="w-full bg-purple-950/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <p className="text-sm text-purple-300/70 text-center">Real-time voting metrics unavailable</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-100">Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-purple-300/70">
                      Demographic analysis requires verified viewership data. Connect your analytics account to view audience age groups, geographic regions, and preferences.
                    </p>
                    <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-600 bg-transparent">
                      Connect Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Management */}
          <TabsContent value="community" className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-100">Community Management</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-100">Recent Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      user: "DragonSlayer92",
                      comment: "Amazing plot twist! Can't wait for the next episode.",
                      story: "The Dragon's Gambit",
                    },
                    { user: "SciFiFan", comment: "The character development is incredible!", story: "Neon Shadows" },
                    {
                      user: "HistoryBuff",
                      comment: "Love the historical accuracy in this series.",
                      story: "Victorian Mysteries",
                    },
                  ].map((comment, index) => (
                    <div key={index} className="p-3 bg-purple-950/30 rounded-lg border border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-purple-100">{comment.user}</span>
                        <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                          {comment.story}
                        </Badge>
                      </div>
                      <p className="text-sm text-purple-300/80">{comment.comment}</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-purple-100 text-xs bg-transparent"
                        >
                          Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-purple-100 text-xs bg-transparent"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-100">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">Total Followers</span>
                    <span className="text-purple-100 font-semibold">24.7K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">Active Voters</span>
                    <span className="text-purple-100 font-semibold">18.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">Comments This Week</span>
                    <span className="text-purple-100 font-semibold">1.4K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">Community Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-purple-100 font-semibold">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Creator Tools */}
          <TabsContent value="tools" className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-100">Creator Tools</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-purple-900/20 border-purple-500/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-100 mb-2">Story Branch Editor</h3>
                  <p className="text-sm text-purple-300/70 mb-4">
                    Create complex branching narratives with multiple outcomes
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-purple-100">Open Editor</Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-100 mb-2">Character Manager</h3>
                  <p className="text-sm text-purple-300/70 mb-4">Design characters and manage their relationships</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-purple-100">
                    Manage Characters
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Gamepad2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-100 mb-2">Voting Designer</h3>
                  <p className="text-sm text-purple-300/70 mb-4">Create custom voting mechanics and decision points</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-purple-100">Design Votes</Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Video className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-100 mb-2">Video Uploader</h3>
                  <p className="text-sm text-purple-300/70 mb-4">Upload and manage your story episodes</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-purple-100">Upload Video</Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-100 mb-2">Release Scheduler</h3>
                  <p className="text-sm text-purple-300/70 mb-4">Schedule episodes and voting periods</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-purple-100">Schedule Content</Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-100 mb-2">AI Assistant</h3>
                  <p className="text-sm text-purple-300/70 mb-4">Get AI-powered story suggestions and improvements</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-purple-100">Get AI Help</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monetization */}
          <TabsContent value="monetization" className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-100">Revenue & Monetization</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-100">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300">This Month</span>
                    <span className="text-purple-100 font-semibold text-xl">$18,247</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Premium Subscriptions</span>
                      <span className="text-purple-100">$12,400</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Tip Jar</span>
                      <span className="text-purple-100">$3,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Merchandise</span>
                      <span className="text-purple-100">$1,847</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Sponsored Content</span>
                      <span className="text-purple-100">$800</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-100">Monetization Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-purple-100">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Set Up Premium Tiers
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Create Merchandise
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Enable Tip Jar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-purple-100 bg-transparent"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Sponsored Content
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
