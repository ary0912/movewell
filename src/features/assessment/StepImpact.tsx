/**
 * Step 4: Lifestyle Impact
 * Measures how pain signals interfere with daily performance
 */

import { useAssessment } from "@context/AssessmentContext"
import { DAILY_IMPACT_QUESTIONS } from "@utils/constants"
import { Card } from "@components/ui/Card"

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
      <div className="max-w-2xl">
        <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
          How do these signals interfere with your life performance? 
          Measure the impact on your fundamental daily vectors.
        </p>
      </div>

      <div className="grid gap-6">
        {DAILY_IMPACT_QUESTIONS.map((question) => {
          const answer = formData.dailyImpact.find((q) => q.id === question.id)
          const impact = answer?.impact || 0

          return (
            <Card
              key={question.id}
              className="p-10 border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                <label
                  htmlFor={`impact-${question.id}`}
                  className="text-xl font-bold text-slate-900 flex items-center gap-4 tracking-tight"
                >
                  <span className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-inner">
                    {categoryIcons[question.category]}
                  </span>
                  {question.description}
                </label>
                <div className="flex items-center gap-4 shrink-0">
                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Impact</span>
                   <span className="text-5xl font-bold text-emerald-600 tabular-nums leading-none">
                     {impact}
                   </span>
                </div>
              </div>

              <div className="relative pt-4">
                <input
                  id={`impact-${question.id}`}
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
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-100 accent-emerald-600 transition-all hover:bg-slate-200"
                  aria-label={question.description}
                />
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-6">
                  <span>Baseline</span>
                  <span>Moderate</span>
                  <span>Severe Signal</span>
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