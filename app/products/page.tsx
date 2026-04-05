'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Home, Package, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

type Story = {
  id: string
  title: string
  description: string
  genre: string
  status: 'draft' | 'active' | 'completed'
  created_at: string
  updated_at: string
}

export default function ProductsPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        if (data.stories) {
          setStories(data.stories)
        }
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  const activeStories = stories.filter(s => s.status === 'active')
  const completedStories = stories.filter(s => s.status === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900">
      {/* Navigation */}
      <nav className="border-b border-fuchsia-500/20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-sans text-sm">Home</span>
              </Link>
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-fuchsia-400" />
                <div>
                  <h1 className="font-sans text-xl font-bold text-fuchsia-100">Products</h1>
                  <p className="text-xs text-fuchsia-300/70">All products created or completed</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-fuchsia-600 text-fuchsia-100">{activeStories.length} Active</Badge>
              <Badge variant="outline" className="border-fuchsia-600 text-fuchsia-400">
                {completedStories.length} Completed
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Products Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(fuchsia 1px, transparent 1px),
              linear-gradient(90deg, fuchsia 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Package className="w-20 h-20 text-fuchsia-400 mx-auto mb-6" />
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 text-fuchsia-100 text-balance">Our Products</h1>
          <p className="text-xl md:text-2xl text-fuchsia-200/80 mb-8 text-balance">
            Explore all the stories and products created in our universe
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-fuchsia-200">Loading products...</div>
          ) : stories.length === 0 ? (
            <div className="text-center text-fuchsia-200">No products found. Create your first story!</div>
          ) : (
            <div className="space-y-12">
              {/* Active Products */}
              {activeStories.length > 0 && (
                <div>
                  <h2 className="font-sans text-3xl font-bold mb-6 text-fuchsia-100 flex items-center gap-3">
                    <Clock className="w-8 h-8" />
                    Active Products
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeStories.map((story) => (
                      <Link key={story.id} href={`/${story.genre}`}>
                        <Card className="bg-fuchsia-900/20 border-fuchsia-600/30 hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-green-600 text-green-100">{story.status}</Badge>
                              <span className="text-xs text-fuchsia-300/70 capitalize">{story.genre}</span>
                            </div>
                            <h3 className="font-sans text-xl font-bold mb-2 text-fuchsia-100">{story.title}</h3>
                            <p className="text-sm text-fuchsia-200/70 line-clamp-3">{story.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Products */}
              {completedStories.length > 0 && (
                <div>
                  <h2 className="font-sans text-3xl font-bold mb-6 text-fuchsia-100 flex items-center gap-3">
                    <CheckCircle className="w-8 h-8" />
                    Completed Products
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedStories.map((story) => (
                      <Link key={story.id} href={`/${story.genre}`}>
                        <Card className="bg-fuchsia-900/20 border-fuchsia-600/30 hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-purple-600 text-purple-100">{story.status}</Badge>
                              <span className="text-xs text-fuchsia-300/70 capitalize">{story.genre}</span>
                            </div>
                            <h3 className="font-sans text-xl font-bold mb-2 text-fuchsia-100">{story.title}</h3>
                            <p className="text-sm text-fuchsia-200/70 line-clamp-3">{story.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
