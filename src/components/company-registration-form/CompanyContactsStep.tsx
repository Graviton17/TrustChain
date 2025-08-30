"use client";

import { Phone } from "lucide-react";

type FormData = {
  [key: string]: string | number;
};

type Errors = {
  [key: string]: string;
};

interface CompanyContactsStepProps {
  formData: FormData;
  onInputChange: (name: string, value: string | number) => void;
  errors: Errors;
}

const CompanyContactsStep: React.FC<CompanyContactsStepProps> = ({
  formData,
  onInputChange,
  errors,
}) => {
  interface InputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    required?: boolean;
  }

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
        value={formData[name] || ""}
        onChange={(e) => onInputChange(name, e.target.value)}
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <Phone className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
        <p className="text-gray-600">
          Primary contact details for your company
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Contact Person Name"
          name="contact_person_name"
          placeholder="Enter primary contact name"
        />
        <InputField
          label="Contact Person Designation"
          name="contact_person_designation"
          placeholder="e.g., CEO, Manager, Director"
        />
        <InputField
          label="Contact Email"
          name="contact_email"
          type="email"
          placeholder="contact@company.com"
        />
        <InputField
          label="Contact Phone"
          name="contact_phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
      </div>
    </div>
  );
};

export default CompanyContactsStep;
