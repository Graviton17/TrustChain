"use client";

import React, { useState } from "react";
import Logo from "@/components/logo";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  isValidEmail,
  isValidPassword,
  getPasswordRequirements,
  getAuthErrorMessage,
} from "@/utils/clerkAuth";
import {
  UserRole,
  getAllRoles,
  getDashboardRoute,
  getRoleConfig,
} from "@/utils/roles";
import { syncUserToAppwrite } from "@/utils/appwriteSync";

type SignUpStep = "initial" | "password" | "verify";

function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [currentStep, setCurrentStep] = useState<SignUpStep>("initial");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [isResending, setIsResending] = useState(false);

  const handleEmailContinue = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setCurrentStep("password");
    setError("");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signUp) return;

    if (!password) {
      setError("Please enter your password");
      return;
    }

    if (!isValidPassword(password)) {
      setError(getPasswordRequirements());
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        unsafeMetadata: {
          role: selectedRole,
        },
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setCurrentStep("verify");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      setError(
        getAuthErrorMessage(error) ||
          "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signUp) return;

    if (!code) {
      setError("Please enter the verification code");
      return;
    }

    if (code.length < 6) {
      setError("Verification code must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        // Sync user to Appwrite after successful verification
        try {
          const syncResult = await syncUserToAppwrite();
          if (!syncResult.success) {
            console.error("Failed to sync user to Appwrite:", syncResult.error);
            // Continue with redirect even if sync fails
          }
        } catch (syncError) {
          console.error("Error during Appwrite sync:", syncError);
          // Continue with redirect even if sync fails
        }

        // Redirect based on user role
        const dashboardRoute = getDashboardRoute(selectedRole);
        router.push(dashboardRoute);
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (error: unknown) {
      console.error("Verification error:", error);
      const errorMessage = getAuthErrorMessage(error);

      // Handle specific verification errors
      if (errorMessage.toLowerCase().includes("expired")) {
        setError("Verification code has expired. Please request a new one.");
      } else if (errorMessage.toLowerCase().includes("invalid")) {
        setError("Invalid verification code. Please check and try again.");
      } else {
        setError(
          errorMessage || "Invalid verification code. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToInitial = () => {
    setCurrentStep("initial");
    setError("");
    setPassword("");
  };

  const handleBackToPassword = () => {
    setCurrentStep("password");
    setError("");
    setCode("");
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp || isResending) return;

    setIsResending(true);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setError(""); // Clear any existing errors
      // Could show a success message here if needed
    } catch (error: unknown) {
      console.error("Resend error:", error);
      setError(
        getAuthErrorMessage(error) || "Failed to resend code. Please try again."
      );
    } finally {
      setIsResending(false);
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

          {currentStep === "initial" && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create your account
                </h1>
                <p className="text-gray-600">
                  Get started with TrustChain today
                </p>
              </div>
            </>
          )}

          {currentStep === "password" && (
            <>
              {/* Header for password step */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create your password
                </h1>
                <p className="text-gray-600">
                  Almost done! Just set up your password
                </p>
              </div>
            </>
          )}

          {currentStep === "initial" && (
            <>
              {/* Role Selector - Only show during email step */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your role
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
              </div>

              {/* Email Form */}
              <div className="space-y-4">
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

                <button
                  onClick={handleEmailContinue}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#4573d2] hover:bg-[#2f64cd]"
                >
                  {isLoading ? "Checking..." : "Continue with Email"}
                </button>
              </div>
            </>
          )}

          {currentStep === "password" && (
            <>
              <button
                onClick={handleBackToInitial}
                className="mb-4 flex items-center text-sm font-medium hover:underline text-[#2f64cd] hover:text-[#2f64cd]"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              {/* Selected Role Display */}
              <div className="mb-4 p-3 bg-gray-50 rounded-md border">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">
                    {getRoleConfig(selectedRole).icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    Signing up as: {getRoleConfig(selectedRole).label}
                  </span>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-opacity-50 focus:border-[#2f64cd] transition-colors duration-200 text-gray-950"
                    placeholder={`Enter your password`}
                    required
                    minLength={8}
                    suppressHydrationWarning
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#4573d2] hover:bg-[#2f64cd]"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            </>
          )}

          {currentStep === "verify" && (
            <>
              <button
                onClick={handleBackToPassword}
                className="mb-4 flex items-center text-sm font-medium hover:underline text-[#2f64cd] hover:text-[#2f64cd]"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Check your email
                </h3>
                <p className="text-sm text-gray-600">
                  We&apos;ve sent a verification code to{" "}
                  <strong>{email}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Verification code
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-opacity-50 focus:border-[#2f64cd] transition-colors duration-200 text-gray-950"
                    placeholder="Enter verification code"
                    required
                    suppressHydrationWarning
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#4573d2] hover:bg-[#2f64cd]"
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="w-full mt-2 py-2 px-4 rounded-md text-[#4573d2] font-medium border border-[#4573d2] hover:bg-[#4573d2] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4573d2] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? "Resending..." : "Resend Code"}
                </button>
              </form>
            </>
          )}

          {/* CAPTCHA Widget */}
          <div id="clerk-captcha" data-cl-theme="light"></div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-medium text-[#4573d2] hover:text-[#2f64cd] hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
