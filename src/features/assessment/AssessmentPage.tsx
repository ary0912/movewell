/**
 * MoveWell Assessment Page
 * Multi-step guided health assessment with clear UX flow
 */

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAssessment } from "@context/AssessmentContext"

import StepPainMap from "./StepPainMap"
import StepPainIntensity from "./StepPainIntensity"
import StepMobility from "./StepMobility"
import StepImpact from "./StepImpact"
import StepReview from "./StepReview"

import ProgressIndicator from "@components/common/ProgressIndicator"
import Button from "@components/ui/Button"
import Card from "@components/ui/Card"

const STEPS = [
  { id: 0, title: "Pain Map", description: "Select the areas where you currently feel pain." },
  { id: 1, title: "Pain Intensity", description: "Tell us how intense the pain feels." },
  { id: 2, title: "Mobility", description: "Describe any movement limitations you experience." },
  { id: 3, title: "Daily Impact", description: "Understand how pain affects your daily routine." },
  { id: 4, title: "Review", description: "Review your responses before submitting." }
]

function AssessmentPage() {

  const navigate = useNavigate()

  const {
    currentStep,
    setCurrentStep,
    resetForm,
    formData
  } = useAssessment()

  useEffect(() => {
    resetForm()
  }, [])

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Cancel this assessment? Your progress will be lost."
    )

    if (confirmed) {
      resetForm()
      navigate("/")
    }
  }

  const renderStep = () => {

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
        return <StepReview onComplete={() => navigate("/dashboard")} />

      default:
        return null
    }
  }

  const isFirst = currentStep === 0
  const isLast = currentStep === STEPS.length - 1

  const canProceed = formData.painAreas.length > 0

  return (

    <div className="min-h-screen bg-[#f5f5f7]">

      {/* Header */}

      <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-200 z-50">

        <div className="max-w-4xl mx-auto px-6 py-5">

          <div className="flex items-center justify-between mb-4">

            <div>

              <h1 className="text-xl font-semibold text-[#1d1d1f]">
                Health Assessment
              </h1>

              <p className="text-sm text-[#6e6e73]">
                Step {currentStep + 1} of {STEPS.length}
              </p>

            </div>

            <button
              onClick={handleCancel}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Cancel assessment"
            >
              ✕
            </button>

          </div>

          <ProgressIndicator
            steps={STEPS}
            currentStep={currentStep}
          />

        </div>

      </header>


      {/* Content */}

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Step Info */}

        <div className="mb-10">

          <h2 className="text-3xl font-bold text-[#1d1d1f] mb-3">

            {STEPS[currentStep].title}

          </h2>

          <p className="text-lg text-[#6e6e73] leading-relaxed">

            {STEPS[currentStep].description}

          </p>

        </div>


        {/* Step Container */}

        <Card className="p-8 mb-10">

          {renderStep()}

        </Card>


        {/* Navigation */}

        <div className="flex items-center justify-between">

          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={isFirst}
          >
            ← Previous
          </Button>


          {!isLast && (

            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-[#1DB954] hover:bg-[#17a94d] text-white"
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