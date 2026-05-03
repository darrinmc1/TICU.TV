import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Both clients are now constructed lazily. This matters during `next build`,
// when Next imports every module to collect metadata BEFORE env vars are
// guaranteed to be available. Constructing at import time would crash the
// build with "supabaseUrl is required".

let _browserClient: SupabaseClient | null = null
let _serviceClient: SupabaseClient | null = null

/**
 * Browser/client-side client — uses the anon key.
 * Safe to ship to the browser. Respects Row Level Security.
 *
 * Use as a function call: `supabase().from('...')`. The client is cached
 * after first construction.
 */
export function supabase(): SupabaseClient {
    if (_browserClient) return _browserClient

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
    if (!anonKey) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')

    _browserClient = createClient(url, anonKey)
    return _browserClient
}

/**
 * Server-side admin client — uses the service_role key.
 * NEVER import this from a client component. API routes only.
 * Bypasses Row Level Security, so handle with care.
 */
export function getServiceClient(): SupabaseClient {
    if (_serviceClient) return _serviceClient

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
    if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')

    _serviceClient = createClient(url, serviceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
    return _serviceClient
}
