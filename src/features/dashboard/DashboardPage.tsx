'use client';

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchHealthData } from "@services/assessmentService"
import { Card } from "@components/ui/Card"
import { Button } from "@components/ui/Button"
import KpiStrip from '@components/ui/KpiStrip'
import { getScoreInterpretation, calculateImprovement } from "@utils/scoring"
import { TIME_RANGES } from "@utils/constants"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs"
import { cn } from "@/lib/utils"
import type { HealthData } from "@/types"

function DashboardPage() {
  const navigate = useNavigate()
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRange, setSelectedRange] = useState<string>("WEEK")

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-40 bg-muted rounded mx-auto"></div>
          <div className="h-2 w-24 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!healthData?.history?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="p-12 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-3 text-foreground">No data yet</h2>
          <p className="text-muted-foreground mb-8">
            Start an assessment to generate insights.
          </p>
          <Button onClick={() => navigate("/assessment")}>
            Start assessment
          </Button>
        </Card>
      </div>
    )
  }

  const current = healthData.history[healthData.history.length - 1]
  const interpretation = getScoreInterpretation(current.overallScore)

  const improvement = healthData.history.length > 1
    ? calculateImprovement(
        healthData.history[0].overallScore,
        current.overallScore
      )
    : null

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-6xl mx-auto px-6 space-y-20">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">

          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Dashboard
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Your health <span className="text-muted-foreground">overview</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
              Track how your body evolves over time through consistent assessments.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => navigate("/assessment")}
          >
            New assessment
          </Button>
        </div>


        <Tabs defaultValue="insights" className="space-y-12">

          {/* TABS */}
          <TabsList className="bg-muted/10 border border-border rounded-xl p-1">
            <TabsTrigger value="insights" className="px-6 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Insights
            </TabsTrigger>
            <TabsTrigger value="analytics" className="px-6 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Analytics
            </TabsTrigger>
          </TabsList>


          {/* INSIGHTS */}
          <TabsContent value="insights" className="space-y-12">

            {/* MAIN SCORE */}
            <Card className="p-12 flex flex-col md:flex-row justify-between items-center gap-10">

              <div>
                <p className="text-xs text-muted-foreground uppercase mb-2">
                  Current Score
                </p>

                <div className="flex items-baseline gap-3">
                  <span className="text-[5rem] font-semibold tracking-tight text-foreground">
                    {Math.round(current.overallScore)}
                  </span>
                  <span className="text-xl text-muted-foreground">/100</span>
                </div>
              </div>

              <div className="text-center md:text-right space-y-2">
                <p className="text-lg font-medium text-muted-foreground">
                  {interpretation.label}
                </p>

                {improvement !== null && (
                  <p className={cn(
                    "text-sm font-medium",
                    improvement >= 0 ? "text-emerald-600" : "text-red-500"
                  )}>
                    {improvement >= 0
                      ? `+${improvement}% improvement`
                      : `${improvement}% decline`}
                  </p>
                )}
              </div>

            </Card>


            {/* METRICS */}
            <KpiStrip items={[
              { label: 'Pain', value: Math.round(current.painScore) },
              { label: 'Mobility', value: Math.round(current.mobilityScore) },
              { label: 'Impact', value: Math.round(current.impactScore) }
            ]} />


            {/* CTA */}
            <div className="text-center pt-6">
              <Button
                variant="primary"
                onClick={() => navigate("/assessment")}
              >
                Update your data
              </Button>
            </div>

          </TabsContent>


          {/* ANALYTICS */}
          <TabsContent value="analytics">

            <Card className="p-12">

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">

                <div>
                  <h2 className="text-2xl font-semibold">
                    Progress over time
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Your score trend across assessments
                  </p>
                </div>

                <div className="flex gap-2">
                  {Object.keys(TIME_RANGES).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedRange(key)}
                      className={cn(
                        "px-4 py-2 text-xs rounded-lg",
                        selectedRange === key
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/10 text-muted-foreground"
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>

              </div>


              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData.history}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="overallScore"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </Card>

          </TabsContent>

        </Tabs>

      </div>
    </div>
  )
}

export default DashboardPage