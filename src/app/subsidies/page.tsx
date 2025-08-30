"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Globe, DollarSign, Building, Calendar, ChevronDown, X, Eye, Sparkles } from "lucide-react";
import SubsidiesHeader from "@/components/subsidies-header";

// Mock data for demonstration
const COUNTRIES = [
  "India", "United States", "Germany", "Japan", "Australia", "Canada", "United Kingdom", "France"
];

const PROGRAM_TYPES = [
  "Tax Incentive", "Direct Grant", "Loan Guarantee", "Research Grant", "Infrastructure Support"
];

const STATUS_OPTIONS = ["Active", "Pending", "Suspended", "Closed"];

type Subsidy = {
  $id: string;
  name: string;
  description?: string;
  country: string;
  region?: string;
  programType: string;
  status: string;
  totalBudget?: string;
  governingBody?: string;
  incentiveDetails?: Record<string, unknown>;
};

export default function SubsidiesPortal() {
  const [allSubsidies, setAllSubsidies] = useState<Subsidy[]>([]); // Store all subsidies
  const [subsidies, setSubsidies] = useState<Subsidy[]>([]); // Store filtered subsidies
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: "",
    programType: "",
    status: ""
  });
  const [selectedSubsidy, setSelectedSubsidy] = useState<Subsidy | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Initial fetch of all subsidies
  const fetchAllSubsidies = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetch('/api/subsidies');
      const jsonData = await result.json();
      
      if (jsonData.success) {
        setAllSubsidies(jsonData.data);
        setSubsidies(jsonData.data); // Initially show all subsidies
      } else {
        console.error("Error fetching subsidies:", jsonData.error);
        setAllSubsidies([]);
        setSubsidies([]);
      }
    } catch (error) {
      console.error("Error fetching subsidies:", error);
      setAllSubsidies([]);
      setSubsidies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all subsidies on component mount
  useEffect(() => {
    fetchAllSubsidies();
  }, [fetchAllSubsidies]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter subsidies based on search and filters
  const filterSubsidiesCallback = useCallback(() => {
    setLoading(true);
    const filtered = allSubsidies.filter(subsidy => {
      // Search term matching (case-insensitive)
      const searchLower = debouncedSearchTerm.toLowerCase();
      const searchMatch = !debouncedSearchTerm || (
        subsidy.name.toLowerCase().includes(searchLower) ||
        (subsidy.description?.toLowerCase().includes(searchLower)) ||
        subsidy.programType.toLowerCase().includes(searchLower) ||
        subsidy.country.toLowerCase().includes(searchLower)
      );

      // Filter matching
      const countryMatch = !filters.country || subsidy.country === filters.country;
      const programTypeMatch = !filters.programType || subsidy.programType === filters.programType;
      const statusMatch = !filters.status || subsidy.status === filters.status;

      return searchMatch && countryMatch && programTypeMatch && statusMatch;
    });

    setSubsidies(filtered);
    setLoading(false);
  }, [allSubsidies, debouncedSearchTerm, filters]);

  const filterSubsidies = (data: Subsidy[]) => {
    return data.filter(subsidy => {
      // Search term matching (case-insensitive)
      const searchMatch = !debouncedSearchTerm || (
        (subsidy.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        (subsidy.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        (subsidy.programType?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        (subsidy.country?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );

      // Filter matching
      const countryMatch = !filters.country || subsidy.country === filters.country;
      const programTypeMatch = !filters.programType || subsidy.programType === filters.programType;
      const statusMatch = !filters.status || subsidy.status === filters.status;

      return searchMatch && countryMatch && programTypeMatch && statusMatch;
    });
  };

  const fetchSubsidies = useCallback(async () => {
    try {
      setLoading(true);
      // First fetch all subsidies
      const response = await fetch('/api/subsidies');
      const data = await response.json();

      if (data.success) {
        // Then apply filters and search locally
        const filteredData = filterSubsidies(data.data);
        setSubsidies(filteredData);
      } else {
        console.error("Error fetching subsidies:", data.error);
        setSubsidies([]);
      }

      // If you need to fetch with params, use a different variable name
      // Example:
      // const responseWithParams = await fetch(`/api/subsidies?${params.toString()}`);
      // const dataWithParams = await responseWithParams.json();
      // if (dataWithParams.success) {
      //   setSubsidies(dataWithParams.data);
      // } else {
      //   console.error("Error fetching subsidies:", dataWithParams.error);
      //   setSubsidies([]);
      // }
    } catch (error) {
      console.error("Error fetching subsidies:", error);
      setSubsidies([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    fetchSubsidies();
  }, [fetchSubsidies]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Active":
        return { bg: "bg-emerald-500", text: "text-white", dot: "bg-emerald-400" };
      case "Pending":
        return { bg: "bg-amber-500", text: "text-white", dot: "bg-amber-400" };
      case "Suspended":
        return { bg: "bg-red-500", text: "text-white", dot: "bg-red-400" };
      case "Closed":
        return { bg: "bg-slate-500", text: "text-white", dot: "bg-slate-400" };
      default:
        return { bg: "bg-slate-500", text: "text-white", dot: "bg-slate-400" };
    }
  };

  // Fetch subsidies when filters or debounced search term changes
  // Apply filters whenever search term or filters change
  useEffect(() => {
    filterSubsidiesCallback();
  }, [filterSubsidiesCallback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <SubsidiesHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Filter Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subsidies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 sm:pl-12 pr-${loading ? '10' : '4'} py-3 sm:py-4 bg-white/80 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base`}
                />
                {loading && (
                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-green-500"></div>
                  </div>
                )}
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={"px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base " + (
                  showFilters 
                    ? "bg-green-600 text-white shadow-lg" 
                    : "bg-white/80 text-gray-700 hover:bg-white border border-gray-200"
                )}
              >
                <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className={"h-4 w-4 transition-transform duration-200 " + (showFilters ? "rotate-180" : "")} />
              </button>
            </div>

            {/* Expandable Filters */}
            <div className={"overflow-hidden transition-all duration-300 " + (showFilters ? "max-h-96 mt-4 sm:mt-6" : "max-h-0")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Country
                  </label>
                  <div className="relative">
                    <select
                      value={filters.country}
                      onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/80 border rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base ${
                        filters.country 
                          ? 'border-green-500 ring-1 ring-green-500' 
                          : 'border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      }`}
                    >
                      <option value="">All Countries</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {filters.country && (
                      <button
                        onClick={() => setFilters({ ...filters, country: "" })}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Program Type
                  </label>
                  <div className="relative">
                    <select
                      value={filters.programType}
                      onChange={(e) => setFilters({ ...filters, programType: e.target.value })}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/80 border rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base ${
                        filters.programType 
                          ? 'border-green-500 ring-1 ring-green-500' 
                          : 'border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      }`}
                    >
                      <option value="">All Program Types</option>
                      {PROGRAM_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {filters.programType && (
                      <button
                        onClick={() => setFilters({ ...filters, programType: "" })}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/80 border rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base ${
                        filters.status 
                          ? 'border-green-500 ring-1 ring-green-500' 
                          : 'border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      }`}
                    >
                      <option value="">All Statuses</option>
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    {filters.status && (
                      <button
                        onClick={() => setFilters({ ...filters, status: "" })}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="text-center py-12 sm:py-16">
            <div className="relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 text-base sm:text-lg">Loading amazing opportunities...</p>
          </div>
        ) : subsidies.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No subsidies found</h3>
            <p className="text-gray-500 text-base sm:text-lg mb-4">Try adjusting your search criteria to discover more opportunities</p>
            <button
              onClick={() => {
                setFilters({ country: "", programType: "", status: "" });
                setSearchTerm("");
                setDebouncedSearchTerm("");
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium text-sm sm:text-base"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {subsidies.length} Opportunities Found
              </h2>
              <div className="text-xs sm:text-sm text-gray-500 bg-white/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-gray-200 self-start sm:self-auto">
                Updated just now
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {subsidies.map((subsidy: Subsidy, index: number) => {
                const statusConfig = getStatusConfig(subsidy.status);
                return (
                  <div
                    key={subsidy.$id}
                    className="group relative bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                    style={{ animationDelay: (index * 100) + "ms" }}
                  >
                    {/* Gradient Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Status Badge */}
                    <div className="relative flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} shadow-sm`}>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusConfig.dot} mr-1 sm:mr-2 animate-pulse`}></div>
                        {subsidy.status}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500 bg-gray-100/80 px-2 sm:px-3 py-1 rounded-full">
                        <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                        <span className="truncate max-w-[80px] sm:max-w-none">{subsidy.country}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="relative text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                      {subsidy.name}
                    </h3>

                    {/* Details */}
                    <div className="relative space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500 flex-shrink-0" />
                        <span className="font-medium truncate">{subsidy.programType}</span>
                      </div>
                      
                      {subsidy.totalBudget && (
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500 flex-shrink-0" />
                          <span className="font-bold text-green-700 truncate">{subsidy.totalBudget}</span>
                        </div>
                      )}
                      
                      {subsidy.region && (
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <span className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-purple-500 flex-shrink-0">📍</span>
                          <span className="truncate">{subsidy.region}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {subsidy.description && (
                      <p className="relative text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                        {subsidy.description}
                      </p>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedSubsidy(subsidy)}
                      className="relative w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl sm:rounded-2xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group-hover:shadow-2xl flex items-center justify-center space-x-1 sm:space-x-2"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>View Details</span>
                    </button>

                    {/* Decorative Elements */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {selectedSubsidy && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start sm:items-center justify-center p-2 sm:p-4">
          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 mt-4 sm:mt-0">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-8 py-4 sm:py-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg sm:text-2xl font-bold mb-2">{selectedSubsidy.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-green-100 text-sm sm:text-base space-y-1 sm:space-y-0">
                    <span className="flex items-center">
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {selectedSubsidy.country}
                    </span>
                    {selectedSubsidy.region && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{selectedSubsidy.region}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubsidy(null)}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors duration-200 flex-shrink-0"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-12 h-12 sm:w-16 sm:h-16 bg-purple-300/20 rounded-full blur-lg"></div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-6 sm:space-y-8">
                {/* Status and Quick Info */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  {(() => {
                    const statusConfig = getStatusConfig(selectedSubsidy.status);
                    return (
                      <div className={statusConfig.bg + " " + statusConfig.text + " inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-sm w-fit"}>
                        <div className={statusConfig.dot + " w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 animate-pulse"}></div>
                        {selectedSubsidy.status}
                      </div>
                    );
                  })()}
                  <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl w-fit">
                    {selectedSubsidy.programType}
                  </div>
                </div>

                {/* Description */}
                {selectedSubsidy.description && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                        📋
                      </span>
                      Program Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedSubsidy.description}</p>
                  </div>
                )}

                {/* Program Information Grid */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                      ℹ️
                    </span>
                    Program Information
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {selectedSubsidy.governingBody && (
                      <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Governing Body</span>
                        <p className="text-gray-900 font-semibold text-sm sm:text-base">{selectedSubsidy.governingBody}</p>
                      </div>
                    )}
                    {selectedSubsidy.totalBudget && (
                      <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Total Budget</span>
                        <p className="text-green-700 font-bold text-base sm:text-lg">{selectedSubsidy.totalBudget}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Incentive Details */}
                {selectedSubsidy.incentiveDetails && Object.keys(selectedSubsidy.incentiveDetails).length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-green-200">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                        💎
                      </span>
                      Incentive Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                      {Object.entries(selectedSubsidy.incentiveDetails).map(([key, value]) => (
                        <div key={key} className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-200">
                          <span className="text-xs sm:text-sm font-medium text-green-700 block mb-1 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <p className="text-green-900 font-semibold text-sm sm:text-base">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setSelectedSubsidy(null)}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-gray-700 bg-white border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  Close
                </button>
                <button className="px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg text-sm sm:text-base">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}