import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Open_Sans } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

/* Added fantasy-themed fonts */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Epic Tales Interactive - Shape the Story, Decide the Fate",
  description:
    "Join the ultimate interactive D&D movie experience where your votes control the adventure. Watch, vote, and shape epic fantasy stories.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@ticu.tv"

  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${playfairDisplay.variable} ${openSans.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Suspense fallback={null}>{children}</Suspense>
          </main>
          <footer className="border-t border-white/10 bg-slate-950/80 px-4 py-4 text-center text-sm text-slate-300">
            Questions, bugs, or creator requests? Email{" "}
            <a
              href={`mailto:${adminEmail}`}
              className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
            >
              {adminEmail}
            </a>
          </footer>
        </div>
      </body>
    </html>
  )
}
