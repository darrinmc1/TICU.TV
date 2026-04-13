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

// ── Per-act audio types ─────────────────────────────────────────────────────

/** One act entry from the chapter manifest JSON */
export type ActManifestEntry = {
  act: number
  actTitle: string
  audioFile: string
  timingFile: string
  totalDuration: number
  segmentCount: number
}

/** Chapter-level manifest listing all acts */
export type ChapterAudioManifest = {
  chapter: number
  title: string
  acts: ActManifestEntry[]
  totalDuration: number
}

/** Timing segment within a per-act timing JSON (timestamps are act-relative) */
export type ActTimingSegment = {
  id: string
  start: number
  end: number
  speaker: string
  type: string
  text: string
}

/** Per-act timing JSON file structure */
export type ActTimingData = {
  chapter: number
  act: number
  actTitle: string
  audioFile: string
  totalDuration: number
  segments: ActTimingSegment[]
}

/** Resolved act entry ready for the narration hook */
export type ActAudioEntry = {
  act: number
  actTitle: string
  audioUrl: string
  timingSegments: ActTimingSegment[]
  totalDuration: number
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
