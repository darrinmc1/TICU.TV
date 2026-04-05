import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

type ChapterVoteFile = {
  votes: Record<string, string>
}

export type ChapterVoteSummary = {
  counts: Record<string, number>
  totalVotes: number
  winningOptionId: string | null
  userVote: string | null
}

const CHAPTER_VOTES_DIR = join(process.cwd(), "data", "chapter-votes")

function getVoteFilePath(storyId: string, chapterSlug: string) {
  return join(CHAPTER_VOTES_DIR, storyId, `${chapterSlug}.json`)
}

function ensureVoteFile(storyId: string, chapterSlug: string) {
  const filePath = getVoteFilePath(storyId, chapterSlug)
  const dir = join(CHAPTER_VOTES_DIR, storyId)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  if (!existsSync(filePath)) {
    const initialData: ChapterVoteFile = { votes: {} }
    writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf-8")
  }
  return filePath
}

function readVoteFile(storyId: string, chapterSlug: string): ChapterVoteFile {
  const filePath = ensureVoteFile(storyId, chapterSlug)
  try {
    const raw = readFileSync(filePath, "utf-8")
    const parsed = JSON.parse(raw) as ChapterVoteFile
    if (!parsed || typeof parsed !== "object" || !parsed.votes || typeof parsed.votes !== "object") {
      return { votes: {} }
    }
    return parsed
  } catch {
    return { votes: {} }
  }
}

function writeVoteFile(storyId: string, chapterSlug: string, data: ChapterVoteFile) {
  const filePath = ensureVoteFile(storyId, chapterSlug)
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export function castChapterVote(storyId: string, chapterSlug: string, userId: string, optionId: string) {
  const data = readVoteFile(storyId, chapterSlug)
  data.votes[userId] = optionId
  writeVoteFile(storyId, chapterSlug, data)
}

export function resetChapterVotes(storyId: string, chapterSlug: string) {
  const clearedData: ChapterVoteFile = { votes: {} }
  writeVoteFile(storyId, chapterSlug, clearedData)
}

export function getChapterVoteSummary(
  storyId: string,
  chapterSlug: string,
  optionIds: string[],
  userId?: string
): ChapterVoteSummary {
  const data = readVoteFile(storyId, chapterSlug)
  const counts: Record<string, number> = Object.fromEntries(optionIds.map((id) => [id, 0]))

  Object.values(data.votes).forEach((optionId) => {
    if (optionId in counts) {
      counts[optionId] += 1
    }
  })

  const totalVotes = Object.values(counts).reduce((sum, value) => sum + value, 0)
  const winningOptionId = optionIds.reduce<string | null>((winner, optionId) => {
    if (!winner) return optionId
    return counts[optionId] > counts[winner] ? optionId : winner
  }, null)

  return {
    counts,
    totalVotes,
    winningOptionId: totalVotes > 0 ? winningOptionId : null,
    userVote: userId ? data.votes[userId] ?? null : null,
  }
}
