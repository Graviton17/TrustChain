import React, { useState } from 'react';
import { Check, ChevronRight, Building, FileText, DollarSign, Zap, Shield, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
// Step 1: Project Information Component
const ProjectInformationForm = ({ data, updateData, errors }) => {
  const sectorOptions = [
    { value: 'renewable_energy', label: 'Renewable Energy' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'power_generation', label: 'Power Generation' }
  ];

  const ownershipOptions = [
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' },
    { value: 'joint_venture', label: 'Joint Venture' },
    { value: 'cooperative', label: 'Cooperative' }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Company ID"
          placeholder="Enter unique company identifier"
          value={data.companyId}
          onChange={(e) => updateData('companyId', e.target.value)}
          required
          error={errors.companyId}
        />
        <FormInput
          label="Project Name"
          placeholder="Enter descriptive project name"
          value={data.project_name}
          onChange={(e) => updateData('project_name', e.target.value)}
          required
          error={errors.project_name}
        />
        <FormSelect
          label="Sector"
          options={sectorOptions}
          value={data.sector}
          onChange={(e) => updateData('sector', e.target.value)}
        />
        <FormInput
          label="Location"
          placeholder="City, State, Country"
          value={data.location}
          onChange={(e) => updateData('location', e.target.value)}
        />
        <FormSelect
          label="Ownership Type"
          options={ownershipOptions}
          value={data.ownership_type}
          onChange={(e) => updateData('ownership_type', e.target.value)}
        />
        <FormInput
          label="Start Year"
          type="number"
          placeholder="2024"
          value={data.start_year}
          onChange={(e) => updateData('start_year', e.target.value)}
        />
        <FormInput
          label="Completion Year"
          type="number"
          placeholder="2027"
          value={data.completion_year}
          onChange={(e) => updateData('completion_year', e.target.value)}
        />
        <FormInput
          label="Selected Subsidy Program"
          placeholder="Government subsidy program name"
          value={data.selected_subsidy}
          onChange={(e) => updateData('selected_subsidy', e.target.value)}
        />
      </div>
    </div>
  );
};