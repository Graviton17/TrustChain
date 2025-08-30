/**
 * Utility functions for syncing users with Appwrite
 */

export interface SyncedUser {
  id: string;
  clerkId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export async function syncUserToAppwrite(): Promise<{
  success: boolean;
  user?: SyncedUser;
  error?: string;
}> {
  try {
    const response = await fetch("/api/sync-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to sync user");
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error("Error syncing user to Appwrite:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function checkSyncStatus(): Promise<{
  synced: boolean;
  user?: SyncedUser;
  error?: string;
}> {
  try {
    const response = await fetch("/api/sync-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to check sync status");
    }

    return {
      synced: data.synced,
      user: data.user,
    };
  } catch (error) {
    console.error("Error checking sync status:", error);
    return {
      synced: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
