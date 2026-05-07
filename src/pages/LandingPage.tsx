'use client';

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { Button } from "@components/ui/Button"
import { Card } from "@components/ui/Card"

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  ScanLine,
  ShieldCheck,
} from "lucide-react"

const capabilityItems = [
  {
    icon: <BrainCircuit size={22} />,
    title: "Pain Analysis",
    desc: "Track localized discomfort patterns across anatomical movement zones.",
    color: "bg-clay-brand-pink text-white",
  },
  {
    icon: <Activity size={22} />,
    title: "Mobility Tracking",
    desc: "Visualize range-of-motion restrictions and movement asymmetry over time.",
    color: "bg-clay-brand-teal text-white",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Recovery History",
    desc: "Monitor rehabilitation progress using longitudinal movement analytics.",
    color: "bg-clay-brand-peach text-clay-ink",
  },
]

const workflowSteps = [
  {
    step: "01",
    title: "Capture Baseline",
    desc: "Record discomfort zones, mobility limitations, and recovery conditions.",
    color: "bg-clay-brand-lavender"
  },
  {
    step: "02",
    title: "Analyze Movement",
    desc: "Generate intelligent movement insights from structured assessment data.",
    color: "bg-clay-brand-ochre"
  },
  {
    step: "03",
    title: "Track Recovery",
    desc: "Understand recovery progression through ongoing movement evaluation.",
    color: "bg-clay-surface-card"
  },
]

