/**
 * Phase 3b: Supabase-backed read layer for story content.
 *
 * Mirrors the API surface of lib/serial-stories.ts but every function
 * fetches from Supabase tables (content_stories, content_story_characters,
 * content_chapters, content_chapter_sections, content_chapter_vote_options)
 * instead of returning hardcoded data.
 *
 * Types are kept identical to lib/serial-stories.ts so existing consumer
 * code only needs to update import paths and add `await`. Type names are
 * re-exported from this file for that reason.
 *
 * Migration plan:
 *   - Phase 3b: build this file, migrate consumers one at a time.
 *   - Final cleanup: delete lib/serial-stories.ts once nothing imports it.
 *
 * The chapter page still overlays prose from data/acts/*.txt via
 * lib/acts-content.ts. That overlay is intentionally preserved for now;
 * retiring it is a separate phase that also rewrites the admin upload
 * route to write directly to Supabase.
 */

import { getServiceClient } from "./supabase"

// -----------------------------------------------------------------------------
// Types — kept identical to lib/serial-stories.ts so consumers only change
// the import path. Re-exported so consumers can do
//   import type { SerialStory } from "@/lib/content"
// -----------------------------------------------------------------------------

export type VoteOption = {
    id: string
    title: string
    description: string
    risk?: string
    votePercent?: number
}

export type StorySection = {
    id: string
    title: string
    summary: string
    isPublished: boolean
    imageSrc?: string
    imageCaption?: string
    imageRevealAfterParagraph?: number
}

export type StoryChapter = {
    slug: string
    chapterNumber: number
    title: string
    label: string
    shortDescription: string
    opening: string
    status: "published" | "voting" | "draft" | "complete"
    sections: StorySection[]
    voteQuestion?: string
    votePrompt?: string
    voteOptions?: VoteOption[]
    winningOptionId?: string
}

export type StoryCharacterProfile = {
    name: string
    role: string
    emoji: string
    gradient: string
    bio: string
    image?: string
}

export type SerialStory = {
    id: string
    title: string
    genre: string
    genreEmoji: string
    heroImage?: string
    status: "voting" | "new" | "in-progress" | "complete"
    votes: number
    synopsis: string
    hook: string
    coverGradient: string
    accentTextClass: string
    ringClass: string
    characters: StoryCharacterProfile[]
    chapters: StoryChapter[]
}

// -----------------------------------------------------------------------------
// Row types — what Supabase actually returns. snake_case, nullable columns.
// These are private to this module; consumers never see them.
// -----------------------------------------------------------------------------

type StoryRow = {
    id: string
    title: string
    genre: string
    genre_emoji: string | null
    hero_image: string | null
    status: SerialStory["status"]
    votes: number | null
    synopsis: string | null
    hook: string | null
    cover_gradient: string | null
    accent_text_class: string | null
    ring_class: string | null
    display_order: number | null
}

type CharacterRow = {
    story_id: string
    name: string
    role: string
    emoji: string | null
    gradient: string | null
    bio: string | null
    image: string | null
    display_order: number | null
}

type ChapterRow = {
    story_id: string
    slug: string
    chapter_number: number
    title: string
    label: string
    short_description: string | null
    opening: string | null
    status: StoryChapter["status"]
    vote_question: string | null
    vote_prompt: string | null
    winning_option_id: string | null
}

type SectionRow = {
    story_id: string
    chapter_slug: string
    section_id: string
    title: string
    summary: string | null
    is_published: boolean
    image_src: string | null
    image_caption: string | null
    image_reveal_after_paragraph: number | null
    display_order: number | null
}

type VoteOptionRow = {
    story_id: string
    chapter_slug: string
    option_id: string
    title: string
    description: string | null
    risk: string | null
    vote_percent: number | null
    display_order: number | null
}

// -----------------------------------------------------------------------------
// Row -> domain mappers. Centralised so the snake_case <-> camelCase
// translation lives in exactly one place.
// -----------------------------------------------------------------------------

function mapCharacter(row: CharacterRow): StoryCharacterProfile {
    return {
        name: row.name,
        role: row.role,
        emoji: row.emoji ?? "",
        gradient: row.gradient ?? "",
        bio: row.bio ?? "",
        image: row.image ?? undefined,
    }
}

function mapSection(row: SectionRow): StorySection {
    return {
        id: row.section_id,
        title: row.title,
        summary: row.summary ?? "",
        isPublished: row.is_published,
        imageSrc: row.image_src ?? undefined,
        imageCaption: row.image_caption ?? undefined,
        imageRevealAfterParagraph: row.image_reveal_after_paragraph ?? undefined,
    }
}

function mapVoteOption(row: VoteOptionRow): VoteOption {
    return {
        id: row.option_id,
        title: row.title,
        description: row.description ?? "",
        risk: row.risk ?? undefined,
        votePercent: row.vote_percent ?? undefined,
    }
}

