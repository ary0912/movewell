/**
 * Step 4: Daily Impact - how pain affects daily life
 * Questions about work, sleep, and general activities
 */

import { useAssessment } from '@context/AssessmentContext'
import { DAILY_IMPACT_QUESTIONS } from '@utils/constants'

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
          description: question.description,
        })
      }
    }
    setDailyImpact(updated)
  }

  return (
    <div>
      <p className="text-slate-600 mb-lg">
        Tell us how your pain affects your daily life. 0 = No impact, 10 = Severe impact.
      </p>

      <div className="space-y-lg">
        {DAILY_IMPACT_QUESTIONS.map((question) => {
          const answer = formData.dailyImpact.find((q) => q.id === question.id)
          const impact = answer?.impact || 0

          const categoryEmoji = {
            work: '💼',
            sleep: '😴',
            activity: '🏃',
          }

          return (
            <div key={question.id} className="pb-lg border-b border-slate-200 last:border-0">
              <div className="flex items-center justify-between mb-md">
                <label htmlFor={`impact-${question.id}`} className="font-medium text-slate-900">
                  <span className="mr-md">{categoryEmoji[question.category]}</span>
                  {question.description}
                </label>
                <span className="text-lg font-bold text-primary-600">{impact}</span>
              </div>
              <input
                id={`impact-${question.id}`}
                type="range"
                min="0"
                max="10"
                value={impact}
                onChange={(e) => handleImpactChange(question.id, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                aria-label={question.description}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-xs">
                <span>No impact</span>
                <span>Severe impact</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepImpact
