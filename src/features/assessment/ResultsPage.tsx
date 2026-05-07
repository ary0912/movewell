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
  HeartPulse,
  MoveRight,
  BrainCircuit,
} from "lucide-react"

import { useAssessment } from "@context/AssessmentContext"

import { fetchHealthData } from "@services/assessmentService"

import { Card } from "@components/ui/Card"
import { Button } from "@components/ui/Button"

import {
  getScoreInterpretation,
  calculateImprovement,
} from "@utils/scoring"

import type { HealthData } from "@/types"

function ResultsPage() {

  const navigate = useNavigate()

  const { result } = useAssessment()

  const [
    healthData,
    setHealthData,
  ] =
    useState<HealthData | null>(null)

  const [loading, setLoading] =
    useState(true)

  /* =====================================================
     FETCH
  ===================================================== */

  useEffect(() => {

    const load = async () => {

      try {

        const data =
          await fetchHealthData()

        setHealthData(
          data as HealthData
        )

      } catch (error: unknown) {

        console.error(error)

      } finally {

        setLoading(false)
      }
    }

    void load()

  }, [])

  /* =====================================================
     COMPUTED
  ===================================================== */

  const interpretation =
    useMemo(() => {

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

  const dominantInsight =
    useMemo(() => {

      if (!result) return ""

      if (
        result.painScore >
        result.mobilityScore &&
        result.painScore >
        result.impactScore
      ) {

        return "Pain-related stress is currently the dominant recovery limitation. Controlled mobility restoration and recovery pacing are recommended."
      }

      if (
        result.mobilityScore >
        result.painScore &&
        result.mobilityScore >
        result.impactScore
      ) {

        return "Mobility restriction appears to be limiting recovery quality. Progressive range-of-motion and movement control work should be prioritized."
      }

      return "Your movement profile appears relatively balanced. Continue maintaining mobility consistency and sustainable recovery habits."

    }, [result])

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <main className="min-h-screen bg-clay-canvas">

        <div
          className="
            mx-auto

            w-full
            max-w-[1400px]

            px-6
            md:px-8
            xl:px-10
          "
        >

          <div
            className="
              flex min-h-screen
              items-center
              justify-center
            "
          >

            <div className="flex flex-col items-center gap-6">

              <div className="relative">

                <div
                  className="
                    absolute inset-0

                    rounded-full

                    bg-clay-brand-teal/10

                    blur-2xl
                  "
                />

                <div
                  className="
                    relative

                    h-12 w-12

                    animate-spin

                    rounded-full

                    border-[3px]

                    border-clay-brand-teal

                    border-t-transparent
                  "
                />

              </div>

              <div className="text-center">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-clay-ink
                  "
                >
                  Generating movement intelligence
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-clay-muted
                  "
                >
                  Synthesizing structured recovery analysis...
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>
    )
  }

  if (!result || !interpretation) {

    return (

      <main className="min-h-screen bg-clay-canvas">

        <div
          className="
            mx-auto

            w-full
            max-w-[1400px]

            px-6
            md:px-8
            xl:px-10
          "
        >

          <div
            className="
              flex min-h-screen
              items-center
              justify-center
            "
          >

            <Card
              variant="cream"
              className="
                w-full
                max-w-[520px]

                rounded-[32px]

                border border-clay-hairline

                px-8 py-10

                text-center
              "
            >

              <div
                className="
                  mx-auto

                  flex h-14 w-14
                  items-center justify-center

                  rounded-2xl

                  bg-[#111111]

                  text-white
                "
              >

                <Activity size={20} />

              </div>

              <h2
                className="
                  mt-6

                  text-[2rem]

                  tracking-[-0.05em]

                  text-clay-ink
                "
              >
                No results available
              </h2>

              <p
                className="
                  mt-4

                  text-[15px]

                  leading-[1.85]

                  text-clay-body
                "
              >
                Complete your assessment to generate
                your movement recovery profile.
              </p>

              <Button
                size="lg"
                className="
                  mt-8
                  w-full
                "
                onClick={() =>
                  navigate("/assessment")
                }
              >
                Start Assessment
              </Button>

            </Card>

          </div>

        </div>

      </main>
    )
  }

  /* =====================================================
     UI
  ===================================================== */

  return (

    <main
      className="
        min-h-screen
        overflow-hidden
        bg-clay-canvas
      "
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none
          fixed inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute left-1/2 top-[-260px]

            h-[680px] w-[680px]

            -translate-x-1/2

            rounded-full

            bg-clay-brand-teal/5

            blur-[140px]
          "
        />

      </div>

      {/* =================================================
          MASTER CONTAINER
          EXACTLY SAME AS NAVBAR
      ================================================= */}

      <div
        className="
          relative z-10

          mx-auto

          w-full
          max-w-[1400px]

          px-6
          md:px-8
          xl:px-10
        "
      >

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            pt-20
            pb-10
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-clay-hairline

                bg-white/80

                px-4 py-2

                backdrop-blur-xl
              "
            >

              <Sparkles
                size={12}
                className="
                  text-clay-brand-teal
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[0.18em]

                  text-clay-ink
                "
              >
                Recovery Intelligence
              </span>

            </div>

          </motion.div>

          <div
            className="
              mt-8

              grid gap-6

              xl:grid-cols-[1.15fr_0.85fr]
            "
          >

            {/* LEFT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >

              <h1
                className="
                  max-w-[760px]

                  text-[3.4rem]
                  md:text-[5.4rem]

                  leading-[0.92]

                  tracking-[-0.08em]

                  text-clay-ink
                "
              >
                Your movement
                recovery profile.
              </h1>

              <p
                className="
                  mt-6

                  max-w-2xl

                  text-[15px]

                  leading-[1.9]

                  text-clay-body
                "
              >
                A structured overview of pain,
                mobility, and recovery patterns
                generated through movement analysis.
              </p>

            </motion.div>

            {/* RIGHT QUICK STATS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                grid gap-4
                sm:grid-cols-3
                xl:grid-cols-1
              "
            >

              {[
                {
                  icon: HeartPulse,
                  label: "Pain",
                  value: result.painScore,
                },
                {
                  icon: MoveRight,
                  label: "Mobility",
                  value: result.mobilityScore,
                },
                {
                  icon: BrainCircuit,
                  label: "Lifestyle",
                  value: result.impactScore,
                },
              ].map((item) => {

                const Icon = item.icon

                return (

                  <Card
                    key={item.label}
                    variant="cream"
                    hover={false}
                    className="
                      rounded-[28px]

                      border border-clay-hairline

                      px-5 py-5
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <div
                          className="
                            text-[10px]
                            font-semibold

                            uppercase

                            tracking-[0.16em]

                            text-clay-muted
                          "
                        >
                          {item.label}
                        </div>

                        <div
                          className="
                            mt-3

                            text-[2.4rem]

                            leading-none

                            tracking-[-0.06em]

                            text-clay-ink
                          "
                        >
                          {item.value}
                        </div>

                      </div>

                      <div
                        className="
                          flex h-12 w-12
                          items-center justify-center

                          rounded-2xl

                          bg-clay-surface-soft
                        "
                      >

                        <Icon
                          size={18}
                          className="text-clay-ink"
                        />

                      </div>

                    </div>

                  </Card>
                )
              })}

            </motion.div>

          </div>

        </section>

        {/* =================================================
            MAIN SCORE
        ================================================= */}

        <section>

          <Card
            variant="teal"
            hover={false}
            className="
              relative overflow-hidden

              rounded-[40px]

              px-8 py-9

              md:px-10 md:py-10
            "
          >

            <div
              className="
                absolute right-[-80px] top-[-80px]

                h-[260px] w-[260px]

                rounded-full

                bg-white/[0.04]
              "
            />

            <div
              className="
                relative z-10

                grid gap-8

                xl:grid-cols-[1fr_340px]
                xl:items-end
              "
            >

              {/* LEFT */}

              <div>

                <div
                  className="
                    inline-flex

                    rounded-full

                    bg-white/10

                    px-4 py-2
                  "
                >

                  <span
                    className="
                      text-[9px]
                      font-semibold

                      uppercase

                      tracking-[0.2em]

                      text-white/70
                    "
                  >
                    Overall Recovery Score
                  </span>

                </div>

                <div
                  className="
                    mt-8

                    flex items-end gap-3
                  "
                >

                  <div
                    className="
                      text-[5rem]
                      md:text-[6rem]

                      leading-none

                      tracking-[-0.08em]

                      text-white
                    "
                  >
                    {result.overallScore}
                  </div>

                  <div
                    className="
                      mb-3

                      text-[2rem]

                      text-white/35
                    "
                  >
                    /100
                  </div>

                </div>

                <div className="mt-7">

                  <div
                    className="
                      text-[10px]
                      font-semibold

                      uppercase

                      tracking-[0.18em]

                      text-white/55
                    "
                  >
                    Classification
                  </div>

                  <div
                    className="
                      mt-3

                      text-[2rem]

                      tracking-[-0.05em]

                      text-white
                    "
                  >
                    {interpretation.label}
                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div className="space-y-4">

                <div
                  className="
                    rounded-[24px]

                    border border-white/10

                    bg-white/[0.06]

                    p-5
                  "
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <div
                        className="
                          text-[10px]
                          font-semibold

                          uppercase

                          tracking-[0.16em]

                          text-white/55
                        "
                      >
                        Recovery Trend
                      </div>

                      <div
                        className="
                          mt-4

                          text-[2.2rem]

                          leading-none

                          tracking-[-0.05em]

                          text-white
                        "
                      >
                        {improvement !== null
                          ? `${improvement >= 0 ? "+" : "-"}${Math.abs(improvement)}%`
                          : "+73%"}
                      </div>

                    </div>

                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center

                        rounded-2xl

                        bg-white/10
                      "
                    >

                      <TrendingUp
                        size={18}
                        className="text-white"
                      />

                    </div>

                  </div>

                </div>

                <div
                  className="
                    rounded-[24px]

                    border border-white/10

                    bg-white/[0.06]

                    p-5
                  "
                >

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        flex h-11 w-11
                        items-center justify-center

                        rounded-2xl

                        bg-white/10
                      "
                    >

                      <ShieldCheck
                        size={16}
                        className="text-white"
                      />

                    </div>

                    <div>

                      <div
                        className="
                          text-[15px]
                          font-semibold

                          text-white
                        "
                      >
                        Assessment Complete
                      </div>

                      <p
                        className="
                          mt-2

                          text-[14px]

                          leading-[1.8]

                          text-white/70
                        "
                      >
                        Your movement profile has
                        been successfully analyzed.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </Card>

        </section>

        {/* =================================================
            INSIGHT
        ================================================= */}

        <section className="mt-5">

          <Card
            variant="cream"
            hover={false}
            className="
              rounded-[30px]

              border border-clay-hairline

              px-7 py-7
            "
          >

            <div
              className="
                text-[10px]
                font-semibold

                uppercase

                tracking-[0.16em]

                text-clay-muted
              "
            >
              Key Insight
            </div>

            <p
              className="
                mt-5

                max-w-4xl

                text-[15px]

                leading-[1.9]

                text-clay-body
              "
            >
              {dominantInsight}
            </p>

          </Card>

        </section>

        {/* =================================================
            RECOMMENDATIONS
        ================================================= */}

        <section className="mt-12 pb-24">

          <div className="mb-7">

            <div
              className="
                text-[10px]
                font-semibold

                uppercase

                tracking-[0.18em]

                text-clay-muted
              "
            >
              Recovery Protocols
            </div>

            <h2
              className="
                mt-4

                text-[2.5rem]

                leading-none

                tracking-[-0.06em]

                text-clay-ink
              "
            >
              Recommended next steps.
            </h2>

          </div>

          <div
            className="
              grid gap-5

              lg:grid-cols-2
            "
          >

            {result.recommendations.map(
              (
                recommendation,
                index
              ) => (

                <Card
                  key={recommendation}
                  variant="cream"
                  hover={false}
                  className="
                    rounded-[28px]

                    border border-clay-hairline

                    px-6 py-6

                    transition-all duration-300

                    hover:border-black/6
                    hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)]
                  "
                >

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        flex h-11 w-11
                        shrink-0
                        items-center justify-center

                        rounded-2xl

                        bg-[#111111]

                        text-[12px]
                        font-semibold

                        text-white
                      "
                    >
                      0{index + 1}
                    </div>

                    <div>

                      <h3
                        className="
                          text-[15px]
                          font-semibold

                          text-clay-ink
                        "
                      >
                        Protocol {index + 1}
                      </h3>

                      <p
                        className="
                          mt-3

                          text-[14px]

                          leading-[1.85]

                          text-clay-body
                        "
                      >
                        {recommendation}
                      </p>

                    </div>

                  </div>

                </Card>
              )
            )}

          </div>

          {/* CTA */}

          <div
            className="
              mt-12

              flex flex-col gap-4

              sm:flex-row
            "
          >

            <Button
              size="lg"
              className="
                h-14

                rounded-2xl

                px-7
              "
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

            <Button
              variant="secondary"
              size="lg"
              className="
                h-14

                rounded-2xl

                px-7
              "
              onClick={() =>
                navigate("/assessment")
              }
            >
              Retake Assessment
            </Button>

          </div>

        </section>

      </div>

    </main>
  )
}

export default ResultsPage