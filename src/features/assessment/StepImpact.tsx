/**
 * Step 4: Daily Impact
 * Measures how pain affects everyday activities
 */

import { useAssessment } from "@context/AssessmentContext"
import { DAILY_IMPACT_QUESTIONS } from "@utils/constants"

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

    <div className="space-y-10">

      {/* Intro */}

      <div className="max-w-2xl">

        <p className="text-lg text-[#6e6e73] leading-relaxed">
          Pain can affect different parts of daily life.  
          Use the sliders below to describe how much your symptoms
          impact common activities.
        </p>

        <p className="text-sm text-slate-500 mt-2">
          0 = no impact • 10 = severe impact
        </p>

      </div>


      {/* Questions */}

      <div className="space-y-8">

        {DAILY_IMPACT_QUESTIONS.map((question) => {

          const answer = formData.dailyImpact.find((q) => q.id === question.id)
          const impact = answer?.impact || 0

          return (

            <div
              key={question.id}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm"
            >

              {/* Question Header */}

              <div className="flex items-center justify-between mb-4">

                <label
                  htmlFor={`impact-${question.id}`}
                  className="font-medium text-[#1d1d1f] flex items-center gap-2"
                >

                  <span className="text-xl">
                    {categoryIcons[question.category]}
                  </span>

                  {question.description}

                </label>

                <span className="text-xl font-semibold text-[#1DB954]">
                  {impact}
                </span>

              </div>


              {/* Slider */}

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
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-[#1DB954]"
                aria-label={question.description}
              />


              {/* Scale Labels */}

              <div className="flex justify-between text-xs text-slate-500 mt-2">

                <span>No impact</span>

                <span>Moderate</span>

                <span>Severe</span>

              </div>

            </div>

          )

        })}

      </div>

    </div>

  )

}

export default StepImpact