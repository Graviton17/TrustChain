"use client";

import React, { useState } from "react";
import { Building, FileText, DollarSign, Users, Phone } from "lucide-react";

// Import company types
import type { CompanyApiResponse, CompleteCompanyData } from "@/types/company";

// Import all the form components from project-detail-form (reusing the same structure)
import Header from "@/components/project-detail-form/header";
import StepIndicator from "@/components/project-detail-form/step-indicator";
import ProgressBar from "@/components/project-detail-form/progressbar";
import SuccessAnimation from "@/components/project-detail-form/successanimation";

// Import company registration form components
import CompanyProfileStep from "@/components/company-registration-form/CompanyProfileStep";
import CompanyContactsStep from "@/components/company-registration-form/CompanyContactsStep";
import CompanyFinancialStep from "@/components/company-registration-form/CompanyFinancialStep";
import CompanyOperationsStep from "@/components/company-registration-form/CompanyOperationsStep";

// Define the step configuration
const steps = [
  {
    id: 1,
    title: "Company Profile",
    icon: Building,
    component: "company-profile",
  },
  {
    id: 2,
    title: "Contact Information",
    icon: Phone,
    component: "company-contacts",
  },
  {
    id: 3,
    title: "Financial Details",
    icon: DollarSign,
    component: "company-financial",
  },
  {
    id: 4,
    title: "Operations",
    icon: Users,
    component: "company-operations",
  },
  {
    id: 5,
    title: "Review",
    icon: FileText,
    component: "review",
  },
];

// Define initial form data structure
const initialFormData = {
  // Company Profile
  userId: "",
  company_name: "",
  registration_number: "",
  company_type: "",
  company_size: "",
  year_incorporation: "",
  country: "",
  state: "",
  website: "",

  // Company Contacts
  contact_person_name: "",
  contact_person_designation: "",
  contact_email: "",
  contact_phone: "",

  // Company Financials
  annual_revenue: "",
  net_worth: "",
  credit_rating: "",
  past_project_success_rate: "",

  // Company Operations
  employees: "",
  headquarters_address: "",
};

// Define form errors structure
const initialErrors = {
  // Company Profile errors
  userId: "",
  company_name: "",
  registration_number: "",
  website: "",

  // Company Contacts errors
  contact_person_name: "",
  contact_email: "",

  // Company Financials errors
  annual_revenue: "",
  net_worth: "",

  // Company Operations errors
  employees: "",
  headquarters_address: "",

  // Submission error
  submit: "",
};

export default function CompanyApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data - compatible with existing company form components
  const handleInputChange = (field: string, value: string) => {
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

    // Helper function to validate URL
    const isValidUrl = (url: string): boolean => {
      if (!url || url.trim() === "") return true; // Empty is allowed

      try {
        // Try with the URL as is
        new URL(url);
        return true;
      } catch {
        try {
          // Try with https:// prefix
          new URL(`https://${url}`);
          return true;
        } catch {
          return false;
        }
      }
    };

    switch (step) {
      case 0: // Company Profile
        if (!formData.userId.trim()) {
          newErrors.userId = "User ID is required";
          isValid = false;
        }
        if (!formData.company_name.trim()) {
          newErrors.company_name = "Company name is required";
          isValid = false;
        }
        if (!formData.registration_number.trim()) {
          newErrors.registration_number = "Registration number is required";
          isValid = false;
        }
        // Validate website URL format if provided
        if (formData.website && !isValidUrl(formData.website)) {
          newErrors.website = "Please enter a valid website URL";
          isValid = false;
        }
        break;
      case 1: // Company Contacts
        if (!formData.contact_person_name.trim()) {
          newErrors.contact_person_name = "Contact person name is required";
          isValid = false;
        }
        if (!formData.contact_email.trim()) {
          newErrors.contact_email = "Contact email is required";
          isValid = false;
        }
        break;
      case 2: // Company Financials
        if (!formData.annual_revenue.trim()) {
          newErrors.annual_revenue = "Annual revenue is required";
          isValid = false;
        }
        if (!formData.net_worth.trim()) {
          newErrors.net_worth = "Net worth is required";
          isValid = false;
        }
        break;
      case 3: // Company Operations
        if (!formData.employees.trim()) {
          newErrors.employees = "Number of employees is required";
          isValid = false;
        }
        if (!formData.headquarters_address.trim()) {
          newErrors.headquarters_address = "Headquarters address is required";
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
      const companyData = {
        profile: {
          userId: formData.userId,
          company_name: formData.company_name,
          registration_number: formData.registration_number || null,
          company_type: formData.company_type || null,
          company_size: formData.company_size || null,
          year_incorporation: formData.year_incorporation
            ? parseInt(formData.year_incorporation)
            : null,
          country: formData.country || null,
          state: formData.state || null,
          website: formData.website || null,
        },
        contacts: {
          contact_person_name: formData.contact_person_name || null,
          contact_person_designation:
            formData.contact_person_designation || null,
          contact_email: formData.contact_email || null,
          contact_phone: formData.contact_phone || null,
        },
        financials: {
          annual_revenue: formData.annual_revenue
            ? parseFloat(formData.annual_revenue)
            : null,
          net_worth: formData.net_worth ? parseFloat(formData.net_worth) : null,
          credit_rating: formData.credit_rating || null,
          past_project_success_rate: formData.past_project_success_rate
            ? parseFloat(formData.past_project_success_rate)
            : null,
        },
        operations: {
          employees: formData.employees ? parseInt(formData.employees) : null,
          headquarters_address: formData.headquarters_address || null,
        },
      };

      // Send data to the company-complete API
      const response = await fetch("/api/company-complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });

      const result: CompanyApiResponse<CompleteCompanyData> =
        await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit company application");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);

      // Show error message to user
      setErrors((prev) => ({
        ...prev,
        submit:
          error instanceof Error
            ? error.message
            : "Failed to submit company application. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step component
  const renderStepComponent = () => {
    const stepConfig = steps[currentStep];

    switch (stepConfig.component) {
      case "company-profile":
        return (
          <CompanyProfileStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case "company-contacts":
        return (
          <CompanyContactsStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case "company-financial":
        return (
          <CompanyFinancialStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case "company-operations":
        return (
          <CompanyOperationsStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case "review":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Review Your Company Application
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">User ID:</span>
                  <span className="ml-2 text-gray-900">{formData.userId}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Company Name:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formData.company_name}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Registration Number:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formData.registration_number}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Company Type:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formData.company_type}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Contact Person:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formData.contact_person_name}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Contact Email:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formData.contact_email}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Annual Revenue:
                  </span>
                  <span className="ml-2 text-gray-900">
                    ${formData.annual_revenue}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Employees:</span>
                  <span className="ml-2 text-gray-900">
                    {formData.employees}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Company Application Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your company application has been submitted and is under review.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setFormData(initialFormData);
                setErrors(initialErrors);
              }}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Submit Another Application
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
              {isSubmitting ? "Submitting..." : "Submit Application"}
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
