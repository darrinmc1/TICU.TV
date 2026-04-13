/**
 * generate-narration-ch1.mjs
 *
 * Reads Ch1_revised.txt, splits into acts, then segments each paragraph
 * into narration vs dialogue chunks with speaker attribution.
 * Outputs public/data/narration/chapter-1.json
 */

import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

const BOOKS_DIR = "C:/Users/macca/Desktop/books"
const OUT_DIR = join(process.cwd(), "public", "data", "narration")

// ── Voice profiles (only characters who appear in Ch1) ──────────────────────
const VOICE_MAP = {
  narrator: {
    label: "Narrator",
    gender: "male",
    style: "deep, cinematic, epic fantasy tone, measured pace, rich and resonant",
    ttsVoice: null,
  },
  caelin: {
    label: "Caelin",
    gender: "male",
    age: "mid-20s",
    style: "earnest, slightly rough, determined, grows more confident over the story",
    ttsVoice: null,
  },
  mira: {
    label: "Mira",
    gender: "female",
    age: "8 years old",
    style: "small, frightened then brave, thin earnest voice",
    ttsVoice: null,
  },
  gareth: {
    label: "Elder Gareth",
    gender: "male",
    age: "elderly",
    style: "rasping, grief-worn, steady authority, thick with smoke",
    ttsVoice: null,
  },
  vharisax: {
    label: "Vharisax",
    gender: "female",
    age: "ancient",
    style: "ancient, resonant, telepathic feel, vast and weary, echoing quality",
    ttsVoice: null,
  },
  vex: {
    label: "Vex (Virella Sunshadow)",
    gender: "female",
    age: "late 20s",
    style: "quick-witted, sardonic, dry humor, sharp and fast delivery",
    ttsVoice: null,
  },
  scale: {
    label: "The Scale",
    gender: "neutral",
    style: "not a voice — describe as sensation/impression, brief, urgent or warm",
    ttsVoice: null,
  },
}

// ── Act header regex ────────────────────────────────────────────────────────
const ACT_RE = /^(?:Act|ACT)\s+([IVXLC]+)[\s:—–\-]+(.*)$/i

function romanToInt(r) {
  const m = { I: 1, V: 5, X: 10, L: 50, C: 100 }
  let v = 0
  const u = r.toUpperCase()
  for (let i = 0; i < u.length; i++) {
    const c = m[u[i]] || 0
    const n = m[u[i + 1]] || 0
    v += c < n ? -c : c
  }
  return v
}

// ── Quote extraction ────────────────────────────────────────────────────────
// Matches text inside straight or smart quotes
// Returns array of { start, end, text } for each quoted span
function findQuotedSpans(text) {
  const spans = []
  // Match both straight and smart quotes
  const re = /["\u201C]([^"\u201D]*?)["\u201D]/g
  let m
  while ((m = re.exec(text)) !== null) {
    spans.push({
      start: m.index,
      end: m.index + m[0].length,
      fullMatch: m[0],
      innerText: m[1],
    })
  }
  return spans
}

// ── Speaker attribution ─────────────────────────────────────────────────────
// Context: { lastSpeaker, lastNamedCharacter, actNum, paragraphText }
const SPEECH_VERBS =
  "said|asked|whispered|murmured|called|hissed|rasped|growled|shouted|replied|answered|observed|continued|added|muttered|breathed|snapped|demanded|offered|suggested|warned|noted|told|began|finished|started|insisted|corrected|managed|gasped"

const KNOWN_NAMES = {
  caelin: "caelin",
  mira: "mira",
  gareth: "gareth",
  vharisax: "vharisax",
  vex: "vex",
  virella: "vex",
}

// Pronoun-to-gender for context resolution
const PRONOUN_GENDER = {
  he: "male",
  him: "male",
  his: "male",
  she: "female",
  her: "female",
}

