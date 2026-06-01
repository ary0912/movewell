'use client';

import { DAILY_IMPACT_QUESTIONS } from "@utils/constants";

import AssessmentCard from "@components/ui/AssessmentCard";
import AssessmentSlider from "@components/ui/AssessmentSlider";

import { useFormContext } from "react-hook-form";
import { getSeverity } from "@utils/scoring";

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

<AssessmentCard
                  categoryLabel={config.label}
                  title={question.description}
                  statusLabel={severity.label}
                  statusTone={severity.tone}
                  icon={Icon}
                  iconAccent={config.accent}
                  glowClass={config.glow}
                  score={impact}
                  scoreSuffix="/10"
                  className="p-5"
                >
                  <AssessmentSlider
                    title="Impact level"
                    description="Adjust how much this factor affects your day."
                    valueLabel={`${impact}/10`}
                    helperText={severity.description}
                    min={0}
                    max={10}
                    step={1}
                    value={impact}
                    tickLabels={[
                      'None',
                      'Mild',
                      'Moderate',
                      'High',
                      'Severe',
                    ]}
                    leftLabel="0"
                    rightLabel="10"
                    aria-label={`Daily impact for ${question.description}`}
                    onChange={(event) =>
                      handleImpactChange(
                        question.id,
                        Number(event.target.value)
                      )
                    }
                    showValue
                  />
                </AssessmentCard>

              </motion.div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default StepImpact;