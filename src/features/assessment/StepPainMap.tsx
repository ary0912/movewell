'use client';

/**
 * Step 1: Pain Map (FINAL — BALANCED LAYOUT)
 * - Fixed proportion system
 * - Equal visual weight (silhouette vs panel)
 * - Consistent spacing + hierarchy
 * - Works perfectly with your upgraded HumanSilhouette
 */

import type { BodyArea } from "../../types"
import { useAssessment } from "@context/AssessmentContext"
import { BODY_AREA_LABELS } from "@utils/constants"
import HumanSilhouette from "@components/ui/HumanSilhouette"
import Badge from "@components/ui/Badge"
import { Card } from "@components/ui/Card"

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

      {/* ================= HEADER ================= */}
      <div className="max-w-xl">
        <p className="text-base text-muted-foreground leading-relaxed">
          Identify where discomfort originates. Select all affected regions.
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">

        {/* ================= LEFT — SILHOUETTE ================= */}
        <Card className="p-6 flex items-center justify-center min-h-[460px]">

          {/* IMPORTANT: constrain size */}
          <div className="w-full max-w-[320px]">
            <HumanSilhouette
              selectedAreas={formData.painAreas}
              onAreaToggle={togglePainArea}
            />
          </div>

        </Card>

        {/* ================= RIGHT — FOCUS PANEL ================= */}
        <Card className="p-6 flex flex-col justify-between min-h-[460px]">

          <div className="space-y-6">

            {/* TITLE */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Selected Areas
              </p>

              <h3 className="text-lg font-semibold text-foreground">
                Focus Nodes
              </h3>
            </div>

            {/* CONTENT */}
            {formData.painAreas.length === 0 ? (
              <div className="flex-1 flex items-center justify-center border border-dashed border-border rounded-xl bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  No areas selected
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">

                {formData.painAreas.map((area) => (
                  <Badge
                    key={area}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  >
                    {BODY_AREA_LABELS[area]}

                    <button
                      onClick={() => togglePainArea(area)}
                      className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
                    >
                      ✕
                    </button>
                  </Badge>
                ))}

              </div>
            )}

          </div>

          {/* FOOTNOTE */}
          <p className="text-xs text-muted-foreground mt-6">
            Multiple selections allowed. This defines your baseline.
          </p>

        </Card>

      </div>

    </div>
  )
}

export default StepPainMap