/**
 * Step 3: Mobility
 * Evaluate movement difficulty across common activities
 */

import { useAssessment } from "@context/AssessmentContext"
import { MOBILITY_QUESTIONS } from "@utils/constants"
import { Card } from "@components/ui/Card"

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
      <div className="max-w-2xl">
        <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
          Evaluate the fluidity of your joint movements. 
          Identify any resistance or restriction in your primary motion vectors.
        </p>
      </div>

      <div className="grid gap-6">
        {MOBILITY_QUESTIONS.map((question) => {
          const answer = formData.mobilityDifficulty.find((q) => q.id === question.id)
          const difficulty = answer?.difficulty || 0

          return (
            <Card
              key={question.id}
              className="p-10 border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                <label
                  htmlFor={`mobility-${question.id}`}
                  className="text-xl font-bold text-slate-900 tracking-tight leading-tight max-w-lg"
                >
                  {question.question}
                </label>
                <div className="flex items-center gap-4 shrink-0">
                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Resistance</span>
                   <span className="text-5xl font-bold text-emerald-600 tabular-nums leading-none">
                     {difficulty}
                   </span>
                </div>
              </div>

              <div className="relative pt-4">
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
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-100 accent-emerald-600 transition-all hover:bg-slate-200"
                  aria-label={question.question}
                />
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-6">
                  <span>Fluid Range</span>
                  <span>Restricted</span>
                  <span>Severe Block</span>
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