import { db, SubsidiesCollection } from "../../name"; // Assuming 'name' exports your DB and Collection IDs
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../config"; // Assuming this is your Appwrite database client

export default async function createSubsidiesCollection() {
  try {
    // 1. Check if the collection already exists
    try {
      await databases.getCollection(db, SubsidiesCollection);
      console.log(`✅ Collection '${SubsidiesCollection}' already exists.`);
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) {
        throw error; // Re-throw if it's not a 'not found' error
      }
      console.log(
        `Collection '${SubsidiesCollection}' not found, creating new one...`
      );
    }

    // 2. Create the collection if it doesn't exist
    await databases.createCollection(
      db,
      SubsidiesCollection,
      SubsidiesCollection,
      [
        Permission.read("any"), // Subsidies are public data
        Permission.create("users"), // Logged-in users can create (or a specific role)
        Permission.update("users"), // Logged-in users can update
        Permission.delete("users"), // Logged-in users can delete
      ]
    );

    console.log(`✅ Collection '${SubsidiesCollection}' created successfully.`);

    // 3. Create attributes for the collection
    console.log("Creating attributes...");

    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "name",
      255,
      true
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "country",
      100,
      true
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "region",
      100,
      false
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "governingBody",
      255,
      false
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "programType",
      100,
      true
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "status",
      50,
      true
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "description",
      5000,
      false
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "totalBudget",
      100,
      false
    );

    // Attributes to store stringified JSON data
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "incentiveDetails",
      10000,
      true
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "eligibility",
      10000,
      true
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "applicationProcess",
      10000,
      false
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "resourceLinks",
      5000,
      false
    );
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "aiTriggers",
      5000,
      false
    );

    // Array attribute for sectors
    await databases.createStringAttribute(
      db,
      SubsidiesCollection,
      "sectors",
      100,
      false,
      undefined,
      true
    );

    console.log("✅ All attributes created successfully!");

    // Wait a moment for attributes to be fully available before indexing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 4. Create indexes for querying
    console.log("Creating indexes...");

    await databases.createIndex(
      db,
      SubsidiesCollection,
      "country_index",
      IndexType.Key,
      ["country"]
    );
    await databases.createIndex(
      db,
      SubsidiesCollection,
      "region_index",
      IndexType.Key,
      ["region"]
    );
    await databases.createIndex(
      db,
      SubsidiesCollection,
      "programType_index",
      IndexType.Key,
      ["programType"]
    );
    await databases.createIndex(
      db,
      SubsidiesCollection,
      "status_index",
      IndexType.Key,
      ["status"]
    );
    await databases.createIndex(
      db,
      SubsidiesCollection,
      "sectors_index",
      IndexType.Key,
      ["sectors"]
    );

    console.log("✅ All indexes created successfully!");
  } catch (error) {
    console.error("Error creating subsidies collection:", error);
    throw error;
  }
}
