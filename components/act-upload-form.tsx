"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SectionMeta = { id: string; title: string }
type ChapterMeta = { slug: string; label: string; title: string; sections: SectionMeta[] }
type StoryMeta = { storyId: string; storyTitle: string; chapters: ChapterMeta[] }

type Props = { stories: StoryMeta[] }

const selectClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"

export default function ActUploadForm({ stories }: Props) {
  const [storyId, setStoryId] = useState(stories[0]?.storyId ?? "")
  const [chapterSlug, setChapterSlug] = useState(stories[0]?.chapters[0]?.slug ?? "")
  const [chapterContents, setChapterContents] = useState<Record<string, string>>({})
  const [actTitles, setActTitles] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [savedCount, setSavedCount] = useState(0)
  const [resetStatus, setResetStatus] = useState<"idle" | "resetting" | "success" | "error">("idle")
  const [resetMessage, setResetMessage] = useState("")
  const [tallyStatus, setTallyStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [tallyResult, setTallyResult] = useState<{ summary: { processed: number; winners: number; noVotes: number; skipped: number }; reports: { storyId: string; chapterSlug: string; result: string; message: string }[] } | null>(null)

  const selectedStory = stories.find((s) => s.storyId === storyId)
  const selectedChapter = selectedStory?.chapters.find((c) => c.slug === chapterSlug)

  function handleStoryChange(newStoryId: string) {
    setStoryId(newStoryId)
    const newStory = stories.find((s) => s.storyId === newStoryId)
    const firstChapter = newStory?.chapters[0]
    setChapterSlug(firstChapter?.slug ?? "")
    setChapterContents({})
    setActTitles({})
    setStatus("idle")
  }

  function handleChapterChange(newChapterSlug: string) {
    setChapterSlug(newChapterSlug)
    setChapterContents({})
    setActTitles({})
    setStatus("idle")
  }

  function handleFileUpload(sectionId: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const fileText = (event.target?.result as string) ?? ""
      setChapterContents((prev) => ({ ...prev, [sectionId]: fileText }))
      setStatus("idle")
    }
    reader.readAsText(file)
    e.target.value = "" // allow re-uploading same file
  }

  async function handleSubmit() {
    const entries = Object.entries(chapterContents)
      .map(([sectionId, content]) => ({ 
        sectionId, 
        content: content.trim(),
        title: actTitles[sectionId] || selectedChapter?.sections.find(s => s.id === sectionId)?.title || ""
      }))
      .filter((entry) => entry.content.length > 0)

    if (!entries.length) {
      setErrorMsg("Add content for at least one act before saving.")
      setStatus("error")
      return
    }

    setStatus("saving")
    setErrorMsg("")

    try {
      const res = await fetch("/api/admin/acts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId, chapterSlug, entries }),
      })

      if (res.ok) {
        setStatus("success")
        setSavedCount(entries.length)
        setChapterContents({})
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? "Failed to save.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Network error. Try again.")
      setStatus("error")
    }
  }

  async function handleResetChapterVotes() {
    if (!storyId || !chapterSlug) return
    const approved = window.confirm("Reset all votes for this chapter? This cannot be undone.")
    if (!approved) return

    setResetStatus("resetting")
    setResetMessage("")

    try {
      const res = await fetch("/api/admin/chapter-votes/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId, chapterSlug }),
      })

      if (!res.ok) {
        const payload = await res.json().catch(() => null)
        setResetStatus("error")
        setResetMessage(payload?.error ?? "Failed to reset chapter votes")
        return
      }

      setResetStatus("success")
      setResetMessage("Chapter votes were reset. New votes can now be collected for this chapter.")
    } catch {
      setResetStatus("error")
      setResetMessage("Network error while resetting chapter votes")
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-6">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Upload Act Content</h1>
          <p className="text-muted-foreground text-sm">
            Select a chapter, then paste or upload text for as many acts as you want and save all at once.
            The chapter page reads these files automatically.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Chapter</CardTitle>
            <CardDescription>Pick the story and chapter you are working on.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="story-select">Story</Label>
              <select
                id="story-select"
                className={selectClass}
                value={storyId}
                onChange={(e) => handleStoryChange(e.target.value)}
              >
                {stories.map((s) => (
                  <option key={s.storyId} value={s.storyId}>
                    {s.storyTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="chapter-select">Chapter</Label>
              <select
                id="chapter-select"
                className={selectClass}
                value={chapterSlug}
                onChange={(e) => handleChapterChange(e.target.value)}
              >
                {selectedStory?.chapters.map((ch) => (
                  <option key={ch.slug} value={ch.slug}>
                    {ch.label} — {ch.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                This chapter has {selectedChapter?.sections.length ?? 0} act
                {(selectedChapter?.sections.length ?? 0) === 1 ? "" : "s"}.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Act Prose (Batch)</CardTitle>
            <CardDescription>
              Fill one or many acts below. You can upload a different <code>.txt</code> file for each act.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedChapter?.sections.map((section) => {
              const sectionContent = chapterContents[section.id] ?? ""
              const sectionTitle = actTitles[section.id] ?? section.title
              const paragraphCount = sectionContent.trim().split("\n").filter(Boolean).length
              return (
                <div key={section.id} className="rounded-lg border border-border p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${section.id}`} className="text-sm">
                      Act Title
                    </Label>
                    <input
                      id={`title-${section.id}`}
                      type="text"
                      className={selectClass}
                      value={sectionTitle}
                      onChange={(e) => {
                        setActTitles((prev) => ({ ...prev, [section.id]: e.target.value }))
                        setStatus("idle")
                      }}
                      placeholder={section.title}
                    />
                    <p className="text-xs text-muted-foreground">{section.id}.txt</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRefs.current[section.id]?.click()}
                    >
                      Upload .txt
                    </Button>
                    <input
                      ref={(el) => {
                        fileInputRefs.current[section.id] = el
                      }}
                      type="file"
                      accept=".txt,text/plain"
                      className="hidden"
                      onChange={(e) => handleFileUpload(section.id, e)}
                    />
                  </div>

                  <Textarea
                    placeholder={`Paste prose for ${sectionTitle}...`}
                    className="min-h-[220px] font-mono text-sm leading-relaxed resize-y"
                    value={sectionContent}
                    onChange={(e) => {
                      setChapterContents((prev) => ({ ...prev, [section.id]: e.target.value }))
                      setStatus("idle")
                    }}
                  />

                  {sectionContent.trim() ? (
                    <p className="text-xs text-muted-foreground">
                      {paragraphCount} paragraph{paragraphCount === 1 ? "" : "s"} ready
                    </p>
                  ) : null}
                </div>
              )
            })}

            {status === "success" ? (
              <div className="rounded-md bg-green-500/10 border border-green-500/30 px-4 py-2.5 text-sm text-green-400">
                ✓ Saved {savedCount} act{savedCount === 1 ? "" : "s"}. The chapter page will display them on next load.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-400">
                {errorMsg}
              </div>
            ) : null}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setChapterContents({})
                  setStatus("idle")
                }}
                disabled={status === "saving"}
              >
                Clear All
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={status === "saving"}
              >
                {status === "saving" ? "Saving…" : "Save Filled Acts"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 border-red-500/30">
          <CardHeader>
            <CardTitle>Vote Reset (Admin)</CardTitle>
            <CardDescription>
              Use this only for test cycles. This clears all stored votes for the currently selected chapter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-400">
              Warning: This action permanently removes chapter vote totals.
            </div>

            {resetStatus === "success" ? (
              <div className="rounded-md bg-green-500/10 border border-green-500/30 px-4 py-2.5 text-sm text-green-400">
                {resetMessage}
              </div>
            ) : null}

            {resetStatus === "error" ? (
              <div className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-400">
                {resetMessage}
              </div>
            ) : null}

            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                disabled={resetStatus === "resetting"}
                onClick={handleResetChapterVotes}
              >
                {resetStatus === "resetting" ? "Resetting…" : "Reset Chapter Votes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 border-cyan-500/30">
          <CardHeader>
            <CardTitle>Weekly Vote Tally (Admin)</CardTitle>
            <CardDescription>
              Run the vote tally for all active stories. Winners are recorded and the next chapter is unlocked. Stories with zero votes do not advance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tallyStatus === "success" && tallyResult ? (
              <div className="space-y-2">
                <div className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-4 py-2.5 text-sm text-cyan-400">
                  Tally complete — {tallyResult.summary.winners} winner{tallyResult.summary.winners !== 1 ? "s" : ""},
                  {" "}{tallyResult.summary.noVotes} stalled, {tallyResult.summary.skipped} skipped.
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {tallyResult.reports.map((r, i) => (
                    <div key={i} className="text-xs text-muted-foreground border border-border rounded px-3 py-1.5">
                      <span className={r.result === "winner" ? "text-green-400" : r.result === "no-votes" ? "text-amber-400" : "text-muted-foreground"}>
                        [{r.result}]
                      </span>{" "}
                      <span className="font-mono">{r.storyId}</span> — {r.message}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {tallyStatus === "error" ? (
              <div className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-400">
                Tally failed. Check server logs.
              </div>
            ) : null}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                disabled={tallyStatus === "running"}
                onClick={async () => {
                  setTallyStatus("running")
                  setTallyResult(null)
                  try {
                    const res = await fetch("/api/admin/tally-votes", { method: "POST" })
                    if (!res.ok) throw new Error("failed")
                    const data = await res.json()
                    setTallyResult(data)
                    setTallyStatus("success")
                  } catch {
                    setTallyStatus("error")
                  }
                }}
              >
                {tallyStatus === "running" ? "Running…" : "Run Vote Tally Now"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-3 text-xs text-muted-foreground text-center">
          Saved as chapter act files:{" "}
          <code>
            data/acts/{storyId}/{chapterSlug}/act-id.txt
          </code>
        </p>
      </div>
    </div>
  )
}