function identifySpeaker(fullParagraph, quoteStart, quoteEnd, context) {
  // Strategy 1: Look for "Name verb" right after the closing quote
  const afterQuote = fullParagraph.slice(quoteEnd).trim()
  const afterMatch = afterQuote.match(
    new RegExp(`^\\s*([A-Z][a-z]+)\\s+(?:${SPEECH_VERBS})`, "i")
  )
  if (afterMatch) {
    const name = afterMatch[1].toLowerCase()
    if (KNOWN_NAMES[name]) return KNOWN_NAMES[name]
  }

  // Also check "verb Name" pattern after quote like: , said Caelin
  const afterMatch2 = afterQuote.match(
    new RegExp(`^\\s*(?:${SPEECH_VERBS})\\s+([A-Z][a-z]+)`, "i")
  )
  if (afterMatch2) {
    const name = afterMatch2[1].toLowerCase()
    if (KNOWN_NAMES[name]) return KNOWN_NAMES[name]
  }

  // Strategy 2: Look for "Name verb," or "Name verb:" before the opening quote
  const beforeQuote = fullParagraph.slice(0, quoteStart).trim()
  const beforeMatch = beforeQuote.match(
    new RegExp(`([A-Z][a-z]+)\\s+(?:${SPEECH_VERBS})\\s*[,:]?\\s*$`, "i")
  )
  if (beforeMatch) {
    const name = beforeMatch[1].toLowerCase()
    if (KNOWN_NAMES[name]) return KNOWN_NAMES[name]
  }

  // Strategy 3: Look for "Name's [noun]" patterns before the quote
  // e.g. "Vex's tone sharpened."
  const possessiveMatch = beforeQuote.match(
    /([A-Z][a-z]+)'s\s+/i
  )
  if (possessiveMatch) {
    const name = possessiveMatch[1].toLowerCase()
    if (KNOWN_NAMES[name]) return KNOWN_NAMES[name]
  }

  // Strategy 4: Pronoun resolution - look for he/she said after quote
  const pronounAfter = afterQuote.match(
    new RegExp(`^\\s*(he|she)\\s+(?:${SPEECH_VERBS})`, "i")
  )
  if (pronounAfter) {
    const gender = PRONOUN_GENDER[pronounAfter[1].toLowerCase()]
    // Find most recent named character of that gender
    return context.lastCharacterByGender?.[gender] || context.lastSpeaker
  }

  // Strategy 5: Look for names anywhere in the before-text (last 100 chars)
  const nearBefore = beforeQuote.slice(-100)
  for (const [name, id] of Object.entries(KNOWN_NAMES)) {
    if (nearBefore.toLowerCase().includes(name)) return id
  }

  // Strategy 6: Continuation - same speaker as last dialogue
  if (context.lastSpeaker && context.lastSpeaker !== "narrator") {
    return context.lastSpeaker
  }

  return "unknown"
}

// ── Segmentation ────────────────────────────────────────────────────────────
function segmentParagraph(text, paragraphIndex, actNum, segCounter, context) {
  const segments = []
  const spans = findQuotedSpans(text)

  if (spans.length === 0) {
    // Pure narration paragraph
    segments.push({
      id: `ch1-act${actNum}-seg${String(segCounter).padStart(3, "0")}`,
      type: "narration",
      speaker: "narrator",
      text: text.trim(),
      paragraphIndex,
    })
    return { segments, nextCounter: segCounter + 1 }
  }

  // Mixed paragraph: split into narration and dialogue segments
  let cursor = 0
  for (const span of spans) {
    // Narration before this quote
    const beforeText = text.slice(cursor, span.start).trim()
    if (beforeText.length > 0) {
      // Check if beforeText is just attribution like "he said," — merge with dialogue
      const isAttribution = new RegExp(
        `^(?:,?\\s*(?:he|she|${Object.keys(KNOWN_NAMES).join("|")})\\s+(?:${SPEECH_VERBS}).*)?$`,
        "i"
      ).test(beforeText)

      if (!isAttribution || beforeText.length > 80) {
        segments.push({
          id: `ch1-act${actNum}-seg${String(segCounter).padStart(3, "0")}`,
          type: "narration",
          speaker: "narrator",
          text: beforeText,
          paragraphIndex,
        })
        segCounter++
      }
    }

    // Dialogue segment
    const speaker = identifySpeaker(text, span.start, span.end, context)
    segments.push({
      id: `ch1-act${actNum}-seg${String(segCounter).padStart(3, "0")}`,
      type: "dialogue",
      speaker,
      text: span.innerText.trim(),
      paragraphIndex,
    })
    segCounter++

    // Update context
    if (speaker !== "unknown" && speaker !== "narrator") {
      context.lastSpeaker = speaker
      const gender =
        speaker === "mira" || speaker === "vharisax" || speaker === "vex"
          ? "female"
          : "male"
      if (!context.lastCharacterByGender) context.lastCharacterByGender = {}
      context.lastCharacterByGender[gender] = speaker
    }

    cursor = span.end
  }

  // Narration after last quote
  const afterText = text.slice(cursor).trim()
  if (afterText.length > 0) {
    // Skip if it's just short attribution like "he said."
    const isShortAttribution =
      afterText.length < 40 &&
      new RegExp(`^(?:,?\\s*(?:he|she|${Object.keys(KNOWN_NAMES).join("|")})\\s+(?:${SPEECH_VERBS}))`, "i").test(afterText)

    if (!isShortAttribution) {
      segments.push({
        id: `ch1-act${actNum}-seg${String(segCounter).padStart(3, "0")}`,
        type: "narration",
        speaker: "narrator",
        text: afterText,
        paragraphIndex,
      })
      segCounter++
    }
  }

  return { segments, nextCounter: segCounter }
}

