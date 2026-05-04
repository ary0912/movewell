'use client';

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAssessment } from "@context/AssessmentContext"
import { fetchHealthData } from "@services/assessmentService"
import { Card } from "@components/ui/Card"
import { Button } from "@components/ui/Button"
import { getScoreInterpretation, calculateImprovement } from "@utils/scoring"
import { cn } from "@/lib/utils"
import type { HealthData } from "@/types"

function ResultsPage() {
  const navigate = useNavigate()
  const { result } = useAssessment()

  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHealthData() as HealthData
        setHealthData(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse h-4 w-40 bg-muted rounded" />
      </div>
    )
  }

  /* =========================
     EMPTY STATE
  ========================= */
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="p-12 text-center max-w-md">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            No data yet
          </h2>
          <p className="text-muted-foreground mb-8">
            Complete the assessment to see your results.
          </p>
          <Button onClick={() => navigate("/assessment")}>
            Start assessment
          </Button>
        </Card>
      </div>
    )
  }

  const interpretation = getScoreInterpretation(result.overallScore)
  const previousScore = healthData?.history?.[healthData.history.length - 2]?.overallScore
  const improvement = previousScore
    ? calculateImprovement(previousScore, result.overallScore)
    : null

  const mainInsight = () => {
    if (result.painScore > result.mobilityScore && result.painScore > result.impactScore) {
      return "Pain levels are your biggest concern right now."
    }
    if (result.mobilityScore > result.painScore && result.mobilityScore > result.impactScore) {
      return "Mobility limitations are affecting your movement."
    }
    return "Your condition is balanced but can be improved."
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-6 space-y-20">

        {/* =========================
            HERO SCORE (PREMIUM)
        ========================= */}
        <div className="text-center space-y-6">

          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Your Result
          </p>

          <div className="flex justify-center items-end gap-3">
            <span className="text-[5rem] md:text-[6rem] font-semibold tracking-tight text-foreground leading-none">
              {result.overallScore}
            </span>
            <span className="text-xl text-muted-foreground/40 mb-2">/100</span>
          </div>

          <p className="text-lg font-medium text-muted-foreground">
            {interpretation.label}
          </p>

          {improvement !== null && (
            <p
              className={cn(
                "text-sm font-medium",
                improvement >= 0
                  ? "text-emerald-600"
                  : "text-red-500"
              )}
            >
              {improvement >= 0
                ? `+${improvement}% improvement`
                : `${improvement}% decline`}
            </p>
          )}
        </div>


        {/* =========================
            MAIN INSIGHT
        ========================= */}
        <Card className="p-8 text-center">
          <p className="text-lg font-medium text-foreground leading-relaxed">
            {mainInsight()}
          </p>
        </Card>


        {/* =========================
            METRICS
        ========================= */}
        <div className="grid md:grid-cols-3 gap-6">

          {[
            { label: "Pain", value: result.painScore },
            { label: "Mobility", value: result.mobilityScore },
            { label: "Impact", value: result.impactScore }
          ].map((item) => (
            <Card
              key={item.label}
              className="p-6 text-center hover:-translate-y-1 transition-all duration-300"
            >

              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                {item.label}
              </p>

              <p className="text-3xl font-semibold text-foreground tabular-nums">
                {item.value}
              </p>

              <div className="mt-5 h-[3px] bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-700"
                  style={{ width: `${item.value}%` }}
                />
              </div>

            </Card>
          ))}

        </div>


        {/* =========================
            RECOMMENDATIONS
        ========================= */}
        <div className="space-y-6">

          <h2 className="text-xl font-semibold text-foreground">
            What to focus on
          </h2>

          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <Card
                key={i}
                className="p-5 flex items-start gap-4 hover:bg-muted/40 transition-all"
              >
                <div className="text-primary font-semibold text-sm mt-0.5">
                  {i + 1}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {rec}
                </p>
              </Card>
            ))}
          </div>

        </div>


        {/* =========================
            ACTIONS
        ========================= */}
        <div className="text-center space-y-5 pt-6">

          <Button
            size="lg"
            className="px-12"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>

          <button
            onClick={() => navigate("/assessment")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Retake assessment →
          </button>

        </div>

      </div>
    </div>
  )
}

export default ResultsPage