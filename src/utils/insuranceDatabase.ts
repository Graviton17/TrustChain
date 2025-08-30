import { databases } from "@/models/server/config";
import { db, InsurancePoliciesCollection } from "@/models/name";
import { Query, ID } from "node-appwrite";
import {
  InsurancePolicy,
  CreateInsurancePolicyRequest,
  UpdateInsurancePolicyRequest,
} from "@/types/insurance";

export class InsuranceDatabase {
  // Helper function to validate and normalize URL
  private static validateAndNormalizeUrl(url: string): string {
    if (!url || url.trim() === "") {
      return "";
    }

    let normalizedUrl = url.trim();

    // Add https:// if no protocol is provided
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    // Validate the URL format
    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(normalizedUrl)) {
      throw new Error("Invalid terms_url format. Must be a valid URL.");
    }

    return normalizedUrl;
  }

  // Create a new insurance policy
  static async createInsurancePolicy(
    data: CreateInsurancePolicyRequest
  ): Promise<InsurancePolicy> {
    try {
      // Validate and normalize terms_url if provided
      const normalizedData = { ...data };
      if (data.terms_url && data.terms_url.trim() !== "") {
        normalizedData.terms_url = this.validateAndNormalizeUrl(data.terms_url);
      }

      // Prepare data for Appwrite - remove empty terms_url to avoid validation
      const documentData = {
        ...normalizedData,
        terms_url:
          normalizedData.terms_url && normalizedData.terms_url.trim() !== ""
            ? normalizedData.terms_url
            : undefined,
      };

      const policy = await databases.createDocument(
        db,
        InsurancePoliciesCollection,
        ID.unique(),
        documentData
      );
      return policy as unknown as InsurancePolicy;
    } catch (error) {
      console.error("Error creating insurance policy:", error);
      throw error;
    }
  }

  // Get all insurance policies with optional filters
  static async getAllInsurancePolicies(
    limit: number = 25,
    offset: number = 0,
    providerId?: string,
    policyType?: string,
    targetRegion?: string
  ): Promise<{ documents: InsurancePolicy[]; total: number }> {
    try {
      const queries = [Query.limit(limit), Query.offset(offset)];

      if (providerId) {
        queries.push(Query.equal("providerId", providerId));
      }
      if (policyType) {
        queries.push(Query.equal("policy_type", policyType));
      }
      if (targetRegion) {
        queries.push(Query.equal("target_region", targetRegion));
      }

      const response = await databases.listDocuments(
        db,
        InsurancePoliciesCollection,
        queries
      );

      return {
        documents: response.documents as unknown as InsurancePolicy[],
        total: response.total,
      };
    } catch (error) {
      console.error("Error fetching insurance policies:", error);
      throw error;
    }
  }

  // Get a single insurance policy by ID
  static async getInsurancePolicyById(id: string): Promise<InsurancePolicy> {
    try {
      const policy = await databases.getDocument(
        db,
        InsurancePoliciesCollection,
        id
      );
      return policy as unknown as InsurancePolicy;
    } catch (error) {
      console.error("Error fetching insurance policy:", error);
      throw error;
    }
  }

  // Update an insurance policy
  static async updateInsurancePolicy(
    id: string,
    data: UpdateInsurancePolicyRequest
  ): Promise<InsurancePolicy> {
    try {
      // Validate and normalize terms_url if provided
      const normalizedData = { ...data };
      if (data.terms_url && data.terms_url.trim() !== "") {
        normalizedData.terms_url = this.validateAndNormalizeUrl(data.terms_url);
      }

      // Prepare data for Appwrite - remove empty terms_url to avoid validation
      const updateData = {
        ...normalizedData,
        terms_url:
          normalizedData.terms_url && normalizedData.terms_url.trim() !== ""
            ? normalizedData.terms_url
            : undefined,
      };

      const policy = await databases.updateDocument(
        db,
        InsurancePoliciesCollection,
        id,
        updateData
      );
      return policy as unknown as InsurancePolicy;
    } catch (error) {
      console.error("Error updating insurance policy:", error);
      throw error;
    }
  }

  // Delete an insurance policy
  static async deleteInsurancePolicy(id: string): Promise<void> {
    try {
      await databases.deleteDocument(db, InsurancePoliciesCollection, id);
    } catch (error) {
      console.error("Error deleting insurance policy:", error);
      throw error;
    }
  }

  // Search insurance policies by name or description
  static async searchInsurancePolicies(
    searchTerm: string,
    limit: number = 25,
    offset: number = 0
  ): Promise<{ documents: InsurancePolicy[]; total: number }> {
    try {
      const queries = [
        Query.limit(limit),
        Query.offset(offset),
        Query.or([
          Query.search("policy_name", searchTerm),
          Query.search("description", searchTerm),
        ]),
      ];

      const response = await databases.listDocuments(
        db,
        InsurancePoliciesCollection,
        queries
      );

      return {
        documents: response.documents as unknown as InsurancePolicy[],
        total: response.total,
      };
    } catch (error) {
      console.error("Error searching insurance policies:", error);
      throw error;
    }
  }

  // Get insurance policies by provider ID
  static async getInsurancePoliciesByProvider(
    providerId: string,
    limit: number = 25,
    offset: number = 0
  ): Promise<{ documents: InsurancePolicy[]; total: number }> {
    try {
      const queries = [
        Query.limit(limit),
        Query.offset(offset),
        Query.equal("providerId", providerId),
      ];

      const response = await databases.listDocuments(
        db,
        InsurancePoliciesCollection,
        queries
      );

      return {
        documents: response.documents as unknown as InsurancePolicy[],
        total: response.total,
      };
    } catch (error) {
      console.error("Error fetching insurance policies by provider:", error);
      throw error;
    }
  }
}
