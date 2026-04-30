'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Zap,
  Bluetooth,
  Wifi,
  Music,
  Battery,
  Sliders,
  ChevronRight,
  LucideIcon,
  Activity,
  ShieldCheck,
  BrainCircuit,
  Dna
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'map' | 'protocol';

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  icon: LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string;
  title: string;
  description: string;
  imageComponent: React.ReactNode;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
  };
  stats: {
    status: string;
    fidelity: number;
  };
  features: FeatureMetric[];
}

// Data adapted for MoveWell
const MOVEWELL_SHOWCASE_DATA: Record<ProductId, ProductData> = {
  map: {
    id: 'map',
    label: 'Neural',
    title: 'Anatomical Synthesis',
    description: 'Our proprietary neural mapping engine identifies biomechanical distress signals across 14 anatomical focus centers.',
    imageComponent: (
      <div className="w-full h-full flex items-center justify-center p-12">
        <Activity className="w-32 h-32 text-emerald-500 animate-pulse" />
      </div>
    ),
    colors: {
      gradient: 'from-emerald-600 to-teal-900',
      glow: 'bg-emerald-500',
      ring: 'border-emerald-500/30',
    },
    stats: { status: 'Neural Stream Active', fidelity: 98 },
    features: [
      { label: 'Precision', value: 96, icon: BrainCircuit },
      { label: 'Sync Rate', value: 99, icon: Wifi },
    ],
  },
  protocol: {
    id: 'protocol',
    label: 'Protocol',
    title: 'Movement Protocol',
    description: 'Personalized recovery vectors generated through longitudinal intelligence. Your daily roadmap to total movement optimization.',
    imageComponent: (
      <div className="w-full h-full flex items-center justify-center p-12">
        <ShieldCheck className="w-32 h-32 text-blue-500 animate-pulse" />
      </div>
    ),
    colors: {
      gradient: 'from-blue-600 to-indigo-900',
      glow: 'bg-blue-500',
      ring: 'border-blue-500/30',
    },
    stats: { status: 'Protocol Optimized', fidelity: 94 },
    features: [
      { label: 'Efficiency', value: 92, icon: Zap },
      { label: 'Adaptation', value: 88, icon: Dna },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const ProductVisual = ({ data }: { data: ProductData }) => (
  <motion.div layout="position" className="relative group shrink-0">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className={cn("absolute inset-[-15%] rounded-full border border-dashed border-white/5", data.colors.ring)}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={cn("absolute inset-0 rounded-full bg-gradient-to-br blur-3xl opacity-20", data.colors.gradient)}
    />

    <div className="relative h-64 w-64 md:h-96 md:w-96 rounded-full border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden bg-zinc-950/40 backdrop-blur-xl">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={data.id}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full h-full"
          >
            {data.imageComponent}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>

    <motion.div
      layout="position"
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 bg-zinc-900/90 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md shadow-2xl">
        <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", data.colors.glow)} />
        {data.stats.status}
      </div>
    </motion.div>
  </motion.div>
);

const ProductDetails = ({ data }: { data: ProductData }) => (
  <motion.div
    variants={ANIMATIONS.container}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="flex flex-col items-start text-left"
  >
    <motion.h2 variants={ANIMATIONS.item} className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4">
      MoveWell {data.label} System
    </motion.h2>
    <motion.h1 variants={ANIMATIONS.item} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white leading-none">
      {data.title}
    </motion.h1>
    <motion.p variants={ANIMATIONS.item} className="text-zinc-400 text-lg mb-10 max-w-sm leading-relaxed font-medium">
      {data.description}
    </motion.p>

    <motion.div variants={ANIMATIONS.item} className="w-full space-y-8 bg-zinc-900/50 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl">
      {data.features.map((feature, idx) => (
        <div key={feature.label} className="group">
          <div className="flex items-center justify-between mb-4 text-sm font-bold">
            <div className="flex items-center gap-3 text-zinc-200">
              <feature.icon size={18} className="text-emerald-500" /> 
              <span className="uppercase tracking-widest text-[10px]">{feature.label}</span>
            </div>
            <span className="font-mono text-xs text-zinc-500">{feature.value}%</span>
          </div>
          <div className="relative h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${feature.value}%` }}
              transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
              className="absolute top-0 bottom-0 left-0 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            />
          </div>
        </div>
      ))}

      <div className="pt-4">
        <button type="button" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors group">
          <Sliders size={14} /> Full Diagnostics
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const Switcher = ({ 
  activeId, 
  onToggle 
}: { 
  activeId: ProductId; 
  onToggle: (id: ProductId) => void 
}) => {
  const options = Object.values(MOVEWELL_SHOWCASE_DATA).map(p => ({ id: p.id, label: p.label }));

  return (
    <div className="flex justify-center mt-12">
      <motion.div layout className="flex items-center gap-2 p-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-2xl">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative px-8 h-12 rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest focus:outline-none overflow-hidden"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="active-island"
                className="absolute inset-0 rounded-full bg-emerald-600 shadow-lg"
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              />
            )}
            <span className={cn("relative z-10 transition-colors duration-300", activeId === opt.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300')}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default function MoveWellShowcase() {
  const [activeSide, setActiveSide] = useState<ProductId>('map');
  const currentData = MOVEWELL_SHOWCASE_DATA[activeSide];

  return (
    <div className="w-full">
      <motion.div
        layout
        className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full"
      >
        <ProductVisual data={currentData} />

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <ProductDetails 
              key={activeSide}
              data={currentData} 
            />
          </AnimatePresence>
          <Switcher activeId={activeSide} onToggle={setActiveSide} />
        </div>
      </motion.div>
    </div>
  );
}
