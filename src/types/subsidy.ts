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
}

export interface ParsedSubsidy
  extends Omit<SubsidyDocument, "incentiveDetails"> {
  incentiveDetails: IncentiveDetails;
}

export interface IncentiveDetails {
  type: string;
  amount: string;
  currency: string;
  [key: string]: unknown;
}

export interface SubsidyFilters {
  country?: string;
  region?: string;
  programType?: string;
  status?: string;
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
