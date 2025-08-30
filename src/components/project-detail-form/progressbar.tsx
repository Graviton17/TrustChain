import React, { useState } from 'react';
import { Check, ChevronRight, Building, FileText, DollarSign, Zap, Shield, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

// Progress Bar Component
const ProgressBar = ({ currentStep, totalSteps }: {currentStep: number, totalSteps: number}) => {
  const percentage = currentStep/totalSteps * 100;
  
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-700 ease-out shadow-sm"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Example of a parent component using the ProgressBar
const MultiStepForm = () => {
    // You need a state to keep track of the current step
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4; // Define the total number of steps

    // Handler functions to change the step
    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            {/* Pass the state variables as props to the ProgressBar */}
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            
            {/* Your form content for each step would go here */}
            
            {/* Navigation buttons */}
            <button onClick={handleBack} disabled={currentStep === 1}>Back</button>
            <button onClick={handleNext} disabled={currentStep === totalSteps}>Next</button>
        </div>
    );
};

export default MultiStepForm;