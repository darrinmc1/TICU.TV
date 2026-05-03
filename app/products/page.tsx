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
    <div className="story-atmosphere relative min-h-screen overflow-hidden">
      {/* Coming soon banner — this page is a v0 placeholder, not yet wired to live data. */}
      <div className="relative z-20 bg-amber-500/90 text-slate-950 text-center text-sm font-medium py-2 px-4">
        Coming soon — this page is being rebuilt and will return with live data.
      </div>
      <div className="film-grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-14 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-28 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />
      {/* Navigation */}
      <nav className="relative z-10 border-b border-amber-200/15 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span className="font-sans text-sm">Home</span>
              </Link>
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-cyan-300" />
                <div>
                  <h1 className="font-serif text-xl font-bold text-white">Products</h1>
                  <p className="text-xs text-slate-300">All products created or completed</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950">{activeStories.length} Active</Badge>
              <Badge variant="outline" className="border-cyan-300/40 text-cyan-200">
                {completedStories.length} Completed
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Products Hero */}
      <section className="relative z-10 py-20 px-6 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <p className="editorial-kicker mb-4">Universe Catalog</p>
          <Package className="w-20 h-20 text-cyan-300 mx-auto mb-6" />
          <h1 className="section-title font-serif mb-6 bg-gradient-to-r from-amber-100 via-orange-200 to-cyan-200 bg-clip-text text-transparent text-balance">
            Our Products
          </h1>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-white/80 mb-8 text-balance">
            Explore all the stories and products created in our universe
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-white/75">Loading products...</div>
          ) : stories.length === 0 ? (
            <div className="text-center text-white/75">No products found. Create your first story!</div>
          ) : (
            <div className="space-y-12">
              {/* Active Products */}
              {activeStories.length > 0 && (
                <div>
                  <p className="editorial-kicker mb-2">Live Shelf</p>
                  <h2 className="font-serif text-4xl font-bold mb-6 text-white flex items-center gap-3 tracking-tight">
                    <Clock className="w-8 h-8 text-amber-300" />
                    Active Products
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeStories.map((story) => (
                      <Link key={story.id} href={`/${story.genre}`}>
                        <Card className="glass-panel border-amber-300/20 hover:border-amber-300/50 hover:shadow-[0_20px_60px_-30px_rgba(251,191,36,0.7)] transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="cinematic-frame mb-4 aspect-[16/9]">
                              <div className="relative h-full p-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-300/35 to-cyan-300/30" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />
                                <div className="relative flex h-full flex-col justify-between">
                                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/65">Cinematic still</p>
                                  <p className="font-serif text-lg text-white line-clamp-2">{story.title}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-emerald-600 text-emerald-100">{story.status}</Badge>
                              <span className="text-xs text-slate-300 capitalize">{story.genre}</span>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2 text-white">{story.title}</h3>
                            <p className="text-sm text-white/75 line-clamp-3">{story.description}</p>
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
                  <p className="editorial-kicker mb-2">Archive</p>
                  <h2 className="font-serif text-4xl font-bold mb-6 text-white flex items-center gap-3 tracking-tight">
                    <CheckCircle className="w-8 h-8 text-cyan-300" />
                    Completed Products
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedStories.map((story) => (
                      <Link key={story.id} href={`/${story.genre}`}>
                        <Card className="glass-panel border-cyan-300/20 hover:border-cyan-300/50 hover:shadow-[0_20px_60px_-30px_rgba(34,211,238,0.7)] transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="cinematic-frame mb-4 aspect-[16/9]">
                              <div className="relative h-full p-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/35 to-amber-300/25" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />
                                <div className="relative flex h-full flex-col justify-between">
                                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/65">Cinematic still</p>
                                  <p className="font-serif text-lg text-white line-clamp-2">{story.title}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-sky-700 text-sky-100">{story.status}</Badge>
                              <span className="text-xs text-slate-300 capitalize">{story.genre}</span>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2 text-white">{story.title}</h3>
                            <p className="text-sm text-white/75 line-clamp-3">{story.description}</p>
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
