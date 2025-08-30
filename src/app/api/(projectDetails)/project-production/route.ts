import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, ProjectProductionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  ProjectProduction,
  CreateProjectProductionRequest,
  UpdateProjectProductionRequest,
  ProjectApiResponse,
  ProjectListResponse,
  ProjectQueryParams,
} from "@/types/project";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateProjectProductionRequest
): string | null {
  if (!data.projectId?.trim()) {
    return "projectId is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateProjectProductionRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// Helper function to validate production data
function validateProductionData(
  data: CreateProjectProductionRequest | UpdateProjectProductionRequest
): string | null {
  if (
    data.installed_capacity_mw !== undefined &&
    data.installed_capacity_mw < 0
  ) {
    return "Installed capacity must be non-negative";
  }
  if (data.hydrogen_output_tpy !== undefined && data.hydrogen_output_tpy < 0) {
    return "Hydrogen output must be non-negative";
  }
  return null;
}

// POST - Create new project production
export async function POST(request: NextRequest) {
  try {
    const body: CreateProjectProductionRequest = await request.json();

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

    // Validate production data
    const productionValidationError = validateProductionData(body);
    if (productionValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: productionValidationError,
        },
        { status: 400 }
      );
    }

    // Check if project already has production data
    try {
      const existingProduction = await databases.listDocuments(
        db,
        ProjectProductionCollection,
        [Query.equal("projectId", body.projectId)]
      );

      if (existingProduction.documents.length > 0) {
        return NextResponse.json<ProjectApiResponse>(
          {
            success: false,
            error: "Project already has production data. Use PUT to update.",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Error checking existing production:", error);
    }

    // Create the project production
    const newProduction = await databases.createDocument(
      db,
      ProjectProductionCollection,
      "unique()",
      {
        projectId: body.projectId,
        technology_used: body.technology_used || null,
        electrolyzer_type: body.electrolyzer_type || null,
        installed_capacity_mw: body.installed_capacity_mw || null,
        hydrogen_output_tpy: body.hydrogen_output_tpy || null,
      }
    );

    return NextResponse.json<ProjectApiResponse<ProjectProduction>>(
      {
        success: true,
        data: newProduction as unknown as ProjectProduction,
        message: "Project production created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project production:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to create project production",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve project production
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
      ProjectProductionCollection,
      queries
    );

    return NextResponse.json<ProjectListResponse<ProjectProduction>>({
      success: true,
      data: result.documents as unknown as ProjectProduction[],
      total: result.total,
      message: "Project production retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving project production:", error);
    return NextResponse.json<ProjectListResponse>(
      {
        success: false,
        error: "Failed to retrieve project production",
      },
      { status: 500 }
    );
  }
}

// PUT - Update project production
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateProjectProductionRequest = await request.json();

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

    // Validate production data
    const productionValidationError = validateProductionData(body);
    if (productionValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: productionValidationError,
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
    const updatedProduction = await databases.updateDocument(
      db,
      ProjectProductionCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<ProjectApiResponse<ProjectProduction>>({
      success: true,
      data: updatedProduction as unknown as ProjectProduction,
      message: "Project production updated successfully",
    });
  } catch (error) {
    console.error("Error updating project production:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to update project production",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete project production
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productionId = searchParams.get("id");

    if (!productionId) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Production ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(
      db,
      ProjectProductionCollection,
      productionId
    );

    return NextResponse.json<ProjectApiResponse>({
      success: true,
      message: "Project production deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project production:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to delete project production",
      },
      { status: 500 }
    );
  }
}
