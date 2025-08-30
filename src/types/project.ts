// Types for Project Management System

// Base type for Appwrite documents
export interface BaseDocument {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  $permissions?: string[];
}

// Project Types
export interface Project extends BaseDocument {
  companyId: string;
  project_name: string;
  sector?: string;
  location?: string;
  ownership_type?: string;
  start_year?: number;
  completion_year?: number;
  selected_subsidy?: string;
}

export interface CreateProjectRequest {
  companyId: string;
  project_name: string;
  sector?: string;
  location?: string;
  ownership_type?: string;
  start_year?: number;
  completion_year?: number;
  selected_subsidy?: string;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  $id: string;
}

// Project Compliance Types
export interface ProjectCompliance extends BaseDocument {
  projectId: string;
  env_clearance_status?: string;
  lca_completed?: boolean;
  mrv_plan?: boolean;
}

export interface CreateProjectComplianceRequest {
  projectId: string;
  env_clearance_status?: string;
  lca_completed?: boolean;
  mrv_plan?: boolean;
}

export interface UpdateProjectComplianceRequest
  extends Partial<CreateProjectComplianceRequest> {
  $id: string;
}

// Project Financials Types
export interface ProjectFinancials extends BaseDocument {
  projectId: string;
  capex?: number;
  opex?: number;
  offtake_signed?: boolean;
}

export interface CreateProjectFinancialsRequest {
  projectId: string;
  capex?: number;
  opex?: number;
  offtake_signed?: boolean;
}

export interface UpdateProjectFinancialsRequest
  extends Partial<CreateProjectFinancialsRequest> {
  $id: string;
}

// Project Production Types
export interface ProjectProduction extends BaseDocument {
  projectId: string;
  technology_used?: string;
  electrolyzer_type?: string;
  installed_capacity_mw?: number;
  hydrogen_output_tpy?: number;
}

export interface CreateProjectProductionRequest {
  projectId: string;
  technology_used?: string;
  electrolyzer_type?: string;
  installed_capacity_mw?: number;
  hydrogen_output_tpy?: number;
}

export interface UpdateProjectProductionRequest
  extends Partial<CreateProjectProductionRequest> {
  $id: string;
}

// Project Verification Types
export interface ProjectVerification extends BaseDocument {
  projectId: string;
  carbon_intensity?: number;
  renewable_source?: string;
  additionality_proof?: boolean;
}

export interface CreateProjectVerificationRequest {
  projectId: string;
  carbon_intensity?: number;
  renewable_source?: string;
  additionality_proof?: boolean;
}

export interface UpdateProjectVerificationRequest
  extends Partial<CreateProjectVerificationRequest> {
  $id: string;
}

// Combined Project Data Type
export interface CompleteProjectData {
  project?: Project;
  compliance?: ProjectCompliance;
  financials?: ProjectFinancials;
  production?: ProjectProduction;
  verification?: ProjectVerification;
}

// API Response Types
export interface ProjectApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProjectListResponse<T = unknown> {
  success: boolean;
  data?: T[];
  total?: number;
  error?: string;
  message?: string;
}

// Query Parameters for GET requests
export interface ProjectQueryParams {
  companyId?: string;
  projectId?: string;
  sector?: string;
  location?: string;
  ownership_type?: string;
  start_year?: number;
  completion_year?: number;
  limit?: number;
  offset?: number;
}

// Validation Types
export type ProjectKeys = keyof CreateProjectRequest;
export type ProjectComplianceKeys = keyof CreateProjectComplianceRequest;
export type ProjectFinancialsKeys = keyof CreateProjectFinancialsRequest;
export type ProjectProductionKeys = keyof CreateProjectProductionRequest;
export type ProjectVerificationKeys = keyof CreateProjectVerificationRequest;

// Enum Types
export enum ProjectSector {
  RENEWABLE_ENERGY = "renewable_energy",
  GREEN_HYDROGEN = "green_hydrogen",
  SOLAR = "solar",
  WIND = "wind",
  HYDRO = "hydro",
  GEOTHERMAL = "geothermal",
  BIOMASS = "biomass",
  ENERGY_STORAGE = "energy_storage",
  CARBON_CAPTURE = "carbon_capture",
  SUSTAINABLE_TRANSPORT = "sustainable_transport",
}

export enum OwnershipType {
  PRIVATE = "private",
  PUBLIC = "public",
  PPP = "public_private_partnership",
  JOINT_VENTURE = "joint_venture",
  COOPERATIVE = "cooperative",
}

export enum TechnologyType {
  PEM_ELECTROLYZER = "pem_electrolyzer",
  ALKALINE_ELECTROLYZER = "alkaline_electrolyzer",
  SOLID_OXIDE_ELECTROLYZER = "solid_oxide_electrolyzer",
  PHOTOVOLTAIC = "photovoltaic",
  WIND_TURBINE = "wind_turbine",
  HYDROELECTRIC = "hydroelectric",
  GEOTHERMAL_PLANT = "geothermal_plant",
  BIOMASS_PLANT = "biomass_plant",
}

export enum ElectrolyzerType {
  PEM = "pem",
  ALKALINE = "alkaline",
  SOLID_OXIDE = "solid_oxide",
  ANION_EXCHANGE = "anion_exchange",
}

export enum EnvironmentalClearanceStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  NOT_REQUIRED = "not_required",
  IN_PROGRESS = "in_progress",
}

export enum RenewableSource {
  SOLAR = "solar",
  WIND = "wind",
  HYDRO = "hydro",
  GEOTHERMAL = "geothermal",
  BIOMASS = "biomass",
  MIXED = "mixed",
  GRID_CONNECTED = "grid_connected",
}

// Project Status Types
export enum ProjectStatus {
  PLANNING = "planning",
  DEVELOPMENT = "development",
  CONSTRUCTION = "construction",
  OPERATIONAL = "operational",
  MAINTENANCE = "maintenance",
  DECOMMISSIONED = "decommissioned",
  CANCELLED = "cancelled",
}

// Financial Status Types
export enum FinancialStatus {
  FUNDED = "funded",
  SEEKING_FUNDING = "seeking_funding",
  PARTIALLY_FUNDED = "partially_funded",
  SELF_FUNDED = "self_funded",
}

// Project Phase Types
export enum ProjectPhase {
  CONCEPT = "concept",
  FEASIBILITY = "feasibility",
  DESIGN = "design",
  PERMITTING = "permitting",
  CONSTRUCTION = "construction",
  COMMISSIONING = "commissioning",
  OPERATION = "operation",
}

// Compliance Status Types
export enum ComplianceStatus {
  COMPLIANT = "compliant",
  NON_COMPLIANT = "non_compliant",
  PENDING_REVIEW = "pending_review",
  CONDITIONALLY_COMPLIANT = "conditionally_compliant",
}
