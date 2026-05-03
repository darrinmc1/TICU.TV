/**
 * Phase 3 content migration.
 *
 * Reads:
 *   - lib/serial-stories.ts          (the SERIAL_STORIES hardcoded object)
 *   - data/acts/<storyId>/<chapterSlug>/<sectionId>.txt  (prose overrides, if any)
 *
 * Writes (upserts) into Supabase:
 *   - content_stories
 *   - content_story_characters
 *   - content_chapters
 *   - content_chapter_sections
 *   - content_chapter_vote_options
 *
 * Idempotent — safe to re-run. Uses ON CONFLICT upserts so existing rows
 * are updated rather than duplicated.
 *
 * Usage from the project root:
 *   pnpm tsx scripts/migrate-content.ts
 *   pnpm tsx scripts/migrate-content.ts --dry-run    # report only, no writes
 *
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */

import { config as loadEnv } from "dotenv"
import { existsSync, readFileSync } from "fs"
import { join } from "path"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Load .env.local before anything else touches process.env.
loadEnv({ path: ".env.local" })

import { SERIAL_STORIES } from "../lib/serial-stories"

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const DRY_RUN = process.argv.includes("--dry-run")
const ACTS_DIR = join(process.cwd(), "data", "acts")

function getClient(): SupabaseClient {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set in .env.local")
    if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in .env.local")
    return createClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * If a prose override file exists at data/acts/<storyId>/<chapterSlug>/<sectionId>.txt,
 * return its content. Otherwise return null and the caller falls back to the
 * embedded `summary` from serial-stories.ts.
 *
 * Mirrors the read logic in lib/acts-content.ts so behaviour is identical
 * to what the live site has been doing.
 */
function readProseOverride(
    storyId: string,
    chapterSlug: string,
    sectionId: string
): string | null {
    const filePath = join(ACTS_DIR, storyId, chapterSlug, `${sectionId}.txt`)
    if (!existsSync(filePath)) return null
    const content = readFileSync(filePath, "utf-8").trim()
    return content || null
}

type Counts = {
    stories: number
    characters: number
    chapters: number
    sections: number
    voteOptions: number
    proseFromFile: number
    proseFromEmbed: number
}

function newCounts(): Counts {
    return {
        stories: 0,
        characters: 0,
        chapters: 0,
        sections: 0,
        voteOptions: 0,
        proseFromFile: 0,
        proseFromEmbed: 0,
    }
}

// -----------------------------------------------------------------------------
// Migration
// -----------------------------------------------------------------------------

async function migrate() {
    const supabase = getClient()
    const counts = newCounts()
    const startedAt = Date.now()

    const storyIds = Object.keys(SERIAL_STORIES)
    console.log(
        `\nFound ${storyIds.length} stories in serial-stories.ts:` +
            `\n  ${storyIds.join(", ")}\n`
    )
    console.log(DRY_RUN ? "DRY RUN — no writes will be made.\n" : "Writing to Supabase.\n")

    for (let storyIndex = 0; storyIndex < storyIds.length; storyIndex++) {
        const storyId = storyIds[storyIndex]
        const story = SERIAL_STORIES[storyId]

        console.log(`[${storyIndex + 1}/${storyIds.length}] ${storyId} — "${story.title}"`)

        // -------------------------------------------------------------------------
        // 1. Story row
        // -------------------------------------------------------------------------
        const storyRow = {
            id: story.id,
            title: story.title,
            genre: story.genre,
            genre_emoji: story.genreEmoji ?? null,
            hero_image: story.heroImage ?? null,
            status: story.status,
            votes: story.votes ?? 0,
            synopsis: story.synopsis ?? null,
            hook: story.hook ?? null,
            cover_gradient: story.coverGradient ?? null,
            accent_text_class: story.accentTextClass ?? null,
            ring_class: story.ringClass ?? null,
            display_order: storyIndex,
            updated_at: new Date().toISOString(),
        }

        if (!DRY_RUN) {
            const { error } = await supabase
                .from("content_stories")
                .upsert(storyRow, { onConflict: "id" })
            if (error) throw new Error(`content_stories upsert failed for ${storyId}: ${error.message}`)
        }
        counts.stories += 1

        // -------------------------------------------------------------------------
        // 2. Characters
        // -------------------------------------------------------------------------
        const characterRows = (story.characters ?? []).map((char, i) => ({
            story_id: story.id,
            name: char.name,
            role: char.role,
            emoji: char.emoji ?? null,
            gradient: char.gradient ?? null,
            bio: char.bio ?? null,
            image: char.image ?? null,
            display_order: i,
        }))

        if (characterRows.length > 0 && !DRY_RUN) {
            // Wipe then re-insert: simplest way to handle deletes/renames cleanly,
            // since story_id+name is the natural dedup key but characters may be
            // removed across runs.
            const { error: delErr } = await supabase
                .from("content_story_characters")
                .delete()
                .eq("story_id", story.id)
            if (delErr) throw new Error(`character delete failed for ${storyId}: ${delErr.message}`)

            const { error: insErr } = await supabase
                .from("content_story_characters")
                .insert(characterRows)
            if (insErr) throw new Error(`character insert failed for ${storyId}: ${insErr.message}`)
        }
        counts.characters += characterRows.length

        // -------------------------------------------------------------------------
        // 3. Chapters + sections + vote options
        // -------------------------------------------------------------------------
        for (let chapterIndex = 0; chapterIndex < story.chapters.length; chapterIndex++) {
            const chapter = story.chapters[chapterIndex]

            const chapterRow = {
                story_id: story.id,
                slug: chapter.slug,
                chapter_number: chapter.chapterNumber,
                title: chapter.title,
                label: chapter.label,
                short_description: chapter.shortDescription ?? null,
                opening: chapter.opening ?? null,
                status: chapter.status,
                vote_question: chapter.voteQuestion ?? null,
                vote_prompt: chapter.votePrompt ?? null,
                winning_option_id: chapter.winningOptionId ?? null,
                updated_at: new Date().toISOString(),
            }

            if (!DRY_RUN) {
                const { error } = await supabase
                    .from("content_chapters")
                    .upsert(chapterRow, { onConflict: "story_id,slug" })
                if (error)
                    throw new Error(
                        `content_chapters upsert failed for ${storyId}/${chapter.slug}: ${error.message}`
                    )
            }
            counts.chapters += 1

            // Sections (acts). Prose source: file override > embedded summary.
            const sectionRows = chapter.sections.map((section, i) => {
                const fromFile = readProseOverride(story.id, chapter.slug, section.id)
                const summary = fromFile ?? section.summary ?? null
                if (fromFile) counts.proseFromFile += 1
                else if (section.summary) counts.proseFromEmbed += 1

                return {
                    story_id: story.id,
                    chapter_slug: chapter.slug,
                    section_id: section.id,
                    title: section.title,
                    summary,
                    is_published: section.isPublished,
                    image_src: section.imageSrc ?? null,
                    image_caption: section.imageCaption ?? null,
                    image_reveal_after_paragraph: section.imageRevealAfterParagraph ?? null,
                    display_order: i,
                    updated_at: new Date().toISOString(),
                }
            })

            if (sectionRows.length > 0 && !DRY_RUN) {
                const { error } = await supabase
                    .from("content_chapter_sections")
                    .upsert(sectionRows, { onConflict: "story_id,chapter_slug,section_id" })
                if (error)
                    throw new Error(
                        `content_chapter_sections upsert failed for ${storyId}/${chapter.slug}: ${error.message}`
                    )
            }
            counts.sections += sectionRows.length

            // Vote options
            const optionRows = (chapter.voteOptions ?? []).map((opt, i) => ({
                story_id: story.id,
                chapter_slug: chapter.slug,
                option_id: opt.id,
                title: opt.title,
                description: opt.description ?? null,
                risk: opt.risk ?? null,
                vote_percent: opt.votePercent ?? null,
                display_order: i,
            }))

            if (optionRows.length > 0 && !DRY_RUN) {
                const { error } = await supabase
                    .from("content_chapter_vote_options")
                    .upsert(optionRows, { onConflict: "story_id,chapter_slug,option_id" })
                if (error)
                    throw new Error(
                        `content_chapter_vote_options upsert failed for ${storyId}/${chapter.slug}: ${error.message}`
                    )
            }
            counts.voteOptions += optionRows.length
        }
    }

    // -------------------------------------------------------------------------
    // Summary
    // -------------------------------------------------------------------------
    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1)
    console.log(`\n${DRY_RUN ? "DRY RUN " : ""}Migration complete in ${elapsed}s.`)
    console.log(`  stories:        ${counts.stories}`)
    console.log(`  characters:     ${counts.characters}`)
    console.log(`  chapters:       ${counts.chapters}`)
    console.log(`  sections:       ${counts.sections}`)
    console.log(`    from file:    ${counts.proseFromFile}`)
    console.log(`    from embed:   ${counts.proseFromEmbed}`)
    console.log(`  vote options:   ${counts.voteOptions}`)
    if (DRY_RUN) {
        console.log("\nNo writes performed. Re-run without --dry-run to apply.")
    } else {
        console.log("\nVerify in Supabase: select count(*) from content_stories;")
    }
}

migrate().catch((err) => {
    console.error("\nMigration failed:", err.message)
    process.exit(1)
})
