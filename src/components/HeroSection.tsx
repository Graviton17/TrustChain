"use client";
import { FaLink, FaBolt, FaShieldAlt, FaGlobe } from "react-icons/fa";
import { motion, easeOut } from "framer-motion";
import { useRouter } from "next/navigation";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { ease: easeOut, duration: 0.35 } },
};

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="bg-gray-900 text-white text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto">
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance"
        >
          Revolutionary Blockchain-Powered Green Hydrogen Subsidies
        </motion.h1>
        <motion.p
          variants={item}
          className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto text-gray-300 mb-6 sm:mb-8"
        >
          TrustChain eliminates fraud, accelerates disbursements, and ensures
          complete transparency in green hydrogen subsidy management through
          cutting-edge blockchain technology
        </motion.p>

        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg"
        >
          <div className="flex items-center justify-center gap-2 p-2 sm:p-0">
            <FaLink className="text-electric-green flex-shrink-0" aria-hidden="true" />
            <span className="text-center sm:text-left">100% Blockchain Transparency</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 sm:p-0">
            <FaBolt className="text-electric-green flex-shrink-0" aria-hidden="true" />
            <span className="text-center sm:text-left">10x Faster Disbursements</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 sm:p-0">
            <FaShieldAlt className="text-electric-green flex-shrink-0" aria-hidden="true" />
            <span className="text-center sm:text-left">Zero Fraud Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 sm:p-0">
            <FaGlobe className="text-electric-green flex-shrink-0" aria-hidden="true" />
            <span className="text-center sm:text-left">Global Multi-Language Platform</span>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
        >
          <button
            type="button"
            className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg"
            onClick={() => {
              console.log("Plain button clicked!");
              router.push('/company-application');
            }}
          >
            Start Your Application
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-transparent border-2 border-electric-green text-electric-green font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg hover:bg-electric-green hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            aria-label="Watch demo"
          >
            Watch Demo
          </motion.button>

          <a
            href="/TrustChain-Whitepaper.pdf"
            download="TrustChain-Whitepaper.pdf"
            className="w-full sm:w-auto bg-yellow-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-200 text-center text-base sm:text-lg"
          >
            <span className="hidden sm:inline">Download Whitepaper</span>
            <span className="sm:hidden">Whitepaper</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
