// Types for Subsidy Management System

export interface SubsidyDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  country: string;
  region?: string;
  governingBody?: string;
  programType: string;
  status: string;
  description?: string;
  totalBudget?: string;
  incentiveDetails: string; // JSON string in database
  eligibility: string; // JSON string in database
  applicationProcess?: string; // JSON string in database
  resourceLinks?: string; // JSON string in database
  aiTriggers?: string; // JSON string in database
  sectors?: string[];
}

export interface ParsedSubsidy
  extends Omit<
    SubsidyDocument,
    | "incentiveDetails"
    | "eligibility"
    | "applicationProcess"
    | "resourceLinks"
    | "aiTriggers"
  > {
  incentiveDetails: IncentiveDetails;
  eligibility: EligibilityCriteria;
  applicationProcess?: ApplicationProcess;
  resourceLinks?: ResourceLinks;
  aiTriggers?: AITriggers;
}

export interface IncentiveDetails {
  type: string;
  amount: string;
  currency: string;
  paymentSchedule: string;
  [key: string]: unknown;
}

export interface EligibilityCriteria {
  minProduction: string;
  businessType: string[];
  certificationRequired: string[];
  [key: string]: unknown;
}

export interface ApplicationProcess {
  steps: string[];
  documentsRequired: string[];
  processingTime: string;
  [key: string]: unknown;
}

export interface ResourceLinks {
  website: string;
  applicationForm: string;
  guidelines: string;
  [key: string]: unknown;
}

export interface AITriggers {
  keywords: string[];
  conditions: string[];
  [key: string]: unknown;
}

export interface SubsidyFilters {
  country?: string;
  region?: string;
  programType?: string;
  status?: string;
  sector?: string;
  limit?: number;
  offset?: number;
}

export interface SubsidyAPIResponse {
  success: boolean;
  data?: ParsedSubsidy[];
  total?: number;
  pagination?: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  error?: string;
  details?: string;
  message?: string;
}

export const SUBSIDY_STATUS = {
  ACTIVE: "Active",
  PENDING: "Pending",
  SUSPENDED: "Suspended",
  CLOSED: "Closed",
} as const;

export const PROGRAM_TYPES = {
  PRODUCTION_INCENTIVE: "Production Incentive",
  EQUIPMENT_GRANT: "Equipment Grant",
  RESEARCH_GRANT: "Research Grant",
  TAX_CREDIT: "Tax Credit",
  LOW_INTEREST_LOAN: "Low-Interest Loan",
  INFRASTRUCTURE_SUPPORT: "Infrastructure Support",
} as const;

export type SubsidyStatus =
  (typeof SUBSIDY_STATUS)[keyof typeof SUBSIDY_STATUS];
export type ProgramType = (typeof PROGRAM_TYPES)[keyof typeof PROGRAM_TYPES];
