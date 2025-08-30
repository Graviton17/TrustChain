/**
 * Utility functions for Clerk authentication
 * CAPTCHA is handled automatically by Clerk when bot protection is enabled
 */

export interface AuthError {
  errors?: Array<{ message: string }>;
}

export function getAuthErrorMessage(error: unknown): string {
  const clerkError = error as AuthError;
  if (clerkError.errors?.[0]?.message) {
    return clerkError.errors[0].message;
  }
  return "An error occurred. Please try again.";
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password requirements
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Get password requirements text
 */
export function getPasswordRequirements(): string {
  return "Password must be at least 8 characters long";
}
