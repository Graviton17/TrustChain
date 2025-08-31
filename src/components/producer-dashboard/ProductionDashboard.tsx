"use client";

import { CompleteProjectData } from "@/types/project";
import { ProductionStats } from "@/types/dashboard";

interface ProductionDashboardProps {
  projectsData: CompleteProjectData[];
  productionStats: ProductionStats | null;
  setActiveView: (view: string) => void;
}

export default function ProductionDashboard({
  projectsData,
  productionStats,
  setActiveView
}: ProductionDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Production Analytics</h2>
        <button 
          onClick={() => setActiveView('overview')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          ← Back to Overview
        </button>
      </div>

      {/* Production Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">⚡</span>
            </div>
            <div className="ml-4">
              <p className="text-blue-100">Total Capacity</p>
              <p className="text-2xl font-bold">{productionStats?.totalCapacity || 0} MW</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-green-100">Capacity Utilization</p>
              <p className="text-2xl font-bold">{productionStats?.capacityUtilization || 0}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-purple-100">Annual Output</p>
              <p className="text-2xl font-bold">{productionStats?.yearlyProduction || 0} TPY</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">🏭</span>
            </div>
            <div className="ml-4">
              <p className="text-orange-100">Active Plants</p>
              <p className="text-2xl font-bold">{productionStats?.activeProjects || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Production Facilities */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Production Facilities Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technology
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity (MW)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Output (TPY)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectsData.map((projectData, index) => (
                <tr key={projectData.project?.$id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-lg mr-3">🏭</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {projectData.project?.project_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {projectData.project?.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {projectData.production?.technology_used || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {projectData.production?.installed_capacity_mw || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {projectData.production?.hydrogen_output_tpy || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
