"use client"

import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import CountUp from "react-countup"

const stats = [
  { end: 2.5, decimals: 1, suffix: "B+", label: "Total Subsidies Secured", color: "text-electric-green" },
  { end: 99.98, decimals: 2, suffix: "%", label: "Fraud Elimination Rate", color: "text-electric-green" },
  { end: 10, decimals: 0, suffix: "x", label: "Faster Processing Speed", color: "text-electric-green" },
  { end: 150, decimals: 0, suffix: "+", label: "Global Enterprise Partners", color: "text-electric-green" },
]

const StatsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-deep-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-4 sm:p-6"
            >
              <p className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold ${stat.color} mb-1 sm:mb-2`}>
                {isInView ? <CountUp end={stat.end} decimals={stat.decimals} duration={1} suffix={stat.suffix} /> : "0"}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
