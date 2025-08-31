// Types for Producer Dashboard Components

export interface SubsidyRecommendation {
  id: string;
  name: string;
  amount: string;
  matchScore: number;
  eligibilityReason: string;
  deadlineDate: string;
}

export interface MarketIntelligence {
  h2Price: number;
  priceChange: number;
  marketTrend: 'up' | 'down' | 'stable';
  demandForecast: string;
  competitorCount: number;
}

export interface ProductionStats {
  monthlyProduction: number;
  yearlyProduction: number;
  capacityUtilization: number;
  activeProjects: number;
  totalCapacity: number;
}

export interface RiskAssessment {
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: {
    financial: number;
    operational: number;
    compliance: number;
    market: number;
  };
}

export interface Certificate {
  id: string;
  type: string;
  amount: number;
  issuedDate: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
}

export type DashboardView = 'overview' | 'production' | 'subsidies' | 'analytics' | 'certificates' | 'map';
