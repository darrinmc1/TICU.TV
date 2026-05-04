import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

/**
 * Magic-link callback. Supabase sends the user here after they click the
 * link in their email. We exchange the `code` query param for a session,
 * which sets the auth cookie, then redirect them on to wherever they were
 * trying to go (or home, if no redirect target was passed).
 */
export async function GET(request: Request) {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")
    const redirectTo = url.searchParams.get("redirect_to") ?? "/"

    if (!code) {
        // No code = something went wrong with the email link. Send them home
        // with an error flag the UI can pick up later if we want to show a toast.
        return NextResponse.redirect(new URL("/?auth_error=missing_code", request.url))
    }

    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
        console.error("Auth callback failed:", error.message)
        return NextResponse.redirect(new URL("/?auth_error=exchange_failed", request.url))
    }

    // Sanity check: only allow same-origin redirects. Prevents an attacker
    // from sending someone a magic link that bounces them off-site after sign-in.
    const safeRedirect = redirectTo.startsWith("/") ? redirectTo : "/"
    return NextResponse.redirect(new URL(safeRedirect, request.url))
}