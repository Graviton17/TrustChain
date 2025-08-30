import { db, CompanyProfilesCollection } from "../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../config";

export default async function createCompanyProfilesCollection() {
  try {
    // 1. Check if the collection already exists
    try {
      await databases.getCollection(db, CompanyProfilesCollection);
      console.log(
        `✅ Collection '${CompanyProfilesCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${CompanyProfilesCollection}' not found, creating new one...`
      );
    }

    // 2. Create the main collection
    await databases.createCollection(
      db,
      CompanyProfilesCollection,
      CompanyProfilesCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"), // Consider more granular permissions in production
        Permission.delete("users"), // e.g., Permission.update('user:USER_ID')
      ]
    );
    console.log(`✅ Collection '${CompanyProfilesCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Company Profiles...");
    await databases.createStringAttribute(
      db,
      CompanyProfilesCollection,
      "userId",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      CompanyProfilesCollection,
      "company_name",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      CompanyProfilesCollection,
      "registration_number",
      255,
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyProfilesCollection,
      "company_type",
      100,
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyProfilesCollection,
      "company_size",
      100,
      false
    );
    await databases.createIntegerAttribute(
      db,
      CompanyProfilesCollection,
      "year_incorporation",
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyProfilesCollection,
      "country",
      100,
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyProfilesCollection,
      "state",
      100,
      false
    );
    await databases.createUrlAttribute(
      db,
      CompanyProfilesCollection,
      "website",
      false
    );
    console.log("✅ All Company Profiles attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Company Profiles...");
    await databases.createIndex(
      db,
      CompanyProfilesCollection,
      "userId_index",
      IndexType.Key,
      ["userId"]
    );
    await databases.createIndex(
      db,
      CompanyProfilesCollection,
      "country_index",
      IndexType.Key,
      ["country"]
    );
    await databases.createIndex(
      db,
      CompanyProfilesCollection,
      "company_size_index",
      IndexType.Key,
      ["company_size"]
    );
    console.log("✅ All Company Profiles indexes created.");
  } catch (error) {
    console.error("Error creating company profiles collection:", error);
    throw error;
  }
}
