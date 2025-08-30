import { FaLink, FaBolt, FaShieldAlt, FaGlobe } from "react-icons/fa"

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white text-center py-20 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
        Revolutionary Blockchain-Powered Green Hydrogen Subsidies
      </h1>
      <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 mb-8">
        TrustChain eliminates fraud, accelerates disbursements, and ensures complete transparency in green hydrogen
        subsidy management through cutting-edge blockchain technology
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10 text-lg">
        <div className="flex items-center justify-center space-x-2">
          <FaLink className="text-electric-green" />
          <span>100% Blockchain Transparency</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <FaBolt className="text-electric-green" />
          <span>10x Faster Disbursements</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <FaShieldAlt className="text-electric-green" />
          <span>Zero Fraud Guarantee</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <FaGlobe className="text-electric-green" />
          <span>Global Multi-Language Platform</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* BACKEND_CONNECTIVITY: This button would lead to a multi-step application form. API calls would be made to submit form data. */}
        <button className="bg-green-gradient text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity">
          Start Your Application
        </button>
        {/* DYNAMIC_CONTENT: This could open a modal with an embedded video player (e.g., YouTube, Vimeo). */}
        <button className="bg-transparent border-2 border-electric-green text-electric-green font-bold py-3 px-8 rounded-lg text-lg hover:bg-electric-green hover:text-gray-900 transition-colors">
          Watch Demo
        </button>
        {/* STATIC_ASSET: This button links to a PDF file. */}
        <a
          href="/whitepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gold-dark transition-colors"
        >
          Download Whitepaper
        </a>
      </div>
    </section>
  )
}

export default HeroSection
