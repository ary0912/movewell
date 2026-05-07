'use client';

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import type { BodyArea } from "@/types";

import {
  motion,
  AnimatePresence
} from "framer-motion";

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

  const [hovered, setHovered] =
    useState<BodyArea | null>(null);

  const areas = [
    { id: 'neck', label: "Neck", cx: 100, cy: 38, r: 9 },

    { id: 'shoulder', label: "Shoulder", cx: 72, cy: 58, r: 11 },
    { id: 'shoulder', label: "Shoulder", cx: 128, cy: 58, r: 11 },

    { id: 'elbow', label: "Elbow", cx: 50, cy: 105, r: 9 },
    { id: 'elbow', label: "Elbow", cx: 150, cy: 105, r: 9 },

    { id: 'wrist', label: "Wrist", cx: 38, cy: 155, r: 7 },
    { id: 'wrist', label: "Wrist", cx: 162, cy: 155, r: 7 },

    { id: 'upperBack', label: "Upper Back", cx: 100, cy: 80, r: 14 },
    { id: 'lowerBack', label: "Lower Back", cx: 100, cy: 130, r: 14 },

    { id: 'hip', label: "Hip", cx: 78, cy: 165, r: 11 },
    { id: 'hip', label: "Hip", cx: 122, cy: 165, r: 11 },

    { id: 'knee', label: "Knee", cx: 78, cy: 245, r: 11 },
    { id: 'knee', label: "Knee", cx: 122, cy: 245, r: 11 },

    { id: 'ankle', label: "Ankle", cx: 82, cy: 310, r: 7 },
    { id: 'ankle', label: "Ankle", cx: 118, cy: 310, r: 7 },
  ];

  const hasSelection =
    selectedAreas.length > 0;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[480px]",
        className
      )}
    >

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

        <motion.div
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="
            h-[340px] w-[340px]
            rounded-full
            bg-clay-brand-peach
            blur-[120px]
          "
        />

      </div>

      {/* Main Card */}
      <div
        className="
          relative z-10
          rounded-[24px]
          border border-clay-hairline
          bg-clay-surface-card
          p-6 md:p-8
        "
      >

        {/* Header */}
        <div className="mb-8 text-center">

          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              bg-clay-canvas
              border border-clay-hairline
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
              Body Mapping
            </span>

          </div>

          <h3
            className="
              mt-6
              text-[32px]
              leading-[1.1]
              tracking-[-0.5px]
              text-clay-ink
              font-medium
              clay-display
            "
          >
            Select affected areas
          </h3>

          <p
            className="
              mx-auto mt-4
              max-w-sm
              text-[16px]
              leading-[1.6]
              text-clay-body
            "
          >
            Tap the body regions where you currently
            feel discomfort, tension, or mobility restriction.
          </p>

        </div>

        {/* Silhouette */}
        <div className="relative">

          <svg
            viewBox="0 0 200 360"
            className="relative z-10 h-auto w-full"
            fill="none"
          >

            {/* Body Shape */}
            <motion.path
              initial={{
                opacity: 0,
                pathLength: 0
              }}
              animate={{
                opacity: 1,
                pathLength: 1
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              d="M100 15C110 15 118 23 118 33C118 43 110 51 100 51C90 51 82 43 82 33C82 23 90 15 100 15ZM100 51C130 51 155 62 162 85C168 110 175 135 175 160C175 185 165 190 155 190C145 190 140 180 140 165V120C140 115 135 110 128 110H72C65 110 60 115 60 120V165C60 180 55 190 45 190C35 190 25 185 25 160C25 135 32 110 38 85C45 62 70 51 100 51ZM78 165V230C78 245 72 260 65 275L50 330C48 345 58 355 70 355C82 355 88 345 88 330L95 280H105L112 330C112 345 118 355 130 355C142 355 152 345 150 330L135 275C128 260 122 245 122 230V165H78Z"
              className="
                fill-clay-canvas
                stroke-clay-hairline
              "
              strokeWidth="1.2"
            />

            {/* Interactive Nodes */}
            {areas.map((area, index) => {

              const isSelected =
                selectedAreas.includes(
                  area.id as BodyArea
                );

              const isHovered =
                hovered ===
                (area.id as BodyArea);

              return (
                <g
                  key={`${area.id}-${index}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={area.label}
                  onClick={() =>
                    onAreaToggle(
                      area.id as BodyArea
                    )
                  }
                  onMouseEnter={() =>
                    setHovered(
                      area.id as BodyArea
                    )
                  }
                  onMouseLeave={() =>
                    setHovered(null)
                  }
                  className="cursor-pointer"
                >

                  {/* Hit Area */}
                  <circle
                    cx={area.cx}
                    cy={area.cy}
                    r={area.r + 12}
                    className="fill-transparent"
                  />

                  {/* Pulse */}
                  <AnimatePresence>

                    {isSelected && (
                      <motion.circle
                        initial={{
                          scale: 0,
                          opacity: 0.3
                        }}
                        animate={{
                          scale: 2.2,
                          opacity: 0
                        }}
                        exit={{
                          opacity: 0
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        cx={area.cx}
                        cy={area.cy}
                        r={area.r}
                        className="fill-clay-brand-coral"
                      />
                    )}

                  </AnimatePresence>

                  {/* Main Node */}
                  <motion.circle
                    cx={area.cx}
                    cy={area.cy}
                    r={area.r}
                    animate={{
                      scale:
                        isHovered
                          ? 1.08
                          : 1,

                      fill:
                        isSelected
                          ? "#0a0a0a"
                          : isHovered
                            ? "#fffaf0"
                            : "#ffffff",

                      stroke:
                        isSelected
                          ? "#ff6b5a"
                          : isHovered
                            ? "#0a0a0a"
                            : "#e5e5e5"
                    }}
                    transition={{
                      duration: 0.18
                    }}
                    strokeWidth={
                      isSelected ? 2 : 1.2
                    }
                    className={cn(
                      "transition-opacity duration-300",
                      hasSelection &&
                      !isSelected &&
                      "opacity-40"
                    )}
                  />

                  {/* Inner Dot */}
                  <motion.circle
                    cx={area.cx}
                    cy={area.cy}
                    r={2.3}
                    animate={{
                      fill:
                        isSelected
                          ? "#ffffff"
                          : isHovered
                            ? "#0a0a0a"
                            : "#9a9a9a"
                    }}
                    transition={{
                      duration: 0.18
                    }}
                  />

                  {/* Tooltip */}
                  <AnimatePresence>

                    {isHovered && (
                      <motion.foreignObject
                        x={area.cx - 48}
                        y={area.cy - 50}
                        width="96"
                        height="36"
                        initial={{
                          opacity: 0,
                          y: 6,
                          scale: 0.96
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1
                        }}
                        exit={{
                          opacity: 0,
                          y: 4,
                          scale: 0.96
                        }}
                        transition={{
                          duration: 0.16
                        }}
                      >

                        <div
                          className="
                            flex h-full w-full
                            items-center justify-center
                            rounded-[12px]
                            bg-clay-primary
                            text-white
                            text-[12px]
                            font-medium
                            shadow-sm
                          "
                        >
                          {area.label}
                        </div>

                      </motion.foreignObject>
                    )}

                  </AnimatePresence>

                </g>
              );
            })}

          </svg>

        </div>

        {/* Footer Status */}
        <div className="mt-8 flex justify-center">

          <motion.div
            key={selectedAreas.length}
            initial={{
              opacity: 0,
              y: 6
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.25
            }}
            className="
              flex items-center gap-3
              rounded-full
              border border-clay-hairline
              bg-clay-canvas
              px-5 py-3
            "
          >

            <div
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                selectedAreas.length > 0
                  ? "bg-clay-brand-coral"
                  : "bg-clay-muted-soft"
              )}
            />

            <span
              className="
                text-[13px]
                font-medium
                text-clay-body
              "
            >

              {selectedAreas.length > 0 ? (
                <>
                  {selectedAreas.length} area
                  {selectedAreas.length > 1
                    ? "s"
                    : ""} selected
                </>
              ) : (
                <>No areas selected</>
              )}

            </span>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default HumanSilhouette;