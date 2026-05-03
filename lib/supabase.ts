import { createClient } from '@supabase/supabase-js'

// Browser/client-side client — uses the anon key.
// Safe to ship to the browser. Respects Row Level Security.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side admin client — uses the service_role key.
// NEVER import this from a client component. API routes only.
// Bypasses Row Level Security, so handle with care.
export function getServiceClient() {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
    }
    return createClient(supabaseUrl, serviceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
}