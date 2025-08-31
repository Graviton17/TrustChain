"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getRoleFromUser, type UserRole } from "@/utils/roles";
import type {
  ParsedSubsidy,
  SubsidyFilters,
  IncentiveDetails,
} from "@/types/subsidy";
import { PROGRAM_TYPES, SUBSIDY_STATUS } from "@/types/subsidy";
import { DollarSign, Building } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

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

const PROGRAM_TYPES_ARRAY = Object.values(PROGRAM_TYPES) as string[];
const STATUS_ARRAY = Object.values(SUBSIDY_STATUS) as string[];

interface FormData {
  name: string;
  country: string;
  region: string;
  governingBody: string;
  programType: string;
  status: string;
  description: string;
  totalBudget: string;
  incentiveDetails: IncentiveDetails;
}

export default function SubsidiesManagerPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [subsidies, setSubsidies] = useState<ParsedSubsidy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<
    Pick<SubsidyFilters, "country" | "programType" | "status">
  >({
    country: "",
    programType: "",
    status: "",
  });
  const [selectedSubsidy, setSelectedSubsidy] = useState<ParsedSubsidy | null>(
    null
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSubsidy, setEditingSubsidy] = useState<ParsedSubsidy | null>(
    null
  );
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    country: "",
    region: "",
    governingBody: "",
    programType: "",
    status: "Active",
    description: "",
    totalBudget: "",
    incentiveDetails: {
      type: "",
      amount: "",
      currency: "USD",
    },
  });

  const fetchSubsidies = useCallback(async () => {
    setLoading(true);
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

      if (role !== "government") {
        router.push("/subsidies");
        return;
      }
    }
    fetchSubsidies();
  }, [isLoaded, isSignedIn, router, user, fetchSubsidies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingSubsidy
        ? `/api/subsidies?id=${editingSubsidy.$id}`
        : "/api/subsidies";
      const method = editingSubsidy ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchSubsidies();
        setShowCreateForm(false);
        setEditingSubsidy(null);
        resetForm();
      } else {
        console.error("Error saving subsidy:", data.error);
      }
    } catch (error) {
      console.error("Error saving subsidy:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subsidy: ParsedSubsidy) => {
    setEditingSubsidy(subsidy);
    setFormData({
      name: subsidy.name,
      country: subsidy.country,
      region: subsidy.region || "",
      governingBody: subsidy.governingBody || "",
      programType: subsidy.programType,
      status: subsidy.status,
      description: subsidy.description || "",
      totalBudget: subsidy.totalBudget || "",
      incentiveDetails:
        subsidy.incentiveDetails as FormData["incentiveDetails"],
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this subsidy? This action cannot be undone."
      )
    )
      return;

    try {
      const response = await fetch(`/api/subsidies?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        await fetchSubsidies();
      } else {
        console.error("Error deleting subsidy:", data.error);
      }
    } catch (error) {
      console.error("Error deleting subsidy:", error);
    }
  };

  const handleClearFilters = () => {
    setFilters({ country: "", programType: "", status: "" });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      country: "",
      region: "",
      governingBody: "",
      programType: "",
      status: "Active",
      description: "",
      totalBudget: "",
      incentiveDetails: {
        type: "",
        amount: "",
        currency: "USD",
      },
    });
  };

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
  
  const areFiltersActive =
    filters.country || filters.programType || filters.status;


  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (userRole && userRole !== "government") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            Only government users can access the subsidies manager.
          </p>
          <button
            onClick={() => router.push("/subsidies")}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600"
          >
            Browse Subsidies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-2 sm:p-3 rounded-2xl">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Subsidies Portal
                </h1>
                <p className="text-sm text-gray-600 mt-1">Discover funding opportunities worldwide</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full border border-gray-200">
                Welcome, <span className="font-medium">{user?.firstName || user?.emailAddresses?.[0]?.emailAddress}</span>
              </div>
              <LogoutButton variant="secondary" className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-2xl mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Manage Your Subsidies
              </h3>
              <button
                onClick={() => {
                  setShowCreateForm(true);
                  setEditingSubsidy(null);
                  resetForm();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 shadow-sm"
              >
                + Create New Subsidy
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) =>
                    setFilters({ ...filters, country: e.target.value })
                  }
                  aria-label="Filter by Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  Filter by Program Type
                </label>
                <select
                  value={filters.programType}
                  onChange={(e) =>
                    setFilters({ ...filters, programType: e.target.value })
                  }
                  aria-label="Filter by Program Type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Program Types</option>
                  {PROGRAM_TYPES_ARRAY.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  aria-label="Filter by Status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Statuses</option>
                  {STATUS_ARRAY.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl">
          <div className="px-4 py-5 sm:p-6">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading subsidies...</p>
              </div>
            ) : subsidies.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">No subsidies found</h3>
                <p className="mt-2 text-gray-500">
                  {areFiltersActive
                    ? "Try adjusting your search criteria to discover more opportunities."
                    : "Create your first subsidy to get started!"}
                </p>
                {areFiltersActive && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-6 px-5 py-2.5 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subsidies.map((subsidy) => (
                      <tr key={subsidy.$id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="max-w-xs truncate">{subsidy.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subsidy.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subsidy.programType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subsidy.status)}`}>
                            {subsidy.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subsidy.totalBudget || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(subsidy.$createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button onClick={() => setSelectedSubsidy(subsidy)} className="text-blue-600 hover:text-blue-900">View</button>
                            <button onClick={() => handleEdit(subsidy)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button onClick={() => handleDelete(subsidy.$id)} className="text-red-600 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-2xl rounded-2xl bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingSubsidy ? "Edit Subsidy" : "Create New Subsidy"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subsidy Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} aria-label="Subsidy Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <select required value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} aria-label="Select Country" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">Select Country</option>
                      {COUNTRIES.map((country) => (<option key={country} value={country}>{country}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <input type="text" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} placeholder="e.g., California, Maharashtra" aria-label="Region" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Governing Body</label>
                    <input type="text" value={formData.governingBody} onChange={(e) => setFormData({ ...formData, governingBody: e.target.value,})} placeholder="e.g., Department of Energy" aria-label="Governing Body" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Type *</label>
                    <select required value={formData.programType} onChange={(e) => setFormData({ ...formData, programType: e.target.value,})} aria-label="Program Type" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">Select Program Type</option>
                      {PROGRAM_TYPES_ARRAY.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select required value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} aria-label="Status" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      {STATUS_ARRAY.map((status) => (<option key={status} value={status}>{status}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget</label>
                    <input type="text" value={formData.totalBudget} onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value,})} placeholder="e.g., $1,000,000" aria-label="Total Budget" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description of the subsidy program" aria-label="Description" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Incentive Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Incentive Type</label>
                      <input type="text" required value={formData.incentiveDetails.type} onChange={(e) => setFormData({ ...formData, incentiveDetails: { ...formData.incentiveDetails, type: e.target.value,},})} placeholder="e.g., Per kg of H2 produced" aria-label="Incentive Type" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input type="text" required value={formData.incentiveDetails.amount} onChange={(e) => setFormData({ ...formData, incentiveDetails: { ...formData.incentiveDetails, amount: e.target.value,},})} placeholder="e.g., 3.00" aria-label="Incentive Amount" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select value={formData.incentiveDetails.currency} onChange={(e) => setFormData({ ...formData, incentiveDetails: { ...formData.incentiveDetails, currency: e.target.value,},})} aria-label="Currency" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="USD">USD</option><option value="EUR">EUR</option><option value="INR">INR</option><option value="JPY">JPY</option><option value="GBP">GBP</option><option value="CAD">CAD</option><option value="AUD">AUD</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-6">
                  <button type="button" onClick={() => { setShowCreateForm(false); setEditingSubsidy(null); resetForm();}} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 disabled:opacity-50">
                    {loading ? "Saving..." : editingSubsidy ? "Update Subsidy" : "Create Subsidy"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedSubsidy && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-2xl rounded-2xl bg-white">
            <div className="mt-3 p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedSubsidy.name}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSubsidy.status)}`}>{selectedSubsidy.status}</span>
                    <span className="text-sm text-gray-500">{selectedSubsidy.country}</span>
                    {selectedSubsidy.region && (<span className="text-sm text-gray-500">• {selectedSubsidy.region}</span>)}
                  </div>
                </div>
                <button onClick={() => setSelectedSubsidy(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Program Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Program Type:</span>
                      <p className="text-sm text-gray-900">{selectedSubsidy.programType}</p>
                    </div>
                    {selectedSubsidy.governingBody && (<div><span className="text-sm font-medium text-gray-500">Governing Body:</span><p className="text-sm text-gray-900">{selectedSubsidy.governingBody}</p></div>)}
                    {selectedSubsidy.totalBudget && (<div><span className="text-sm font-medium text-gray-500">Total Budget:</span><p className="text-sm text-gray-900">{selectedSubsidy.totalBudget}</p></div>)}
                  </div>
                  {selectedSubsidy.description && (<div className="mt-4"><span className="text-sm font-medium text-gray-500">Description:</span><p className="text-sm text-gray-900 mt-1">{selectedSubsidy.description}</p></div>)}
                </div>
                {selectedSubsidy.incentiveDetails && Object.keys(selectedSubsidy.incentiveDetails).length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Incentive Details</h4>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(selectedSubsidy.incentiveDetails).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-sm font-medium text-green-700 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                                <p className="text-sm text-green-900">{String(value)}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div className="flex justify-end mt-6"><button onClick={() => setSelectedSubsidy(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Close</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}