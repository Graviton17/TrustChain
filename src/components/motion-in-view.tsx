"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

export function MotionInView({
  children,
  delay = 0,
  y = 8,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ delay, type: "spring", stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
