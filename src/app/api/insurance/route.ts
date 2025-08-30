import { NextRequest, NextResponse } from "next/server";
import { InsuranceDatabase } from "@/utils/insuranceDatabase";
import { CreateInsurancePolicyRequest } from "@/types/insurance";

// GET /api/insurance - Get all insurance policies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "25");
    const offset = parseInt(searchParams.get("offset") || "0");
    const providerId = searchParams.get("providerId") || undefined;
    const policyType = searchParams.get("policyType") || undefined;
    const targetRegion = searchParams.get("targetRegion") || undefined;
    const search = searchParams.get("search") || undefined;

    let result;
    if (search) {
      result = await InsuranceDatabase.searchInsurancePolicies(
        search,
        limit,
        offset
      );
    } else {
      result = await InsuranceDatabase.getAllInsurancePolicies(
        limit,
        offset,
        providerId,
        policyType,
        targetRegion
      );
    }

    return NextResponse.json({
      success: true,
      data: result.documents,
      total: result.total,
      message: "Insurance policies retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching insurance policies:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch insurance policies",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST /api/insurance - Create a new insurance policy
export async function POST(request: NextRequest) {
  try {
    const body: CreateInsurancePolicyRequest = await request.json();

    // Validate required fields
    if (!body.providerId || !body.policy_name || !body.policy_type) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          message: "providerId, policy_name, and policy_type are required",
        },
        { status: 400 }
      );
    }

    const policy = await InsuranceDatabase.createInsurancePolicy(body);

    return NextResponse.json(
      {
        success: true,
        data: policy,
        message: "Insurance policy created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating insurance policy:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create insurance policy",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
