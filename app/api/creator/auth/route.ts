import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { signSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    const CREATOR_USERNAME = 'creator'
    const CREATOR_PASSWORD = 'Create2024!'

    if (username === CREATOR_USERNAME && password === CREATOR_PASSWORD) {
      const response = NextResponse.json({ success: true, role: 'creator' })
      const sessionToken = await signSession({ role: 'creator', username })
      response.cookies.set('creator_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24
      })
      return response
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('creator_session')
  return response
}
