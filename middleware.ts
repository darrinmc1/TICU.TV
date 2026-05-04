import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- Supabase session refresh ---------------------------------------------
  // Refresh the Supabase auth cookie on every matched request so sessions
  // don't expire mid-use. This is a no-op for unauthenticated visitors.
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()

  // --- Existing /vote, /admin, /creator gates -------------------------------
  if (pathname === "/vote" || pathname.startsWith("/vote")) {
    return response
  }

  if (pathname === "/admin" || pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return response
    }

    const adminSession = request.cookies.get("admin_session")?.value
    const payload = adminSession ? await verifySession(adminSession) : null

    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  if (pathname === "/creator" || pathname.startsWith("/creator")) {
    if (pathname === "/creator/login") {
      return response
    }
    const creatorSession = request.cookies.get("creator_session")?.value
    const payload = creatorSession ? await verifySession(creatorSession) : null

    if (!payload || (payload.role !== "creator" && payload.role !== "admin")) {
      return NextResponse.redirect(new URL("/creator/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match every request EXCEPT static assets, image optimisation, favicon,
     * and image files. The Supabase session refresh needs to run broadly so
     * that authed users browsing chapter pages keep a fresh cookie. The
     * /admin and /creator gates above only fire when the path matches.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}