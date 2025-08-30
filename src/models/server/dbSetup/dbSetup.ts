import { databases } from "../config";
import { db } from "../../name";
import createUsersCollection from "./user.collections";
import createSubsidiesCollection from "./subsidies.collection";

export default async function getOrCreateDatabase() {
  try {
    await databases.get(db);
    console.log("Database already exists.");
  } catch (error) {
    console.warn("Database not found, creating a new one...", error);

    try {
      await databases.create(db, db);
      console.log("Database created successfully.");

      await Promise.all([
        createUsersCollection(),
        createSubsidiesCollection(),
      ]);
      console.log("Collections created successfully.");
    } catch (createError) {
      console.error("Failed to create database:", createError);
      throw createError; // Re-throw to handle in calling code
    }
  }

  console.log("Database connected successfully.");
  return databases;
}
