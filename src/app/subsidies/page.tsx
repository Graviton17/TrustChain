"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getRoleFromUser, type UserRole } from "@/utils/roles";
import type { ParsedSubsidy, SubsidyFilters } from "@/types/subsidy";

const COUNTRIES = [
  "India",
  "United States",
  "Germany",
  "Japan",
  "Australia",
  "Canada",
  "United Kingdom",
  "France",
];

const PROGRAM_TYPES = [
  "Production Incentive",
  "Equipment Grant",
  "Research Grant",
  "Tax Credit",
  "Low-Interest Loan",
  "Infrastructure Support",
];

export default function SubsidiesPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [subsidies, setSubsidies] = useState<ParsedSubsidy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<
    Pick<SubsidyFilters, "country" | "programType" | "status">
  >({
    country: "",
    programType: "",
    status: "Active",
  });
  const [selectedSubsidy, setSelectedSubsidy] = useState<ParsedSubsidy | null>(
    null
  );
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const fetchSubsidies = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.country) params.append("country", filters.country);
      if (filters.programType)
        params.append("programType", filters.programType);
      if (filters.status) params.append("status", filters.status);

      const response = await fetch(`/api/subsidies?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setSubsidies(data.data);
      }
    } catch (error) {
      console.error("Error fetching subsidies:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }
    if (isLoaded && user) {
      const role = getRoleFromUser(user);
      setUserRole(role);
    }
    fetchSubsidies();
  }, [isLoaded, isSignedIn, router, user, fetchSubsidies]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Subsidies Portal
              </h1>
              <span className="ml-3 text-2xl">💰</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome,{" "}
                {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
              </div>
              {userRole === "government" && (
                <button
                  onClick={() => router.push("/subsidies-manager")}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Manage Subsidies
                </button>
              )}
            </div>
          </div>

          {/* Single page - no tabs needed */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subsidies Content */}
        <div>
          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Filter Subsidies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={filters.country}
                    onChange={(e) =>
                      setFilters({ ...filters, country: e.target.value })
                    }
                    aria-label="Filter by Country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Countries</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program Type
                  </label>
                  <select
                    value={filters.programType}
                    onChange={(e) =>
                      setFilters({ ...filters, programType: e.target.value })
                    }
                    aria-label="Filter by Program Type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Program Types</option>
                    {PROGRAM_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                    aria-label="Filter by Status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Subsidies Grid */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading subsidies...</p>
            </div>
          ) : subsidies.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">
                No subsidies found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subsidies.map((subsidy) => (
                <div
                  key={subsidy.$id}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          subsidy.status
                        )}`}
                      >
                        {subsidy.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {subsidy.country}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {subsidy.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-20 font-medium">Type:</span>
                        <span>{subsidy.programType}</span>
                      </div>
                      {subsidy.totalBudget && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="w-20 font-medium">Budget:</span>
                          <span>{subsidy.totalBudget}</span>
                        </div>
                      )}
                      {subsidy.sectors && subsidy.sectors.length > 0 && (
                        <div className="flex items-start text-sm text-gray-600">
                          <span className="w-20 font-medium flex-shrink-0">
                            Sectors:
                          </span>
                          <span className="flex flex-wrap gap-1">
                            {subsidy.sectors
                              .slice(0, 2)
                              .map((sector, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {sector}
                                </span>
                              ))}
                            {subsidy.sectors.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{subsidy.sectors.length - 2} more
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {subsidy.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {subsidy.description}
                      </p>
                    )}

                    <button
                      onClick={() => setSelectedSubsidy(subsidy)}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Subsidy Details Modal */}
      {selectedSubsidy && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedSubsidy.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedSubsidy.status
                      )}`}
                    >
                      {selectedSubsidy.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedSubsidy.country}
                    </span>
                    {selectedSubsidy.region && (
                      <span className="text-sm text-gray-500">
                        • {selectedSubsidy.region}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubsidy(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Program Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Program Type:
                      </span>
                      <p className="text-sm text-gray-900">
                        {selectedSubsidy.programType}
                      </p>
                    </div>
                    {selectedSubsidy.governingBody && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Governing Body:
                        </span>
                        <p className="text-sm text-gray-900">
                          {selectedSubsidy.governingBody}
                        </p>
                      </div>
                    )}
                    {selectedSubsidy.totalBudget && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Total Budget:
                        </span>
                        <p className="text-sm text-gray-900">
                          {selectedSubsidy.totalBudget}
                        </p>
                      </div>
                    )}
                    {selectedSubsidy.sectors &&
                      selectedSubsidy.sectors.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Sectors:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedSubsidy.sectors.map((sector, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {sector}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                  {selectedSubsidy.description && (
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-500">
                        Description:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedSubsidy.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Incentive Details */}
                {selectedSubsidy.incentiveDetails &&
                  Object.keys(selectedSubsidy.incentiveDetails).length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Incentive Details
                      </h4>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(selectedSubsidy.incentiveDetails).map(
                            ([key, value]) => (
                              <div key={key}>
                                <span className="text-sm font-medium text-green-700 capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}:
                                </span>
                                <p className="text-sm text-green-900">
                                  {String(value)}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                {/* Eligibility */}
                {selectedSubsidy.eligibility &&
                  Object.keys(selectedSubsidy.eligibility).length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Eligibility Criteria
                      </h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="space-y-2">
                          {Object.entries(selectedSubsidy.eligibility).map(
                            ([key, value]) => (
                              <div key={key}>
                                <span className="text-sm font-medium text-blue-700 capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}:
                                </span>
                                <p className="text-sm text-blue-900">
                                  {Array.isArray(value)
                                    ? value.join(", ")
                                    : String(value)}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedSubsidy(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
