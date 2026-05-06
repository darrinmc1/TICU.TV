import { NextResponse } from "next/server"
import { getChapter } from "@/lib/content"
import { castChapterVote, getChapterVoteSummary } from "@/lib/chapter-votes"
import { checkAndConsumeChapterVoteRateLimit } from "@/lib/chapter-vote-rate-limit"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

/**
 * Resolve the authenticated user's ID from the Supabase session cookie.
 * Returns the user's UUID, or null if no session is present.
 *
 * The userId is intentionally NOT accepted from the request body or query
 * string. Trusting client-supplied IDs would let anyone vote as anyone else.
 */
async function getAuthenticatedUserId(): Promise<string | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) return null
  return data.user.id
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const storyId = searchParams.get("storyId")
    const chapterSlug = searchParams.get("chapterSlug")

    if (!storyId || !chapterSlug) {
      return NextResponse.json({ error: "Missing storyId or chapterSlug" }, { status: 400 })
    }

    const chapter = await getChapter(storyId, chapterSlug)
    if (!chapter || !chapter.voteOptions?.length) {
      return NextResponse.json({ error: "Chapter voting options not found" }, { status: 404 })
    }

    // Anyone — signed in or not — can read the tally. Only the userVote
    // field is gated on having a session; signed-out viewers see null.
    const userId = (await getAuthenticatedUserId()) ?? undefined

    const optionIds = chapter.voteOptions.map((option) => option.id)
    const summary = await getChapterVoteSummary(storyId, chapterSlug, optionIds, userId)

    const results = chapter.voteOptions.map((option) => {
      const count = summary.counts[option.id] ?? 0
      const votePercent = summary.totalVotes > 0 ? Math.round((count / summary.totalVotes) * 100) : null
      return {
        id: option.id,
        title: option.title,
        voteCount: count,
        votePercent,
      }
    })

    return NextResponse.json({
      results,
      totalVotes: summary.totalVotes,
      winningOptionId: summary.winningOptionId,
      userVote: summary.userVote,
    })
  } catch (error) {
    console.error("Failed to load chapter votes:", error)
    return NextResponse.json({ error: "Failed to load chapter votes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Identity comes from the session cookie — never the request body.
    const userId = await getAuthenticatedUserId()
    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to vote." },
        { status: 401 }
      )
    }

    const body = await request.json()
    const storyId = body?.storyId as string | undefined
    const chapterSlug = body?.chapterSlug as string | undefined
    const optionId = body?.optionId as string | undefined

    if (!storyId || !chapterSlug || !optionId) {
      return NextResponse.json(
        { error: "Missing required fields: storyId, chapterSlug, optionId" },
        { status: 400 }
      )
    }

    const rateLimit = checkAndConsumeChapterVoteRateLimit(storyId, chapterSlug, userId)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many vote requests. Please wait before trying again.",
          retryAfterMs: rateLimit.retryAfterMs,
        },
        { status: 429 }
      )
    }

    const chapter = await getChapter(storyId, chapterSlug)
    if (!chapter || !chapter.voteOptions?.length) {
      return NextResponse.json({ error: "Chapter voting options not found" }, { status: 404 })
    }

    const isOptionValid = chapter.voteOptions.some((option) => option.id === optionId)
    if (!isOptionValid) {
      return NextResponse.json({ error: "Option does not belong to this chapter" }, { status: 400 })
    }

    await castChapterVote(storyId, chapterSlug, userId, optionId)

    const summary = await getChapterVoteSummary(
      storyId,
      chapterSlug,
      chapter.voteOptions.map((option) => option.id),
      userId
    )

    return NextResponse.json({ success: true, summary })
  } catch (error) {
    console.error("Failed to cast chapter vote:", error)
    return NextResponse.json({ error: "Failed to cast chapter vote" }, { status: 500 })
  }
}