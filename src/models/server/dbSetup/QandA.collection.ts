import { db, QandACollection } from "../../name"; // Assuming 'name' exports your DB and Collection IDs
import { Permission, IndexType } from "node-appwrite";
import { databases } from "../config"; // Assuming this is your Appwrite database client

export default async function createQandACollection() {
  try {
    // 1. Check if the collection already exists
    try {
      await databases.getCollection(db, QandACollection);
      console.log(`✅ Collection '${QandACollection}' already exists.`);
      return;
    } catch (error: unknown) {
      const appwriteError = error as { code?: number };
      if (appwriteError.code !== 404) {
        throw error; // Re-throw if it's not a 'not found' error
      }
      console.log(
        `Collection '${QandACollection}' not found, creating new one...`
      );
    }

    // 2. Create the collection if it doesn't exist
    await databases.createCollection(db, QandACollection, QandACollection, [
      Permission.read("any"), // Anyone can read questions and answers
      Permission.create("users"), // Only logged-in users can ask a question
      Permission.update("users"), // Users can edit their own questions, admins can add answers
      Permission.delete("users"), // Users can delete their own questions
    ]);

    console.log(`✅ Collection '${QandACollection}' created successfully.`);

    // 3. Create attributes for the collection
    console.log("Creating attributes for Q&A...");

    // The user who asked the question
    await databases.createStringAttribute(
      db,
      QandACollection,
      "userId",
      255,
      true
    );

    // Optional: Link the question to a specific subsidy
    await databases.createStringAttribute(
      db,
      QandACollection,
      "subsidyId",
      255,
      false
    );

    // The question text
    await databases.createStringAttribute(
      db,
      QandACollection,
      "question",
      5000,
      true
    );

    // The answer text, not required initially
    await databases.createStringAttribute(
      db,
      QandACollection,
      "answer",
      10000,
      false
    );

    // To track if the question has been answered
    await databases.createBooleanAttribute(
      db,
      QandACollection,
      "isAnswered",
      true,
      false
    );

    // To allow for upvoting questions
    await databases.createIntegerAttribute(
      db,
      QandACollection,
      "upvotes",
      false,
      0
    );

    console.log("✅ All Q&A attributes created successfully!");

    // Wait a moment for attributes to be fully available before indexing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 4. Create indexes for querying
    console.log("Creating indexes for Q&A...");

    await databases.createIndex(
      db,
      QandACollection,
      "userId_index",
      IndexType.Key,
      ["userId"]
    );
    await databases.createIndex(
      db,
      QandACollection,
      "subsidyId_index",
      IndexType.Key,
      ["subsidyId"]
    );
    await databases.createIndex(
      db,
      QandACollection,
      "isAnswered_index",
      IndexType.Key,
      ["isAnswered"]
    );

    console.log("✅ All Q&A indexes created successfully!");
  } catch (error) {
    console.error("Error creating Q&A collection:", error);
    throw error;
  }
}
