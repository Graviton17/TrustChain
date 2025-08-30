# Project API Usage Examples

This document provides examples of how to use the project management API endpoints.

## API Endpoints

### 1. Projects (`/api/projects`)

- **POST**: Create a new project
- **GET**: Retrieve projects with optional filters
- **PUT**: Update an existing project
- **DELETE**: Delete a project

### 2. Project Compliance (`/api/project-compliance`)

- **POST**: Create project compliance information
- **GET**: Retrieve project compliance data
- **PUT**: Update project compliance
- **DELETE**: Delete project compliance

### 3. Project Financials (`/api/project-financials`)

- **POST**: Create project financial data
- **GET**: Retrieve project financials
- **PUT**: Update project financials
- **DELETE**: Delete project financials

### 4. Project Production (`/api/project-production`)

- **POST**: Create project production data
- **GET**: Retrieve project production
- **PUT**: Update project production
- **DELETE**: Delete project production

### 5. Project Verification (`/api/project-verification`)

- **POST**: Create project verification data
- **GET**: Retrieve project verification
- **PUT**: Update project verification
- **DELETE**: Delete project verification

### 6. Complete Project Data (`/api/project-complete`)

- **POST**: Create all project data at once
- **GET**: Retrieve complete project information
- **PUT**: Update complete project data

## Usage Examples

### Creating a Project

```javascript
// POST /api/projects
const createProject = async () => {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyId: "company_123",
      project_name: "Green Hydrogen Production Facility",
      sector: "green_hydrogen",
      location: "California, USA",
      ownership_type: "private",
      start_year: 2024,
      completion_year: 2026,
      selected_subsidy: "ITC_Green_Hydrogen",
    }),
  });

  const result = await response.json();
  console.log(result);
};
```

### Getting Projects by Company ID

```javascript
// GET /api/projects?companyId=company_123
const getProjectsByCompany = async (companyId) => {
  const response = await fetch(`/api/projects?companyId=${companyId}`);
  const result = await response.json();
  console.log(result);
};
```

### Creating Project Compliance

```javascript
// POST /api/project-compliance
const createCompliance = async (projectId) => {
  const response = await fetch("/api/project-compliance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
      env_clearance_status: "approved",
      lca_completed: true,
      mrv_plan: true,
    }),
  });

  const result = await response.json();
  console.log(result);
};
```

### Creating Project Financials

```javascript
// POST /api/project-financials
const createFinancials = async (projectId) => {
  const response = await fetch("/api/project-financials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
      capex: 50000000,
      opex: 5000000,
      offtake_signed: true,
    }),
  });

  const result = await response.json();
  console.log(result);
};
```

### Creating Project Production

```javascript
// POST /api/project-production
const createProduction = async (projectId) => {
  const response = await fetch("/api/project-production", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
      technology_used: "pem_electrolyzer",
      electrolyzer_type: "pem",
      installed_capacity_mw: 100,
      hydrogen_output_tpy: 15000,
    }),
  });

  const result = await response.json();
  console.log(result);
};
```

### Creating Project Verification

```javascript
// POST /api/project-verification
const createVerification = async (projectId) => {
  const response = await fetch("/api/project-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectId,
      carbon_intensity: 0.5,
      renewable_source: "solar",
      additionality_proof: true,
    }),
  });

  const result = await response.json();
  console.log(result);
};
```

### Creating Complete Project Data

```javascript
// POST /api/project-complete
const createCompleteProject = async () => {
  const response = await fetch("/api/project-complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      project: {
        companyId: "company_123",
        project_name: "Green Hydrogen Production Facility",
        sector: "green_hydrogen",
        location: "California, USA",
        ownership_type: "private",
        start_year: 2024,
        completion_year: 2026,
        selected_subsidy: "ITC_Green_Hydrogen",
      },
      compliance: {
        env_clearance_status: "approved",
        lca_completed: true,
        mrv_plan: true,
      },
      financials: {
        capex: 50000000,
        opex: 5000000,
        offtake_signed: true,
      },
      production: {
        technology_used: "pem_electrolyzer",
        electrolyzer_type: "pem",
        installed_capacity_mw: 100,
        hydrogen_output_tpy: 15000,
      },
      verification: {
        carbon_intensity: 0.5,
        renewable_source: "solar",
        additionality_proof: true,
      },
    }),
  });

  const result = await response.json();
  console.log(result);
};
```

### Getting Complete Project Data

```javascript
// GET /api/project-complete?projectId=project_123
const getCompleteDataByProjectId = async (projectId) => {
  const response = await fetch(`/api/project-complete?projectId=${projectId}`);
  const result = await response.json();
  console.log(result);
};

// GET /api/project-complete?companyId=company_123
const getCompleteDataByCompanyId = async (companyId) => {
  const response = await fetch(`/api/project-complete?companyId=${companyId}`);
  const result = await response.json();
  console.log(result);
};
```

### Updating Project

