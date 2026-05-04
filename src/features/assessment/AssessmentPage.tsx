'use client';

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAssessment } from "@context/AssessmentContext"

import StepPainMap from "./StepPainMap"
import StepPainIntensity from "./StepPainIntensity"
import StepMobility from "./StepMobility"
import StepImpact from "./StepImpact"
import StepReview from "./StepReview"

import { Button } from "@components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  { id: 0, title: "Where do you feel pain?", desc: "Select all areas that apply." },
  { id: 1, title: "How intense is your pain?", desc: "0 = none, 10 = severe." },
  { id: 2, title: "How is your mobility?", desc: "How difficult are movements?" },
  { id: 3, title: "How does this affect your day?", desc: "Work, sleep, and activity." },
  { id: 4, title: "Review your responses", desc: "Confirm before generating results." }
]

function AssessmentPage() {
  const navigate = useNavigate()
  const { currentStep, setCurrentStep, resetForm, formData } = useAssessment()

  useEffect(() => {
    if (currentStep === 0 && !formData.painAreas.length) {
      resetForm()
    }
  }, [currentStep, formData.painAreas.length, resetForm])

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepPainMap />
      case 1: return <StepPainIntensity />
      case 2: return <StepMobility />
      case 3: return <StepImpact />
      case 4: return <StepReview onComplete={() => navigate("/results")} />
      default: return null
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex flex-col">

      {/* PROGRESS */}
      <div className="max-w-[1200px] mx-auto w-full px-6 pt-12">
        <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-3">
          <span>Step {currentStep + 1}</span>
          <span>{STEPS.length}</span>
        </div>

        <div className="h-[3px] bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>


      {/* MAIN */}
      <div className="flex-1 flex items-start justify-center px-6 py-16">

        {/* 🚀 FIXED WIDTH */}
        <div className="w-full max-w-[1200px]">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >

              {/* HEADER */}
              <div className="text-center space-y-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Assessment
                </p>

                <h1 className="text-3xl font-semibold text-foreground tracking-tight">
                  {STEPS[currentStep].title}
                </h1>

                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  {STEPS[currentStep].desc}
                </p>
              </div>


              {/* STEP CONTENT */}
              <div>
                {renderStep()}
              </div>


              {/* NAV */}
              <div className="flex justify-between pt-6">

                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>

                {currentStep < STEPS.length - 1 && (
                  <Button onClick={handleNext}>
                    Continue →
                  </Button>
                )}

              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  )
}

export default AssessmentPage