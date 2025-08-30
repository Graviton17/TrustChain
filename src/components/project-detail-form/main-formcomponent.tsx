import React, { useState } from "react";
import {
  Check,
  Building,
  FileText,
  DollarSign,
  Zap,
  Shield,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

// Simple placeholder components for missing imports
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const ProjectInformationForm = (props: any) => (
  <div>Project Information Form Component</div>
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const ComplianceForm = (props: any) => <div>Compliance Form Component</div>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const FinancialsForm = (props: any) => <div>Financials Form Component</div>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const ProductionForm = (props: any) => <div>Production Form Component</div>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const VerificationForm = (props: any) => <div>Verification Form Component</div>;
const SuccessAnimation = () => <div>Success Animation Component</div>;
const Header = () => <div>Header Component</div>;

const ProgressBar = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  // Use Tailwind width classes based on percentage
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
        className={`h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 ease-out rounded-full shadow-lg ${getWidthClass(
          percentage
        )}`}
      />
    </div>
  );
};

const StepIndicator = ({
  steps,
  currentStep,
}: {
  steps: {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  currentStep: number;
}) => (
  <div className="flex items-center justify-between">
    {steps.map((step, index) => (
      <div
        key={step.id}
        className={`flex items-center ${
          index < steps.length - 1 ? "flex-1" : ""
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            index <= currentStep
              ? "bg-emerald-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {index < currentStep ? (
            <Check className="w-5 h-5" />
          ) : (
            React.createElement(step.icon, { className: "w-5 h-5" })
          )}
        </div>
        {index < steps.length - 1 && (
          <div
            className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
              index < currentStep ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

// Type definitions
type FormSection =
  | "project"
  | "compliance"
  | "financials"
  | "production"
  | "verification";

interface ProjectData {
  companyId: string;
  project_name: string;
  sector: string;
  location: string;
  ownership_type: string;
  start_year: string;
  completion_year: string;
  selected_subsidy: string;
}

interface ComplianceData {
  env_clearance_status: string;
  lca_completed: boolean;
  mrv_plan: boolean;
}

interface FinancialsData {
  capex: string;
  opex: string;
  offtake_signed: boolean;
}

interface ProductionData {
  technology_used: string;
  electrolyzer_type: string;
  installed_capacity_mw: string;
  hydrogen_output_tpy: string;
}

interface VerificationData {
  carbon_intensity: string;
  renewable_source: string;
  additionality_proof: boolean;
}

interface FormData {
  project: ProjectData;
  compliance: ComplianceData;
  financials: FinancialsData;
  production: ProductionData;
  verification: VerificationData;
}

interface StepErrors {
  [key: string]: string;
}

interface Errors {
  [key: string]: StepErrors;
}
// Main Form Component
const TrustChainProjectForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [formData, setFormData] = useState<FormData>({
    project: {
      companyId: "",
      project_name: "",
      sector: "",
      location: "",
      ownership_type: "",
      start_year: "",
      completion_year: "",
      selected_subsidy: "",
    },
    compliance: {
      env_clearance_status: "",
      lca_completed: false,
      mrv_plan: false,
    },
    financials: {
      capex: "",
      opex: "",
      offtake_signed: false,
    },
    production: {
      technology_used: "",
      electrolyzer_type: "",
      installed_capacity_mw: "",
      hydrogen_output_tpy: "",
    },
    verification: {
      carbon_intensity: "",
      renewable_source: "",
      additionality_proof: false,
    },
  });

  const steps = [
    { id: "project", title: "Project Info", icon: Building },
    { id: "compliance", title: "Compliance", icon: FileText },
    { id: "financials", title: "Financials", icon: DollarSign },
    { id: "production", title: "Production", icon: Zap },
    { id: "verification", title: "Verification", icon: Shield },
  ];

  const updateFormData = (
    section: FormSection,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const validateStep = (stepIndex: number) => {
    const stepKey = steps[stepIndex].id as FormSection;
    const stepData = formData[stepKey];
    const stepErrors: StepErrors = {};

    // Validation for each step
    switch (stepIndex) {
      case 0: // Project Info
        const projectData = stepData as ProjectData;
        if (!projectData.companyId)
          stepErrors.companyId = "Company ID is required";
        if (!projectData.project_name)
          stepErrors.project_name = "Project name is required";
        break;
      case 1: // Compliance - Optional validations
        break;
      case 2: // Financials - Optional validations
        break;
      case 3: // Production - Optional validations
        break;
      case 4: // Verification - Optional validations
        break;
    }

    setErrors((prev) => ({ ...prev, [stepKey]: stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const saveStepData = async (stepIndex: number) => {
    const stepKey = steps[stepIndex].id as FormSection;
    const stepData = formData[stepKey];

    // Simulate API call to save individual step data
    try {
      console.log(`Saving ${stepKey} data:`, stepData);

      // Here you would make actual API calls to your backend
      // For steps 1-4, save individual collection data
      // Example:
      // const response = await fetch(`/api/${stepKey}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(stepData)
      // });

      return { success: true };
    } catch (error) {
      console.error(`Error saving ${stepKey} data:`, error);
      throw error;
    }
  };

  const submitCompleteProject = async () => {
    try {
      console.log("Submitting complete project:", formData);

      // Final API call to create complete project entry
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      return { success: true };
    } catch (error) {
      console.error("Error submitting project:", error);
      throw error;
    }
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);

    try {
      // For steps 1-4, save to backend
      if (currentStep < 4) {
        await saveStepData(currentStep);
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error processing step:", error);
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);

    try {
      await submitCompleteProject();
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting project:", error);
    }

    setLoading(false);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    if (submitted) {
      return <SuccessAnimation />;
    }

    const currentStepData = formData[steps[currentStep].id as FormSection];
    const stepErrors = errors[steps[currentStep].id as FormSection] || {};

    switch (currentStep) {
      case 0:
        return (
          <ProjectInformationForm
            data={currentStepData as ProjectData}
            updateData={(field: string, value: string | boolean) =>
              updateFormData("project", field, value)
            }
            errors={stepErrors}
          />
        );
      case 1:
        return (
          <ComplianceForm
            data={currentStepData as ComplianceData}
            updateData={(field: string, value: string | boolean) =>
              updateFormData("compliance", field, value)
            }
            errors={stepErrors}
          />
        );
      case 2:
        return (
          <FinancialsForm
            data={currentStepData as FinancialsData}
            updateData={(field: string, value: string | boolean) =>
              updateFormData("financials", field, value)
            }
            errors={stepErrors}
          />
        );
      case 3:
        return (
          <ProductionForm
            data={currentStepData as ProductionData}
            updateData={(field: string, value: string | boolean) =>
              updateFormData("production", field, value)
            }
            errors={stepErrors}
          />
        );
      case 4:
        return (
          <VerificationForm
            data={currentStepData as VerificationData}
            updateData={(field: string, value: string | boolean) =>
              updateFormData("verification", field, value)
            }
            errors={stepErrors}
          />
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <SuccessAnimation />
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(0);
                    setFormData({
                      project: {
                        companyId: "",
                        project_name: "",
                        sector: "",
                        location: "",
                        ownership_type: "",
                        start_year: "",
                        completion_year: "",
                        selected_subsidy: "",
                      },
                      compliance: {
                        env_clearance_status: "",
                        lca_completed: false,
                        mrv_plan: false,
                      },
                      financials: {
                        capex: "",
                        opex: "",
                        offtake_signed: false,
                      },
                      production: {
                        technology_used: "",
                        electrolyzer_type: "",
                        installed_capacity_mw: "",
                        hydrogen_output_tpy: "",
                      },
                      verification: {
                        carbon_intensity: "",
                        renewable_source: "",
                        additionality_proof: false,
                      },
                    });
                  }}
                  className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                >
                  Register Another Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Green Hydrogen Project Registration
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Complete your project registration in 5 comprehensive steps
          </p>

          {/* Progress Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">
                Registration Progress
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {currentStep + 1} of {steps.length}
              </span>
            </div>
            <ProgressBar
              currentStep={currentStep + 1}
              totalSteps={steps.length}
            />
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Step Indicator */}
          <div className="px-8 py-8 bg-gradient-to-r from-emerald-50 to-white border-b border-gray-100">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          {/* Form Content */}
          <div className="px-8 py-10">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  {React.createElement(steps[currentStep].icon, {
                    className: "w-6 h-6 text-emerald-600",
                  })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-gray-600">
                    {currentStep === 0 &&
                      "Enter basic project information and company details"}
                    {currentStep === 1 &&
                      "Provide compliance and regulatory information"}
                    {currentStep === 2 &&
                      "Add financial details and investment information"}
                    {currentStep === 3 &&
                      "Specify production capacity and technology details"}
                    {currentStep === 4 &&
                      "Complete verification and certification requirements"}
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-96">{renderStepContent()}</div>
          </div>

          {/* Navigation */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || loading}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentStep === 0 || loading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-sm border border-gray-200"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-6">
              {/* Trust Indicator */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Blockchain Secured</span>
              </div>

              {/* Next/Submit Button */}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex items-center space-x-2 px-8 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Project...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Submit Project</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              100% Blockchain Transparency
            </h4>
            <p className="text-sm text-gray-600">
              Every transaction recorded immutably on blockchain
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              10x Faster Processing
            </h4>
            <p className="text-sm text-gray-600">
              Automated smart contracts accelerate disbursements
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Check className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Zero Fraud Guarantee
            </h4>
            <p className="text-sm text-gray-600">
              Immutable records prevent fraud and ensure compliance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustChainProjectForm;
