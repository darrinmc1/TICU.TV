/**
 * Repair `�` (U+FFFD replacement character) artifacts in data/acts/*.txt files,
 * then normalize all double quotes to curly typography.
 *
 * Phase A — strip � debris adjacent to straight quotes (some files have "� or �"
 *   patterns where the straight quote is the surviving real quote and the � is debris).
 * Phase B — existing letter-adjacent rules:
 *   1. letter�(s|d|t|ll|ve|re|m)\b -> apostrophe (contractions)
 *   2. letter�letter               -> em-dash mid-word (smoke—the)
 *   3. letter�(space|punct|EOL)    -> apostrophe (possessives, end-of-word)
 *   4. (space|start)�(lowercase)   -> em-dash at sentence start
 * Phase C — quote rules for clean � corruption:
 *   5. (,.?!;:)�                   -> closing curly quote (said,")
 *   6. (space|start)�(uppercase)   -> opening curly quote ("You)
 *   7. space-�-space               -> em-dash (parenthetical em-dash usage)
 *   8. start-of-line � space       -> en-dash (list marker / signature)
 *   9. ��                          -> em-dash + closing curly quote (cut-off speech)
 *      anything else               -> leave as � and log as unresolved
 *
 * Phase D — smart-quote pass: convert all surviving straight " to curly " / "
 *   based on context (whitespace/start before -> opening; else closing).
 *
 * Writes a CSV at scripts/repair-log.csv with one row per replacement.
 *
 * Usage:
 *   pnpm tsx scripts/repair-prose.ts --dry-run   # report only, no writes
 *   pnpm tsx scripts/repair-prose.ts             # apply changes
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

const DRY_RUN = process.argv.includes("--dry-run")
const ACTS_DIR = join(process.cwd(), "data", "acts")
const LOG_PATH = join(process.cwd(), "scripts", "repair-log.csv")

type Replacement = {
    file: string
    lineNumber: number
    context: string
    original: string
    replacement: string
    rule: string
}

const log: Replacement[] = []
const stats = {
    filesScanned: 0,
    filesChanged: 0,
    totalReplacements: 0,
    debrisStripped: 0,
    apostropheContraction: 0,
    apostrophePossessive: 0,
    emDashBetweenWords: 0,
    emDashAtStart: 0,
    closingQuote: 0,
    openingQuote: 0,
    emDashSpaced: 0,
    listMarker: 0,
    doubledReplacement: 0,
    smartQuoteOpen: 0,
    smartQuoteClose: 0,
    unresolved: 0,
}

const APOSTROPHE = "\u2019"     // ’
const EM_DASH = "\u2014"        // —
const EN_DASH = "\u2013"        // –
const LEFT_DOUBLE = "\u201C"    // “
const RIGHT_DOUBLE = "\u201D"   // ”

/** Walk a directory recursively, return all .txt file paths. */
function walkTxtFiles(dir: string): string[] {
    const out: string[] = []
    for (const name of readdirSync(dir)) {
        const path = join(dir, name)
        const s = statSync(path)
        if (s.isDirectory()) out.push(...walkTxtFiles(path))
        else if (name.endsWith(".txt")) out.push(path)
    }
    return out
}

/**
 * Phase A: strip � characters that are adjacent to a straight " — the " is the
 * surviving real quote and the � is upstream debris. Modifies the line in one pass
 * with a regex, before the character-by-character phase runs.
 */
function stripQuoteDebris(line: string, fileRel: string, lineNumber: number): string {
    if (!line.includes("\uFFFD") || !line.includes('"')) return line
    return line.replace(/("\uFFFD|\uFFFD")/g, (match, _g, offset: number) => {
        const contextStart = Math.max(0, offset - 15)
        const contextEnd = Math.min(line.length, offset + 17)
        log.push({
            file: fileRel,
            lineNumber,
            context: line.slice(contextStart, contextEnd).replace(/[\r\n]/g, " "),
            original: match,
            replacement: '"',
            rule: "phaseA_debris_stripped",
        })
        stats.debrisStripped++
        stats.totalReplacements++
        return '"' // keep the straight quote, drop the �
    })
}

