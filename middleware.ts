import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/vote' || pathname.startsWith('/vote')) {
    return NextResponse.next()
  }

  if (pathname === '/admin' || pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    const adminSession = request.cookies.get('admin_session')?.value
    const payload = adminSession ? await verifySession(adminSession) : null
    
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (pathname === '/creator' || pathname.startsWith('/creator')) {
    if (pathname === '/creator/login') {
      return NextResponse.next()
    }
    const creatorSession = request.cookies.get('creator_session')?.value
    const payload = creatorSession ? await verifySession(creatorSession) : null
    
    if (!payload || (payload.role !== 'creator' && payload.role !== 'admin')) {
      return NextResponse.redirect(new URL('/creator/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/creator/:path*',
    '/vote/:path*',
  ],
}
