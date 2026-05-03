// Storage backend for per-chapter votes. Replaces the local-filesystem
// JSON files used previously. All persistence goes through the Supabase
// service-role client so we bypass RLS — same pattern as the seed route.
//
// Public API (signatures unchanged from the JSON-file version):
//   castChapterVote(storyId, chapterSlug, userId, optionId)
//   resetChapterVotes(storyId, chapterSlug)
//   getChapterVoteSummary(storyId, chapterSlug, optionIds, userId?)

import { getServiceClient } from "./supabase"

export type ChapterVoteSummary = {
  counts: Record<string, number>
  totalVotes: number
  winningOptionId: string | null
  userVote: string | null
}

/**
 * Cast or change a vote. UPSERTs on (story_id, chapter_slug, user_id) —
 * if the user already voted, their option_id is overwritten. This mirrors
 * the JSON-file behaviour `data.votes[userId] = optionId`.
 */
export async function castChapterVote(
  storyId: string,
  chapterSlug: string,
  userId: string,
  optionId: string
): Promise<void> {
  const supabase = getServiceClient()
  const { error } = await supabase
    .from("chapter_votes")
    .upsert(
      {
        story_id: storyId,
        chapter_slug: chapterSlug,
        user_id: userId,
        option_id: optionId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "story_id,chapter_slug,user_id" }
    )
  if (error) {
    throw new Error(`castChapterVote failed: ${error.message}`)
  }
}

/**
 * Wipe all votes for a chapter. Used by the admin reset route.
 */
export async function resetChapterVotes(
  storyId: string,
  chapterSlug: string
): Promise<void> {
  const supabase = getServiceClient()
  const { error } = await supabase
    .from("chapter_votes")
    .delete()
    .eq("story_id", storyId)
    .eq("chapter_slug", chapterSlug)
  if (error) {
    throw new Error(`resetChapterVotes failed: ${error.message}`)
  }
}

/**
 * Read all votes for a chapter and produce a summary: per-option counts,
 * total, winner (or null on tie/empty), and the requesting user's
 * current vote (or null).
 *
 * `optionIds` is the list of valid option IDs for this chapter — used so
 * unknown option_ids in the database (e.g. left over from a deleted
 * option) don't get counted, and so options with zero votes still show
 * up in `counts` with a value of 0.
 */
export async function getChapterVoteSummary(
  storyId: string,
  chapterSlug: string,
  optionIds: string[],
  userId?: string
): Promise<ChapterVoteSummary> {
  const supabase = getServiceClient()
  const { data, error } = await supabase
    .from("chapter_votes")
    .select("user_id, option_id")
    .eq("story_id", storyId)
    .eq("chapter_slug", chapterSlug)

  if (error) {
    throw new Error(`getChapterVoteSummary failed: ${error.message}`)
  }

  const counts: Record<string, number> = Object.fromEntries(
    optionIds.map((id) => [id, 0])
  )

  let userVote: string | null = null

  for (const row of data ?? []) {
    const optionId = row.option_id as string
    if (optionId in counts) {
      counts[optionId] += 1
    }
    if (userId && row.user_id === userId) {
      userVote = optionId
    }
  }

  const totalVotes = Object.values(counts).reduce((sum, v) => sum + v, 0)

  // Winner: option with highest count. Ties resolve to the first option
  // in optionIds order — same as the JSON-file version.
  const winningOptionId = optionIds.reduce<string | null>((winner, optionId) => {
    if (!winner) return optionId
    return counts[optionId] > counts[winner] ? optionId : winner
  }, null)

  return {
    counts,
    totalVotes,
    winningOptionId: totalVotes > 0 ? winningOptionId : null,
    userVote,
  }
}
