import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, SubsidiesCollection } from "@/models/name";
import { Query } from "node-appwrite";

// Interface for Subsidy data
interface SubsidyData {
  name: string;
  country: string;
  region?: string;
  governingBody?: string;
  programType: string;
  status: string;
  description?: string;
  totalBudget?: string;
  incentiveDetails: string; // JSON string
  eligibility: string; // JSON string
  applicationProcess?: string; // JSON string
  resourceLinks?: string; // JSON string
  aiTriggers?: string; // JSON string
  sectors?: string[]; // Array of sectors
}

// GET - Fetch subsidies with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get("country");
    const region = searchParams.get("region");
    const programType = searchParams.get("programType");
    const status = searchParams.get("status");
    const sector = searchParams.get("sector");
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
    if (sector) {
      queries.push(Query.contains("sectors", sector));
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
      eligibility: JSON.parse(doc.eligibility || "{}"),
      applicationProcess: JSON.parse(doc.applicationProcess || "{}"),
      resourceLinks: JSON.parse(doc.resourceLinks || "{}"),
      aiTriggers: JSON.parse(doc.aiTriggers || "{}"),
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
    const body: SubsidyData = await request.json();

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

    // Validate and parse JSON fields
    let incentiveDetails,
      eligibility,
      applicationProcess,
      resourceLinks,
      aiTriggers;

    try {
      incentiveDetails =
        typeof body.incentiveDetails === "string"
          ? body.incentiveDetails
          : JSON.stringify(body.incentiveDetails);
      eligibility =
        typeof body.eligibility === "string"
          ? body.eligibility
          : JSON.stringify(body.eligibility);
      applicationProcess =
        typeof body.applicationProcess === "string"
          ? body.applicationProcess
          : JSON.stringify(body.applicationProcess || {});
      resourceLinks =
        typeof body.resourceLinks === "string"
          ? body.resourceLinks
          : JSON.stringify(body.resourceLinks || {});
      aiTriggers =
        typeof body.aiTriggers === "string"
          ? body.aiTriggers
          : JSON.stringify(body.aiTriggers || {});
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body fields",
        },
        { status: 400 }
      );
    }

    const subsidyData = {
      name: body.name,
      country: body.country,
      region: body.region || "",
      governingBody: body.governingBody || "",
      programType: body.programType,
      status: body.status,
      description: body.description || "",
      totalBudget: body.totalBudget || "",
      incentiveDetails,
      eligibility,
      applicationProcess,
      resourceLinks,
      aiTriggers,
      sectors: body.sectors || [],
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
        eligibility: JSON.parse(response.eligibility || "{}"),
        applicationProcess: JSON.parse(response.applicationProcess || "{}"),
        resourceLinks: JSON.parse(response.resourceLinks || "{}"),
        aiTriggers: JSON.parse(response.aiTriggers || "{}"),
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

    const body: Partial<SubsidyData> = await request.json();

    // Prepare update data, converting objects to JSON strings where needed
    const updateData: Record<string, unknown> = { ...body };

    if (body.incentiveDetails) {
      updateData.incentiveDetails =
        typeof body.incentiveDetails === "string"
          ? body.incentiveDetails
          : JSON.stringify(body.incentiveDetails);
    }
    if (body.eligibility) {
      updateData.eligibility =
        typeof body.eligibility === "string"
          ? body.eligibility
          : JSON.stringify(body.eligibility);
    }
    if (body.applicationProcess) {
      updateData.applicationProcess =
        typeof body.applicationProcess === "string"
          ? body.applicationProcess
          : JSON.stringify(body.applicationProcess);
    }
    if (body.resourceLinks) {
      updateData.resourceLinks =
        typeof body.resourceLinks === "string"
          ? body.resourceLinks
          : JSON.stringify(body.resourceLinks);
    }
    if (body.aiTriggers) {
      updateData.aiTriggers =
        typeof body.aiTriggers === "string"
          ? body.aiTriggers
          : JSON.stringify(body.aiTriggers);
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
        eligibility: JSON.parse(response.eligibility || "{}"),
        applicationProcess: JSON.parse(response.applicationProcess || "{}"),
        resourceLinks: JSON.parse(response.resourceLinks || "{}"),
        aiTriggers: JSON.parse(response.aiTriggers || "{}"),
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
