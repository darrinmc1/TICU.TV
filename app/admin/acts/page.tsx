import Link from "next/link"
import { SERIAL_STORIES } from "@/lib/serial-stories"
import ActUploadForm from "@/components/act-upload-form"

export default function AdminActsPage() {
  // Build a lightweight metadata tree — only ids and titles, no prose
  const stories = Object.values(SERIAL_STORIES).map((story) => ({
    storyId: story.id,
    storyTitle: story.title,
    chapters: story.chapters.map((ch) => ({
      slug: ch.slug,
      label: ch.label,
      title: ch.title,
      sections: ch.sections.map((s) => ({ id: s.id, title: s.title })),
    })),
  }))

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <h1 className="font-serif text-xl font-bold text-foreground">TICU.tv Admin</h1>
          </div>
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <ActUploadForm stories={stories} />
    </div>
  )
}
