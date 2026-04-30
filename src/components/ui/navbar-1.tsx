"use client" 

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Assessment", path: "/assessment" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Methodology", path: "/demo" },
  ]

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <div className="flex justify-center w-full py-6 px-4 sticky top-0 z-[100] bg-slate-50/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3 bg-white border border-slate-200 rounded-full shadow-lg shadow-slate-200/50 w-full max-w-4xl relative z-10">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => handleNavigate("/")}
        >
          <motion.div
            className="w-8 h-8 mr-4 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-600/20"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            MW
          </motion.div>
          <span className="font-bold text-sm tracking-tight text-slate-900 hidden sm:block">MoveWell</span>
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <button 
                  onClick={() => handleNavigate(item.path)}
                  className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  {item.name}
                </button>
              </motion.div>
            ))}
          </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={() => handleNavigate("/assessment")}
            className="inline-flex items-center justify-center px-6 py-2 text-[10px] uppercase tracking-widest font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
          >
            Start Assessment
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-slate-900" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-[101] pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-8 w-8" />
            </motion.button>
            
            <div className="flex flex-col space-y-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button 
                    className="text-4xl font-bold tracking-tighter text-slate-900" 
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-12"
              >
                <button
                  className="inline-flex items-center justify-center w-full px-8 py-5 text-xl font-bold text-white bg-emerald-600 rounded-3xl shadow-xl shadow-emerald-600/20"
                  onClick={() => handleNavigate("/assessment")}
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


export { Navbar1 }
