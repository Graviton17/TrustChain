"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = { label: string; href?: string }

const nav: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
]

export default function AnimatedHeader() {
  const { scrollY } = useScroll()
  const controls = useAnimation()
  const [hidden, setHidden] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    if (latest > prev && latest > 80) setHidden(true)
    else setHidden(false)
  })

  React.useEffect(() => {
    controls.start(hidden ? { y: -72 } : { y: 0 })
  }, [hidden, controls])

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="sticky top-0 z-50 w-full"
      aria-label="Primary"
    >
      {/* Background blur + shadow on scroll */}
      <motion.div
        className="backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
        initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
        whileInView={{}}
        style={{}}
      >
        <motion.div
          className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between"
          animate={hidden ? { boxShadow: "0 8px 24px rgba(0,0,0,0.06)" } : { boxShadow: "0 0 0 rgba(0,0,0,0)" }}
          transition={{ duration: 0.2 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
            <span className="h-6 w-6 rounded-md bg-primary/90" />
            <span className="font-semibold tracking-tight">YourBrand</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {nav.map((item) => (
              <NavLink key={item.label} href={item.href!}>
                {item.label}
              </NavLink>
            ))}

            {/* shadcn DropdownMenu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="group relative">
                  More
                  <Underline />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>Explore</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="#careers">Careers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#changelog">Changelog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#community">Community</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" className="group">
              Sign in
              <Underline />
            </Button>
            <MotionButton />
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {nav.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="#signin">Sign in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#get-started">Get started</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md group",
      )}
    >
      {children}
      <Underline />
    </Link>
  )
}

// Aceternity-style underlines (gliding underline using transforms; no gradients)
function Underline() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-3 right-3 -bottom-[2px] h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  )
}

// CTA with subtle sheen-like motion using transforms and opacity (no gradients)
function MotionButton() {
  return (
    <motion.div
      initial={false}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Button className="relative overflow-hidden">
        Get started
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100" />
      </Button>
    </motion.div>
  )
}
