'use client';

import { Card } from "@components/ui/Card";
import Badge from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Activity, 
  ChevronRight,
  Stethoscope,
  Database,
  BarChart3
} from "lucide-react";

const DemoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 space-y-8 max-w-3xl">
          <Badge variant="neutral" className="px-4 py-1.5 bg-card text-muted-foreground border-border">System Architecture</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
            Clinical Intelligence <br />
            <span className="text-muted-foreground">Simplified.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">
            "MoveWell is not just an assessment—it's a high-resolution data pipeline for human movement."
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { 
              icon: <Stethoscope className="text-emerald-600" />, 
              title: "Diagnostic Rigor", 
              desc: "Validated anatomical nodes ensuring surgical precision in identification." 
            },
            { 
              icon: <Database className="text-emerald-600" />, 
              title: "Neural Engine", 
              desc: "Local synthesis of biomechanical signals for maximum security." 
            },
            { 
              icon: <BarChart3 className="text-emerald-600" />, 
              title: "Longitudinal Map", 
              desc: "Predictive analytics to visualize recovery vectors over time." 
            }
          ].map((item, i) => (
            <Card key={i} className="p-10 border-border bg-card hover:shadow-lg transition-all">
              <div className="mb-8">{item.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>

        {/* The Methodology */}
        <Card className="p-12 md:p-20 border-border bg-card mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Activity size={400} className="text-emerald-600" />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">The 4-Phase <br />Synthesis Protocol.</h2>
              <div className="space-y-6">
                 {[
                   { step: "01", t: "Neural Mapping", d: "Identify the signal source." },
                   { step: "02", t: "Calibration", d: "Quantify the signal strength." },
                   { step: "03", t: "Restriction Check", d: "Assess motion fluidities." },
                   { step: "04", t: "Blueprint Generation", d: "Synthesize the protocol." }
                 ].map((s, idx) => (
                   <div key={idx} className="flex gap-6 items-start">
                     <span className="text-sm font-bold text-emerald-600 tabular-nums">{s.step}</span>
                     <div>
                        <p className="font-bold text-foreground">{s.t}</p>
                        <p className="text-sm text-muted-foreground font-medium">{s.d}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="bg-muted rounded-3xl p-10 border border-border flex flex-col items-center justify-center text-center space-y-6">
              <Zap size={48} className="text-emerald-600" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Processing Engine Active</p>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-xs">
                Real-time synthesis of anatomical datasets into actionable recovery blueprints.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center py-20 border-t border-border">
           <h2 className="text-4xl font-bold tracking-tight text-foreground mb-10">Define your protocol today.</h2>
           <div className="flex justify-center gap-6">
             <Button variant="clinical" size="lg" onClick={() => navigate('/assessment')}>
               Start Assessment <ChevronRight className="ml-2" />
             </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
