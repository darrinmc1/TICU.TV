"use client"

import { useEffect, useRef, useState } from "react"

type StoryArtProps = {
  src?: string
  alt: string
  caption?: string
  accentTextClass: string
  gradientClass: string
  placeholderLabel: string
  placeholderHint?: string
  icon?: string
  aspectClass?: string
}

export default function StoryArt({
  src,
  alt,
  caption,
  accentTextClass,
  gradientClass,
  placeholderLabel,
  placeholderHint,
  icon = "🖼️",
  aspectClass = "aspect-[3/4]",
}: StoryArtProps) {
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const showImage = Boolean(src) && !hasError

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className={`overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${gradientClass} p-[1px]`}>
        <div className={`${aspectClass} overflow-hidden rounded-[10px]`}>
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-slate-950/90 px-3 text-center">
              <div className={`mb-2 text-3xl ${accentTextClass}`} aria-hidden="true">
                {icon}
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">{placeholderLabel}</p>
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 text-center text-xs italic text-white/40">{caption ?? placeholderHint}</p>
    </div>
  )
}
