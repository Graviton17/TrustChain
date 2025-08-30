"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaLink, FaBolt, FaShieldAlt, FaGlobe } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Blockchain-first
            <span className="h-1 w-1 rounded-full bg-emerald-400" aria-hidden />
            Green Hydrogen Subsidies
          </div>

          <motion.h1
            className="text-balance text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            Revolutionary Blockchain-Powered Green Hydrogen Subsidies
          </motion.h1>

          <motion.p
            className="mx-auto max-w-3xl text-pretty text-lg md:text-xl text-muted-foreground mb-10"
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            TrustChain eliminates fraud, accelerates disbursements, and ensures
            complete transparency in green hydrogen subsidy management through
            cutting-edge blockchain technology.
          </motion.p>

          <motion.ul
            className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 text-sm md:text-base"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {[
              { Icon: FaLink, text: "100% Blockchain Transparency" },
              { Icon: FaBolt, text: "10x Faster Disbursements" },
              { Icon: FaShieldAlt, text: "Zero Fraud Guarantee" },
              { Icon: FaGlobe, text: "Global Multi-Language Platform" },
            ].map(({ Icon, text }, i) => (
              <motion.li
                key={text}
                className="flex items-center justify-center gap-2"
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: i * 0.02,
                }}
              >
                <Icon className="text-emerald-400" aria-hidden />
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* BACKEND_CONNECTIVITY: would submit application form */}
            <motion.div
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-gray-900 text-lg px-6 py-6">
                Start Your Application
              </Button>
            </motion.div>

            {/* DYNAMIC_CONTENT: would open a modal video */}
            <motion.div
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-gray-900 text-lg px-6 py-6 bg-transparent"
              >
                Watch Demo
              </Button>
            </motion.div>

           {/* STATIC_ASSET: PDF download  */}
             <motion.div
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-lg px-6 py-6"
              >
                <a
                  href="/TrustChain-Whitepaper.pdf"
                  download="TrustChain-Whitepaper.pdf"
                  className="bg-yellow-500 px-6 py-2 rounded-lg text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-200"
                >
                  Download Whitepaper
                </a>
              </Button>
            </motion.div>
            {/* <motion.div
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={async () => {
                  try {
                    const res = await fetch("/api/download-whitepaper");
                    if (!res.ok) throw new Error("Failed to fetch PDF");

                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "TrustChain-Whitepaper.pdf"; // ✅ file name
                    a.click();

                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error("Error downloading PDF:", error);
                  }
                }}
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-lg px-6 py-6"
              >
                Download Whitepaper
              </Button>
            </motion.div> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
