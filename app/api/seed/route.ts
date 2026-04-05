import { NextResponse } from 'next/server'
import { initDb, createStory, createVoteOption } from '@/lib/db'

export async function POST() {
  try {
    await initDb()

    const story1 = await createStory(
      'The Dragon\'s Gambit',
      'An epic fantasy adventure where heroes must decide the fate of a dragon and its ancient treasure.',
      'fantasy'
    )

    await createVoteOption(story1.id, 'The Ancient Temple Discovery', 'The party discovers ruins of an ancient civilization with mysterious powers')
    await createVoteOption(story1.id, 'The Betrayal Revealed', "A trusted ally's dark secret comes to light, threatening the group")
    await createVoteOption(story1.id, "The Dragon's Challenge", 'Face the dragon in a test of wit and courage rather than combat')

    const story2 = await createStory(
      'Mars Colony Crisis',
      'A sci-fi thriller set on a Mars colony where survival depends on difficult choices.',
      'sci-fi'
    )

    await createVoteOption(story2.id, 'Commander Aria Chen', 'A battle-hardened leader with a mysterious past')
    await createVoteOption(story2.id, 'Dr. Marcus Webb', 'A brilliant scientist with questionable ethics')
    await createVoteOption(story2.id, 'Lyra Martinez', 'An engineer who keeps the colony running')

    return NextResponse.json({
      success: true,
      message: 'Database seeded with sample stories and vote options',
      stories: [story1, story2]
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
