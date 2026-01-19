/**
 * Step 2: Pain Intensity - rate pain for each selected area
 * Uses sliders for intuitive 0-10 scale rating
 */

import type { BodyArea } from '../../types'
import { useAssessment } from '@context/AssessmentContext'
import { BODY_AREA_LABELS } from '@utils/constants'

function StepPainIntensity() {
  const { formData, setPainIntensity } = useAssessment()

  const handleIntensityChange = (area: BodyArea, value: number) => {
    setPainIntensity(area, value)
  }

  return (
    <div>
      <p className="text-slate-600 mb-lg">
        For each area, rate the pain intensity on a scale of 0 (no pain) to 10 (worst pain).
      </p>

      <div className="space-y-lg">
        {formData.painAreas.map((area) => {
          const intensity = formData.painIntensity[area] || 0
          return (
            <div key={area}>
              <div className="flex items-center justify-between mb-md">
                <label htmlFor={`intensity-${area}`} className="font-medium text-slate-900">
                  {BODY_AREA_LABELS[area as BodyArea]}
                </label>
                <span className="text-lg font-bold text-primary-600">{intensity}</span>
              </div>
              <input
                id={`intensity-${area}`}
                type="range"
                min="0"
                max="10"
                value={intensity}
                onChange={(e) => handleIntensityChange(area as BodyArea, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                aria-label={`Pain intensity for ${BODY_AREA_LABELS[area as BodyArea]}`}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-xs">
                <span>No pain</span>
                <span>Worst pain</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-lg p-md bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          💡 <strong>Tip:</strong> Your responses help us understand the severity of your pain.
          Be honest about what you're experiencing.
        </p>
      </div>
    </div>
  )
}

export default StepPainIntensity
