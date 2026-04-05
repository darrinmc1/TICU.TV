import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

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

const STATE_DIR = join(process.cwd(), "data", "story-state")

function ensureStateDir() {
  if (!existsSync(STATE_DIR)) {
    mkdirSync(STATE_DIR, { recursive: true })
  }
}

function getStateFilePath(storyId: string) {
  return join(STATE_DIR, `${storyId}.json`)
}

export function getStoryState(storyId: string): StoryStateFile | null {
  ensureStateDir()
  const filePath = getStateFilePath(storyId)
  if (!existsSync(filePath)) return null
  try {
    const raw = readFileSync(filePath, "utf-8")
    const parsed = JSON.parse(raw) as StoryStateFile
    if (!parsed || typeof parsed !== "object") return null
    return parsed
  } catch {
    return null
  }
}

export function saveStoryState(state: StoryStateFile): void {
  ensureStateDir()
  const filePath = getStateFilePath(state.storyId)
  writeFileSync(filePath, JSON.stringify(state, null, 2), "utf-8")
}

export function initStoryState(storyId: string, firstChapterSlug: string): StoryStateFile {
  const existing = getStoryState(storyId)
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
  saveStoryState(state)
  return state
}

export function getChapterStateEntry(
  storyId: string,
  chapterSlug: string
): ChapterStateEntry | null {
  const state = getStoryState(storyId)
  if (!state) return null
  return state.chapters[chapterSlug] ?? null
}

export function getAllStoryStates(): StoryStateFile[] {
  ensureStateDir()
  if (!existsSync(STATE_DIR)) return []
  try {
    const { readdirSync } = require("fs") as typeof import("fs")
    const files = readdirSync(STATE_DIR).filter((f: string) => f.endsWith(".json"))
    return files
      .map((f: string) => {
        try {
          const raw = readFileSync(join(STATE_DIR, f), "utf-8")
          return JSON.parse(raw) as StoryStateFile
        } catch {
          return null
        }
      })
      .filter(Boolean) as StoryStateFile[]
  } catch {
    return []
  }
}
