import { db, ProjectComplianceCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createProjectComplianceCollection() {
  try {
    // 1. Check if collection exists
    try {
      await databases.getCollection(db, ProjectComplianceCollection);
      console.log(
        `✅ Collection '${ProjectComplianceCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${ProjectComplianceCollection}' not found, creating new one...`
      );
    }

    // 2. Create collection
    await databases.createCollection(
      db,
      ProjectComplianceCollection,
      ProjectComplianceCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${ProjectComplianceCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Project Compliance...");
    await databases.createStringAttribute(
      db,
      ProjectComplianceCollection,
      "projectId",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      ProjectComplianceCollection,
      "env_clearance_status",
      100,
      false
    );
    await databases.createBooleanAttribute(
      db,
      ProjectComplianceCollection,
      "lca_completed",
      false,
      false
    );
    await databases.createBooleanAttribute(
      db,
      ProjectComplianceCollection,
      "mrv_plan",
      false,
      false
    );
    console.log("✅ All Project Compliance attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Project Compliance...");
    await databases.createIndex(
      db,
      ProjectComplianceCollection,
      "projectId_index",
      IndexType.Key,
      ["projectId"]
    );
    console.log("✅ All Project Compliance indexes created.");
  } catch (error) {
    console.error("Error creating project compliance collection:", error);
    throw error;
  }
}
