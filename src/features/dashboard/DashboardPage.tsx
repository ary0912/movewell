/**
 * Dashboard Page
 * Professional UX-focused dashboard with clear information hierarchy
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
  Legend,
  ResponsiveContainer,
} from "recharts"

type TimeRange = keyof typeof TIME_RANGES

function DashboardPage() {
  const navigate = useNavigate()

  const [healthData, setHealthData] = useState<any>(null)
  const [progressData, setProgressData] = useState<any[]>([])
  const [selectedRange, setSelectedRange] = useState<TimeRange>("MONTH")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHealthData()
        setHealthData(data)

        const range = TIME_RANGES[selectedRange]
        const progress = await fetchProgressData("user-default", range.days)

        setProgressData(progress)
      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedRange])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="h-10 w-64 bg-slate-200 rounded-lg mx-auto"></div>
          <div className="h-6 w-40 bg-slate-200 rounded-lg mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!healthData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-lg text-center">
          <h2 className="text-xl font-semibold mb-3">No Assessment Found</h2>
          <p className="text-slate-600 mb-6">
            Start your first assessment to begin tracking your musculoskeletal
            health.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Health Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Track your musculoskeletal health progress over time
            </p>
          </div>

          <Button size="lg" onClick={() => navigate("/assessment")}>
            New Assessment
          </Button>
        </div>

        {/* Primary Metrics */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <Card className="text-center">
            <h3 className="text-sm text-slate-500 mb-2">Overall Score</h3>

            <p className="text-5xl font-bold text-primary-600">
              {current.overallScore}
            </p>

            <Badge className="mt-3">{interpretation.label}</Badge>
          </Card>

          <Card>
            <h3 className="text-sm text-slate-500 mb-2">Pain Level</h3>

            <p className="text-3xl font-semibold mb-3">
              {current.painScore}
            </p>

            <div className="h-2 rounded bg-slate-200">
              <div
                className="h-2 rounded bg-red-500"
                style={{ width: `${current.painScore}%` }}
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-sm text-slate-500 mb-2">Mobility</h3>

            <p className="text-3xl font-semibold mb-3">
              {current.mobilityScore}
            </p>

            <div className="h-2 rounded bg-slate-200">
              <div
                className="h-2 rounded bg-amber-500"
                style={{ width: `${current.mobilityScore}%` }}
              />
            </div>
          </Card>

        </div>

        {/* Progress Chart */}

        {hasHistory && (
          <Card className="mb-10">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">
                Health Progress
              </h2>

              <div className="flex gap-2">
                {Object.entries(TIME_RANGES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRange(key as TimeRange)}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedRange === key
                        ? "bg-primary-600 text-white"
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
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="overallScore"
                    stroke="#0284c7"
                    strokeWidth={2}
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

        {/* Summary */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <Card>
            <h3 className="text-sm text-slate-500 mb-2">
              Total Assessments
            </h3>

            <p className="text-3xl font-bold">
              {healthData.history.length}
            </p>
          </Card>

          <Card>
            <h3 className="text-sm text-slate-500 mb-2">
              Latest Assessment
            </h3>

            <p>
              {new Date(current.createdAt).toLocaleDateString()}
            </p>
          </Card>

          <Card>
            <h3 className="text-sm text-slate-500 mb-2">
              Trend
            </h3>

            <p className="font-semibold">
              {calculateImprovement(
                progressData[0].overallScore,
                current.overallScore
              ) > 0
                ? "Improving"
                : "Stable"}
            </p>
          </Card>

        </div>

        {/* Recommendations */}

        <Card>

          <h2 className="text-lg font-semibold mb-4">
            Recommendations
          </h2>

          <ul className="space-y-2">
            {current.recommendations.map((rec: string, idx: number) => (
              <li key={idx} className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>

        </Card>

      </div>
    </div>
  )
}

export default DashboardPage