function repairLine(line: string, fileRel: string, lineNumber: number): string {
    if (!line.includes("\uFFFD")) return line

    let result = ""
    let i = 0
    while (i < line.length) {
        const ch = line[i]
        if (ch !== "\uFFFD") {
            result += ch
            i++
            continue
        }

        const prev = i > 0 ? line[i - 1] : ""
        const next = i + 1 < line.length ? line[i + 1] : ""
        const after = line.slice(i + 1, i + 4)
        const contractionMatch = after.match(/^(s|d|t|ll|ve|re|m)\b/i)

        const contextStart = Math.max(0, i - 15)
        const contextEnd = Math.min(line.length, i + 15)
        const context = line.slice(contextStart, contextEnd)

        let replacement = "\uFFFD"
        let rule = "unresolved"

        const prevIsLetter = /\p{L}/u.test(prev)
        const nextIsLetter = /\p{L}/u.test(next)
        const nextIsUpper = /\p{Lu}/u.test(next)
        const prevIsSpaceOrStart = prev === "" || /\s/.test(prev)
        const nextIsSpaceOrPunct = next === "" || /[\s.,;:!?"')\]]/.test(next)
        const prevIsSpeechPunct = /[,.?!;:]/.test(prev)

        if (prevIsLetter && contractionMatch) {
            replacement = APOSTROPHE
            rule = "rule1_contraction"
            stats.apostropheContraction++
        } else if (prevIsLetter && nextIsLetter) {
            replacement = EM_DASH
            rule = "rule2_emdash_words"
            stats.emDashBetweenWords++
        } else if (prevIsLetter && nextIsSpaceOrPunct) {
            replacement = APOSTROPHE
            rule = "rule3_possessive"
            stats.apostrophePossessive++
        } else if (prevIsSpaceOrStart && nextIsLetter && !nextIsUpper) {
            // lowercase letter after space/start: em-dash (e.g. "—word")
            replacement = EM_DASH
            rule = "rule4_emdash_start"
            stats.emDashAtStart++
        } else if (prevIsSpeechPunct) {
            // � after speech-ending punctuation: closing curly quote
            replacement = RIGHT_DOUBLE
            rule = "rule5_closing_quote"
            stats.closingQuote++
        } else if (prevIsSpaceOrStart && nextIsUpper) {
            // � at start of line or after whitespace, before uppercase: opening curly quote
            replacement = LEFT_DOUBLE
            rule = "rule6_opening_quote"
            stats.openingQuote++
        } else if (prevIsSpaceOrStart && next === " " && /^\s*$/.test(result)) {
            // Rule 8: � is the first non-whitespace on the line, followed by a space
            // -> en-dash list marker (or signature). Must run BEFORE rule 7 so indented
            // list bullets don't get classified as parenthetical em-dashes.
            replacement = EN_DASH
            rule = "rule8_list_marker"
            stats.listMarker++
        } else if (prev === " " && next === " ") {
            // Rule 7: � surrounded by spaces -> em-dash (parenthetical em-dash usage)
            replacement = EM_DASH
            rule = "rule7_emdash_spaced"
            stats.emDashSpaced++
        } else if (next === "\uFFFD") {
            // Rule 9: doubled �� -> em-dash + closing curly quote (cut-off speech)
            // Consume both characters; emit two replacements; advance i by an extra step.
            log.push({
                file: fileRel,
                lineNumber,
                context: context.replace(/[\r\n]/g, " "),
                original: "\uFFFD\uFFFD",
                replacement: EM_DASH + RIGHT_DOUBLE,
                rule: "rule9_doubled_cutoff",
            })
            stats.doubledReplacement++
            stats.totalReplacements += 2
            result += EM_DASH + RIGHT_DOUBLE
            i += 2
            continue
        } else {
            stats.unresolved++
        }

        log.push({
            file: fileRel,
            lineNumber,
            context: context.replace(/[\r\n]/g, " "),
            original: prev + "\uFFFD" + next,
            replacement: prev + replacement + next,
            rule,
        })

        result += replacement
        i++
        stats.totalReplacements++
    }
    return result
}

/**
 * Phase D: convert all surviving straight " to curly " / " based on context.
 * Standard algorithm: a " is "opening" if preceded by whitespace, start-of-string,
 * or opening punctuation; otherwise it's "closing".
 */
function smartenQuotes(line: string, fileRel: string, lineNumber: number): string {
    if (!line.includes('"')) return line
    return line.replace(/"/g, (_match, offset: number) => {
        const prev = offset > 0 ? line[offset - 1] : ""
        const isOpening = prev === "" || /[\s(\[{]/.test(prev)
        const replacement = isOpening ? LEFT_DOUBLE : RIGHT_DOUBLE
        const contextStart = Math.max(0, offset - 15)
        const contextEnd = Math.min(line.length, offset + 16)
        log.push({
            file: fileRel,
            lineNumber,
            context: line.slice(contextStart, contextEnd).replace(/[\r\n]/g, " "),
            original: '"',
            replacement,
            rule: isOpening ? "phaseD_smart_open" : "phaseD_smart_close",
        })
        if (isOpening) stats.smartQuoteOpen++
        else stats.smartQuoteClose++
        stats.totalReplacements++
        return replacement
    })
}

function repairFile(filePath: string) {
    stats.filesScanned++
    const original = readFileSync(filePath, "utf-8")
    const hasReplacement = original.includes("\uFFFD")
    const hasStraightQuote = original.includes('"')
    if (!hasReplacement && !hasStraightQuote) return

    const fileRel = filePath.replace(process.cwd() + "\\", "").replace(/\\/g, "/")
    const lines = original.split(/\r?\n/)

    const repaired = lines.map((line, idx) => {
        const lineNum = idx + 1
        // Phase A: strip "�/�" debris
        let l = stripQuoteDebris(line, fileRel, lineNum)
        // Phases B + C: char-by-char � repair
        l = repairLine(l, fileRel, lineNum)
        // Phase D: straight " -> curly
        l = smartenQuotes(l, fileRel, lineNum)
        return l
    })

    const out = repaired.join("\n")

    if (out !== original) {
        stats.filesChanged++
        if (!DRY_RUN) writeFileSync(filePath, out, "utf-8")
    }
}

function writeCsv() {
    const header = "file,line,rule,context,original,replacement\n"
    const escape = (s: string) => `"${s.replace(/"/g, '""')}"`
    const rows = log
        .map((r) =>
            [r.file, r.lineNumber, r.rule, escape(r.context), escape(r.original), escape(r.replacement)].join(",")
        )
        .join("\n")
    writeFileSync(LOG_PATH, header + rows + "\n", "utf-8")
}

function main() {
    console.log(DRY_RUN ? "DRY RUN — no files will be changed.\n" : "Repairing files in place.\n")
    const files = walkTxtFiles(ACTS_DIR)
    for (const f of files) repairFile(f)
    if (log.length > 0) writeCsv()

    console.log(`Files scanned:           ${stats.filesScanned}`)
    console.log(`Files changed:           ${stats.filesChanged}${DRY_RUN ? " (would change)" : ""}`)
    console.log(`Total replacements:      ${stats.totalReplacements}`)
    console.log(`  Phase A debris:        ${stats.debrisStripped}`)
    console.log(`  contractions ('):      ${stats.apostropheContraction}`)
    console.log(`  possessives ('):       ${stats.apostrophePossessive}`)
    console.log(`  em-dashes mid-word:    ${stats.emDashBetweenWords}`)
    console.log(`  em-dashes at start:    ${stats.emDashAtStart}`)
    console.log(`  closing quotes ("):    ${stats.closingQuote}`)
    console.log(`  opening quotes ("):    ${stats.openingQuote}`)
    console.log(`  em-dash spaced:        ${stats.emDashSpaced}`)
    console.log(`  list markers (–):      ${stats.listMarker}`)
    console.log(`  doubled cut-off:       ${stats.doubledReplacement}`)
    console.log(`  Phase D open quote:    ${stats.smartQuoteOpen}`)
    console.log(`  Phase D close quote:   ${stats.smartQuoteClose}`)
    console.log(`  UNRESOLVED:            ${stats.unresolved}  <-- spot-check these`)
    console.log(`\nLog written to: ${LOG_PATH}`)
    if (DRY_RUN) console.log("\nNo writes performed. Re-run without --dry-run to apply.")
}

main()
