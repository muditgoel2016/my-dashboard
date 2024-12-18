import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 *
 * @param request
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pages/dashboard', request.url))
  }
}