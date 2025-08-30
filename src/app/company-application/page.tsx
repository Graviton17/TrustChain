// "use client";

// import React, { useState } from "react";
// import {
//   Building,
//   DollarSign,
//   Users,
//   Phone,
//   CheckCircle,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import CompanyProfileStep from "@/components/company-registration-form/CompanyProfileStep";
// import CompanyFinancialsStep from "@/components/company-registration-form/CompanyFinancialStep";
// import CompanyOperationsStep from "@/components/company-registration-form/CompanyOperationsStep";
// import CompanyContactsStep from "@/components/company-registration-form/CompanyContactsStep";

// // -------------------- Types --------------------

// interface FormData {
//   userId: string;
//   company_name: string;
//   registration_number: string;
//   company_type: string;
//   company_size: string;
//   year_incorporation: string;
//   country: string;
//   state: string;
//   website: string;

//   annual_revenue: string;
//   net_worth: string;
//   credit_rating: string;
//   past_project_success_rate: string;

//   employees: string;
//   headquarters_address: string;

//   contact_person_name: string;
//   contact_person_designation: string;
//   contact_email: string;
//   contact_phone: string;
// }

// type Errors = Partial<Record<keyof FormData | "submit", string>>;

// type StepConfig = {
//   number: number;
//   title: string;
//   icon: React.ComponentType<{ size?: number }>;
//   endpoint: string;
//   component: React.FC<any>;
// };

// // -------------------- Component --------------------

// const CompanyProfileForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [companyId, setCompanyId] = useState<string>("");
//   const [formData, setFormData] = useState<FormData>({
//     userId: "",
//     company_name: "",
//     registration_number: "",
//     company_type: "",
//     company_size: "",
//     year_incorporation: "",
//     country: "",
//     state: "",
//     website: "",

//     annual_revenue: "",
//     net_worth: "",
//     credit_rating: "",
//     past_project_success_rate: "",

//     employees: "",
//     headquarters_address: "",

//     contact_person_name: "",
//     contact_person_designation: "",
//     contact_email: "",
//     contact_phone: "",
//   });

//   const [errors, setErrors] = useState<Errors>({});
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [submitStatus, setSubmitStatus] = useState<"" | "success">("");
//   const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

//   const steps: StepConfig[] = [
//     {
//       number: 1,
//       title: "Company Profile",
//       icon: Building,
//       endpoint: "/api/company-profiles",
//       component: CompanyProfileStep,
//     },
//     {
//       number: 2,
//       title: "Financial Details",
//       icon: DollarSign,
//       endpoint: "/api/company-financials",
//       component: CompanyFinancialsStep,
//     },
//     {
//       number: 3,
//       title: "Operations",
//       icon: Users,
//       endpoint: "/api/company-operations",
//       component: CompanyOperationsStep,
//     },
//     {
//       number: 4,
//       title: "Contact Information",
//       icon: Phone,
//       endpoint: "/api/company-contacts",
//       component: CompanyContactsStep,
//     },
//   ];

//   const handleInputChange = (field: keyof FormData, value: string | number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (errors[field as keyof FormData]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field as keyof FormData]: "",
//       }));
//     }
//   };

//   const validateStep = (step: number): boolean => {
//     const newErrors: Errors = {};

//     switch (step) {
//       case 1:
//         if (!formData.userId.trim()) newErrors.userId = "User ID is required";
//         if (!formData.company_name.trim())
//           newErrors.company_name = "Company name is required";
//         if (!formData.registration_number.trim())
//           newErrors.registration_number = "Registration number is required";
//         if (!formData.company_type)
//           newErrors.company_type = "Company type is required";
//         if (!formData.company_size)
//           newErrors.company_size = "Company size is required";
//         if (!formData.year_incorporation)
//           newErrors.year_incorporation = "Year of incorporation is required";
//         if (!formData.country) newErrors.country = "Country is required";
//         if (!formData.state.trim()) newErrors.state = "State is required";
//         if (!formData.website.trim()) newErrors.website = "Website is required";
//         break;
//       case 2:
//         if (formData.annual_revenue && Number(formData.annual_revenue) < 0)
//           newErrors.annual_revenue = "Annual revenue must be non-negative";
//         if (formData.net_worth && Number(formData.net_worth) < 0)
//           newErrors.net_worth = "Net worth must be non-negative";
//         if (
//           formData.past_project_success_rate &&
//           (Number(formData.past_project_success_rate) < 0 ||
//             Number(formData.past_project_success_rate) > 100)
//         ) {
//           newErrors.past_project_success_rate =
//             "Success rate must be between 0 and 100";
//         }
//         break;
//       case 3:
//         if (formData.employees && Number(formData.employees) < 0)
//           newErrors.employees = "Number of employees must be non-negative";
//         break;
//       case 4:
//         break;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const submitStepData = async (step: number) => {
//     const stepConfig = steps[step - 1];
//     let payload: Record<string, any> = {};

