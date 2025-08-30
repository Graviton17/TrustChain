import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import getOrCreateDatabase from "@/models/server/dbSetup/dbSetup";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/government-dashboard(.*)",
  "/producer-dashboard(.*)",
  "/customer-dashboard(.*)",
]);

// Flag to track if database has been initialized
let databaseInitialized = false;

export default clerkMiddleware(async (auth, req) => {
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

  // Redirect to sign-in if not authenticated and accessing protected route
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
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
