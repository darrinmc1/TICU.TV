// Server-only — do NOT import from client components.
// Reads and writes act prose files from data/acts/<storyId>/<chapterSlug>/<sectionId>.txt

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs"
import { join } from "path"

const ACTS_DIR = join(process.cwd(), "data", "acts")

export function getActContent(
  storyId: string,
  chapterSlug: string,
  sectionId: string
): string | null {
  const filePath = join(ACTS_DIR, storyId, chapterSlug, `${sectionId}.txt`)
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, "utf-8").trim()
    return content || null
  }
  return null
}

export function saveActContent(
  storyId: string,
  chapterSlug: string,
  sectionId: string,
  content: string
): void {
  const dir = join(ACTS_DIR, storyId, chapterSlug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${sectionId}.txt`), content, "utf-8")
}
