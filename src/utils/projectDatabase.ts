// Utility functions for project database operations

import { databases } from "@/models/server/config";
import {
  db,
  ProjectsCollection,
  ProjectComplianceCollection,
  ProjectFinancialsCollection,
  ProjectProductionCollection,
  ProjectVerificationCollection,
} from "@/models/name";
import { Query } from "node-appwrite";
import {
  Project,
  ProjectCompliance,
  ProjectFinancials,
  ProjectProduction,
  ProjectVerification,
  CompleteProjectData,
} from "@/types/project";

/**
 * Get project by projectId
 */
export async function getProjectById(
  projectId: string
): Promise<Project | null> {
  try {
    const project = await databases.getDocument(
      db,
      ProjectsCollection,
      projectId
    );

    return project as unknown as Project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

/**
 * Get projects by companyId
 */
export async function getProjectsByCompanyId(
  companyId: string
): Promise<Project[]> {
  try {
    const result = await databases.listDocuments(db, ProjectsCollection, [
      Query.equal("companyId", companyId),
    ]);

    return result.documents as unknown as Project[];
  } catch (error) {
    console.error("Error fetching projects by companyId:", error);
    return [];
  }
}

/**
 * Get project compliance by projectId
 */
export async function getProjectCompliance(
  projectId: string
): Promise<ProjectCompliance | null> {
  try {
    const result = await databases.listDocuments(
      db,
      ProjectComplianceCollection,
      [Query.equal("projectId", projectId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as ProjectCompliance)
      : null;
  } catch (error) {
    console.error("Error fetching project compliance:", error);
    return null;
  }
}

/**
 * Get project financials by projectId
 */
export async function getProjectFinancials(
  projectId: string
): Promise<ProjectFinancials | null> {
  try {
    const result = await databases.listDocuments(
      db,
      ProjectFinancialsCollection,
      [Query.equal("projectId", projectId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as ProjectFinancials)
      : null;
  } catch (error) {
    console.error("Error fetching project financials:", error);
    return null;
  }
}

/**
 * Get project production by projectId
 */
export async function getProjectProduction(
  projectId: string
): Promise<ProjectProduction | null> {
  try {
    const result = await databases.listDocuments(
      db,
      ProjectProductionCollection,
      [Query.equal("projectId", projectId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as ProjectProduction)
      : null;
  } catch (error) {
    console.error("Error fetching project production:", error);
    return null;
  }
}

/**
 * Get project verification by projectId
 */
export async function getProjectVerification(
  projectId: string
): Promise<ProjectVerification | null> {
  try {
    const result = await databases.listDocuments(
      db,
      ProjectVerificationCollection,
      [Query.equal("projectId", projectId)]
    );

    return result.documents.length > 0
      ? (result.documents[0] as unknown as ProjectVerification)
      : null;
  } catch (error) {
    console.error("Error fetching project verification:", error);
    return null;
  }
}

/**
 * Get complete project data by projectId
 */
export async function getCompleteProjectData(
  projectId: string
): Promise<CompleteProjectData> {
  const [project, compliance, financials, production, verification] =
    await Promise.allSettled([
      getProjectById(projectId),
      getProjectCompliance(projectId),
      getProjectFinancials(projectId),
      getProjectProduction(projectId),
      getProjectVerification(projectId),
    ]);

  const result: CompleteProjectData = {};

  if (project.status === "fulfilled" && project.value) {
    result.project = project.value;
  }

  if (compliance.status === "fulfilled" && compliance.value) {
    result.compliance = compliance.value;
  }

  if (financials.status === "fulfilled" && financials.value) {
    result.financials = financials.value;
  }

  if (production.status === "fulfilled" && production.value) {
    result.production = production.value;
  }

  if (verification.status === "fulfilled" && verification.value) {
    result.verification = verification.value;
  }

  return result;
}

/**
 * Get complete project data by companyId (first project)
 */
export async function getCompleteProjectDataByCompanyId(
  companyId: string
): Promise<CompleteProjectData | null> {
  const projects = await getProjectsByCompanyId(companyId);

  if (projects.length === 0) {
    return null;
  }

  return getCompleteProjectData(projects[0].$id!);
}

/**
 * Get all complete project data by companyId
 */
export async function getAllCompleteProjectDataByCompanyId(
  companyId: string
): Promise<CompleteProjectData[]> {
  const projects = await getProjectsByCompanyId(companyId);

  if (projects.length === 0) {
    return [];
  }

  const completeDataPromises = projects.map((project) =>
    getCompleteProjectData(project.$id!)
  );
  const results = await Promise.allSettled(completeDataPromises);

  return results
    .filter((result) => result.status === "fulfilled")
    .map(
      (result) => (result as PromiseFulfilledResult<CompleteProjectData>).value
    );
}

/**
 * Check if project already has specific data type
 */
export async function hasProjectData(
  projectId: string,
  dataType: "compliance" | "financials" | "production" | "verification"
): Promise<boolean> {
  try {
    let collection: string;

    switch (dataType) {
      case "compliance":
        collection = ProjectComplianceCollection;
        break;
      case "financials":
        collection = ProjectFinancialsCollection;
        break;
      case "production":
        collection = ProjectProductionCollection;
        break;
      case "verification":
        collection = ProjectVerificationCollection;
        break;
      default:
        return false;
    }

    const result = await databases.listDocuments(db, collection, [
      Query.equal("projectId", projectId),
    ]);

    return result.documents.length > 0;
  } catch (error) {
    console.error(`Error checking project ${dataType} existence:`, error);
    return false;
  }
}

/**
 * Delete all project data by projectId
 */
export async function deleteAllProjectData(
  projectId: string
): Promise<boolean> {
  try {
    // Get all related documents first
    const [
      complianceResult,
      financialsResult,
      productionResult,
      verificationResult,
    ] = await Promise.allSettled([
      databases.listDocuments(db, ProjectComplianceCollection, [
        Query.equal("projectId", projectId),
      ]),
      databases.listDocuments(db, ProjectFinancialsCollection, [
        Query.equal("projectId", projectId),
      ]),
      databases.listDocuments(db, ProjectProductionCollection, [
        Query.equal("projectId", projectId),
      ]),
      databases.listDocuments(db, ProjectVerificationCollection, [
        Query.equal("projectId", projectId),
      ]),
    ]);

    // Delete all related documents
    const deletePromises = [];

    if (complianceResult.status === "fulfilled") {
      complianceResult.value.documents.forEach((doc) => {
        deletePromises.push(
          databases.deleteDocument(db, ProjectComplianceCollection, doc.$id)
        );
      });
    }

    if (financialsResult.status === "fulfilled") {
      financialsResult.value.documents.forEach((doc) => {
        deletePromises.push(
          databases.deleteDocument(db, ProjectFinancialsCollection, doc.$id)
        );
      });
    }

    if (productionResult.status === "fulfilled") {
      productionResult.value.documents.forEach((doc) => {
        deletePromises.push(
          databases.deleteDocument(db, ProjectProductionCollection, doc.$id)
        );
      });
    }

    if (verificationResult.status === "fulfilled") {
      verificationResult.value.documents.forEach((doc) => {
        deletePromises.push(
          databases.deleteDocument(db, ProjectVerificationCollection, doc.$id)
        );
      });
    }

    // Delete the main project
    deletePromises.push(
      databases.deleteDocument(db, ProjectsCollection, projectId)
    );

    await Promise.allSettled(deletePromises);
    return true;
  } catch (error) {
    console.error("Error deleting all project data:", error);
    return false;
  }
}

/**
 * Search projects by various criteria
 */
export async function searchProjects(searchParams: {
  companyId?: string;
  sector?: string;
  location?: string;
  ownership_type?: string;
  start_year?: number;
  completion_year?: number;
  limit?: number;
  offset?: number;
}): Promise<Project[]> {
  try {
    const queries: string[] = [];

    if (searchParams.companyId) {
      queries.push(Query.equal("companyId", searchParams.companyId));
    }
    if (searchParams.sector) {
      queries.push(Query.equal("sector", searchParams.sector));
    }
    if (searchParams.location) {
      queries.push(Query.equal("location", searchParams.location));
    }
    if (searchParams.ownership_type) {
      queries.push(Query.equal("ownership_type", searchParams.ownership_type));
    }
    if (searchParams.start_year) {
      queries.push(Query.equal("start_year", searchParams.start_year));
    }
    if (searchParams.completion_year) {
      queries.push(
        Query.equal("completion_year", searchParams.completion_year)
      );
    }
    if (searchParams.limit) {
      queries.push(Query.limit(searchParams.limit));
    }
    if (searchParams.offset) {
      queries.push(Query.offset(searchParams.offset));
    }

    const result = await databases.listDocuments(
      db,
      ProjectsCollection,
      queries
    );

    return result.documents as unknown as Project[];
  } catch (error) {
    console.error("Error searching projects:", error);
    return [];
  }
}

/**
 * Get project statistics by companyId
 */
export async function getProjectStatsByCompanyId(companyId: string): Promise<{
  totalProjects: number;
  projectsWithCompliance: number;
  projectsWithFinancials: number;
  projectsWithProduction: number;
  projectsWithVerification: number;
  totalCapacity: number;
  totalHydrogenOutput: number;
  averageCarbonIntensity: number;
}> {
  try {
    const projects = await getProjectsByCompanyId(companyId);
    const stats = {
      totalProjects: projects.length,
      projectsWithCompliance: 0,
      projectsWithFinancials: 0,
      projectsWithProduction: 0,
      projectsWithVerification: 0,
      totalCapacity: 0,
      totalHydrogenOutput: 0,
      averageCarbonIntensity: 0,
    };

    if (projects.length === 0) {
      return stats;
    }

    // Get all project data in parallel
    const projectDataPromises = projects.map((project) =>
      getCompleteProjectData(project.$id!)
    );
    const projectDataResults = await Promise.allSettled(projectDataPromises);

    let totalCarbonIntensity = 0;
    let carbonIntensityCount = 0;

    projectDataResults.forEach((result) => {
      if (result.status === "fulfilled") {
        const data = result.value;

        if (data.compliance) stats.projectsWithCompliance++;
        if (data.financials) stats.projectsWithFinancials++;
        if (data.production) {
          stats.projectsWithProduction++;
          if (data.production.installed_capacity_mw) {
            stats.totalCapacity += data.production.installed_capacity_mw;
          }
          if (data.production.hydrogen_output_tpy) {
            stats.totalHydrogenOutput += data.production.hydrogen_output_tpy;
          }
        }
        if (data.verification) {
          stats.projectsWithVerification++;
          if (data.verification.carbon_intensity) {
            totalCarbonIntensity += data.verification.carbon_intensity;
            carbonIntensityCount++;
          }
        }
      }
    });

    if (carbonIntensityCount > 0) {
      stats.averageCarbonIntensity =
        totalCarbonIntensity / carbonIntensityCount;
    }

    return stats;
  } catch (error) {
    console.error("Error getting project statistics:", error);
    return {
      totalProjects: 0,
      projectsWithCompliance: 0,
      projectsWithFinancials: 0,
      projectsWithProduction: 0,
      projectsWithVerification: 0,
      totalCapacity: 0,
      totalHydrogenOutput: 0,
      averageCarbonIntensity: 0,
    };
  }
}
