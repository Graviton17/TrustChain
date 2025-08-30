import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, ProjectComplianceCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  ProjectCompliance,
  CreateProjectComplianceRequest,
  UpdateProjectComplianceRequest,
  ProjectApiResponse,
  ProjectListResponse,
  ProjectQueryParams,
} from "@/types/project";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateProjectComplianceRequest
): string | null {
  if (!data.projectId?.trim()) {
    return "projectId is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateProjectComplianceRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// POST - Create new project compliance
export async function POST(request: NextRequest) {
  try {
    const body: CreateProjectComplianceRequest = await request.json();

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

    // Check if project already has compliance data
    try {
      const existingCompliance = await databases.listDocuments(
        db,
        ProjectComplianceCollection,
        [Query.equal("projectId", body.projectId)]
      );

      if (existingCompliance.documents.length > 0) {
        return NextResponse.json<ProjectApiResponse>(
          {
            success: false,
            error: "Project already has compliance data. Use PUT to update.",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Error checking existing compliance:", error);
    }

    // Create the project compliance
    const newCompliance = await databases.createDocument(
      db,
      ProjectComplianceCollection,
      "unique()",
      {
        projectId: body.projectId,
        env_clearance_status: body.env_clearance_status || null,
        lca_completed: body.lca_completed || false,
        mrv_plan: body.mrv_plan || false,
      }
    );

    return NextResponse.json<ProjectApiResponse<ProjectCompliance>>(
      {
        success: true,
        data: newCompliance as unknown as ProjectCompliance,
        message: "Project compliance created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project compliance:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to create project compliance",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve project compliance
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
      ProjectComplianceCollection,
      queries
    );

    return NextResponse.json<ProjectListResponse<ProjectCompliance>>({
      success: true,
      data: result.documents as unknown as ProjectCompliance[],
      total: result.total,
      message: "Project compliance retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving project compliance:", error);
    return NextResponse.json<ProjectListResponse>(
      {
        success: false,
        error: "Failed to retrieve project compliance",
      },
      { status: 500 }
    );
  }
}

// PUT - Update project compliance
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateProjectComplianceRequest = await request.json();

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

    // Extract the ID and remove it from the update data
    const { $id, ...updateData } = body;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([, value]) => value !== undefined)
    );

    // Update the document
    const updatedCompliance = await databases.updateDocument(
      db,
      ProjectComplianceCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<ProjectApiResponse<ProjectCompliance>>({
      success: true,
      data: updatedCompliance as unknown as ProjectCompliance,
      message: "Project compliance updated successfully",
    });
  } catch (error) {
    console.error("Error updating project compliance:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to update project compliance",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete project compliance
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const complianceId = searchParams.get("id");

    if (!complianceId) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Compliance ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(
      db,
      ProjectComplianceCollection,
      complianceId
    );

    return NextResponse.json<ProjectApiResponse>({
      success: true,
      message: "Project compliance deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project compliance:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to delete project compliance",
      },
      { status: 500 }
    );
  }
}
