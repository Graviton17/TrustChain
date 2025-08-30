export interface InsurancePolicy {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  providerId: string;
  policy_name: string;
  policy_type: string; // e.g., National, State-Level
  target_region?: string; // e.g., Gujarat
  description?: string;
  total_outlay_covered?: string;
  eligibility_summary?: string;
  terms_url?: string;
}

export interface CreateInsurancePolicyRequest {
  providerId: string;
  policy_name: string;
  policy_type: string;
  target_region?: string;
  description?: string;
  total_outlay_covered?: string;
  eligibility_summary?: string;
  terms_url?: string;
}

export interface UpdateInsurancePolicyRequest {
  providerId?: string;
  policy_name?: string;
  policy_type?: string;
  target_region?: string;
  description?: string;
  total_outlay_covered?: string;
  eligibility_summary?: string;
  terms_url?: string;
}

export interface InsurancePolicyResponse {
  success: boolean;
  data?: InsurancePolicy | InsurancePolicy[];
  message?: string;
  error?: string;
}

export interface InsurancePolicyListResponse {
  success: boolean;
  data?: InsurancePolicy[];
  total?: number;
  message?: string;
  error?: string;
}
