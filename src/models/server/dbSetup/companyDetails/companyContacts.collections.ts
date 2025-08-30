import { db, CompanyContactsCollection } from "../../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../../config";

export default async function createCompanyContactsCollection() {
  try {
    // 1. Check if collection exists
    try {
      await databases.getCollection(db, CompanyContactsCollection);
      console.log(
        `✅ Collection '${CompanyContactsCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${CompanyContactsCollection}' not found, creating new one...`
      );
    }

    // 2. Create collection
    await databases.createCollection(
      db,
      CompanyContactsCollection,
      CompanyContactsCollection,
      [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${CompanyContactsCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Company Contacts...");
    await databases.createStringAttribute(
      db,
      CompanyContactsCollection,
      "companyId",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      CompanyContactsCollection,
      "contact_person_name",
      255,
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyContactsCollection,
      "contact_person_designation",
      255,
      false
    );
    await databases.createEmailAttribute(
      db,
      CompanyContactsCollection,
      "contact_email",
      false
    );
    await databases.createStringAttribute(
      db,
      CompanyContactsCollection,
      "contact_phone",
      50,
      false
    );
    console.log("✅ All Company Contacts attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Company Contacts...");
    await databases.createIndex(
      db,
      CompanyContactsCollection,
      "companyId_index",
      IndexType.Key,
      ["companyId"]
    );
    console.log("✅ All Company Contacts indexes created.");
  } catch (error) {
    console.error("Error creating company contacts collection:", error);
    throw error;
  }
}
