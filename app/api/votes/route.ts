import { NextResponse } from 'next/server';
import { castVote, getVoteResults } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storyId, userId, optionId } = body;

    if (!storyId || !userId || !optionId) {
      return NextResponse.json(
        { error: 'Missing required fields: storyId, userId, optionId' },
        { status: 400 }
      );
    }

    await castVote(storyId, userId, optionId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error casting vote:', error);
    return NextResponse.json(
      { error: 'Failed to cast vote' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('storyId');

    if (!storyId) {
      return NextResponse.json(
        { error: 'Missing storyId parameter' },
        { status: 400 }
      );
    }

    const results = await getVoteResults(storyId);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error getting vote results:', error);
    return NextResponse.json(
      { error: 'Failed to get vote results' },
      { status: 500 }
    );
  }
}
