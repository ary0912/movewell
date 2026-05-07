'use client';

import { useNavigate } from 'react-router-dom'

import {
  motion,
} from 'framer-motion'

import {
  ArrowRight,
  Activity,
  Brain,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Workflow,
  Radar,
  Layers3,
  LineChart,
} from 'lucide-react'

import { Card } from '@components/ui/Card'
import { Button } from '@components/ui/Button'
import Badge from '@components/ui/Badge'

const MotionDiv = motion.div

const architectureItems = [
  {
    icon: Brain,
    title: 'Movement Intelligence',
    description:
      'Adaptive assessment systems convert subjective movement feedback into structured recovery insight.',
  },
  {
    icon: ShieldCheck,
    title: 'Protected Infrastructure',
    description:
      'Local-first persistence architecture designed for continuity, privacy, and long-term recovery tracking.',
  },
  {
    icon: Activity,
    title: 'Clinical Precision',
    description:
      'Built around calm workflows that reduce cognitive overload and improve assessment accuracy.',
  },
]

const systemStats = [
  {
    label: 'Mobility Signal',
    value: '84%',
  },
  {
    label: 'Recovery Stability',
    value: '91%',
  },
  {
    label: 'Assessment Precision',
    value: '96%',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Signal Mapping',
    description:
      'Identify physiological focus regions through guided anatomical interaction.',
  },
  {
    step: '02',
    title: 'Intensity Calibration',
    description:
      'Structure pain severity and movement resistance into measurable scoring.',
  },
  {
    step: '03',
    title: 'Mobility Analysis',
    description:
      'Evaluate recovery friction, asymmetry, and movement constraints.',
  },
  {
    step: '04',
    title: 'Insight Generation',
    description:
      'Generate movement intelligence and recovery-oriented recommendations.',
  },
]

