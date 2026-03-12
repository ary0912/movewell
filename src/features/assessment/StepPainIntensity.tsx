/**
 * Step 2: Pain Intensity
 * Rate pain severity for selected body areas
 */

import type { BodyArea } from "../../types"
import { useAssessment } from "@context/AssessmentContext"
import { BODY_AREA_LABELS } from "@utils/constants"

function StepPainIntensity() {

  const { formData, setPainIntensity } = useAssessment()

  const handleIntensityChange = (area: BodyArea, value: number) => {
    setPainIntensity(area, value)
  }

  return (

    <div className="space-y-10">

      {/* Intro */}

      <div className="max-w-2xl">

        <p className="text-lg text-[#6e6e73] leading-relaxed">
          For each area you selected, rate how intense the pain feels right now.
          This helps us understand the severity of your symptoms.
        </p>

        <p className="text-sm text-slate-500 mt-2">
          0 = no pain • 10 = worst possible pain
        </p>

      </div>


      {/* Pain Areas */}

      <div className="space-y-8">

        {formData.painAreas.map((area) => {

          const intensity = formData.painIntensity[area] || 0

          return (

            <div
              key={area}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm"
            >

              {/* Area Header */}

              <div className="flex items-center justify-between mb-4">

                <label
                  htmlFor={`intensity-${area}`}
                  className="font-medium text-[#1d1d1f]"
                >

                  {BODY_AREA_LABELS[area as BodyArea]}

                </label>

                <span className="text-xl font-semibold text-[#1DB954]">
                  {intensity}
                </span>

              </div>


              {/* Slider */}

              <input
                id={`intensity-${area}`}
                type="range"
                min="0"
                max="10"
                value={intensity}
                onChange={(e) =>
                  handleIntensityChange(
                    area as BodyArea,
                    parseInt(e.target.value)
                  )
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-[#1DB954]"
                aria-label={`Pain intensity for ${BODY_AREA_LABELS[area as BodyArea]}`}
              />


              {/* Scale Labels */}

              <div className="flex justify-between text-xs text-slate-500 mt-2">

                <span>No pain</span>

                <span>Moderate</span>

                <span>Worst pain</span>

              </div>

            </div>

          )

        })}

      </div>


      {/* Tip */}

      <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">

        <p className="text-sm text-blue-900 leading-relaxed">

          💡 <strong>Tip:</strong> Try to rate your pain based on how it
          feels during normal daily activity, not only when resting.

        </p>

      </div>

    </div>

  )

}

export default StepPainIntensity