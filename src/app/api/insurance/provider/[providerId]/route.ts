import { NextRequest, NextResponse } from "next/server";
import { InsuranceDatabase } from "@/utils/insuranceDatabase";

// GET /api/insurance/provider/[providerId] - Get insurance policies by provider ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ providerId: string }> }
) {
  try {
    const { providerId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "25");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!providerId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing provider ID",
          message: "Provider ID is required",
        },
        { status: 400 }
      );
    }

    const result = await InsuranceDatabase.getInsurancePoliciesByProvider(
      providerId,
      limit,
      offset
    );

    return NextResponse.json({
      success: true,
      data: result.documents,
      total: result.total,
      message: "Insurance policies for provider retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching insurance policies by provider:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch insurance policies for provider",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