//     switch (step) {
//       case 1:
//         payload = {
//           userId: formData.userId,
//           company_name: formData.company_name,
//           registration_number: formData.registration_number,
//           company_type: formData.company_type,
//           company_size: formData.company_size,
//           year_incorporation: parseInt(formData.year_incorporation),
//           country: formData.country,
//           state: formData.state,
//           website: formData.website,
//         };
//         break;
//       case 2:
//         payload = {
//           companyId,
//           annual_revenue: formData.annual_revenue
//             ? parseFloat(formData.annual_revenue)
//             : null,
//           net_worth: formData.net_worth
//             ? parseFloat(formData.net_worth)
//             : null,
//           credit_rating: formData.credit_rating || null,
//           past_project_success_rate: formData.past_project_success_rate
//             ? parseFloat(formData.past_project_success_rate)
//             : null,
//         };
//         break;
//       case 3:
//         payload = {
//           companyId,
//           employees: formData.employees
//             ? parseInt(formData.employees)
//             : null,
//           headquarters_address: formData.headquarters_address || null,
//         };
//         break;
//       case 4:
//         payload = {
//           companyId,
//           contact_person_name: formData.contact_person_name || null,
//           contact_person_designation:
//             formData.contact_person_designation || null,
//           contact_email: formData.contact_email || null,
//           contact_phone: formData.contact_phone || null,
//         };
//         break;
//     }

//     try {
//       const response = await fetch(stepConfig.endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (result.success) {
//         if (step === 1 && result.data) {
//           setCompanyId(result.data.$id);
//         }
//         setCompletedSteps((prev) => new Set([...prev, step]));
//         return { success: true, data: result.data };
//       } else {
//         return {
//           success: false,
//           error: result.error || `Failed to save ${stepConfig.title}`,
//         };
//       }
//     } catch (error) {
//       return { success: false, error: "Network error. Please try again." };
//     }
//   };

//   const handleNext = async () => {
//     if (!validateStep(currentStep)) return;

//     setIsSubmitting(true);
//     setErrors({});

//     const result = await submitStepData(currentStep);

//     if (result.success) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       setErrors({ submit: result.error });
//     }

//     setIsSubmitting(false);
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prev) => prev - 1);
//     setErrors({});
//   };

//   const handleFinalSubmit = async () => {
//     if (!validateStep(4)) return;

//     setIsSubmitting(true);
//     const result = await submitStepData(4);

//     if (result.success) {
//       setSubmitStatus("success");
//     } else {
//       setErrors({ submit: result.error });
//     }

//     setIsSubmitting(false);
//   };

//   const ProgressBar = () => (
//     <div className="mb-8">
//       <div className="flex items-center justify-between mb-4">
//         {steps.map((step) => {
//           const Icon = step.icon;
//           const isActive = currentStep === step.number;
//           const isCompleted = completedSteps.has(step.number);

//           return (
//             <div key={step.number} className="flex flex-col items-center">
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
//                   isActive
//                     ? "bg-green-500 border-green-500 text-white shadow-lg"
//                     : isCompleted
//                     ? "bg-green-100 border-green-500 text-green-600"
//                     : "bg-white border-gray-300 text-gray-400"
//                 }`}
//               >
//                 {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
//               </div>
//               <span
//                 className={`text-xs mt-2 font-medium text-center ${
//                   isActive || isCompleted ? "text-green-600" : "text-gray-400"
//                 }`}
//               >
//                 {step.title}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div
//           className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
//           style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
//         ></div>
//       </div>
//     </div>
//   );

//   const renderCurrentStep = () => {
//     const currentStepConfig = steps[currentStep - 1];
//     const StepComponent = steps[currentStep - 1].component;

//     return (
//       <StepComponent
//         formData={formData}
//         onInputChange={handleInputChange}
//         errors={errors}
//       />
//     );
//   };

//   // -------------------- Success Screen --------------------
//   if (submitStatus === "success") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
//           <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">All Done!</h1>
//           <p className="text-gray-600 mb-6">
//             Your complete company profile has been successfully created and all
//             information has been saved.
//           </p>
//           <div className="bg-green-50 rounded-lg p-4 mb-6">
//             <p className="text-sm text-green-800">
//               ✅ Company Profile
//               <br />
//               ✅ Financial Details
//               <br />
//               ✅ Operations Info
//               <br />
//               ✅ Contact Information
//             </p>
//           </div>
//           <button
//             onClick={() => {
//               setCurrentStep(1);
//               setCompanyId("");
//               setFormData({
//                 userId: "",
//                 company_name: "",
//                 registration_number: "",
//                 company_type: "",
//                 company_size: "",
//                 year_incorporation: "",
//                 country: "",
//                 state: "",
//                 website: "",
//                 annual_revenue: "",
//                 net_worth: "",
//                 credit_rating: "",
//                 past_project_success_rate: "",
//                 employees: "",
//                 headquarters_address: "",
//                 contact_person_name: "",
//                 contact_person_designation: "",
//                 contact_email: "",
//                 contact_phone: "",
//               });
//               setSubmitStatus("");
//               setErrors({});
//               setCompletedSteps(new Set());
//             }}
//             className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
//           >
//             Create Another Profile
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // -------------------- Main Form --------------------
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <ProgressBar />

