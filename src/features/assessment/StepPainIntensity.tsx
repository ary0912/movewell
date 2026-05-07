'use client';

import type { BodyArea } from "../../types";

import { BODY_AREA_LABELS } from "@utils/constants";

import { Card } from "@components/ui/Card";

import { cn } from "@/lib/utils";

import { useFormContext } from "react-hook-form";

import type {
  AssessmentFormValues,
} from "@utils/schemas";

import {
  Activity,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

/* =========================================================
   AREA CONFIG
========================================================= */

const painAreaConfig: Record<
  string,
  {
    label: string;
    accent: string;
    glow: string;
    icon: React.ElementType;
  }
> = {

  neck: {
    label: "Neck",
    accent:
      "bg-clay-brand-lavender/14 text-clay-ink",
    glow:
      "from-clay-brand-lavender/8 via-transparent to-transparent",
    icon: Waves,
  },

  shoulder: {
    label: "Shoulders",
    accent:
      "bg-clay-brand-peach/14 text-clay-ink",
    glow:
      "from-clay-brand-peach/8 via-transparent to-transparent",
    icon: Activity,
  },

  upperBack: {
    label: "Upper Back",
    accent:
      "bg-clay-brand-ochre/14 text-clay-ink",
    glow:
      "from-clay-brand-ochre/8 via-transparent to-transparent",
    icon: Activity,
  },

  lowerBack: {
    label: "Lower Back",
    accent:
      "bg-clay-brand-mint/16 text-clay-ink",
    glow:
      "from-clay-brand-mint/8 via-transparent to-transparent",
    icon: Activity,
  },

  knee: {
    label: "Knees",
    accent:
      "bg-clay-brand-pink/12 text-clay-ink",
    glow:
      "from-clay-brand-pink/8 via-transparent to-transparent",
    icon: HeartPulse,
  },

  hip: {
    label: "Hips",
    accent:
      "bg-clay-brand-lavender/14 text-clay-ink",
    glow:
      "from-clay-brand-lavender/8 via-transparent to-transparent",
    icon: Activity,
  },

  elbow: {
    label: "Elbows",
    accent:
      "bg-clay-brand-peach/12 text-clay-ink",
    glow:
      "from-clay-brand-peach/8 via-transparent to-transparent",
    icon: Zap,
  },

  wrist: {
    label: "Wrists",
    accent:
      "bg-clay-brand-mint/14 text-clay-ink",
    glow:
      "from-clay-brand-mint/8 via-transparent to-transparent",
    icon: Waves,
  },

  ankle: {
    label: "Ankles",
    accent:
      "bg-clay-brand-ochre/12 text-clay-ink",
    glow:
      "from-clay-brand-ochre/8 via-transparent to-transparent",
    icon: HeartPulse,
  },
};

/* =========================================================
   COMPONENT
========================================================= */

function StepPainIntensity() {

  const {
    watch,
    setValue,
  } =
    useFormContext<AssessmentFormValues>();

  const painAreas =
    (watch("painAreas") || []) as BodyArea[];

  const painIntensity =
    watch("painIntensity") || {};

  /* =====================================================
     UPDATE
  ===================================================== */

  const handleIntensityChange = (
    area: BodyArea,
    value: number
  ) => {

    setValue(
      `painIntensity.${area}`,
      value,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  /* =====================================================
     METRICS
  ===================================================== */

  const overallAverage =
    painAreas.length > 0
      ? Math.round(
        painAreas.reduce(
          (acc, area) =>
            acc +
            (painIntensity[area] || 0),
          0
        ) / painAreas.length
      )
      : 0;

  const highPainCount =
    painAreas.filter(
      (area) =>
        (painIntensity[area] || 0) >= 7
    ).length;

  const getSeverity = (
    intensity: number
  ) => {

    if (intensity <= 2) {

      return {
        label: "Minimal",
        tone:
          "bg-clay-brand-mint/14 text-clay-ink",
      };
    }

    if (intensity <= 5) {

      return {
        label: "Moderate",
        tone:
          "bg-clay-brand-peach/14 text-clay-ink",
      };
    }

    if (intensity <= 7) {

      return {
        label: "Elevated",
        tone:
          "bg-clay-brand-ochre/14 text-clay-ink",
      };
    }

    return {
      label: "Severe",
      tone:
        "bg-clay-brand-pink/14 text-clay-ink",
    };
  };

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  if (painAreas.length === 0) {

    return (

      <div
        className="
          relative overflow-hidden

          rounded-[32px]

          border border-dashed border-clay-hairline

          bg-clay-surface-soft

          px-8 py-14
        "
      >

        <div
          className="
            absolute inset-0

            bg-gradient-to-br

            from-clay-brand-peach/8
            via-transparent
            to-clay-brand-lavender/8
          "
        />

        <div
          className="
            relative z-10

            flex flex-col items-center

            text-center
          "
        >

          <div
            className="
              flex h-16 w-16
              items-center justify-center

              rounded-[24px]

              bg-white

              shadow-sm
            "
          >

            <AlertTriangle
              size={28}
              className="
                text-clay-muted
              "
            />

          </div>

          <h3
            className="
              mt-7

              text-[1.6rem]

              tracking-[-0.04em]

              text-clay-ink
            "
          >
            No regions selected
          </h3>

          <p
            className="
              mt-4

              max-w-md

              text-[15px]

              leading-[1.85]

              text-clay-body
            "
          >
            Return to the previous step and
            select affected regions to continue
            the intensity assessment.
          </p>

        </div>

      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="space-y-6">

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative overflow-hidden

          rounded-[32px]

          border border-clay-hairline

          bg-white/[0.72]

          px-6 py-6

          backdrop-blur-2xl
        "
      >

        <div
          className="
            absolute inset-0

            bg-gradient-to-br

            from-clay-brand-peach/5
            via-transparent
            to-clay-brand-lavender/5
          "
        />

        <div
          className="
            relative z-10

            flex flex-col gap-8

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          {/* LEFT */}

          <div className="max-w-2xl">

            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-clay-hairline

                bg-clay-surface-soft

                px-4 py-2
              "
            >

              <Sparkles size={12} />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-clay-muted
                "
              >
                Intensity Mapping
              </span>

            </div>

            <h2
              className="
                mt-5

                text-[2.2rem]

                leading-[0.95]

                tracking-[-0.06em]

                text-clay-ink

                clay-display

                md:text-[3.2rem]
              "
            >
              Measure discomfort intensity.
            </h2>

            <p
              className="
                mt-4

                max-w-xl

                text-[15px]

                leading-[1.8]

                text-clay-body
              "
            >
              Adjust the intensity level for each
              selected movement region.
            </p>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex items-center gap-4
            "
          >

            {/* AVG */}

            <div
              className="
                rounded-[24px]

                border border-clay-hairline

                bg-white/70

                px-5 py-4
              "
            >

              <div
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-clay-muted
                "
              >
                Average
              </div>

              <div
                className="
                  mt-2

                  text-[2.8rem]

                  leading-none

                  tracking-[-0.06em]

                  text-clay-ink

                  clay-display
                "
              >
                {overallAverage}
              </div>

            </div>

            {/* HIGH */}

            <div
              className="
                rounded-[24px]

                border border-clay-hairline

                bg-white/70

                px-5 py-4
              "
            >

              <div
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-clay-muted
                "
              >
                High
              </div>

              <div
                className="
                  mt-2

                  text-[2.8rem]

                  leading-none

                  tracking-[-0.06em]

                  text-clay-ink

                  clay-display
                "
              >
                {highPainCount}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          REGION CARDS
      ================================================= */}

      <div
        className="
          grid gap-5

          xl:grid-cols-2
        "
      >

        {painAreas.map((area) => {

          const intensity =
            painIntensity[area] || 0;

          const severity =
            getSeverity(intensity);

          const config =
            painAreaConfig[area];

          const Icon =
            config.icon;

          return (

            <motion.div
              key={area}

              initial={{
                opacity: 0,
                y: 8,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}
            >

              <Card
                variant="cream"
                hover={false}
                className="
                  relative overflow-hidden

                  rounded-[28px]

                  border border-clay-hairline/60

                  bg-white/[0.78]

                  px-5 py-5

                  backdrop-blur-xl

                  transition-all duration-300

                  hover:border-black/5
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                "
              >

                {/* GLOW */}

                <div
                  className={cn(

                    `
                    absolute inset-0

                    bg-gradient-to-br

                    opacity-70
                    `,

                    config.glow
                  )}
                />

                <div className="relative z-10">

                  {/* =================================================
                      HEADER
                  ================================================= */}

                  <div
                    className="
                      flex items-start
                      justify-between
                      gap-4
                    "
                  >

                    {/* LEFT */}

                    <div className="flex gap-4">

                      <div
                        className={cn(

                          `
                          flex h-11 w-11
                          shrink-0
                          items-center justify-center

                          rounded-[16px]
                          `,

                          config.accent
                        )}
                      >
                        <Icon size={18} />
                      </div>

                      <div>

                        <div
                          className="
                            flex flex-wrap
                            items-center gap-2
                          "
                        >

                          <span
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.14em]
                              text-clay-muted
                            "
                          >
                            {config.label}
                          </span>

                          <span
                            className={cn(

                              `
                              rounded-full

                              px-2.5 py-1

                              text-[9px]
                              font-semibold

                              uppercase

                              tracking-[0.12em]
                              `,

                              severity.tone
                            )}
                          >
                            {severity.label}
                          </span>

                        </div>

                        <h3
                          className="
                            mt-2

                            text-[1.2rem]

                            leading-[1.1]

                            tracking-[-0.04em]

                            text-clay-ink
                          "
                        >
                          {
                            BODY_AREA_LABELS[
                            area
                            ]
                          }
                        </h3>

                      </div>

                    </div>

                    {/* SCORE */}

                    <div
                      className="
                        flex items-center gap-1.5

                        rounded-[16px]

                        border border-clay-hairline

                        bg-clay-canvas

                        px-3 py-2
                      "
                    >

                      <div
                        className="
                          text-[1.35rem]

                          leading-none

                          tracking-[-0.05em]

                          text-clay-ink

                          clay-display
                        "
                      >
                        {intensity}
                      </div>

                      <div
                        className="
                          text-[10px]
                          font-medium
                          text-clay-muted
                        "
                      >
                        /10
                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      SLIDER
                  ================================================= */}

                  <div className="mt-6">

                    {/* TRACK */}

                    <div className="relative">

                      <div
                        className="
                          h-[8px]

                          overflow-hidden

                          rounded-full

                          bg-clay-surface-strong
                        "
                      >

                        <motion.div
                          initial={false}

                          animate={{
                            width: `${intensity * 10}%`,
                          }}

                          transition={{
                            duration: 0.35,
                          }}

                          className="
                            h-full

                            rounded-full

                            bg-[#111111]
                          "
                        />

                      </div>

                      {/* INPUT */}

                      <input
                        id={`intensity-${area}`}
                        type="range"
                        min="0"
                        max="10"
                        value={intensity}

                        onChange={(e) =>
                          handleIntensityChange(
                            area,
                            Number(
                              e.target.value
                            )
                          )
                        }

                        aria-label={`Pain intensity for ${BODY_AREA_LABELS[area]}`}

                        className="
                          absolute inset-0

                          h-[8px] w-full

                          cursor-pointer

                          appearance-none

                          bg-transparent

                          opacity-0
                        "
                      />

                    </div>

                    {/* SCALE */}

                    <div
                      className="
                        mt-4

                        flex items-center
                        justify-between
                      "
                    >

                      {[
                        "None",
                        "Mild",
                        "Moderate",
                        "High",
                        "Severe",
                      ].map((label, i) => (

                        <div
                          key={label}
                          className="
                            flex flex-col
                            items-center gap-1.5
                          "
                        >

                          <div
                            className={cn(

                              `
                              h-2 w-2

                              rounded-full

                              transition-all duration-300
                              `,

                              intensity >=
                                i * 2
                                ? "bg-[#111111]"
                                : "bg-clay-hairline"
                            )}
                          />

                          <span
                            className={cn(

                              `
                              text-[9px]

                              font-semibold

                              uppercase

                              tracking-[0.12em]
                              `,

                              intensity >=
                                i * 2
                                ? "text-clay-ink"
                                : "text-clay-muted-soft"
                            )}
                          >
                            {label}
                          </span>

                        </div>
                      ))}

                    </div>

                  </div>

                </div>

              </Card>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}

export default StepPainIntensity;