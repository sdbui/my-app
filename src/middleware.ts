import type { NextRequest } from 'next/server'
 
// this middleware checks for 'admin' role in cookies
// if not there, will redirect to login
export function middleware(request: NextRequest) {
  let isAdmin = request.cookies.get('role')?.value === 'admin';

  console.log('thenexturl', request.nextUrl)
 
  if (isAdmin && !request.nextUrl.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/admin', request.url))
  }
 
  if (!isAdmin && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.nextUrl))
  }
}
 
export const config = {
  matcher: '/admin' // only running on admin for now
}