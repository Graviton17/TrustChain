import { db, ProjectFinancialsCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createProjectFinancialsCollection() {
  try {
    // 1. Check if collection exists
    try {
      await databases.getCollection(db, ProjectFinancialsCollection);
      console.log(
        `✅ Collection '${ProjectFinancialsCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${ProjectFinancialsCollection}' not found, creating new one...`
      );
    }

    // 2. Create collection
    await databases.createCollection(
      db,
      ProjectFinancialsCollection,
      ProjectFinancialsCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${ProjectFinancialsCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Project Financials & Commercial...");
    await databases.createStringAttribute(
      db,
      ProjectFinancialsCollection,
      "projectId",
      255,
      true
    );
    await databases.createFloatAttribute(
      db,
      ProjectFinancialsCollection,
      "capex",
      false
    );
    await databases.createFloatAttribute(
      db,
      ProjectFinancialsCollection,
      "opex",
      false
    );
    await databases.createBooleanAttribute(
      db,
      ProjectFinancialsCollection,
      "offtake_signed",
      false,
      false
    );
    console.log("✅ All Project Financials & Commercial attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Project Financials & Commercial...");
    await databases.createIndex(
      db,
      ProjectFinancialsCollection,
      "projectId_index",
      IndexType.Key,
      ["projectId"]
    );
    console.log("✅ All Project Financials & Commercial indexes created.");
  } catch (error) {
    console.error(
      "Error creating project financials & commercial collection:",
      error
    );
    throw error;
  }
}
