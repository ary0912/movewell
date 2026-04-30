'use client';

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@components/ui/Button"
import { Card } from "@components/ui/Card"
import Badge from "@components/ui/Badge"
import { 
  Activity, 
  ShieldCheck, 
  BrainCircuit,
  Target,
  BarChart3
} from "lucide-react"

function LandingPage() {
  const navigate = useNavigate()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500/10">
      
      <main>
        {/* 1. Hero Section: Typographic Authority */}
        <section className="max-w-5xl mx-auto px-6 pt-40 pb-32 text-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <Badge variant="neutral" className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-slate-500 border-slate-200">
              The Movement Standard
            </Badge>

            <h1 className="text-5xl md:text-[6rem] font-bold tracking-tight text-slate-900 leading-[0.95] max-w-4xl mx-auto">
              Move well. <br />
              <span className="text-slate-400">Live without limits.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              MoveWell decodes your biomechanical signals to build a personalized blueprint for recovery and performance. Clinical intelligence, simplified.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button 
                variant="clinical"
                size="lg"
                onClick={() => navigate("/assessment")}
                className="w-full sm:w-auto"
              >
                Start Assessment
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto"
              >
                View Analytics
              </Button>
            </div>
          </motion.div>
        </section>

        {/* 2. Value Proposition: Simple Grid */}
        <section className="max-w-6xl mx-auto px-6 py-32 border-t border-slate-200">
          <div className="grid md:grid-cols-3 gap-12">
             {[
               { icon: <BrainCircuit />, title: "Neural Map", desc: "Identify anatomical distress centers with longitudinal precision." },
               { icon: <Activity />, title: "Bio-Sync", desc: "Evaluate joint fluidity and identify hidden mobility restrictions." },
               { icon: <ShieldCheck />, title: "Protocol", desc: "Adaptive recovery vectors generated through daily biomechanical feedback." }
             ].map((item, i) => (
               <div key={i} className="space-y-6">
                  <div className="text-emerald-600">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* 3. Social Proof / Authority */}
        <section className="py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 opacity-40 grayscale">
             <span className="font-black tracking-tighter text-2xl text-slate-400">CLINICAL+</span>
             <span className="font-black tracking-tighter text-2xl text-slate-400">BIOSTREAM</span>
             <span className="font-black tracking-tighter text-2xl text-slate-400">RECOVER.AI</span>
             <span className="font-black tracking-tighter text-2xl text-slate-400">ELITEFORM</span>
          </div>
        </section>

        {/* 4. Deep Tech: Clear Information Hierarchy */}
        <section className="max-w-6xl mx-auto px-6 py-40">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 text-left">
                 <h2 className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-tight">Intelligence at <br />every intersection.</h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                   "The most sophisticated diagnostic is the one you actually use. We built MoveWell to turn complex biomechanics into a simple daily protocol."
                 </p>
                 <div className="space-y-6">
                    {[
                      { t: "Predictive Analytics", d: "Avoid injury before it manifests in your movement patterns." },
                      { t: "Longitudinal Tracking", d: "Watch your evolution through high-resolution data streams." }
                    ].map((feat, idx) => (
                      <div key={idx} className="flex gap-6">
                         <div className="mt-1"><Target size={20} className="text-emerald-600" /></div>
                         <div>
                            <p className="font-bold text-slate-900">{feat.t}</p>
                            <p className="text-sm text-slate-500">{feat.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <Card className="p-10 bg-white border-slate-200 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                 <div className="text-slate-100 absolute inset-0 flex items-center justify-center pointer-events-none font-black text-[20rem] opacity-40">
                   MW
                 </div>
                 <div className="relative z-10 text-center space-y-8">
                    <BarChart3 size={64} className="mx-auto text-emerald-600" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Telemetry stream active</p>
                 </div>
              </Card>
           </div>
        </section>

        {/* 5. Final CTA: Calm Premium */}
        <section className="max-w-6xl mx-auto px-6 py-40">
           <div className="p-20 md:p-32 text-center bg-white border border-slate-200 rounded-[2rem] relative overflow-hidden group shadow-xl shadow-slate-200/50">
              <div className="relative z-10 space-y-12">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                    Ready to define your <br />
                    <span className="text-emerald-600">movement standard?</span>
                 </h2>
                 <div className="pt-6">
                    <Button 
                      variant="clinical"
                      size="lg"
                      onClick={() => navigate("/assessment")}
                      className="px-16"
                    >
                       Get Started
                    </Button>
                 </div>
              </div>
           </div>
        </section>

      </main>

      <footer className="py-20 border-t border-slate-200 bg-white">
         <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">MW</div>
               <span className="font-bold text-slate-900 tracking-tight">MoveWell Intelligence</span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
               <a href="#" className="hover:text-slate-900 transition-colors">Protocol</a>
               <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
               <a href="#" className="hover:text-slate-900 transition-colors">Clinical</a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 MoveWell</p>
         </div>
      </footer>
    </div>
  )
}

export default LandingPage