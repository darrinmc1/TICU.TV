"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Simple SVG icons
const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
)

const VoteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
)

const VideoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
)

const ContentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
)

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <h1 className="font-serif text-xl font-bold text-foreground">TICU.tv Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Administrator</Badge>
              <Link href="/admin/acts">
                <Button size="sm">Upload Acts</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-muted-foreground">Manage your interactive cinema platform</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <SettingsIcon />
                Overview
              </TabsTrigger>
              <TabsTrigger value="profiles" className="flex items-center gap-2">
                <UsersIcon />
                Profiles
              </TabsTrigger>
              <TabsTrigger value="voting" className="flex items-center gap-2">
                <VoteIcon />
                Voting
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <ContentIcon />
                Content
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <VideoIcon />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">Analytics not connected</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Votes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">Live vote stats unavailable</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Episodes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">Episode metrics unavailable</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Characters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">Character metrics unavailable</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/admin/acts">
                    <Button className="h-auto w-full p-4 flex flex-col items-start">
                      <span className="font-semibold">Upload Book Act</span>
                      <span className="text-sm text-muted-foreground">Paste or upload act prose</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                    <span className="font-semibold">Add Character</span>
                    <span className="text-sm text-muted-foreground">Introduce new character</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                    <span className="font-semibold">Upload Episode</span>
                    <span className="text-sm text-muted-foreground">Add new video content</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profiles" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Character Profiles</CardTitle>
                  <CardDescription>Manage character information and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="character-name">Character Name</Label>
                      <Input id="character-name" placeholder="Enter character name" />
                    </div>
                    <div>
                      <Label htmlFor="character-class">Character Class</Label>
                      <Input id="character-class" placeholder="e.g., Knight Scholar" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="character-bio">Character Biography</Label>
                    <Textarea id="character-bio" placeholder="Enter character background story..." rows={4} />
                  </div>
                  <div>
                    <Label htmlFor="character-image">Character Image URL</Label>
                    <Input id="character-image" placeholder="https://..." />
                  </div>
                  <div className="flex gap-2">
                    <Button>Save Character</Button>
                    <Button variant="outline">Preview</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Characters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Serana Valeblade",
                      "Nyxara Veilthorn",
                      "Caelin Thorne",
                      "Thornik Bramblebrew",
                      "Elowen Greenbloom",
                    ].map((name) => (
                      <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{name}</span>
                          <Badge variant="secondary" className="ml-2">
                            Active
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Archive
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voting" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Vote</CardTitle>
                  <CardDescription>Set up a new story decision for users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="vote-title">Vote Title</Label>
                    <Input id="vote-title" placeholder="e.g., Dragon's Final Choice" />
                  </div>
                  <div>
                    <Label htmlFor="vote-description">Description</Label>
                    <Textarea
                      id="vote-description"
                      placeholder="Describe the decision users need to make..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vote-duration">Duration (hours)</Label>
                      <Input id="vote-duration" type="number" placeholder="24" />
                    </div>
                    <div>
                      <Label htmlFor="vote-category">Category</Label>
                      <Input id="vote-category" placeholder="e.g., Story Direction" />
                    </div>
                  </div>
                  <div>
                    <Label>Vote Options</Label>
                    <div className="space-y-2">
                      <Input placeholder="Option 1" />
                      <Input placeholder="Option 2" />
                      <Input placeholder="Option 3" />
                      <Button variant="outline" size="sm">
                        Add Option
                      </Button>
                    </div>
                  </div>
                  <Button>Create Vote</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Dragon's Final Choice</span>
                        <Badge variant="destructive" className="ml-2">
                          2h left
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                        <Button variant="outline" size="sm">
                          End Early
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Character Focus Vote</span>
                        <Badge variant="secondary" className="ml-2">
                          1d left
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Story Management</CardTitle>
                  <CardDescription>Manage the currently active story and its content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="story-title">Story Title</Label>
                    <Input id="story-title" defaultValue="Oath of Flame – The Dragon's Legacy" />
                  </div>
                  <div>
                    <Label htmlFor="story-synopsis">Synopsis</Label>
                    <Textarea
                      id="story-synopsis"
                      rows={4}
                      defaultValue="When a dying red dragon leaves behind a cryptic prophecy and a magical egg, a mismatched group of adventurers must unravel the truth behind an ancient pact made between dragons and mortals—or risk igniting a war that could consume the realm."
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-tagline">Tagline</Label>
                    <Input id="story-tagline" defaultValue="A promise forged in flame. A destiny sealed in blood" />
                  </div>
                  <Button>Update Story</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Book Management</CardTitle>
                  <CardDescription>Manage upcoming books in your catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Depthspire – The Dungeon Below",
                      "Crownless – The Forgotten King",
                      "Mimic Hollow – City of Lies",
                    ].map((book) => (
                      <div key={book} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{book}</span>
                          <Badge variant="outline" className="ml-2">
                            Draft
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit Book
                          </Button>
                          <Button variant="outline" size="sm">
                            Publish Book
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Video Content</CardTitle>
                  <CardDescription>Upload or link video episodes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input id="video-title" placeholder="Episode title" />
                  </div>
                  <div>
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input id="video-url" placeholder="https://youtube.com/watch?v=..." />
                  </div>
                  <div>
                    <Label htmlFor="video-thumbnail">Thumbnail URL</Label>
                    <Input id="video-thumbnail" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="video-duration">Duration (minutes)</Label>
                      <Input id="video-duration" type="number" placeholder="45" />
                    </div>
                    <div>
                      <Label htmlFor="video-status">Status</Label>
                      <select className="w-full p-2 border rounded-md bg-background">
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Scheduled</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea id="video-description" placeholder="Episode description..." rows={3} />
                  </div>
                  <Button>Add Video</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Video Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Chapter 8: The Dragon's Egg Awakens</span>
                        <Badge variant="secondary" className="ml-2">
                          Published
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Analytics
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Chapter 7: The Ancient Pact</span>
                        <Badge variant="secondary" className="ml-2">
                          Published
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
