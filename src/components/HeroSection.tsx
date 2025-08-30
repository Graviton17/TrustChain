"use client";
import { FaLink, FaBolt, FaShieldAlt, FaGlobe } from "react-icons/fa";
import { motion, easeOut } from "framer-motion";

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
  return (
    <section className="bg-gray-900 text-white text-center py-20 px-4">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h1
          variants={item}
          className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-balance"
        >
          Revolutionary Blockchain-Powered Green Hydrogen Subsidies
        </motion.h1>
        <motion.p
          variants={item}
          className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 mb-8"
        >
          TrustChain eliminates fraud, accelerates disbursements, and ensures
          complete transparency in green hydrogen subsidy management through
          cutting-edge blockchain technology
        </motion.p>

        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10 text-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <FaLink className="text-electric-green" aria-hidden="true" />
            <span>100% Blockchain Transparency</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaBolt className="text-electric-green" aria-hidden="true" />
            <span>10x Faster Disbursements</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaShieldAlt className="text-electric-green" aria-hidden="true" />
            <span>Zero Fraud Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaGlobe className="text-electric-green" aria-hidden="true" />
            <span>Global Multi-Language Platform</span>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-green-gradient text-gray-900 font-bold py-3 px-8 rounded-lg text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            aria-label="Start your application"
          >
            <span className="relative z-10">Start Your Application</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 mix-blend-overlay"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, black 40%, black 60%, transparent)",
              }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-transparent border-2 border-electric-green text-electric-green font-bold py-3 px-8 rounded-lg text-lg hover:bg-electric-green hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            aria-label="Watch demo"
          >
            Watch Demo
          </motion.button>

          <a
            href="/TrustChain-Whitepaper.pdf"
            download="TrustChain-Whitepaper.pdf"
            className="bg-yellow-500 px-6 py-2 rounded-lg text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-200"
          >
            Download Whitepaper
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
