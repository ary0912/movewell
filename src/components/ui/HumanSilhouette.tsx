'use client';

import React, {
  useMemo,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import { cn } from "@/lib/utils";
import type { BodyArea } from "@/types";

/* =========================================================
   TYPES
========================================================= */

interface HumanSilhouetteProps {
  selectedAreas: BodyArea[];

  onAreaToggle: (
    area: BodyArea
  ) => void;

  className?: string;

  compact?: boolean;
}

/* =========================================================
   AREA CONFIG
========================================================= */

type AreaConfig = {
  id: BodyArea;
  label: string;
  cx: number;
  cy: number;
  r: number;
};

const buildAreas = (
  compact: boolean
): AreaConfig[] => [

    {
      id: "neck",
      label: "Neck",
      cx: 100,
      cy: 38,
      r: compact ? 6 : 9,
    },

    {
      id: "shoulder",
      label: "Shoulder",
      cx: 72,
      cy: 58,
      r: compact ? 8 : 11,
    },

    {
      id: "shoulder",
      label: "Shoulder",
      cx: 128,
      cy: 58,
      r: compact ? 8 : 11,
    },

    {
      id: "elbow",
      label: "Elbow",
      cx: 50,
      cy: 105,
      r: compact ? 6 : 9,
    },

    {
      id: "elbow",
      label: "Elbow",
      cx: 150,
      cy: 105,
      r: compact ? 6 : 9,
    },

    {
      id: "wrist",
      label: "Wrist",
      cx: 38,
      cy: 155,
      r: compact ? 5 : 7,
    },

    {
      id: "wrist",
      label: "Wrist",
      cx: 162,
      cy: 155,
      r: compact ? 5 : 7,
    },

    {
      id: "upperBack",
      label: "Upper Back",
      cx: 100,
      cy: 82,
      r: compact ? 9 : 14,
    },

    {
      id: "lowerBack",
      label: "Lower Back",
      cx: 100,
      cy: 130,
      r: compact ? 9 : 14,
    },

    {
      id: "hip",
      label: "Hip",
      cx: 78,
      cy: 165,
      r: compact ? 7 : 11,
    },

    {
      id: "hip",
      label: "Hip",
      cx: 122,
      cy: 165,
      r: compact ? 7 : 11,
    },

    {
      id: "knee",
      label: "Knee",
      cx: 78,
      cy: 245,
      r: compact ? 7 : 11,
    },

    {
      id: "knee",
      label: "Knee",
      cx: 122,
      cy: 245,
      r: compact ? 7 : 11,
    },

    {
      id: "ankle",
      label: "Ankle",
      cx: 82,
      cy: 310,
      r: compact ? 5 : 7,
    },

    {
      id: "ankle",
      label: "Ankle",
      cx: 118,
      cy: 310,
      r: compact ? 5 : 7,
    },
  ];

/* =========================================================
   COMPONENT
========================================================= */

const HumanSilhouette: React.FC<
  HumanSilhouetteProps
> = ({
  selectedAreas,
  onAreaToggle,
  className,
  compact = false,
}) => {

    const [hovered, setHovered] =
      useState<BodyArea | null>(
        null
      );

    const areas = useMemo(
      () => buildAreas(compact),
      [compact]
    );

    const hasSelection =
      selectedAreas.length > 0;

    /* =====================================================
       UI
    ===================================================== */

    return (

      <div
        className={cn(

          `
          relative
          w-full
          `,

          compact
            ? "max-w-[460px]"
            : "max-w-[560px]",

          className
        )}
      >

        {/* =================================================
            GLOW
        ================================================= */}

        {!compact && (

          <div
            className="
              pointer-events-none
              absolute inset-0
              flex items-center justify-center
            "
          >

            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.04, 0.08, 0.04],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-[320px]
                w-[320px]

                rounded-full

                bg-clay-brand-peach

                blur-[110px]
              "
            />

          </div>

        )}

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div
          className={cn(

            `
            relative z-10

            overflow-hidden

            rounded-[30px]

            border border-clay-hairline

            bg-clay-surface-card
            `,

            compact
              ? `
                px-4
                py-5
              `
              : `
                p-8
                md:p-10
              `
          )}
        >

          {/* =================================================
              HEADER
          ================================================= */}

          {!compact && (

            <div className="mb-10 text-center">

              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-clay-hairline

                  bg-clay-canvas

                  px-4 py-2
                "
              >

                <div
                  className="
                    h-2 w-2
                    rounded-full
                    bg-clay-brand-coral
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-medium
                    tracking-[0.08em]
                    text-clay-muted
                  "
                >
                  Anatomical Mapping
                </span>

              </div>

              <h3
                className="
                  mt-6

                  text-[34px]

                  leading-[1]

                  tracking-[-0.06em]

                  font-medium

                  text-clay-ink

                  clay-display
                "
              >
                Select affected areas
              </h3>

              <p
                className="
                  mx-auto mt-4

                  max-w-[340px]

                  text-[15px]

                  leading-[1.8]

                  text-clay-body
                "
              >
                Tap body regions where you feel
                discomfort or movement restriction.
              </p>

            </div>

          )}

          {/* =================================================
              BODY WRAPPER
          ================================================= */}

          <div
            className={cn(

              `
              relative

              flex items-center justify-center

              overflow-hidden

              rounded-[26px]

              border border-clay-hairline
              `,

              compact
                ? `
                  min-h-[380px]

                  bg-[#F7F3EA]

                  px-2
                  py-2
                `
                : `
                  bg-[#F8F5EE]

                  px-6
                  py-8
                `
            )}
          >

            {/* GRID */}

            <div
              className="
                pointer-events-none
                absolute inset-0

                opacity-[0.025]

                [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]

                [background-size:30px_30px]
              "
            />

            {/* =================================================
                SVG
            ================================================= */}

            <svg
              viewBox="0 0 200 360"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              className={cn(

                `
                relative z-10

                w-full

                overflow-visible
                `,

                compact
                  ? `
                    h-[350px]
                    max-w-[220px]
                  `
                  : `
                    h-auto
                    max-w-[360px]
                  `
              )}
            >

              {/* BODY */}

              <motion.path
                initial={{
                  opacity: 0,
                  pathLength: 0,
                }}
                animate={{
                  opacity: 1,
                  pathLength: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                d="M100 15C110 15 118 23 118 33C118 43 110 51 100 51C90 51 82 43 82 33C82 23 90 15 100 15ZM100 51C130 51 155 62 162 85C168 110 175 135 175 160C175 185 165 190 155 190C145 190 140 180 140 165V120C140 115 135 110 128 110H72C65 110 60 115 60 120V165C60 180 55 190 45 190C35 190 25 185 25 160C25 135 32 110 38 85C45 62 70 51 100 51ZM78 165V230C78 245 72 260 65 275L50 330C48 345 58 355 70 355C82 355 88 345 88 330L95 280H105L112 330C112 345 118 355 130 355C142 355 152 345 150 330L135 275C128 260 122 245 122 230V165H78Z"
                className="
                  fill-[#FCFAF5]
                  stroke-[#DDD5C7]
                "
                strokeWidth={
                  compact
                    ? 1
                    : 1.2
                }
              />

              {/* =================================================
                  NODES
              ================================================= */}

              {areas.map((
                area,
                index
              ) => {

                const isSelected =
                  selectedAreas.includes(
                    area.id
                  );

                const isHovered =
                  hovered === area.id;

                return (

                  <g
                    key={`${area.id}-${index}`}

                    role="button"

                    tabIndex={0}

                    aria-label={
                      area.label
                    }

                    aria-pressed={
                      isSelected
                    }

                    style={{
                      pointerEvents: "all",
                    }}

                    onClick={() => {
                      onAreaToggle(area.id);
                    }}

                    onMouseEnter={() =>
                      setHovered(area.id)
                    }

                    onMouseLeave={() =>
                      setHovered(null)
                    }

                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter" ||
                        e.key === " "
                      ) {

                        e.preventDefault();

                        onAreaToggle(
                          area.id
                        );

                      }

                    }}

                    className="
                      cursor-pointer
                    "
                  >

                    {/* HIT AREA */}

                    <circle
                      cx={area.cx}
                      cy={area.cy}
                      r={
                        compact
                          ? area.r + 14
                          : area.r + 18
                      }
                      fill="transparent"
                      style={{
                        pointerEvents: "all",
                      }}
                    />

                    {/* PULSE */}

                    {isSelected && (

                      <motion.circle
                        cx={area.cx}
                        cy={area.cy}
                        r={area.r}

                        initial={{
                          scale: 0.8,
                          opacity: 0.22,
                        }}

                        animate={{
                          scale: compact
                            ? 1.9
                            : 2.2,
                          opacity: 0,
                        }}

                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}

                        className="
                          fill-clay-brand-coral
                        "

                        style={{
                          pointerEvents: "none",
                        }}
                      />

                    )}

                    {/* NODE */}

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
                            ? "#0A0A0A"
                            : isHovered
                              ? "#FFFFFF"
                              : "#FCFCFC",

                        stroke:
                          isSelected
                            ? "#FF6B5A"
                            : isHovered
                              ? "#111111"
                              : "#D8D2C7",
                      }}

                      transition={{
                        duration: 0.16,
                      }}

                      strokeWidth={
                        isSelected
                          ? 2
                          : 1.2
                      }

                      className={cn(

                        `
                        transition-opacity duration-300
                        `,

                        hasSelection &&
                        !isSelected &&
                        "opacity-40"
                      )}

                      style={{
                        pointerEvents: "none",
                      }}
                    />

                    {/* INNER DOT */}

                    <motion.circle
                      cx={area.cx}
                      cy={area.cy}

                      r={
                        compact
                          ? 1.6
                          : 2.2
                      }

                      animate={{
                        fill:
                          isSelected
                            ? "#FFFFFF"
                            : isHovered
                              ? "#111111"
                              : "#8F8B82",
                      }}

                      transition={{
                        duration: 0.16,
                      }}

                      style={{
                        pointerEvents: "none",
                      }}
                    />

                  </g>

                );
              })}

            </svg>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          {!compact && (

            <div className="mt-8 flex justify-center">

              <motion.div
                key={selectedAreas.length}

                initial={{
                  opacity: 0,
                  y: 4,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.2,
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

                    `
                    h-2.5 w-2.5
                    rounded-full
                    transition-all duration-300
                    `,

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

          )}

        </div>

      </div>
    );
  };

export default React.memo(
  HumanSilhouette
);