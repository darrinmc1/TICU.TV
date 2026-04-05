"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="max-w-md w-full rounded-lg border border-slate-700 bg-slate-900 p-6 text-slate-100">
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-slate-300 mb-4">An unexpected error occurred while loading this page.</p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded bg-slate-100 text-slate-900 hover:bg-white transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
