import { createBrowserClient } from "@supabase/ssr"

/**
 * Supabase client for use in browser/client components.
 *
 * The cookies config is critical: it tells the SSR client to store the
 * PKCE code verifier in cookies (not localStorage), so the server-side
 * /auth/callback handler can read it during the code-for-session exchange.
 *
 * Without this, magic-link sign-in fails with "PKCE code verifier not
 * found in storage" because the verifier ends up in localStorage which
 * the server can't access.
 */
export function createSupabaseBrowserClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return document.cookie
                        .split("; ")
                        .filter(Boolean)
                        .map((cookie) => {
                            const [name, ...rest] = cookie.split("=")
                            return { name, value: rest.join("=") }
                        })
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        const parts = [`${name}=${value}`, `path=${options?.path ?? "/"}`]
                        if (options?.maxAge) parts.push(`max-age=${options.maxAge}`)
                        if (options?.expires) parts.push(`expires=${options.expires.toUTCString()}`)
                        if (options?.sameSite) parts.push(`samesite=${options.sameSite}`)
                        if (options?.secure) parts.push("secure")
                        document.cookie = parts.join("; ")
                    })
                },
            },
        }
    )
}