/**
 * Types and loader for narration segment JSON files.
 * Files live in public/data/narration/chapter-{N}.json
 */

export type NarrationSegment = {
  id: string
  type: "narration" | "dialogue" | "verse" | "inscription"
  speaker: string
  text: string
  paragraphIndex: number
}

export type NarrationAct = {
  act: number
  title: string
  segments: NarrationSegment[]
}

export type VoiceProfile = {
  label: string
  gender: string
  age?: string
  style: string
  ttsVoice: string | null
}

export type NarrationChapterData = {
  chapter: number
  title: string
  acts: NarrationAct[]
  characters: string[]
  voiceMap: Record<string, VoiceProfile>
}

/**
 * Load narration data for a chapter from the public data directory.
 * Returns null if the file doesn't exist.
 * Used server-side only (reads from filesystem).
 */
export function loadNarrationData(
  chapterNumber: number
): NarrationChapterData | null {
  try {
    const fs = require("fs")
    const path = require("path")
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "narration",
      `chapter-${chapterNumber}.json`
    )
    const raw = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(raw) as NarrationChapterData
  } catch {
    return null
  }
}

/**
 * Flatten all segments from all acts into a single ordered array.
 */
export function flattenSegments(
  data: NarrationChapterData
): NarrationSegment[] {
  return data.acts.flatMap((act) => act.segments)
}
