import { Routes, Route, Navigate } from 'react-router-dom'
import { AssessmentProvider } from '@context/AssessmentContext'
import LandingPage from '@pages/LandingPage'
import AssessmentPage from '@features/assessment/AssessmentPage'
import ResultsPage from '@features/assessment/ResultsPage'
import DashboardPage from '@features/dashboard/DashboardPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AssessmentProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AssessmentProvider>
    </div>
  )
}

export default App
