import React from "react";

// Form Input Component
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
      className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 ${
        error
          ? "border-red-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
          : "border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 hover:border-gray-300 bg-white hover:shadow-sm"
      }`}
    />
    {error && (
      <div className="flex items-center space-x-1 text-red-500 animate-in slide-in-from-top duration-200">
        <p className="text-xs">{error}</p>
      </div>
    )}
  </div>
);

// Form Checkbox Component
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
  <div className="p-4 rounded-xl border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300 cursor-pointer group">
    <div className="flex items-start space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5"
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

interface FinancialsFormProps {
  data: {
    capex: string;
    opex: string;
    offtake_signed: boolean;
  };
  updateData: (field: string, value: string | boolean) => void;
  errors: {
    capex?: string;
    opex?: string;
  };
}

const FinancialsForm: React.FC<FinancialsFormProps> = ({
  data,
  updateData,
  errors,
}) => (
  <div className="space-y-6 animate-in slide-in-from-right duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="CAPEX (Capital Expenditure)"
        type="number"
        placeholder="Amount in millions USD"
        value={data.capex}
        onChange={(e) => updateData("capex", e.target.value)}
        error={errors.capex}
      />
      <FormInput
        label="OPEX (Operational Expenditure)"
        type="number"
        placeholder="Annual amount in millions USD"
        value={data.opex}
        onChange={(e) => updateData("opex", e.target.value)}
        error={errors.opex}
      />
    </div>
    <FormCheckbox
      label="Offtake Agreement Signed"
      description="Long-term purchase agreement for hydrogen output"
      checked={data.offtake_signed}
      onChange={(e) => updateData("offtake_signed", e.target.checked)}
    />
  </div>
);

export default FinancialsForm;
