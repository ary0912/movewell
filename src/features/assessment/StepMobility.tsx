'use client';

/**
 * Step 3: Mobility (UPGRADED)
 * - Horizontal layout
 * - Theme tokens (dark mode ready)
 * - Better hierarchy + feedback
 */

import { useAssessment } from "@context/AssessmentContext"
import { MOBILITY_QUESTIONS } from "@utils/constants"
import { Card } from "@components/ui/Card"
import { cn } from "@/lib/utils"

function StepMobility() {
  const { formData, setMobilityDifficulty } = useAssessment()

  const handleDifficultyChange = (questionId: string, difficulty: number) => {
    const updated = formData.mobilityDifficulty.map((q) =>
      q.id === questionId ? { ...q, difficulty } : q
    )

    if (!updated.find((q) => q.id === questionId)) {
      const question = MOBILITY_QUESTIONS.find((q) => q.id === questionId)
      if (question) {
        updated.push({
          id: questionId,
          question: question.question,
          difficulty,
          area: question.area
        })
      }
    }

    setMobilityDifficulty(updated)
  }

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div className="max-w-2xl">
        <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
          Evaluate how freely your body moves.
          Focus on resistance, stiffness, and limitation in motion.
        </p>
      </div>


      {/* CARDS */}
      <div className="space-y-6">

        {MOBILITY_QUESTIONS.map((question) => {
          const answer = formData.mobilityDifficulty.find((q) => q.id === question.id)
          const difficulty = answer?.difficulty || 0

          return (
            <Card
              key={question.id}
              className="p-6 md:p-8 flex flex-col gap-6 hover:-translate-y-1 transition-all duration-300"
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between gap-6">

                {/* LEFT */}
                <div className="max-w-xl">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
                    Mobility
                  </p>
                  <label
                    htmlFor={`mobility-${question.id}`}
                    className="text-lg md:text-xl font-semibold text-foreground leading-tight"
                  >
                    {question.question}
                  </label>
                </div>

                {/* RIGHT VALUE */}
                <div className="text-right shrink-0">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    Resistance
                  </p>
                  <div className="text-4xl font-bold text-primary tabular-nums leading-none">
                    {difficulty}
                  </div>
                </div>

              </div>


              {/* SLIDER */}
              <div className="space-y-4">

                <input
                  id={`mobility-${question.id}`}
                  type="range"
                  min="0"
                  max="10"
                  value={difficulty}
                  onChange={(e) =>
                    handleDifficultyChange(
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

                {/* SCALE LABELS */}
                <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-muted-foreground">

                  <span className={cn(difficulty === 0 && "text-foreground")}>
                    Fluid
                  </span>

                  <span className={cn(difficulty >= 4 && difficulty <= 6 && "text-foreground")}>
                    Restricted
                  </span>

                  <span className={cn(difficulty >= 8 && "text-foreground")}>
                    Severe
                  </span>

                </div>

                {/* PROGRESS BAR */}
                <div className="h-[3px] bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${difficulty * 10}%` }}
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

export default StepMobility