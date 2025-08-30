import React, { useState } from 'react';
import { Check, ChevronRight, Building, FileText, DollarSign, Zap, Shield, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
// Step 5: Verification Component
const VerificationForm = ({ data, updateData, errors }) => {
  const renewableOptions = [
    { value: 'solar', label: 'Solar Power' },
    { value: 'wind', label: 'Wind Power' },
    { value: 'hydro', label: 'Hydroelectric' },
    { value: 'hybrid', label: 'Hybrid (Solar + Wind)' },
    { value: 'geothermal', label: 'Geothermal' }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Carbon Intensity (kg CO₂/kg H₂)"
          type="number"
          step="0.01"
          placeholder="Carbon footprint per kg of hydrogen"
          value={data.carbon_intensity}
          onChange={(e) => updateData('carbon_intensity', e.target.value)}
          error={errors.carbon_intensity}
        />
        <FormSelect
          label="Renewable Energy Source"
          options={renewableOptions}
          value={data.renewable_source}
          onChange={(e) => updateData('renewable_source', e.target.value)}
          error={errors.renewable_source}
        />
      </div>
      <FormCheckbox
        label="Additionality Proof Provided"
        description="Documentation proving renewable energy is additional to existing grid capacity"
        checked={data.additionality_proof}
        onChange={(e) => updateData('additionality_proof', e.target.checked)}
      />
    </div>
  );
};