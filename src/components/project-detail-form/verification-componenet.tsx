import React from "react";

// Import the form components from the form-input file
import { FormInput, FormSelect, FormCheckbox } from "./form-input";

// Define interfaces for TypeScript
interface VerificationData {
  carbon_intensity: string;
  renewable_source: string;
  additionality_proof: boolean;
}

interface VerificationErrors {
  carbon_intensity?: string;
  renewable_source?: string;
  additionality_proof?: string;
  [key: string]: string | undefined;
}

interface VerificationFormProps {
  data: VerificationData;
  updateData: (field: string, value: string | boolean) => void;
  errors: VerificationErrors;
}

// Step 5: Verification Component
const VerificationForm = ({
  data,
  updateData,
  errors,
}: VerificationFormProps) => {
  const renewableOptions = [
    { value: "solar", label: "Solar Power" },
    { value: "wind", label: "Wind Power" },
    { value: "hydro", label: "Hydroelectric" },
    { value: "hybrid", label: "Hybrid (Solar + Wind)" },
    { value: "geothermal", label: "Geothermal" },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Carbon Intensity (kg CO₂/kg H₂)"
          type="number"
          placeholder="Carbon footprint per kg of hydrogen (e.g., 0.01)"
          value={data.carbon_intensity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateData("carbon_intensity", e.target.value)
          }
          error={errors.carbon_intensity}
        />
        <FormSelect
          label="Renewable Energy Source"
          options={renewableOptions}
          value={data.renewable_source}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateData("renewable_source", e.target.value)
          }
          error={errors.renewable_source}
        />
      </div>
      <FormCheckbox
        label="Additionality Proof Provided"
        description="Documentation proving renewable energy is additional to existing grid capacity"
        checked={data.additionality_proof}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateData("additionality_proof", e.target.checked)
        }
      />
    </div>
  );
};

export default VerificationForm;
