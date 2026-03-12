/**
 * MoveWell Results Page
 * Clear and human-friendly presentation of health insights
 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAssessment } from "@context/AssessmentContext"
import { fetchHealthData } from "@services/assessmentService"

import { getScoreInterpretation, calculateImprovement } from "@utils/scoring"
import { BODY_AREA_LABELS } from "@utils/constants"

import Card from "@components/ui/Card"
import Button from "@components/ui/Button"
import Badge from "@components/ui/Badge"

function ResultsPage() {

  const navigate = useNavigate()
  const { result } = useAssessment()

  const [healthData, setHealthData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (!result) {
      navigate("/assessment")
      return
    }

    const load = async () => {

      try {

        const data = await fetchHealthData()
        setHealthData(data)

      } catch (error) {

        console.error("Error loading health data:", error)

      } finally {

        setLoading(false)

      }

    }

    load()

  }, [result, navigate])


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">

        <div className="animate-pulse space-y-4 text-center">

          <div className="h-10 w-60 bg-slate-200 rounded"></div>
          <div className="h-32 w-96 bg-slate-200 rounded"></div>

        </div>

      </div>

    )

  }

  if (!result) return null

  const interpretation = getScoreInterpretation(result.overallScore)

  const previousScore =
    healthData?.history?.[healthData.history.length - 2]?.overallScore

  const improvement = previousScore
    ? calculateImprovement(previousScore, result.overallScore)
    : null


  return (

    <div className="min-h-screen bg-[#f5f5f7] py-12">

      <div className="max-w-3xl mx-auto px-6">

        {/* Completion Header */}

        <div className="text-center mb-12">

          <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
            Assessment Complete
          </Badge>

          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-2">
            Your Health Insights
          </h1>

          <p className="text-[#6e6e73]">
            Completed {new Date(result.createdAt).toLocaleDateString()}
          </p>

        </div>


        {/* Overall Score */}

        <Card className="p-10 mb-10 text-center">

          <p className="text-sm text-[#6e6e73] mb-2">
            Overall Health Score
          </p>

          <div className="flex items-end justify-center gap-2 mb-4">

            <span className="text-6xl font-bold text-[#1DB954]">
              {result.overallScore}
            </span>

            <span className="text-xl text-[#6e6e73] mb-2">
              /100
            </span>

          </div>

          <Badge variant={interpretation.color as any}>
            {interpretation.label}
          </Badge>


          {improvement !== null && (

            <p className="mt-6 text-lg font-semibold">

              {improvement > 0 && (
                <span className="text-green-600">
                  ↑ {improvement}% improvement since last assessment
                </span>
              )}

              {improvement < 0 && (
                <span className="text-orange-600">
                  ↓ {Math.abs(improvement)}% change since last assessment
                </span>
              )}

              {improvement === 0 && (
                <span className="text-slate-600">
                  Consistent with previous results
                </span>
              )}

            </p>

          )}

        </Card>


        {/* Summary */}

        <Card className="p-8 mb-10">

          <h2 className="text-xl font-semibold mb-3">
            Summary
          </h2>

          <p className="text-[#1d1d1f] leading-relaxed">
            {result.summary}
          </p>

        </Card>


        {/* Breakdown */}

        <Card className="p-8 mb-10">

          <h2 className="text-xl font-semibold mb-6">
            Score Breakdown
          </h2>

          <div className="space-y-6">

            {[
              {
                label: "Pain Level",
                value: result.painScore,
                color: "bg-red-500"
              },
              {
                label: "Mobility",
                value: result.mobilityScore,
                color: "bg-amber-500"
              },
              {
                label: "Daily Impact",
                value: result.impactScore,
                color: "bg-[#1DB954]"
              }
            ].map((metric) => (

              <div key={metric.label}>

                <div className="flex justify-between mb-2">

                  <span className="font-medium">
                    {metric.label}
                  </span>

                  <span className="font-bold">
                    {metric.value}
                  </span>

                </div>

                <div className="h-2 bg-slate-200 rounded">

                  <div
                    className={`${metric.color} h-2 rounded`}
                    style={{ width: `${metric.value}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </Card>


        {/* Pain Areas */}

        <Card className="p-8 mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Areas of Pain
          </h2>

          <div className="flex flex-wrap gap-3">

            {result.formData.painAreas.map((area) => (

              <div
                key={area}
                className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg"
              >

                <p className="font-medium text-red-900">
                  {BODY_AREA_LABELS[area]}
                </p>

                <p className="text-sm text-red-700">
                  Intensity: {result.formData.painIntensity[area]}/10
                </p>

              </div>

            ))}

          </div>

        </Card>


        {/* Recommendations */}

        <Card className="p-8 mb-10 bg-green-50 border-green-200">

          <h2 className="text-xl font-semibold text-green-900 mb-4">
            Recommended Next Steps
          </h2>

          <ul className="space-y-3">

            {result.recommendations.map((rec, idx) => (

              <li key={idx} className="flex gap-3 text-green-900">

                <span className="font-bold text-green-600">✓</span>

                <span>{rec}</span>

              </li>

            ))}

          </ul>

        </Card>


        {/* Actions */}

        <div className="flex gap-4">

          <Button
            fullWidth
            className="bg-[#1DB954] hover:bg-[#17a94d] text-white"
            onClick={() => navigate("/dashboard")}
          >
            View Dashboard
          </Button>

          <Button
            fullWidth
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>

        </div>

      </div>

    </div>

  )

}

export default ResultsPage