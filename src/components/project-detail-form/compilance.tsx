import React, { useState } from 'react';
import { Check, ChevronRight, Building, FileText, DollarSign, Zap, Shield, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
// Step 2: Compliance Component
const ComplianceForm = ({ data, updateData, errors }) => {
  const clearanceOptions = [
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'not_required', label: 'Not Required' }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <FormSelect
        label="Environmental Clearance Status"
        options={clearanceOptions}
        value={data.env_clearance_status}
        onChange={(e) => updateData('env_clearance_status', e.target.value)}
        error={errors.env_clearance_status}
      />
      <div className="space-y-4">
        <FormCheckbox
          label="Life Cycle Assessment (LCA) Completed"
          description="Environmental impact assessment covering the entire project lifecycle"
          checked={data.lca_completed}
          onChange={(e) => updateData('lca_completed', e.target.checked)}
        />
        <FormCheckbox
          label="Monitoring, Reporting & Verification (MRV) Plan"
          description="Comprehensive plan for ongoing monitoring and verification of project metrics"
          checked={data.mrv_plan}
          onChange={(e) => updateData('mrv_plan', e.target.checked)}
        />
      </div>
    </div>
  );
};