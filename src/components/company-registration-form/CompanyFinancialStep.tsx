import React from "react";
import { DollarSign } from "lucide-react";

type CompanyFinancialsStepProps = {
  formData: {
    annual_revenue?: number | string;
    net_worth?: number | string;
    credit_rating?: string;
    past_project_success_rate?: number | string;
  };
  onInputChange: (name: string, value: string) => void;
  errors?: Record<string, string>;
};

type StepProps = {
  formData: any; // or your FormData type
  onInputChange: (field: string, value: string | number) => void;
  errors: Record<string, string>;
};

const CompanyFinancialsStep: React.FC<CompanyFinancialsStepProps> = ({
  formData,
  onInputChange,
  errors = {},
}) => {
  const creditRatings = [
    "AAA",
    "AA+",
    "AA",
    "AA-",
    "A+",
    "A",
    "A-",
    "BBB+",
    "BBB",
    "BBB-",
    "BB+",
    "BB",
    "BB-",
    "B+",
    "B",
    "B-",
    "CCC",
    "CC",
    "C",
    "D",
  ];

  type InputFieldProps = {
    label: string;
    name: keyof CompanyFinancialsStepProps["formData"];
    type?: string;
    required?: boolean;
    placeholder?: string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
  };

  const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = "text",
    required = false,
    ...props
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[name] ?? ""}
        onChange={(e) => onInputChange(name, e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
          errors[name as string] ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        {...props}
      />
      {errors[name as string] && (
        <p className="text-red-500 text-sm animate-pulse">
          {errors[name as string]}
        </p>
      )}
    </div>
  );

  type SelectFieldProps = {
    label: string;
    name: keyof CompanyFinancialsStepProps["formData"];
    options: string[];
    required?: boolean;
  };

  const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    options,
    required = false,
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={formData[name] ?? ""}
        onChange={(e) => onInputChange(name, e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
          errors[name as string] ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name as string] && (
        <p className="text-red-500 text-sm animate-pulse">
          {errors[name as string]}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <DollarSign className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Financial Details</h2>
        <p className="text-gray-600">
          Financial information about your company
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Annual Revenue"
          name="annual_revenue"
          type="number"
          placeholder="Enter annual revenue"
          min="0"
          step="0.01"
        />
        <InputField
          label="Net Worth"
          name="net_worth"
          type="number"
          placeholder="Enter company net worth"
          min="0"
          step="0.01"
        />
        <SelectField
          label="Credit Rating"
          name="credit_rating"
          options={creditRatings}
        />
        <InputField
          label="Past Project Success Rate (%)"
          name="past_project_success_rate"
          type="number"
          placeholder="Enter success rate (0-100)"
          min="0"
          max="100"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default CompanyFinancialsStep;
