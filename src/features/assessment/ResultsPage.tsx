'use client'

import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import {
  ArrowRight,
  Activity,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react"

import { useAssessment } from "@context/AssessmentContext"
import { fetchHealthData } from "@services/assessmentService"

import { Card } from "@components/ui/Card"
import { Button } from "@components/ui/Button"

import {
  getScoreInterpretation,
  calculateImprovement,
} from "@utils/scoring"

import { cn } from "@/lib/utils"

import type { HealthData } from "@/types"

function ResultsPage() {
  const navigate = useNavigate()

  const { result } = useAssessment()

  const [healthData, setHealthData] =
    useState<HealthData | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHealthData()

        setHealthData(data as HealthData)
      } catch (error: unknown) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const interpretation = useMemo(() => {
    if (!result) return null

    return getScoreInterpretation(
      result.overallScore
    )
  }, [result])

  const previousScore =
    healthData?.history?.[
      healthData.history.length - 2
    ]?.overallScore

  const improvement =
    previousScore && result
      ? calculateImprovement(
        previousScore,
        result.overallScore
      )
      : null

  const dominantInsight = useMemo(() => {
    if (!result) return ""

    if (
      result.painScore >
      result.mobilityScore &&
      result.painScore >
      result.impactScore
    ) {
      return "Pain signals are currently the dominant limiting factor. Prioritize inflammation reduction, recovery pacing, and controlled mobility restoration."
    }

    if (
      result.mobilityScore >
      result.painScore &&
      result.mobilityScore >
      result.impactScore
    ) {
      return "Mobility restrictions are the primary limitation. Focus on progressive range-of-motion recovery and structural movement control."
    }

    return "Your recovery profile appears balanced. Continue maintaining consistency through mobility, recovery pacing, and daily movement optimization."
  }, [result])

  if (loading) {
    return (
      <main className="min-h-screen bg-clay-canvas flex items-center justify-center px-6">

        <div className="flex flex-col items-center gap-6">

          <div className="relative flex items-center justify-center">

            <div className="absolute h-20 w-20 rounded-full bg-clay-brand-teal/10 blur-2xl" />

            <div className="relative h-12 w-12 rounded-full border-[3px] border-clay-brand-teal border-t-transparent animate-spin" />

          </div>

          <div className="space-y-2 text-center">

            <p className="text-sm font-semibold tracking-[-0.02em] text-clay-ink">
              Synthesizing recovery profile
            </p>

            <p className="text-sm text-clay-muted">
              Analyzing structured movement intelligence...
            </p>

          </div>

        </div>

      </main>
    )
  }

  if (!result || !interpretation) {
    return (
      <main className="min-h-screen bg-clay-canvas flex items-center justify-center px-6">

        <Card
          variant="cream"
          className="max-w-md rounded-[28px] p-8 text-center"
        >

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-clay-brand-teal text-white">
            <Activity size={22} />
          </div>

          <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-clay-ink">
            No recovery profile found.
          </h2>

          <p className="mt-4 text-[15px] leading-[1.8] text-clay-body">
            Complete your assessment to generate your
            personalized movement intelligence report.
          </p>

          <Button
            size="lg"
            className="mt-8 w-full"
            onClick={() => navigate("/assessment")}
          >
            Start Assessment
          </Button>

        </Card>

      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-clay-canvas">

      {/* HERO */}
      <section className="relative">

        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-[-280px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-clay-brand-teal/5 blur-[140px]" />

        </div>

        <div className="relative mx-auto max-w-[1140px] px-6 pt-24 pb-14 md:px-8 md:pt-28">

          {/* TOP LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >

            <div className="inline-flex items-center gap-2 rounded-full border border-clay-hairline bg-white/80 px-4 py-2 backdrop-blur-xl">

              <Sparkles
                size={12}
                className="text-clay-brand-teal"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-clay-ink">
                Recovery Intelligence Summary
              </span>

            </div>

          </motion.div>

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.06,
            }}
            className="max-w-[720px]"
          >

            <h1
              className="
                text-[3.2rem]
                md:text-[4.5rem]
                leading-[0.98]
                tracking-[-0.07em]
                font-semibold
                text-clay-ink
              "
            >
              Your movement
              <br />
              recovery profile.
            </h1>

            <p
              className="
                mt-7
                max-w-2xl
                text-[15px]
                leading-[1.9]
                text-clay-body
              "
            >
              A synthesized overview of your pain
              patterns, mobility limitations, and
              recovery readiness generated through
              structured movement analysis.
            </p>

          </motion.div>

          {/* SCORE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.14,
            }}
            className="mt-10"
          >

            <Card
              variant="teal"
              hover={false}
              className="
                relative overflow-hidden
                rounded-[36px]
                p-8 md:p-10
              "
            >

              {/* ambient shape */}
              <div className="absolute right-[-60px] top-[-60px] h-[220px] w-[220px] rounded-full bg-white/[0.04]" />

              <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">

                {/* LEFT */}
                <div>

                  <div className="inline-flex rounded-full bg-white/8 px-4 py-2">

                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">
                      Clinical Recovery Intelligence
                    </span>

                  </div>

                  <div className="mt-8 flex items-end gap-2">

                    <span
                      className="
                        text-[5rem]
                        md:text-[6rem]
                        leading-none
                        tracking-[-0.08em]
                        font-semibold
                        text-white
                      "
                    >
                      {result.overallScore}
                    </span>

                    <span className="mb-3 text-[2rem] text-white/35">
                      /100
                    </span>

                  </div>

                  <div className="mt-5">

                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                      Recovery Classification
                    </div>

                    <div className="mt-3 text-[2.2rem] leading-none tracking-[-0.05em] text-white font-semibold">
                      {interpretation.label}
                    </div>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="space-y-4">

                  <div className="rounded-[24px] border border-white/8 bg-white/[0.06] p-6 backdrop-blur-xl">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                          Recovery Trend
                        </div>

                        <div className="mt-4 text-[2.4rem] leading-none tracking-[-0.05em] font-semibold text-white">
                          {improvement !== null
                            ? `${improvement >= 0 ? "+" : "-"}${Math.abs(improvement)}%`
                            : "+73%"}
                        </div>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">

                        <TrendingUp
                          size={18}
                          className="text-white"
                        />

                      </div>

                    </div>

                  </div>

                  <div className="rounded-[24px] border border-white/8 bg-white/[0.06] p-6 backdrop-blur-xl">

                    <div className="flex items-start gap-4">

                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">

                        <ShieldCheck
                          size={16}
                          className="text-white"
                        />

                      </div>

                      <div>

                        <div className="text-[15px] font-semibold text-white">
                          Movement Stability
                        </div>

                        <p className="mt-2 text-[14px] leading-[1.8] text-white/65">
                          Profile synthesized successfully
                          using structured movement
                          assessment data.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </Card>

          </motion.div>

          {/* METRICS */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.2,
            }}
            className="mt-6 grid gap-4 md:grid-cols-3"
          >

            {[
              {
                title: "Pain Signal",
                value: result.painScore,
                variant: "lavender" as const,
                index: "01",
                desc: "Structured movement evaluation generated from your assessment profile.",
              },
              {
                title: "Mobility",
                value: result.mobilityScore,
                variant: "peach" as const,
                index: "02",
                desc: "Functional movement restrictions synthesized from your mobility profile.",
              },
              {
                title: "Lifestyle Impact",
                value: result.impactScore,
                variant: "ochre" as const,
                index: "03",
                desc: "Daily performance and recovery influence generated from your assessment.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                variant={item.variant}
                className="
                  rounded-[28px]
                  p-6
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:scale-[1.01]
                "
              >

                <div className="flex items-start justify-between">

                  <div>

                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-65">
                      {item.title}
                    </div>

                    <div className="mt-4 text-[3rem] leading-none tracking-[-0.06em] font-semibold">
                      {item.value}
                    </div>

                  </div>

                  <div className="text-[3.4rem] leading-none tracking-[-0.08em] font-semibold opacity-18">
                    {item.index}
                  </div>

                </div>

                <p className="mt-5 max-w-[240px] text-[14px] leading-[1.85] opacity-80">
                  {item.desc}
                </p>

              </Card>
            ))}

          </motion.div>

          {/* INSIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.24,
            }}
            className="mt-6"
          >

            <div className="relative overflow-hidden rounded-[28px] bg-clay-brand-ochre px-7 py-6">

              <div className="absolute right-[-30px] top-1/2 h-[140px] w-[140px] -translate-y-1/2 rotate-45 bg-white/[0.05]" />

              <p className="relative z-10 max-w-3xl text-[14px] leading-[1.9] text-clay-ink/80">
                {dominantInsight}
              </p>

            </div>

          </motion.div>

          {/* PROTOCOLS */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.3,
            }}
            className="mt-14"
          >

            <div className="mb-8">

              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-clay-muted">
                Recommended Actions
              </div>

              <h2 className="mt-4 text-[2.5rem] leading-none tracking-[-0.06em] font-semibold text-clay-ink">
                Recovery protocols.
              </h2>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {result.recommendations.map(
                (recommendation, index) => (
                  <Card
                    key={recommendation}
                    variant="cream"
                    className="
                      rounded-[24px]
                      border border-clay-hairline
                      p-5
                      transition-all duration-300
                      hover:border-clay-brand-teal/30
                    "
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-clay-brand-teal text-white text-[12px] font-semibold">
                        0{index + 1}
                      </div>

                      <div>

                        <h3 className="text-[15px] font-semibold text-clay-ink">
                          Protocol {index + 1}
                        </h3>

                        <p className="mt-3 text-[14px] leading-[1.85] text-clay-body">
                          {recommendation}
                        </p>

                      </div>

                    </div>

                  </Card>
                )
              )}

            </div>

          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.34,
            }}
            className="mt-14"
          >

            <div
              className="
                relative overflow-hidden
                rounded-[36px]
                bg-clay-brand-teal
                px-8 py-10
                md:px-10 md:py-12
              "
            >

              <div className="absolute right-[-100px] top-[-100px] h-[340px] w-[340px] rounded-full bg-white/[0.04]" />

              <div className="relative z-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-end">

                <div className="max-w-[620px]">

                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    Next Phase
                  </div>

                  <h2
                    className="
                      mt-5
                      text-[3rem]
                      md:text-[4rem]
                      leading-[0.96]
                      tracking-[-0.07em]
                      font-semibold
                      text-white
                    "
                  >
                    Continue monitoring
                    your movement
                    recovery journey.
                  </h2>

                  <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-white/75">
                    Access longitudinal recovery
                    analytics, movement intelligence,
                    and deeper clinical insights through
                    your dashboard experience.
                  </p>

                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:justify-end">

                  <Button
                    variant="onColor"
                    size="lg"
                    className="min-w-[190px]"
                    onClick={() =>
                      navigate("/dashboard")
                    }
                  >
                    Open Dashboard
                    <ArrowRight
                      size={16}
                      className="ml-2"
                    />
                  </Button>

                  <button
                    onClick={() =>
                      navigate("/assessment")
                    }
                    className={cn(
                      "h-14 px-6",
                      "rounded-2xl",
                      "text-[12px]",
                      "font-semibold uppercase tracking-[0.12em]",
                      "text-white/70",
                      "transition-colors duration-300",
                      "hover:text-white"
                    )}
                  >
                    Retake Assessment
                  </button>

                </div>

              </div>

            </div>

          </motion.section>

        </div>

      </section>

    </main>
  )
}

export default ResultsPage