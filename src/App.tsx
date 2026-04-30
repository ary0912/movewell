import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AssessmentProvider } from '@context/AssessmentContext'
import LandingPage from '@pages/LandingPage'
import AssessmentPage from '@features/assessment/AssessmentPage'
import ResultsPage from '@features/assessment/ResultsPage'
import DashboardPage from '@features/dashboard/DashboardPage'
import DemoPage from '@pages/DemoPage'
import { Navbar1 } from '@components/ui/navbar-1'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative selection:bg-emerald-500/10 selection:text-emerald-700">
      <AssessmentProvider>
        <Navbar1 />
        
        {/* Main Content Area */}
        <main className="flex-1 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/assessment" element={<AssessmentPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </AssessmentProvider>
    </div>
  )
}

export default App
