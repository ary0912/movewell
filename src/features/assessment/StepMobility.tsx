/**
 * Step 3: Mobility - assess movement difficulty
 * Questions about range of motion and functional mobility
 */

import { useAssessment } from '@context/AssessmentContext'
import { MOBILITY_QUESTIONS } from '@utils/constants'

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
          area: question.area,
        })
      }
    }
    setMobilityDifficulty(updated)
  }

  return (
    <div>
      <p className="text-slate-600 mb-lg">
        Rate how difficult each movement is for you. 0 = No difficulty, 10 = Unable to do.
      </p>

      <div className="space-y-lg">
        {MOBILITY_QUESTIONS.map((question) => {
          const answer = formData.mobilityDifficulty.find((q) => q.id === question.id)
          const difficulty = answer?.difficulty || 0

          return (
            <div key={question.id} className="pb-lg border-b border-slate-200 last:border-0">
              <div className="flex items-center justify-between mb-md">
                <label htmlFor={`mobility-${question.id}`} className="font-medium text-slate-900">
                  {question.question}
                </label>
                <span className="text-lg font-bold text-primary-600">{difficulty}</span>
              </div>
              <input
                id={`mobility-${question.id}`}
                type="range"
                min="0"
                max="10"
                value={difficulty}
                onChange={(e) => handleDifficultyChange(question.id, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                aria-label={question.question}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-xs">
                <span>No difficulty</span>
                <span>Very difficult</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepMobility
