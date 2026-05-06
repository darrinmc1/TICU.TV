/**
 * parse-book.mjs
 *
 * Reads the Dragon's Last Breath book chapters from C:\Users\macca\Desktop\books,
 * splits them into acts based on "Act I:", "ACT I:", "Act I —" markers,
 * and writes each act as a separate .txt file into data/acts/dragons-last-breath/<chapter-slug>/act-N.txt
 *
 * Also outputs a JSON manifest of all chapters and their acts.
 *
 * Historical note: this script predates the Supabase content migration.
 * The manifest output was originally used to update lib/serial-stories.ts,
 * which has since been retired. The Supabase content_* tables are now the
 * source of truth, populated via the (also retired) scripts/migrate-content.ts.
 * If you re-run this for a new book ingest, you'll need to write the manifest
 * directly into Supabase rather than into serial-stories.ts.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs"
import { join } from "path"

const BOOKS_DIR = "C:/Users/macca/Desktop/books"
const ACTS_DIR = join(process.cwd(), "data", "acts", "dragons-last-breath")

// Chapter definitions: file -> metadata
const CHAPTERS = [
  { file: "Ch1_revised.txt", num: 1 },
  { file: "Ch2_revised.txt", num: 2 },
  { file: "Ch3_revised.txt", num: 3 },
  { file: "Ch4_revised.txt", num: 4 },
  { file: "Ch5_revised.txt", num: 5 },
  { file: "Ch6_revised.txt", num: 6 },
  { file: "Ch7_revised.txt", num: 7 },
  { file: "Ch8_revised.txt", num: 8 },
  { file: "Ch9_revised.txt", num: 9 },
  { file: "Ch10_road.txt", num: 10 },
  { file: "Ch11_boundary.txt", num: 11 },
  { file: "Epilogue.txt", num: 12 },
]

// Match act headers: "Act I:", "ACT I:", "Act I —", "ACT I —", etc.
const ACT_REGEX = /^(?:Act|ACT)\s+([IVXLC]+)[\s:—–-]+(.*)$/i
// Match epilogue section headers: "I.", "II.", "III."
const EPILOGUE_SECTION_REGEX = /^([IVXLC]+)\.\s*$/

function romanToInt(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100 }
  let result = 0
  const upper = roman.toUpperCase()
  for (let i = 0; i < upper.length; i++) {
    const current = map[upper[i]] || 0
    const next = map[upper[i + 1]] || 0
    result += current < next ? -current : current
  }
  return result
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function parseChapterTitle(content) {
  // Try multiple lines since some files have a blank first line
  const lines = content.split("\n").map((l) => l.trim()).filter((l) => l.length > 0)
  const firstLine = lines[0] || ""
  // Extract title from patterns like:
  //   CHAPTER 1: "THE DRAGON'S LAST BREATH"
  //   Chapter 4 Bonds and Burdens
  //   CHAPTER 6 — "STONE THAT BREATHES"
  const match = firstLine.match(/(?:chapter|CHAPTER)\s+\d+[\s:—–\-—]*["""\u201C\u201D]?(.+?)["""\u201C\u201D]?\s*$/i)
  if (match) {
    // Clean up encoding artifacts
    return match[1].replace(/[—–\u2014\u2013]/g, "").replace(/^\s+|\s+$/g, "").trim()
  }
  // Epilogue
  if (/epilogue/i.test(firstLine)) return "Epilogue"
  return firstLine
}

function parseActs(content, isEpilogue = false) {
  const lines = content.split("\n")
  const acts = []
  let currentAct = null

  const sectionNames = ["", "The Fall", "The Deep Stirs", "The Road North"]

  for (const line of lines) {
    const actMatch = line.trim().match(ACT_REGEX)
    const epilogueMatch = isEpilogue ? line.trim().match(EPILOGUE_SECTION_REGEX) : null

    if (actMatch) {
      if (currentAct) {
        acts.push(currentAct)
      }
      const actNum = romanToInt(actMatch[1])
      const actTitle = actMatch[2].trim()
      currentAct = {
        num: actNum,
        title: `Act ${actMatch[1].toUpperCase()}: ${actTitle}`,
        lines: [],
      }
      continue
    }

    if (epilogueMatch) {
      if (currentAct) {
        acts.push(currentAct)
      }
      const actNum = romanToInt(epilogueMatch[1])
      currentAct = {
        num: actNum,
        title: `Part ${epilogueMatch[1]}: ${sectionNames[actNum] || ""}`.trim(),
        lines: [],
      }
      continue
    }

    // Skip the chapter title line and blank lines before first act
    if (currentAct) {
      currentAct.lines.push(line)
    }
  }

  if (currentAct) {
    acts.push(currentAct)
  }

  // Trim leading/trailing blank lines from each act
  for (const act of acts) {
    const text = act.lines.join("\n").trim()
    act.content = text
    delete act.lines
  }

  return acts
}

const manifest = []

for (const chapter of CHAPTERS) {
  const filePath = join(BOOKS_DIR, chapter.file)
  if (!existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`)
    continue
  }

  const content = readFileSync(filePath, "utf-8")
  const chapterTitle = parseChapterTitle(content)
  const acts = parseActs(content, chapter.num === 12)

  // Build chapter slug
  let chapterSlug
  if (chapter.num === 12) {
    chapterSlug = "epilogue"
  } else {
    chapterSlug = `chapter-${chapter.num}-${slugify(chapterTitle)}`
  }

  const chapterDir = join(ACTS_DIR, chapterSlug)
  mkdirSync(chapterDir, { recursive: true })

  const actMeta = []
  for (const act of acts) {
    const actId = `act-${act.num}`
    const actFile = join(chapterDir, `${actId}.txt`)
    writeFileSync(actFile, act.content, "utf-8")
    actMeta.push({
      id: actId,
      title: act.title,
      contentLength: act.content.length,
      paragraphs: act.content.split("\n").filter((l) => l.trim().length > 0).length,
    })
    console.log(`  ✓ ${chapterSlug}/${actId}.txt (${act.content.length} chars, ${actMeta[actMeta.length - 1].paragraphs} paragraphs)`)
  }

  manifest.push({
    num: chapter.num,
    slug: chapterSlug,
    title: chapterTitle,
    acts: actMeta,
  })

  console.log(`Chapter ${chapter.num}: "${chapterTitle}" → ${acts.length} acts → ${chapterSlug}/`)
}

// Write manifest for reference
const manifestPath = join(ACTS_DIR, "_manifest.json")
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8")
console.log(`\nManifest written to ${manifestPath}`)
console.log(`\nTotal: ${manifest.length} chapters, ${manifest.reduce((s, c) => s + c.acts.length, 0)} acts`)
