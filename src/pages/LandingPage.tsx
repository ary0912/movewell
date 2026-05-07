'use client'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  ScanLine,
  ShieldCheck,
} from 'lucide-react'

import { Button } from '@components/ui/Button'
import { Card } from '@components/ui/Card'

const capabilityItems = [
  {
    icon: <BrainCircuit size={22} aria-hidden="true" />,
    title: 'Pain Tracking',
    desc:
      'Track discomfort patterns, recovery symptoms, and movement limitations over time.',
    color: 'bg-clay-brand-pink text-white',
    emphasis: true,
  },
  {
    icon: <Activity size={22} aria-hidden="true" />,
    title: 'Mobility Insights',
    desc:
      'Understand asymmetry, restricted motion, and recovery progression through structured assessments.',
    color: 'bg-clay-brand-teal text-white',
  },
  {
    icon: <ShieldCheck size={22} aria-hidden="true" />,
    title: 'Recovery History',
    desc:
      'Monitor rehabilitation consistency with longitudinal movement analytics and progress tracking.',
    color: 'bg-clay-brand-peach text-clay-ink',
  },
]

const workflowSteps = [
  {
    step: '01',
    title: 'Record Symptoms',
    desc:
      'Capture pain areas, movement restrictions, and current recovery conditions in minutes.',
    color: 'bg-clay-brand-lavender',
  },
  {
    step: '02',
    title: 'Understand Movement',
    desc:
      'Identify asymmetry, instability, and mobility limitations through guided assessments.',
    color: 'bg-clay-brand-ochre',
  },
  {
    step: '03',
    title: 'Track Progress',
    desc:
      'Compare recovery trends over time and understand how mobility evolves week by week.',
    color: 'bg-clay-surface-card',
  },
]

const metrics = [
  {
    value: '15+',
    label: 'Movement zones analysed',
  },
  {
    value: '3 min',
    label: 'Average assessment time',
  },
  {
    value: '24/7',
    label: 'Recovery progress access',
  },
]

function HeroAnalyticsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div
        className="
          rounded-[28px]
          border border-clay-hairline
          bg-clay-surface-soft
          p-6 md:p-8
        "
      >
        <div
          className="
            relative overflow-hidden
            rounded-[28px]
            bg-clay-brand-lavender
            p-6 md:p-8
          "
        >
          <div className="absolute right-[-100px] top-[-100px] h-[260px] w-[260px] rounded-full bg-white/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-black/50">
                  Weekly Mobility Recovery
                </p>

                <div className="mt-4 flex items-end gap-3">
                  <h3 className="text-[72px] leading-none tracking-[-4px] font-medium">
                    84
                  </h3>

                  <div className="mb-2 rounded-full bg-black/10 px-3 py-1 text-[12px] font-medium">
                    Stable Progress
                  </div>
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/20">
                <Activity size={24} aria-hidden="true" />
              </div>
            </div>

            <div
              className="
                mt-10
                rounded-[22px]
                border border-white/40
                bg-white/70
                p-6
                backdrop-blur-xl
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-clay-ink">
                    Motion Symmetry
                  </p>

                  <p className="mt-1 text-sm text-clay-muted">
                    Compared to previous assessments
                  </p>
                </div>

                <ScanLine size={18} aria-hidden="true" />
              </div>

              <div
                className="mt-8 flex h-[140px] items-end gap-3"
                aria-label="Mobility progress chart"
                role="img"
              >
                {[48, 58, 52, 72, 66, 92, 84].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.45,
                    }}
                    className="
                      flex-1
                      rounded-t-[14px]
                      bg-clay-brand-teal
                    "
                  />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-5 text-sm">
                <span className="text-clay-muted">
                  Recovery consistency improving
                </span>

                <span className="font-medium text-clay-ink">
                  +12% this month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-clay-canvas text-clay-ink">

      {/* HERO */}
      <section className="relative mx-auto max-w-[1280px] px-6 pb-[120px] pt-28 md:px-10 md:pt-36">

        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-clay-brand-peach/20 blur-[140px]" />

          <div className="absolute right-0 top-32 h-[260px] w-[260px] rounded-full bg-clay-brand-lavender/20 blur-[120px]" />
        </div>

        <div className="relative z-10 grid items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT */}
          <div className="max-w-2xl">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-clay-hairline
                  bg-clay-surface-card
                  px-4 py-2
                "
              >
                <div className="h-2 w-2 rounded-full bg-clay-brand-coral" />

                <span
                  className="
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[1.4px]
                    text-clay-muted
                  "
                >
                  Recovery Intelligence Platform
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="
                mt-8
                max-w-[760px]
                text-[58px]
                font-medium
                leading-[0.95]
                tracking-[-2.5px]
                clay-display
                md:text-[78px]
              "
            >
              Track pain, mobility,
              and recovery
              with clarity.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="
                mt-8
                max-w-xl
                text-[18px]
                leading-[1.75]
                text-clay-body
              "
            >
              Designed for clinicians, athletes, and rehabilitation
              teams to understand movement limitations, monitor
              recovery progression, and identify mobility issues before
              they become long-term setbacks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >

              <Link to="/assessment">
                <Button
                  size="lg"
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
                  Start Free Assessment
                </Button>
              </Link>

              <Link
                to="/dashboard"
                className="
                  inline-flex items-center
                  text-[14px]
                  font-medium
                  text-clay-muted
                  transition-colors
                  hover:text-clay-ink
                "
              >
                View recovery dashboard
                <ArrowRight className="ml-2" size={16} aria-hidden="true" />
              </Link>

            </motion.div>

            {/* METRICS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-16 flex flex-wrap gap-12"
            >
              {metrics.map((item) => (
                <div key={item.label}>
                  <div className="text-[34px] font-medium tracking-[-1px]">
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
          <HeroAnalyticsCard />

        </div>

      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-clay-hairline">

        <div className="mx-auto max-w-[1280px] px-6 py-[96px] md:px-10">

          <div className="mb-16 max-w-2xl">

            <span
              className="
                text-[12px]
                font-semibold
                uppercase
                tracking-[1.4px]
                text-clay-muted
              "
            >
              Core Capabilities
            </span>

            <h2
              className="
                mt-6
                text-[48px]
                font-medium
                leading-[1.02]
                tracking-[-2px]
                clay-display
              "
            >
              Built for modern rehabilitation workflows.
            </h2>

          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">

            {capabilityItems.map((item) => (

              <Card
                key={item.title}
                className={`
                  ${item.color}
                  ${item.emphasis ? 'min-h-[360px]' : 'min-h-[320px]'}
                  rounded-[28px]
                  border-0
                  p-8
                `}
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/20">
                  {item.icon}
                </div>

                <h3 className="mt-8 text-[30px] font-medium leading-[1.05] tracking-[-1px]">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-sm text-[16px] leading-[1.7] opacity-90">
                  {item.desc}
                </p>

              </Card>

            ))}

          </div>

        </div>

      </section>

      {/* WORKFLOW */}
      <section>

        <div className="mx-auto max-w-[1280px] px-6 py-[96px] md:px-10">

          <div className="mx-auto mb-20 max-w-3xl text-center">

            <span
              className="
                text-[12px]
                font-semibold
                uppercase
                tracking-[1.4px]
                text-clay-muted
              "
            >
              Recovery Workflow
            </span>

            <h2
              className="
                mt-6
                text-[48px]
                font-medium
                leading-[1.02]
                tracking-[-2px]
                clay-display
              "
            >
              Understand recovery progression step by step.
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {workflowSteps.map((item) => (

              <div
                key={item.step}
                className={`
                  ${item.color}
                  relative
                  overflow-hidden
                  rounded-[28px]
                  p-8
                `}
              >

                <div className="absolute right-6 top-5 text-[72px] font-medium leading-none tracking-[-4px] text-black/10">
                  {item.step}
                </div>

                <div className="relative z-10">

                  <h3 className="text-[30px] font-medium leading-[1.08] tracking-[-1px]">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-sm text-[16px] leading-[1.75] text-black/70">
                    {item.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="pb-[120px]">

        <div className="mx-auto max-w-[1280px] px-6 md:px-10">

          <div
            className="
              relative overflow-hidden
              rounded-[32px]
              bg-clay-surface-soft
              px-8 py-20
              md:px-16
            "
          >

            <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-clay-brand-peach/30 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">

              <h2
                className="
                  text-[52px]
                  font-medium
                  leading-[1]
                  tracking-[-2px]
                  clay-display
                "
              >
                Identify movement limitations before they slow recovery.
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-[18px] leading-[1.8] text-clay-body">
                A calmer and more structured way to understand pain,
                mobility, and rehabilitation progression.
              </p>

              <Link to="/assessment">

                <Button
                  size="lg"
                  className="
    mt-10
    h-12
    rounded-[14px]
    bg-clay-primary
    px-8
    text-[14px]
    font-semibold
    text-white
  "
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Begin Assessment</span>

                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                  </div>
                </Button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-clay-hairline bg-clay-surface-soft">

        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-10 px-6 py-16 md:flex-row md:px-10">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-clay-primary text-xs font-semibold text-white">
              MW
            </div>

            <div>

              <div className="text-[18px] font-medium tracking-[-0.3px]">
                MoveWell
              </div>

              <div className="mt-1 text-[14px] text-clay-muted">
                Recovery Intelligence Platform
              </div>

            </div>

          </div>

          <nav
            className="flex gap-8 text-[14px] text-clay-muted"
            aria-label="Footer navigation"
          >

            <Link
              to="/framework"
              className="transition-colors hover:text-clay-ink"
            >
              Framework
            </Link>

            <Link
              to="/evidence"
              className="transition-colors hover:text-clay-ink"
            >
              Evidence
            </Link>

            <Link
              to="/privacy"
              className="transition-colors hover:text-clay-ink"
            >
              Privacy
            </Link>

          </nav>

          <div className="text-[14px] text-clay-muted-soft">
            © 2026 MoveWell Systems
          </div>

        </div>

      </footer>

    </main>
  )
}

export default LandingPage