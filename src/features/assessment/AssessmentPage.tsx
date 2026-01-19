/**
 * Assessment Page - main container for multi-step assessment flow
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '@context/AssessmentContext'
import StepPainMap from './StepPainMap'
import StepPainIntensity from './StepPainIntensity'
import StepMobility from './StepMobility'
import StepImpact from './StepImpact'
import StepReview from './StepReview'
import ProgressIndicator from '@components/common/ProgressIndicator'
import Button from '@components/ui/Button'

const STEPS = [
  { id: 0, title: 'Pain Map', description: 'Select areas where you experience pain' },
  { id: 1, title: 'Pain Intensity', description: 'Rate the intensity of your pain' },
  { id: 2, title: 'Mobility', description: 'Assess your movement difficulty' },
  { id: 3, title: 'Daily Impact', description: 'How pain affects your daily life' },
  { id: 4, title: 'Review', description: 'Review and submit your assessment' },
]

function AssessmentPage() {
  const navigate = useNavigate()
  const { currentStep, setCurrentStep, resetForm, formData } = useAssessment()

  useEffect(() => {
    // Reset form when entering assessment page
    resetForm()
  }, [])

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Your progress will be lost.')) {
      resetForm()
      navigate('/')
    }
  }

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepPainMap />
      case 1:
        return <StepPainIntensity />
      case 2:
        return <StepMobility />
      case 3:
        return <StepImpact />
      case 4:
        return <StepReview onComplete={() => navigate('/dashboard')} />
      default:
        return null
    }
  }

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === STEPS.length - 1
  const canProceed = formData.painAreas.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/80 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-lg py-md">
          <div className="flex items-center justify-between mb-md">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Health Assessment
              </h1>
              <p className="text-xs text-slate-500 mt-sm">Step {currentStep + 1} of {STEPS.length}</p>
            </div>
            <button
              onClick={handleCancel}
              className="text-slate-400 hover:text-slate-600 transition-colors p-sm"
              aria-label="Cancel assessment"
              title="Cancel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ProgressIndicator steps={STEPS} currentStep={currentStep} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-lg py-lg">
        {/* Step Title and Description */}
        <div className="mb-xl animate-fadeInUp">
          <h2 className="text-3xl font-bold text-slate-900 mb-md">
            {STEPS[currentStep].title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {STEPS[currentStep].description}
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg border border-slate-100 p-lg md:p-2xl mb-lg">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-md justify-between">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex-1 sm:flex-none"
          >
            ← Previous
          </Button>

          <div className="flex-1" />

          {!isLastStep && (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 sm:flex-none"
            >
              Next →
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

export default AssessmentPage
