"use client";

import { CompleteProjectData } from "@/types/project";
import { MarketIntelligence } from "@/types/dashboard";

interface AnalyticsDashboardProps {
  projectsData: CompleteProjectData[];
  marketData: MarketIntelligence | null;
  setActiveView: (view: string) => void;
}

export default function AnalyticsDashboard({
  projectsData,
  marketData,
  setActiveView
}: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">ROA Calculator & Analytics</h2>
        <button 
          onClick={() => setActiveView('overview')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          ← Back to Overview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROA Calculator */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">💰 Return on Assets Calculator</h3>
          </div>
          <div className="p-6">
            {projectsData.length > 0 && (
              <div className="space-y-4">
                {projectsData.map((project, index) => {
                  const revenue = (project.production?.hydrogen_output_tpy || 0) * (marketData?.h2Price || 8.5) * 1000;
                  const assets = project.financials?.capex || 75000000;
                  const roa = assets > 0 ? ((revenue - (project.financials?.opex || 0)) / assets * 100) : 0;
                  
                  return (
                    <div key={project.project?.$id || index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">{project.project?.project_name}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Annual Revenue</p>
                          <p className="font-semibold text-green-600">${revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Assets</p>
                          <p className="font-semibold">${assets.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Operating Costs</p>
                          <p className="font-semibold text-red-600">${(project.financials?.opex || 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">ROA</p>
                          <p className={`font-bold text-lg ${roa > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {roa.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Financial Projections */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">📈 Financial Projections</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">15.2%</p>
                  <p className="text-sm text-gray-600">Expected IRR</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">4.2</p>
                  <p className="text-sm text-gray-600">NPV Ratio</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">7.8</p>
                  <p className="text-sm text-gray-600">Payback Period</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Market Assumptions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">H₂ Price Growth</span>
                    <span className="font-medium">5.2% annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbon Credit Value</span>
                    <span className="font-medium">$45/tCO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity Factor</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount Rate</span>
                    <span className="font-medium">8.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
