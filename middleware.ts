import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/landing",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const url = new URL(request.nextUrl);

  if (userId && isPublicRoute(request)) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  if (!userId) {
    const signInUrl = new URL("/landing", url.origin);
    signInUrl.searchParams.set("redirect", url.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
