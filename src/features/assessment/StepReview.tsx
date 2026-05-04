'use client';

/**
 * Step 5: Review & Submit (UPGRADED)
 * - Horizontal summary layout
 * - Premium hierarchy
 * - Dark mode ready
 * - Strong final CTA experience
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
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  /* =========================
     SUCCESS STATE
  ========================= */
  if (submitted) {
    return (
      <div className="text-center py-24 space-y-8 animate-fadeInUp">

        <div className="w-24 h-24 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto text-5xl animate-float">
          ✓
        </div>

        <div className="space-y-3">
          <h3 className="text-4xl font-semibold text-foreground tracking-tight">
            Synthesis Complete
          </h3>

          <p className="text-lg text-muted-foreground">
            Generating your health blueprint...
          </p>
        </div>

      </div>
    )
  }

  return (
    <div className="space-y-12">

      {/* =========================
          GRID LAYOUT
      ========================= */}
      <div className="grid lg:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-7 space-y-8">

          {/* Pain Areas */}
          <Card className="p-8 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Selected Areas
              </p>
              <h4 className="text-lg font-semibold text-foreground">
                Neural Nodes
              </h4>
            </div>

            <div className="flex flex-wrap gap-3">
              {formData.painAreas.map((area) => (
                <Badge key={area} className="px-4 py-2">
                  {BODY_AREA_LABELS[area]}
                </Badge>
              ))}
            </div>
          </Card>


          {/* Intensity */}
          <Card className="p-8 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Pain Signals
              </p>
              <h4 className="text-lg font-semibold text-foreground">
                Intensity Overview
              </h4>
            </div>

            <div className="space-y-5">
              {formData.painAreas.map((area) => {
                const value = formData.painIntensity[area] || 0

                return (
                  <div key={area} className="flex items-center justify-between">

                    <span className="text-sm text-foreground font-medium">
                      {BODY_AREA_LABELS[area]}
                    </span>

                    <div className="flex items-center gap-4">

                      <div className="w-32 h-[3px] bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${value * 10}%` }}
                        />
                      </div>

                      <span className="text-sm font-semibold text-primary w-6 text-right tabular-nums">
                        {value}
                      </span>

                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

        </div>


        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 space-y-6">

          {/* Security */}
          <Card className="p-6 flex items-start gap-4">

            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
              🔒
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                Secure Processing
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your data is processed locally and securely.
              </p>
            </div>

          </Card>


          {/* CTA */}
          <Card className="p-6 space-y-6">

            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Final Step
              </p>
              <h4 className="text-lg font-semibold text-foreground">
                Generate Results
              </h4>
            </div>

            <Button
              size="lg"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
              className="w-full h-14"
            >
              {isLoading ? "Synthesizing..." : "Generate Report"}
            </Button>

          </Card>

        </div>

      </div>


      {/* ERROR */}
      {error && (
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <p className="text-sm font-medium text-destructive">
            ⚠️ {error}
          </p>
        </Card>
      )}

    </div>
  )
}

export default StepReview