function LandingPage() {

  const navigate = useNavigate()

  return (
    <main className="min-h-screen overflow-hidden bg-clay-canvas text-clay-ink">

      {/* HERO */}
      <section className="relative mx-auto max-w-[1280px] px-6 pt-28 pb-[120px] md:px-10 md:pt-36">

        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-clay-brand-peach/20 blur-[140px]" />

          <div className="absolute right-0 top-32 h-[260px] w-[260px] rounded-full bg-clay-brand-lavender/20 blur-[120px]" />

        </div>

        <div className="relative z-10 grid items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT */}
          <div className="max-w-2xl">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
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
                    tracking-[1.5px]
                    text-clay-muted
                  "
                >
                  Movement Intelligence
                </span>

              </div>

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="
                mt-8
                max-w-[720px]
                text-[58px]
                leading-[0.96]
                tracking-[-2.5px]
                md:text-[78px]
                font-medium
                clay-display
              "
            >
              Move better. <br />
              Recover with clarity.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
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
              A calm, data-driven recovery platform designed
              to help clinicians, athletes, and individuals
              understand movement limitations through
              structured mobility intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >

              <Button
                size="lg"
                onClick={() => navigate("/assessment")}
                className="
                  h-12
                  rounded-[12px]
                  bg-clay-primary
                  px-7
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Start Assessment
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="
                  h-12
                  rounded-[12px]
                  border border-clay-hairline
                  bg-clay-canvas
                  px-7
                  text-[14px]
                  font-semibold
                "
              >
                View Dashboard
              </Button>

            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-16 flex flex-wrap gap-12"
            >

              {[
                { value: "15+", label: "Movement Zones" },
                { value: "84%", label: "Mobility Precision" },
                { value: "24/7", label: "Recovery Tracking" },
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >

            <div
              className="
                rounded-[24px]
                border border-clay-hairline
                bg-clay-surface-soft
                p-6 md:p-8
              "
            >

              <div
                className="
                  relative overflow-hidden
                  rounded-[24px]
                  bg-clay-brand-lavender
                  p-6 md:p-8
                "
              >

                <div className="absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-white/20 blur-3xl" />

                <div className="relative z-10">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[12px] uppercase tracking-[1.5px] text-black/50">
                        Mobility Score
                      </p>

                      <h3 className="mt-3 text-[72px] leading-none tracking-[-4px] font-medium">
                        84
                      </h3>

                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-white/20">
                      <Activity size={24} />
                    </div>

                  </div>

                  <div
                    className="
                      mt-10
                      rounded-[20px]
                      bg-white/70
                      backdrop-blur-xl
                      p-6
                    "
                  >

                    <div className="mb-8 flex items-center justify-between">

                      <div>

                        <p className="text-sm font-medium">
                          Motion Symmetry
                        </p>

                        <p className="mt-1 text-sm text-clay-muted">
                          Weekly assessment
                        </p>

                      </div>

                      <ScanLine size={18} />

                    </div>

                    <div className="flex h-[140px] items-end gap-3">

                      {[45, 68, 54, 88, 66, 96, 82].map((height, i) => (

                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height }}
                          viewport={{ once: true }}
                          transition={{
                            delay: i * 0.06,
                            duration: 0.45,
                          }}
                          className="
                            flex-1
                            rounded-t-[12px]
                            bg-clay-brand-teal
                          "
                        />

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

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
                tracking-[1.5px]
                text-clay-muted
              "
            >
              Core Capabilities
            </span>

            <h2
              className="
                mt-6
                text-[48px]
                leading-[1.02]
                tracking-[-2px]
                font-medium
                clay-display
              "
            >
              Built for modern movement recovery.
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {capabilityItems.map((item, i) => (

              <Card
                key={i}
                className={`
                  ${item.color}
                  rounded-[24px]
                  border-0
                  p-8
                `}
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-white/20">
                  {item.icon}
                </div>

                <h3 className="mt-8 text-[28px] leading-[1.1] tracking-[-1px] font-medium">
                  {item.title}
                </h3>

                <p className="mt-5 text-[16px] leading-[1.7] opacity-90">
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
                tracking-[1.5px]
                text-clay-muted
              "
            >
              Workflow
            </span>

            <h2
              className="
                mt-6
                text-[48px]
                leading-[1.02]
                tracking-[-2px]
                font-medium
                clay-display
              "
            >
              From assessment to recovery insights.
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {workflowSteps.map((item, i) => (

              <div
                key={i}
                className={`
                  ${item.color}
                  relative
                  rounded-[24px]
                  p-8
                `}
              >

                <div className="absolute right-6 top-5 text-[72px] leading-none tracking-[-4px] text-black/10 font-medium">
                  {item.step}
                </div>

                <div className="relative z-10">

                  <h3 className="text-[28px] leading-[1.1] tracking-[-1px] font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-sm text-[16px] leading-[1.7] text-black/70">
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
              rounded-[24px]
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
                  leading-[1]
                  tracking-[-2px]
                  font-medium
                  clay-display
                "
              >
                Start understanding how your body moves.
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-[18px] leading-[1.8] text-clay-body">
                Designed for clinicians, athletes, rehabilitation
                specialists, and modern recovery systems.
              </p>

              <Button
                size="lg"
                onClick={() => navigate("/assessment")}
                className="
                  mt-10
                  h-12
                  rounded-[12px]
                  bg-clay-primary
                  px-8
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Begin Assessment
                <ArrowRight className="ml-3" size={18} />
              </Button>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-clay-hairline bg-clay-surface-soft">

        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-10 px-6 py-16 md:flex-row md:px-10">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-clay-primary text-xs font-semibold text-white">
              MW
            </div>

            <div>

              <div className="text-[18px] font-medium tracking-[-0.3px]">
                MoveWell
              </div>

              <div className="mt-1 text-[14px] text-clay-muted">
                Movement Intelligence Platform
              </div>

            </div>

          </div>

          <div className="flex gap-8 text-[14px] text-clay-muted">

            <a href="#" className="transition-colors hover:text-clay-ink">
              Framework
            </a>

            <a href="#" className="transition-colors hover:text-clay-ink">
              Evidence
            </a>

            <a href="#" className="transition-colors hover:text-clay-ink">
              Privacy
            </a>

          </div>

          <div className="text-[14px] text-clay-muted-soft">
            © 2026 MoveWell Systems
          </div>

        </div>

      </footer>

    </main>
  )
}

export default LandingPage