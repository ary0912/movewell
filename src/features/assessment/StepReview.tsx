/**
 * Step 5: Review & Submit - review all answers and submit assessment
 */

import { useState } from 'react'
import { useAssessment } from '@context/AssessmentContext'
import { submitAssessment } from '@services/assessmentService'
import { BODY_AREA_LABELS } from '@utils/constants'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'

interface StepReviewProps {
  onComplete: () => void
}

function StepReview({ onComplete }: StepReviewProps) {
  const { formData, isLoading, setIsLoading, setResult, error, setError } = useAssessment()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await submitAssessment(formData)
      setResult(result)
      setSubmitted(true)

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        onComplete()
      }, 1500)
    } catch (err) {
      setError('Failed to submit assessment. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-xl">
        <div className="text-5xl mb-md">✓</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-md">
          Assessment Complete!
        </h3>
        <p className="text-slate-600 mb-lg">
          We're analyzing your responses and preparing your results...
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-slate-600 mb-lg">
        Please review your answers below. Everything looks good?
      </p>

      {/* Pain Areas Summary */}
      <div className="mb-lg">
        <h4 className="font-semibold text-slate-900 mb-md">Pain Areas</h4>
        <div className="flex flex-wrap gap-sm">
          {formData.painAreas.map((area) => (
            <span
              key={area}
              className="px-md py-sm bg-primary-100 text-primary-900 rounded-full text-sm font-medium"
            >
              {BODY_AREA_LABELS[area]}
            </span>
          ))}
        </div>
      </div>

      {/* Pain Intensity Summary */}
      <div className="mb-lg">
        <h4 className="font-semibold text-slate-900 mb-md">Pain Intensity</h4>
        <div className="space-y-sm">
          {formData.painAreas.map((area) => (
            <div key={area} className="flex justify-between items-center">
              <span className="text-slate-700">{BODY_AREA_LABELS[area]}</span>
              <span className="font-semibold text-primary-600">
                {formData.painIntensity[area]}/10
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 my-lg" />

      {/* Submission Info */}
      <Card className="mb-lg bg-green-50 border-green-200">
        <p className="text-green-900 text-sm">
          ✓ Your assessment data is secure and private. We use it only to provide you with personalized insights.
        </p>
      </Card>

      {error && (
        <Card className="mb-lg bg-red-50 border-red-200">
          <p className="text-red-900 text-sm">{error}</p>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        fullWidth
        size="lg"
        onClick={handleSubmit}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Assessment'}
      </Button>
    </div>
  )
}

export default StepReview
