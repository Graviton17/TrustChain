"use client";

import React from "react";
import { Users } from "lucide-react";

interface CompanyOperationsStepProps {
  formData: Record<string, string | number | undefined>; // allow undefined
  onInputChange: (name: string, value: string | number) => void;
  errors: Record<string, string>;
}

const CompanyOperationsStep: React.FC<CompanyOperationsStepProps> = ({
  formData,
  onInputChange,
  errors,
}) => {
  // InputField Component
  const InputField: React.FC<{
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    min?: number;
  }> = ({ label, name, type = "text", required = false, ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[name] ?? ""} // handles undefined
        onChange={(e) =>
          onInputChange(
            name,
            type === "number" ? Number(e.target.value) : e.target.value
          )
        }
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
          errors[name] ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm animate-pulse">{errors[name]}</p>
      )}
    </div>
  );

  // TextArea Component
  const TextAreaField: React.FC<{
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
  }> = ({ label, name, required = false, ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={formData[name] ?? ""} // handles undefined
        onChange={(e) => onInputChange(name, e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
          errors[name] ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        rows={3}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm animate-pulse">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <Users className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Operations</h2>
        <p className="text-gray-600">Operational details of your company</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <InputField
          label="Number of Employees"
          name="employees"
          type="number"
          placeholder="Enter total number of employees"
          min={0}
        />
        <TextAreaField
          label="Headquarters Address"
          name="headquarters_address"
          placeholder="Enter complete headquarters address"
        />
      </div>
    </div>
  );
};

export default CompanyOperationsStep;
