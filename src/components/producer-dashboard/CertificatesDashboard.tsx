"use client";

import { useRouter } from "next/navigation";
import { Certificate } from "@/types/dashboard";

interface CertificatesDashboardProps {
  certificates: Certificate[];
  setActiveView: (view: string) => void;
}

export default function CertificatesDashboard({
  certificates,
  setActiveView
}: CertificatesDashboardProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Green H₂ Certificates (NFTs)</h2>
        <button 
          onClick={() => setActiveView('overview')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          ← Back to Overview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{cert.type}</h3>
                    <p className="text-sm text-gray-500">Certificate ID: {cert.id}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  cert.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
                  cert.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {cert.verificationStatus}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Amount Certified</span>
                  <span className="text-sm font-medium">{cert.amount} kg H₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Issue Date</span>
                  <span className="text-sm font-medium">{new Date(cert.issuedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Carbon Intensity</span>
                  <span className="text-sm font-medium text-green-600">&lt; 1 kg CO₂/kg H₂</span>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                  View Certificate
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Create New Certificate Button */}
        <div className="bg-white shadow rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-xl">➕</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Certificate</h3>
            <p className="text-sm text-gray-500 mb-4">
              Generate a new Green H₂ certificate for your recent production
            </p>
            <button 
              onClick={() => router.push("/certificate")}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Create Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
