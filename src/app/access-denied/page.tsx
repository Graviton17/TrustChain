"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getRoleFromUser, getDashboardRoute } from "@/utils/roles";
import { Shield, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccessDeniedPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  
  const userRole = user ? getRoleFromUser(user) : null;
  const dashboardRoute = userRole ? getDashboardRoute(userRole) : "/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <Shield className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this page. Only government users can access management features.
          </p>
          
          {userRole && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                You are currently signed in as: <span className="font-medium">{userRole}</span>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {isSignedIn && userRole ? (
            <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
              <Link href={dashboardRoute}>
                <Home className="w-4 h-4 mr-2" />
                Go to My Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
              <Link href="/sign-in">
                <Home className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <Button asChild variant="ghost" className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <p>
            If you believe this is an error, please contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
