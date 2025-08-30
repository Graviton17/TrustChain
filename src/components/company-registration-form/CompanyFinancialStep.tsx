"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { CreditRating } from "@/types/company";

interface CompanyFinancialStepProps {
  formData: {
    annual_revenue: string;
    net_worth: string;
    credit_rating: string;
    past_project_success_rate: string;
  };
  handleInputChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const CompanyFinancialStep: React.FC<CompanyFinancialStepProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Revenue (USD)
          </label>
          <Input
            type="number"
            value={formData.annual_revenue}
            onChange={(e) =>
              handleInputChange("annual_revenue", e.target.value)
            }
            placeholder="Enter annual revenue"
            className={errors.annual_revenue ? "border-red-500" : ""}
          />
          {errors.annual_revenue && (
            <p className="text-red-500 text-sm mt-1">{errors.annual_revenue}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Net Worth (USD)
          </label>
          <Input
            type="number"
            value={formData.net_worth}
            onChange={(e) => handleInputChange("net_worth", e.target.value)}
            placeholder="Enter net worth"
            className={errors.net_worth ? "border-red-500" : ""}
          />
          {errors.net_worth && (
            <p className="text-red-500 text-sm mt-1">{errors.net_worth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Credit Rating
          </label>
          <select
            value={formData.credit_rating}
            onChange={(e) => handleInputChange("credit_rating", e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.credit_rating ? "border-red-500" : ""
            }`}
            title="Select credit rating"
          >
            <option value="">Select credit rating</option>
            {Object.values(CreditRating).map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
          {errors.credit_rating && (
            <p className="text-red-500 text-sm mt-1">{errors.credit_rating}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Past Project Success Rate (%)
          </label>
          <Input
            type="number"
            min="0"
            max="100"
            value={formData.past_project_success_rate}
            onChange={(e) =>
              handleInputChange("past_project_success_rate", e.target.value)
            }
            placeholder="Enter success rate (0-100)"
            className={errors.past_project_success_rate ? "border-red-500" : ""}
          />
          {errors.past_project_success_rate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.past_project_success_rate}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Financial Information Guidelines
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Annual revenue should be in USD</li>
          <li>• Net worth represents total assets minus liabilities</li>
          <li>• Credit rating helps assess financial stability</li>
          <li>• Success rate should be based on completed projects</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyFinancialStep;
