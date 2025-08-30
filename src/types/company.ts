// Types for Company Management System

// Base type for Appwrite documents
export interface BaseDocument {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  $permissions?: string[];
}

// Company Profile Types
export interface CompanyProfile extends BaseDocument {
  userId: string;
  company_name: string;
  registration_number?: string;
  company_type?: string;
  company_size?: string;
  year_incorporation?: number;
  country?: string;
  state?: string;
  website?: string;
}

export interface CreateCompanyProfileRequest {
  userId: string;
  company_name: string;
  registration_number?: string;
  company_type?: string;
  company_size?: string;
  year_incorporation?: number;
  country?: string;
  state?: string;
  website?: string;
}

export interface UpdateCompanyProfileRequest
  extends Partial<CreateCompanyProfileRequest> {
  $id: string;
}

// Company Contacts Types
export interface CompanyContacts extends BaseDocument {
  companyId: string;
  contact_person_name?: string;
  contact_person_designation?: string;
  contact_email?: string;
  contact_phone?: string;
}

export interface CreateCompanyContactsRequest {
  companyId: string;
  contact_person_name?: string;
  contact_person_designation?: string;
  contact_email?: string;
  contact_phone?: string;
}

export interface UpdateCompanyContactsRequest
  extends Partial<CreateCompanyContactsRequest> {
  $id: string;
}

// Company Financials Types
export interface CompanyFinancials extends BaseDocument {
  companyId: string;
  annual_revenue?: number;
  net_worth?: number;
  credit_rating?: string;
  past_project_success_rate?: number;
}

export interface CreateCompanyFinancialsRequest {
  companyId: string;
  annual_revenue?: number;
  net_worth?: number;
  credit_rating?: string;
  past_project_success_rate?: number;
}

export interface UpdateCompanyFinancialsRequest
  extends Partial<CreateCompanyFinancialsRequest> {
  $id: string;
}

// Company Operations Types
export interface CompanyOperations extends BaseDocument {
  companyId: string;
  employees?: number;
  headquarters_address?: string;
}

export interface CreateCompanyOperationsRequest {
  companyId: string;
  employees?: number;
  headquarters_address?: string;
}

export interface UpdateCompanyOperationsRequest
  extends Partial<CreateCompanyOperationsRequest> {
  $id: string;
}

// Combined Company Data Type
export interface CompleteCompanyData {
  profile?: CompanyProfile;
  contacts?: CompanyContacts;
  financials?: CompanyFinancials;
  operations?: CompanyOperations;
}

// API Response Types
export interface CompanyApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CompanyListResponse<T = unknown> {
  success: boolean;
  data?: T[];
  total?: number;
  error?: string;
  message?: string;
}

// Query Parameters for GET requests
export interface CompanyQueryParams {
  userId?: string;
  companyId?: string;
  country?: string;
  company_size?: string;
  company_type?: string;
  limit?: number;
  offset?: number;
}

// Validation Types
export type CompanyProfileKeys = keyof CreateCompanyProfileRequest;
export type CompanyContactsKeys = keyof CreateCompanyContactsRequest;
export type CompanyFinancialsKeys = keyof CreateCompanyFinancialsRequest;
export type CompanyOperationsKeys = keyof CreateCompanyOperationsRequest;

// Enum Types
export enum CompanySize {
  STARTUP = "startup",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  ENTERPRISE = "enterprise",
}

export enum CompanyType {
  PRIVATE_LIMITED = "private_limited",
  PUBLIC_LIMITED = "public_limited",
  PARTNERSHIP = "partnership",
  SOLE_PROPRIETORSHIP = "sole_proprietorship",
  LLP = "llp",
  NGO = "ngo",
  GOVERNMENT = "government",
}

export enum CreditRating {
  AAA = "AAA",
  AA = "AA",
  A = "A",
  BBB = "BBB",
  BB = "BB",
  B = "B",
  CCC = "CCC",
  CC = "CC",
  C = "C",
  D = "D",
}
