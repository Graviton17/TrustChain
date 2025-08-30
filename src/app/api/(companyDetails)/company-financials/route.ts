import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, CompanyFinancialsCollection } from "@/models/name";
import { Query } from "node-appwrite";
import {
  CompanyFinancials,
  CreateCompanyFinancialsRequest,
  UpdateCompanyFinancialsRequest,
  CompanyApiResponse,
  CompanyListResponse,
  CompanyQueryParams,
} from "@/types/company";

// Helper function to validate required fields
function validateCreateRequest(
  data: CreateCompanyFinancialsRequest
): string | null {
  if (!data.companyId?.trim()) {
    return "companyId is required";
  }
  return null;
}

// Helper function to validate update request
function validateUpdateRequest(
  data: UpdateCompanyFinancialsRequest
): string | null {
  if (!data.$id?.trim()) {
    return "$id is required for updates";
  }
  return null;
}

// Helper function to validate financial data
function validateFinancialData(
  data: CreateCompanyFinancialsRequest | UpdateCompanyFinancialsRequest
): string | null {
  if (data.annual_revenue !== undefined && data.annual_revenue < 0) {
    return "Annual revenue must be non-negative";
  }
  if (data.net_worth !== undefined && data.net_worth < 0) {
    return "Net worth must be non-negative";
  }
  if (
    data.past_project_success_rate !== undefined &&
    (data.past_project_success_rate < 0 || data.past_project_success_rate > 100)
  ) {
    return "Past project success rate must be between 0 and 100";
  }
  return null;
}

// POST - Create new company financials
export async function POST(request: NextRequest) {
  try {
    const body: CreateCompanyFinancialsRequest = await request.json();

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

    // Validate financial data
    const financialValidationError = validateFinancialData(body);
    if (financialValidationError) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: financialValidationError,
        },
        { status: 400 }
      );
    }

    // Check if company already has financial data
    try {
      const existingFinancials = await databases.listDocuments(
        db,
        CompanyFinancialsCollection,
        [Query.equal("companyId", body.companyId)]
      );

      if (existingFinancials.documents.length > 0) {
        return NextResponse.json<CompanyApiResponse>(
          {
            success: false,
            error: "Company already has financial data. Use PUT to update.",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Error checking existing financials:", error);
    }

    // Create the company financials
    const newFinancials = await databases.createDocument(
      db,
      CompanyFinancialsCollection,
      "unique()",
      {
        companyId: body.companyId,
        annual_revenue: body.annual_revenue || null,
        net_worth: body.net_worth || null,
        credit_rating: body.credit_rating || null,
        past_project_success_rate: body.past_project_success_rate || null,
      }
    );

    return NextResponse.json<CompanyApiResponse<CompanyFinancials>>(
      {
        success: true,
        data: newFinancials as unknown as CompanyFinancials,
        message: "Company financials created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating company financials:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to create company financials",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve company financials
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
      CompanyFinancialsCollection,
      queries
    );

    return NextResponse.json<CompanyListResponse<CompanyFinancials>>({
      success: true,
      data: result.documents as unknown as CompanyFinancials[],
      total: result.total,
      message: "Company financials retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving company financials:", error);
    return NextResponse.json<CompanyListResponse>(
      {
        success: false,
        error: "Failed to retrieve company financials",
      },
      { status: 500 }
    );
  }
}

// PUT - Update company financials
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCompanyFinancialsRequest = await request.json();

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

    // Validate financial data
    const financialValidationError = validateFinancialData(body);
    if (financialValidationError) {
      return NextResponse.json<CompanyApiResponse>(
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
      CompanyFinancialsCollection,
      $id,
      cleanUpdateData
    );

    return NextResponse.json<CompanyApiResponse<CompanyFinancials>>({
      success: true,
      data: updatedFinancials as unknown as CompanyFinancials,
      message: "Company financials updated successfully",
    });
  } catch (error) {
    console.error("Error updating company financials:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to update company financials",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete company financials
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const financialsId = searchParams.get("id");

    if (!financialsId) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Financials ID is required",
        },
        { status: 400 }
      );
    }

    await databases.deleteDocument(
      db,
      CompanyFinancialsCollection,
      financialsId
    );

    return NextResponse.json<CompanyApiResponse>({
      success: true,
      message: "Company financials deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company financials:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to delete company financials",
      },
      { status: 500 }
    );
  }
}
