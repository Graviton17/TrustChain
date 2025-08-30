"use client"

import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 text-muted-foreground">
        {/* Call to Action */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl text-foreground mb-4 text-balance">
            Ready to revolutionize your subsidy program?
          </h3>
          <motion.button
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-amber-400 px-6 py-3 text-base font-semibold text-gray-900 hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Speak with Specialist
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-5">
          {/* Column 1: TrustChain */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">TrustChain</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  About TrustChain
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Our Vision
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Leadership Team
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Investor Relations
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Press & Media
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Blockchain Technology
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Smart Contracts
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  AI Solutions
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Security Features
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  API Documentation
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Government Services
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Enterprise Solutions
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Startup Programs
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Integration Services
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Custom Development
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Knowledge Base
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Video Library
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Webinar Series
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Research Reports
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Developer Tools
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  24/7 Help Center
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Live Chat Support
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Regional Offices
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Partner Network
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Community Forum
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center text-xs sm:flex-row">
          <p>© 2025 TrustChain. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>ISO 27001</span>
            <span>SOC 2</span>
            <span>GDPR</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
