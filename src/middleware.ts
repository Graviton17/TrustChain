import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import getOrCreateDatabase from "@/models/server/dbSetup/dbSetup";
import { currentUser } from "@clerk/nextjs/server";
import { getRoleFromUser, getDashboardRoute } from "@/utils/roles";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/government-dashboard(.*)",
  "/producer-dashboard(.*)",
  "/customer-dashboard(.*)",
  "/application-form(.*)",
  "/certificate(.*)",
  "/companyDetail(.*)",
  "/projectDetail(.*)",
  "/speak-with-specialist(.*)",
]);

// Define government-only routes (manager sites)
const isGovernmentOnlyRoute = createRouteMatcher([
  "/subsidies-manager(.*)",
  "/insurance-manager(.*)",
]);

// Define auto-redirect routes for authenticated users
const isAuthRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
]);

// Flag to track if database has been initialized
let databaseInitialized = false;

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Initialize database only once or for API routes
  if (!databaseInitialized || req.nextUrl.pathname.startsWith("/api/")) {
    try {
      await getOrCreateDatabase();
      databaseInitialized = true;
      console.log("Database initialization completed in middleware");
    } catch (error) {
      console.error("Database initialization failed in middleware:", error);
    }
  }

  const { userId } = await auth();

  // Auto-login: If user has valid session and is on auth pages, redirect to appropriate dashboard
  if (userId && isAuthRoute(req)) {
    try {
      const user = await currentUser();
      if (user) {
        const userRole = getRoleFromUser(user) || "customer"; // Default to customer if no role
        const dashboardRoute = getDashboardRoute(userRole);
        return NextResponse.redirect(new URL(dashboardRoute, req.url));
      }
    } catch (error) {
      console.error("Error getting user role for auto-redirect:", error);
      // Continue to normal flow if there's an error
    }
  }

  // Redirect to sign-in if not authenticated and accessing protected route
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Government-only routes access control
  if (isGovernmentOnlyRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    try {
      const user = await currentUser();
      if (!user) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      const userRole = getRoleFromUser(user);
      
      // Only government users can access manager routes
      if (userRole !== "government") {
        // Redirect non-government users to access denied page
        return NextResponse.redirect(new URL("/access-denied", req.url));
      }
    } catch (error) {
      console.error("Error checking user role for government route:", error);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
