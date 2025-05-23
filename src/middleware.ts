import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/calendar',
  '/admin/sign-in(.*)',
  '/api(.*)',
  '/admin/calendar',
  '/admin'
]);

export default clerkMiddleware(async (auth, req) => {

  const { userId } = await auth();

  const isAdminRoot = req.nextUrl.pathname === '/admin';

  if (isAdminRoot && userId) {
    return NextResponse.redirect(new URL('/admin/calendar', req.url));
  }

  if (isAdminRoot && !userId) {
    return NextResponse.redirect(new URL('/admin/sign-in', req.url));
  }

  // Protect everything else unless explicitly public
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
