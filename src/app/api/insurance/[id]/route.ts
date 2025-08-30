import { NextRequest, NextResponse } from "next/server";
import { InsuranceDatabase } from "@/utils/insuranceDatabase";
import { UpdateInsurancePolicyRequest } from "@/types/insurance";

// GET /api/insurance/[id] - Get a specific insurance policy
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing policy ID",
          message: "Policy ID is required",
        },
        { status: 400 }
      );
    }

    const policy = await InsuranceDatabase.getInsurancePolicyById(id);

    return NextResponse.json({
      success: true,
      data: policy,
      message: "Insurance policy retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching insurance policy:", error);

    // Check if it's a 404 error
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Insurance policy not found",
          message: "The requested insurance policy does not exist",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch insurance policy",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT /api/insurance/[id] - Update a specific insurance policy
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateInsurancePolicyRequest = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing policy ID",
          message: "Policy ID is required",
        },
        { status: 400 }
      );
    }

    // Remove undefined values from the update object
    const updateData = Object.fromEntries(
      Object.entries(body).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No data to update",
          message: "At least one field must be provided for update",
        },
        { status: 400 }
      );
    }

    const policy = await InsuranceDatabase.updateInsurancePolicy(
      id,
      updateData
    );

    return NextResponse.json({
      success: true,
      data: policy,
      message: "Insurance policy updated successfully",
    });
  } catch (error) {
    console.error("Error updating insurance policy:", error);

    // Check if it's a 404 error
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Insurance policy not found",
          message: "The requested insurance policy does not exist",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update insurance policy",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/insurance/[id] - Delete a specific insurance policy
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing policy ID",
          message: "Policy ID is required",
        },
        { status: 400 }
      );
    }

    await InsuranceDatabase.deleteInsurancePolicy(id);

    return NextResponse.json({
      success: true,
      message: "Insurance policy deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting insurance policy:", error);

    // Check if it's a 404 error
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "Insurance policy not found",
          message: "The requested insurance policy does not exist",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete insurance policy",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
