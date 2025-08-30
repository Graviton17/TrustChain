const env = {
  appwrite: {
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    APIKey: String(process.env.APPWRITE_PROJECT_API_KEY),
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  },

  google: {
    clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
  },

  clerk: {
    clerkPublishableKey: String(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    clerkSecretKey: String(process.env.CLERK_SECRET_KEY),
    clerkSignUpUrl: String(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL),
    clerkSignUpFallbackRedirectUrl:
      String(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL),
    clerkSignInFallbackRedirectUrl:
      String(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL),
  },
};

export default env;
