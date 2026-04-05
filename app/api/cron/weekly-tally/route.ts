import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { runWeeklyTally } from "@/lib/tally-votes"
import { sendWeeklyTallyEmail } from "@/lib/email"

/**
 * GET /api/cron/weekly-tally
 *
 * Vercel Cron Job endpoint — runs every Sunday at midnight UTC.
 * Vercel automatically sends the CRON_SECRET as a Bearer token.
 *
 * vercel.json config:
 *   {
 *     "crons": [{ "path": "/api/cron/weekly-tally", "schedule": "0 0 * * 0" }]
 *   }
 *
 * Required env: CRON_SECRET (auto-provided by Vercel on cron invocations)
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  // Vercel sends: Authorization: Bearer <CRON_SECRET>
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
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
      source: "cron",
      runAt,
      summary,
      reports,
    })

    console.log(
      `[weekly-tally] Complete — ${winners} winners, ${noVotes} stalled, ${skipped} skipped`
    )

    return NextResponse.json({
      success: true,
      runAt,
      summary,
      email,
      reports,
    })
  } catch (error) {
    console.error("[weekly-tally] Cron error:", error)
    return NextResponse.json({ error: "Tally failed" }, { status: 500 })
  }
}
