import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UserRole } from "@/types";

// Define protected route patterns
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/services",
  "/stylists(.*)",
  "/contact",
  "/blog(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

const isCustomerRoute = createRouteMatcher(["/dashboard/customer(.*)"]);
const isStylistRoute = createRouteMatcher(["/dashboard/stylist(.*)"]);
const isAdminRoute = createRouteMatcher(["/dashboard/admin(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to sign-in
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Get role from Clerk metadata
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const onboardingComplete = (
    sessionClaims?.metadata as { onboardingComplete?: boolean }
  )?.onboardingComplete;

  // Redirect to onboarding if not complete
  if (!onboardingComplete && !isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Role-based route protection
  if (isAdminRoute(req) && role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isStylistRoute(req) && role !== UserRole.STYLIST && role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isCustomerRoute(req) && role !== UserRole.CUSTOMER && role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
