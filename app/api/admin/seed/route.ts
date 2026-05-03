import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

// Shared-secret guard. Replace with real admin auth in Milestone 4.
function isAuthorized(req: NextRequest): boolean {
    const provided = req.headers.get('x-admin-secret')
    const expected = process.env.ADMIN_SECRET
    if (!expected) return false
    return provided === expected
}

export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json(
            { status: 'error', error: 'unauthorized' },
            { status: 401 }
        )
    }

    const supabase = getServiceClient()

    try {
        // 1. Upsert the Mars Colony Crisis story
        const { data: story, error: storyError } = await supabase
            .from('stories')
            .upsert(
                {
                    slug: 'mars-colony',
                    title: 'Mars Colony Crisis',
                    genre: 'Sci-Fi',
                    description:
                        'A mysterious signal from Mars threatens the colony. Your choices will determine humanity\'s fate.',
                    status: 'voting',
                },
                { onConflict: 'slug' }
            )
            .select()
            .single()

        if (storyError) throw storyError

        // 2. Upsert Chapter 1
        const { data: chapter, error: chapterError } = await supabase
            .from('chapters')
            .upsert(
                {
                    story_id: story.id,
                    chapter_number: 1,
                    title: 'Signal from the Deep',
                    body:
                        'The call came at 0300, which Aria Chen had always privately believed was the universe\'s preferred hour for everything that couldn\'t wait.',
                    status: 'voting',
                    voting_opens_at: new Date().toISOString(),
                    voting_closes_at: new Date(
                        Date.now() + 7 * 24 * 60 * 60 * 1000
                    ).toISOString(), // 7 days from now
                },
                { onConflict: 'story_id,chapter_number' }
            )
            .select()
            .single()

        if (chapterError) throw chapterError

        // 3. Wipe existing options for this chapter, then insert fresh ones.
        //    Makes the seed re-runnable without duplicating options.
        const { error: deleteError } = await supabase
            .from('vote_options')
            .delete()
            .eq('chapter_id', chapter.id)

        if (deleteError) throw deleteError

        const options = [
            {
                chapter_id: chapter.id,
                option_label: 'A',
                option_title: 'Send a survey team to the drill site',
                option_body:
                    'Assemble a small team to investigate the contact point directly—drill cameras, sample extraction, seismic mapping of the immediate area. Gather data before making any decisions.',
                consequence_note:
                    'If the contact responds to physical investigation differently than it responded to the drill, the team is in an unknown situation with limited resources.',
                display_order: 1,
            },
            {
                chapter_id: chapter.id,
                option_label: 'B',
                option_title: 'Transmit a response signal',
                option_body:
                    'Use Rael\'s comm array to broadcast on the same frequency, mirroring the pattern from below. If something is signaling, signal back. Establish contact before anyone decides what to do about it.',
                consequence_note:
                    'Transmitting acknowledges that the colony has received and understood the signal. Whatever that implies about what comes next, it cannot be undone.',
                display_order: 2,
            },
            {
                chapter_id: chapter.id,
                option_label: 'C',
                option_title: 'Lock down and run full diagnostics',
                option_body:
                    'Secure the drill array, pull the signal data, and spend the pre-dawn hours verifying every possible equipment or natural explanation before treating this as something it might not be.',
                consequence_note:
                    'The signal has been transmitting for six days. Whatever is waiting below has been waiting longer. But moving carefully now may prevent a much more serious mistake later.',
                display_order: 3,
            },
        ]

        const { error: optionsError } = await supabase
            .from('vote_options')
            .insert(options)

        if (optionsError) throw optionsError

        return NextResponse.json({
            status: 'ok',
            story_id: story.id,
            chapter_id: chapter.id,
            options_inserted: options.length,
        })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'unknown error'
        return NextResponse.json(
            { status: 'error', error: message },
            { status: 500 }
        )
    }
}