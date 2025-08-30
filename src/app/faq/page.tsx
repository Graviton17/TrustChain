"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Zap,
  Shield,
  Globe,
  Calculator,
  Award,
  Users,
  MessageCircle,
  Building,
} from "lucide-react"

export default function QnAPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "system", name: "AI System", icon: Zap },
    { id: "subsidies", name: "Subsidies", icon: Award },
    { id: "technical", name: "Technical", icon: Shield },
    { id: "integration", name: "Integration", icon: Building },
  ]

  const faqs = [
    {
      id: 1,
      category: "system",
      question: "How does the AI-powered subsidy recommendation system work?",
      answer:
        "Our AI system analyzes multiple data points including project type, location, production capacity, and market conditions to provide personalized subsidy recommendations. It uses machine learning algorithms to match your green hydrogen project with the most suitable government incentives and subsidies available in real-time.",
    },
    {
      id: 2,
      category: "system",
      question: "What is real-time market intelligence and how does it benefit me?",
      answer:
        "Real-time market intelligence provides up-to-the-minute data on hydrogen prices, demand trends, regulatory changes, and competitor activities. This helps you make informed decisions about project timing, pricing strategies, and market entry points to maximize profitability.",
    },
    {
      id: 3,
      category: "technical",
      question: "How accurate is the ROA calculator for project profitability analysis?",
      answer:
        "Our ROA (Return on Assets) calculator uses comprehensive financial modeling that includes capital costs, operational expenses, revenue projections, and subsidy benefits. It provides accuracy within 5-10% variance by incorporating real market data and industry benchmarks updated daily.",
    },
    {
      id: 4,
      category: "technical",
      question: "What factors are considered in the risk scoring for producers?",
      answer:
        "The risk scoring algorithm evaluates financial stability, technical capability, regulatory compliance history, market position, supply chain reliability, and environmental factors. Scores range from 1-100, with higher scores indicating lower risk and better eligibility for subsidies.",
    },
    {
      id: 5,
      category: "subsidies",
      question: "What are green hydrogen certificates and how do NFTs work?",
      answer:
        "Green hydrogen certificates are digital proof of clean hydrogen production. Our NFT-based system creates immutable, tradeable certificates that verify the environmental credentials of your hydrogen. Each NFT contains production data, carbon footprint, and certification details stored on blockchain.",
    },
    {
      id: 6,
      category: "system",
      question: "How does the green hydrogen region-wise mapping work?",
      answer:
        "Our interactive map displays real-time data on production facilities, demand centers, infrastructure, and regulatory environments across different regions. It helps identify optimal locations for new projects and potential partnerships or supply chain opportunities.",
    },
    {
      id: 7,
      category: "subsidies",
      question: "How are subsidy benefits calculated for consumers?",
      answer:
        "Consumer subsidy benefits are calculated based on usage patterns, location, hydrogen source verification, and current government incentive programs. The system automatically applies available rebates, tax credits, and direct subsidies to provide the maximum possible savings.",
    },
    {
      id: 8,
      category: "system",
      question: "What can the AI chatbot help me with?",
      answer:
        "Our AI chatbot provides 24/7 support for navigating subsidy applications, understanding eligibility criteria, tracking application status, technical troubleshooting, and answering questions about green hydrogen regulations and market trends.",
    },
    {
      id: 9,
      category: "technical",
      question: "Which languages are supported by the platform?",
      answer:
        "The platform supports 12 major languages including English, Spanish, French, German, Mandarin, Japanese, Hindi, Portuguese, Arabic, Russian, Korean, and Italian. Language selection automatically adapts regional subsidy information and regulatory requirements.",
    },
    {
      id: 10,
      category: "integration",
      question: "How does insurance marketplace integration work?",
      answer:
        "Our platform connects directly with leading insurance providers to offer customized coverage for green hydrogen projects. It compares policies, provides instant quotes, and facilitates applications for equipment, liability, and business interruption insurance specific to hydrogen operations.",
    },
    {
      id: 11,
      category: "technical",
      question: "What smart contract technologies are used for subsidy disbursement?",
      answer:
        "We use Solidity smart contracts on Ethereum and Hyperledger for automated subsidy distribution. Contracts verify milestone achievements using real-time data from trusted sources and trigger payments when conditions are met, ensuring transparent and fraud-resistant disbursements.",
    },
    {
      id: 12,
      category: "system",
      question: "How secure is the payment and data handling system?",
      answer:
        "Our platform employs bank-grade security with 256-bit SSL encryption, multi-factor authentication, and secure API design. All payment processing is PCI DSS compliant, and user data is protected with GDPR compliance and regular security audits.",
    },
    {
      id: 13,
      category: "subsidies",
      question: "What types of government subsidies are available through the platform?",
      answer:
        "The platform tracks federal, state, and local incentives including production tax credits, investment tax credits, grants, loan guarantees, accelerated depreciation, and direct cash subsidies. Coverage includes programs from over 40 countries with real-time updates on policy changes.",
    },
    {
      id: 14,
      category: "integration",
      question: "Can the system integrate with existing ERP or financial systems?",
      answer:
        "Yes, our platform offers REST APIs and webhooks for seamless integration with popular ERP systems like SAP, Oracle, and Microsoft Dynamics. We also provide custom integration services for proprietary systems used by large enterprises.",
    },
    {
      id: 15,
      category: "technical",
      question: "How often is the market data and subsidy information updated?",
      answer:
        "Market intelligence data is updated in real-time through partnerships with commodity exchanges and market data providers. Subsidy information is updated within 24 hours of official announcements, with automated monitoring of government websites and regulatory bodies worldwide.",
    },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })


  const toggleFAQ = (id: number): void => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-1 text-sm font-medium text-green-700">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            FAQs
          </span>
          <h1 className="text-pretty mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="mx-auto mt-3 max-w-3xl text-balance text-base sm:text-lg text-gray-600 px-4">
            Get answers about our AI-powered green hydrogen subsidy platform, smart contracts, and comprehensive support
            systems.
          </p>
        </div>
      </header>

      {/* Search and Filter Section */}
      <main className="relative z-10 -mt-4 sm:-mt-6">
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 shadow-sm">
            {/* Search Bar */}
            <div className="relative mb-6 sm:mb-8">
              <label htmlFor="faq-search" className="sr-only">
                Search FAQs
              </label>
              <Search
                className="pointer-events-none absolute left-3 sm:left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="faq-search"
                type="text"
                placeholder="Search for answers..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 sm:py-4 pl-10 sm:pl-12 pr-4 text-base sm:text-lg text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon
                const isActive = selectedCategory === category.id
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={
                      isActive
                        ? "flex items-center gap-2 rounded-xl border border-green-500 bg-white px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium text-green-700 shadow-sm ring-2 ring-green-100"
                        : "flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:border-green-300 hover:text-green-700"
                    }
                  >
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>

            {/* Results Count */}
            <div className="mb-4 sm:mb-6">
              <p className="text-base sm:text-lg text-gray-600">
                Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
              </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-3 sm:space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="py-8 sm:py-12 text-center">
                  <HelpCircle className="mx-auto mb-4 h-12 sm:h-16 w-12 sm:w-16 text-gray-300" aria-hidden="true" />
                  <h3 className="mb-2 text-lg sm:text-xl font-semibold text-gray-700">No questions found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or category filter</p>
                </div>
              ) : (
                filteredFAQs.map((faq) => {
                  const isOpen = openFAQ === faq.id
                  const panelId = `faq-panel-${faq.id}`
                  const buttonId = `faq-button-${faq.id}`
                  return (
                    <div key={faq.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white transition">
                      <button
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleFAQ(faq.id)}
                        className="flex w-full items-start sm:items-center justify-between bg-white p-4 sm:p-6 text-left transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-100"
                      >
                        <h3 className="pr-4 text-base sm:text-lg font-semibold text-gray-900 leading-6">{faq.question}</h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 flex-shrink-0 text-green-600 mt-1 sm:mt-0" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 mt-1 sm:mt-0" aria-hidden="true" />
                        )}
                      </button>

                      {isOpen && (
                        <div id={panelId} role="region" aria-labelledby={buttonId} className="bg-green-50">
                          <div className="border-t border-green-100 px-4 sm:px-6 pb-4 sm:pb-6 pt-4">
                            <p className="text-sm sm:text-base leading-relaxed text-gray-700">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="rounded-2xl border border-green-200 bg-white p-6 sm:p-8 lg:p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 sm:mb-6 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-50 p-2 ring-1 ring-green-100">
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-700" aria-hidden="true" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Still have questions?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-gray-600 px-4">
              Our AI chatbot and support team are available 24/7 to help with your green hydrogen subsidy questions.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-200"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                Chat with AI Assistant
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-green-700 transition hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-100"
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                Contact Support Team
              </button>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-10 text-center">
              <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-900">Platform Features</h2>
              <p className="text-base sm:text-lg text-gray-600">Comprehensive tools for green hydrogen subsidy management</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Zap, title: "AI Recommendations", desc: "Smart subsidy matching" },
                { icon: Calculator, title: "ROA Calculator", desc: "Project profitability analysis" },
                { icon: Shield, title: "Smart Contracts", desc: "Automated disbursements" },
                { icon: Globe, title: "Global Coverage", desc: "Multi-language support" },
              ].map((f, idx) => {
                const Icon = f.icon
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 text-center transition hover:border-green-300 hover:shadow-sm"
                  >
                    <div className="mx-auto mb-3 sm:mb-4 h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-green-50 p-2.5 sm:p-3 ring-1 ring-green-100">
                      <Icon className="mx-auto h-7 w-7 sm:h-8 sm:w-8 text-green-700" aria-hidden="true" />
                    </div>
                    <h3 className="mb-1 text-sm sm:text-base font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
