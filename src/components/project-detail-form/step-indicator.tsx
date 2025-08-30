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
  <div className="flex items-center justify-between mb-8 px-4">
    {steps.map((step: Step, index: number) => (
      <div key={step.id} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 transform ${
              index < currentStep
                ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200"
                : index === currentStep
                ? "bg-white text-emerald-600 ring-4 ring-emerald-500 ring-opacity-30 scale-110 shadow-lg"
                : "bg-gray-100 text-gray-400 scale-100"
            }`}
          >
            {index < currentStep ? (
              <Check className="w-6 h-6 animate-in zoom-in duration-300" />
            ) : (
              <step.icon className="w-6 h-6" />
            )}
          </div>
          <span
            className={`mt-3 text-xs font-medium transition-all duration-300 ${
              index <= currentStep ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            {step.title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div
            className={`w-20 h-1 mx-4 rounded-full transition-all duration-500 ${
              index < currentStep ? "bg-emerald-500 shadow-sm" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
