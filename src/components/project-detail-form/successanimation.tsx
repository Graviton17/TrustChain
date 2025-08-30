import React from "react";
import { Check } from "lucide-react";

// Success Animation Component
const SuccessAnimation = () => (
  <div className="text-center py-8 sm:py-12 animate-in zoom-in duration-500">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
      <Check className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
      Project Submitted Successfully!
    </h3>
    <p className="text-sm sm:text-base text-gray-600 px-4">
      Your project has been registered on the blockchain.
    </p>
  </div>
);

export default SuccessAnimation;
