"use client"
import { useState } from "react"
import { FaGlobe, FaLink } from "react-icons/fa"

const Header = () => {
  const [platformOpen, setPlatformOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [analyticsOpen, setAnalyticsOpen] = useState(false)

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <FaLink className="text-electric-green text-3xl" />
        <h1 className="text-3xl font-bold bg-green-gradient text-transparent bg-clip-text">TrustChain</h1>
        <p className="text-sm text-gray-400 mt-1 hidden lg:block">
          Transparent Subsidy Disbursement for Green Hydrogen
        </p>
      </div>
      <nav className="hidden md:flex items-center space-x-6 font-semibold">
        <a href="#home" className="hover:text-electric-green transition-colors">
          Home
        </a>

        {/* Platform Dropdown */}
        <div className="relative" onMouseLeave={() => setPlatformOpen(false)}>
          <button onMouseEnter={() => setPlatformOpen(true)} className="hover:text-electric-green transition-colors">
            Platform
          </button>
          {platformOpen && (
            <div className="absolute bg-gray-800 rounded-md mt-2 p-2 w-48 shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Smart Contracts
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Subsidy Management
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Blockchain Verification
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Transparency Dashboard
              </a>
            </div>
          )}
        </div>
        {/* Solutions Dropdown */}
        <div className="relative" onMouseLeave={() => setSolutionsOpen(false)}>
          <button onMouseEnter={() => setSolutionsOpen(true)} className="hover:text-electric-green transition-colors">
            Solutions
          </button>
          {solutionsOpen && (
            <div className="absolute bg-gray-800 rounded-md mt-2 p-2 w-48 shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                AI Recommendations
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                ROI Calculator
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Risk Scoring
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                NFT Certificates
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Insurance Marketplace
              </a>
            </div>
          )}
        </div>
        {/* Analytics Dropdown */}
        <div className="relative" onMouseLeave={() => setAnalyticsOpen(false)}>
          <button onMouseEnter={() => setAnalyticsOpen(true)} className="hover:text-electric-green transition-colors">
            Analytics
          </button>
          {analyticsOpen && (
            <div className="absolute bg-gray-800 rounded-md mt-2 p-2 w-48 shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Market Intelligence
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Regional Mapping
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Performance Metrics
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Audit Reports
              </a>
            </div>
          )}
        </div>

        <a href="#resources" className="hover:text-electric-green transition-colors">
          Resources
        </a>
        <a href="#support" className="hover:text-electric-green transition-colors">
          Support
        </a>
        <button className="flex items-center space-x-1 hover:text-electric-green transition-colors">
          <FaGlobe />
          <span>Language (50+)</span>
        </button>
      </nav>
      <div>
        {/* BACKEND_CONNECTIVITY: This button would navigate to a registration/signup page. */}
        <button className="bg-electric-green text-gray-900 font-bold py-2 px-6 rounded-md border-2 border-gold hover:bg-electric-green-dark transition-all">
          Join TrustChain
        </button>
      </div>
    </header>
  )
}

export default Header
