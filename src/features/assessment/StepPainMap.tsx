/**
 * Step 1: Pain Map
 * Select body areas where pain is experienced using interactive silhouette
 */

import type { BodyArea } from "../../types"
import { useAssessment } from "@context/AssessmentContext"
import { BODY_AREA_LABELS } from "@utils/constants"
import HumanSilhouette from "@components/ui/HumanSilhouette"
import Badge from "@components/ui/Badge"

function StepPainMap() {
  const { formData, setPainAreas } = useAssessment()

  const togglePainArea = (area: BodyArea) => {
    const newAreas = formData.painAreas.includes(area)
      ? formData.painAreas.filter((a) => a !== area)
      : [...formData.painAreas, area]
    setPainAreas(newAreas)
  }

  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="space-y-4">
        <p className="text-xl text-slate-500 font-medium leading-relaxed italic max-w-xl">
          Identify anatomical focus centers by tapping the areas where you experience discomfort.
        </p>
      </div>

      {/* Anatomical Selection */}
      <div className="relative py-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <HumanSilhouette 
          selectedAreas={formData.painAreas}
          onAreaToggle={togglePainArea}
        />
      </div>

      {/* Selected Areas Display */}
      <div className="space-y-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Detected Focus Areas
        </h3>
        
        <div className="flex flex-wrap gap-3 min-h-[40px]">
          {formData.painAreas.length === 0 ? (
            <div className="text-slate-300 text-sm font-medium italic">
              No anatomical nodes selected
            </div>
          ) : (
            formData.painAreas.map((area) => (
              <Badge 
                key={area}
                variant="success"
                className="pl-4 pr-2 py-2 rounded-xl group"
              >
                {BODY_AREA_LABELS[area]}
                <button 
                  onClick={() => togglePainArea(area)}
                  className="ml-3 w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-200 transition-colors"
                >
                  ✕
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default StepPainMap