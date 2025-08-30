"use client";

import React, { useState, useEffect } from "react";
import Logo from "@/components/logo";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isValidEmail, getAuthErrorMessage } from "@/utils/clerkAuth";
import {
  getRoleFromUser,
  getDashboardRoute,
  getAllRoles,
  UserRole,
} from "@/utils/roles";
import { syncUserToAppwrite, checkSyncStatus } from "@/utils/appwriteSync";

function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user, isSignedIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if already signed in and sync with Appwrite
  useEffect(() => {
    const handleSignedInUser = async () => {
      if (isSignedIn && user) {
        // Check if user is synced with Appwrite
        try {
          const syncStatus = await checkSyncStatus();
          if (!syncStatus.synced) {
            // User not synced, attempt to sync
            await syncUserToAppwrite();
          }
        } catch (syncError) {
          console.error(
            "Error checking/syncing user with Appwrite:",
            syncError
          );
          // Continue with redirect even if sync fails
        }

        const userRole = getRoleFromUser(user);
        const roleToUse = userRole || selectedRole; // Use stored role or selected role as fallback
        const dashboardRoute = getDashboardRoute(roleToUse);
        router.push(dashboardRoute);
      }
    };

    handleSignedInUser();
  }, [isSignedIn, user, selectedRole, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signIn) return;

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        // The useEffect will handle the redirect based on user role
        // If no stored role exists, the selected role will be used as fallback
      } else {
        setError("Sign in failed. Please try again.");
      }
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      setError(
        getAuthErrorMessage(error) ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <Logo />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">Sign in to your TrustChain account</p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am signing in as
            </label>
            <div className="grid grid-cols-3 gap-2">
              {getAllRoles().map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                    selectedRole === role.value
                      ? "border-[#4573d2] bg-[#4573d2]/10 text-[#4573d2]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                  title={role.description}
                >
                  <div className="text-lg mb-1">{role.icon}</div>
                  <div className="text-xs font-medium">{role.label}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              This helps us direct you to the right dashboard
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-opacity-50 focus:border-[#2f64cd] transition-colors duration-200 text-gray-950"
                placeholder="Enter your email"
                required
                suppressHydrationWarning
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-opacity-50 focus:border-[#2f64cd] transition-colors duration-200 text-gray-950"
                placeholder="Enter your password"
                required
                suppressHydrationWarning
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#4573d2] hover:bg-[#2f64cd]"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="font-medium text-[#4573d2] hover:text-[#2f64cd] hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
