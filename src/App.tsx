import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LandingPage from '@pages/LandingPage'
import AssessmentPage from '@features/assessment/AssessmentPage'
import ResultsPage from '@features/assessment/ResultsPage'
import DashboardPage from '@features/dashboard/DashboardPage'
import DemoPage from '@pages/DemoPage'
import ContentPage from '@pages/ContentPage'
import { Navbar1 } from '@components/ui/navbar-1'
import { AnimatePresence, motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar1 />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/content" element={<ContentPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Analytics />
    </div>
  )
}

export default App