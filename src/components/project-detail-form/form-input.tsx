import React from "react";
import { AlertCircle } from "lucide-react";

// Form Input Components
const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}) => (
  <div className="space-y-2 group">
    <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-emerald-600 transition-colors">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-all duration-300 text-sm sm:text-base ${
        error
          ? "border-red-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
          : "border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 hover:border-gray-300 bg-white hover:shadow-sm"
      }`}
    />
    {error && (
      <div className="flex items-center space-x-1 text-red-500 animate-in slide-in-from-top duration-200">
        <AlertCircle className="w-3 h-3" />
        <p className="text-xs">{error}</p>
      </div>
    )}
  </div>
);

const FormSelect = ({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
}) => (
  <div className="space-y-2 group">
    <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-emerald-600 transition-colors">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      aria-label={label}
      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-all duration-300 text-sm sm:text-base ${
        error
          ? "border-red-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
          : "border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 hover:border-gray-300 bg-white hover:shadow-sm"
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <div className="flex items-center space-x-1 text-red-500 animate-in slide-in-from-top duration-200">
        <AlertCircle className="w-3 h-3" />
        <p className="text-xs">{error}</p>
      </div>
    )}
  </div>
);

const FormCheckbox = ({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
}) => (
  <div className="p-3 sm:p-4 rounded-xl border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300 cursor-pointer group">
    <div className="flex items-start space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5"
      />
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 cursor-pointer group-hover:text-emerald-700 transition-colors">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  </div>
);

export { FormInput, FormSelect, FormCheckbox };
export default FormInput;
