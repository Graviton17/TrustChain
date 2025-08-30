import { db, UsersCollection } from "../../name";
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../config";

export default async function createUsersCollection() {
  try {
    // Check if collection exists first
    try {
      await databases.getCollection(
        db,
        UsersCollection
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) {
        throw error;
      }
      console.log("Collection not found, creating new one...");
    }

    // Creating Collection
    await databases.createCollection(db, UsersCollection, UsersCollection, [
      Permission.read("any"),
      Permission.update("users"),
      Permission.delete("users"),
      Permission.create("users"),
      Permission.write("users"),
    ]);

    console.log(`✅ Profile collection created`);

    // Creating Attributes sequentially to avoid conflicts
    await databases.createStringAttribute(
      db,
      UsersCollection,
      "clerkId",
      255,
      true
    );

    await databases.createStringAttribute(
      db,
      UsersCollection,
      "user_email",
      255,
      true
    );

    await databases.createStringAttribute(
      db,
      UsersCollection,
      "first_name",
      100,
      false
    );

    await databases.createStringAttribute(
      db,
      UsersCollection,
      "last_name",
      100,
      false
    );

    await databases.createStringAttribute(
      db,
      UsersCollection,
      "role",
      50,
      true
    );

    console.log("Creating status attribute...");
    await databases.createStringAttribute(
      db,
      UsersCollection,
      "status",
      20,
      true
    );
    console.log("All attributes created successfully!");

    // Wait a bit for attributes to be ready
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Creating indexes...");

    // Create indexes sequentially to avoid conflicts
    console.log("Creating user_email unique index...");
    await databases.createIndex(
      db,
      UsersCollection,
      "user_email_unique",
      IndexType.Unique,
      ["user_email"]
    );

    console.log("Creating clerkId unique index...");
    await databases.createIndex(
      db,
      UsersCollection,
      "clerkId_unique",
      IndexType.Unique,
      ["clerkId"]
    );

    console.log("Creating role index...");
    await databases.createIndex(
      db,
      UsersCollection,
      "role_index",
      IndexType.Key,
      ["role"]
    );

    console.log("All indexes created successfully!");
  } catch (error) {
    console.error("Error creating profile collection:", error);
    throw error;
  }
}
