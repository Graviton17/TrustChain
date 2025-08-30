import React from "react";
import { Check } from "lucide-react";

// Define interfaces for TypeScript
interface Step {
  id: string | number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

// Step Indicator Component
const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => (
  <div className="flex items-center justify-between mb-6 sm:mb-8 px-2 sm:px-4 overflow-x-auto">
    {steps.map((step: Step, index: number) => (
      <div key={step.id} className="flex items-center flex-shrink-0">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 transform ${
              index < currentStep
                ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200"
                : index === currentStep
                ? "bg-white text-emerald-600 ring-4 ring-emerald-500 ring-opacity-30 scale-110 shadow-lg"
                : "bg-gray-100 text-gray-400 scale-100"
            }`}
          >
            {index < currentStep ? (
              <Check className="w-5 h-5 sm:w-6 sm:h-6 animate-in zoom-in duration-300" />
            ) : (
              <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </div>
          <span
            className={`mt-2 sm:mt-3 text-xs font-medium transition-all duration-300 text-center max-w-16 sm:max-w-20 ${
              index <= currentStep ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            {step.title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div
            className={`w-12 sm:w-20 h-1 mx-2 sm:mx-4 rounded-full transition-all duration-500 ${
              index < currentStep ? "bg-emerald-500 shadow-sm" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
