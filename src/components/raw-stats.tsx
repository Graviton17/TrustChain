"use client"
import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

const stats = [
  { value: "2.5B+", label: "Total Subsidies Secured" },
  { value: "99.98%", label: "Fraud Elimination Rate" },
  { value: "10x", label: "Faster Processing Speed" },
  { value: "150+", label: "Global Enterprise Partners" },
]

const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section ref={ref} className="py-20 bg-deep-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* NOTE: For animated numbers, a library like react-countup could be used here */}
              <p className="text-5xl font-extrabold text-electric-green mb-2">{stat.value}</p>
              <p className="text-lg text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
