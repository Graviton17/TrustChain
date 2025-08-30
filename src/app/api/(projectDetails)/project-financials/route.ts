import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, ProjectFinancialsCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  ProjectFinancials,
  CreateProjectFinancialsRequest,
  UpdateProjectFinancialsRequest,
  ProjectApiResponse,
  ProjectListResponse,
  ProjectQueryParams,
} from "@/types/project";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateProjectFinancialsRequest
): string | null {
  if (!data.projectId?.trim()) {
    return "projectId is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateProjectFinancialsRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// Helper function to validate financial data
function validateFinancialData(
  data: CreateProjectFinancialsRequest | UpdateProjectFinancialsRequest
): string | null {
  if (data.capex !== undefined && data.capex < 0) {
    return "CAPEX must be non-negative";
  }
  if (data.opex !== undefined && data.opex < 0) {
    return "OPEX must be non-negative";
  }
  return null;
}

// POST - Create new project financials
export async function POST(request: NextRequest) {
  try {
    const body: CreateProjectFinancialsRequest = await request.json();

    // Validate required fields
    const validationError = validateCreateRequest(body);
    if (validationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: validationError,
        },
        { status: 400 }
      );
    }

    // Validate financial data
    const financialValidationError = validateFinancialData(body);
    if (financialValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: financialValidationError,
        },
        { status: 400 }
      );
    }

    // Check if project already has financial data
    try {
      const existingFinancials = await databases.listDocuments(
        db,
        ProjectFinancialsCollection,
        [Query.equal("projectId", body.projectId)]
      );

      if (existingFinancials.documents.length > 0) {
        return NextResponse.json<ProjectApiResponse>(
          {
            success: false,
            error: "Project already has financial data. Use PUT to update.",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Error checking existing financials:", error);
    }

    // Create the project financials
    const newFinancials = await databases.createDocument(
      db,
      ProjectFinancialsCollection,
      "unique()",
      {
        projectId: body.projectId,
        capex: body.capex || null,
        opex: body.opex || null,
        offtake_signed: body.offtake_signed || false,
      }
    );

    return NextResponse.json<ProjectApiResponse<ProjectFinancials>>(
      {
        success: true,
        data: newFinancials as unknown as ProjectFinancials,
        message: "Project financials created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project financials:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to create project financials",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve project financials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params: ProjectQueryParams = {
      projectId: searchParams.get("projectId") || undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 25,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
    };

    const queries: string[] = [];

    // Build query conditions
    if (params.projectId) {
      queries.push(Query.equal("projectId", params.projectId));
    }

    // Add pagination
    if (params.limit) {
      queries.push(Query.limit(params.limit));
    }
    if (params.offset) {
      queries.push(Query.offset(params.offset));
    }

    // Execute query
    const result = await databases.listDocuments(
      db,
      ProjectFinancialsCollection,
      queries
    );

    return NextResponse.json<ProjectListResponse<ProjectFinancials>>({
      success: true,
      data: result.documents as unknown as ProjectFinancials[],
      total: result.total,
      message: "Project financials retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving project financials:", error);
    return NextResponse.json<ProjectListResponse>(
      {
        success: false,
        error: "Failed to retrieve project financials",
      },
      { status: 500 }
    );
  }
}

// PUT - Update project financials
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateProjectFinancialsRequest = await request.json();

    // Validate required fields
    const validationError = validateUpdateRequest(body);
    if (validationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: validationError,
        },
        { status: 400 }
      );
    }

    // Validate financial data
    const financialValidationError = validateFinancialData(body);
    if (financialValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: financialValidationError,
        },
        { status: 400 }
      );
    }

    // Extract the ID and remove it from the update data
    const { $id, ...updateData } = body;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([, value]) => value !== undefined)
    );

    // Update the document
    const updatedFinancials = await databases.updateDocument(
      db,
      ProjectFinancialsCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<ProjectApiResponse<ProjectFinancials>>({
      success: true,
      data: updatedFinancials as unknown as ProjectFinancials,
      message: "Project financials updated successfully",
    });
  } catch (error) {
    console.error("Error updating project financials:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to update project financials",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete project financials
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const financialsId = searchParams.get("id");

    if (!financialsId) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Financials ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(
      db,
      ProjectFinancialsCollection,
      financialsId
    );

    return NextResponse.json<ProjectApiResponse>({
      success: true,
      message: "Project financials deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project financials:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to delete project financials",
      },
      { status: 500 }
    );
  }
}
