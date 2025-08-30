import { NextResponse } from "next/server";
import getOrCreateDatabase from "@/models/server/dbSetup/dbSetup";

export async function POST() {
  try {
    console.log("Starting database setup...");
    await getOrCreateDatabase();

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
    });
  } catch (error) {
    console.error("Database setup failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Database setup failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to setup database",
  });
}
