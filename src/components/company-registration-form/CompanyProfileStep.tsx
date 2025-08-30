"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { CompanySize, CompanyType } from "@/types/company";

interface CompanyProfileStepProps {
  formData: {
    userId: string;
    company_name: string;
    registration_number: string;
    company_type: string;
    company_size: string;
    year_incorporation: string;
    country: string;
    state: string;
    website: string;
  };
  handleInputChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const CompanyProfileStep: React.FC<CompanyProfileStepProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>
          <Input
            type="text"
            value={formData.userId}
            onChange={(e) => handleInputChange("userId", e.target.value)}
            placeholder="Enter user ID"
            className={`w-full ${errors.userId ? "border-red-500" : ""}`}
          />
          {errors.userId && (
            <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <Input
            type="text"
            value={formData.company_name}
            onChange={(e) => handleInputChange("company_name", e.target.value)}
            placeholder="Enter company name"
            className={`w-full ${errors.company_name ? "border-red-500" : ""}`}
          />
          {errors.company_name && (
            <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
          </label>
          <Input
            type="text"
            value={formData.registration_number}
            onChange={(e) =>
              handleInputChange("registration_number", e.target.value)
            }
            placeholder="Enter registration number"
            className={`w-full ${errors.registration_number ? "border-red-500" : ""}`}
          />
          {errors.registration_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registration_number}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Type
          </label>
          <select
            value={formData.company_type}
            onChange={(e) => handleInputChange("company_type", e.target.value)}
            className={`w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.company_type ? "border-red-500" : ""
            }`}
            title="Select company type"
          >
            <option value="">Select company type</option>
            {Object.values(CompanyType).map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, " ").toUpperCase()}
              </option>
            ))}
          </select>
          {errors.company_type && (
            <p className="text-red-500 text-sm mt-1">{errors.company_type}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Size
          </label>
          <select
            value={formData.company_size}
            onChange={(e) => handleInputChange("company_size", e.target.value)}
            className={`w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.company_size ? "border-red-500" : ""
            }`}
            title="Select company size"
          >
            <option value="">Select company size</option>
            {Object.values(CompanySize).map((size) => (
              <option key={size} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>
          {errors.company_size && (
            <p className="text-red-500 text-sm mt-1">{errors.company_size}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of Incorporation
          </label>
          <Input
            type="number"
            value={formData.year_incorporation}
            onChange={(e) =>
              handleInputChange("year_incorporation", e.target.value)
            }
            placeholder="Enter year of incorporation"
            className={errors.year_incorporation ? "border-red-500" : ""}
          />
          {errors.year_incorporation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.year_incorporation}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <Input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            placeholder="Enter country"
            className={errors.country ? "border-red-500" : ""}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <Input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            placeholder="Enter state"
            className={errors.state ? "border-red-500" : ""}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="Enter website URL"
            className={errors.website ? "border-red-500" : ""}
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">{errors.website}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileStep;
