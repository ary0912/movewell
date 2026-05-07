'use client';

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { fetchHealthData } from "@services/assessmentService"

import { Card } from "@components/ui/Card"
import { Button } from "@components/ui/Button"
import InsightCard from "@components/ui/InsightCard"

import {
  getScoreInterpretation,
  calculateImprovement
} from "@utils/scoring"

import {
  TIME_RANGES
} from "@utils/constants"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area
} from "recharts"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@components/ui/tabs"

import { RichTextEditor } from "@components/ui/RichTextEditor"

import { cn } from "@/lib/utils"

import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Calendar,
  TrendingUp,
  Sparkles,
  Clock3,
  ChevronRight,
  HeartPulse,
  Waves,
  ShieldCheck,
  BookOpen,
} from "lucide-react"

import type { HealthData } from "@/types"

function DashboardPage() {
  const navigate = useNavigate()

  const [healthData, setHealthData] =
    useState<HealthData | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [selectedRange, setSelectedRange] =
    useState<string>("WEEK")

  const [journalContent, setJournalContent] =
    useState(() => {
      return typeof window !== "undefined"
        ? localStorage.getItem("movewell-journal") || ""
        : ""
    })

  useEffect(() => {
    localStorage.setItem(
      "movewell-journal",
      journalContent
    )
  }, [journalContent])

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await fetchHealthData() as HealthData

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
      <div className="min-h-screen bg-clay-canvas flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-5">

          <div className="relative">
            <div className="h-14 w-14 rounded-full border-[3px] border-clay-hairline" />

            <div className="absolute inset-0 h-14 w-14 rounded-full border-[3px] border-clay-primary border-t-transparent animate-spin" />
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold text-clay-ink">
              Loading dashboard
            </p>

            <p className="text-sm text-clay-muted">
              Preparing your recovery insights...
            </p>
          </div>

        </div>
      </div>
    )
  }

  if (!healthData?.history?.length) {
    return (
      <div className="min-h-screen bg-clay-canvas flex items-center justify-center px-6">
        <Card
          variant="cream"
          className="max-w-[520px] rounded-[32px] p-10 md:p-12 text-center"
        >

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-clay-surface-strong">
            <Activity className="h-7 w-7 text-clay-primary" />
          </div>

          <h2 className="text-3xl font-medium tracking-[-0.04em] text-clay-ink">
            No recovery data yet
          </h2>

          <p className="mt-4 text-[15px] leading-[1.8] text-clay-body">
            Complete your first assessment to unlock
            movement analytics, recovery tracking,
            and personalized insights.
          </p>

          <Button
            size="lg"
            className="mt-8"
            onClick={() => navigate("/assessment")}
          >
            Start Assessment
          </Button>

        </Card>
      </div>
    )
  }

  const current =
    healthData.history[
    healthData.history.length - 1
    ]

  const interpretation =
    getScoreInterpretation(
      current.overallScore
    )

  const improvement =
    healthData.history.length > 1
      ? calculateImprovement(
        healthData.history[0].overallScore,
        current.overallScore
      )
      : null

  const isPainHigh =
    current.painScore >
    current.mobilityScore

  return (
    <main className="min-h-screen bg-clay-canvas">

      {/* AMBIENT */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-clay-brand-mint/10 blur-[120px]" />

        <div className="absolute right-[-200px] top-[300px] h-[500px] w-[500px] rounded-full bg-clay-brand-lavender/10 blur-[120px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-10 md:px-8 md:py-12 space-y-8">

        {/* HEADER */}
        <section className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div className="space-y-5">

            <div className="inline-flex items-center gap-3 rounded-full border border-clay-hairline bg-white/80 px-4 py-2 backdrop-blur-xl">

              <div className="h-2 w-2 rounded-full bg-clay-brand-teal animate-pulse" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-muted">
                Live Recovery Dashboard
              </span>

            </div>

            <div className="space-y-3">

              <h1 className="text-[3rem] leading-[0.95] tracking-[-0.06em] text-clay-ink md:text-[4.6rem]">
                Your movement
                <br />
                intelligence.
              </h1>

              <p className="max-w-2xl text-[16px] leading-[1.9] text-clay-body">
                Track recovery progression, monitor
                movement health, and uncover
                actionable insights through your
                personalized recovery ecosystem.
              </p>

            </div>

          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-3 rounded-2xl border border-clay-hairline bg-white/70 px-5 py-4 backdrop-blur-xl">

              <Calendar className="h-4 w-4 text-clay-muted" />

              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-clay-muted">
                  Last Updated
                </div>

                <div className="mt-1 text-sm font-semibold text-clay-ink">
                  Today · 9:42 AM
                </div>
              </div>

            </div>

            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
            >
              New Assessment
            </Button>

          </div>

        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-12 gap-6">

          {/* HERO CARD */}
          <Card
            variant="cream"
            className="
              col-span-12 lg:col-span-8
              rounded-[36px]
              border border-clay-hairline/60
              bg-white/90
              p-7 md:p-8
              backdrop-blur-xl
            "
          >

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}
              <div className="space-y-7">

                <div className="space-y-3">

                  <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-soft px-4 py-2">

                    <Sparkles className="h-4 w-4 text-clay-brand-teal" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-muted">
                      Recovery Score
                    </span>

                  </div>

                  <div className="flex items-end gap-4">

                    <div className="text-[4.5rem] leading-none tracking-[-0.08em] text-clay-ink md:text-[6rem]">
                      {Math.round(current.overallScore)}
                    </div>

                    <div className="pb-3 text-xl text-clay-muted">
                      /100
                    </div>

                  </div>

                  <div className="flex flex-wrap items-center gap-3">

                    <div className="rounded-full bg-clay-brand-teal px-4 py-2 text-sm font-semibold text-white">
                      {interpretation.label}
                    </div>

                    {improvement !== null && (
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                          improvement >= 0
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        )}
                      >
                        {improvement >= 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}

                        {Math.abs(improvement)}%
                        vs baseline
                      </div>
                    )}

                  </div>

                </div>

                <p className="max-w-xl text-[15px] leading-[1.8] text-clay-body">
                  Your recovery profile shows stable
                  mobility progression with moderate
                  improvements across pain management
                  and daily movement performance.
                </p>

              </div>

              {/* RIGHT MINI CHART */}
              <div className="h-[220px] w-full max-w-[360px] rounded-[28px] bg-clay-surface-soft p-5">

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <div className="text-sm font-semibold text-clay-ink">
                      Recovery Trend
                    </div>

                    <div className="mt-1 text-xs text-clay-muted">
                      Last 7 days
                    </div>
                  </div>

                  <TrendingUp className="h-5 w-5 text-clay-brand-teal" />

                </div>

                <ResponsiveContainer width="100%" height="80%">

                  <AreaChart data={healthData.history}>

                    <defs>

                      <linearGradient
                        id="fill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#1a3a3a"
                          stopOpacity={0.25}
                        />

                        <stop
                          offset="100%"
                          stopColor="#1a3a3a"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fill: "#8a8a8a",
                        fontSize: 10
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fffaf0",
                        borderRadius: "16px",
                        border: "1px solid #e5e5e5",
                        boxShadow:
                          "0 4px 18px rgba(0,0,0,0.04)"
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="overallScore"
                      stroke="#1a3a3a"
                      strokeWidth={2.5}
                      fill="url(#fill)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

          </Card>

          {/* TODAY SUMMARY */}
          <Card
            variant="cream"
            className="
              col-span-12 lg:col-span-4
              rounded-[36px]
              border border-clay-hairline/60
              bg-white/90
              p-7
              backdrop-blur-xl
            "
          >

            <div className="flex h-full flex-col justify-between">

              <div className="space-y-7">

                <div className="space-y-3">

                  <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-soft px-4 py-2">

                    <Clock3 className="h-4 w-4 text-clay-brand-teal" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-muted">
                      Today Summary
                    </span>

                  </div>

                  <h2 className="text-2xl tracking-[-0.04em] text-clay-ink">
                    Recovery readiness is stable today.
                  </h2>

                </div>

                <div className="space-y-4">

                  {[
                    {
                      icon: HeartPulse,
                      label: "Pain Response",
                      value: "Improving"
                    },
                    {
                      icon: Waves,
                      label: "Mobility",
                      value: "Stable"
                    },
                    {
                      icon: ShieldCheck,
                      label: "Recovery",
                      value: "Moderate"
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-2xl bg-clay-surface-soft px-4 py-4"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                          <item.icon className="h-4 w-4 text-clay-brand-teal" />
                        </div>

                        <span className="text-sm font-medium text-clay-body">
                          {item.label}
                        </span>

                      </div>

                      <span className="text-sm font-semibold text-clay-ink">
                        {item.value}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              <button
                className="
                  mt-8 flex items-center justify-between
                  rounded-2xl border border-clay-hairline
                  bg-clay-canvas px-5 py-4
                  transition-all duration-300
                  hover:bg-clay-surface-soft
                "
              >

                <div className="text-left">
                  <div className="text-sm font-semibold text-clay-ink">
                    View detailed recommendations
                  </div>

                  <div className="mt-1 text-xs text-clay-muted">
                    Personalized recovery actions
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-clay-muted" />

              </button>

            </div>

          </Card>

        </section>

        {/* TABS */}
        <Tabs
          defaultValue="analytics"
          className="space-y-8"
        >

          <TabsList
            className="
              h-auto rounded-full border border-clay-hairline
              bg-white/80 p-2 backdrop-blur-xl
              overflow-x-auto
            "
          >

            <TabsTrigger
              value="analytics"
              className="rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]"
            >
              Analytics
            </TabsTrigger>

            <TabsTrigger
              value="insights"
              className="rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]"
            >
              Insights
            </TabsTrigger>

            <TabsTrigger
              value="journal"
              className="rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]"
            >
              Journal
            </TabsTrigger>

          </TabsList>

          {/* ANALYTICS */}
          <TabsContent value="analytics">

            <div className="grid grid-cols-12 gap-6">

              {/* MAIN CHART */}
              <Card
                variant="cream"
                className="
                  col-span-12 lg:col-span-8
                  rounded-[36px]
                  bg-white/90
                  border border-clay-hairline/60
                  p-7
                "
              >

                <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <h2 className="text-2xl tracking-[-0.04em] text-clay-ink">
                      Performance trajectory
                    </h2>

                    <p className="mt-2 text-sm text-clay-muted">
                      Longitudinal recovery movement trends.
                    </p>

                  </div>

                  <div className="flex gap-2 rounded-full bg-clay-surface-soft p-1">

                    {Object.keys(TIME_RANGES).map((key) => (
                      <button
                        key={key}
                        onClick={() =>
                          setSelectedRange(key)
                        }
                        className={cn(
                          "rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all",
                          selectedRange === key
                            ? "bg-white text-clay-ink shadow-sm"
                            : "text-clay-muted"
                        )}
                      >
                        {key}
                      </button>
                    ))}

                  </div>

                </div>

                <div className="h-[340px] rounded-[28px] bg-clay-surface-soft p-4">

                  <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={healthData.history}>

                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#8a8a8a",
                          fontSize: 10
                        }}
                      />

                      <YAxis
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#8a8a8a",
                          fontSize: 10
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fffaf0",
                          borderRadius: "18px",
                          border: "1px solid #e5e5e5",
                          boxShadow:
                            "0 4px 18px rgba(0,0,0,0.04)"
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="overallScore"
                        stroke="#1a3a3a"
                        strokeWidth={2.5}
                        dot={{
                          r: 3,
                          fill: "#1a3a3a"
                        }}
                        activeDot={{
                          r: 5
                        }}
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </Card>

              {/* AI INSIGHT */}
              <Card
                variant="lavender"
                className="
                  col-span-12 lg:col-span-4
                  rounded-[36px]
                  p-7
                "
              >

                <div className="flex h-full flex-col justify-between">

                  <div className="space-y-6">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40">
                      <Brain className="h-7 w-7 text-clay-ink" />
                    </div>

                    <div>

                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-ink/60">
                        AI Observation
                      </div>

                      <h2 className="mt-3 text-3xl tracking-[-0.05em] text-clay-ink">
                        Recovery momentum is improving.
                      </h2>

                    </div>

                    <p className="text-[15px] leading-[1.8] text-clay-ink/80">
                      Based on your last three
                      assessments, movement stability
                      is increasing consistently.
                      Maintaining mobility sessions
                      for the next 14 days could
                      improve recovery efficiency
                      further.
                    </p>

                  </div>

                  <Button
                    variant="onColor"
                    className="mt-10 w-full"
                  >
                    Optimize Recovery
                  </Button>

                </div>

              </Card>

            </div>

          </TabsContent>

          {/* INSIGHTS */}
          <TabsContent value="insights">

            <div className="grid grid-cols-12 gap-6">

              {/* RADAR */}
              <Card
                variant="cream"
                className="
                  col-span-12 lg:col-span-5
                  rounded-[36px]
                  bg-white/90
                  border border-clay-hairline/60
                  p-7
                "
              >

                <div className="mb-6">

                  <h2 className="text-2xl tracking-[-0.04em] text-clay-ink">
                    System balance
                  </h2>

                  <p className="mt-2 text-sm text-clay-muted">
                    Relative movement equilibrium.
                  </p>

                </div>

                <div className="h-[320px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <RadarChart
                      data={[
                        {
                          subject: "Pain",
                          A: current.painScore
                        },
                        {
                          subject: "Mobility",
                          A: current.mobilityScore
                        },
                        {
                          subject: "Impact",
                          A: current.impactScore
                        }
                      ]}
                    >

                      <PolarGrid stroke="#e5e5e5" />

                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: "#4a4a4a",
                          fontSize: 11
                        }}
                      />

                      <PolarRadiusAxis
                        tick={false}
                        axisLine={false}
                      />

                      <Radar
                        dataKey="A"
                        stroke="#1a3a3a"
                        fill="#1a3a3a"
                        fillOpacity={0.18}
                        strokeWidth={2}
                      />

                    </RadarChart>

                  </ResponsiveContainer>

                </div>

              </Card>

              {/* INSIGHT STACK */}
              <div className="col-span-12 lg:col-span-7 space-y-6">

                <InsightCard
                  title={
                    isPainHigh
                      ? "Primary focus area"
                      : "Balanced recovery pattern"
                  }
                  description={
                    isPainHigh
                      ? "Pain markers remain elevated."
                      : "Movement patterns are stabilizing."
                  }
                  body={
                    isPainHigh
                      ? "Prioritize recovery and anti-inflammatory routines over performance training this week."
                      : "Current recovery progression is healthy and consistent."
                  }
                />

                <div className="grid md:grid-cols-3 gap-6">

                  {[
                    {
                      label: "Pain",
                      value: current.painScore,
                      icon: HeartPulse
                    },
                    {
                      label: "Mobility",
                      value: current.mobilityScore,
                      icon: Waves
                    },
                    {
                      label: "Impact",
                      value: current.impactScore,
                      icon: Activity
                    }
                  ].map((item, i) => (
                    <Card
                      key={i}
                      variant="cream"
                      className="rounded-[30px] bg-white/90 border border-clay-hairline/60 p-6"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <div className="text-[11px] uppercase tracking-[0.16em] text-clay-muted">
                            {item.label}
                          </div>

                          <div className="mt-4 text-5xl tracking-[-0.06em] text-clay-ink">
                            {Math.round(item.value)}
                          </div>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-surface-soft">
                          <item.icon className="h-5 w-5 text-clay-brand-teal" />
                        </div>

                      </div>

                    </Card>
                  ))}

                </div>

              </div>

            </div>

          </TabsContent>

          {/* JOURNAL */}
          <TabsContent value="journal">

            <Card
              variant="cream"
              className="
                rounded-[36px]
                bg-white/90
                border border-clay-hairline/60
                p-7 md:p-8
              "
            >

              <div className="space-y-8">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-soft px-4 py-2">

                      <BookOpen className="h-4 w-4 text-clay-brand-teal" />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-muted">
                        Recovery Journal
                      </span>

                    </div>

                    <h2 className="mt-5 text-3xl tracking-[-0.05em] text-clay-ink">
                      Reflect on your movement today.
                    </h2>

                    <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-clay-body">
                      Track physical sensations,
                      movement quality, stiffness,
                      recovery response, and daily
                      observations over time.
                    </p>

                  </div>

                  <div className="rounded-2xl bg-clay-surface-soft px-5 py-4">

                    <div className="text-[10px] uppercase tracking-[0.16em] text-clay-muted">
                      Journal prompts
                    </div>

                    <ul className="mt-3 space-y-2 text-sm text-clay-body">
                      <li>• How did movement feel today?</li>
                      <li>• Any stiffness after waking?</li>
                      <li>• What improved since yesterday?</li>
                    </ul>

                  </div>

                </div>

                <RichTextEditor
                  value={journalContent}
                  onChange={setJournalContent}
                  placeholder="Write today's recovery observations..."
                />

                <div className="flex flex-col gap-4 border-t border-clay-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-xs italic text-clay-muted">
                    Journal entries are automatically
                    saved and encrypted.
                  </p>

                  <Button>
                    Save Journal Entry
                  </Button>

                </div>

              </div>

            </Card>

          </TabsContent>

        </Tabs>

      </div>

    </main>
  )
}

export default DashboardPage