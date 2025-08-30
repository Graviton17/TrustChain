"use client"

import { motion } from "framer-motion"

const TrustSection = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance px-4"
        >
          Why TrustChain is Revolutionizing Subsidy Disbursement
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.05 }}
          className="mx-auto max-w-3xl text-pretty text-sm sm:text-base lg:text-lg text-muted-foreground px-4"
        >
          Traditional subsidy systems are plagued by delays, corruption, and opacity. TrustChain&apos;s blockchain-first
          approach creates an immutable, transparent, and automated ecosystem where every transaction is verified, every
          milestone is tracked, and every stakeholder has complete visibility.
        </motion.p>
      </div>
    </section>
  )
}

export default TrustSection
