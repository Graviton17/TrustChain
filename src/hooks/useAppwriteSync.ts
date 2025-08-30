/**
 * Hook for managing Appwrite sync status
 */

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  checkSyncStatus,
  syncUserToAppwrite,
  SyncedUser,
} from "@/utils/appwriteSync";

export function useAppwriteSync() {
  const { user, isSignedIn } = useUser();
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const [appwriteUser, setAppwriteUser] = useState<SyncedUser | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check sync status when user signs in
  useEffect(() => {
    const checkSync = async () => {
      if (!isSignedIn || !user) {
        setIsSynced(false);
        setAppwriteUser(null);
        return;
      }

      setIsChecking(true);
      setError(null);

      try {
        const result = await checkSyncStatus();
        setIsSynced(result.synced);
        setAppwriteUser(result.user || null);

        if (result.error) {
          setError(result.error);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to check sync status"
        );
      } finally {
        setIsChecking(false);
      }
    };

    checkSync();
  }, [isSignedIn, user]);

  // Function to manually trigger sync
  const triggerSync = async () => {
    if (!isSignedIn || !user) {
      setError("User not signed in");
      return false;
    }

    setIsSyncing(true);
    setError(null);

    try {
      const result = await syncUserToAppwrite();

      if (result.success) {
        setIsSynced(true);
        setAppwriteUser(result.user || null);
        return true;
      } else {
        setError(result.error || "Sync failed");
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed");
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isSynced,
    appwriteUser,
    isChecking,
    isSyncing,
    error,
    triggerSync,
  };
}
