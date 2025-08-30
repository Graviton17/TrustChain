import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, CompanyContactsCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  CompanyContacts,
  CreateCompanyContactsRequest,
  UpdateCompanyContactsRequest,
  CompanyApiResponse,
  CompanyListResponse,
  CompanyQueryParams,
} from "@/types/company";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateCompanyContactsRequest
): string | null {
  if (!data.companyId?.trim()) {
    return "companyId is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateCompanyContactsRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// POST - Create new company contacts
export async function POST(request: NextRequest) {
  try {
    const body: CreateCompanyContactsRequest = await request.json();

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

    // Create the company contacts
    const newContacts = await databases.createDocument(
      db,
      CompanyContactsCollection,
      "unique()",
      {
        companyId: body.companyId,
        contact_person_name: body.contact_person_name || null,
        contact_person_designation: body.contact_person_designation || null,
        contact_email: body.contact_email || null,
        contact_phone: body.contact_phone || null,
      }
    );

    return NextResponse.json<CompanyApiResponse<CompanyContacts>>(
      {
        success: true,
        data: newContacts as unknown as CompanyContacts,
        message: "Company contacts created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating company contacts:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to create company contacts",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve company contacts
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
      CompanyContactsCollection,
      queries
    );

    return NextResponse.json<CompanyListResponse<CompanyContacts>>({
      success: true,
      data: result.documents as unknown as CompanyContacts[],
      total: result.total,
      message: "Company contacts retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving company contacts:", error);
    return NextResponse.json<CompanyListResponse>(
      {
        success: false,
        error: "Failed to retrieve company contacts",
      },
      { status: 500 }
    );
  }
}

// PUT - Update company contacts
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCompanyContactsRequest = await request.json();

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
    const updatedContacts = await databases.updateDocument(
      db,
      CompanyContactsCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<CompanyApiResponse<CompanyContacts>>({
      success: true,
      data: updatedContacts as unknown as CompanyContacts,
      message: "Company contacts updated successfully",
    });
  } catch (error) {
    console.error("Error updating company contacts:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to update company contacts",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete company contacts
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contactsId = searchParams.get("id");

    if (!contactsId) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Contacts ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(db, CompanyContactsCollection, contactsId);

    return NextResponse.json<CompanyApiResponse>({
      success: true,
      message: "Company contacts deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company contacts:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to delete company contacts",
      },
      { status: 500 }
    );
  }
}
