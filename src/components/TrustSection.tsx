"use client"
import { motion } from "framer-motion"

const TrustSection = () => {
  return (
    <section className="py-20 bg-gray-900/50 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold text-white mb-4 text-balance"
      >
        Why <span className="text-electric-green">TrustChain</span> is Revolutionizing Subsidy Disbursement
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="max-w-3xl mx-auto text-lg text-gray-300"
      >
        Traditional subsidy systems are plagued by delays, corruption, and opacity. TrustChain&apos;s blockchain-first
        approach creates an immutable, transparent, and automated ecosystem where every transaction is verified, every
        milestone is tracked, and every stakeholder has complete visibility.
      </motion.p>
    </section>
  )
}

export default TrustSection
