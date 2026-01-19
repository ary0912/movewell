/**
 * Results Page - displays assessment results with scores and recommendations
 * Shows clear, non-clinical health insights with actionable next steps
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '@context/AssessmentContext'
import { fetchHealthData } from '@services/assessmentService'
import { getScoreInterpretation, calculateImprovement } from '@utils/scoring'
import { BODY_AREA_LABELS } from '@utils/constants'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'

function ResultsPage() {
  const navigate = useNavigate()
  const { result } = useAssessment()
  const [healthData, setHealthData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHealthData()
        setHealthData(data)
      } catch (err) {
        console.error('Error loading health data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (!result) {
      navigate('/assessment')
      return
    }

    loadData()
  }, [result, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-lg">
        <div className="max-w-2xl mx-auto px-lg">
          <div className="text-center py-xl">
            <div className="animate-pulse space-y-md">
              <div className="h-12 bg-slate-200 rounded-lg"></div>
              <div className="h-32 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return null
  }

  const interpretation = getScoreInterpretation(result.overallScore)
  const previousScore = healthData?.history[healthData?.history.length - 2]?.overallScore
  const improvement = previousScore ? calculateImprovement(previousScore, result.overallScore) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-lg">
      <div className="max-w-3xl mx-auto px-lg">
        {/* Header */}
        <div className="text-center mb-2xl animate-fadeInUp">
          <div className="inline-block mb-lg">
            <span className="inline-flex items-center gap-sm px-md py-sm bg-green-50 border border-green-200 rounded-full text-sm font-semibold text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Assessment Complete
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-md">
            Your Assessment Results
          </h1>
          <p className="text-slate-600 font-medium">
            Completed {new Date(result.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-lg bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="text-center">
            <div className="mb-md">
              <Badge variant={interpretation.color as any}>
                {interpretation.label}
              </Badge>
            </div>
            <div className="flex items-end justify-center gap-sm mb-md">
              <span className="text-6xl font-bold text-primary-600">
                {result.overallScore}
              </span>
              <span className="text-2xl text-primary-600 mb-md">/100</span>
            </div>

            {improvement !== null && (
              <div className="pt-md border-t border-primary-200">
                {improvement > 0 ? (
                  <p className="text-lg font-semibold text-green-600">
                    ↑ {improvement}% improvement since last assessment
                  </p>
                ) : improvement < 0 ? (
                  <p className="text-lg font-semibold text-orange-600">
                    ↓ {Math.abs(improvement)}% change from last assessment
                  </p>
                ) : (
                  <p className="text-lg text-slate-600">Consistent with last assessment</p>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-lg">
          <h2 className="text-xl font-semibold text-slate-900 mb-md">Summary</h2>
          <p className="text-slate-700 leading-relaxed">{result.summary}</p>
        </Card>

        {/* Component Scores */}
        <Card className="mb-lg">
          <h2 className="text-xl font-semibold text-slate-900 mb-md">Detailed Breakdown</h2>
          <div className="space-y-md">
            {/* Pain Score */}
            <div>
              <div className="flex items-center justify-between mb-sm">
                <span className="font-medium text-slate-900">Pain Level</span>
                <span className="text-lg font-bold text-slate-900">{result.painScore}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-danger-500 h-2 rounded-full"
                  style={{ width: `${result.painScore}%` }}
                  role="progressbar"
                  aria-valuenow={result.painScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <p className="text-sm text-slate-500 mt-sm">
                {result.painScore < 30 && 'You report minimal pain'}
                {result.painScore >= 30 && result.painScore < 60 && 'Pain is moderately affecting you'}
                {result.painScore >= 60 && 'Pain is significantly affecting your quality of life'}
              </p>
            </div>

            {/* Mobility Score */}
            <div>
              <div className="flex items-center justify-between mb-sm">
                <span className="font-medium text-slate-900">Mobility Difficulty</span>
                <span className="text-lg font-bold text-slate-900">{result.mobilityScore}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-warning-500 h-2 rounded-full"
                  style={{ width: `${result.mobilityScore}%` }}
                  role="progressbar"
                  aria-valuenow={result.mobilityScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <p className="text-sm text-slate-500 mt-sm">
                {result.mobilityScore < 30 && 'Your mobility is excellent'}
                {result.mobilityScore >= 30 && result.mobilityScore < 60 && 'Some movement limitations noted'}
                {result.mobilityScore >= 60 && 'Movement is significantly restricted'}
              </p>
            </div>

            {/* Impact Score */}
            <div>
              <div className="flex items-center justify-between mb-sm">
                <span className="font-medium text-slate-900">Daily Impact</span>
                <span className="text-lg font-bold text-slate-900">{result.impactScore}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{ width: `${result.impactScore}%` }}
                  role="progressbar"
                  aria-valuenow={result.impactScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <p className="text-sm text-slate-500 mt-sm">
                {result.impactScore < 30 && 'Minimal impact on daily activities'}
                {result.impactScore >= 30 && result.impactScore < 60 && 'Moderate impact on daily life'}
                {result.impactScore >= 60 && 'Significant limitation of daily activities'}
              </p>
            </div>
          </div>
        </Card>

        {/* Pain Areas */}
        <Card className="mb-lg">
          <h2 className="text-xl font-semibold text-slate-900 mb-md">Areas of Pain</h2>
          <div className="flex flex-wrap gap-sm">
            {result.formData.painAreas.map((area) => (
              <div key={area} className="bg-danger-50 border border-danger-200 rounded-lg p-md">
                <div className="font-medium text-danger-900 mb-sm">
                  {BODY_AREA_LABELS[area]}
                </div>
                <div className="text-sm text-danger-700">
                  Intensity: <span className="font-bold">{result.formData.painIntensity[area]}/10</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="mb-lg bg-green-50 border-green-200">
          <h2 className="text-xl font-semibold text-green-900 mb-md">Recommendations</h2>
          <ul className="space-y-sm">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-md text-green-900">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Privacy Notice */}
        <Card className="mb-lg bg-slate-100 border-slate-300">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Privacy Notice:</span> Your assessment data is securely stored and encrypted. It is never shared with third parties and is used only to provide you with personalized health insights.
          </p>
        </Card>

        {/* Actions */}
        <div className="flex gap-md">
          <Button fullWidth onClick={() => navigate('/dashboard')}>
            View Your Dashboard
          </Button>
          <Button fullWidth variant="secondary" onClick={() => navigate('/')}>
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
