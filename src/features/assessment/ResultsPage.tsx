'use client';

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAssessment } from "@context/AssessmentContext"
import { fetchHealthData } from "@services/assessmentService"
import { Card } from "@components/ui/Card"
import { Button } from "@components/ui/Button"
import Badge from "@components/ui/Badge"
import { getScoreInterpretation, calculateImprovement } from "@utils/scoring"
import { cn } from "@/lib/utils"

function ResultsPage() {
  const navigate = useNavigate()
  const { result } = useAssessment()
  const [healthData, setHealthData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse h-4 w-48 bg-slate-200 rounded"></div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <Card className="max-w-md w-full p-12 text-center border-slate-200 bg-white shadow-sm">
          <Badge variant="neutral" className="mb-6">Session Incomplete</Badge>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No Data Synthesized</h2>
          <p className="text-slate-500 mb-10 text-sm leading-relaxed">
            Your anatomical signals haven't been mapped yet. Complete the baseline initialization to see your results.
          </p>
          <Button 
            variant="clinical"
            className="w-full" 
            onClick={() => navigate("/assessment")}
          >
            Start Assessment
          </Button>
        </Card>
      </div>
    )
  }

  const interpretation = getScoreInterpretation(result.overallScore)
  const previousScore = healthData?.history?.[healthData.history.length - 2]?.overallScore
  const improvement = previousScore ? calculateImprovement(previousScore, result.overallScore) : null

  return (
    <div className="min-h-screen py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Diagnostic Header */}
        <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge variant="neutral" className="mb-6 bg-slate-100 text-slate-500 border-slate-200 px-6 py-2 uppercase tracking-[0.2em] text-[10px]">
            Biomechanical Synthesis Finalized
          </Badge>
          <h1 className="text-5xl md:text-[5rem] font-bold tracking-tight text-slate-900 leading-none">
            Your Health <br />
            <span className="text-slate-400">Blueprint.</span>
          </h1>
        </div>

        {/* Score Overview */}
        <div className="space-y-16">
          <Card className="p-12 md:p-16 bg-white border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-4">Baseline Score</p>
              <div className="flex items-baseline gap-4">
                <span className="text-8xl md:text-[10rem] font-bold tracking-tighter text-slate-900 leading-none">
                  {result.overallScore}
                </span>
                <span className="text-2xl font-bold text-slate-200">/100</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
              <Badge variant="success" className="px-8 py-3 rounded-xl font-bold text-base">
                {interpretation.label}
              </Badge>
              {improvement !== null && (
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <span className={cn("w-2 h-2 rounded-full", improvement >= 0 ? "bg-emerald-500" : "bg-red-500")} />
                  {improvement >= 0 ? `+${improvement}% Progression` : `${improvement}% Regression`}
                </div>
              )}
            </div>
          </Card>

          {/* Metric Vectors */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Pain Signal", value: result.painScore, color: "bg-red-500" },
              { label: "Mobility Flow", value: result.mobilityScore, color: "bg-emerald-500" },
              { label: "Impact Factor", value: result.impactScore, color: "bg-emerald-500" }
            ].map((metric) => (
              <Card key={metric.label} className="p-8 bg-white border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                <p className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-6">{metric.label}</p>
                <p className="text-4xl font-bold text-slate-900 mb-6 tabular-nums">{metric.value}</p>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full transition-all duration-1000", metric.color)} style={{ width: `${metric.value}%` }} />
                </div>
              </Card>
            ))}
          </div>

          {/* Protocol Synthesis */}
          <div className="space-y-8 pt-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Active Recovery Protocol.</h2>
              <p className="text-slate-500 font-medium">Personalized vectors generated by movement intelligence.</p>
            </div>

            <div className="grid gap-4">
              {result.recommendations.map((rec, idx) => (
                <Card key={idx} className="p-8 border-slate-200 bg-white shadow-sm flex items-center gap-8 group hover:bg-slate-50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold text-sm border border-slate-200">
                    0{idx + 1}
                  </div>
                  <p className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {rec}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-16">
            <Button 
              variant="clinical" 
              size="lg"
              className="px-12"
              onClick={() => navigate("/dashboard")}
            >
              Enter Dashboard
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="px-12"
              onClick={() => navigate("/assessment")}
            >
              Recalibrate Baseline
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage