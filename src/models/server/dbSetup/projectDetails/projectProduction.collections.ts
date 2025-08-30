import { db, ProjectProductionCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createProjectProductionCollection() {
  try {
    // 1. Check if the collection already exists
    try {
      await databases.getCollection(db, ProjectProductionCollection);
      console.log(
        `✅ Collection '${ProjectProductionCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${ProjectProductionCollection}' not found, creating new one...`
      );
    }

    // 2. Create the collection
    await databases.createCollection(
      db,
      ProjectProductionCollection,
      ProjectProductionCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${ProjectProductionCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Project Production...");
    await databases.createStringAttribute(
      db,
      ProjectProductionCollection,
      "projectId",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      ProjectProductionCollection,
      "technology_used",
      100,
      false
    );
    await databases.createStringAttribute(
      db,
      ProjectProductionCollection,
      "electrolyzer_type",
      100,
      false
    );
    await databases.createFloatAttribute(
      db,
      ProjectProductionCollection,
      "installed_capacity_mw",
      false
    );
    await databases.createFloatAttribute(
      db,
      ProjectProductionCollection,
      "hydrogen_output_tpy",
      false
    );
    console.log("✅ All Project Production attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Project Production...");
    await databases.createIndex(
      db,
      ProjectProductionCollection,
      "projectId_index",
      IndexType.Key,
      ["projectId"]
    );
    console.log("✅ All Project Production indexes created.");
  } catch (error) {
    console.error("Error creating project production collection:", error);
    throw error;
  }
}
