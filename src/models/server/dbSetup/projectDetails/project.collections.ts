import { db, ProjectsCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createProjectsCollection() {
  try {
    // 1. Check if the collection already exists
    try {
      await databases.getCollection(db, ProjectsCollection);
      console.log(`✅ Collection '${ProjectsCollection}' already exists.`);
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${ProjectsCollection}' not found, creating new one...`
      );
    }

    // 2. Create the main collection
    await databases.createCollection(
      db,
      ProjectsCollection,
      ProjectsCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${ProjectsCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Projects...");
    await databases.createStringAttribute(
      db,
      ProjectsCollection,
      "companyId",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      ProjectsCollection,
      "project_name",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      ProjectsCollection,
      "sector",
      100,
      false
    );
    await databases.createStringAttribute(
      db,
      ProjectsCollection,
      "location",
      255,
      false
    );
    await databases.createStringAttribute(
      db,
      ProjectsCollection,
      "ownership_type",
      100,
      false
    );
    await databases.createIntegerAttribute(
      db,
      ProjectsCollection,
      "start_year",
      false
    );
    await databases.createIntegerAttribute(
      db,
      ProjectsCollection,
      "completion_year",
      false
    );
    await databases.createStringAttribute(
      db,
      ProjectsCollection,
      "selected_subsidy",
      255,
      false
    );
    console.log("✅ All Projects attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Projects...");
    await databases.createIndex(
      db,
      ProjectsCollection,
      "companyId_index",
      IndexType.Key,
      ["companyId"]
    );
    await databases.createIndex(
      db,
      ProjectsCollection,
      "sector_index",
      IndexType.Key,
      ["sector"]
    );
    console.log("✅ All Projects indexes created.");
  } catch (error) {
    console.error("Error creating projects collection:", error);
    throw error;
  }
}
