import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/vote' || pathname.startsWith('/vote')) {
    return NextResponse.next()
  }

  if (pathname === '/admin' || pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    const adminSession = request.cookies.get('admin_session')
    
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (pathname === '/creator' || pathname.startsWith('/creator')) {
    if (pathname === '/creator/login') {
      return NextResponse.next()
    }
    const creatorSession = request.cookies.get('creator_session')
    
    if (!creatorSession) {
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
