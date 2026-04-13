/**
 * validate-narration.mjs
 *
 * Validates a narration JSON file for completeness and correctness.
 * Usage: node scripts/validate-narration.mjs [chapter-number]
 * Default: chapter 1
 */

import { readFileSync } from "fs"
import { join } from "path"

const chapterNum = parseInt(process.argv[2] || "1", 10)
const filePath = join(
  process.cwd(),
  "public",
  "data",
  "narration",
  `chapter-${chapterNum}.json`
)

let data
try {
  data = JSON.parse(readFileSync(filePath, "utf-8"))
} catch (err) {
  console.error(`❌ Cannot read ${filePath}: ${err.message}`)
  process.exit(1)
}

const errors = []
const warnings = []

// ── 1. Structure checks ───────────────────────────────────────────────────────
if (!data.chapter) errors.push("Missing 'chapter' field")
if (!data.title) errors.push("Missing 'title' field")
if (!Array.isArray(data.acts) || data.acts.length === 0)
  errors.push("Missing or empty 'acts' array")
if (!Array.isArray(data.characters)) errors.push("Missing 'characters' array")
if (!data.voiceMap) errors.push("Missing 'voiceMap' object")

// ── 2. Segment-level checks ──────────────────────────────────────────────────
const allSegments = []
const idSet = new Set()
const speakerCounts = {}
const typeCounts = { narration: 0, dialogue: 0, verse: 0, inscription: 0, other: 0 }
let emptyTextCount = 0
let duplicateIds = 0

for (const act of data.acts || []) {
  if (!act.act || !act.title) warnings.push(`Act missing 'act' or 'title': ${JSON.stringify(act).slice(0, 80)}`)

  for (const seg of act.segments || []) {
    allSegments.push(seg)

    // Unique ID check
    if (idSet.has(seg.id)) {
      errors.push(`Duplicate segment ID: ${seg.id}`)
      duplicateIds++
    }
    idSet.add(seg.id)

    // ID format check
    if (!/^ch\d+-act\d+-seg\d{3,}$/.test(seg.id)) {
      warnings.push(`Non-standard ID format: ${seg.id}`)
    }

    // Type check
    if (["narration", "dialogue", "verse", "inscription"].includes(seg.type)) {
      typeCounts[seg.type]++
    } else {
      typeCounts.other++
      warnings.push(`Unknown segment type "${seg.type}" in ${seg.id}`)
    }

    // Speaker check
    if (!seg.speaker) {
      errors.push(`Missing speaker in ${seg.id}`)
    } else if (seg.speaker === "unknown") {
      warnings.push(`Unresolved speaker in ${seg.id}: "${seg.text?.slice(0, 50)}"`)
    } else if (seg.speaker === "null" || seg.speaker === null) {
      errors.push(`Null speaker in ${seg.id}`)
    }
    speakerCounts[seg.speaker] = (speakerCounts[seg.speaker] || 0) + 1

    // Empty text check
    if (!seg.text || seg.text.trim().length === 0) {
      errors.push(`Empty text in ${seg.id}`)
      emptyTextCount++
    }

    // Dialogue should not be narrator
    if (seg.type === "dialogue" && seg.speaker === "narrator") {
      warnings.push(`Dialogue segment attributed to narrator: ${seg.id}`)
    }

    // Narration should be narrator
    if (seg.type === "narration" && seg.speaker !== "narrator") {
      warnings.push(`Narration segment attributed to ${seg.speaker}: ${seg.id}`)
    }

    // paragraphIndex check
    if (seg.paragraphIndex === undefined || seg.paragraphIndex === null) {
      warnings.push(`Missing paragraphIndex in ${seg.id}`)
    }
  }
}

// ── 3. VoiceMap checks ────────────────────────────────────────────────────────
const allSpeakers = new Set(Object.keys(speakerCounts).filter((s) => s !== "narrator" && s !== "unknown"))
for (const speaker of allSpeakers) {
  if (!data.voiceMap?.[speaker] && speaker !== "unknown") {
    warnings.push(`Speaker "${speaker}" has no voiceMap entry`)
  }
}

// Characters in voiceMap but never speak
for (const char of Object.keys(data.voiceMap || {})) {
  if (char !== "narrator" && !allSpeakers.has(char)) {
    warnings.push(`VoiceMap entry "${char}" has no dialogue segments`)
  }
}

// ── 4. Coverage check ─────────────────────────────────────────────────────────
const totalSegments = allSegments.length
const dialogueRatio = typeCounts.dialogue / totalSegments
const narrationRatio = typeCounts.narration / totalSegments

// ── 5. Report ─────────────────────────────────────────────────────────────────
console.log(`\n${"═".repeat(60)}`)
console.log(`  NARRATION VALIDATION: Chapter ${data.chapter} — "${data.title}"`)
console.log(`${"═".repeat(60)}`)

console.log(`\n📊 Summary`)
console.log(`  Acts:            ${(data.acts || []).length}`)
console.log(`  Total segments:  ${totalSegments}`)
console.log(`  Narration:       ${typeCounts.narration} (${(narrationRatio * 100).toFixed(1)}%)`)
console.log(`  Dialogue:        ${typeCounts.dialogue} (${(dialogueRatio * 100).toFixed(1)}%)`)
console.log(`  Verse:           ${typeCounts.verse}`)
console.log(`  Inscription:     ${typeCounts.inscription}`)
if (typeCounts.other > 0) console.log(`  Other:           ${typeCounts.other}`)

console.log(`\n🎭 Speaker Breakdown`)
const sortedSpeakers = Object.entries(speakerCounts).sort((a, b) => b[1] - a[1])
for (const [speaker, count] of sortedSpeakers) {
  const pct = ((count / totalSegments) * 100).toFixed(1)
  const bar = "█".repeat(Math.round(count / 4))
  console.log(`  ${speaker.padEnd(12)} ${String(count).padStart(4)} (${pct.padStart(5)}%) ${bar}`)
}

console.log(`\n👥 Characters: ${(data.characters || []).join(", ")}`)

if (errors.length > 0) {
  console.log(`\n❌ ERRORS (${errors.length})`)
  for (const e of errors) console.log(`  • ${e}`)
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS (${warnings.length})`)
  for (const w of warnings) console.log(`  • ${w}`)
}

if (errors.length === 0 && warnings.length === 0) {
  console.log(`\n✅ ALL CHECKS PASSED`)
} else if (errors.length === 0) {
  console.log(`\n✅ No errors — ${warnings.length} warning(s) to review`)
} else {
  console.log(`\n❌ ${errors.length} error(s), ${warnings.length} warning(s)`)
}

console.log(`${"═".repeat(60)}\n`)

process.exit(errors.length > 0 ? 1 : 0)
