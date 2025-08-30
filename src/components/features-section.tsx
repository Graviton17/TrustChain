"use client"

import { FaLink, FaBolt, FaBrain, FaAward, FaGlobe, FaShieldAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: <FaLink aria-hidden />,
    title: "Immutable Transaction Records",
    description: "Every subsidy transaction recorded on blockchain with complete audit trail and public verification",
    color: "text-emerald-400",
  },
  {
    icon: <FaBolt aria-hidden />,
    title: "Milestone-Based Auto-Release",
    description: "Intelligent contracts automatically release funds upon verified milestone completion",
    color: "text-amber-400",
  },
  {
    icon: <FaBrain aria-hidden />,
    title: "Predictive Risk Assessment",
    description: "Advanced machine learning algorithms assess project viability and fraud probability in real-time",
    color: "text-emerald-400",
  },
  {
    icon: <FaAward aria-hidden />,
    title: "Tokenized Impact Verification",
    description: "Blockchain-native certificates proving authentic green hydrogen production and environmental impact",
    color: "text-emerald-400",
  },
  {
    icon: <FaGlobe aria-hidden />,
    title: "Real-Time Market Insights",
    description: "Live regional mapping, price intelligence, and market dynamics across 50+ countries",
    color: "text-amber-400",
  },
  {
    icon: <FaShieldAlt aria-hidden />,
    title: "Bank-Grade Protection",
    description: "Multi-layer security with insurance marketplace integration and comprehensive risk coverage",
    color: "text-emerald-400",
  },
]

const FeaturesSection = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">The TrustChain Advantage</h2>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 px-4">
          A secure, transparent and automated platform to deploy and manage green hydrogen subsidies at scale.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              className="group rounded-lg border border-border bg-card p-4 sm:p-6 text-left shadow-sm will-change-transform"
              whileHover={{ y: -4 }}
            >
              <div className={`mb-3 inline-flex rounded-md bg-muted p-2 sm:p-3 ${feature.color}`}>
                <span className="text-xl sm:text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12">
          <Button
            variant="outline"
            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-gray-900 text-base sm:text-lg px-4 sm:px-6 py-4 sm:py-6 bg-transparent"
          >
            Explore Platform
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
