import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { CreateInsurancePolicyRequest } from "@/types/insurance";
import { ID } from "appwrite";
import { db, InsurancePoliciesCollection } from "@/models/name";

export async function POST(req: NextRequest) {
  try {
    console.log("Received POST request to create insurance policy");

    const body: CreateInsurancePolicyRequest = await req.json();
    console.log("Request body:", body);

    // Validate required fields
    if (!body.policy_name || !body.policy_type) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json(
        { success: false, error: "Policy name and type are required" },
        { status: 400 }
      );
    }

    // Validate terms_url if provided
    if (body.terms_url && body.terms_url.trim() !== "") {
      let urlToValidate = body.terms_url.trim();

      // Add https:// if no protocol is provided
      if (!/^https?:\/\//i.test(urlToValidate)) {
        urlToValidate = `https://${urlToValidate}`;
      }

      const urlPattern = /^https?:\/\/.+/i;
      if (!urlPattern.test(urlToValidate)) {
        console.log("Validation failed: Invalid terms_url format");
        return NextResponse.json(
          {
            success: false,
            error: "Invalid terms_url format. Must be a valid URL.",
          },
          { status: 400 }
        );
      }

      // Update the body with the corrected URL
      body.terms_url = urlToValidate;
    }

    // Create document data
    const documentData = {
      providerId: body.providerId || "default-provider",
      policy_name: body.policy_name,
      policy_type: body.policy_type,
      target_region: body.target_region || "",
      description: body.description || "",
      total_outlay_covered: body.total_outlay_covered || "",
      eligibility_summary: body.eligibility_summary || "",
      terms_url:
        body.terms_url && body.terms_url.trim() !== ""
          ? body.terms_url
          : undefined,
    };

    console.log("Creating document with data:", documentData);
    console.log("Using database:", db);
    console.log("Using collection:", InsurancePoliciesCollection);

    // Create the insurance policy
    const policy = await databases.createDocument(
      db,
      InsurancePoliciesCollection,
      ID.unique(),
      documentData
    );

    return NextResponse.json({
      success: true,
      data: policy,
    });
  } catch (error) {
    console.error("Error creating insurance policy:", error);

    // Get detailed error information
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorCode =
      error instanceof Error && "code" in error
        ? String((error as { code?: unknown }).code)
        : "NO_CODE";

    console.error("Detailed error:", {
      message: errorMessage,
      code: errorCode,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: `Failed to create insurance policy: ${errorMessage}`,
        code: errorCode,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const policies = await databases.listDocuments(
      db,
      InsurancePoliciesCollection
    );

    return NextResponse.json({
      success: true,
      data: policies.documents,
      total: policies.total,
    });
  } catch (error) {
    console.error("Error fetching insurance policies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch insurance policies" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const policyId = url.pathname.split("/").pop();

    if (!policyId) {
      return NextResponse.json(
        { success: false, error: "Policy ID is required" },
        { status: 400 }
      );
    }

    await databases.deleteDocument(db, InsurancePoliciesCollection, policyId);

    return NextResponse.json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting insurance policy:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete insurance policy" },
      { status: 500 }
    );
  }
}
