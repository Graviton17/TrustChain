import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import {
  db,
  CompanyProfilesCollection,
  CompanyContactsCollection,
  CompanyFinancialsCollection,
  CompanyOperationsCollection,
} from "@/models/name";
import { Query } from "node-appwrite";
import {
  CompleteCompanyData,
  CompanyProfile,
  CompanyContacts,
  CompanyFinancials,
  CompanyOperations,
  CompanyApiResponse,
} from "@/types/company";

// GET - Retrieve complete company data by companyId or userId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");

    if (!companyId && !userId) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Either companyId or userId is required",
        },
        { status: 400 }
      );
    }

    const result: CompleteCompanyData = {};

    // If userId is provided, first get the company profile to find companyId
    let actualCompanyId = companyId;

    if (userId) {
      try {
        const profileResult = await databases.listDocuments(
          db,
          CompanyProfilesCollection,
          [Query.equal("userId", userId)]
        );

        if (profileResult.documents.length > 0) {
          result.profile = profileResult
            .documents[0] as unknown as CompanyProfile;
          actualCompanyId = profileResult.documents[0].$id;
        } else {
          return NextResponse.json<CompanyApiResponse>(
            {
              success: false,
              error: "No company profile found for this user",
            },
            { status: 404 }
          );
        }
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    } else if (companyId) {
      // If companyId is provided, get the profile
      try {
        const profile = await databases.getDocument(
          db,
          CompanyProfilesCollection,
          companyId
        );
        result.profile = profile as unknown as CompanyProfile;
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    }

    if (!actualCompanyId) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Company not found",
        },
        { status: 404 }
      );
    }

    // Fetch all related company data in parallel
    const [contactsResult, financialsResult, operationsResult] =
      await Promise.allSettled([
        databases.listDocuments(db, CompanyContactsCollection, [
          Query.equal("companyId", actualCompanyId),
        ]),
        databases.listDocuments(db, CompanyFinancialsCollection, [
          Query.equal("companyId", actualCompanyId),
        ]),
        databases.listDocuments(db, CompanyOperationsCollection, [
          Query.equal("companyId", actualCompanyId),
        ]),
      ]);

    // Process contacts
    if (
      contactsResult.status === "fulfilled" &&
      contactsResult.value.documents.length > 0
    ) {
      result.contacts = contactsResult.value
        .documents[0] as unknown as CompanyContacts;
    }

    // Process financials
    if (
      financialsResult.status === "fulfilled" &&
      financialsResult.value.documents.length > 0
    ) {
      result.financials = financialsResult.value
        .documents[0] as unknown as CompanyFinancials;
    }

    // Process operations
    if (
      operationsResult.status === "fulfilled" &&
      operationsResult.value.documents.length > 0
    ) {
      result.operations = operationsResult.value
        .documents[0] as unknown as CompanyOperations;
    }

    return NextResponse.json<CompanyApiResponse<CompleteCompanyData>>({
      success: true,
      data: result,
      message: "Complete company data retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving complete company data:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to retrieve complete company data",
      },
      { status: 500 }
    );
  }
}

