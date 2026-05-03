// Storage backend for story state — which chapter is active for voting,
// per-chapter tally status, and history of past tallies. Replaces the
// local-filesystem JSON files in data/story-state/.
//
// The whole state object is stored as a single jsonb blob keyed by
// story_id. This keeps the rewrite surgical: consumers still get/set
// the same StoryStateFile shape they always did, just from Postgres
// instead of disk.
//
// Public API (signatures unchanged from the JSON-file version):
//   getStoryState(storyId): Promise<StoryStateFile | null>
//   saveStoryState(state): Promise<void>
//   initStoryState(storyId, firstChapterSlug): Promise<StoryStateFile>
//   getChapterStateEntry(storyId, chapterSlug): Promise<ChapterStateEntry | null>
//   getAllStoryStates(): Promise<StoryStateFile[]>

import { getServiceClient } from "./supabase"

export type ChapterTallyRecord = {
  runAt: string
  chapterSlug: string
  result: "winner" | "no-votes"
  winningOptionId?: string
  totalVotes: number
  weeksWithoutVotes?: number
}

export type ChapterStateEntry = {
  status: "voting" | "tallied" | "locked"
  winningOptionId?: string
  totalVotes?: number
  tallyDate?: string
  weeksWithoutVotes?: number
}

export type StoryStateFile = {
  storyId: string
  activeChapterSlug: string | null
  chapters: Record<string, ChapterStateEntry>
  tallyHistory: ChapterTallyRecord[]
  updatedAt: string
}

/**
 * Read the state for one story. Returns null if no row exists.
 */
export async function getStoryState(storyId: string): Promise<StoryStateFile | null> {
  const supabase = getServiceClient()
  const { data, error } = await supabase
    .from("story_state")
    .select("data")
    .eq("story_id", storyId)
    .maybeSingle()

  if (error) {
    throw new Error(`getStoryState failed: ${error.message}`)
  }
  if (!data) return null

  // The jsonb column may be returned as object or as string depending on
  // the driver — guard against both.
  const blob = typeof data.data === "string" ? JSON.parse(data.data) : data.data
  if (!blob || typeof blob !== "object") return null

  return blob as StoryStateFile
}

/**
 * Upsert the state for one story. The whole object replaces what's there.
 */
export async function saveStoryState(state: StoryStateFile): Promise<void> {
  const supabase = getServiceClient()
  const { error } = await supabase
    .from("story_state")
    .upsert(
      {
        story_id: state.storyId,
        data: state,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "story_id" }
    )
  if (error) {
    throw new Error(`saveStoryState failed: ${error.message}`)
  }
}

/**
 * Read state if it exists, otherwise create and return a fresh state
 * with the given chapter set as the active voting chapter.
 */
export async function initStoryState(
  storyId: string,
  firstChapterSlug: string
): Promise<StoryStateFile> {
  const existing = await getStoryState(storyId)
  if (existing) return existing

  const state: StoryStateFile = {
    storyId,
    activeChapterSlug: firstChapterSlug,
    chapters: {
      [firstChapterSlug]: { status: "voting" },
    },
    tallyHistory: [],
    updatedAt: new Date().toISOString(),
  }
  await saveStoryState(state)
  return state
}

/**
 * Convenience reader for a single chapter's entry within a story's state.
 */
export async function getChapterStateEntry(
  storyId: string,
  chapterSlug: string
): Promise<ChapterStateEntry | null> {
  const state = await getStoryState(storyId)
  if (!state) return null
  return state.chapters[chapterSlug] ?? null
}

/**
 * Read every story's state. Used for the admin overview / tally summary.
 */
export async function getAllStoryStates(): Promise<StoryStateFile[]> {
  const supabase = getServiceClient()
  const { data, error } = await supabase
    .from("story_state")
    .select("data")

  if (error) {
    throw new Error(`getAllStoryStates failed: ${error.message}`)
  }

  return (data ?? [])
    .map((row) => {
      const blob = typeof row.data === "string" ? JSON.parse(row.data) : row.data
      return blob as StoryStateFile | null
    })
    .filter((blob): blob is StoryStateFile => Boolean(blob && typeof blob === "object"))
}
