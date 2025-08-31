"use client";

import { CompleteProjectData } from "@/types/project";

interface MapDashboardProps {
  projectsData: CompleteProjectData[];
  setActiveView: (view: string) => void;
}

export default function MapDashboard({
  projectsData,
  setActiveView
}: MapDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Region-wise Live Map</h2>
        <button 
          onClick={() => setActiveView('overview')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          ← Back to Overview
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Interactive Production Map</h3>
            <p className="text-gray-600 mb-6">
              Real-time visualization of your hydrogen production facilities across regions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {projectsData.map((project, index) => (
                <div key={project.project?.$id || index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📍</span>
                    <div>
                      <p className="font-medium text-gray-900">{project.project?.project_name}</p>
                      <p className="text-sm text-gray-500">{project.project?.location}</p>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{project.production?.installed_capacity_mw || 0} MW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
              Open Full Map View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
