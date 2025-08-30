import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { databases } from "@/models/server/config";
import { db, UsersCollection } from "@/models/name";
import { getRoleFromUser } from "@/utils/roles";
import { ID, Query } from "node-appwrite";

export async function POST() {
  try {
    // Get the current user from Clerk
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Extract user role from metadata
    const userRole = getRoleFromUser(user);

    if (!userRole) {
      return NextResponse.json(
        { error: "User role not found" },
        { status: 400 }
      );
    }

    // Check if user already exists in Appwrite
    const existingUsers = await databases.listDocuments(db, UsersCollection, [
      Query.equal("clerkId", user.id),
    ]);

    const existingUser = existingUsers.documents[0];

    if (existingUser) {
      // User already exists, update if needed
      const updateData = {
        user_email: user.emailAddresses[0]?.emailAddress || "",
        role: userRole,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
      };

      const updatedUser = await databases.updateDocument(
        db,
        UsersCollection,
        existingUser.$id,
        updateData
      );

      return NextResponse.json({
        success: true,
        message: "User updated in Appwrite",
        user: {
          id: updatedUser.$id,
          clerkId: user.id,
          email: updatedUser.user_email,
          role: updatedUser.role,
          firstName: updatedUser.first_name,
          lastName: updatedUser.last_name,
        },
      });
    } else {
      // Create new user in Appwrite
      const userData = {
        clerkId: user.id,
        user_email: user.emailAddresses[0]?.emailAddress || "",
        role: userRole,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        status: "active",
      };

      const newUser = await databases.createDocument(
        db,
        UsersCollection,
        ID.unique(),
        userData
      );

      return NextResponse.json({
        success: true,
        message: "User synced to Appwrite successfully",
        user: {
          id: newUser.$id,
          clerkId: user.id,
          email: newUser.user_email,
          role: newUser.role,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
        },
      });
    }
  } catch (error) {
    console.error("Error syncing user to Appwrite:", error);

    return NextResponse.json(
      {
        error: "Failed to sync user to Appwrite",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const existingUsers = await databases.listDocuments(db, UsersCollection, [
      Query.equal("clerkId", user.id),
    ]);

    const appwriteUser = existingUsers.documents[0];

    return NextResponse.json({
      synced: !!appwriteUser,
      user: appwriteUser
        ? {
            id: appwriteUser.$id,
            clerkId: user.id,
            email: appwriteUser.user_email,
            role: appwriteUser.role,
            firstName: appwriteUser.first_name,
            lastName: appwriteUser.last_name,
          }
        : null,
    });
  } catch (error) {
    console.error("Error checking sync status:", error);

    return NextResponse.json(
      {
        error: "Failed to check sync status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
