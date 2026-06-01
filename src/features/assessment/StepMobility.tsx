'use client';

import { MOBILITY_QUESTIONS } from "@utils/constants";

import AssessmentCard from "@components/ui/AssessmentCard";
import AssessmentSlider from "@components/ui/AssessmentSlider";

import { useFormContext } from "react-hook-form";
import { getSeverity } from "@utils/scoring";
import type {
  AssessmentFormValues,
} from "@utils/schemas";

import {
  Activity,
  Move,
  Sparkles,
  StretchHorizontal,
} from "lucide-react";

import { motion } from "framer-motion";

/* =========================================================
   AREA CONFIG
========================================================= */

const mobilityAreaConfig = {

  neck: {
    label: "Neck",
    accent:
      "bg-clay-brand-lavender/14 text-clay-ink",
    glow:
      "from-clay-brand-lavender/8 via-transparent to-transparent",
    icon: Move,
  },

  shoulder: {
    label: "Shoulders",
    accent:
      "bg-clay-brand-peach/14 text-clay-ink",
    glow:
      "from-clay-brand-peach/8 via-transparent to-transparent",
    icon: Activity,
  },

  back: {
    label: "Spine",
    accent:
      "bg-clay-brand-ochre/14 text-clay-ink",
    glow:
      "from-clay-brand-ochre/8 via-transparent to-transparent",
    icon: StretchHorizontal,
  },

  lowerBody: {
    label: "Lower Body",
    accent:
      "bg-clay-brand-mint/16 text-clay-ink",
    glow:
      "from-clay-brand-mint/8 via-transparent to-transparent",
    icon: Activity,
  },
};

/* =========================================================
   COMPONENT
========================================================= */

function StepMobility() {

  const {
    watch,
    setValue,
  } =
    useFormContext<AssessmentFormValues>();

  const mobilityDifficulty =
    watch("mobilityDifficulty") || [];

  /* =====================================================
     UPDATE
  ===================================================== */

  const handleDifficultyChange = (
    questionId: string,
    difficulty: number
  ) => {

    const question =
      MOBILITY_QUESTIONS.find(
        (q) => q.id === questionId
      );

    if (!question) return;

    const updated =
      [...mobilityDifficulty];

    const index =
      updated.findIndex(
        (q) => q.id === questionId
      );

    if (index >= 0) {

      updated[index] = {
        ...updated[index],
        difficulty,
      };

    } else {

      updated.push({
        id: questionId,
        question: question.question,
        area: question.area,
        difficulty,
      });
    }

    setValue(
      "mobilityDifficulty",
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
    mobilityDifficulty.length > 0
      ? Math.round(
        mobilityDifficulty.reduce(
          (acc, item) =>
            acc + item.difficulty,
          0
        ) /
        mobilityDifficulty.length
      )
      : 0;

  const restrictedCount =
    mobilityDifficulty.filter(
      (item) =>
        item.difficulty >= 7
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
            to-clay-brand-mint/5
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
                Mobility Analysis
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
              Evaluate movement restriction.
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
              Measure stiffness and resistance
              during key movement patterns.
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
                Restricted
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
                {restrictedCount}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          QUESTION CARDS
      ================================================= */}

      <div
        className="
          grid gap-5

          xl:grid-cols-2
        "
      >

        {MOBILITY_QUESTIONS.map(
          (question) => {

            const answer =
              mobilityDifficulty.find(
                (q) =>
                  q.id === question.id
              );

            const difficulty =
              answer?.difficulty || 0;

            const severity =
              getSeverity(difficulty);

            const config =
              mobilityAreaConfig[
              question.area as keyof typeof mobilityAreaConfig
              ] || {
                label:
                  "Movement",
                accent:
                  "bg-clay-surface-strong text-clay-ink",
                glow:
                  "from-clay-surface-strong/20 via-transparent to-transparent",
                icon: Activity,
              };

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
                  title={question.question}
                  statusLabel={severity.label}
                  statusTone={severity.tone}
                  icon={Icon}
                  iconAccent={config.accent}
                  glowClass={config.glow}
                  score={difficulty}
                  scoreSuffix="/10"
                  scoreDescription="Mobility difficulty rating"
                  className="min-h-[330px]"
                >
                  <AssessmentSlider
                    title="Difficulty"
                    description="Rate how challenging this movement feels right now."
                    valueLabel={`${difficulty}/10`}
                    helperText={severity.description}
                    min={0}
                    max={10}
                    step={1}
                    value={difficulty}
                    tickLabels={[
                      'Fluid',
                      'Mild',
                      'Restricted',
                      'High',
                      'Severe',
                    ]}
                    leftLabel="0"
                    rightLabel="10"
                    aria-label={`Mobility difficulty for ${question.question}`}
                    onChange={(e) =>
                      handleDifficultyChange(
                        question.id,
                        Number(e.target.value)
                      )
                    }
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

export default StepMobility;