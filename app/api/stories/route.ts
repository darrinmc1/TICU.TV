import { NextResponse } from 'next/server'
import { getVoteOptions, getStoryById } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const storyId = searchParams.get('storyId')

    if (!storyId) {
      return NextResponse.json(
        { error: 'Missing storyId parameter' },
        { status: 400 }
      )
    }

    const story = await getStoryById(storyId)
    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }

    const options = await getVoteOptions(storyId)
    return NextResponse.json({ story, options })
  } catch (error) {
    console.error('Error getting story and options:', error)
    return NextResponse.json(
      { error: 'Failed to get story options' },
      { status: 500 }
    )
  }
}