//           <div>
//             {renderCurrentStep()}

//             {errors.submit && (
//               <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
//                 <p className="text-red-600 text-sm">{errors.submit}</p>
//               </div>
//             )}

//             <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={handlePrevious}
//                 disabled={currentStep === 1}
//                 className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
//                   currentStep === 1
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 <ChevronLeft size={20} className="mr-2" />
//                 Previous
//               </button>

//               {currentStep < 4 ? (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   disabled={isSubmitting}
//                   className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-200 ${
//                     isSubmitting
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-500 hover:bg-green-600"
//                   } text-white`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       Next
//                       <ChevronRight size={20} className="ml-2" />
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={handleFinalSubmit}
//                   disabled={isSubmitting}
//                   className={`flex items-center px-8 py-3 rounded-lg transition-all duration-200 ${
//                     isSubmitting
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-500 hover:bg-green-600"
//                   } text-white`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Submitting...
//                     </>
//                   ) : (
//                     "Complete Profile"
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-in-out;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CompanyProfileForm;


// 

"use client";

import { useState } from "react";
import { Building, DollarSign, Users, Phone } from "lucide-react";
import CompanyProfileStep from "@/components/company-registration-form/CompanyProfileStep";
import CompanyFinancialsStep from "@/components/company-registration-form/CompanyFinancialStep";
import CompanyOperationsStep from "@/components/company-registration-form/CompanyOperationsStep";
import CompanyContactsStep from "@/components/company-registration-form/CompanyContactsStep";

interface FormData {
  userId: string;
  company_name: string;
  registration_number: string;
  company_type: string;
  company_size: string;
  year_incorporation: string;
  country: string;
  state: string;
  website: string;
  annual_revenue: string | number;
  net_worth: string | number;
  credit_rating: string;
  past_project_success_rate: string | number;
  employees: string;
  headquarters_address: string;
  contact_person_name: string;
  contact_person_designation: string;
  contact_email: string;
  contact_phone: string;
}

type Errors = Record<string, string>;

interface StepProps {
  formData: Record<string, string | number | undefined>;
  onInputChange: (name: string, value: string | number) => void;
  errors: Errors;
}

const CompanyApplicationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    company_name: "",
    registration_number: "",
    company_type: "",
    company_size: "",
    year_incorporation: "",
    country: "",
    state: "",
    website: "",
    annual_revenue: "",
    net_worth: "",
    credit_rating: "",
    past_project_success_rate: "",
    employees: "",
    headquarters_address: "",
    contact_person_name: "",
    contact_person_designation: "",
    contact_email: "",
    contact_phone: "",
  });
  
  const [errors, setErrors] = useState<Errors>({});

  const steps = [
    {
      number: 1,
      title: "Company Profile",
      icon: Building,
      component: CompanyProfileStep,
    },
    {
      number: 2,
      title: "Financial Details",
      icon: DollarSign,
      component: CompanyFinancialsStep,
    },
    {
      number: 3,
      title: "Operations",
      icon: Users,
      component: CompanyOperationsStep,
    },
    {
      number: 4,
      title: "Contact Information",
      icon: Phone,
      component: CompanyContactsStep,
    },
  ] as const;

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Errors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.company_name) {
          newErrors.company_name = "Company name is required";
          isValid = false;
        }
        if (!formData.company_size) {
          newErrors.company_size = "Company size is required";
          isValid = false;
        }
        if (!formData.website) {
          newErrors.website = "Website is required";
          isValid = false;
        }
        break;
      case 2:
        if (!formData.annual_revenue) {
          newErrors.annual_revenue = "Annual revenue is required";
          isValid = false;
        }
        break;
      case 3:
        if (!formData.employees) {
          newErrors.employees = "Number of employees is required";
          isValid = false;
        }
        break;
      case 4:
        if (!formData.contact_person_name) {
          newErrors.contact_person_name = "Contact person name is required";
          isValid = false;
        }
        if (!formData.contact_email) {
          newErrors.contact_email = "Contact email is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        // Add your API call here
        console.log("Form submitted:", formData);
      } catch (error) {
        console.error("Submission error:", error);
        setErrors({ 
          contact_email: "Failed to submit form. Please try again." 
        });
      }
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center ${
                  step.number <= currentStep ? "text-green-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.number <= currentStep
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <step.icon size={16} />
                </div>
                <span className="ml-2 text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <CurrentStepComponent
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg ${
                currentStep === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={currentStep === steps.length ? handleSubmit : handleNext}
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              {currentStep === steps.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyApplicationPage;