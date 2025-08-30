import React, { useState } from 'react';
import { Check, ChevronRight, Building, FileText, DollarSign, Zap, Shield, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
const FinancialsForm = ({ data, updateData, errors }) => (
  <div className="space-y-6 animate-in slide-in-from-right duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="CAPEX (Capital Expenditure)"
        type="number"
        placeholder="Amount in millions USD"
        value={data.capex}
        onChange={(e) => updateData('capex', e.target.value)}
        error={errors.capex}
      />
      <FormInput
        label="OPEX (Operational Expenditure)"
        type="number"
        placeholder="Annual amount in millions USD"
        value={data.opex}
        onChange={(e) => updateData('opex', e.target.value)}
        error={errors.opex}
      />
    </div>
    <FormCheckbox
      label="Offtake Agreement Signed"
      description="Long-term purchase agreement for hydrogen output"
      checked={data.offtake_signed}
      onChange={(e) => updateData('offtake_signed', e.target.checked)}
    />
  </div>
);
