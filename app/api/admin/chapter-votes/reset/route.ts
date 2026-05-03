import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { resetChapterVotes } from "@/lib/chapter-votes"
import { verifySession } from "@/lib/auth"

const SAFE_ID = /^[a-z0-9-]+$/

export async function POST(request: NextRequest) {
  const adminSession = request.cookies.get("admin_session")?.value
  const payload = adminSession ? await verifySession(adminSession) : null

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const storyId = body?.storyId as string | undefined
    const chapterSlug = body?.chapterSlug as string | undefined

    if (!storyId || !chapterSlug) {
      return NextResponse.json({ error: "Missing storyId or chapterSlug" }, { status: 400 })
    }

    if (!SAFE_ID.test(storyId) || !SAFE_ID.test(chapterSlug)) {
      return NextResponse.json({ error: "Invalid identifier format" }, { status: 400 })
    }

    await resetChapterVotes(storyId, chapterSlug)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to reset chapter votes" }, { status: 500 })
  }
}
