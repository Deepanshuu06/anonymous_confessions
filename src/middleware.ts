import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Check if the user is already authenticated and attempting to access
  // sign-in, sign-up, or verify page; if so, redirect to dashboard
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check if the user is authenticated and attempting to access the dashboard page
  // If so, allow access without redirection
  if (token && url.pathname.startsWith('/dashboard')) {
    return;
  }

  // Check if the user is not authenticated and attempting to access
  // the dashboard page; if so, redirect to home

  // if (!token && url.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/home', request.url));
  // }

  // For all other cases, proceed without redirection
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/sign-in', '/sign-up', '/dashboard', '/verify/:path*'],
};
