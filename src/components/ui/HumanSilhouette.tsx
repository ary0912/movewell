'use client';

import React from 'react';
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
  const areas: { id: BodyArea; label: string; cx: number; cy: number; r: number }[] = [
    { id: 'neck', label: 'Cervical Spine', cx: 100, cy: 38, r: 9 },
    { id: 'shoulder', label: 'Glenohumeral', cx: 72, cy: 58, r: 12 },
    { id: 'shoulder', label: 'Glenohumeral', cx: 128, cy: 58, r: 12 },
    { id: 'elbow', label: 'Humeroulnar', cx: 50, cy: 105, r: 10 },
    { id: 'elbow', label: 'Humeroulnar', cx: 150, cy: 105, r: 10 },
    { id: 'wrist', label: 'Radiocarpal', cx: 38, cy: 155, r: 8 },
    { id: 'wrist', label: 'Radiocarpal', cx: 162, cy: 155, r: 8 },
    { id: 'upperBack', label: 'Thoracic Region', cx: 100, cy: 80, r: 15 },
    { id: 'lowerBack', label: 'Lumbar Region', cx: 100, cy: 130, r: 15 },
    { id: 'hip', label: 'Acetabulofemoral', cx: 78, cy: 165, r: 12 },
    { id: 'hip', label: 'Acetabulofemoral', cx: 122, cy: 165, r: 12 },
    { id: 'knee', label: 'Tibiofemoral', cx: 78, cy: 245, r: 12 },
    { id: 'knee', label: 'Tibiofemoral', cx: 122, cy: 245, r: 12 },
    { id: 'ankle', label: 'Talocrural', cx: 82, cy: 310, r: 8 },
    { id: 'ankle', label: 'Talocrural', cx: 118, cy: 310, r: 8 },
  ];

  return (
    <div className={cn("relative w-full max-w-[340px] mx-auto group", className)}>
      <svg
        viewBox="0 0 200 360"
        className="w-full h-auto drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M100 15C110 15 118 23 118 33C118 43 110 51 100 51C90 51 82 43 82 33C82 23 90 15 100 15ZM100 51C130 51 155 62 162 85C168 110 175 135 175 160C175 185 165 190 155 190C145 190 140 180 140 165V120C140 115 135 110 128 110H72C65 110 60 115 60 120V165C60 180 55 190 45 190C35 190 25 185 25 160C25 135 32 110 38 85C45 62 70 51 100 51ZM78 165V230C78 245 72 260 65 275L50 330C48 345 58 355 70 355C82 355 88 345 88 330L95 280H105L112 330C112 345 118 355 130 355C142 355 152 345 150 330L135 275C128 260 122 245 122 230V165H78Z"
          className="fill-white stroke-slate-200"
          strokeWidth="1.5"
        />

        <path 
          d="M100 51V165 M80 51L70 110 M120 51L130 110" 
          className="stroke-slate-100" 
          strokeWidth="0.5" 
          strokeDasharray="4 4"
        />

        {areas.map((area, index) => {
          const isSelected = selectedAreas.includes(area.id);
          return (
            <g
              key={`${area.id}-${index}`}
              className="cursor-pointer group/node"
              onClick={() => onAreaToggle(area.id)}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.15 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                    cx={area.cx}
                    cy={area.cy}
                    r={area.r}
                    className="fill-emerald-600"
                  />
                )}
              </AnimatePresence>
              
              <motion.circle
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                cx={area.cx}
                cy={area.cy}
                r={area.r}
                className={cn(
                  "transition-all duration-300",
                  isSelected 
                    ? "fill-emerald-600 stroke-white stroke-[2.5px] shadow-lg shadow-emerald-600/20" 
                    : "fill-white stroke-slate-200 stroke-[1.5px] hover:stroke-emerald-400 hover:fill-emerald-50"
                )}
              />
              
              <circle
                cx={area.cx}
                cy={area.cy}
                r={2.5}
                className={isSelected ? "fill-white" : "fill-slate-300 group-hover/node:fill-emerald-400"}
              />
            </g>
          );
        })}
      </svg>
      
      <div className="absolute top-0 right-0 p-6 pointer-events-none text-right">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-0.5"
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">Active Map</p>
          <p className="text-xl font-bold text-slate-900 tracking-tight">
            {selectedAreas.length} <span className="text-slate-300">Nodes</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HumanSilhouette;
