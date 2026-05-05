'use client';

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@components/ui/Button"
import { Card } from "@components/ui/Card"
import { Activity, ShieldCheck, BrainCircuit } from "lucide-react"

function LandingPage() {
  const navigate = useNavigate()

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeInOut" as const }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main>

        {/* HERO */}
        <section className="max-w-5xl mx-auto px-6 pt-44 pb-36 text-center">
          <motion.div {...fadeInUp} className="space-y-10">

            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Movement Intelligence
            </p>

            <h1 className="text-[2.5rem] md:text-[4.5rem] font-semibold tracking-tight leading-[1.05]">
              Understand your body <br />
              <span className="text-muted-foreground">in under 2 minutes</span>
            </h1>

            <p className="max-w-lg mx-auto text-[1.05rem] text-muted-foreground leading-relaxed">
              Assess pain, track mobility, and understand how your body is changing — with clear, structured insights.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/assessment")}
              >
                Start Assessment
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
            </div>

          </motion.div>
        </section>


        {/* VALUE PROPS */}
        <section className="max-w-6xl mx-auto px-6 py-28 border-t border-border">
          <div className="grid md:grid-cols-3 gap-14">

            {[
              {
                icon: <BrainCircuit size={18} />,
                title: "Understand pain",
                desc: "Identify where discomfort exists and how severe it is."
              },
              {
                icon: <Activity size={18} />,
                title: "Track mobility",
                desc: "Measure movement limitations and monitor progress."
              },
              {
                icon: <ShieldCheck size={18} />,
                title: "Improve over time",
                desc: "See how your body changes with consistent tracking."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4">

                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>

                <h3 className="text-[1.05rem] font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>
        </section>


        {/* PRODUCT PREVIEW */}
        <section className="max-w-6xl mx-auto px-6 py-36">
          <div className="grid lg:grid-cols-2 gap-24 items-center">

            <div className="space-y-8">

              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
                Clear insights,<br />not complex dashboards
              </h2>

              <p className="text-muted-foreground max-w-md leading-relaxed">
                MoveWell transforms your assessment into a structured report — so you can understand what matters instantly.
              </p>

              <div className="space-y-3 pt-4 text-sm text-slate-500">
                <p>• Pain score and distribution</p>
                <p>• Mobility limitations</p>
                <p>• Progress tracking over time</p>
              </div>

            </div>

            <Card className="p-12 flex items-center justify-center min-h-[340px] hover:shadow-lg transition-all">
              <div className="text-center space-y-4">
                <div className="text-6xl font-semibold text-blue-600 tracking-tight">72</div>
                <p className="text-sm text-muted-foreground">Current health score</p>
              </div>
            </Card>

          </div>
        </section>


        {/* FINAL CTA */}
        <section className="max-w-5xl mx-auto px-6 pb-40">
<div className="bg-card border border-border rounded-3xl p-20 text-center space-y-10">

            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
              Start understanding your body today
            </h2>

            <Button
              variant="primary"
              size="lg"
              className="px-12"
              onClick={() => navigate("/assessment")}
            >
              Begin Assessment
            </Button>

          </div>
        </section>

      </main>


      {/* FOOTER */}
      <footer className="border-t border-border py-16 bg-card">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">

          <div className="flex items-center gap-2 font-medium text-foreground">
            <div className="w-7 h-7 bg-blue-600 text-white flex items-center justify-center rounded-md text-xs font-semibold">
              MW
            </div>
            MoveWell
          </div>

          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">Privacy</span>
            <span className="hover:text-foreground cursor-pointer">Terms</span>
            <span className="hover:text-foreground cursor-pointer">Contact</span>
          </div>

          <div>© 2026</div>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage