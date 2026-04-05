import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

type RateLimitEntry = {
  windowStartMs: number
  count: number
  lastAttemptMs: number
}

type RateLimitStore = {
  entries: Record<string, RateLimitEntry>
}

export type VoteRateLimitResult = {
  allowed: boolean
  retryAfterMs: number
}

const RATE_LIMIT_DIR = join(process.cwd(), "data", "chapter-votes")
const RATE_LIMIT_FILE = join(RATE_LIMIT_DIR, "rate-limit.json")

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 12
const MIN_SECONDS_BETWEEN_REQUESTS_MS = 4_000

function ensureRateLimitStore() {
  if (!existsSync(RATE_LIMIT_DIR)) {
    mkdirSync(RATE_LIMIT_DIR, { recursive: true })
  }

  if (!existsSync(RATE_LIMIT_FILE)) {
    const initialData: RateLimitStore = { entries: {} }
    writeFileSync(RATE_LIMIT_FILE, JSON.stringify(initialData, null, 2), "utf-8")
  }
}

function readRateLimitStore(): RateLimitStore {
  ensureRateLimitStore()

  try {
    const raw = readFileSync(RATE_LIMIT_FILE, "utf-8")
    const parsed = JSON.parse(raw) as RateLimitStore
    if (!parsed || typeof parsed !== "object" || !parsed.entries || typeof parsed.entries !== "object") {
      return { entries: {} }
    }
    return parsed
  } catch {
    return { entries: {} }
  }
}

function writeRateLimitStore(data: RateLimitStore) {
  ensureRateLimitStore()
  writeFileSync(RATE_LIMIT_FILE, JSON.stringify(data, null, 2), "utf-8")
}

function cleanupOldEntries(data: RateLimitStore, nowMs: number) {
  const cutoff = nowMs - 24 * 60 * 60 * 1_000
  for (const [key, entry] of Object.entries(data.entries)) {
    if (entry.lastAttemptMs < cutoff) {
      delete data.entries[key]
    }
  }
}

export function checkAndConsumeChapterVoteRateLimit(storyId: string, chapterSlug: string, userId: string): VoteRateLimitResult {
  const nowMs = Date.now()
  const bucketKey = `${storyId}:${chapterSlug}:${userId}`

  const store = readRateLimitStore()
  cleanupOldEntries(store, nowMs)

  const current = store.entries[bucketKey] ?? {
    windowStartMs: nowMs,
    count: 0,
    lastAttemptMs: 0,
  }

  if (current.lastAttemptMs > 0 && nowMs - current.lastAttemptMs < MIN_SECONDS_BETWEEN_REQUESTS_MS) {
    const retryAfterMs = MIN_SECONDS_BETWEEN_REQUESTS_MS - (nowMs - current.lastAttemptMs)
    store.entries[bucketKey] = { ...current, lastAttemptMs: nowMs }
    writeRateLimitStore(store)
    return { allowed: false, retryAfterMs }
  }

  const isSameWindow = nowMs - current.windowStartMs < WINDOW_MS
  const nextEntry: RateLimitEntry = isSameWindow
    ? { ...current }
    : {
        windowStartMs: nowMs,
        count: 0,
        lastAttemptMs: current.lastAttemptMs,
      }

  if (isSameWindow && nextEntry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterMs = WINDOW_MS - (nowMs - nextEntry.windowStartMs)
    nextEntry.lastAttemptMs = nowMs
    store.entries[bucketKey] = nextEntry
    writeRateLimitStore(store)
    return { allowed: false, retryAfterMs }
  }

  nextEntry.count += 1
  nextEntry.lastAttemptMs = nowMs

  store.entries[bucketKey] = nextEntry
  writeRateLimitStore(store)

  return { allowed: true, retryAfterMs: 0 }
}
