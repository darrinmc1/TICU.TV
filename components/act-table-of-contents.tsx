"use client"

import { useState } from "react"

type ActEntry = {
  id: string
  title: string
}

type ActTableOfContentsProps = {
  acts: ActEntry[]
  chapterTitle: string
  accentTextClass: string
}

/**
 * Collapsible table of contents showing all acts in the current chapter.
 * Clicking an act smooth-scrolls to it.
 */
export default function ActTableOfContents({
  acts,
  chapterTitle,
  accentTextClass,
}: ActTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  function scrollToAct(actId: string) {
    const el = document.getElementById(`section-${actId}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-md transition hover:bg-white/5 hover:text-white"
        aria-expanded={isOpen}
        aria-controls="act-toc-panel"
      >
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span>Acts in {chapterTitle}</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
          {acts.length}
        </span>
      </button>

      {isOpen && (
        <div
          id="act-toc-panel"
          className="absolute left-0 top-full z-30 mt-2 w-80 max-w-[90vw] rounded-xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-lg"
        >
          <nav aria-label="Chapter acts">
            <ul className="space-y-1">
              {acts.map((act, i) => (
                <li key={act.id}>
                  <button
                    onClick={() => scrollToAct(act.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-white/5 ${accentTextClass}`}
                  >
                    <span className="text-white/40">{i + 1}.</span>{" "}
                    {act.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
