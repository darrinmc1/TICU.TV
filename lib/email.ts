type TallySummary = {
  processed: number
  winners: number
  noVotes: number
  skipped: number
}

type TallyReport = {
  storyId: string
  chapterSlug: string
  result: "winner" | "no-votes" | "skipped"
  winningOptionId?: string
  totalVotes: number
  nextChapterSlug?: string
  message: string
}

export type EmailSendResult = {
  sent: boolean
  skipped?: boolean
  reason?: string
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export async function sendWeeklyTallyEmail(params: {
  source: "cron" | "admin"
  runAt: string
  summary: TallySummary
  reports: TallyReport[]
}): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ADMIN_EMAIL ?? "admin@ticu.tv"
  const from = process.env.EMAIL_FROM ?? "TICU.TV <no-reply@ticu.tv>"

  if (!apiKey) {
    return {
      sent: false,
      skipped: true,
      reason: "RESEND_API_KEY is not configured",
    }
  }

  const subject = `TICU Weekly Tally (${params.summary.winners} winner${params.summary.winners !== 1 ? "s" : ""}, ${params.summary.noVotes} stalled)`

  const lines = params.reports.map((r) => {
    const leader = r.result === "winner" ? `winner=${r.winningOptionId ?? "unknown"}` : r.result
    return `- [${r.storyId}] ${r.chapterSlug}: ${leader}; votes=${r.totalVotes}; ${r.message}`
  })

  const text = [
    `TICU vote tally summary`,
    `Run at: ${params.runAt}`,
    `Source: ${params.source}`,
    "",
    `Processed: ${params.summary.processed}`,
    `Winners: ${params.summary.winners}`,
    `Stalled (no votes): ${params.summary.noVotes}`,
    `Skipped: ${params.summary.skipped}`,
    "",
    "Details:",
    ...lines,
  ].join("\n")

  const htmlRows = params.reports
    .map(
      (r) => `
      <tr>
        <td style="padding:8px;border:1px solid #23303d;color:#dbeafe">${escapeHtml(r.storyId)}</td>
        <td style="padding:8px;border:1px solid #23303d;color:#dbeafe">${escapeHtml(r.chapterSlug)}</td>
        <td style="padding:8px;border:1px solid #23303d;color:#dbeafe">${escapeHtml(r.result)}</td>
        <td style="padding:8px;border:1px solid #23303d;color:#dbeafe">${escapeHtml(r.winningOptionId ?? "-")}</td>
        <td style="padding:8px;border:1px solid #23303d;color:#dbeafe">${r.totalVotes}</td>
        <td style="padding:8px;border:1px solid #23303d;color:#dbeafe">${escapeHtml(r.message)}</td>
      </tr>`
    )
    .join("")

  const html = `
  <div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;background:#0b1118;color:#e5edf7;padding:20px">
    <h2 style="margin:0 0 8px 0">TICU Weekly Vote Tally</h2>
    <p style="margin:0 0 16px 0;color:#9db2c6">Run at ${escapeHtml(params.runAt)} via ${escapeHtml(params.source)}</p>
    <ul style="margin:0 0 16px 18px;padding:0">
      <li>Processed: <strong>${params.summary.processed}</strong></li>
      <li>Winners: <strong>${params.summary.winners}</strong></li>
      <li>Stalled (no votes): <strong>${params.summary.noVotes}</strong></li>
      <li>Skipped: <strong>${params.summary.skipped}</strong></li>
    </ul>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="background:#111a24">
          <th style="padding:8px;border:1px solid #23303d;text-align:left">Story</th>
          <th style="padding:8px;border:1px solid #23303d;text-align:left">Chapter</th>
          <th style="padding:8px;border:1px solid #23303d;text-align:left">Result</th>
          <th style="padding:8px;border:1px solid #23303d;text-align:left">Winner</th>
          <th style="padding:8px;border:1px solid #23303d;text-align:left">Votes</th>
          <th style="padding:8px;border:1px solid #23303d;text-align:left">Message</th>
        </tr>
      </thead>
      <tbody>
        ${htmlRows || "<tr><td colspan='6' style='padding:8px;border:1px solid #23303d'>No reports.</td></tr>"}
      </tbody>
    </table>
  </div>`

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const responseText = await response.text()
    console.error("[email] Failed to send tally email:", response.status, responseText)
    return {
      sent: false,
      reason: `Resend returned ${response.status}`,
    }
  }

  return { sent: true }
}
