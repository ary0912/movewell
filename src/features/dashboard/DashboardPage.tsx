'use client';

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchHealthData } from "@services/assessmentService"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/Card"
import { Button } from "@components/ui/Button"
import Badge from "@components/ui/Badge"
import { getScoreInterpretation, calculateImprovement, generateInsightText } from "@utils/scoring"
import { TIME_RANGES } from "@utils/constants"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs"
import { cn } from "@/lib/utils"

function DashboardPage() {
  const navigate = useNavigate()
  const [healthData, setHealthData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRange, setSelectedRange] = useState<any>("WEEK")
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

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
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-48 bg-slate-200 rounded mx-auto"></div>
          <div className="h-2 w-32 bg-slate-200 rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!healthData || !healthData.history || healthData.history.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <Card className="max-w-md w-full p-12 text-center border-slate-200 bg-white">
          <Badge variant="neutral" className="mb-6">Signal Offline</Badge>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No Baseline Detected</h2>
          <p className="text-slate-500 mb-10 text-sm leading-relaxed">
            We need an initial diagnostic baseline to begin generating movement intelligence.
          </p>
          <Button 
            variant="clinical"
            className="w-full" 
            onClick={() => navigate("/assessment")}
          >
            Initialize Assessment
          </Button>
        </Card>
      </div>
    )
  }

  const current = healthData.history[healthData.history.length - 1]
  const interpretation = getScoreInterpretation(current.overallScore)
  const improvement = healthData.history.length > 1 
    ? calculateImprovement(healthData.history[0].overallScore, current.overallScore)
    : 0

  const toggleTask = (task: string) => {
    setCompletedTasks(prev => 
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    )
  }

  return (
    <div className="min-h-screen py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <Badge variant="neutral" className="mb-4 bg-slate-100 text-slate-500 border-slate-200 px-4">Active Profile: Default</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">
              Health <span className="text-slate-400">Blueprint.</span>
            </h1>
            <p className="text-slate-500 font-medium mt-6 max-w-lg">
              Biomechanical synthesis suggests {interpretation.label.toLowerCase()} performance levels.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate("/assessment")}
          >
            Update Baseline
          </Button>
        </div>

        <Tabs defaultValue="insights" className="w-full space-y-12">
          <TabsList className="bg-slate-100 border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="insights" className="px-8 py-2 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm">
              Insights
            </TabsTrigger>
            <TabsTrigger value="analytics" className="px-8 py-2 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-12 animate-in fade-in duration-500">
            {/* Primary Metrics Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              <Card className="lg:col-span-8 p-12 bg-white border-slate-200 flex flex-col justify-between min-h-[350px] shadow-sm">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">Overall Performance Score</p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-8xl md:text-[9rem] font-bold tracking-tighter text-slate-900 leading-none">
                      {Math.round(current.overallScore)}
                    </span>
                    <span className="text-2xl font-bold text-slate-200">/100</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-8">
                  <Badge variant="success" className="px-6 py-2 rounded-lg font-bold">
                    {interpretation.label}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                    <span className={cn("w-2 h-2 rounded-full", improvement >= 0 ? "bg-emerald-500" : "bg-red-500")} />
                    {improvement >= 0 ? `+${improvement}% Progression` : `${improvement}% Regression`}
                  </div>
                </div>
              </Card>

              <div className="lg:col-span-4 grid gap-8">
                {[
                  { label: "Pain Signal", value: current.painScore, color: "bg-red-500" },
                  { label: "Mobility Flow", value: current.mobilityScore, color: "bg-emerald-500" }
                ].map(metric => (
                  <Card key={metric.label} className="p-8 bg-white border-slate-200 flex flex-col justify-between hover:bg-slate-50 transition-colors shadow-sm">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{metric.label}</p>
                      <p className="text-3xl font-bold text-slate-900 tabular-nums">{Math.round(metric.value)}</p>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-6">
                      <div className={cn("h-full transition-all duration-1000", metric.color)} style={{ width: `${metric.value}%` }} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recovery Protocol */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Active Protocol</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {(current.recommendations || []).map((rec: string, idx: number) => {
                  const isCompleted = completedTasks.includes(rec)
                  return (
                    <Card 
                      key={idx} 
                      onClick={() => toggleTask(rec)}
                      className={cn(
                        "p-8 cursor-pointer transition-all duration-300 border-slate-200 hover:-translate-y-1",
                        isCompleted ? "bg-slate-50 opacity-50" : "bg-white shadow-sm"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition-all",
                          isCompleted ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 text-transparent"
                        )}>
                          ✓
                        </div>
                        <div>
                          <p className={cn("text-lg font-bold leading-tight", isCompleted ? "line-through text-slate-400" : "text-slate-900")}>
                            {rec}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">
                            {isCompleted ? "Completed" : "Daily Priority"}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="animate-in fade-in duration-500">
            <Card className="p-12 bg-white border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">Biomechanical Evolution</h2>
                  <p className="text-slate-500 font-medium mt-1">Longitudinal data stream of overall performance score.</p>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl gap-1 border border-slate-200">
                  {Object.keys(TIME_RANGES).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedRange(key as any)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all",
                        selectedRange === key ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData.history}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                      dy={20}
                    />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#0f172a' }}
                      itemStyle={{ fontWeight: 700, fontSize: '12px' }}
                    />
                    <Line type="monotone" dataKey="overallScore" stroke="#10b981" strokeWidth={4} dot={false} animationDuration={2000} />
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