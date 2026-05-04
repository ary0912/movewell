'use client';

/**
 * Step 2: Signal Intensity (UPGRADED)
 * - Horizontal card layout
 * - Theme tokens (dark mode ready)
 * - Strong hierarchy + feedback
 */

import type { BodyArea } from "../../types"
import { useAssessment } from "@context/AssessmentContext"
import { BODY_AREA_LABELS } from "@utils/constants"
import { Card } from "@components/ui/Card"
import { cn } from "@/lib/utils"

function StepPainIntensity() {
  const { formData, setPainIntensity } = useAssessment()

  const handleIntensityChange = (area: BodyArea, value: number) => {
    setPainIntensity(area, value)
  }

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div className="max-w-2xl">
        <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
          Quantify the intensity of each pain signal.
          Focus on how it feels during real-world movement.
        </p>
      </div>


      {/* CARDS */}
      <div className="space-y-6">

        {formData.painAreas.map((area) => {
          const intensity = formData.painIntensity[area] || 0

          return (
            <Card
              key={area}
              className="p-6 md:p-8 flex flex-col gap-6 hover:-translate-y-1 transition-all duration-300"
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between gap-6">

                {/* LEFT */}
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
                    Pain Signal
                  </p>
                  <label
                    htmlFor={`intensity-${area}`}
                    className="text-lg md:text-xl font-semibold text-foreground tracking-tight"
                  >
                    {BODY_AREA_LABELS[area as BodyArea]}
                  </label>
                </div>

                {/* RIGHT VALUE */}
                <div className="text-right shrink-0">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    Intensity
                  </p>
                  <div className="text-4xl font-bold text-primary tabular-nums leading-none">
                    {intensity}
                  </div>
                </div>

              </div>


              {/* SLIDER */}
              <div className="space-y-4">

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
                  className={cn(
                    "w-full h-[4px] rounded-full appearance-none cursor-pointer transition-all",
                    "bg-muted",
                    "accent-primary"
                  )}
                  aria-label={`Pain intensity for ${BODY_AREA_LABELS[area as BodyArea]}`}
                />

                {/* SCALE */}
                <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-muted-foreground">

                  <span className={cn(intensity === 0 && "text-foreground")}>
                    None
                  </span>

                  <span className={cn(intensity >= 4 && intensity <= 6 && "text-foreground")}>
                    Moderate
                  </span>

                  <span className={cn(intensity >= 8 && "text-foreground")}>
                    Severe
                  </span>

                </div>

                {/* PROGRESS BAR */}
                <div className="h-[3px] bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${intensity * 10}%` }}
                  />
                </div>

              </div>

            </Card>
          )
        })}

      </div>


      {/* EMPTY STATE (UPGRADED) */}
      {formData.painAreas.length === 0 && (
        <div className="p-16 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center space-y-4 bg-muted/30">
          
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            No areas selected
          </p>

          <p className="text-sm text-muted-foreground max-w-xs">
            Return to the previous step and select at least one body area to continue.
          </p>

        </div>
      )}

    </div>
  )
}

export default StepPainIntensity