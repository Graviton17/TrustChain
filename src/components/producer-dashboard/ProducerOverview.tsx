"use client";

import { useRouter } from "next/navigation";
import { CompleteProjectData } from "@/types/project";
import {
  SubsidyRecommendation,
  MarketIntelligence,
  ProductionStats,
  RiskAssessment
} from "@/types/dashboard";

interface ProducerOverviewProps {
  projectsData: CompleteProjectData[];
  subsidyRecommendations: SubsidyRecommendation[];
  marketData: MarketIntelligence | null;
  productionStats: ProductionStats | null;
  riskAssessment: RiskAssessment | null;
  setActiveView: (view: string) => void;
}

export default function ProducerOverview({
  projectsData,
  subsidyRecommendations,
  marketData,
  productionStats,
  riskAssessment,
  setActiveView
}: ProducerOverviewProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <button
              onClick={() => router.push("/subsidies")}
              className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors w-full"
            >
              <span className="mr-2">💰</span>
              Browse Subsidies
            </button>
            <button 
              onClick={() => setActiveView('production')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full"
            >
              <span className="mr-2">📊</span>
              Production Report
            </button>
            <button 
              onClick={() => setActiveView('analytics')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full"
            >
              <span className="mr-2">📈</span>
              ROA Calculator
            </button>
            <button 
              onClick={() => setActiveView('certificates')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full"
            >
              <span className="mr-2">🏆</span>
              Certificates
            </button>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">⚡</span>
                </div>
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Monthly Production
                  </dt>
                  <dd className="text-base sm:text-lg font-medium text-gray-900">
                    {productionStats ? `${Math.round(productionStats.monthlyProduction)} kg H₂` : 'Loading...'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🏭</span>
                </div>
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Projects
                  </dt>
                  <dd className="text-base sm:text-lg font-medium text-gray-900">
                    {productionStats ? `${productionStats.activeProjects} Projects` : 'Loading...'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">💰</span>
                </div>
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Available Subsidies
                  </dt>
                  <dd className="text-base sm:text-lg font-medium text-gray-900">
                    ${subsidyRecommendations.reduce((sum, sub) => sum + parseInt(sub.amount.replace(/[$,]/g, '')), 0).toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  riskAssessment?.riskLevel === 'low' ? 'bg-green-100' :
                  riskAssessment?.riskLevel === 'medium' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <span className={`text-lg ${
                    riskAssessment?.riskLevel === 'low' ? 'text-green-600' :
                    riskAssessment?.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>🛡️</span>
                </div>
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Risk Score
                  </dt>
                  <dd className="text-base sm:text-lg font-medium text-gray-900">
                    {riskAssessment ? `${riskAssessment.overallScore}/100` : 'Calculating...'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Subsidy Recommendations & Market Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                🤖 AI Subsidy Recommendations
              </h3>
              <button 
                onClick={() => setActiveView('subsidies')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {subsidyRecommendations.slice(0, 3).map((subsidy) => (
                <div key={subsidy.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {subsidy.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {subsidy.eligibilityReason}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-lg font-semibold text-green-600">
                          {subsidy.amount}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subsidy.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                          subsidy.matchScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {subsidy.matchScore}% match
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              📊 Real-time Market Intelligence
            </h3>
            {marketData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">H₂ Market Price</p>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold text-gray-900">
                        ${marketData.h2Price}/kg
                      </span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        marketData.priceChange > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {marketData.priceChange > 0 ? '↗' : '↘'} {Math.abs(marketData.priceChange)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Trend</p>
                    <p className={`text-sm font-medium ${
                      marketData.marketTrend === 'up' ? 'text-green-600' :
                      marketData.marketTrend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {marketData.marketTrend === 'up' ? 'Bullish' :
                       marketData.marketTrend === 'down' ? 'Bearish' : 'Stable'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{marketData.competitorCount}</p>
                    <p className="text-sm text-gray-600">Competitors</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">Q4</p>
                    <p className="text-sm text-gray-600">High Demand</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Production Facilities & Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              🏭 Production Facilities
            </h3>
            <div className="space-y-3">
              {projectsData.map((projectData, index) => (
                <div key={projectData.project?.$id || index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="text-xl mr-3 flex-shrink-0">🏭</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {projectData.project?.project_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Capacity: {projectData.production?.installed_capacity_mw || 0} MW
                        </p>
                        <p className="text-sm text-gray-500">
                          Output: {projectData.production?.hydrogen_output_tpy || 0} TPY
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              🛡️ Risk Assessment
            </h3>
            {riskAssessment && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${
                    riskAssessment.riskLevel === 'low' ? 'bg-green-100 text-green-600' :
                    riskAssessment.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {riskAssessment.overallScore}
                  </div>
                  <p className={`mt-2 text-sm font-medium ${
                    riskAssessment.riskLevel === 'low' ? 'text-green-600' :
                    riskAssessment.riskLevel === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {riskAssessment.riskLevel.toUpperCase()} RISK
                  </p>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(riskAssessment.factors).map(([factor, score]) => (
                    <div key={factor} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {factor}
                      </span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              score >= 80 ? 'bg-green-500' :
                              score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
