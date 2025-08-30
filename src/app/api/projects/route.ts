import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, ProjectsCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectApiResponse,
  ProjectListResponse,
  ProjectQueryParams,
} from "@/types/project";

// Helper function to validate required fields
function validateCreateRequest(data: CreateProjectRequest): string | null {
  if (!data.companyId?.trim()) {
    return "companyId is required";
  }
  if (!data.project_name?.trim()) {
    return "project_name is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(data: UpdateProjectRequest): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// Helper function to validate project data
function validateProjectData(
  data: CreateProjectRequest | UpdateProjectRequest
): string | null {
  if (data.start_year !== undefined && data.start_year < 1900) {
    return "Start year must be after 1900";
  }
  if (data.completion_year !== undefined && data.completion_year < 1900) {
    return "Completion year must be after 1900";
  }
  if (
    data.start_year !== undefined &&
    data.completion_year !== undefined &&
    data.start_year > data.completion_year
  ) {
    return "Start year cannot be after completion year";
  }
  return null;
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body: CreateProjectRequest = await request.json();

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

    // Validate project data
    const projectValidationError = validateProjectData(body);
    if (projectValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: projectValidationError,
        },
        { status: 400 }
      );
    }

    // Create the project
    const newProject = await databases.createDocument(
      db,
      ProjectsCollection,
      "unique()",
      {
        companyId: body.companyId,
        project_name: body.project_name,
        sector: body.sector || null,
        location: body.location || null,
        ownership_type: body.ownership_type || null,
        start_year: body.start_year || null,
        completion_year: body.completion_year || null,
        selected_subsidy: body.selected_subsidy || null,
      }
    );

    return NextResponse.json<ProjectApiResponse<Project>>(
      {
        success: true,
        data: newProject as unknown as Project,
        message: "Project created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to create project",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params: ProjectQueryParams = {
      companyId: searchParams.get("companyId") || undefined,
      sector: searchParams.get("sector") || undefined,
      location: searchParams.get("location") || undefined,
      ownership_type: searchParams.get("ownership_type") || undefined,
      start_year: searchParams.get("start_year")
        ? parseInt(searchParams.get("start_year")!)
        : undefined,
      completion_year: searchParams.get("completion_year")
        ? parseInt(searchParams.get("completion_year")!)
        : undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 25,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
    };

    const queries: string[] = [];

    // Build query conditions
    if (params.companyId) {
      queries.push(Query.equal("companyId", params.companyId));
    }
    if (params.sector) {
      queries.push(Query.equal("sector", params.sector));
    }
    if (params.location) {
      queries.push(Query.equal("location", params.location));
    }
    if (params.ownership_type) {
      queries.push(Query.equal("ownership_type", params.ownership_type));
    }
    if (params.start_year) {
      queries.push(Query.equal("start_year", params.start_year));
    }
    if (params.completion_year) {
      queries.push(Query.equal("completion_year", params.completion_year));
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
      ProjectsCollection,
      queries
    );

    return NextResponse.json<ProjectListResponse<Project>>({
      success: true,
      data: result.documents as unknown as Project[],
      total: result.total,
      message: "Projects retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json<ProjectListResponse>(
      {
        success: false,
        error: "Failed to retrieve projects",
      },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateProjectRequest = await request.json();

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

    // Validate project data
    const projectValidationError = validateProjectData(body);
    if (projectValidationError) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: projectValidationError,
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
    const updatedProject = await databases.updateDocument(
      db,
      ProjectsCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<ProjectApiResponse<Project>>({
      success: true,
      data: updatedProject as unknown as Project,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to update project",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Project ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(db, ProjectsCollection, projectId);

    return NextResponse.json<ProjectApiResponse>({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
