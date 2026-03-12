/**
 * MoveWell Results Page
 * Professional UX-focused presentation of health insights
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

        <div className="animate-pulse space-y-6 text-center">

          <div className="h-10 w-60 bg-slate-200 rounded mx-auto"></div>
          <div className="h-40 w-96 bg-slate-200 rounded"></div>
          <div className="h-32 w-96 bg-slate-200 rounded"></div>

        </div>

      </div>

    )

  }

  if (!result) return null


  const interpretation = getScoreInterpretation(result.overallScore)

  const previousScore =
    healthData?.history?.[healthData.history.length - 2]?.overallScore

  const improvement =
    previousScore
      ? calculateImprovement(previousScore, result.overallScore)
      : null


  return (

    <div className="min-h-screen bg-[#f5f5f7]">

      {/* Navigation */}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">

        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 bg-[#1DB954] rounded-md flex items-center justify-center text-white font-bold">
              MW
            </div>

            <span className="font-semibold text-slate-900">
              MoveWell
            </span>

          </div>

          <Button size="sm" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>

        </div>

      </header>


      <div className="max-w-4xl mx-auto px-6 py-12">


        {/* Completion Header */}

        <div className="text-center mb-14">

          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold">
            ✓
          </div>

          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-3">
            Assessment Complete
          </h1>

          <p className="text-lg text-[#6e6e73]">
            Here are your personalized health insights
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Completed {new Date(result.createdAt).toLocaleDateString()}
          </p>

        </div>


        {/* Overall Score */}

        <Card className="p-10 mb-10 text-center">

          <p className="text-sm text-[#6e6e73] mb-2">
            Overall Health Score
          </p>

          <div className="text-7xl font-bold text-[#1DB954] leading-none">
            {result.overallScore}
          </div>

          <div className="text-sm text-slate-500 mt-1">
            out of 100
          </div>

          <div className="mt-4">
            <Badge variant={interpretation.color as any}>
              {interpretation.label}
            </Badge>
          </div>


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


        {/* Metric Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

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
          ].map(metric => (

            <Card key={metric.label} className="p-6">

              <p className="text-sm text-slate-500 mb-2">
                {metric.label}
              </p>

              <p className="text-3xl font-bold mb-3">
                {metric.value}
              </p>

              <div className="h-2 bg-slate-200 rounded">

                <div
                  className={`${metric.color} h-2 rounded`}
                  style={{ width: `${metric.value}%` }}
                />

              </div>

            </Card>

          ))}

        </div>


        {/* Summary */}

        <Card className="p-8 mb-10">

          <h2 className="text-xl font-semibold mb-3">
            Summary
          </h2>

          <p className="text-[#1d1d1f] leading-relaxed">
            {result.summary}
          </p>

        </Card>


        {/* Pain Areas */}

        <Card className="p-8 mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Areas of Pain
          </h2>

          <div className="flex flex-wrap gap-3">

            {result.formData.painAreas.map(area => (

              <div
                key={area}
                className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium"
              >
                {BODY_AREA_LABELS[area]}
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

              <li key={idx} className="flex gap-3 items-start text-green-900">

                <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-sm">
                  ✓
                </div>

                <span>{rec}</span>

              </li>

            ))}

          </ul>

        </Card>


        {/* Next Step Guidance */}

        <Card className="p-6 mb-10 bg-blue-50 border-blue-200">

          <h3 className="font-semibold mb-2">
            What should you do next?
          </h3>

          <p className="text-slate-700 text-sm">
            Continue tracking your health by completing new assessments and
            monitoring changes in your dashboard over time.
          </p>

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
            onClick={() => navigate("/assessment")}
          >
            Start New Assessment
          </Button>

        </div>


      </div>

    </div>

  )

}

export default ResultsPage