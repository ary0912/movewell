"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Activity, BarChart3, FlaskConical } from "lucide-react"
import ThemeToggle from "@components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Assessment", path: "/assessment", icon: Activity },
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "Method", path: "/demo", icon: FlaskConical },
]

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <>
      {/* =========================
          TOP NAVBAR (GLASS + PREMIUM)
      ========================= */}
      <div className="sticky top-0 z-[100] w-full flex justify-center px-4 pt-6">
        <div className="w-full max-w-5xl">

          <motion.header
            role="banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center justify-between px-6 py-3 rounded-full",
              "bg-background/70 backdrop-blur-xl",
              "border border-border",
                 "shadow-[0_6px_18px_rgba(2,6,23,0.06)]"
            )}
          >

            {/* LOGO */}
            <div
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/')}
            >
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-sm">
                   MW
              </div>

              <span className="font-semibold text-sm tracking-tight hidden sm:block text-foreground">
                MoveWell
              </span>
            </div>

            {/* DESKTOP NAV */}
            <nav aria-label="Main" className="hidden md:flex items-center gap-2 relative">

              {/* Active pill background */}
              <motion.div
                layout
                className="absolute h-10 rounded-full bg-muted"
                style={{
                  width: 90,
                }}
                animate={{
                  x: navItems.findIndex(i => i.path === location.pathname) * 90,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      "relative z-10 flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon size={16} aria-hidden />
                    <span className="hidden md:inline">{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* THEME TOGGLE */}
              <ThemeToggle />

              {/* CTA */}
              <button
                onClick={() => handleNavigate("/assessment")}
                className="hidden md:flex items-center justify-center px-5 h-10 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Start
              </button>

              {/* MOBILE MENU */}
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu className="w-5 h-5" />
              </button>

            </div>
          </motion.header>
        </div>
      </div>

      {/* =========================
          MOBILE NAV (BOTTOM STYLE)
      ========================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >

            {/* CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>

            {/* NAV ITEMS */}
            <div className="flex flex-col justify-center items-center h-full gap-10">

              {navItems.map((item, i) => {
                const Icon = item.icon

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 text-3xl font-semibold"
                    aria-label={item.name}
                  >
                    <Icon size={28} aria-hidden />
                    <span>{item.name}</span>
                  </motion.button>
                )
              })}

              <motion.button
                onClick={() => handleNavigate("/assessment")}
                className="mt-10 px-10 py-4 bg-primary text-primary-foreground rounded-2xl text-lg font-semibold shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Start Assessment
              </motion.button>

              <div className="pt-6">
                <ThemeToggle />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          MOBILE BOTTOM NAV (MODERN)
      ========================= */}
      <div className="md:hidden fixed bottom-4 inset-x-0 flex justify-center z-[90]">

        <div className="flex items-center bg-card border border-border rounded-full shadow-xl px-2 py-2 gap-1">

          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon

            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-full text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon size={18} aria-hidden />
                {isActive && <span className="sr-only">{item.name} (current)</span>}
              </button>
            )
          })}

        </div>
      </div>
    </>
  )
}

export { Navbar1 }