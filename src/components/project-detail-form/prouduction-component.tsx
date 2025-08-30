import React from "react";

// Import the form components from the form-input file
import { FormInput, FormSelect } from "./form-input";

// Define interfaces for TypeScript
interface ProductionData {
  technology_used: string;
  electrolyzer_type: string;
  installed_capacity_mw: string;
  hydrogen_output_tpy: string;
}

interface ProductionErrors {
  technology_used?: string;
  electrolyzer_type?: string;
  installed_capacity_mw?: string;
  hydrogen_output_tpy?: string;
  [key: string]: string | undefined;
}

interface ProductionFormProps {
  data: ProductionData;
  updateData: (field: string, value: string) => void;
  errors: ProductionErrors;
}

// Step 4: Production Component
const ProductionForm = ({ data, updateData, errors }: ProductionFormProps) => {
  const technologyOptions = [
    { value: "alkaline", label: "Alkaline Electrolysis" },
    { value: "pem", label: "PEM Electrolysis" },
    { value: "solid_oxide", label: "Solid Oxide Electrolysis" },
    { value: "anion_exchange", label: "Anion Exchange Membrane" },
  ];

  const electrolyzerOptions = [
    { value: "alkaline_electrolyzer", label: "Alkaline Electrolyzer" },
    { value: "pem_electrolyzer", label: "PEM Electrolyzer" },
    { value: "soec", label: "Solid Oxide Electrolyzer (SOEC)" },
    { value: "aem", label: "Anion Exchange Membrane (AEM)" },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Technology Used"
          options={technologyOptions}
          value={data.technology_used}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateData("technology_used", e.target.value)
          }
          error={errors.technology_used}
        />
        <FormSelect
          label="Electrolyzer Type"
          options={electrolyzerOptions}
          value={data.electrolyzer_type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateData("electrolyzer_type", e.target.value)
          }
          error={errors.electrolyzer_type}
        />
        <FormInput
          label="Installed Capacity (MW)"
          type="number"
          placeholder="Total capacity in megawatts"
          value={data.installed_capacity_mw}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateData("installed_capacity_mw", e.target.value)
          }
          error={errors.installed_capacity_mw}
        />
        <FormInput
          label="Hydrogen Output (TPY)"
          type="number"
          placeholder="Annual production in tonnes"
          value={data.hydrogen_output_tpy}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateData("hydrogen_output_tpy", e.target.value)
          }
          error={errors.hydrogen_output_tpy}
        />
      </div>
    </div>
  );
};

export default ProductionForm;
