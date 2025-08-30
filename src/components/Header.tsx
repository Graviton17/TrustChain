"use client"
import { motion } from "framer-motion"
import { FaGlobe, FaLink } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <FaLink className="text-emerald-400 text-2xl" aria-hidden />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold leading-none tracking-tight text-foreground">TrustChain</h1>
              <p className="hidden lg:block text-xs text-muted-foreground">
                Transparent Subsidy Disbursement for Green Hydrogen
              </p>
            </div>
          </div>

          <nav role="navigation" aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="#home"
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Home
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>

            {/* Solutions (group all core features) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative group px-1 py-0.5 text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded data-[state=open]:text-emerald-400"
                >
                  Solutions
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1 right-1 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-72">
                <DropdownMenuItem asChild>
                  <a href="#subsidy-ai">AI Subsidy Recommendation</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#market-intel">Real-time Market Intelligence</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#roa-calculator">ROA Calculator (Profitability)</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#risk-scoring">Risk Scoring for Producer</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#nft-certificates">Green H2 Certificates (NFTs)</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#region-map">Region-wise Live Map</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#consumer-benefits">Subsidy Benefits for Consumers</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="#chatbot"
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Chatbot
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>

            <a
              href="#qna"
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Q&A
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>

            <a
              href="#insurance"
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Insurance
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>

            {/* Multi-language support */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 transition-transform hover:-translate-y-0.5">
                  <FaGlobe aria-hidden className="mr-2" />
                  Language
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>Choose language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
                <DropdownMenuItem>हिन्दी</DropdownMenuItem>
                <DropdownMenuItem>日本語</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-gray-900 transition-transform hover:-translate-y-0.5">
              Join TrustChain
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