function mapChapter(
    row: ChapterRow,
    sections: StorySection[],
    voteOptions: VoteOption[]
): StoryChapter {
    return {
        slug: row.slug,
        chapterNumber: row.chapter_number,
        title: row.title,
        label: row.label,
        shortDescription: row.short_description ?? "",
        opening: row.opening ?? "",
        status: row.status,
        sections,
        voteQuestion: row.vote_question ?? undefined,
        votePrompt: row.vote_prompt ?? undefined,
        voteOptions: voteOptions.length > 0 ? voteOptions : undefined,
        winningOptionId: row.winning_option_id ?? undefined,
    }
}

function mapStory(
    row: StoryRow,
    characters: StoryCharacterProfile[],
    chapters: StoryChapter[]
): SerialStory {
    return {
        id: row.id,
        title: row.title,
        genre: row.genre,
        genreEmoji: row.genre_emoji ?? "",
        heroImage: row.hero_image ?? undefined,
        status: row.status,
        votes: row.votes ?? 0,
        synopsis: row.synopsis ?? "",
        hook: row.hook ?? "",
        coverGradient: row.cover_gradient ?? "",
        accentTextClass: row.accent_text_class ?? "",
        ringClass: row.ring_class ?? "",
        characters,
        chapters,
    }
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Fetch a single story by id, including its characters, chapters, sections,
 * and vote options. Returns null if not found.
 *
 * Performs five parallel queries (one per table) scoped to this story id,
 * then assembles the nested SerialStory shape in memory.
 */
export async function getStory(storyId: string): Promise<SerialStory | null> {
    const supabase = getServiceClient()

    const [storyRes, charsRes, chaptersRes, sectionsRes, optionsRes] = await Promise.all([
        supabase.from("content_stories").select("*").eq("id", storyId).maybeSingle(),
        supabase
            .from("content_story_characters")
            .select("*")
            .eq("story_id", storyId)
            .order("display_order", { ascending: true }),
        supabase
            .from("content_chapters")
            .select("*")
            .eq("story_id", storyId)
            .order("chapter_number", { ascending: true }),
        supabase
            .from("content_chapter_sections")
            .select("*")
            .eq("story_id", storyId)
            .order("display_order", { ascending: true }),
        supabase
            .from("content_chapter_vote_options")
            .select("*")
            .eq("story_id", storyId)
            .order("display_order", { ascending: true }),
    ])

    if (storyRes.error) throw new Error(`getStory(${storyId}): ${storyRes.error.message}`)
    if (!storyRes.data) return null
    if (charsRes.error) throw new Error(`getStory(${storyId}) characters: ${charsRes.error.message}`)
    if (chaptersRes.error) throw new Error(`getStory(${storyId}) chapters: ${chaptersRes.error.message}`)
    if (sectionsRes.error) throw new Error(`getStory(${storyId}) sections: ${sectionsRes.error.message}`)
    if (optionsRes.error) throw new Error(`getStory(${storyId}) vote options: ${optionsRes.error.message}`)

    const characters = (charsRes.data as CharacterRow[]).map(mapCharacter)

    // Group sections and vote options by chapter_slug for efficient lookup.
    const sectionsByChapter = new Map<string, StorySection[]>()
    for (const row of sectionsRes.data as SectionRow[]) {
        const existing = sectionsByChapter.get(row.chapter_slug) ?? []
        existing.push(mapSection(row))
        sectionsByChapter.set(row.chapter_slug, existing)
    }

    const optionsByChapter = new Map<string, VoteOption[]>()
    for (const row of optionsRes.data as VoteOptionRow[]) {
        const existing = optionsByChapter.get(row.chapter_slug) ?? []
        existing.push(mapVoteOption(row))
        optionsByChapter.set(row.chapter_slug, existing)
    }

    const chapters = (chaptersRes.data as ChapterRow[]).map((chapterRow) =>
        mapChapter(
            chapterRow,
            sectionsByChapter.get(chapterRow.slug) ?? [],
            optionsByChapter.get(chapterRow.slug) ?? []
        )
    )

    return mapStory(storyRes.data as StoryRow, characters, chapters)
}

/**
 * Fetch a single chapter by story id and chapter slug, fully populated with
 * its sections and vote options. Returns null if not found.
 *
 * This is a convenience for consumers that only need one chapter, not the
 * whole story (e.g. the chapter vote API route validating an option_id).
 */
export async function getChapter(
    storyId: string,
    chapterSlug: string
): Promise<StoryChapter | null> {
    const supabase = getServiceClient()

    const [chapterRes, sectionsRes, optionsRes] = await Promise.all([
        supabase
            .from("content_chapters")
            .select("*")
            .eq("story_id", storyId)
            .eq("slug", chapterSlug)
            .maybeSingle(),
        supabase
            .from("content_chapter_sections")
            .select("*")
            .eq("story_id", storyId)
            .eq("chapter_slug", chapterSlug)
            .order("display_order", { ascending: true }),
        supabase
            .from("content_chapter_vote_options")
            .select("*")
            .eq("story_id", storyId)
            .eq("chapter_slug", chapterSlug)
            .order("display_order", { ascending: true }),
    ])

    if (chapterRes.error)
        throw new Error(`getChapter(${storyId}, ${chapterSlug}): ${chapterRes.error.message}`)
    if (!chapterRes.data) return null
    if (sectionsRes.error)
        throw new Error(
            `getChapter(${storyId}, ${chapterSlug}) sections: ${sectionsRes.error.message}`
        )
    if (optionsRes.error)
        throw new Error(
            `getChapter(${storyId}, ${chapterSlug}) vote options: ${optionsRes.error.message}`
        )

    const sections = (sectionsRes.data as SectionRow[]).map(mapSection)
    const options = (optionsRes.data as VoteOptionRow[]).map(mapVoteOption)

    return mapChapter(chapterRes.data as ChapterRow, sections, options)
}

/**
 * Fetch every story, fully populated, keyed by story id.
 *
 * Replaces the SERIAL_STORIES constant from lib/serial-stories.ts. Used by
 * the leaderboard, the admin acts index, and the tally-votes script — all
 * of which need to enumerate every chapter.
 *
 * Performs one query per table (five queries total, in parallel) and
 * assembles the result in memory. Cheaper than fetching N stories one at
 * a time when callers want all of them.
 */
export async function getAllStories(): Promise<Record<string, SerialStory>> {
    const supabase = getServiceClient()

    const [storiesRes, charsRes, chaptersRes, sectionsRes, optionsRes] = await Promise.all([
        supabase
            .from("content_stories")
            .select("*")
            .order("display_order", { ascending: true }),
        supabase
            .from("content_story_characters")
            .select("*")
            .order("display_order", { ascending: true }),
        supabase
            .from("content_chapters")
            .select("*")
            .order("chapter_number", { ascending: true }),
        supabase
            .from("content_chapter_sections")
            .select("*")
            .order("display_order", { ascending: true }),
        supabase
            .from("content_chapter_vote_options")
            .select("*")
            .order("display_order", { ascending: true }),
    ])

    if (storiesRes.error) throw new Error(`getAllStories: ${storiesRes.error.message}`)
    if (charsRes.error) throw new Error(`getAllStories characters: ${charsRes.error.message}`)
    if (chaptersRes.error) throw new Error(`getAllStories chapters: ${chaptersRes.error.message}`)
    if (sectionsRes.error) throw new Error(`getAllStories sections: ${sectionsRes.error.message}`)
    if (optionsRes.error)
        throw new Error(`getAllStories vote options: ${optionsRes.error.message}`)

    // Group everything by story_id (and chapter_slug where appropriate) up
    // front, so the assembly loop below is a series of cheap map lookups
    // instead of repeated array filters.
    const charsByStory = new Map<string, StoryCharacterProfile[]>()
    for (const row of charsRes.data as CharacterRow[]) {
        const existing = charsByStory.get(row.story_id) ?? []
        existing.push(mapCharacter(row))
        charsByStory.set(row.story_id, existing)
    }

    const sectionsByStoryChapter = new Map<string, StorySection[]>()
    for (const row of sectionsRes.data as SectionRow[]) {
        const key = `${row.story_id}::${row.chapter_slug}`
        const existing = sectionsByStoryChapter.get(key) ?? []
        existing.push(mapSection(row))
        sectionsByStoryChapter.set(key, existing)
    }

    const optionsByStoryChapter = new Map<string, VoteOption[]>()
    for (const row of optionsRes.data as VoteOptionRow[]) {
        const key = `${row.story_id}::${row.chapter_slug}`
        const existing = optionsByStoryChapter.get(key) ?? []
        existing.push(mapVoteOption(row))
        optionsByStoryChapter.set(key, existing)
    }

    const chaptersByStory = new Map<string, StoryChapter[]>()
    for (const row of chaptersRes.data as ChapterRow[]) {
        const key = `${row.story_id}::${row.slug}`
        const chapter = mapChapter(
            row,
            sectionsByStoryChapter.get(key) ?? [],
            optionsByStoryChapter.get(key) ?? []
        )
        const existing = chaptersByStory.get(row.story_id) ?? []
        existing.push(chapter)
        chaptersByStory.set(row.story_id, existing)
    }

    const result: Record<string, SerialStory> = {}
    for (const row of storiesRes.data as StoryRow[]) {
        result[row.id] = mapStory(
            row,
            charsByStory.get(row.id) ?? [],
            chaptersByStory.get(row.id) ?? []
        )
    }

    return result
}
