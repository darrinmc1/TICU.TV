import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { runWeeklyTally } from "@/lib/tally-votes"
import { verifySession } from "@/lib/auth"
import { sendWeeklyTallyEmail } from "@/lib/email"

/**
 * POST /api/admin/tally-votes
 *
 * Manually trigger (or test) the weekly vote tally.
 * Supports two authentication methods:
 *
 * 1. Admin cookie (set after logging in at /admin/login)
 * 2. x-api-key header — used for n8n / external automation
 *    Set TALLY_API_KEY in your .env.local (or Vercel env vars) to enable this.
 *
 * This endpoint also sends an admin summary email after the tally run.
 */
export async function POST(request: NextRequest) {
  // Auth: admin session cookie
  const adminSession = request.cookies.get("admin_session")?.value
  const payload = adminSession ? await verifySession(adminSession) : null

  // Auth: API key header (for n8n and other automation)
  const apiKey = request.headers.get("x-api-key")
  const configuredApiKey = process.env.TALLY_API_KEY

  const isAdminCookie = payload && payload.role === "admin"
  const isApiKey = Boolean(configuredApiKey && apiKey === configuredApiKey)

  if (!isAdminCookie && !isApiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const runAt = new Date().toISOString()
    const reports = await runWeeklyTally()
    const winners = reports.filter((r) => r.result === "winner").length
    const noVotes = reports.filter((r) => r.result === "no-votes").length
    const skipped = reports.filter((r) => r.result === "skipped").length
    const summary = { processed: reports.length, winners, noVotes, skipped }

    const email = await sendWeeklyTallyEmail({
      source: "admin",
      runAt,
      summary,
      reports,
    })

    return NextResponse.json({
      success: true,
      runAt,
      summary,
      email,
      reports,
    })
  } catch (error) {
    console.error("[tally-votes] Error during tally:", error)
    return NextResponse.json({ error: "Tally failed" }, { status: 500 })
  }
}