```javascript
// PUT /api/projects
const updateProject = async (projectId, updates) => {
  const response = await fetch("/api/projects", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      $id: projectId,
      ...updates,
    }),
  });

  const result = await response.json();
  console.log(result);
};
```

### Searching Projects

```javascript
// GET /api/projects?sector=green_hydrogen&location=California&limit=10
const searchProjects = async () => {
  const params = new URLSearchParams({
    sector: "green_hydrogen",
    location: "California",
    ownership_type: "private",
    limit: "10",
    offset: "0",
  });

  const response = await fetch(`/api/projects?${params}`);
  const result = await response.json();
  console.log(result);
};
```

### Deleting Project Data

```javascript
// DELETE /api/projects?id=project_123
const deleteProject = async (projectId) => {
  const response = await fetch(`/api/projects?id=${projectId}`, {
    method: "DELETE",
  });

  const result = await response.json();
  console.log(result);
};
```

## Error Handling

All API endpoints return a consistent response format:

```typescript
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  total?: number; // For list responses
}
```

### Example Error Response

```json
{
  "success": false,
  "error": "Project with companyId and project_name is required"
}
```

### Example Success Response

```json
{
  "success": true,
  "data": {
    "$id": "project_123",
    "companyId": "company_123",
    "project_name": "Green Hydrogen Production Facility"
    // ... other fields
  },
  "message": "Project created successfully"
}
```

## TypeScript Integration

When using TypeScript, import the types from the project types file:

```typescript
import {
  Project,
  ProjectCompliance,
  ProjectFinancials,
  ProjectProduction,
  ProjectVerification,
  CompleteProjectData,
  ProjectApiResponse,
  ProjectListResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectSector,
  OwnershipType,
  TechnologyType,
  ElectrolyzerType,
  EnvironmentalClearanceStatus,
  RenewableSource,
} from "@/types/project";

// Type-safe API call
const createProject = async (
  projectData: CreateProjectRequest
): Promise<ProjectApiResponse<Project>> => {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  return response.json();
};
```

## Database Utility Functions

You can also use the utility functions for server-side operations:

```typescript
import {
  getProjectById,
  getProjectsByCompanyId,
  getCompleteProjectData,
  hasProjectData,
  searchProjects,
  getProjectStatsByCompanyId,
} from "@/utils/projectDatabase";

// Server-side usage
const project = await getProjectById("project_123");
const projects = await getProjectsByCompanyId("company_123");
const completeData = await getCompleteProjectData("project_123");
const exists = await hasProjectData("project_123", "compliance");
const stats = await getProjectStatsByCompanyId("company_123");
```

## Business Logic Examples

### Project Status Tracking

```javascript
const getProjectStatus = async (projectId) => {
  const completeData = await fetch(
    `/api/project-complete?projectId=${projectId}`
  );
  const project = await completeData.json();

  if (!project.success) return null;

  const status = {
    hasCompliance: !!project.data.compliance,
    hasFinancials: !!project.data.financials,
    hasProduction: !!project.data.production,
    hasVerification: !!project.data.verification,
    completionPercentage: 0,
  };

  const sections = ["compliance", "financials", "production", "verification"];
  const completedSections = sections.filter((section) => project.data[section]);
  status.completionPercentage =
    (completedSections.length / sections.length) * 100;

  return status;
};
```

### Carbon Footprint Calculation

```javascript
const calculateProjectCarbonFootprint = async (projectId) => {
  const response = await fetch(`/api/project-complete?projectId=${projectId}`);
  const project = await response.json();

  if (
    !project.success ||
    !project.data.verification ||
    !project.data.production
  ) {
    return null;
  }

  const carbonIntensity = project.data.verification.carbon_intensity;
  const hydrogenOutput = project.data.production.hydrogen_output_tpy;

  if (!carbonIntensity || !hydrogenOutput) return null;

  return {
    annualCarbonFootprint: carbonIntensity * hydrogenOutput,
    carbonIntensityRating:
      carbonIntensity < 1
        ? "Excellent"
        : carbonIntensity < 2
        ? "Good"
        : carbonIntensity < 4
        ? "Fair"
        : "Poor",
  };
};
```

### Project Financial Analysis

```javascript
const analyzeProjectFinancials = async (projectId) => {
  const response = await fetch(`/api/project-complete?projectId=${projectId}`);
  const project = await response.json();

  if (
    !project.success ||
    !project.data.financials ||
    !project.data.production
  ) {
    return null;
  }

  const capex = project.data.financials.capex;
  const opex = project.data.financials.opex;
  const capacity = project.data.production.installed_capacity_mw;
  const hydrogenOutput = project.data.production.hydrogen_output_tpy;

  if (!capex || !capacity || !hydrogenOutput) return null;

  return {
    capexPerMW: capex / capacity,
    capexPerTonneH2: capex / hydrogenOutput,
    annualOpexPercentage: opex ? (opex / capex) * 100 : 0,
    hasOfftakeAgreement: project.data.financials.offtake_signed,
  };
};
```
