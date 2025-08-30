"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  Building,
  FileText,
  DollarSign,
  Zap,
  Shield,
  Award,
} from "lucide-react";

// Import project types
import type { ProjectApiResponse, CompleteProjectData } from "@/types/project";

// Import all the form components
import StepIndicator from "@/components/project-detail-form/step-indicator";
import ProgressBar from "@/components/project-detail-form/progressbar";
import ProjectInformationForm from "@/components/project-detail-form/project-information";
import ComplianceForm from "@/components/project-detail-form/compilance";
import FinancialForm from "@/components/project-detail-form/finacial-componenet";
import ProductionForm from "@/components/project-detail-form/prouduction-component";
import VerificationForm from "@/components/project-detail-form/verification-componenet";
import SuccessAnimation from "@/components/project-detail-form/successanimation";

// Define the step configuration
const steps = [
  {
    id: 1,
    title: "Project Info",
    icon: Building,
    component: "project-information",
  },
  {
    id: 2,
    title: "Compliance",
    icon: Shield,
    component: "compliance",
  },
  {
    id: 3,
    title: "Financial",
    icon: DollarSign,
    component: "financial",
  },
  {
    id: 4,
    title: "Production",
    icon: Zap,
    component: "production",
  },
  {
    id: 5,
    title: "Verification",
    icon: Award,
    component: "verification",
  },
  {
    id: 6,
    title: "Review",
    icon: FileText,
    component: "review",
  },
];

// Define initial form data structure
const initialFormData = {
  // Project Information
  companyId: "",
  project_name: "",
  sector: "",
  location: "",
  ownership_type: "",
  start_year: "",
  completion_year: "",
  selected_subsidy: "",

  // Compliance
  env_clearance_status: "",
  lca_completed: false,
  mrv_plan: false,

  // Financial
  capex: "",
  opex: "",
  offtake_signed: false,

  // Production
  technology_used: "",
  electrolyzer_type: "",
  installed_capacity_mw: "",
  hydrogen_output_tpy: "",

  // Verification
  carbon_intensity: "",
  renewable_source: "",
  additionality_proof: false,
};

// Define form errors structure
const initialErrors = {
  // Project Information errors
  companyId: "",
  project_name: "",

  // Compliance errors
  env_clearance_status: "",

  // Financial errors
  capex: "",
  opex: "",

  // Production errors
  technology_used: "",
  electrolyzer_type: "",
  installed_capacity_mw: "",
  hydrogen_output_tpy: "",

  // Verification errors
  carbon_intensity: "",
  renewable_source: "",

  // Submission error
  submit: "",
};

