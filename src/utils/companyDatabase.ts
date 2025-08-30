// Utility functions for company database operations

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
  CompanyProfile,
  CompanyContacts,
  CompanyFinancials,
  CompanyOperations,
  CompleteCompanyData,
} from "@/types/company";

/**
 * Get company profile by userId
 */
export async function getCompanyProfileByUserId(
  userId: string
): Promise<CompanyProfile | null> {
  try {
    const result = await databases.listDocuments(
      db,
      CompanyProfilesCollection,
      [Query.equal("userId", userId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as CompanyProfile)
      : null;
  } catch (error) {
    console.error("Error fetching company profile by userId:", error);
    return null;
  }
}

/**
 * Get company profile by companyId
 */
export async function getCompanyProfileById(
  companyId: string
): Promise<CompanyProfile | null> {
  try {
    const profile = await databases.getDocument(
      db,
      CompanyProfilesCollection,
      companyId
    );

    return profile as unknown as CompanyProfile;
  } catch (error) {
    console.error("Error fetching company profile by ID:", error);
    return null;
  }
}

/**
 * Get company contacts by companyId
 */
export async function getCompanyContacts(
  companyId: string
): Promise<CompanyContacts | null> {
  try {
    const result = await databases.listDocuments(
      db,
      CompanyContactsCollection,
      [Query.equal("companyId", companyId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as CompanyContacts)
      : null;
  } catch (error) {
    console.error("Error fetching company contacts:", error);
    return null;
  }
}

/**
 * Get company financials by companyId
 */
export async function getCompanyFinancials(
  companyId: string
): Promise<CompanyFinancials | null> {
  try {
    const result = await databases.listDocuments(
      db,
      CompanyFinancialsCollection,
      [Query.equal("companyId", companyId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as CompanyFinancials)
      : null;
  } catch (error) {
    console.error("Error fetching company financials:", error);
    return null;
  }
}

/**
 * Get company operations by companyId
 */
export async function getCompanyOperations(
  companyId: string
): Promise<CompanyOperations | null> {
  try {
    const result = await databases.listDocuments(
      db,
      CompanyOperationsCollection,
      [Query.equal("companyId", companyId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as CompanyOperations)
      : null;
  } catch (error) {
    console.error("Error fetching company operations:", error);
    return null;
  }
}

/**
 * Get complete company data by companyId
 */
export async function getCompleteCompanyData(
  companyId: string
): Promise<CompleteCompanyData> {
  const [profile, contacts, financials, operations] = await Promise.allSettled([
    getCompanyProfileById(companyId),
    getCompanyContacts(companyId),
    getCompanyFinancials(companyId),
    getCompanyOperations(companyId),
  ]);

  const result: CompleteCompanyData = {};

  if (profile.status === "fulfilled" && profile.value) {
    result.profile = profile.value;
  }

  if (contacts.status === "fulfilled" && contacts.value) {
    result.contacts = contacts.value;
  }

  if (financials.status === "fulfilled" && financials.value) {
    result.financials = financials.value;
  }

  if (operations.status === "fulfilled" && operations.value) {
    result.operations = operations.value;
  }

  return result;
}

/**
 * Get complete company data by userId
 */
export async function getCompleteCompanyDataByUserId(
  userId: string
): Promise<CompleteCompanyData | null> {
  const profile = await getCompanyProfileByUserId(userId);

  if (!profile) {
    return null;
  }

  return getCompleteCompanyData(profile.$id!);
}

/**
 * Check if user already has a company profile
 */
export async function hasCompanyProfile(userId: string): Promise<boolean> {
  try {
    const result = await databases.listDocuments(
      db,
      CompanyProfilesCollection,
      [Query.equal("userId", userId)]
    );

    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking company profile existence:", error);
    return false;
  }
}

/**
 * Check if company already has specific data type
 */
export async function hasCompanyData(
  companyId: string,
  dataType: "contacts" | "financials" | "operations"
): Promise<boolean> {
  try {
    let collection: string;

    switch (dataType) {
      case "contacts":
        collection = CompanyContactsCollection;
        break;
      case "financials":
        collection = CompanyFinancialsCollection;
        break;
      case "operations":
        collection = CompanyOperationsCollection;
        break;
      default:
        return false;
    }

    const result = await databases.listDocuments(db, collection, [
      Query.equal("companyId", companyId),
    ]);

    return result.documents.length > 0;
  } catch (error) {
    console.error(`Error checking company ${dataType} existence:`, error);
    return false;
  }
}

/**
 * Delete all company data by companyId
 */
export async function deleteAllCompanyData(
  companyId: string
): Promise<boolean> {
  try {
    // Get all related documents first
    const [contactsResult, financialsResult, operationsResult] =
      await Promise.allSettled([
        databases.listDocuments(db, CompanyContactsCollection, [
          Query.equal("companyId", companyId),
        ]),
        databases.listDocuments(db, CompanyFinancialsCollection, [
          Query.equal("companyId", companyId),
        ]),
        databases.listDocuments(db, CompanyOperationsCollection, [
          Query.equal("companyId", companyId),
        ]),
      ]);

    // Delete all related documents
    const deletePromises = [];

    if (contactsResult.status === "fulfilled") {
      contactsResult.value.documents.forEach((doc) => {
        deletePromises.push(
          databases.deleteDocument(db, CompanyContactsCollection, doc.$id)
        );
      });
    }

    if (financialsResult.status === "fulfilled") {
      financialsResult.value.documents.forEach((doc) => {
        deletePromises.push(
          databases.deleteDocument(db, CompanyFinancialsCollection, doc.$id)
        );
      });
    }

    if (operationsResult.status === "fulfilled") {
      operationsResult.value.documents.forEach((doc) => {
        deletePromises.push(
          databases.deleteDocument(db, CompanyOperationsCollection, doc.$id)
        );
      });
    }

    // Delete the main profile
    deletePromises.push(
      databases.deleteDocument(db, CompanyProfilesCollection, companyId)
    );

    await Promise.allSettled(deletePromises);
    return true;
  } catch (error) {
    console.error("Error deleting all company data:", error);
    return false;
  }
}

/**
 * Search companies by various criteria
 */
export async function searchCompanies(searchParams: {
  country?: string;
  company_size?: string;
  company_type?: string;
  limit?: number;
  offset?: number;
}): Promise<CompanyProfile[]> {
  try {
    const queries: string[] = [];

    if (searchParams.country) {
      queries.push(Query.equal("country", searchParams.country));
    }
    if (searchParams.company_size) {
      queries.push(Query.equal("company_size", searchParams.company_size));
    }
    if (searchParams.company_type) {
      queries.push(Query.equal("company_type", searchParams.company_type));
    }
    if (searchParams.limit) {
      queries.push(Query.limit(searchParams.limit));
    }
    if (searchParams.offset) {
      queries.push(Query.offset(searchParams.offset));
    }

    const result = await databases.listDocuments(
      db,
      CompanyProfilesCollection,
      queries
    );

    return result.documents as unknown as CompanyProfile[];
  } catch (error) {
    console.error("Error searching companies:", error);
    return [];
  }
}
