import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, ProjectVerificationCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  ProjectVerification,
  CreateProjectVerificationRequest,
  UpdateProjectVerificationRequest,
  ProjectApiResponse,
  ProjectListResponse,
  ProjectQueryParams,
} from "@/types/project";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateProjectVerificationRequest
): string | null {
  if (!data.projectId?.trim()) {
    return "projectId is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateProjectVerificationRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// Helper function to validate verification data
function validateVerificationData(
  data: CreateProjectVerificationRequest | UpdateProjectVerificationRequest
): string | null {
  if (data.carbon_intensity !== undefined && data.carbon_intensity < 0) {
    return "Carbon intensity must be non-negative";
  }
  return null;
}

// POST - Create new project verification
export async function POST(request: NextRequest) {
  try {
    const body: CreateProjectVerificationRequest = await request.json();

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

    // Validate verification data
    const verificationValidationError = validateVerificationData(body);
    if (verificationValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: verificationValidationError,
        },
        { status: 400 }
      );
    }

    // Check if project already has verification data
    try {
      const existingVerification = await databases.listDocuments(
        db,
        ProjectVerificationCollection,
        [Query.equal("projectId", body.projectId)]
      );

      if (existingVerification.documents.length > 0) {
        return NextResponse.json<ProjectApiResponse>(
          {
            success: false,
            error: "Project already has verification data. Use PUT to update.",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Error checking existing verification:", error);
    }

    // Create the project verification
    const newVerification = await databases.createDocument(
      db,
      ProjectVerificationCollection,
      "unique()",
      {
        projectId: body.projectId,
        carbon_intensity: body.carbon_intensity || null,
        renewable_source: body.renewable_source || null,
        additionality_proof: body.additionality_proof || false,
      }
    );

    return NextResponse.json<ProjectApiResponse<ProjectVerification>>(
      {
        success: true,
        data: newVerification as unknown as ProjectVerification,
        message: "Project verification created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project verification:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to create project verification",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve project verification
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
      ProjectVerificationCollection,
      queries
    );

    return NextResponse.json<ProjectListResponse<ProjectVerification>>({
      success: true,
      data: result.documents as unknown as ProjectVerification[],
      total: result.total,
      message: "Project verification retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving project verification:", error);
    return NextResponse.json<ProjectListResponse>(
      {
        success: false,
        error: "Failed to retrieve project verification",
      },
      { status: 500 }
    );
  }
}

// PUT - Update project verification
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateProjectVerificationRequest = await request.json();

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

    // Validate verification data
    const verificationValidationError = validateVerificationData(body);
    if (verificationValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: verificationValidationError,
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
    const updatedVerification = await databases.updateDocument(
      db,
      ProjectVerificationCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<ProjectApiResponse<ProjectVerification>>({
      success: true,
      data: updatedVerification as unknown as ProjectVerification,
      message: "Project verification updated successfully",
    });
  } catch (error) {
    console.error("Error updating project verification:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to update project verification",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete project verification
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const verificationId = searchParams.get("id");

    if (!verificationId) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Verification ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(
      db,
      ProjectVerificationCollection,
      verificationId
    );

    return NextResponse.json<ProjectApiResponse>({
      success: true,
      message: "Project verification deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project verification:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to delete project verification",
      },
      { status: 500 }
    );
  }
}