export default function ProjectDetailPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Update form data
  const updateData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Clear submit error when user makes changes
    if (errors.submit) {
      setErrors((prev) => ({
        ...prev,
        submit: "",
      }));
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    switch (step) {
      case 0: // Project Information
        if (!formData.companyId.trim()) {
          newErrors.companyId = "Company ID is required";
          isValid = false;
        }
        if (!formData.project_name.trim()) {
          newErrors.project_name = "Project name is required";
          isValid = false;
        }
        break;
      case 1: // Compliance
        if (!formData.env_clearance_status.trim()) {
          newErrors.env_clearance_status =
            "Environmental clearance status is required";
          isValid = false;
        }
        break;
      case 2: // Financial
        if (!formData.capex.trim()) {
          newErrors.capex = "CAPEX is required";
          isValid = false;
        }
        if (!formData.opex.trim()) {
          newErrors.opex = "OPEX is required";
          isValid = false;
        }
        break;
      case 3: // Production
        if (!formData.technology_used.trim()) {
          newErrors.technology_used = "Technology selection is required";
          isValid = false;
        }
        break;
      case 4: // Verification
        if (!formData.carbon_intensity.trim()) {
          newErrors.carbon_intensity = "Carbon intensity is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        // Clear submit error when navigating
        if (errors.submit) {
          setErrors((prev) => ({ ...prev, submit: "" }));
        }
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Clear submit error when navigating
      if (errors.submit) {
        setErrors((prev) => ({ ...prev, submit: "" }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Prepare data for API according to the expected structure
      const projectData = {
        project: {
          companyId: formData.companyId,
          project_name: formData.project_name,
          sector: formData.sector || null,
          location: formData.location || null,
          ownership_type: formData.ownership_type || null,
          start_year: formData.start_year
            ? parseInt(formData.start_year)
            : null,
          completion_year: formData.completion_year
            ? parseInt(formData.completion_year)
            : null,
          selected_subsidy: formData.selected_subsidy || null,
        },
        compliance: {
          env_clearance_status: formData.env_clearance_status || null,
          lca_completed: formData.lca_completed || false,
          mrv_plan: formData.mrv_plan || false,
        },
        financials: {
          capex: formData.capex ? parseFloat(formData.capex) : null,
          opex: formData.opex ? parseFloat(formData.opex) : null,
          offtake_signed: formData.offtake_signed || false,
        },
        production: {
          technology_used: formData.technology_used || null,
          electrolyzer_type: formData.electrolyzer_type || null,
          installed_capacity_mw: formData.installed_capacity_mw
            ? parseFloat(formData.installed_capacity_mw)
            : null,
          hydrogen_output_tpy: formData.hydrogen_output_tpy
            ? parseFloat(formData.hydrogen_output_tpy)
            : null,
        },
        verification: {
          carbon_intensity: formData.carbon_intensity
            ? parseFloat(formData.carbon_intensity)
            : null,
          renewable_source: formData.renewable_source || null,
          additionality_proof: formData.additionality_proof || false,
        },
      };

      // Send data to the project-complete API
      const response = await fetch("/api/project-complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const result: ProjectApiResponse<CompleteProjectData> =
        await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit project");
      }

      console.log("Project submitted successfully:", result);

      // Try to fetch company name using companyId so we can redirect to certificate
      const companyIdToFetch = formData.companyId || (result && result.data && result.data.project && result.data.project.companyId) || "";
      let companyNameForCert = "[Company Name]";

      if (companyIdToFetch) {
        try {
          const companyResp = await fetch(
            `/api/company-complete?companyId=${encodeURIComponent(
              companyIdToFetch
            )}`
          );
          const companyJson = await companyResp.json();
          if (
            companyResp.ok &&
            companyJson?.success &&
            companyJson?.data?.profile?.company_name
          ) {
            companyNameForCert = companyJson.data.profile.company_name;
          }
        } catch (err) {
          console.error("Failed to fetch company data for certificate redirect:", err);
        }
      }

      // Build certificate URL and redirect the user
      const certUrl = `/certificate?companyName=${encodeURIComponent(
        companyNameForCert
      )}&companyId=${encodeURIComponent(companyIdToFetch)}&projectId=${encodeURIComponent(
        (result && result.data && result.data.project && result.data.project.$id) || ""
      )}`;

      router.push(certUrl);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);

      // Show error message to user
      setErrors((prev) => ({
        ...prev,
        submit:
          error instanceof Error
            ? error.message
            : "Failed to submit project. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step component
  const renderStepComponent = () => {
    const stepConfig = steps[currentStep];

    switch (stepConfig.component) {
      case "project-information":
        return (
          <ProjectInformationForm
            data={formData}
            updateData={updateData}
            errors={errors}
          />
        );
      case "compliance":
        return (
          <ComplianceForm
            data={formData}
            updateData={updateData}
            errors={errors}
          />
        );
      case "financial":
        return (
          <FinancialForm
            data={formData}
            updateData={updateData}
            errors={errors}
          />
        );
      case "production":
        return (
          <ProductionForm
            data={formData}
            updateData={updateData}
            errors={errors}
          />
        );
      case "verification":
        return (
          <VerificationForm
            data={formData}
            updateData={updateData}
            errors={errors}
          />
        );
      case "review":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Review Your Submission
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Company ID:</span>
                  <span className="ml-2 text-gray-900">
                    {formData.companyId}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Project Name:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formData.project_name}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Sector:</span>
                  <span className="ml-2 text-gray-900">{formData.sector}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-900">
                    {formData.location}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">CAPEX:</span>
                  <span className="ml-2 text-gray-900">${formData.capex}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">OPEX:</span>
                  <span className="ml-2 text-gray-900">${formData.opex}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Technology:</span>
                  <span className="ml-2 text-gray-900">
                    {formData.technology_used}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Step not found</div>;
    }
  };

  // If form is submitted, show success animation
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <SuccessAnimation />
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setFormData(initialFormData);
                setErrors(initialErrors);
              }}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Submit Another Project
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar
            currentStep={currentStep + 1}
            totalSteps={steps.length}
          />
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {renderStepComponent()}
        </div>

        {/* Error Display */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? "bg-emerald-400 text-white cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Project"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
