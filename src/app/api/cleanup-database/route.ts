import { NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, UsersCollection } from "@/models/name";

export async function DELETE() {
  try {
    console.log("Attempting to delete collection...");

    // Try to delete the collection
    await databases.deleteCollection(db, UsersCollection);
    console.log("Collection deleted successfully");

    // Try to delete the database
    await databases.delete(db);
    console.log("Database deleted successfully");

    return NextResponse.json({
      success: true,
      message: "Database and collection deleted successfully",
    });
  } catch (error) {
    console.error("Error during cleanup:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Cleanup failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use DELETE to cleanup database and collection",
  });
}