// ── Main ────────────────────────────────────────────────────────────────────
const raw = readFileSync(join(BOOKS_DIR, "Ch1_revised.txt"), "utf-8")
const lines = raw.split("\n")

// Parse into acts
const acts = []
let currentAct = null

for (const line of lines) {
  const actMatch = line.trim().match(ACT_RE)
  if (actMatch) {
    if (currentAct) acts.push(currentAct)
    currentAct = {
      num: romanToInt(actMatch[1]),
      title: actMatch[2].trim(),
      paragraphs: [],
    }
    continue
  }
  // Skip chapter title line
  if (/^CHAPTER\s+\d/i.test(line.trim())) continue
  if (currentAct) {
    const trimmed = line.trim()
    if (trimmed.length > 0) {
      currentAct.paragraphs.push(trimmed)
    }
  }
}
if (currentAct) acts.push(currentAct)

// Segment each act
const chaptersCharacters = new Set()
const allActs = []
let globalSegCounter = 1

for (const act of acts) {
  const actSegments = []
  let paraIndex = 0
  const context = { lastSpeaker: null, lastCharacterByGender: {} }

  for (const para of act.paragraphs) {
    // Check for the verse (rhyme) — lines 33-36 in source
    if (
      para.startsWith("Nine the arts") ||
      para.startsWith("Nine the souls") ||
      para.startsWith("Keep the chain") ||
      para.startsWith("Wake not the Tenth")
    ) {
      // Accumulate verse lines
      actSegments.push({
        id: `ch1-act${act.num}-seg${String(globalSegCounter).padStart(3, "0")}`,
        type: "verse",
        speaker: "mira",
        text: para,
        paragraphIndex: paraIndex,
      })
      globalSegCounter++
      paraIndex++
      continue
    }

    const { segments, nextCounter } = segmentParagraph(
      para,
      paraIndex,
      act.num,
      globalSegCounter,
      context
    )
    actSegments.push(...segments)
    globalSegCounter = nextCounter

    // Track characters
    for (const seg of segments) {
      if (seg.speaker !== "narrator" && seg.speaker !== "unknown") {
        chaptersCharacters.add(seg.speaker)
      }
    }

    paraIndex++
  }

  allActs.push({
    act: act.num,
    title: act.title,
    segments: actSegments,
  })
}

// Build the voiceMap with only characters that appear
const voiceMap = { narrator: VOICE_MAP.narrator }
for (const char of chaptersCharacters) {
  if (VOICE_MAP[char]) voiceMap[char] = VOICE_MAP[char]
}

// ── Post-processing: fix unknown/null speakers ────────────────────────────────
// Strategy: use narration context clues + two-person dialogue alternation
function postProcessSpeakers(acts) {
  for (const act of acts) {
    const segs = act.segments

    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i]
      if (seg.type !== "dialogue") continue
      if (seg.speaker !== "unknown" && seg.speaker !== null) continue

      // Check surrounding narration for context clues
      const prevNarr = findNearbyNarration(segs, i, -1)
      const nextNarr = findNearbyNarration(segs, i, 1)

      // Clue 1: narration mentions "her voice" / "his voice" / character names
      const clue = extractSpeakerFromNarration(prevNarr, nextNarr)
      if (clue) {
        seg.speaker = clue
        continue
      }

      // Clue 2: two-person dialogue alternation
      // Find last two distinct speakers
      const recentSpeakers = []
      for (let j = i - 1; j >= 0 && recentSpeakers.length < 2; j--) {
        if (segs[j].type === "dialogue" && segs[j].speaker && segs[j].speaker !== "unknown" && segs[j].speaker !== "narrator") {
          if (!recentSpeakers.includes(segs[j].speaker)) {
            recentSpeakers.push(segs[j].speaker)
          }
        }
      }

      if (recentSpeakers.length === 2) {
        // Find immediate previous dialogue speaker
        let prevDialogueSpeaker = null
        for (let j = i - 1; j >= 0; j--) {
          if (segs[j].type === "dialogue" && segs[j].speaker !== "narrator") {
            prevDialogueSpeaker = segs[j].speaker
            break
          }
        }
        // Alternate
        if (prevDialogueSpeaker === recentSpeakers[0]) {
          seg.speaker = recentSpeakers[1]
        } else {
          seg.speaker = recentSpeakers[0]
        }
        continue
      }

      // Clue 3: same speaker continuation (only one known speaker nearby)
      if (recentSpeakers.length === 1) {
        seg.speaker = recentSpeakers[0]
      }
    }
  }
}

function findNearbyNarration(segs, fromIndex, direction) {
  const limit = 3
  for (let j = fromIndex + direction, steps = 0; j >= 0 && j < segs.length && steps < limit; j += direction, steps++) {
    if (segs[j].type === "narration") return segs[j].text
  }
  return ""
}

