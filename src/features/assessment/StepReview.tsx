/**
 * Step 5: Review & Submit
 * Review answers before submitting assessment
 */

import { useState } from "react"
import { useAssessment } from "@context/AssessmentContext"
import { submitAssessment } from "@services/assessmentService"
import { BODY_AREA_LABELS } from "@utils/constants"

import { Button } from "@components/ui/Button"
import { Card } from "@components/ui/Card"
import Badge from "@components/ui/Badge"

interface StepReviewProps {
  onComplete: () => void
}

function StepReview({ onComplete }: StepReviewProps) {
  const {
    formData,
    isLoading,
    setIsLoading,
    setResult,
    error,
    setError
  } = useAssessment()

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await submitAssessment(formData)
      setResult(result)
      setSubmitted(true)
      setTimeout(() => {
        onComplete()
      }, 1500)
    } catch (err) {
      setError("Failed to synthesize baseline. Please verify your connection.")
      console.error("Submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-20 space-y-8 animate-fadeInUp">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-5xl shadow-sm animate-float">
          ✓
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
            Synthesis Complete.
          </h3>
          <p className="text-xl text-slate-500 font-medium italic">
            Generating your longitudinal health blueprint...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-8">
        {/* Pain Areas */}
        <Card className="p-10 border-slate-200 bg-white">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
            Decoded Neural Nodes
          </h4>
          <div className="flex flex-wrap gap-4">
            {formData.painAreas.map((area) => (
              <Badge
                key={area}
                variant="success"
                className="px-6 py-2"
              >
                {BODY_AREA_LABELS[area]}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Intensity Metrics */}
        <Card className="p-10 border-slate-200 bg-white">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
            Signal Strength Matrix
          </h4>
          <div className="space-y-6">
            {formData.painAreas.map((area) => (
              <div key={area} className="flex justify-between items-center group">
                <span className="text-lg font-bold text-slate-700">
                  {BODY_AREA_LABELS[area]}
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${(formData.painIntensity[area] || 0) * 10}%` }} 
                    />
                  </div>
                  <span className="font-bold text-emerald-600 w-8 text-right tabular-nums">
                    {formData.painIntensity[area] || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Info */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">
             🔒
          </div>
          <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
            End-to-End Encryption Active • Your health data is locally synthesized.
          </p>
        </div>
      </div>

      {error && (
        <Card className="p-6 bg-red-50 border-red-100">
          <p className="text-red-900 text-sm font-bold">
            ⚠️ {error}
          </p>
        </Card>
      )}

      {/* Submit Action */}
      <div className="pt-8">
        <Button
          variant="clinical"
          size="lg"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full h-16 text-lg"
        >
          {isLoading ? "Synthesizing..." : "Finalize Baseline"}
        </Button>
      </div>
    </div>
  )
}

export default StepReview