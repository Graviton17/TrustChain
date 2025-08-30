"use client"
import { FaLink, FaBolt, FaBrain, FaAward, FaGlobe, FaShieldAlt } from "react-icons/fa"
import { motion } from "framer-motion"

const features = [
  {
    icon: <FaLink />,
    title: "Immutable Transaction Records",
    description: "Every subsidy transaction recorded on blockchain with complete audit trail and public verification",
    color: "text-electric-green",
  },
  {
    icon: <FaBolt />,
    title: "Milestone-Based Auto-Release",
    description: "Intelligent contracts automatically release funds upon verified milestone completion",
    color: "text-gold",
  },
  {
    icon: <FaBrain />,
    title: "Predictive Risk Assessment",
    description: "Advanced machine learning algorithms assess project viability and fraud probability in real-time",
    color: "text-teal",
  },
  {
    icon: <FaAward />,
    title: "Tokenized Impact Verification",
    description: "Blockchain-native certificates proving authentic green hydrogen production and environmental impact",
    color: "text-electric-green",
  },
  {
    icon: <FaGlobe />,
    title: "Real-Time Market Insights",
    description: "Live regional mapping, price intelligence, and market dynamics across 50+ countries",
    color: "text-emerald",
  },
  {
    icon: <FaShieldAlt />,
    title: "Bank-Grade Protection",
    description: "Multi-layer security with insurance marketplace integration and comprehensive risk coverage",
    color: "text-gold",
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-balance"
        >
          The TrustChain Advantage
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className="bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-700 transition-colors hover:border-electric-green"
            >
              <div className={`text-3xl sm:text-4xl lg:text-5xl ${feature.color} mb-3 sm:mb-4 inline-block`} aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <button className="bg-transparent border-2 border-electric-green text-electric-green font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg hover:bg-electric-green hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
            Explore Platform
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
