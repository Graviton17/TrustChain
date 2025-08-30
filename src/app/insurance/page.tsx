"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  CheckCircle,
  MapPin,
  Building,
  Award,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";
import { InsurancePolicy } from "@/types/insurance";
import { useRouter } from "next/navigation";

interface StatePolicy {
  state: string;
  coverage: string;
  features: string[];
  icon: React.ReactNode;
}

interface InsuranceCompany {
  name: string;
  rating: string;
  rank: string;
  services: string[];
}

interface SubsidyComponent {
  title: string;
  description: string;
  features: string[];
}

interface PremiumStructure {
  type: string;
  range: string;
  basis: string;
}

const InsurancePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("national");
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("/api/insurance");
        const data = await response.json();
        if (data.success && data.data) {
          setPolicies(data.data);
        } else {
          setError(data.error || "Failed to fetch insurance policies");
        }
      } catch (err) {
        setError("Failed to fetch insurance policies");
        console.error("Error fetching policies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Filter policies by type
  const nationalPolicies = policies.filter(
    (policy) => policy.policy_type === "National"
  );
  const statePolicies = policies.filter(
    (policy) => policy.policy_type === "State-Level"
  );

  const nationalMissionData = nationalPolicies[0] || {
    policy_name: "National Green Hydrogen Mission (NGHM)",
    total_outlay_covered: "₹17,490 crores",
    description: "Strategic Interventions for Green Hydrogen Transition",
    features: [
      "Strategic Interventions for Green Hydrogen Transition (SIGHT) programme",
      "Blockchain-based milestone verification",
      "Automated disbursement system",
      "Global hub development for production, usage and export",
    ],
  };

  const statesPolicies = [
    {
      state: "Gujarat",
      coverage: "Power-related incentives worth USD 38 billion",
      features: [
        "Capital subsidy protection",
        "Electricity duty exemption insurance",
        "SGST reimbursement coverage",
      ],
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      state: "Maharashtra",
      coverage:
        "Significant financial incentives for green hydrogen production",
      features: [
        "Infrastructure development subsidies",
        "Tax incentive protection",
        "Performance guarantee insurance",
      ],
      icon: <Building className="w-6 h-6" />,
    },
    {
      state: "Tamil Nadu",
      coverage: "Leading green hydrogen financial incentives",
      features: [
        "Port infrastructure development coverage",
        "Export facilitation insurance",
        "Renewable energy integration protection",
      ],
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      state: "Odisha",
      coverage: "Financial incentives for green hydrogen production",
      features: [
        "Mining industry integration coverage",
        "Industrial cluster development insurance",
      ],
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  const insuranceCompanies = [
    {
      name: "IFFCO Tokio General Insurance",
      rating: "96.44%",
      rank: "#1 among Indian general insurance companies",
      services: [
        "Renewable energy project insurance",
        "Technology performance coverage",
        "Digital platform integration",
        "Automated claim processing",
      ],
    },
    {
      name: "ICICI Lombard General Insurance",
      rating: "Top-rated",
      rank: "Among India's best general insurance companies",
      services: [
        "Project finance insurance",
        "Technology risk coverage",
        "Subsidy protection insurance",
        "Comprehensive policy range",
      ],
    },
    {
      name: "New India Assurance Company",
      rating: "92.23%",
      rank: "Government-backed specialist",
      services: [
        "Government-backed projects",
        "Large-scale infrastructure insurance",
        "Export credit guarantee",
      ],
    },
  ];

  const subsidyComponents = [
    {
      title: "Capital Subsidy Protection Insurance",
      description:
        "Protection for capital subsidies, interest subvention, and SGST reimbursement",
      features: [
        "Automated milestone verification",
        "Blockchain-based fund release",
      ],
    },
    {
      title: "SIGHT Programme Insurance",
      description:
        "Protection for incentives under Strategic Interventions for Green Hydrogen Transition",
      features: [
        "Electrolyzer manufacturing incentives",
        "Fuel cell production subsidies",
        "Green hydrogen production incentives",
      ],
    },
    {
      title: "Export Incentive Insurance",
      description: "Protection for export-related subsidies and incentives",
      features: [
        "Currency fluctuation protection",
        "International compliance guarantee",
        "Shipping and logistics coverage",
      ],
    },
  ];

  const premiumStructure: PremiumStructure[] = [
    {
      type: "Manufacturing Projects",
      range: "2.5% - 4.0%",
      basis: "of project value",
    },
    {
      type: "Production Projects",
      range: "1.8% - 3.2%",
      basis: "of annual production value",
    },
    {
      type: "Infrastructure Projects",
      range: "3.0% - 5.5%",
      basis: "of infrastructure investment",
    },
    { type: "Export Projects", range: "2.0% - 3.5%", basis: "of export value" },
  ];

  const handleApplicationStart = () => {
    try {
      router.push("/insurance-manager");
    } catch (error) {
      console.error("Error navigating to application:", error);
    }
  };

  const handleWhitepaperDownload = async () => {
    try {
      const response = await fetch("/api/download-whitepaper");
      if (response.ok) {
        window.open("/TrustChain-Whitepaper.pdf", "_blank");
      } else {
        console.error("Failed to download whitepaper");
      }
    } catch (error) {
      console.error("Error downloading whitepaper:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Insurance Solutions
                </h1>
                <p className="text-sm text-green-600">
                  Comprehensive Green Hydrogen Subsidy Protection
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
              <Globe className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                India Market
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Secure Your Green Hydrogen Investments
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Comprehensive insurance coverage for green hydrogen subsidies and
            incentives across India, powered by blockchain technology for
            complete transparency and automated processing.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: "national", label: "National Mission" },
            { id: "states", label: "State Policies" },
            { id: "companies", label: "Insurance Companies" },
            { id: "components", label: "Coverage Components" },
            { id: "pricing", label: "Premium Structure" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-green-600 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === "national" && (
          <div className="space-y-6">
            {nationalPolicies.map((policy) => (
              <div
                key={policy.$id}
                className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
              >
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">
                    {policy.policy_name}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-green-800 mb-2">
                      Total Programme Outlay
                    </h4>
                    <p className="text-3xl font-bold text-green-600">
                      {policy.total_outlay_covered}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Under SIGHT Programme
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">
                      Policy Description
                    </h4>
                    <p className="text-lg text-blue-600">
                      {policy.description}
                    </p>
                  </div>
                </div>

                {policy.eligibility_summary && (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Eligibility Criteria
                    </h4>
                    <p className="text-gray-700">
                      {policy.eligibility_summary}
                    </p>
                  </div>
                )}

                {policy.terms_url && (
                  <div className="mt-4">
                    <a
                      href={policy.terms_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                    >
                      <span>View Full Policy Details</span>
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "states" && (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              State-Level Green Hydrogen Policies
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {statePolicies.map((policy) => (
                <div
                  key={policy.$id}
                  className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {policy.target_region || "All Regions"}
                    </h4>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <p className="text-green-800 font-medium">
                      {policy.total_outlay_covered}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Description:
                      </h5>
                      <p className="text-gray-700 text-sm">
                        {policy.description}
                      </p>
                    </div>

                    {policy.eligibility_summary && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          Eligibility Criteria:
                        </h5>
                        <p className="text-gray-700 text-sm">
                          {policy.eligibility_summary}
                        </p>
                      </div>
                    )}

                    {policy.terms_url && (
                      <a
                        href={policy.terms_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        View Full Policy Details
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "companies" && (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Leading Insurance Providers
            </h3>
            <div className="space-y-6">
              {insuranceCompanies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {company.name}
                      </h4>
                      <div className="flex items-center space-x-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {company.rating} Settlement Ratio
                        </span>
                        <span className="text-gray-600">{company.rank}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Shield className="w-12 h-12 text-green-600" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {company.services.map((service, sIndex) => (
                      <div key={sIndex} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {service}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "components" && (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Subsidy Insurance Components
            </h3>
            <div className="grid lg:grid-cols-3 gap-6">
              {subsidyComponents.map((component, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 hover:shadow-2xl transition-shadow"
                >
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {component.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{component.description}</p>

                  <div className="space-y-2">
                    {component.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Technology Integration */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mt-12">
              <h4 className="text-2xl font-bold mb-6">
                Technology Integration Features
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-semibold mb-3">
                    Digital India Integration
                  </h5>
                  <ul className="space-y-2 text-green-100">
                    <li>• National Single Window System (NSWS) integration</li>
                    <li>• Automated compliance verification</li>
                    <li>• MNRE systems integration</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-3">
                    Blockchain-Enabled Features
                  </h5>
                  <ul className="space-y-2 text-green-100">
                    <li>• Real-time tracking of subsidy disbursement</li>
                    <li>• Immutable transaction records</li>
                    <li>• Multi-language support</li>
                    <li>• Fraud prevention mechanisms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Premium Structure
            </h3>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
              <div className="bg-green-600 text-white p-6">
                <h4 className="text-xl font-bold">
                  Indian Market Premium Rates
                </h4>
                <p className="text-green-100">
                  Competitive pricing for comprehensive coverage
                </p>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {premiumStructure.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            {item.type}
                          </h5>
                          <p className="text-sm text-gray-600">{item.basis}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          {item.range}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
              <h4 className="text-2xl font-bold mb-4">
                Ready to Secure Your Green Hydrogen Project?
              </h4>
              <p className="text-green-100 mb-6">
                Get started with TrustChain&apos;s blockchain-powered insurance
                solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/insurance-manager")}
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Your Application
                </button>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/download-whitepaper");
                      if (response.ok) {
                        window.open("/TrustChain-Whitepaper.pdf", "_blank");
                      } else {
                        console.error("Failed to download whitepaper");
                      }
                    } catch (error) {
                      console.error("Error downloading whitepaper:", error);
                    }
                  }}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Download Whitepaper
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-400">
                {nationalPolicies.length}
              </p>
              <p className="text-gray-300">National Policies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">
                {statePolicies.length}
              </p>
              <p className="text-gray-300">State Policies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">
                {policies.length}
              </p>
              <p className="text-gray-300">Total Policies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">100%</p>
              <p className="text-gray-300">Blockchain Transparency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
