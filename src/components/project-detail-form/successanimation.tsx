import React, { useState } from 'react';
import { Check, ChevronRight, Building, FileText, DollarSign, Zap, Shield, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';


// Success Animation Component
const SuccessAnimation = () => (
  <div className="text-center py-12 animate-in zoom-in duration-500">
    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
      <Check className="w-10 h-10 text-emerald-600" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Submitted Successfully!</h3>
    <p className="text-gray-600">Your project has been registered on the blockchain.</p>
  </div>
);
