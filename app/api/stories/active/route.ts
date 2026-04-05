import { NextResponse } from 'next/server'
import { getStories } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const stories = await getStories()
    return NextResponse.json({ stories })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stories', stories: [] },
      { status: 500 }
    )
  }
}
