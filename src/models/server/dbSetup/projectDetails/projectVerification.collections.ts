import { db, ProjectVerificationCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createProjectVerificationCollection() {
  try {
    // 1. Check if collection exists
    try {
      await databases.getCollection(db, ProjectVerificationCollection);
      console.log(
        `✅ Collection '${ProjectVerificationCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${ProjectVerificationCollection}' not found, creating new one...`
      );
    }

    // 2. Create collection
    await databases.createCollection(
      db,
      ProjectVerificationCollection,
      ProjectVerificationCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${ProjectVerificationCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Project Verification...");
    await databases.createStringAttribute(
      db,
      ProjectVerificationCollection,
      "projectId",
      255,
      true
    );
    await databases.createFloatAttribute(
      db,
      ProjectVerificationCollection,
      "carbon_intensity",
      false
    );
    await databases.createStringAttribute(
      db,
      ProjectVerificationCollection,
      "renewable_source",
      255,
      false
    );
    await databases.createBooleanAttribute(
      db,
      ProjectVerificationCollection,
      "additionality_proof",
      false,
      false
    );
    console.log("✅ All Project Verification attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Project Verification...");
    await databases.createIndex(
      db,
      ProjectVerificationCollection,
      "projectId_index",
      IndexType.Key,
      ["projectId"]
    );
    console.log("✅ All Project Verification indexes created.");
  } catch (error) {
    console.error("Error creating project verification collection:", error);
    throw error;
  }
}
