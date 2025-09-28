// Server-Side
import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from './constants/routes';
import { ROLES, Role } from './constants/roles';

// Map protected routes to allowed roles
const protectedRoutes: Record<string, Role[]> = {
  [ROUTES.SYSTEM_ADMIN]: [ROLES.SYSTEM_ADMIN],
  [ROUTES.ROLE_ONE]: [ROLES.ROLE_ONE],
  [ROUTES.ROLE_TWO]: [ROLES.ROLE_TWO],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

   // Skip protection in dev mode
  if (process.env.NEXT_PUBLIC_DEV_AUTH === '1') {
    return NextResponse.next();
  }

  // Skip public routes
  if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password')) {
    return NextResponse.next();
  }

  // Check protected routes
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      const token = req.cookies.get('auth_token')?.value;
      if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }

      try {
        const data = JSON.parse(Buffer.from(token, 'base64').toString()) as { role: Role };
        const allowedRoles = protectedRoutes[route];
        if (!allowedRoles || !allowedRoles.includes(data.role)) {
          const url = req.nextUrl.clone();
          url.pathname = '/login';
          return NextResponse.redirect(url);
        }
      } catch {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

// Use ROUTES constants for matcher: must be string literal
export const config = {
  matcher: [
    '/system-admin/:path*',
    '/role-one/:path*',
    '/role-two/:path*',
  ],
};
