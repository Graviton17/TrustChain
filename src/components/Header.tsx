"use client"
import { motion } from "framer-motion"
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'
import { useChatbot } from "@/app/contexts/ChatbotContext"
import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const Header = () => {
   const { toggleChat } = useChatbot();
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const toggleMobileMenu = () => {
     setIsMobileMenuOpen(!isMobileMenuOpen);
   };

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/icon.png"
                alt="TrustChain Logo"
                fill
                sizes="32px"
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-semibold leading-none tracking-tight text-foreground">TrustChain</h1>
              <p className="hidden lg:block text-xs text-muted-foreground">
                Transparent Subsidy Disbursement for Green Hydrogen
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Primary" className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
            <Link
              href="/"
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Home
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>

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

            <button
              onClick={toggleChat} // Add onClick handler
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Chatbot
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </button>

            <Link
              href="/faq"
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Q&A
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>

            <Link
              href="/insurance"
              className="relative group text-foreground/90 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Insurance
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>

            {/* Multi-language support */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 transition-transform hover:-translate-y-0.5">
                  <FaGlobe aria-hidden className="mr-2" />
                  <span className="hidden lg:inline">Language</span>
                  <span className="lg:hidden">Lang</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>Choose language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Gujarati - ગુજરાતી</DropdownMenuItem>
                <DropdownMenuItem> Hindi - हिन्दी</DropdownMenuItem>
                <DropdownMenuItem>Tamil - தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Button asChild variant="ghost" className="transition-transform hover:-translate-y-0.5 text-sm lg:text-base">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white transition-transform hover:-translate-y-0.5 text-sm lg:text-base px-4 lg:px-6">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border mt-4 py-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground/90 hover:text-emerald-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <button
                onClick={() => {
                  toggleChat();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-foreground/90 hover:text-emerald-400 transition-colors py-2"
              >
                Chatbot
              </button>

              <Link
                href="/faq"
                className="text-foreground/90 hover:text-emerald-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Q&A
              </Link>

              <Link
                href="/insurance"
                className="text-foreground/90 hover:text-emerald-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Insurance
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <Button asChild variant="ghost" className="justify-start">
                  <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header
