import { db, InsurancePoliciesCollection } from "../../name"; // Adjust your import paths and names
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../config";

export default async function createInsurancePoliciesCollection() {
  try {
    // 1. Check if collection exists
    try {
      await databases.getCollection(db, InsurancePoliciesCollection);
      console.log(
        `✅ Collection '${InsurancePoliciesCollection}' already exists.`
      );
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) throw error;
      console.log(
        `Collection '${InsurancePoliciesCollection}' not found, creating new one...`
      );
    }

    // 2. Create collection
    await databases.createCollection(
      db,
      InsurancePoliciesCollection,
      InsurancePoliciesCollection,
      [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log(`✅ Collection '${InsurancePoliciesCollection}' created.`);

    // 3. Create attributes
    console.log("Creating attributes for Insurance Policies...");
    await databases.createStringAttribute(
      db,
      InsurancePoliciesCollection,
      "providerId",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      InsurancePoliciesCollection,
      "policy_name",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      InsurancePoliciesCollection,
      "policy_type",
      100,
      true
    ); // e.g., National, State-Level
    await databases.createStringAttribute(
      db,
      InsurancePoliciesCollection,
      "target_region",
      100,
      false
    ); // e.g., Gujarat
    await databases.createStringAttribute(
      db,
      InsurancePoliciesCollection,
      "description",
      2000,
      false
    );
    await databases.createStringAttribute(
      db,
      InsurancePoliciesCollection,
      "total_outlay_covered",
      255,
      false
    );
    await databases.createStringAttribute(
      db,
      InsurancePoliciesCollection,
      "eligibility_summary",
      5000,
      false
    ); // New: For eligibility criteria
    await databases.createUrlAttribute(
      db,
      InsurancePoliciesCollection,
      "terms_url",
      false
    ); // New: Link to full terms & conditions
    console.log("✅ All Insurance Policies attributes created.");

    // 4. Create indexes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Creating indexes for Insurance Policies...");
    await databases.createIndex(
      db,
      InsurancePoliciesCollection,
      "providerId_index",
      IndexType.Key,
      ["providerId"]
    );
    await databases.createIndex(
      db,
      InsurancePoliciesCollection,
      "policy_type_index",
      IndexType.Key,
      ["policy_type"]
    );
    await databases.createIndex(
      db,
      InsurancePoliciesCollection,
      "target_region_index",
      IndexType.Key,
      ["target_region"]
    );
    console.log("✅ All Insurance Policies indexes created.");
  } catch (error) {
    console.error("Error creating insurance policies collection:", error);
    throw error;
  }
}
