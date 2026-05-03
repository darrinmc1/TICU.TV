import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function GET() {
    const startedAt = new Date().toISOString()

    try {
        const supabase = getServiceClient()

        // 1. Insert a row to prove write access
        const { error: insertError } = await supabase
            .from('health_log')
            .insert({ note: `health check at ${startedAt}` })

        if (insertError) throw insertError

        // 2. Count rows to prove read access
        const { count, error: countError } = await supabase
            .from('health_log')
            .select('*', { count: 'exact', head: true })

        if (countError) throw countError

        return NextResponse.json({
            status: 'ok',
            timestamp: startedAt,
            database: 'connected',
            health_log_count: count,
        })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'unknown error'
        return NextResponse.json(
            {
                status: 'error',
                timestamp: startedAt,
                database: 'failed',
                error: message,
            },
            { status: 500 }
        )
    }
}