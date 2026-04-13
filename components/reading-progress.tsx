"use client"

import { useState, useEffect } from "react"

type ReadingProgressProps = {
  gradientClass: string
}

/**
 * Thin progress bar at the top of the viewport showing how far
 * the reader has scrolled through the chapter content.
 */
export default function ReadingProgress({ gradientClass }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setProgress(0)
        return
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1" aria-hidden="true">
      <div
        className={`h-full bg-gradient-to-r ${gradientClass} transition-[width] duration-150 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
