const env = {
  appwrite: {
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    APIKey: process.env.APPWRITE_PROJECT_API_KEY,
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  },

  google: {
    clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
  },

  clerk: {
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    clerkSignUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    clerkSignUpFallbackRedirectUrl:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
    clerkSignInFallbackRedirectUrl:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
  },
};

export default env;
