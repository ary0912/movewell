'use client';

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { fetchHealthData } from "@services/assessmentService"

import { Card } from "@components/ui/Card"
import { Button } from "@components/ui/Button"
import InsightCard from "@components/ui/InsightCard"

import {
  getScoreInterpretation,
  calculateImprovement
} from "@utils/scoring"

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
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
  Calendar,
  TrendingUp,
  Sparkles,
  HeartPulse,
  BookOpen,
  Target,
  Flame,
  Zap,
  ShieldCheck,
  MoonStar,
  TimerReset,
  Dumbbell,
  ChevronRight
} from "lucide-react"

import type { HealthData } from "@/types"

function DashboardPage() {

  const navigate = useNavigate()

  const [healthData, setHealthData] =
    useState<HealthData | null>(null)

  const [loading, setLoading] =
    useState(true)

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

    <main className="min-h-screen overflow-x-hidden bg-clay-canvas">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-clay-brand-mint/10 blur-[120px]" />

        <div className="absolute right-[-200px] top-[300px] h-[500px] w-[500px] rounded-full bg-clay-brand-lavender/10 blur-[120px]" />

      </div>

      {/* MAIN */}
      <div className="relative z-10 px-4 pt-5 pb-16">

        <div
          className="
    mx-auto
    w-full
    max-w-[1280px]
    px-0
    space-y-8
  "
        >

          {/* HEADER */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >

            <div className="space-y-4">

              <div className="inline-flex items-center gap-3 rounded-full border border-clay-hairline bg-white/80 px-4 py-2 backdrop-blur-xl">

                <div className="h-2 w-2 rounded-full bg-clay-brand-teal animate-pulse" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-muted">
                  Live Recovery Dashboard
                </span>

              </div>

              <div className="space-y-2">

                <h1 className="text-[3rem] leading-[0.92] tracking-[-0.07em] text-clay-ink md:text-[4.9rem]">
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

            <div
              className="
    flex flex-col
    items-start
    gap-4
    sm:flex-row
    sm:items-center
    lg:flex-shrink-0
  "
            >

              <div className="flex items-center gap-3 rounded-2xl border border-clay-hairline bg-white/75 px-5 py-4 backdrop-blur-xl">

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

          </motion.section>

          {/* STATS */}
          <section
            className="
    grid
    grid-cols-12
    gap-6
    overflow-hidden
  "
          >
            {[
              {
                icon: Flame,
                label: "Recovery Score",
                value: `${Math.round(current.overallScore)}/100`,
                color: "bg-orange-50"
              },
              {
                icon: Target,
                label: "Mobility",
                value: `${Math.round(current.mobilityScore)}%`,
                color: "bg-blue-50"
              },
              {
                icon: HeartPulse,
                label: "Pain Level",
                value: `${Math.round(current.painScore)}%`,
                color: "bg-red-50"
              },
              {
                icon: Zap,
                label: "Performance",
                value: `${Math.round(current.impactScore)}%`,
                color: "bg-green-50"
              }
            ].map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08
                }}
                className="
                  col-span-12 sm:col-span-6 xl:col-span-3
                "
              >

                <Card
                  variant="cream"
                  className="
                    rounded-[32px]
                    border border-clay-hairline/60
                    bg-white/90
                    p-6
                    transition-all duration-300
                    hover:-translate-y-[3px]
                    hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <div className="text-[11px] uppercase tracking-[0.16em] text-clay-muted">
                        {item.label}
                      </div>

                      <div className="mt-4 text-4xl tracking-[-0.05em] text-clay-ink">
                        {item.value}
                      </div>

                    </div>

                    <div className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 hover:scale-105",
                      item.color
                    )}>
                      <item.icon className="h-6 w-6 text-clay-ink" />
                    </div>

                  </div>

                </Card>

              </motion.div>

            ))}

          </section>

          {/* HERO */}
          <Card
            variant="cream"
            className="
              rounded-[40px]
              border border-clay-hairline/60
              bg-white/85
              backdrop-blur-xl
              p-7 md:p-8
            "
          >

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-6">

                <div className="space-y-3">

                  <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-soft px-4 py-2">

                    <Sparkles className="h-4 w-4 text-clay-brand-teal" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-muted">
                      Recovery Score
                    </span>

                  </div>

                  <div className="flex items-end gap-4">

                    <div className="text-[4.8rem] leading-none tracking-[-0.08em] text-clay-ink md:text-[6rem]">
                      {Math.round(current.overallScore)}
                    </div>

                    <div className="pb-3 text-xl text-clay-muted">
                      /100
                    </div>

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

                      {improvement >= 0
                        ? <ArrowUpRight className="h-4 w-4" />
                        : <ArrowDownRight className="h-4 w-4" />
                      }

                      {Math.abs(improvement)}%
                      vs baseline

                    </div>

                  )}

                </div>

                <p className="max-w-xl text-[15px] leading-[1.8] text-clay-body">
                  Your recovery profile shows stable
                  mobility progression with moderate
                  improvements across pain management
                  and daily movement performance.
                </p>

              </div>

              {/* CHART */}
              <div
                className="
    h-[240px]
    w-full
    max-w-full
    lg:max-w-[380px]
    overflow-hidden
    rounded-[30px]
    bg-clay-surface-soft
    p-5
  "
              >

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
                          stopOpacity={0.22}
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
                        fontSize: 10,
                        fill: "#8b8b8b"
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "1px solid #ececec",
                        background: "#fff"
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="overallScore"
                      stroke="#163434"
                      strokeWidth={2.5}
                      fill="url(#fill)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

          </Card>

          {/* RECOVERY INTELLIGENCE */}
          <section className="space-y-4">

            <div>

              <div className="text-[11px] uppercase tracking-[0.18em] text-clay-muted">
                Recovery Intelligence
              </div>

              <h2 className="mt-2 text-3xl tracking-[-0.05em] text-clay-ink">
                Personalized movement insights.
              </h2>

            </div>

            <Tabs
              defaultValue="insights"
              className="space-y-8"
            >

              <TabsList
                className="
                  h-auto rounded-full border border-clay-hairline
                  bg-white/80 p-2 backdrop-blur-xl
                "
              >

                <TabsTrigger
                  value="insights"
                  className="rounded-full px-6 py-3 text-[13px]"
                >
                  Insights
                </TabsTrigger>

                <TabsTrigger
                  value="journal"
                  className="rounded-full px-6 py-3 text-[13px]"
                >
                  Journal
                </TabsTrigger>

              </TabsList>

              {/* INSIGHTS */}
              <TabsContent value="insights">

                <div
                  className="
    grid
    grid-cols-12
    gap-6
    overflow-hidden
  "
                >

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

                          <PolarGrid stroke="#dadada" />

                          <PolarAngleAxis
                            dataKey="subject"
                            tick={{
                              fill: "#6f6f6f",
                              fontSize: 12
                            }}
                          />

                          <PolarRadiusAxis tick={false} />

                          <Radar
                            dataKey="A"
                            stroke="#163434"
                            fill="#163434"
                            fillOpacity={0.16}
                            strokeWidth={2}
                          />

                        </RadarChart>

                      </ResponsiveContainer>

                    </div>

                  </Card>

                  {/* RIGHT PANEL */}
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

                    {/* MINI GRID */}
                    <div className="grid md:grid-cols-2 gap-6">

                      <Card
                        variant="cream"
                        className="rounded-[30px] bg-white/90 border border-clay-hairline/60 p-6"
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <div className="text-[11px] uppercase tracking-[0.16em] text-clay-muted">
                              Daily Readiness
                            </div>

                            <div className="mt-3 text-4xl tracking-[-0.05em] text-clay-ink">
                              82%
                            </div>

                            <p className="mt-3 text-sm leading-[1.7] text-clay-body">
                              Ready for moderate movement
                              intensity and recovery work.
                            </p>

                          </div>

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                            <ShieldCheck className="h-5 w-5 text-green-700" />
                          </div>

                        </div>

                      </Card>

                      <Card
                        variant="cream"
                        className="rounded-[30px] bg-white/90 border border-clay-hairline/60 p-6"
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <div className="text-[11px] uppercase tracking-[0.16em] text-clay-muted">
                              Recovery Risk
                            </div>

                            <div className="mt-3 text-4xl tracking-[-0.05em] text-clay-ink">
                              Low
                            </div>

                            <p className="mt-3 text-sm leading-[1.7] text-clay-body">
                              Pain indicators are stable
                              without aggressive flare-ups.
                            </p>

                          </div>

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                            <TimerReset className="h-5 w-5 text-red-600" />
                          </div>

                        </div>

                      </Card>

                    </div>

                    {/* WEEKLY GOAL */}
                    <Card
                      variant="cream"
                      className="
                        rounded-[34px]
                        border border-clay-hairline/60
                        bg-white/90
                        p-7
                      "
                    >

                      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                        <div className="space-y-4">

                          <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-soft px-4 py-2">

                            <Dumbbell className="h-4 w-4 text-clay-brand-teal" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-muted">
                              Weekly Goal
                            </span>

                          </div>

                          <div>

                            <h3 className="text-2xl tracking-[-0.04em] text-clay-ink">
                              4 / 5 mobility sessions completed
                            </h3>

                            <p className="mt-3 max-w-xl text-[15px] leading-[1.8] text-clay-body">
                              You’re maintaining consistent
                              movement therapy habits this week.
                            </p>

                          </div>

                        </div>

                        <div className="w-full max-w-[240px]">

                          <div className="mb-3 flex items-center justify-between text-sm">

                            <span className="text-clay-muted">
                              Weekly Progress
                            </span>

                            <span className="font-semibold text-clay-ink">
                              80%
                            </span>

                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-clay-surface-soft">

                            <div className="h-full w-[80%] rounded-full bg-clay-brand-teal" />

                          </div>

                        </div>

                      </div>

                    </Card>

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
                          Track stiffness, soreness,
                          movement quality, energy levels,
                          and physical observations.
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

                      <div className="flex items-center gap-2 text-sm text-clay-muted">

                        <MoonStar className="h-4 w-4" />

                        Auto-saved & encrypted

                      </div>

                      <Button className="gap-2">

                        Save Journal Entry

                        <ChevronRight className="h-4 w-4" />

                      </Button>

                    </div>

                  </div>

                </Card>

              </TabsContent>

            </Tabs>

          </section>

        </div>

      </div>

    </main>
  )
}

export default DashboardPage