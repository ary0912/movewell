'use client';

/**
 * Step 4: Lifestyle Impact (UPGRADED)
 * - Horizontal card layout
 * - Better visual hierarchy
 * - Live feedback + scale indicators
 * - Dark mode compatible
 */

import { useAssessment } from "@context/AssessmentContext"
import { DAILY_IMPACT_QUESTIONS } from "@utils/constants"
import { Card } from "@components/ui/Card"
import { cn } from "@/lib/utils"

function StepImpact() {
  const { formData, setDailyImpact } = useAssessment()

  const handleImpactChange = (questionId: string, impact: number) => {
    const updated = formData.dailyImpact.map((q) =>
      q.id === questionId ? { ...q, impact } : q
    )

    if (!updated.find((q) => q.id === questionId)) {
      const question = DAILY_IMPACT_QUESTIONS.find((q) => q.id === questionId)
      if (question) {
        updated.push({
          id: questionId,
          category: question.category,
          impact,
          description: question.description
        })
      }
    }

    setDailyImpact(updated)
  }

  const categoryIcons: Record<string, string> = {
    work: "💼",
    sleep: "😴",
    activity: "🏃"
  }

  return (
    <div className="space-y-12">

      {/* =========================
          HEADER
      ========================= */}
      <div className="max-w-2xl">
        <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
          Measure how your condition impacts core daily functions.
          Focus on real-life performance, not just symptoms.
        </p>
      </div>


      {/* =========================
          CARDS (HORIZONTAL)
      ========================= */}
      <div className="space-y-6">

        {DAILY_IMPACT_QUESTIONS.map((question) => {
          const answer = formData.dailyImpact.find((q) => q.id === question.id)
          const impact = answer?.impact || 0

          return (
            <Card
              key={question.id}
              className="p-6 md:p-8 flex flex-col gap-6 hover:-translate-y-1 transition-all duration-300"
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between gap-6">

                {/* LEFT (ICON + TEXT) */}
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-xl shadow-inner">
                    {categoryIcons[question.category]}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">
                      {question.category}
                    </p>
                    <p className="text-lg font-semibold text-foreground leading-tight">
                      {question.description}
                    </p>
                  </div>

                </div>

                {/* RIGHT (VALUE) */}
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    Impact
                  </p>
                  <div className="text-4xl font-bold text-primary tabular-nums leading-none">
                    {impact}
                  </div>
                </div>

              </div>


              {/* SLIDER SECTION */}
              <div className="space-y-4">

                {/* SLIDER */}
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={impact}
                  onChange={(e) =>
                    handleImpactChange(
                      question.id,
                      parseInt(e.target.value)
                    )
                  }
                  className={cn(
                    "w-full h-[4px] rounded-full appearance-none cursor-pointer transition-all",
                    "bg-muted",
                    "accent-primary"
                  )}
                />

                {/* SCALE */}
                <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-muted-foreground">

                  <span className={cn(impact === 0 && "text-foreground")}>
                    Baseline
                  </span>

                  <span className={cn(impact >= 4 && impact <= 6 && "text-foreground")}>
                    Moderate
                  </span>

                  <span className={cn(impact >= 8 && "text-foreground")}>
                    Severe
                  </span>

                </div>

                {/* PROGRESS BAR (NEW VISUAL FEEDBACK) */}
                <div className="h-[3px] bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${impact * 10}%` }}
                  />
                </div>

              </div>

            </Card>
          )
        })}

      </div>
    </div>
  )
}

export default StepImpact