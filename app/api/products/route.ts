import { NextResponse } from 'next/server'
import { getStories } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const stories = await getStories()
    const filteredStories = stories.filter(
      (s: { status: string }) => s.status === 'active' || s.status === 'completed'
    )
    return NextResponse.json({ stories: filteredStories })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
