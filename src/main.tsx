import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AssessmentProvider } from '@context/AssessmentContext'
import '@styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AssessmentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AssessmentProvider>
  </StrictMode>,
)
