import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Supabase client for use in server components, route handlers, and server actions.
 * Reads/writes the session cookie via Next.js's cookies() API.
 */
export async function createSupabaseServerClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                        })
                    } catch {
                        // Called from a server component — Next.js doesn't allow setting cookies
                        // there. The middleware refreshes the session on every request, so this
                        // is fine to swallow. Only route handlers actually need to set cookies.
                    }
                },
            },
        }
    )
}