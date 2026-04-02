import { auth } from './src/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role || 'guest';

  // Public paths (no auth required)
  const publicPaths = ['/', '/signin', '/register', '/terms', '/privacy'];
  const isPublicPath = publicPaths.some((path) => 
    nextUrl.pathname === path || nextUrl.pathname.startsWith('/api/auth/')
  );

  // Auth paths (redirect if logged in)
  const authPaths = ['/signin', '/register'];
  const isAuthPath = authPaths.some((path) => nextUrl.pathname.startsWith(path));

  // Admin paths
  const isAdminPath = nextUrl.pathname.startsWith('/admin');
  const isOperatorPath = nextUrl.pathname.startsWith('/operator');

  // Redirect logged-in users away from auth pages
  if (isAuthPath && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Protect dashboard routes
  if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/signin', nextUrl));
  }

  // Protect admin routes (only admin and super_admin)
  if (isAdminPath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/signin', nextUrl));
  }

  if (isAdminPath && !['admin', 'super_admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Protect operator routes (only operator, admin, super_admin)
  if (isOperatorPath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/signin', nextUrl));
  }

  if (isOperatorPath && !['operator', 'admin', 'super_admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