function DemoPage() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen overflow-hidden bg-clay-canvas text-clay-ink">

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-240px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-clay-brand-peach/20 blur-[140px]" />

        <div className="absolute right-[-120px] top-[20%] h-[420px] w-[420px] rounded-full bg-clay-brand-lavender/20 blur-[140px]" />

        <div className="absolute left-[-120px] bottom-[10%] h-[380px] w-[380px] rounded-full bg-clay-brand-teal/10 blur-[120px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-32 pt-28 md:px-10 md:pt-36">

        {/* HERO */}
        <section className="grid items-start gap-20 lg:grid-cols-[1fr_540px]">

          {/* LEFT */}
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >

              <Badge
                variant="neutral"
                size="md"
                className="
                  rounded-full
                  border border-clay-hairline
                  bg-clay-surface-card
                  px-4 py-2
                "
              >
                Recovery Intelligence Platform
              </Badge>

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.06,
              }}
              className="
                mt-8
                text-[58px]
                leading-[0.95]
                tracking-[-2.5px]
                md:text-[78px]
                font-medium
                clay-display
              "
            >
              The science behind
              <br />

              <span className="text-clay-muted">
                modern recovery systems.
              </span>

            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.14,
              }}
              className="
                mt-8
                max-w-2xl
                text-[18px]
                leading-[1.8]
                text-clay-body
              "
            >
              MoveWell combines structured assessment,
              mobility analytics, and longitudinal
              recovery tracking into a calm, intelligent
              rehabilitation experience designed for
              modern movement workflows.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.22,
              }}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >

              <Button
                size="lg"
                onClick={() =>
                  navigate('/assessment')
                }
                className="
                  h-12
                  rounded-[14px]
                  bg-clay-primary
                  px-7
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Start Assessment

                <ArrowRight
                  className="ml-2"
                  size={17}
                />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  navigate('/dashboard')
                }
                className="
                  h-12
                  rounded-[14px]
                  border border-clay-hairline
                  bg-clay-canvas
                  px-7
                  text-[14px]
                  font-semibold
                "
              >
                Explore Dashboard
              </Button>

            </motion.div>

            {/* METRICS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.32,
              }}
              className="mt-16 flex flex-wrap gap-12"
            >

              {[
                {
                  value: '15+',
                  label: 'Movement Zones',
                },
                {
                  value: '84%',
                  label: 'Mobility Precision',
                },
                {
                  value: '24/7',
                  label: 'Recovery Continuity',
                },
              ].map((item, i) => (

                <div key={i}>

                  <div className="text-[36px] font-medium tracking-[-1px]">
                    {item.value}
                  </div>

                  <div className="mt-1 text-[14px] text-clay-muted">
                    {item.label}
                  </div>

                </div>

              ))}

            </motion.div>

          </div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <Card
              className="
                relative overflow-hidden
                rounded-[32px]
                border border-clay-hairline
                bg-clay-surface-card/90
                p-6
                shadow-[0_20px_70px_rgba(0,0,0,0.05)]
                backdrop-blur-xl
              "
            >

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_35%)]" />

              <div className="relative z-10 space-y-6">

                {/* TOP */}
                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[12px] uppercase tracking-[1.5px] text-clay-muted">
                      Recovery Engine
                    </p>

                    <h3 className="mt-3 text-[34px] leading-none tracking-[-1.5px] font-medium">
                      System Intelligence
                    </h3>

                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-clay-brand-teal text-white">

                    <Sparkles size={22} />

                  </div>

                </div>

                {/* LIVE STATUS */}
                <div className="rounded-[24px] border border-clay-hairline bg-clay-canvas p-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm font-medium text-clay-ink">
                        Signal Processing
                      </p>

                      <p className="mt-1 text-sm text-clay-muted">
                        Live recovery synthesis
                      </p>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2">

                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />

                      <span className="text-[11px] font-semibold uppercase tracking-[1.2px] text-emerald-700">
                        Active
                      </span>

                    </div>

                  </div>

                  {/* BARS */}
                  <div className="mt-8 space-y-5">

                    {systemStats.map((item, i) => (

                      <div key={i}>

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-[13px] text-clay-muted">
                            {item.label}
                          </span>

                          <span className="text-[13px] font-semibold text-clay-ink">
                            {item.value}
                          </span>

                        </div>

                        <div className="h-2 rounded-full bg-clay-surface-soft">

                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            whileInView={{
                              width: item.value,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: i * 0.08,
                            }}
                            className="h-full rounded-full bg-clay-brand-teal"
                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* INSIGHT CARD */}
                <div className="rounded-[24px] bg-clay-ink p-6 text-white">

                  <div className="flex items-start justify-between gap-5">

                    <div>

                      <p className="text-[12px] uppercase tracking-[1.5px] text-white/50">
                        Insight Layer
                      </p>

                      <p className="mt-4 text-[18px] leading-[1.7] text-white/90">
                        Structured movement analysis
                        improves rehabilitation visibility
                        and long-term recovery consistency.
                      </p>

                    </div>

                    <ChevronRight
                      size={20}
                      className="opacity-50"
                    />

                  </div>

                </div>

              </div>

            </Card>

          </motion.div>

        </section>

        {/* ARCHITECTURE */}
        <section className="mt-40">

          <div className="mb-16 max-w-2xl">

            <span className="text-[12px] font-semibold uppercase tracking-[1.5px] text-clay-muted">
              Infrastructure
            </span>

            <h2 className="mt-6 text-[48px] leading-[1.02] tracking-[-2px] font-medium clay-display">
              Designed for calm,
              intelligent recovery workflows.
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {architectureItems.map((item, i) => {

              const Icon = item.icon

              return (

                <MotionDiv
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: i * 0.06,
                  }}
                >

                  <Card
                    className="
                      h-full
                      rounded-[28px]
                      border border-clay-hairline
                      bg-clay-surface-card
                      p-8
                      transition-all duration-300
                      hover:-translate-y-1
                    "
                  >

                    <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-clay-brand-lavender">

                      <Icon size={22} />

                    </div>

                    <h3 className="mt-8 text-[28px] leading-[1.1] tracking-[-1px] font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-[16px] leading-[1.8] text-clay-body">
                      {item.description}
                    </p>

                  </Card>

                </MotionDiv>

              )
            })}

          </div>

        </section>

        {/* SYSTEM FLOW */}
        <section className="mt-40">

          <Card
            className="
              overflow-hidden
              rounded-[32px]
              border border-clay-hairline
              bg-clay-surface-card
              p-8 md:p-14
            "
          >

            <div className="grid gap-16 lg:grid-cols-[420px_1fr]">

              {/* LEFT */}
              <div>

                <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-clay-brand-peach">

                  <Workflow size={24} />

                </div>

                <h2 className="mt-8 text-[48px] leading-[1] tracking-[-2px] font-medium clay-display">
                  Structured
                  movement synthesis.
                </h2>

                <p className="mt-8 text-[17px] leading-[1.8] text-clay-body">
                  MoveWell transforms raw subjective
                  assessment data into actionable
                  recovery intelligence through a
                  structured multi-step workflow.
                </p>

              </div>

              {/* RIGHT */}
              <div className="space-y-10">

                {processSteps.map((item, i) => (

                  <div
                    key={i}
                    className="
                      flex gap-6
                      border-b border-clay-hairline
                      pb-8 last:border-none
                    "
                  >

                    <div className="pt-1 text-[12px] font-semibold tracking-[1.5px] text-clay-muted">

                      {item.step}

                    </div>

                    <div>

                      <h3 className="text-[24px] leading-[1.1] tracking-[-1px] font-medium">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-[15px] leading-[1.8] text-clay-body">
                        {item.description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </Card>

        </section>

        {/* SYSTEM PREVIEW */}
        <section className="mt-40 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT */}
          <Card
            className="
              overflow-hidden
              rounded-[32px]
              border border-clay-hairline
              bg-clay-brand-lavender
              p-8 md:p-10
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[12px] uppercase tracking-[1.5px] text-black/50">
                  Recovery Metrics
                </p>

                <h3 className="mt-3 text-[42px] tracking-[-2px] font-medium">
                  Mobility System
                </h3>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-white/40">

                <LineChart size={24} />

              </div>

            </div>

            {/* GRAPH */}
            <div className="mt-12 flex h-[220px] items-end gap-4">

              {[42, 78, 58, 88, 72, 96, 84].map((height, i) => (

                <motion.div
                  key={i}
                  initial={{
                    height: 0,
                  }}
                  whileInView={{
                    height,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.45,
                  }}
                  className="
                    flex-1 rounded-t-[14px]
                    bg-clay-brand-teal
                  "
                />

              ))}

            </div>

          </Card>

          {/* RIGHT */}
          <div className="grid gap-6">

            <Card
              className="
                rounded-[28px]
                border border-clay-hairline
                bg-clay-surface-card
                p-8
              "
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-brand-peach">

                  <Radar size={20} />

                </div>

                <div>

                  <h3 className="text-[22px] tracking-[-1px] font-medium">
                    Recovery Stability
                  </h3>

                  <p className="mt-1 text-[14px] text-clay-muted">
                    Longitudinal movement consistency
                  </p>

                </div>

              </div>

            </Card>

            <Card
              className="
                rounded-[28px]
                border border-clay-hairline
                bg-clay-surface-card
                p-8
              "
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-brand-teal text-white">

                  <Layers3 size={20} />

                </div>

                <div>

                  <h3 className="text-[22px] tracking-[-1px] font-medium">
                    Layered Intelligence
                  </h3>

                  <p className="mt-1 text-[14px] text-clay-muted">
                    Multi-factor recovery synthesis
                  </p>

                </div>

              </div>

            </Card>

          </div>

        </section>

      </div>

    </main>
  )
}

export default DemoPage