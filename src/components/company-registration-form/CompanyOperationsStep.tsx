"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface CompanyOperationsStepProps {
  formData: {
    employees: string;
    headquarters_address: string;
  };
  handleInputChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const CompanyOperationsStep: React.FC<CompanyOperationsStepProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees
          </label>
          <Input
            type="number"
            min="1"
            value={formData.employees}
            onChange={(e) => handleInputChange("employees", e.target.value)}
            placeholder="Enter number of employees"
            className={errors.employees ? "border-red-500" : ""}
          />
          {errors.employees && (
            <p className="text-red-500 text-sm mt-1">{errors.employees}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Headquarters Address
          </label>
          <textarea
            value={formData.headquarters_address}
            onChange={(e) =>
              handleInputChange("headquarters_address", e.target.value)
            }
            placeholder="Enter complete headquarters address including street, city, state, postal code"
            rows={4}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
              errors.headquarters_address ? "border-red-500" : ""
            }`}
          />
          {errors.headquarters_address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.headquarters_address}
            </p>
          )}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-green-900 mb-2">
          Operations Information
        </h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Employee count helps assess company capacity</li>
          <li>• Headquarters address is used for official communications</li>
          <li>• Ensure address is complete and accurate</li>
          <li>• This information may be verified during application review</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyOperationsStep;
