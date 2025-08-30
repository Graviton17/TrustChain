import { NextRequest, NextResponse } from "next/server";
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
  CompleteProjectData,
  Project,
  ProjectCompliance,
  ProjectFinancials,
  ProjectProduction,
  ProjectVerification,
  ProjectApiResponse,
} from "@/types/project";

// GET - Retrieve complete project data by projectId or companyId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const companyId = searchParams.get("companyId");

    if (!projectId && !companyId) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Either projectId or companyId is required",
        },
        { status: 400 }
      );
    }

    const result: CompleteProjectData = {};

    // If companyId is provided, first get all projects for the company
    let actualProjectId = projectId;

    if (companyId) {
      try {
        const projectResult = await databases.listDocuments(
          db,
          ProjectsCollection,
          [Query.equal("companyId", companyId)]
        );

        if (projectResult.documents.length > 0) {
          result.project = projectResult.documents[0] as unknown as Project;
          actualProjectId = projectResult.documents[0].$id;
        } else {
          return NextResponse.json<ProjectApiResponse>(
            {
              success: false,
              error: "No projects found for this company",
            },
            { status: 404 }
          );
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    } else if (projectId) {
      // If projectId is provided, get the specific project
      try {
        const project = await databases.getDocument(
          db,
          ProjectsCollection,
          projectId
        );
        result.project = project as unknown as Project;
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }

    if (!actualProjectId) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    // Fetch all related project data in parallel
    const [
      complianceResult,
      financialsResult,
      productionResult,
      verificationResult,
    ] = await Promise.allSettled([
      databases.listDocuments(db, ProjectComplianceCollection, [
        Query.equal("projectId", actualProjectId),
      ]),
      databases.listDocuments(db, ProjectFinancialsCollection, [
        Query.equal("projectId", actualProjectId),
      ]),
      databases.listDocuments(db, ProjectProductionCollection, [
        Query.equal("projectId", actualProjectId),
      ]),
      databases.listDocuments(db, ProjectVerificationCollection, [
        Query.equal("projectId", actualProjectId),
      ]),
    ]);

    // Process compliance
    if (
      complianceResult.status === "fulfilled" &&
      complianceResult.value.documents.length > 0
    ) {
      result.compliance = complianceResult.value
        .documents[0] as unknown as ProjectCompliance;
    }

    // Process financials
    if (
      financialsResult.status === "fulfilled" &&
      financialsResult.value.documents.length > 0
    ) {
      result.financials = financialsResult.value
        .documents[0] as unknown as ProjectFinancials;
    }

    // Process production
    if (
      productionResult.status === "fulfilled" &&
      productionResult.value.documents.length > 0
    ) {
      result.production = productionResult.value
        .documents[0] as unknown as ProjectProduction;
    }

    // Process verification
    if (
      verificationResult.status === "fulfilled" &&
      verificationResult.value.documents.length > 0
    ) {
      result.verification = verificationResult.value
        .documents[0] as unknown as ProjectVerification;
    }

    return NextResponse.json<ProjectApiResponse<CompleteProjectData>>({
      success: true,
      data: result,
      message: "Complete project data retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving complete project data:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to retrieve complete project data",
      },
      { status: 500 }
    );
  }
}

// POST - Create complete project data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project, compliance, financials, production, verification } = body;

    if (!project || !project.companyId || !project.project_name) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Project with companyId and project_name is required",
        },
        { status: 400 }
      );
    }

    const result: CompleteProjectData = {};

    // Create project first
    try {
      const newProject = await databases.createDocument(
        db,
        ProjectsCollection,
        "unique()",
        {
          companyId: project.companyId,
          project_name: project.project_name,
          sector: project.sector || null,
          location: project.location || null,
          ownership_type: project.ownership_type || null,
          start_year: project.start_year || null,
          completion_year: project.completion_year || null,
          selected_subsidy: project.selected_subsidy || null,
        }
      );

      result.project = newProject as unknown as Project;
      const projectId = newProject.$id;

      // Create related data in parallel if provided
      const promises = [];

      if (compliance) {
        promises.push(
          databases
            .createDocument(db, ProjectComplianceCollection, "unique()", {
              projectId,
              env_clearance_status: compliance.env_clearance_status || null,
              lca_completed: compliance.lca_completed || false,
              mrv_plan: compliance.mrv_plan || false,
            })
            .then((doc) => ({ type: "compliance", data: doc }))
        );
      }

      if (financials) {
        promises.push(
          databases
            .createDocument(db, ProjectFinancialsCollection, "unique()", {
              projectId,
              capex: financials.capex || null,
              opex: financials.opex || null,
              offtake_signed: financials.offtake_signed || false,
            })
            .then((doc) => ({ type: "financials", data: doc }))
        );
      }

      if (production) {
        promises.push(
          databases
            .createDocument(db, ProjectProductionCollection, "unique()", {
              projectId,
              technology_used: production.technology_used || null,
              electrolyzer_type: production.electrolyzer_type || null,
              installed_capacity_mw: production.installed_capacity_mw || null,
              hydrogen_output_tpy: production.hydrogen_output_tpy || null,
            })
            .then((doc) => ({ type: "production", data: doc }))
        );
      }

      if (verification) {
        promises.push(
          databases
            .createDocument(db, ProjectVerificationCollection, "unique()", {
              projectId,
              carbon_intensity: verification.carbon_intensity || null,
              renewable_source: verification.renewable_source || null,
              additionality_proof: verification.additionality_proof || false,
            })
            .then((doc) => ({ type: "verification", data: doc }))
        );
      }

      // Wait for all related data to be created
      const results = await Promise.allSettled(promises);

      results.forEach((promiseResult) => {
        if (promiseResult.status === "fulfilled") {
          const { type, data } = promiseResult.value;
          if (type === "compliance") {
            result.compliance = data as unknown as ProjectCompliance;
          } else if (type === "financials") {
            result.financials = data as unknown as ProjectFinancials;
          } else if (type === "production") {
            result.production = data as unknown as ProjectProduction;
          } else if (type === "verification") {
            result.verification = data as unknown as ProjectVerification;
          }
        }
      });
    } catch (error) {
      console.error("Error creating project data:", error);
      throw error;
    }

    return NextResponse.json<ProjectApiResponse<CompleteProjectData>>(
      {
        success: true,
        data: result,
        message: "Complete project data created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating complete project data:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to create complete project data",
      },
      { status: 500 }
    );
  }
}

