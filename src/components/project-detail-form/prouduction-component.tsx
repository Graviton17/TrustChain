import React, { useState } from 'react';
import { Check, ChevronRight, Building, FileText, DollarSign, Zap, Shield, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
// Step 4: Production Component
const ProductionForm = ({ data, updateData, errors }) => {
  const technologyOptions = [
    { value: 'alkaline', label: 'Alkaline Electrolysis' },
    { value: 'pem', label: 'PEM Electrolysis' },
    { value: 'solid_oxide', label: 'Solid Oxide Electrolysis' },
    { value: 'anion_exchange', label: 'Anion Exchange Membrane' }
  ];

  const electrolyzerOptions = [
    { value: 'alkaline_electrolyzer', label: 'Alkaline Electrolyzer' },
    { value: 'pem_electrolyzer', label: 'PEM Electrolyzer' },
    { value: 'soec', label: 'Solid Oxide Electrolyzer (SOEC)' },
    { value: 'aem', label: 'Anion Exchange Membrane (AEM)' }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Technology Used"
          options={technologyOptions}
          value={data.technology_used}
          onChange={(e) => updateData('technology_used', e.target.value)}
          error={errors.technology_used}
        />
        <FormSelect
          label="Electrolyzer Type"
          options={electrolyzerOptions}
          value={data.electrolyzer_type}
          onChange={(e) => updateData('electrolyzer_type', e.target.value)}
          error={errors.electrolyzer_type}
        />
        <FormInput
          label="Installed Capacity (MW)"
          type="number"
          placeholder="Total capacity in megawatts"
          value={data.installed_capacity_mw}
          onChange={(e) => updateData('installed_capacity_mw', e.target.value)}
          error={errors.installed_capacity_mw}
        />
        <FormInput
          label="Hydrogen Output (TPY)"
          type="number"
          placeholder="Annual production in tonnes"
          value={data.hydrogen_output_tpy}
          onChange={(e) => updateData('hydrogen_output_tpy', e.target.value)}
          error={errors.hydrogen_output_tpy}
        />
      </div>
    </div>
  );
};