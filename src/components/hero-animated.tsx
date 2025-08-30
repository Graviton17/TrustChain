"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
}

export default function HeroAnimated() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center space-y-6">
          <motion.h1 variants={item} className="text-balance text-3xl md:text-5xl font-semibold tracking-tight">
            Build trust with a beautifully animated experience
          </motion.h1>
          <motion.p variants={item} className="text-pretty text-muted-foreground max-w-2xl mx-auto">
            Subtle motion adds clarity and delight. No distractions, just a smoother path to value.
          </motion.p>
          <motion.div variants={item} className="flex items-center justify-center gap-3">
            <motion.div whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button>Get started</Button>
            </motion.div>
            <motion.div whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button variant="ghost">Learn more</Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
