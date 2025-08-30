import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, CompanyProfilesCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  CompanyProfile,
  CreateCompanyProfileRequest,
  UpdateCompanyProfileRequest,
  CompanyApiResponse,
  CompanyListResponse,
  CompanyQueryParams,
} from "@/types/company";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateCompanyProfileRequest
): string | null {
  if (!data.userId?.trim()) {
    return "userId is required";
  }
  if (!data.company_name?.trim()) {
    return "company_name is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateCompanyProfileRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// POST - Create new company profile
export async function POST(request: NextRequest) {
  try {
    const body: CreateCompanyProfileRequest = await request.json();

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

    // Check if user already has a company profile
    try {
      const existingProfiles = await databases.listDocuments(
        db,
        CompanyProfilesCollection,
        [Query.equal("userId", body.userId)]
      );

      if (existingProfiles.documents.length > 0) {
        return NextResponse.json<CompanyApiResponse>(
          {
            success: false,
            error: "User already has a company profile",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Error checking existing profiles:", error);
    }

    // Create the company profile
    const newProfile = await databases.createDocument(
      db,
      CompanyProfilesCollection,
      "unique()",
      {
        userId: body.userId,
        company_name: body.company_name,
        registration_number: body.registration_number || null,
        company_type: body.company_type || null,
        company_size: body.company_size || null,
        year_incorporation: body.year_incorporation || null,
        country: body.country || null,
        state: body.state || null,
        website: body.website || null,
      }
    );

    return NextResponse.json<CompanyApiResponse<CompanyProfile>>(
      {
        success: true,
        data: newProfile as unknown as CompanyProfile,
        message: "Company profile created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating company profile:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to create company profile",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve company profiles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params: CompanyQueryParams = {
      userId: searchParams.get("userId") || undefined,
      country: searchParams.get("country") || undefined,
      company_size: searchParams.get("company_size") || undefined,
      company_type: searchParams.get("company_type") || undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 25,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
    };

    const queries: string[] = [];

    // Build query conditions
    if (params.userId) {
      queries.push(Query.equal("userId", params.userId));
    }
    if (params.country) {
      queries.push(Query.equal("country", params.country));
    }
    if (params.company_size) {
      queries.push(Query.equal("company_size", params.company_size));
    }
    if (params.company_type) {
      queries.push(Query.equal("company_type", params.company_type));
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
      CompanyProfilesCollection,
      queries
    );

    return NextResponse.json<CompanyListResponse<CompanyProfile>>({
      success: true,
      data: result.documents as unknown as CompanyProfile[],
      total: result.total,
      message: "Company profiles retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving company profiles:", error);
    return NextResponse.json<CompanyListResponse>(
      {
        success: false,
        error: "Failed to retrieve company profiles",
      },
      { status: 500 }
    );
  }
}

// PUT - Update company profile
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCompanyProfileRequest = await request.json();

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

    // Extract the ID and remove it from the update data
    const { $id, ...updateData } = body;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([, value]) => value !== undefined)
    );

    // Update the document
    const updatedProfile = await databases.updateDocument(
      db,
      CompanyProfilesCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<CompanyApiResponse<CompanyProfile>>({
      success: true,
      data: updatedProfile as unknown as CompanyProfile,
      message: "Company profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating company profile:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to update company profile",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete company profile
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("id");

    if (!profileId) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Profile ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(db, CompanyProfilesCollection, profileId);

    return NextResponse.json<CompanyApiResponse>({
      success: true,
      message: "Company profile deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company profile:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to delete company profile",
      },
      { status: 500 }
    );
  }
}
