"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-md w-full rounded-lg border border-slate-700 bg-slate-900 p-6 text-slate-100">
          <h2 className="text-xl font-semibold mb-2">Application error</h2>
          <p className="text-slate-300 mb-4">A global error occurred. Please retry.</p>
          <button
            onClick={reset}
            className="px-4 py-2 rounded bg-slate-100 text-slate-900 hover:bg-white transition-colors"
          >
            Reload
          </button>
          {error?.digest ? <p className="mt-3 text-xs text-slate-400">Ref: {error.digest}</p> : null}
        </div>
      </body>
    </html>
  )
}
