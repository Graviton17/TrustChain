"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getRoleFromUser } from "@/utils/roles";
import LogoutButton from "@/components/LogoutButton";
import { 
  CompleteCompanyData
} from "@/types/company";
import { 
  CompleteProjectData
} from "@/types/project";
import {
  SubsidyRecommendation,
  MarketIntelligence,
  ProductionStats,
  RiskAssessment,
  Certificate,
  DashboardView
} from "@/types/dashboard";

// Import dashboard components
import ProducerOverview from "@/components/producer-dashboard/ProducerOverview";
import ProductionDashboard from "@/components/producer-dashboard/ProductionDashboard";
import SubsidiesDashboard from "@/components/producer-dashboard/SubsidiesDashboard";
import AnalyticsDashboard from "@/components/producer-dashboard/AnalyticsDashboard";
import CertificatesDashboard from "@/components/producer-dashboard/CertificatesDashboard";
import MapDashboard from "@/components/producer-dashboard/MapDashboard";

export default function ProducerDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  
  // State for dashboard data
  const [companyData, setCompanyData] = useState<CompleteCompanyData | null>(null);
  const [projectsData, setProjectsData] = useState<CompleteProjectData[]>([]);
  const [subsidyRecommendations, setSubsidyRecommendations] = useState<SubsidyRecommendation[]>([]);
  const [marketData, setMarketData] = useState<MarketIntelligence | null>(null);
  const [productionStats, setProductionStats] = useState<ProductionStats | null>(null);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<DashboardView>('overview');

  const loadDashboardData = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Load company data
      await loadCompanyData(user.id);
      
      // Load market intelligence (mock data for now)
      setMarketData({
        h2Price: 8.50,
        priceChange: 2.3,
        marketTrend: 'up',
        demandForecast: 'High demand expected in Q4 2024',
        competitorCount: 147
      });
      
      // Load mock certificates
      setCertificates([
        {
          id: 'CERT-001',
          type: 'Green H2 Production',
          amount: 1250,
          issuedDate: '2024-08-15',
          verificationStatus: 'verified'
        },
        {
          id: 'CERT-002',
          type: 'Carbon Neutral',
          amount: 980,
          issuedDate: '2024-08-01',
          verificationStatus: 'verified'
        }
      ]);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isLoaded && user) {
      const userRole = getRoleFromUser(user);
      if (userRole !== "producer") {
        // Redirect to appropriate dashboard based on role
        switch (userRole) {
          case "government":
            router.push("/government-dashboard");
            break;
          case "customer":
            router.push("/customer-dashboard");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        // Load dashboard data
        loadDashboardData();
      }
    }
  }, [isLoaded, isSignedIn, user, router]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCompanyData = useCallback(async (userId: string) => {
    try {
      // This would typically fetch from your API
      // For now, using mock data based on user
      const mockCompanyData: CompleteCompanyData = {
        profile: {
          $id: 'company-123',
          userId: userId,
          company_name: 'GreenTech Hydrogen Solutions',
          company_type: 'private_limited',
          company_size: 'medium',
          country: 'India',
          state: 'Maharashtra',
          year_incorporation: 2019,
          website: 'https://greentech-h2.com'
        }
      };
      
      setCompanyData(mockCompanyData);
      
      // Load project data and calculate stats
      await loadProjectsData('company-123');
      
    } catch (error) {
      console.error('Error loading company data:', error);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProjectsData = useCallback(async (companyId: string) => {
    try {
      // Mock project data
      const mockProjects: CompleteProjectData[] = [
        {
          project: {
            $id: 'proj-001',
            companyId: companyId,
            project_name: 'Mumbai Green H2 Plant',
            sector: 'green_hydrogen',
            location: 'Mumbai, Maharashtra',
            start_year: 2022,
            completion_year: 2024,
            ownership_type: 'private'
          },
          production: {
            $id: 'prod-001',
            projectId: 'proj-001',
            technology_used: 'Alkaline Electrolyzer',
            electrolyzer_type: 'alkaline',
            installed_capacity_mw: 50,
            hydrogen_output_tpy: 1250
          },
          financials: {
            $id: 'fin-001',
            projectId: 'proj-001',
            capex: 75000000,
            opex: 15000000,
            offtake_signed: true
          }
        },
        {
          project: {
            $id: 'proj-002',
            companyId: companyId,
            project_name: 'Pune Solar H2 Facility',
            sector: 'green_hydrogen',
            location: 'Pune, Maharashtra',
            start_year: 2023,
            completion_year: 2025,
            ownership_type: 'private'
          },
          production: {
            $id: 'prod-002',
            projectId: 'proj-002',
            technology_used: 'PEM Electrolyzer',
            electrolyzer_type: 'pem',
            installed_capacity_mw: 75,
            hydrogen_output_tpy: 1800
          }
        }
      ];
      
      setProjectsData(mockProjects);
      
      // Calculate production stats
      const totalCapacity = mockProjects.reduce((sum, proj) => 
        sum + (proj.production?.installed_capacity_mw || 0), 0);
      const totalOutput = mockProjects.reduce((sum, proj) => 
        sum + (proj.production?.hydrogen_output_tpy || 0), 0);
      
      setProductionStats({
        monthlyProduction: totalOutput / 12,
        yearlyProduction: totalOutput,
        capacityUtilization: 85.2,
        activeProjects: mockProjects.length,
        totalCapacity: totalCapacity
      });

      // Generate subsidy recommendations
      generateSubsidyRecommendations();
      
      // Calculate risk assessment
      calculateRiskAssessment(companyData, mockProjects);
      
    } catch (error) {
      console.error('Error loading projects data:', error);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const generateSubsidyRecommendations = useCallback(() => {
    const recommendations: SubsidyRecommendation[] = [
      {
        id: 'sub-001',
        name: 'Green Hydrogen Production Incentive',
        amount: '$25,000',
        matchScore: 95,
        eligibilityReason: 'High production capacity match',
        deadlineDate: '2024-12-31'
      },
      {
        id: 'sub-002',
        name: 'Clean Energy Equipment Grant',
        amount: '$50,000',
        matchScore: 88,
        eligibilityReason: 'Eligible technology type',
        deadlineDate: '2024-11-15'
      },
      {
        id: 'sub-003',
        name: 'Carbon Neutral Manufacturing Credit',
        amount: '$15,000',
        matchScore: 82,
        eligibilityReason: 'Meets carbon intensity requirements',
        deadlineDate: '2024-10-30'
      }
    ];
    
    setSubsidyRecommendations(recommendations);
  }, []);

  const calculateRiskAssessment = useCallback((company: CompleteCompanyData | null, projects: CompleteProjectData[]) => {
    // Simple risk calculation algorithm
    let financialScore = 75; // Base score
    let operationalScore = 80;
    const complianceScore = 90;
    const marketScore = 70;
    
    // Adjust based on project portfolio
    if (projects.length > 1) operationalScore += 10;
    if (projects.some(p => p.financials?.offtake_signed)) financialScore += 15;
    
    const overallScore = Math.round((financialScore + operationalScore + complianceScore + marketScore) / 4);
    
    setRiskAssessment({
      overallScore,
      riskLevel: overallScore >= 80 ? 'low' : overallScore >= 60 ? 'medium' : 'high',
      factors: {
        financial: financialScore,
        operational: operationalScore,
        compliance: complianceScore,
        market: marketScore
      }
    });
  }, []);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const handleViewChange = (view: string) => {
    setActiveView(view as DashboardView);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <ProducerOverview
            projectsData={projectsData}
            subsidyRecommendations={subsidyRecommendations}
            marketData={marketData}
            productionStats={productionStats}
            riskAssessment={riskAssessment}
            setActiveView={handleViewChange}
          />
        );
      case 'production':
        return (
          <ProductionDashboard
            projectsData={projectsData}
            productionStats={productionStats}
            setActiveView={handleViewChange}
          />
        );
      case 'subsidies':
        return (
          <SubsidiesDashboard
            subsidyRecommendations={subsidyRecommendations}
            setActiveView={handleViewChange}
          />
        );
      case 'analytics':
        return (
          <AnalyticsDashboard
            projectsData={projectsData}
            marketData={marketData}
            setActiveView={handleViewChange}
          />
        );
      case 'certificates':
        return (
          <CertificatesDashboard
            certificates={certificates}
            setActiveView={handleViewChange}
          />
        );
      case 'map':
        return (
          <MapDashboard
            projectsData={projectsData}
            setActiveView={handleViewChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Producer Dashboard
              </h1>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl">🏭</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 truncate">
                Welcome, {companyData?.profile?.company_name || user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
              </div>
              <LogoutButton variant="secondary" className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'production', name: 'Production', icon: '🏭' },
              { id: 'subsidies', name: 'AI Subsidies', icon: '🤖' },
              { id: 'analytics', name: 'ROA Calculator', icon: '💰' },
              { id: 'certificates', name: 'Certificates', icon: '🏆' },
              { id: 'map', name: 'Live Map', icon: '🗺️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as DashboardView)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeView === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderContent()}
      </div>
    </div>
  );
}
