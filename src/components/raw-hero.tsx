import { FaLink, FaBolt, FaShieldAlt, FaGlobe } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
          Revolutionary Blockchain-Powered Green Hydrogen Subsidies
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto text-gray-300 mb-6 sm:mb-8">
          TrustChain eliminates fraud, accelerates disbursements, and ensures
          complete transparency in green hydrogen subsidy management through
          cutting-edge blockchain technology
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg">
          <div className="flex items-center justify-center space-x-2 p-2 sm:p-0">
            <FaLink className="text-electric-green flex-shrink-0" />
            <span className="text-center sm:text-left">100% Blockchain Transparency</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-2 sm:p-0">
            <FaBolt className="text-electric-green flex-shrink-0" />
            <span className="text-center sm:text-left">10x Faster Disbursements</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-2 sm:p-0">
            <FaShieldAlt className="text-electric-green flex-shrink-0" />
            <span className="text-center sm:text-left">Zero Fraud Guarantee</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-2 sm:p-0">
            <FaGlobe className="text-electric-green flex-shrink-0" />
            <span className="text-center sm:text-left">Global Multi-Language Platform</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* BACKEND_CONNECTIVITY: This button would lead to a multi-step application form. API calls would be made to submit form data. */}
          <button className="w-full sm:w-auto bg-green-gradient text-gray-900 font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg hover:opacity-90 transition-opacity">
            Start Your Application
          </button>
          {/* DYNAMIC_CONTENT: This could open a modal with an embedded video player (e.g., YouTube, Vimeo). */}
          <button className="w-full sm:w-auto bg-transparent border-2 border-electric-green text-electric-green font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg hover:bg-electric-green hover:text-gray-900 transition-colors">
            Watch Demo
          </button>
          {/* STATIC_ASSET: This button links to a PDF file. */}
          <a
            href="/TrustChain-Whitepaper.pdf"
            download="TrustChain-Whitepaper.pdf"
            className="w-full sm:w-auto bg-yellow-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-200 text-center text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Download Whitepaper</span>
            <span className="sm:hidden">Whitepaper</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
