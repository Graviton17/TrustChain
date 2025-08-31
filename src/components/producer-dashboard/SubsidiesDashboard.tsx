"use client";

import { useRouter } from "next/navigation";
import { SubsidyRecommendation } from "@/types/dashboard";

interface SubsidiesDashboardProps {
  subsidyRecommendations: SubsidyRecommendation[];
  setActiveView: (view: string) => void;
}

export default function SubsidiesDashboard({
  subsidyRecommendations,
  setActiveView
}: SubsidiesDashboardProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">AI Subsidy Recommendations</h2>
        <button 
          onClick={() => setActiveView('overview')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          ← Back to Overview
        </button>
      </div>

      <div className="grid gap-6">
        {subsidyRecommendations.map((subsidy) => (
          <div key={subsidy.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{subsidy.name}</h3>
                  <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    subsidy.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                    subsidy.matchScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {subsidy.matchScore}% Match
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{subsidy.amount}</p>
                  <p className="text-sm text-gray-500">Available</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Eligibility Reason</p>
                  <p className="text-sm text-gray-600">{subsidy.eligibilityReason}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Application Deadline</p>
                  <p className="text-sm text-gray-600">{new Date(subsidy.deadlineDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => router.push("/application-form")}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  Apply Now
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
