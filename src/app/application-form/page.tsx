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
        // read response body to get any saved id or logoUrl (if your API returns them)
        let respJson = {} as any;
        try {
          respJson = await response.json();
        } catch (e) {
          // ignore JSON parse errors, we'll use form values
        }

        const name = formData.companyName;
        const logo = respJson.logoUrl || respJson.logo || "/icon.png";
        const id =
          respJson.id ||
          respJson.certId ||
          Math.random().toString(36).slice(2, 10).toUpperCase();
        const date = new Date().toLocaleDateString();

        const url = `/certificate?companyName=${encodeURIComponent(
          name
        )}&logoUrl=${encodeURIComponent(logo)}&id=${encodeURIComponent(
          id
        )}&date=${encodeURIComponent(date)}`;

        router.push(url);
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
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {roleValue === "producer"
                  ? "Producer Application"
                  : "Consumer Application"}
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to start your journey with TrustChain
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            {roleValue === "producer" ? (
              <Factory className="w-8 h-8 text-green-600 mr-3" />
            ) : (
              <Users className="w-8 h-8 text-blue-600 mr-3" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {roleValue === "producer"
                ? "Producer Information"
                : "Consumer Information"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Role-specific Fields */}
            {roleValue === "producer" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Production Capacity (MT/year)
                  </label>
                  <input
                    type="text"
                    name="productionCapacity"
                    value={formData.productionCapacity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technology Type
                  </label>
                  <select
                    name="technologyType"
                    value={formData.technologyType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Technology</option>
                    <option value="electrolysis">Electrolysis</option>
                    <option value="biomass">Biomass Gasification</option>
                    <option value="solar">Solar-Powered Production</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certifications
                  </label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="List your relevant certifications"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Volume (MT/year)
                  </label>
                  <input
                    type="text"
                    name="requiredVolume"
                    value={formData.requiredVolume}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usage Type
                  </label>
                  <select
                    name="usageType"
                    value={formData.usageType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Timeframe
                  </label>
                  <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
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
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2 text-white rounded-md ${
                  roleValue === "producer"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
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
