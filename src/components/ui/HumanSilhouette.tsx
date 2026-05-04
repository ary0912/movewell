'use client';

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import type { BodyArea } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface HumanSilhouetteProps {
  selectedAreas: BodyArea[];
  onAreaToggle: (area: BodyArea) => void;
  className?: string;
}

const HumanSilhouette: React.FC<HumanSilhouetteProps> = ({
  selectedAreas,
  onAreaToggle,
  className
}) => {
  const [hovered, setHovered] = useState<BodyArea | null>(null);

  const areas = [
    { id: 'neck', label: "Neck", cx: 100, cy: 38, r: 9 },
    { id: 'shoulder', label: "Shoulder", cx: 72, cy: 58, r: 12 },
    { id: 'shoulder', label: "Shoulder", cx: 128, cy: 58, r: 12 },
    { id: 'elbow', label: "Elbow", cx: 50, cy: 105, r: 10 },
    { id: 'elbow', label: "Elbow", cx: 150, cy: 105, r: 10 },
    { id: 'wrist', label: "Wrist", cx: 38, cy: 155, r: 8 },
    { id: 'wrist', label: "Wrist", cx: 162, cy: 155, r: 8 },
    { id: 'upperBack', label: "Upper Back", cx: 100, cy: 80, r: 15 },
    { id: 'lowerBack', label: "Lower Back", cx: 100, cy: 130, r: 15 },
    { id: 'hip', label: "Hip", cx: 78, cy: 165, r: 12 },
    { id: 'hip', label: "Hip", cx: 122, cy: 165, r: 12 },
    { id: 'knee', label: "Knee", cx: 78, cy: 245, r: 12 },
    { id: 'knee', label: "Knee", cx: 122, cy: 245, r: 12 },
    { id: 'ankle', label: "Ankle", cx: 82, cy: 310, r: 8 },
    { id: 'ankle', label: "Ankle", cx: 118, cy: 310, r: 8 },
  ];

  const hasSelection = selectedAreas.length > 0;

  return (
    <div className={cn("relative w-full max-w-[440px] mx-auto pb-14", className)}>

      {/* ================= AMBIENT GLOW ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="w-[320px] h-[320px] bg-emerald-500/10 blur-[120px] rounded-full"
        />
      </div>

      {/* ================= SVG ================= */}
      <svg
        viewBox="0 0 200 360"
        className="w-full h-auto relative z-10"
        fill="none"
      >
        {/* BODY */}
        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.2 }}
          d="M100 15C110 15 118 23 118 33C118 43 110 51 100 51C90 51 82 43 82 33C82 23 90 15 100 15ZM100 51C130 51 155 62 162 85C168 110 175 135 175 160C175 185 165 190 155 190C145 190 140 180 140 165V120C140 115 135 110 128 110H72C65 110 60 115 60 120V165C60 180 55 190 45 190C35 190 25 185 25 160C25 135 32 110 38 85C45 62 70 51 100 51ZM78 165V230C78 245 72 260 65 275L50 330C48 345 58 355 70 355C82 355 88 345 88 330L95 280H105L112 330C112 345 118 355 130 355C142 355 152 345 150 330L135 275C128 260 122 245 122 230V165H78Z"
          className="fill-background stroke-border"
          strokeWidth="1.5"
        />

        {/* ================= NODES ================= */}
        {areas.map((area, index) => {
          const isSelected = selectedAreas.includes(area.id as BodyArea);
          const isHovered = hovered === (area.id as BodyArea);

          return (
                <g
              key={`${area.id}-${index}`}
              onClick={() => onAreaToggle(area.id as BodyArea)}
              onMouseEnter={() => setHovered(area.id as BodyArea)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              {/* PULSE */}
              <AnimatePresence>
                {isSelected && (
                  <motion.circle
                    initial={{ scale: 0, opacity: 0.4 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    cx={area.cx}
                    cy={area.cy}
                    r={area.r}
                    className="fill-emerald-500"
                  />
                )}
              </AnimatePresence>

              {/* MAGNETIC HOVER */}
              <motion.circle
                cx={area.cx}
                cy={area.cy}
                r={area.r + 8}
                className="fill-transparent"
                animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />

              {/* MAIN NODE */}
              <motion.circle
                cx={area.cx}
                cy={area.cy}
                r={area.r}
                whileTap={{ scale: 0.85 }}
                animate={{
                  scale: isHovered ? 1.25 : 1,
                }}
                className={cn(
                  "transition-all duration-300",
                  isSelected
                    ? "fill-emerald-500 stroke-white stroke-[2px]"
                    : "fill-background stroke-border hover:stroke-emerald-400 hover:fill-emerald-50 dark:hover:fill-emerald-500/10",
                  hasSelection && !isSelected && "opacity-30"
                )}
              />

              {/* CENTER DOT */}
              <circle
                cx={area.cx}
                cy={area.cy}
                r={2.5}
                className={cn(
                  isSelected ? "fill-white" : "fill-muted-foreground",
                  hasSelection && !isSelected && "opacity-30"
                )}
              />

              {/* TOOLTIP */}
              <AnimatePresence>
                {isHovered && (
                  <motion.foreignObject
                    x={area.cx - 50}
                    y={area.cy - 50}
                    width="100"
                    height="40"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-xs bg-background/90 backdrop-blur border border-border px-2 py-1 rounded-md shadow">
                      {area.label}
                    </div>
                  </motion.foreignObject>
                )}
              </AnimatePresence>
            </g>
          );
        })}
      </svg>

      {/* ================= STATUS ================= */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          key={selectedAreas.length}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            inline-flex items-center gap-2 
            px-4 py-2 
            rounded-full 
            bg-background/80 dark:bg-background/70
            backdrop-blur-md 
            border border-border
            shadow-md
            text-xs
          "
        >
          <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
            Active Map
          </span>

          <span className="font-semibold text-foreground">
            {selectedAreas.length}
          </span>

          <span className="text-muted-foreground">
            nodes
          </span>
        </motion.div>
      </div>

    </div>
  );
};

export default HumanSilhouette;