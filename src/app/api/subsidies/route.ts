import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, SubsidiesCollection } from "@/models/name";
import { Query } from "node-appwrite";
import type { IncentiveDetails } from "@/types/subsidy";

/**
 * Interface for Subsidy input data (what the API receives from clients)
 * All complex fields are expected as objects and will be converted to JSON strings for database storage
 */
interface SubsidyInputData {
  name: string;
  country: string;
  region?: string;
  governingBody?: string;
  programType: string;
  status: string;
  description?: string;
  totalBudget?: string;
  incentiveDetails: IncentiveDetails; // Object input - will be stringified
} // GET - Fetch subsidies with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get("country");
    const region = searchParams.get("region");
    const programType = searchParams.get("programType");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "25");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build queries based on filters
    const queries = [];

    if (country) {
      queries.push(Query.equal("country", country));
    }
    if (region) {
      queries.push(Query.equal("region", region));
    }
    if (programType) {
      queries.push(Query.equal("programType", programType));
    }
    if (status) {
      queries.push(Query.equal("status", status));
    }

    // Add pagination
    queries.push(Query.limit(limit));
    queries.push(Query.offset(offset));

    const response = await databases.listDocuments(
      db,
      SubsidiesCollection,
      queries
    );

    // Parse JSON fields for each document
    const subsidies = response.documents.map((doc) => ({
      ...doc,
      incentiveDetails: JSON.parse(doc.incentiveDetails || "{}"),
    }));

    return NextResponse.json({
      success: true,
      data: subsidies,
      total: response.total,
      pagination: {
        limit,
        offset,
        hasMore: response.total > offset + limit,
      },
    });
  } catch (error) {
    console.error("Error fetching subsidies:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch subsidies",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST - Create a new subsidy
export async function POST(request: NextRequest) {
  try {
    const body: SubsidyInputData = await request.json();

    // Debug logging
    console.log("Received body:", JSON.stringify(body, null, 2));
    console.log("incentiveDetails:", body.incentiveDetails);

    // Validate required fields
    if (!body.name || !body.country || !body.programType || !body.status) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: name, country, programType, status",
        },
        { status: 400 }
      );
    }

    // Validate required complex fields
    if (!body.incentiveDetails) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required field: incentiveDetails",
        },
        { status: 400 }
      );
    }

    // Validate incentiveDetails structure
    if (
      !body.incentiveDetails.type ||
      !body.incentiveDetails.amount ||
      !body.incentiveDetails.currency
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "incentiveDetails must include type, amount, and currency",
        },
        { status: 400 }
      );
    }

    // Convert objects to JSON strings for storage
    const subsidyData = {
      name: body.name,
      country: body.country,
      region: body.region || "",
      governingBody: body.governingBody || "",
      programType: body.programType,
      status: body.status,
      description: body.description || "",
      totalBudget: body.totalBudget || "",
      incentiveDetails: JSON.stringify(body.incentiveDetails),
    };

    const response = await databases.createDocument(
      db,
      SubsidiesCollection,
      "unique()", // Auto-generate ID
      subsidyData
    );

    return NextResponse.json({
      success: true,
      data: {
        ...response,
        incentiveDetails: JSON.parse(response.incentiveDetails || "{}"),
      },
      message: "Subsidy created successfully",
    });
  } catch (error) {
    console.error("Error creating subsidy:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create subsidy",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT - Update an existing subsidy
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const documentId = searchParams.get("id");

    if (!documentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing subsidy ID",
        },
        { status: 400 }
      );
    }

    const body: Partial<SubsidyInputData> = await request.json();

    // Prepare update data, converting objects to JSON strings where needed
    const updateData: Record<string, unknown> = {};

    // Copy simple fields
    if (body.name) updateData.name = body.name;
    if (body.country) updateData.country = body.country;
    if (body.region !== undefined) updateData.region = body.region;
    if (body.governingBody !== undefined)
      updateData.governingBody = body.governingBody;
    if (body.programType) updateData.programType = body.programType;
    if (body.status) updateData.status = body.status;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.totalBudget !== undefined)
      updateData.totalBudget = body.totalBudget;

    // Convert complex fields to JSON strings
    if (body.incentiveDetails) {
      updateData.incentiveDetails = JSON.stringify(body.incentiveDetails);
    }

    const response = await databases.updateDocument(
      db,
      SubsidiesCollection,
      documentId,
      updateData
    );

    return NextResponse.json({
      success: true,
      data: {
        ...response,
        incentiveDetails: JSON.parse(response.incentiveDetails || "{}"),
      },
      message: "Subsidy updated successfully",
    });
  } catch (error) {
    console.error("Error updating subsidy:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update subsidy",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a subsidy
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const documentId = searchParams.get("id");

    if (!documentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing subsidy ID",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(db, SubsidiesCollection, documentId);

    return NextResponse.json({
      success: true,
      message: "Subsidy deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting subsidy:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete subsidy",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
