import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { saveActContent } from "@/lib/acts-content"

export async function POST(request: NextRequest) {
  const adminSession = request.cookies.get("admin_session")
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { storyId, chapterSlug, sectionId, content, entries } = body

    if (!storyId || !chapterSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prevent path traversal — only lowercase alphanumeric + hyphens allowed in IDs
    const safeId = /^[a-z0-9-]+$/
    if (!safeId.test(storyId) || !safeId.test(chapterSlug)) {
      return NextResponse.json({ error: "Invalid identifier format" }, { status: 400 })
    }

    if (Array.isArray(entries)) {
      if (!entries.length) {
        return NextResponse.json({ error: "No act entries supplied" }, { status: 400 })
      }

      let saved = 0
      for (const entry of entries) {
        if (!entry || typeof entry.sectionId !== "string" || typeof entry.content !== "string") {
          return NextResponse.json({ error: "Invalid entry format" }, { status: 400 })
        }

        if (!safeId.test(entry.sectionId)) {
          return NextResponse.json({ error: "Invalid section identifier format" }, { status: 400 })
        }

        if (!entry.content.trim()) {
          continue
        }

        saveActContent(storyId, chapterSlug, entry.sectionId, entry.content.trim())
        saved += 1
      }

      if (!saved) {
        return NextResponse.json({ error: "No non-empty act content to save" }, { status: 400 })
      }

      return NextResponse.json({ success: true, saved })
    }

    if (!sectionId || typeof content !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!safeId.test(sectionId)) {
      return NextResponse.json({ error: "Invalid section identifier format" }, { status: 400 })
    }

    if (!content.trim()) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 })
    }

    saveActContent(storyId, chapterSlug, sectionId, content.trim())
    return NextResponse.json({ success: true, saved: 1 })
  } catch {
    return NextResponse.json({ error: "Failed to save act content" }, { status: 500 })
  }
}