function extractSpeakerFromNarration(prev, next) {
  const combined = (prev + " " + next).toLowerCase()

  // "her voice" / "she" patterns → check which female
  if (/her\s+(voice|eye|gaze|tone)|she\s+(shifted|said|spoke|whispered|murmured|hissed)/.test(combined)) {
    if (combined.includes("vharisax") || combined.includes("dragon") || combined.includes("eye closed") || combined.includes("fire")) {
      return "vharisax"
    }
    if (combined.includes("vex") || combined.includes("virella") || combined.includes("dry") || combined.includes("amusi")) {
      return "vex"
    }
    if (combined.includes("mira") || combined.includes("girl") || combined.includes("child")) {
      return "mira"
    }
  }

  // "his voice" / "he" patterns → check which male
  if (/his\s+(voice|chest|stomach)|he\s+(went|said|spoke|asked|spun)/.test(combined)) {
    if (combined.includes("caelin") || combined.includes("knee") || combined.includes("horror") || combined.includes("instinct")) {
      return "caelin"
    }
    if (combined.includes("gareth") || combined.includes("elder")) {
      return "gareth"
    }
  }

  // Direct name mentions in surrounding narration
  if (combined.includes("vharisax")) return "vharisax"
  if (combined.includes("vex") || combined.includes("virella")) return "vex"

  // "a voice observed, dry as desert wind" → Vex
  if (/voice\s+observed.*dry/.test(combined)) return "vex"
  // "came the answer" after Vharisax context → Vharisax
  if (/came the answer/.test(combined)) return "vharisax"

  return null
}

postProcessSpeakers(allActs)

// ── Manual overrides for Ch1 attribution that heuristics can't catch ──────────
// Vharisax's telepathic conversation in Act 2, Vex intro in Act 3
const SPEAKER_OVERRIDES = {
  "ch1-act2-seg074": "vharisax",  // "At last," — her voice arrived in his mind
  "ch1-act2-seg075": "vharisax",  // "The bloodline answers."
  "ch1-act2-seg078": "vharisax",  // "I had no choice." — came the answer
  "ch1-act2-seg082": "vharisax",  // "I searched the nearby villages..." — Vharisax explaining
  "ch1-act2-seg083": "caelin",    // "You killed them to test them?" — horror in his chest
  "ch1-act2-seg085": "vharisax",  // "I tested the fire," — Vharisax defending
  "ch1-act2-seg086": "vharisax",  // "Most would have burned..." — continuation
  "ch1-act2-seg093": "vharisax",  // "But the compact must continue..." — dying dragon's charge
}

for (const act of allActs) {
  for (const seg of act.segments) {
    if (SPEAKER_OVERRIDES[seg.id]) {
      seg.speaker = SPEAKER_OVERRIDES[seg.id]
    }
  }
}

// Remove null from characters set and rebuild
chaptersCharacters.delete(null)
chaptersCharacters.delete("unknown")
for (const act of allActs) {
  for (const seg of act.segments) {
    if (seg.speaker && seg.speaker !== "narrator" && seg.speaker !== "unknown") {
      chaptersCharacters.add(seg.speaker)
    }
  }
}

const output = {
  chapter: 1,
  title: "The Dragon's Last Breath",
  acts: allActs,
  characters: [...chaptersCharacters].filter(Boolean).sort(),
  voiceMap,
}

writeFileSync(join(OUT_DIR, "chapter-1.json"), JSON.stringify(output, null, 2), "utf-8")

// ── Summary ─────────────────────────────────────────────────────────────────
let totalSegs = 0
let narrationSegs = 0
let dialogueSegs = 0
let verseSegs = 0
const speakerCounts = {}

for (const act of output.acts) {
  for (const seg of act.segments) {
    totalSegs++
    if (seg.type === "narration") narrationSegs++
    else if (seg.type === "dialogue") dialogueSegs++
    else if (seg.type === "verse") verseSegs++
    speakerCounts[seg.speaker] = (speakerCounts[seg.speaker] || 0) + 1
  }
}

console.log(`\n=== Chapter 1: "${output.title}" ===`)
console.log(`Acts: ${output.acts.length}`)
console.log(`Total segments: ${totalSegs}`)
console.log(`  Narration: ${narrationSegs}`)
console.log(`  Dialogue:  ${dialogueSegs}`)
console.log(`  Verse:     ${verseSegs}`)
console.log(`\nSpeaker line counts:`)
for (const [speaker, count] of Object.entries(speakerCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${speaker}: ${count}`)
}
console.log(`\nCharacters: ${output.characters.join(", ")}`)
console.log(`Output: public/data/narration/chapter-1.json`)
