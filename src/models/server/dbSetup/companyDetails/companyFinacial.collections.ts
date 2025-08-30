import { db, CompanyFinancialsCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createCompanyFinancialsCollection() {
  try {
    // 1. Check if the collection already exists
    try {
      await databases.getCollection(db, CompanyFinancialsCollection);
      console.log(
        `✅ Collection '${CompanyFinancialsCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${CompanyFinancialsCollection}' not found, creating new one...`
      );
    }

    // 2. Create the collection
    await databases.createCollection(
      db,
      CompanyFinancialsCollection,
      CompanyFinancialsCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${CompanyFinancialsCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Company Financials...");
    await databases.createStringAttribute(
      db,
      CompanyFinancialsCollection,
      "companyId",
      255,
      true
    );
    await databases.createFloatAttribute(
      db,
      CompanyFinancialsCollection,
      "annual_revenue",
      false
    );
    await databases.createFloatAttribute(
      db,
      CompanyFinancialsCollection,
      "net_worth",
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyFinancialsCollection,
      "credit_rating",
      50,
      false
    );
    await databases.createFloatAttribute(
      db,
      CompanyFinancialsCollection,
      "past_project_success_rate",
      false
    );
    console.log("✅ All Company Financials attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Company Financials...");
    await databases.createIndex(
      db,
      CompanyFinancialsCollection,
      "companyId_index",
      IndexType.Key,
      ["companyId"]
    );
    console.log("✅ All Company Financials indexes created.");
  } catch (error) {
    console.error("Error creating company financials collection:", error);
    throw error;
  }
}
