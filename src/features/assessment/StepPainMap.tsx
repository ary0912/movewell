/**
 * Step 1: Pain Map
 * Select body areas where pain is experienced
 */

import type { BodyArea } from "../../types"
import { useAssessment } from "@context/AssessmentContext"
import { BODY_AREAS, BODY_AREA_LABELS } from "@utils/constants"
import Card from "@components/ui/Card"

function StepPainMap() {

  const { formData, setPainAreas } = useAssessment()

  const togglePainArea = (area: BodyArea) => {

    const newAreas = formData.painAreas.includes(area)
      ? formData.painAreas.filter((a) => a !== area)
      : [...formData.painAreas, area]

    setPainAreas(newAreas)

  }

  return (

    <div className="space-y-10">

      {/* Intro */}

      <div className="max-w-2xl">

        <p className="text-lg text-[#6e6e73] leading-relaxed">
          Select the parts of your body where you currently feel pain.
          You can choose more than one area.
        </p>

        <p className="text-sm text-slate-500 mt-2">
          Tap any area below to include it in your assessment.
        </p>

      </div>


      {/* Body Area Grid */}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

        {BODY_AREAS.map((area) => {

          const isSelected = formData.painAreas.includes(area as BodyArea)

          return (

            <button
              key={area}
              onClick={() => togglePainArea(area as BodyArea)}
              aria-pressed={isSelected}
              className={`
                p-4 rounded-xl border transition
                text-left font-medium text-sm
                flex items-center justify-between
                ${
                  isSelected
                    ? "bg-[#1DB954]/10 border-[#1DB954] text-[#1DB954]"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954]
              `}
            >

              <span>{BODY_AREA_LABELS[area]}</span>

              {isSelected && (
                <span className="text-sm font-bold">
                  ✓
                </span>
              )}

            </button>

          )

        })}

      </div>


      {/* Feedback */}

      {formData.painAreas.length === 0 && (

        <Card className="p-5 bg-slate-50 border-slate-200">

          <p className="text-sm text-slate-600">

            👉 Select at least one area to continue.

          </p>

        </Card>

      )}


      {formData.painAreas.length > 0 && (

        <Card className="p-5 bg-[#1DB954]/10 border-[#1DB954]/30">

          <p className="text-sm text-[#1d1d1f]">

            ✓ You selected{" "}
            <strong>{formData.painAreas.length}</strong> area
            {formData.painAreas.length > 1 ? "s" : ""}:

          </p>

          <p className="text-sm text-[#1d1d1f] mt-2">

            {formData.painAreas
              .map((a) => BODY_AREA_LABELS[a])
              .join(", ")}

          </p>

        </Card>

      )}

    </div>

  )

}

export default StepPainMap