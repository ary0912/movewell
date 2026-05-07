'use client';

import { DAILY_IMPACT_QUESTIONS } from "@utils/constants";

import { Card } from "@components/ui/Card";

import { cn } from "@/lib/utils";

import { useFormContext } from "react-hook-form";

import type {
  AssessmentFormValues,
} from "@utils/schemas";

import {
  Briefcase,
  Moon,
  Activity,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

/* =========================================================
   CATEGORY CONFIG
========================================================= */

const categoryConfig = {

  work: {
    icon: Briefcase,
    label: "Work",
    accent:
      "bg-clay-brand-lavender/14 text-clay-ink",
    glow:
      "from-clay-brand-lavender/8 via-transparent to-transparent",
  },

  sleep: {
    icon: Moon,
    label: "Sleep",
    accent:
      "bg-clay-brand-peach/14 text-clay-ink",
    glow:
      "from-clay-brand-peach/8 via-transparent to-transparent",
  },

  activity: {
    icon: Activity,
    label: "Movement",
    accent:
      "bg-clay-brand-mint/16 text-clay-ink",
    glow:
      "from-clay-brand-mint/8 via-transparent to-transparent",
  },
};

/* =========================================================
   COMPONENT
========================================================= */

function StepImpact() {

  const {
    watch,
    setValue,
  } =
    useFormContext<AssessmentFormValues>();

  const dailyImpact =
    watch("dailyImpact") || [];

  /* =====================================================
     UPDATE
  ===================================================== */

  const handleImpactChange = (
    questionId: string,
    impact: number
  ) => {

    const question =
      DAILY_IMPACT_QUESTIONS.find(
        (q) => q.id === questionId
      );

    if (!question) return;

    const updated =
      [...dailyImpact];

    const index =
      updated.findIndex(
        (q) => q.id === questionId
      );

    if (index >= 0) {

      updated[index] = {
        ...updated[index],
        impact,
      };

    } else {

      updated.push({
        id: questionId,
        category: question.category,
        impact,
        description:
          question.description,
      });
    }

    setValue(
      "dailyImpact",
      updated,
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
    dailyImpact.length > 0
      ? Math.round(
        dailyImpact.reduce(
          (acc, item) =>
            acc + item.impact,
          0
        ) /
        dailyImpact.length
      )
      : 0;

  const highImpactCount =
    dailyImpact.filter(
      (item) =>
        item.impact >= 7
    ).length;

  const getSeverity = (
    impact: number
  ) => {

    if (impact <= 2) {

      return {
        label: "Minimal",
        tone:
          "bg-clay-brand-mint/14 text-clay-ink",
      };
    }

    if (impact <= 5) {

      return {
        label: "Moderate",
        tone:
          "bg-clay-brand-peach/14 text-clay-ink",
      };
    }

    if (impact <= 7) {

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

            from-clay-brand-lavender/5
            via-transparent
            to-clay-brand-peach/5
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
                Lifestyle Impact
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
              Understand daily recovery impact.
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
              Measure how symptoms affect focus,
              sleep quality, and everyday movement.
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
                High Impact
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
                {highImpactCount}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          IMPACT CARDS
      ================================================= */}

      <div
        className="
          grid gap-5

          xl:grid-cols-2
        "
      >

        {DAILY_IMPACT_QUESTIONS.map(
          (question) => {

            const answer =
              dailyImpact.find(
                (q) =>
                  q.id === question.id
              );

            const impact =
              answer?.impact || 0;

            const severity =
              getSeverity(impact);

            const config =
              categoryConfig[
              question.category as keyof typeof categoryConfig
              ];

            const Icon =
              config.icon;

            return (

              <motion.div
                key={question.id}

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

                    {/* =====================================
                        HEADER
                    ===================================== */}

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

                              max-w-[320px]

                              text-[1.15rem]

                              leading-[1.35]

                              tracking-[-0.03em]

                              text-clay-ink
                            "
                          >
                            {
                              question.description
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
                          {impact}
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

                    {/* =====================================
                        SLIDER
                    ===================================== */}

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
                              width: `${impact * 10}%`,
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
                          type="range"
                          min="0"
                          max="10"
                          value={impact}

                          onChange={(e) =>
                            handleImpactChange(
                              question.id,
                              Number(
                                e.target.value
                              )
                            )
                          }

                          aria-label={`Daily impact for ${question.description}`}

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

                                impact >=
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

                                impact >=
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
          }
        )}

      </div>

    </div>
  );
}

export default StepImpact;