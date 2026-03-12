/**
 * MoveWell Health Dashboard
 * Professional UI with clear data hierarchy and modern SaaS design
 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { fetchHealthData, fetchProgressData } from "@services/assessmentService"
import { getScoreInterpretation, calculateImprovement } from "@utils/scoring"
import { TIME_RANGES } from "@utils/constants"

import Card from "@components/ui/Card"
import Button from "@components/ui/Button"
import Badge from "@components/ui/Badge"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

type TimeRange = keyof typeof TIME_RANGES

function DashboardPage() {

  const navigate = useNavigate()

  const [healthData, setHealthData] = useState<any>(null)
  const [progressData, setProgressData] = useState<any[]>([])
  const [selectedRange, setSelectedRange] = useState<TimeRange>("MONTH")
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadData = async () => {

      try {

        const data = await fetchHealthData()
        setHealthData(data)

        const range = TIME_RANGES[selectedRange]
        const progress = await fetchProgressData("user-default", range.days)

        setProgressData(progress)

      } catch (error) {

        console.error("Dashboard loading error:", error)

      } finally {

        setLoading(false)

      }

    }

    loadData()

  }, [selectedRange])


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">

        <div className="animate-pulse text-center space-y-4">

          <div className="h-10 w-72 bg-slate-200 rounded-lg mx-auto"></div>
          <div className="h-6 w-40 bg-slate-200 rounded-lg mx-auto"></div>

        </div>

      </div>

    )

  }

  if (!healthData) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">

        <Card className="max-w-lg text-center p-10">

          <h2 className="text-xl font-semibold mb-3">
            No Assessment Found
          </h2>

          <p className="text-slate-600 mb-6">
            Start your first assessment to begin tracking your musculoskeletal health.
          </p>

          <Button onClick={() => navigate("/assessment")}>
            Start Assessment
          </Button>

        </Card>

      </div>

    )

  }

  const current = healthData.currentAssessment
  const interpretation = getScoreInterpretation(current.overallScore)
  const hasHistory = progressData.length > 1

  const improvement = progressData.length > 1
    ? calculateImprovement(progressData[0].overallScore, current.overallScore)
    : 0

  return (

    <div className="min-h-screen bg-[#f5f5f7] py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f]">
              Your Health Dashboard
            </h1>

            <p className="text-[#6e6e73] mt-2">
              Track your musculoskeletal health and movement progress.
            </p>

          </div>

          <Button
            size="lg"
            className="bg-[#1DB954] hover:bg-[#17a94d] text-white"
            onClick={() => navigate("/assessment")}
          >
            New Assessment
          </Button>

        </div>


        {/* Primary Metrics */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <Card className="p-6 text-center">

            <p className="text-sm text-[#6e6e73] mb-2">
              Overall Score
            </p>

            <p className="text-5xl font-bold text-[#1DB954]">
              {current.overallScore}
            </p>

            <Badge className="mt-3">
              {interpretation.label}
            </Badge>

          </Card>

          <Card className="p-6">

            <p className="text-sm text-[#6e6e73] mb-2">
              Pain Level
            </p>

            <p className="text-2xl font-semibold mb-3">
              {current.painScore}
            </p>

            <div className="h-2 bg-slate-200 rounded">

              <div
                className="h-2 bg-red-500 rounded"
                style={{ width: `${current.painScore}%` }}
              />

            </div>

          </Card>

          <Card className="p-6">

            <p className="text-sm text-[#6e6e73] mb-2">
              Mobility
            </p>

            <p className="text-2xl font-semibold mb-3">
              {current.mobilityScore}
            </p>

            <div className="h-2 bg-slate-200 rounded">

              <div
                className="h-2 bg-amber-500 rounded"
                style={{ width: `${current.mobilityScore}%` }}
              />

            </div>

          </Card>

          <Card className="p-6">

            <p className="text-sm text-[#6e6e73] mb-2">
              Progress Trend
            </p>

            <p className="text-lg font-semibold">

              {improvement > 0
                ? "Improving"
                : improvement < 0
                ? "Declining"
                : "Stable"}

            </p>

          </Card>

        </div>


        {/* Chart Section */}

        {hasHistory && (

          <Card className="p-8 mb-12">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold">
                Progress Over Time
              </h2>

              <div className="flex gap-2">

                {Object.entries(TIME_RANGES).map(([key, value]) => (

                  <button
                    key={key}
                    onClick={() => setSelectedRange(key as TimeRange)}
                    className={`px-3 py-1 rounded text-sm transition ${
                      selectedRange === key
                        ? "bg-[#1DB954] text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >

                    {value.label}

                  </button>

                ))}

              </div>

            </div>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={progressData}>

                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                  <XAxis dataKey="date" stroke="#6e6e73" />

                  <YAxis domain={[0, 100]} stroke="#6e6e73" />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="overallScore"
                    stroke="#1DB954"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="painScore"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />

                  <Line
                    type="monotone"
                    dataKey="mobilityScore"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </Card>

        )}


        {/* Recommendations */}

        <Card className="p-8">

          <h2 className="text-xl font-semibold mb-4">
            Recommended Actions
          </h2>

          <ul className="space-y-3">

            {current.recommendations.map((rec: string, idx: number) => (

              <li
                key={idx}
                className="flex items-start gap-3"
              >

                <span className="text-[#1DB954] font-bold">
                  ✓
                </span>

                <span className="text-[#1d1d1f]">
                  {rec}
                </span>

              </li>

            ))}

          </ul>

        </Card>

      </div>

    </div>

  )

}

export default DashboardPage