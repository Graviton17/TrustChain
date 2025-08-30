"use client";

import { useState, useEffect } from "react";
import { Factory, Users, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplicationForm() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // Read role from URL on the client to avoid needing a suspense boundary for useSearchParams
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setRole(sp.get("role"));
  }, []);

  const roleValue = role ?? "consumer";
  const [formData, setFormData] = useState({
    // Common fields
    companyName: "",
    email: "",
    phone: "",
    address: "",

    // Producer specific fields
    productionCapacity: "",
    technologyType: "",
    certifications: "",

    // Consumer specific fields
    requiredVolume: "",
    usageType: "",
    timeframe: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          ...formData,
        }),
      });

      if (response.ok) {
        router.push("/application-success");
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm sm:text-base">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Application Form
              </h1>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm text-green-700 font-medium">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              {roleValue === "producer" ? (
                <Factory className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-3" />
              ) : (
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
              )}
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  {roleValue === "producer"
                    ? "Producer Information"
                    : "Consumer Information"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {roleValue === "producer"
                    ? "Provide details about your green hydrogen production capabilities"
                    : "Tell us about your green hydrogen requirements"}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Common Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your company address"
                  required
                />
              </div>
            </div>

            {/* Role-specific Fields */}
            {roleValue === "producer" ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Production Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Production Capacity (MT/year) *
                    </label>
                    <input
                      type="text"
                      name="productionCapacity"
                      value={formData.productionCapacity}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="e.g., 1000"
                      required
                    />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technology Type *
                  </label>
                  <select
                    name="technologyType"
                    value={formData.technologyType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                  >
                    <option value="">Select Technology</option>
                    <option value="electrolysis">Electrolysis</option>
                    <option value="biomass">Biomass Gasification</option>
                    <option value="solar">Solar-Powered Production</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications
                  </label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="List your relevant certifications (optional)"
                  />
                </div>
              </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Consumption Requirements
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Volume (MT/year) *
                    </label>
                    <input
                      type="text"
                      name="requiredVolume"
                      value={formData.requiredVolume}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., 500"
                      required
                    />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Type *
                  </label>
                  <select
                    name="usageType"
                    value={formData.usageType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Usage Type</option>
                    <option value="industrial">Industrial Process</option>
                    <option value="transportation">Transportation</option>
                    <option value="power">Power Generation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Timeframe *
                  </label>
                  <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Timeframe</option>
                    <option value="immediate">Immediate</option>
                    <option value="3months">Within 3 months</option>
                    <option value="6months">Within 6 months</option>
                    <option value="12months">Within 12 months</option>
                  </select>
                </div>
              </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`w-full sm:w-auto px-6 py-3 text-white rounded-lg font-medium text-sm sm:text-base transition-colors ${
                  roleValue === "producer"
                    ? "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                }`}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
