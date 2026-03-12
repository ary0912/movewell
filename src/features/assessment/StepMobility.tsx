/**
 * Step 3: Mobility
 * Evaluate movement difficulty across common activities
 */

import { useAssessment } from "@context/AssessmentContext"
import { MOBILITY_QUESTIONS } from "@utils/constants"

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

    <div className="space-y-10">

      {/* Intro */}

      <div className="max-w-2xl">

        <p className="text-lg text-[#6e6e73] leading-relaxed">
          Tell us how easy or difficult these movements feel for you.
          This helps us understand how mobility affects your daily activities.
        </p>

        <p className="text-sm text-slate-500 mt-2">
          0 = no difficulty • 10 = unable to perform
        </p>

      </div>


      {/* Questions */}

      <div className="space-y-8">

        {MOBILITY_QUESTIONS.map((question) => {

          const answer = formData.mobilityDifficulty.find((q) => q.id === question.id)
          const difficulty = answer?.difficulty || 0

          return (

            <div
              key={question.id}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm"
            >

              {/* Question Header */}

              <div className="flex items-center justify-between mb-4">

                <label
                  htmlFor={`mobility-${question.id}`}
                  className="font-medium text-[#1d1d1f]"
                >

                  {question.question}

                </label>

                <span className="text-xl font-semibold text-[#1DB954]">
                  {difficulty}
                </span>

              </div>


              {/* Slider */}

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
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-[#1DB954]"
                aria-label={question.question}
              />


              {/* Scale Labels */}

              <div className="flex justify-between text-xs text-slate-500 mt-2">

                <span>No difficulty</span>

                <span>Moderate</span>

                <span>Unable</span>

              </div>

            </div>

          )

        })}

      </div>

    </div>

  )

}

export default StepMobility