// POST - Create complete company data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile, contacts, financials, operations } = body;

    if (!profile || !profile.userId || !profile.company_name) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Company profile with userId and company_name is required",
        },
        { status: 400 }
      );
    }

    // Check if user already has a company profile
    try {
      const existingProfiles = await databases.listDocuments(
        db,
        CompanyProfilesCollection,
        [Query.equal("userId", profile.userId)]
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

    const result: CompleteCompanyData = {};

    // Helper function to validate and format URL
    const formatWebsiteUrl = (
      url: string | null | undefined
    ): string | null => {
      if (!url || url.trim() === "" || url === "null" || url === "undefined") {
        return null;
      }

      const trimmedUrl = url.trim();

      // If it's just a single word or doesn't look like a URL, return null
      if (!trimmedUrl.includes(".") && !trimmedUrl.includes(":")) {
        return null;
      }

      // Check if it's already a valid URL format
      if (
        trimmedUrl.startsWith("http://") ||
        trimmedUrl.startsWith("https://")
      ) {
        try {
          const testUrl = new URL(trimmedUrl);
          return testUrl.href;
        } catch {
          return null;
        }
      }

      // Try adding https:// prefix
      try {
        const urlWithHttps = `https://${trimmedUrl}`;
        const testUrl = new URL(urlWithHttps);
        return testUrl.href;
      } catch {
        return null;
      }
    };

    // Create company profile first
    try {
      const newProfile = await databases.createDocument(
        db,
        CompanyProfilesCollection,
        "unique()",
        {
          userId: profile.userId,
          company_name: profile.company_name,
          registration_number: profile.registration_number || null,
          company_type: profile.company_type || null,
          company_size: profile.company_size || null,
          year_incorporation: profile.year_incorporation || null,
          country: profile.country || null,
          state: profile.state || null,
          website: formatWebsiteUrl(profile.website),
        }
      );

      result.profile = newProfile as unknown as CompanyProfile;
      const companyId = newProfile.$id;

      // Create related data in parallel if provided
      const promises = [];

      if (contacts) {
        promises.push(
          databases
            .createDocument(db, CompanyContactsCollection, "unique()", {
              companyId,
              contact_person_name: contacts.contact_person_name || null,
              contact_person_designation:
                contacts.contact_person_designation || null,
              contact_email: contacts.contact_email || null,
              contact_phone: contacts.contact_phone || null,
            })
            .then((doc) => ({ type: "contacts", data: doc }))
        );
      }

      if (financials) {
        promises.push(
          databases
            .createDocument(db, CompanyFinancialsCollection, "unique()", {
              companyId,
              annual_revenue: financials.annual_revenue || null,
              net_worth: financials.net_worth || null,
              credit_rating: financials.credit_rating || null,
              past_project_success_rate:
                financials.past_project_success_rate || null,
            })
            .then((doc) => ({ type: "financials", data: doc }))
        );
      }

      if (operations) {
        promises.push(
          databases
            .createDocument(db, CompanyOperationsCollection, "unique()", {
              companyId,
              employees: operations.employees || null,
              headquarters_address: operations.headquarters_address || null,
            })
            .then((doc) => ({ type: "operations", data: doc }))
        );
      }

      // Wait for all related data to be created
      const results = await Promise.allSettled(promises);

      results.forEach((promiseResult) => {
        if (promiseResult.status === "fulfilled") {
          const { type, data } = promiseResult.value;
          if (type === "contacts") {
            result.contacts = data as unknown as CompanyContacts;
          } else if (type === "financials") {
            result.financials = data as unknown as CompanyFinancials;
          } else if (type === "operations") {
            result.operations = data as unknown as CompanyOperations;
          }
        }
      });
    } catch (error) {
      console.error("Error creating company data:", error);
      throw error;
    }

    return NextResponse.json<CompanyApiResponse<CompleteCompanyData>>(
      {
        success: true,
        data: result,
        message: "Complete company data created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating complete company data:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to create complete company data",
      },
      { status: 500 }
    );
  }
}

// PUT - Update complete company data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile, contacts, financials, operations } = body;

    if (!profile || !profile.$id) {
      return NextResponse.json<CompanyApiResponse>(
        {
          success: false,
          error: "Company profile with $id is required for updates",
        },
        { status: 400 }
      );
    }

    const result: CompleteCompanyData = {};
    const companyId = profile.$id;

    // Helper function to validate and format URL
    const formatWebsiteUrl = (
      url: string | null | undefined
    ): string | null => {
      if (!url || url.trim() === "" || url === "null" || url === "undefined") {
        return null;
      }

      const trimmedUrl = url.trim();

      // If it's just a single word or doesn't look like a URL, return null
      if (!trimmedUrl.includes(".") && !trimmedUrl.includes(":")) {
        return null;
      }

      // Check if it's already a valid URL format
      if (
        trimmedUrl.startsWith("http://") ||
        trimmedUrl.startsWith("https://")
      ) {
        try {
          const testUrl = new URL(trimmedUrl);
          return testUrl.href;
        } catch {
          return null;
        }
      }

      // Try adding https:// prefix
      try {
        const urlWithHttps = `https://${trimmedUrl}`;
        const testUrl = new URL(urlWithHttps);
        return testUrl.href;
      } catch {
        return null;
      }
    };

    // Update profile
    try {
      const { $id, ...profileUpdateData } = profile;

      // Apply URL formatting to website field if it exists
      if (profileUpdateData.website !== undefined) {
        profileUpdateData.website = formatWebsiteUrl(profileUpdateData.website);
      }

      const cleanProfileData = Object.fromEntries(
        Object.entries(profileUpdateData).filter(
          ([, value]) => value !== undefined
        )
      );

      const updatedProfile = await databases.updateDocument(
        db,
        CompanyProfilesCollection,
        $id,
        cleanProfileData
      );
      result.profile = updatedProfile as unknown as CompanyProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    // Update or create related data
    const promises = [];

    if (contacts) {
      if (contacts.$id) {
        // Update existing contacts
        const { $id, ...contactsUpdateData } = contacts;
        const cleanContactsData = Object.fromEntries(
          Object.entries(contactsUpdateData).filter(
            ([, value]) => value !== undefined
          )
        );

        promises.push(
          databases
            .updateDocument(
              db,
              CompanyContactsCollection,
              $id,
              cleanContactsData
            )
            .then((doc) => ({ type: "contacts", data: doc }))
        );
      } else {
        // Create new contacts
        promises.push(
          databases
            .createDocument(db, CompanyContactsCollection, "unique()", {
              companyId,
              contact_person_name: contacts.contact_person_name || null,
              contact_person_designation:
                contacts.contact_person_designation || null,
              contact_email: contacts.contact_email || null,
              contact_phone: contacts.contact_phone || null,
            })
            .then((doc) => ({ type: "contacts", data: doc }))
        );
      }
    }

    if (financials) {
      if (financials.$id) {
        // Update existing financials
        const { $id, ...financialsUpdateData } = financials;
        const cleanFinancialsData = Object.fromEntries(
          Object.entries(financialsUpdateData).filter(
            ([, value]) => value !== undefined
          )
        );

        promises.push(
          databases
            .updateDocument(
              db,
              CompanyFinancialsCollection,
              $id,
              cleanFinancialsData
            )
            .then((doc) => ({ type: "financials", data: doc }))
        );
      } else {
        // Create new financials
        promises.push(
          databases
            .createDocument(db, CompanyFinancialsCollection, "unique()", {
              companyId,
              annual_revenue: financials.annual_revenue || null,
              net_worth: financials.net_worth || null,
              credit_rating: financials.credit_rating || null,
              past_project_success_rate:
                financials.past_project_success_rate || null,
            })
            .then((doc) => ({ type: "financials", data: doc }))
        );
      }
    }

    if (operations) {
      if (operations.$id) {
        // Update existing operations
        const { $id, ...operationsUpdateData } = operations;
        const cleanOperationsData = Object.fromEntries(
          Object.entries(operationsUpdateData).filter(
            ([, value]) => value !== undefined
          )
        );

        promises.push(
          databases
            .updateDocument(
              db,
              CompanyOperationsCollection,
              $id,
              cleanOperationsData
            )
            .then((doc) => ({ type: "operations", data: doc }))
        );
      } else {
        // Create new operations
        promises.push(
          databases
            .createDocument(db, CompanyOperationsCollection, "unique()", {
              companyId,
              employees: operations.employees || null,
              headquarters_address: operations.headquarters_address || null,
            })
            .then((doc) => ({ type: "operations", data: doc }))
        );
      }
    }

    // Wait for all updates/creates to complete
    const results = await Promise.allSettled(promises);

    results.forEach((promiseResult) => {
      if (promiseResult.status === "fulfilled") {
        const { type, data } = promiseResult.value;
        if (type === "contacts") {
          result.contacts = data as unknown as CompanyContacts;
        } else if (type === "financials") {
          result.financials = data as unknown as CompanyFinancials;
        } else if (type === "operations") {
          result.operations = data as unknown as CompanyOperations;
        }
      }
    });

    return NextResponse.json<CompanyApiResponse<CompleteCompanyData>>({
      success: true,
      data: result,
      message: "Complete company data updated successfully",
    });
  } catch (error) {
    console.error("Error updating complete company data:", error);
    return NextResponse.json<CompanyApiResponse>(
      {
        success: false,
        error: "Failed to update complete company data",
      },
      { status: 500 }
    );
  }
}
