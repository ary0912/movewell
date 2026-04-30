/**
 * Step 2: Signal Intensity
 * Quantify pain severity for identified nodes
 */

import type { BodyArea } from "../../types"
import { useAssessment } from "@context/AssessmentContext"
import { BODY_AREA_LABELS } from "@utils/constants"
import { Card } from "@components/ui/Card"

function StepPainIntensity() {
  const { formData, setPainIntensity } = useAssessment()

  const handleIntensityChange = (area: BodyArea, value: number) => {
    setPainIntensity(area, value)
  }

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
          Calibrate the signal strength for each identified node. 
          Rate the intensity of discomfort during daily activity.
        </p>
      </div>

      <div className="grid gap-6">
        {formData.painAreas.map((area) => {
          const intensity = formData.painIntensity[area] || 0
          return (
            <Card
              key={area}
              className="p-10 border-slate-200 bg-white shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-8">
                <label
                  htmlFor={`intensity-${area}`}
                  className="text-2xl font-bold text-slate-900 tracking-tight"
                >
                  {BODY_AREA_LABELS[area as BodyArea]}
                </label>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Intensity</span>
                   <span className="text-5xl font-bold text-emerald-600 tabular-nums leading-none">
                     {intensity}
                   </span>
                </div>
              </div>

              <div className="relative pt-4">
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
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-100 accent-emerald-600 transition-all hover:bg-slate-200"
                  aria-label={`Pain intensity for ${BODY_AREA_LABELS[area as BodyArea]}`}
                />
                
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-6">
                  <span>Dormant</span>
                  <span>Moderate</span>
                  <span>Peak Intensity</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {formData.painAreas.length === 0 && (
         <div className="p-16 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No anatomical nodes detected</p>
            <p className="text-sm text-slate-300">Return to Phase 1 to identify focus areas.</p>
         </div>
      )}
    </div>
  )
}

export default StepPainIntensity