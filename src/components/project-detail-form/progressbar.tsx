import React from "react";

// Progress Bar Component
const ProgressBar = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  // Use Tailwind width classes based on percentage to avoid inline styles
  const getWidthClass = (percentage: number) => {
    if (percentage >= 100) return "w-full";
    if (percentage >= 83) return "w-5/6";
    if (percentage >= 66) return "w-2/3";
    if (percentage >= 50) return "w-1/2";
    if (percentage >= 33) return "w-1/3";
    if (percentage >= 16) return "w-1/6";
    return "w-0";
  };

  return (
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
      <div
        className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-700 ease-out shadow-sm ${getWidthClass(
          percentage
        )}`}
      />
    </div>
  );
};

export { ProgressBar };
export default ProgressBar;
