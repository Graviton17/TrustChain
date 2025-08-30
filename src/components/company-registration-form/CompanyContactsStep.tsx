"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface CompanyContactsStepProps {
  formData: {
    contact_person_name: string;
    contact_person_designation: string;
    contact_email: string;
    contact_phone: string;
  };
  handleInputChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const CompanyContactsStep: React.FC<CompanyContactsStepProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person Name
          </label>
          <Input
            type="text"
            value={formData.contact_person_name}
            onChange={(e) =>
              handleInputChange("contact_person_name", e.target.value)
            }
            placeholder="Enter contact person's full name"
            className={errors.contact_person_name ? "border-red-500" : ""}
          />
          {errors.contact_person_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact_person_name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation
          </label>
          <Input
            type="text"
            value={formData.contact_person_designation}
            onChange={(e) =>
              handleInputChange("contact_person_designation", e.target.value)
            }
            placeholder="Enter designation (e.g., CEO, Manager)"
            className={
              errors.contact_person_designation ? "border-red-500" : ""
            }
          />
          {errors.contact_person_designation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact_person_designation}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <Input
            type="email"
            value={formData.contact_email}
            onChange={(e) => handleInputChange("contact_email", e.target.value)}
            placeholder="Enter email address"
            className={errors.contact_email ? "border-red-500" : ""}
          />
          {errors.contact_email && (
            <p className="text-red-500 text-sm mt-1">{errors.contact_email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <Input
            type="tel"
            value={formData.contact_phone}
            onChange={(e) => handleInputChange("contact_phone", e.target.value)}
            placeholder="Enter phone number with country code"
            className={errors.contact_phone ? "border-red-500" : ""}
          />
          {errors.contact_phone && (
            <p className="text-red-500 text-sm mt-1">{errors.contact_phone}</p>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-yellow-900 mb-2">
          Contact Information Guidelines
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • Contact person should be authorized to represent the company
          </li>
          <li>• Email will be used for all official communications</li>
          <li>
            • Phone number should include country code (e.g., +1-555-123-4567)
          </li>
          <li>• Ensure contact details are accurate and monitored regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyContactsStep;
