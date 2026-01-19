/**
 * Dashboard Page - shows current health status and progress tracking
 * Displays assessment history and trends over time
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchHealthData, fetchProgressData } from '@services/assessmentService'
import { getScoreInterpretation, calculateImprovement } from '@utils/scoring'
import { TIME_RANGES } from '@utils/constants'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type TimeRange = keyof typeof TIME_RANGES

function DashboardPage() {
  const navigate = useNavigate()
  const [healthData, setHealthData] = useState<any>(null)
  const [progressData, setProgressData] = useState<any[]>([])
  const [selectedRange, setSelectedRange] = useState<TimeRange>('MONTH')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHealthData()
        setHealthData(data)

        const range = TIME_RANGES[selectedRange]
        const progress = await fetchProgressData('user-default', range.days)
        setProgressData(progress)
      } catch (err) {
        console.error('Error loading dashboard data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedRange])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-lg">
        <div className="max-w-6xl mx-auto px-lg">
          <div className="animate-pulse space-y-md">
            <div className="h-12 bg-slate-200 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!healthData) {
    return (
      <div className="min-h-screen bg-slate-50 py-lg">
        <div className="max-w-6xl mx-auto px-lg text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-md">No Assessment Yet</h2>
          <p className="text-slate-600 mb-lg">
            Start your first assessment to begin tracking your musculoskeletal health.
          </p>
          <Button onClick={() => navigate('/assessment')}>
            Start Assessment
          </Button>
        </div>
      </div>
    )
  }

  const current = healthData.currentAssessment
  const hasHistory = progressData.length > 1
  const interpretation = current ? getScoreInterpretation(current.overallScore) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-lg">
      <div className="max-w-6xl mx-auto px-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2xl gap-md">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-md">
              Your Health Dashboard
            </h1>
            <p className="text-slate-600 font-medium">
              Track your musculoskeletal health progress over time
            </p>
          </div>
          <Button onClick={() => navigate('/assessment')} size="lg">
            + New Assessment
          </Button>
        </div>

        {/* Current Status */}
        {current && (
          <Card className="mb-lg bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Overall Score */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-primary-600 mb-md">Overall Health Score</h3>
                <div className="flex items-end justify-center gap-xs mb-md">
                  <span className="text-5xl font-bold text-primary-700">{current.overallScore}</span>
                  <span className="text-xl text-primary-600">/100</span>
                </div>
                <Badge variant={interpretation?.color as any}>
                  {interpretation?.label}
                </Badge>
              </div>

              {/* Component Scores */}
              <div className="space-y-md">
                <div>
                  <p className="text-sm text-primary-600 font-semibold mb-xs">Pain Level</p>
                  <p className="text-2xl font-bold text-slate-900">{current.painScore}</p>
                  <div className="w-full bg-slate-300 rounded-full h-2 mt-sm">
                    <div
                      className="bg-danger-500 h-2 rounded-full"
                      style={{ width: `${current.painScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-md">
                <div>
                  <p className="text-sm text-primary-600 font-semibold mb-xs">Mobility</p>
                  <p className="text-2xl font-bold text-slate-900">{current.mobilityScore}</p>
                  <div className="w-full bg-slate-300 rounded-full h-2 mt-sm">
                    <div
                      className="bg-warning-500 h-2 rounded-full"
                      style={{ width: `${current.mobilityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-primary-200 mt-lg pt-md">
              <p className="text-sm text-primary-700 leading-relaxed">
                <span className="font-semibold">Last Updated:</span> {new Date(current.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        )}

        {/* Progress Chart */}
        {hasHistory && progressData.length > 0 && (
          <Card className="mb-lg">
            <div className="mb-lg">
              <div className="flex items-center justify-between mb-md">
                <h2 className="text-xl font-semibold text-slate-900">Progress Over Time</h2>
                <div className="flex gap-sm">
                  {Object.entries(TIME_RANGES).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedRange(key as TimeRange)}
                      className={`px-md py-sm rounded-md text-sm font-medium transition-colors ${
                        selectedRange === key
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {value.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '0.5rem',
                      }}
                      formatter={(value) => [(value as number).toFixed(0), '']}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="overallScore"
                      stroke="#0284c7"
                      name="Overall Score"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="painScore"
                      stroke="#ef4444"
                      name="Pain Level"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mobilityScore"
                      stroke="#f59e0b"
                      name="Mobility"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-lg">
          <Card>
            <h3 className="text-sm font-semibold text-slate-600 mb-md">Total Assessments</h3>
            <p className="text-3xl font-bold text-slate-900">{healthData.history.length}</p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-slate-600 mb-md">Latest Assessment</h3>
            <p className="text-sm text-slate-900">
              {current ? new Date(current.createdAt).toLocaleDateString() : 'Never'}
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-slate-600 mb-md">
              {progressData.length > 1 ? 'Overall Trend' : 'Status'}
            </h3>
            {progressData.length > 1 && current ? (
              <p className="text-sm text-slate-900">
                {calculateImprovement(progressData[0].overallScore, current.overallScore) > 0 ? (
                  <span className="text-green-600 font-semibold">↑ Improving</span>
                ) : (
                  <span className="text-orange-600 font-semibold">→ Stable</span>
                )}
              </p>
            ) : (
              <p className="text-sm text-slate-600">First assessment</p>
            )}
          </Card>
        </div>

        {/* Recommendations */}
        {current && (
          <Card className="mb-lg bg-green-50 border-green-200">
            <h2 className="text-xl font-semibold text-green-900 mb-md">Recommendations</h2>
            <ul className="space-y-sm">
              {current.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="flex gap-md text-green-900">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-md">
          <Button fullWidth onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
