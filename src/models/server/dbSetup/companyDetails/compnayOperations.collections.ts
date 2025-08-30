import { db, CompanyOperationsCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createCompanyOperationsCollection() {
  try {
    // 1. Check if collection exists
    try {
      await databases.getCollection(db, CompanyOperationsCollection);
      console.log(
        `✅ Collection '${CompanyOperationsCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${CompanyOperationsCollection}' not found, creating new one...`
      );
    }

    // 2. Create collection
    await databases.createCollection(
      db,
      CompanyOperationsCollection,
      CompanyOperationsCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${CompanyOperationsCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Company Operations...");
    await databases.createStringAttribute(
      db,
      CompanyOperationsCollection,
      "companyId",
      255,
      true
    );
    await databases.createIntegerAttribute(
      db,
      CompanyOperationsCollection,
      "employees",
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyOperationsCollection,
      "headquarters_address",
      1000,
      false
    );
    console.log("✅ All Company Operations attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Company Operations...");
    await databases.createIndex(
      db,
      CompanyOperationsCollection,
      "companyId_index",
      IndexType.Key,
      ["companyId"]
    );
    console.log("✅ All Company Operations indexes created.");
  } catch (error) {
    console.error("Error creating company operations collection:", error);
    throw error;
  }
}
