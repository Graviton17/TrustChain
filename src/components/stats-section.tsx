"use client"
import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import CountUp from "react-countup"

const stats = [
  { end: 2.5, suffix: "B+", label: "Total Subsidies Secured", decimals: 1 },
  { end: 99.98, suffix: "%", label: "Fraud Elimination Rate", decimals: 2 },
  { end: 10, suffix: "x", label: "Faster Processing Speed", decimals: 0 },
  { end: 150, suffix: "+", label: "Global Enterprise Partners", decimals: 0 },
]

const StatsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section ref={ref} className="bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-foreground">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="p-4 sm:p-6"
            >
              <p className="mb-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-emerald-400">
                {isInView ? (
                  <CountUp end={stat.end} decimals={stat.decimals} duration={1.6} suffix={stat.suffix} />
                ) : (
                  <>
                    {stat.end}
                    {stat.suffix}
                  </>
                )}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
