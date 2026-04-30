'use client';

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAssessment } from "@context/AssessmentContext"

import StepPainMap from "./StepPainMap"
import StepPainIntensity from "./StepPainIntensity"
import StepMobility from "./StepMobility"
import StepImpact from "./StepImpact"
import StepReview from "./StepReview"

import ProgressIndicator from "@components/common/ProgressIndicator"
import { Button } from "@components/ui/Button"
import { Card } from "@components/ui/Card"
import Badge from "@components/ui/Badge"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 0, title: "Neural Map", description: "Identify anatomical focus centers." },
  { id: 1, title: "Intensity", description: "Quantify the strength of your signal." },
  { id: 2, title: "Mobility", description: "Assess fluid range of movement." },
  { id: 3, title: "Impact", description: "How do these signals interfere with your day?" },
  { id: 4, title: "Review", description: "Final verification before synthesis." }
]

function AssessmentPage() {
  const navigate = useNavigate()
  const { currentStep, setCurrentStep, resetForm, formData } = useAssessment()

  useEffect(() => {
    if (currentStep === 0 && !formData.painAreas.length) {
      resetForm()
    }
  }, [])

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

  const handleCancel = () => {
    if (window.confirm("Abandon this assessment? Your clinical signals will not be saved.")) {
      resetForm()
      navigate("/")
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

  const isFirst = currentStep === 0
  const isLast = currentStep === STEPS.length - 1
  const canProceed = currentStep === 0 ? formData.painAreas.length > 0 : true

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      
      {/* 1. Header: Slim & High Trust (Offset for new Navbar) */}
      <header className="sticky top-0 lg:top-[96px] bg-white/90 backdrop-blur-md border-b border-slate-200 z-40 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-600/10">MW</div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none uppercase tracking-widest">
                Baseline Initialization
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">
                Phase {currentStep + 1} • {STEPS[currentStep].title}
              </p>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-4">
           <ProgressIndicator steps={STEPS} currentStep={currentStep} />
        </div>
      </header>

      {/* 2. Main content: Typographic Focus */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-4">
              <Badge variant="neutral" className="bg-slate-100 text-slate-500 border-slate-200">Session Context</Badge>
              <h2 className="text-5xl font-bold text-slate-900 tracking-tight leading-none">
                {STEPS[currentStep].title}.
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                {STEPS[currentStep].description}
              </p>
            </div>
            
            <div className="pt-12 hidden lg:block">
              <div className="p-8 border border-emerald-100 bg-white/50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Intelligence Stream</span>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Initializing biomechanical blueprint based on anatomical signals.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Interaction Area */}
          <div className="lg:col-span-8 space-y-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="min-h-[400px]"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between pt-12 border-t border-slate-200">
              <Button
                variant="secondary"
                size="default"
                onClick={handlePrevious}
                disabled={isFirst}
                className="px-10"
              >
                Back
              </Button>

              {!isLast && (
                <Button
                  variant="clinical"
                  size="default"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="px-16"
                >
                  Continue →
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200/50 text-center">
         <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
           Clinical Diagnostic v2.4 • Secure Session
         </p>
      </footer>
    </div>
  )
}

export default AssessmentPage