// PUT - Update complete project data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { project, compliance, financials, production, verification } = body;

    if (!project || !project.$id) {
      return NextResponse.json<ProjectApiResponse>(
        {
          success: false,
          error: "Project with $id is required for updates",
        },
        { status: 400 }
      );
    }

    const result: CompleteProjectData = {};
    const projectId = project.$id;

    // Update project
    try {
      const { $id, ...projectUpdateData } = project;
      const cleanProjectData = Object.fromEntries(
        Object.entries(projectUpdateData).filter(
          ([, value]) => value !== undefined
        )
      );

      const updatedProject = await databases.updateDocument(
        db,
        ProjectsCollection,
        $id,
        cleanProjectData
      );
      result.project = updatedProject as unknown as Project;
    } catch (error) {
      console.error("Error updating project:", error);
    }

    // Update or create related data
    const promises = [];

    if (compliance) {
      if (compliance.$id) {
        // Update existing compliance
        const { $id, ...complianceUpdateData } = compliance;
        const cleanComplianceData = Object.fromEntries(
          Object.entries(complianceUpdateData).filter(
            ([, value]) => value !== undefined
          )
        );

        promises.push(
          databases
            .updateDocument(
              db,
              ProjectComplianceCollection,
              $id,
              cleanComplianceData
            )
            .then((doc) => ({ type: "compliance", data: doc }))
        );
      } else {
        // Create new compliance
        promises.push(
          databases
            .createDocument(db, ProjectComplianceCollection, "unique()", {
              projectId,
              env_clearance_status: compliance.env_clearance_status || null,
              lca_completed: compliance.lca_completed || false,
              mrv_plan: compliance.mrv_plan || false,
            })
            .then((doc) => ({ type: "compliance", data: doc }))
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
              ProjectFinancialsCollection,
              $id,
              cleanFinancialsData
            )
            .then((doc) => ({ type: "financials", data: doc }))
        );
      } else {
        // Create new financials
        promises.push(
          databases
            .createDocument(db, ProjectFinancialsCollection, "unique()", {
              projectId,
              capex: financials.capex || null,
              opex: financials.opex || null,
              offtake_signed: financials.offtake_signed || false,
            })
            .then((doc) => ({ type: "financials", data: doc }))
        );
      }
    }

    if (production) {
      if (production.$id) {
        // Update existing production
        const { $id, ...productionUpdateData } = production;
        const cleanProductionData = Object.fromEntries(
          Object.entries(productionUpdateData).filter(
            ([, value]) => value !== undefined
          )
        );

        promises.push(
          databases
            .updateDocument(
              db,
              ProjectProductionCollection,
              $id,
              cleanProductionData
            )
            .then((doc) => ({ type: "production", data: doc }))
        );
      } else {
        // Create new production
        promises.push(
          databases
            .createDocument(db, ProjectProductionCollection, "unique()", {
              projectId,
              technology_used: production.technology_used || null,
              electrolyzer_type: production.electrolyzer_type || null,
              installed_capacity_mw: production.installed_capacity_mw || null,
              hydrogen_output_tpy: production.hydrogen_output_tpy || null,
            })
            .then((doc) => ({ type: "production", data: doc }))
        );
      }
    }

    if (verification) {
      if (verification.$id) {
        // Update existing verification
        const { $id, ...verificationUpdateData } = verification;
        const cleanVerificationData = Object.fromEntries(
          Object.entries(verificationUpdateData).filter(
            ([, value]) => value !== undefined
          )
        );

        promises.push(
          databases
            .updateDocument(
              db,
              ProjectVerificationCollection,
              $id,
              cleanVerificationData
            )
            .then((doc) => ({ type: "verification", data: doc }))
        );
      } else {
        // Create new verification
        promises.push(
          databases
            .createDocument(db, ProjectVerificationCollection, "unique()", {
              projectId,
              carbon_intensity: verification.carbon_intensity || null,
              renewable_source: verification.renewable_source || null,
              additionality_proof: verification.additionality_proof || false,
            })
            .then((doc) => ({ type: "verification", data: doc }))
        );
      }
    }

    // Wait for all updates/creates to complete
    const results = await Promise.allSettled(promises);

    results.forEach((promiseResult) => {
      if (promiseResult.status === "fulfilled") {
        const { type, data } = promiseResult.value;
        if (type === "compliance") {
          result.compliance = data as unknown as ProjectCompliance;
        } else if (type === "financials") {
          result.financials = data as unknown as ProjectFinancials;
        } else if (type === "production") {
          result.production = data as unknown as ProjectProduction;
        } else if (type === "verification") {
          result.verification = data as unknown as ProjectVerification;
        }
      }
    });

    return NextResponse.json<ProjectApiResponse<CompleteProjectData>>({
      success: true,
      data: result,
      message: "Complete project data updated successfully",
    });
  } catch (error) {
    console.error("Error updating complete project data:", error);
    return NextResponse.json<ProjectApiResponse>(
      {
        success: false,
        error: "Failed to update complete project data",
      },
      { status: 500 }
    );
  }
}
