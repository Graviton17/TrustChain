import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, CompanyOperationsCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  CompanyOperations,
  CreateCompanyOperationsRequest,
  UpdateCompanyOperationsRequest,
  CompanyApiResponse,
  CompanyListResponse,
  CompanyQueryParams,
} from "@/types/company";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateCompanyOperationsRequest
): string | null {
  if (!data.companyId?.trim()) {
    return "companyId is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateCompanyOperationsRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// Helper function to validate operations data
function validateOperationsData(
  data: CreateCompanyOperationsRequest | UpdateCompanyOperationsRequest
): string | null {
  if (data.employees !== undefined && data.employees < 0) {
    return "Number of employees must be non-negative";
  }
  return null;
}

// POST - Create new company operations
export async function POST(request: NextRequest) {
  try {
    const body: CreateCompanyOperationsRequest = await request.json();

    // Validate required fields
    const validationError = validateCreateRequest(body);
    if (validationError) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: validationError,
        },
        { status: 400 }
      );
    }

    // Validate operations data
    const operationsValidationError = validateOperationsData(body);
    if (operationsValidationError) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: operationsValidationError,
        },
        { status: 400 }
      );
    }

    // Check if company already has operations data
    try {
      const existingOperations = await databases.listDocuments(
        db,
        CompanyOperationsCollection,
        [Query.equal("companyId", body.companyId)]
      );

      if (existingOperations.documents.length > 0) {
        return NextResponse.json<CompanyApiResponse>(
          {
            success: false,
            error: "Company already has operations data. Use PUT to update.",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Error checking existing operations:", error);
    }

    // Create the company operations
    const newOperations = await databases.createDocument(
      db,
      CompanyOperationsCollection,
      "unique()",
      {
        companyId: body.companyId,
        employees: body.employees || null,
        headquarters_address: body.headquarters_address || null,
      }
    );

    return NextResponse.json<CompanyApiResponse<CompanyOperations>>(
      {
        success: true,
        data: newOperations as unknown as CompanyOperations,
        message: "Company operations created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating company operations:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to create company operations",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve company operations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params: CompanyQueryParams = {
      companyId: searchParams.get("companyId") || undefined,
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
      CompanyOperationsCollection,
      queries
    );

    return NextResponse.json<CompanyListResponse<CompanyOperations>>({
      success: true,
      data: result.documents as unknown as CompanyOperations[],
      total: result.total,
      message: "Company operations retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving company operations:", error);
    return NextResponse.json<CompanyListResponse>(
      {
        success: false,
        error: "Failed to retrieve company operations",
      },
      { status: 500 }
    );
  }
}

// PUT - Update company operations
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCompanyOperationsRequest = await request.json();

    // Validate required fields
    const validationError = validateUpdateRequest(body);
    if (validationError) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: validationError,
        },
        { status: 400 }
      );
    }

    // Validate operations data
    const operationsValidationError = validateOperationsData(body);
    if (operationsValidationError) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: operationsValidationError,
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
    const updatedOperations = await databases.updateDocument(
      db,
      CompanyOperationsCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<CompanyApiResponse<CompanyOperations>>({
      success: true,
      data: updatedOperations as unknown as CompanyOperations,
      message: "Company operations updated successfully",
    });
  } catch (error) {
    console.error("Error updating company operations:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to update company operations",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete company operations
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const operationsId = searchParams.get("id");

    if (!operationsId) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Operations ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(
      db,
      CompanyOperationsCollection,
      operationsId
    );

    return NextResponse.json<CompanyApiResponse>({
      success: true,
      message: "Company operations deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company operations:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to delete company operations",
      },
      { status: 500 }
    );
  }
}
