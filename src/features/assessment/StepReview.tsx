/**
 * Step 5: Review & Submit
 * Review answers before submitting assessment
 */

import { useState } from "react"
import { useAssessment } from "@context/AssessmentContext"
import { submitAssessment } from "@services/assessmentService"
import { BODY_AREA_LABELS } from "@utils/constants"

import Button from "@components/ui/Button"
import Card from "@components/ui/Card"

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

      setError("Failed to submit assessment. Please try again.")
      console.error("Submission error:", err)

    } finally {

      setIsLoading(false)

    }

  }


  if (submitted) {

    return (

      <div className="text-center py-16">

        <div className="text-6xl mb-4 text-[#1DB954]">
          ✓
        </div>

        <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">
          Assessment Submitted
        </h3>

        <p className="text-[#6e6e73]">
          We're analyzing your responses and preparing your insights.
        </p>

      </div>

    )

  }

  return (

    <div className="space-y-10">

      {/* Intro */}

      <div>

        <p className="text-lg text-[#6e6e73] leading-relaxed">
          Take a moment to review your answers before submitting your assessment.
        </p>

      </div>


      {/* Pain Areas */}

      <Card className="p-6">

        <h4 className="font-semibold text-[#1d1d1f] mb-4">
          Pain Areas
        </h4>

        <div className="flex flex-wrap gap-3">

          {formData.painAreas.map((area) => (

            <span
              key={area}
              className="px-4 py-2 bg-[#1DB954]/10 text-[#1d1d1f] rounded-full text-sm font-medium"
            >

              {BODY_AREA_LABELS[area]}

            </span>

          ))}

        </div>

      </Card>


      {/* Pain Intensity */}

      <Card className="p-6">

        <h4 className="font-semibold text-[#1d1d1f] mb-4">
          Pain Intensity
        </h4>

        <div className="space-y-3">

          {formData.painAreas.map((area) => (

            <div
              key={area}
              className="flex justify-between items-center"
            >

              <span className="text-[#1d1d1f]">
                {BODY_AREA_LABELS[area]}
              </span>

              <span className="font-semibold text-[#1DB954]">
                {formData.painIntensity[area]}/10
              </span>

            </div>

          ))}

        </div>

      </Card>


      {/* Privacy Notice */}

      <Card className="p-5 bg-green-50 border-green-200">

        <p className="text-sm text-green-900">

          🔒 <strong>Your data is private.</strong>  
          This information is securely stored and used only to generate
          personalized health insights.

        </p>

      </Card>


      {/* Error */}

      {error && (

        <Card className="p-5 bg-red-50 border-red-200">

          <p className="text-red-900 text-sm">
            {error}
          </p>

        </Card>

      )}


      {/* Submit */}

      <Button
        fullWidth
        size="lg"
        onClick={handleSubmit}
        isLoading={isLoading}
        disabled={isLoading}
        className="bg-[#1DB954] hover:bg-[#17a94d] text-white"
      >

        {isLoading ? "Submitting..." : "Submit Assessment"}

      </Button>

    </div>

  )

}

export default StepReview