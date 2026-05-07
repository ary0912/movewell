'use client';

import { MOBILITY_QUESTIONS } from "@utils/constants";
import { Card } from "@components/ui/Card";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import type { AssessmentFormValues } from "@utils/schemas";

import {
  Activity,
  ArrowRight,
  Move,
  Sparkles,
  StretchHorizontal,
} from "lucide-react";

const mobilityAreaConfig = {
  neck: {
    label: "Neck Mobility",
    accent:
      "bg-clay-brand-lavender/20 text-clay-ink",
    glow:
      "from-clay-brand-lavender/15 to-transparent",
    icon: Move,
  },

  shoulder: {
    label: "Shoulder Range",
    accent:
      "bg-clay-brand-peach/20 text-clay-ink",
    glow:
      "from-clay-brand-peach/15 to-transparent",
    icon: Activity,
  },

  back: {
    label: "Spinal Movement",
    accent:
      "bg-clay-brand-ochre/20 text-clay-ink",
    glow:
      "from-clay-brand-ochre/15 to-transparent",
    icon: StretchHorizontal,
  },

  lowerBody: {
    label: "Lower Body",
    accent:
      "bg-clay-brand-mint/25 text-clay-ink",
    glow:
      "from-clay-brand-mint/15 to-transparent",
    icon: Activity,
  },
};

function StepMobility() {
  const { watch, setValue } =
    useFormContext<AssessmentFormValues>();

  const mobilityDifficulty =
    watch("mobilityDifficulty") || [];

  const handleDifficultyChange = (
    questionId: string,
    difficulty: number
  ) => {
    const question =
      MOBILITY_QUESTIONS.find(
        (q) => q.id === questionId
      );

    if (!question) return;

    const updated = [...mobilityDifficulty];

    const index = updated.findIndex(
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
      }
    );
  };

  const getSeverity = (
    difficulty: number
  ) => {
    if (difficulty <= 2)
      return {
        label: "Fluid",
        tone:
          "bg-clay-brand-mint/25 text-clay-ink",
      };

    if (difficulty <= 5)
      return {
        label: "Restricted",
        tone:
          "bg-clay-brand-peach/20 text-clay-ink",
      };

    if (difficulty <= 7)
      return {
        label: "Elevated",
        tone:
          "bg-clay-brand-ochre/25 text-clay-ink",
      };

    return {
      label: "Severe",
      tone:
        "bg-clay-brand-pink/20 text-clay-ink",
    };
  };

  const overallAverage =
    mobilityDifficulty.length > 0
      ? Math.round(
        mobilityDifficulty.reduce(
          (acc, item) =>
            acc + item.difficulty,
          0
        ) / mobilityDifficulty.length
      )
      : 0;

  return (
    <div className="space-y-14">

      {/* INTRO */}
      <section className="max-w-3xl">

        <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
          <Sparkles size={14} />
          Movement Intelligence
        </div>

        <h2 className="mt-7 clay-display text-[2.2rem] leading-[1.02] tracking-[-0.05em] text-clay-ink md:text-[3rem]">
          Analyze how freely your body
          moves today.
        </h2>

        <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-clay-body md:text-[1.05rem]">
          Evaluate stiffness, resistance,
          and movement limitations across
          different motion patterns to
          better understand functional
          mobility and recovery quality.
        </p>

      </section>

      {/* OVERVIEW */}
      <section className="relative overflow-hidden rounded-[32px] bg-clay-surface-card px-7 py-7 md:px-10 md:py-9">

        <div className="absolute inset-0 bg-gradient-to-br from-clay-brand-lavender/10 via-transparent to-clay-brand-mint/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}
          <div className="max-w-xl">

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
              Mobility Baseline
            </p>

            <div className="mt-4 flex items-end gap-3">

              <div className="clay-display text-[4.5rem] leading-none tracking-[-0.07em] text-clay-ink">
                {overallAverage}
              </div>

              <div className="pb-3 text-sm text-clay-muted">
                /10 resistance score
              </div>

            </div>

            <p className="mt-5 text-[15px] leading-[1.9] text-clay-body">
              Higher scores indicate greater
              restriction or discomfort during
              movement patterns and functional
              range-of-motion activities.
            </p>

          </div>

          {/* RIGHT METRICS */}
          <div className="grid grid-cols-3 gap-4">

            {[
              {
                label: "Fluidity",
                value: Math.max(
                  0,
                  10 - overallAverage
                ),
                bg:
                  "bg-clay-brand-mint/25",
              },

              {
                label: "Restriction",
                value: overallAverage,
                bg:
                  "bg-clay-brand-peach/20",
              },

              {
                label: "Mobility",
                value:
                  Math.max(
                    0,
                    100 -
                    overallAverage * 10
                  ) + "%",
                bg:
                  "bg-clay-brand-lavender/20",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "rounded-[24px] px-5 py-5 text-center",
                  item.bg
                )}
              >

                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-clay-muted">
                  {item.label}
                </div>

                <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-clay-ink">
                  {item.value}
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* QUESTIONS */}
      <div className="space-y-8">

        {MOBILITY_QUESTIONS.map(
          (question) => {
            const answer =
              mobilityDifficulty.find(
                (q) => q.id === question.id
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
                  "Movement Analysis",
                accent:
                  "bg-clay-surface-strong text-clay-ink",
                glow:
                  "from-clay-surface-strong/20 to-transparent",
                icon: Activity,
              };

            const Icon = config.icon;

            return (
              <Card
                key={question.id}
                variant="cream"
                hover={false}
                className="
                  relative overflow-hidden
                  rounded-[32px]
                  border border-clay-hairline/60
                  bg-clay-surface-card
                  px-6 py-7
                  md:px-8 md:py-8
                "
              >

                {/* Glow */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-80 pointer-events-none",
                    config.glow
                  )}
                />

                <div className="relative z-10">

                  {/* TOP */}
                  <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">

                    {/* LEFT */}
                    <div className="flex gap-5">

                      <div
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px]",
                          config.accent
                        )}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="max-w-2xl">

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-clay-muted">
                            {config.label}
                          </span>

                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                              severity.tone
                            )}
                          >
                            {severity.label}
                          </span>

                        </div>

                        <label
                          htmlFor={`mobility-${question.id}`}
                          className="
                            mt-4 block
                            text-[1.35rem]
                            font-semibold
                            leading-[1.3]
                            tracking-[-0.03em]
                            text-clay-ink
                            md:text-[1.5rem]
                          "
                        >
                          {question.question}
                        </label>

                        <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-clay-body">
                          Consider stiffness,
                          resistance, discomfort,
                          and how naturally the
                          movement currently feels.
                        </p>

                      </div>

                    </div>

                    {/* SCORE */}
                    <div className="flex items-center gap-4 self-start rounded-[24px] bg-clay-canvas px-5 py-4">

                      <div className="text-right">

                        <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-clay-muted">
                          Resistance
                        </div>

                        <div className="mt-2 text-[2.1rem] font-semibold leading-none tracking-[-0.06em] text-clay-ink">
                          {difficulty}
                        </div>

                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-primary text-sm font-semibold text-white">
                        /10
                      </div>

                    </div>

                  </div>

                  {/* SLIDER */}
                  <div className="mt-10">

                    <div className="relative">

                      {/* TRACK */}
                      <div className="h-[10px] overflow-hidden rounded-full bg-clay-surface-strong">

                        <div
                          className="h-full rounded-full bg-clay-primary transition-all duration-500"
                          style={{
                            width: `${difficulty * 10}%`,
                          }}
                        />

                      </div>

                      {/* INPUT */}
                      <input
                        id={`mobility-${question.id}`}
                        type="range"
                        min="0"
                        max="10"
                        value={difficulty}
                        onChange={(e) =>
                          handleDifficultyChange(
                            question.id,
                            parseInt(
                              e.target.value
                            )
                          )
                        }
                        className="
                          absolute inset-0
                          h-[10px] w-full
                          cursor-pointer
                          appearance-none
                          bg-transparent
                          opacity-0
                        "
                      />

                    </div>

                    {/* SCALE */}
                    <div className="mt-5 flex items-center justify-between">

                      {[
                        "Fluid",
                        "Mild",
                        "Restricted",
                        "Elevated",
                        "Severe",
                      ].map((label, i) => (
                        <div
                          key={label}
                          className="flex flex-col items-center gap-2"
                        >

                          <div
                            className={cn(
                              "h-2.5 w-2.5 rounded-full transition-all duration-300",
                              difficulty >=
                                i * 2
                                ? "bg-clay-primary"
                                : "bg-clay-hairline"
                            )}
                          />

                          <span
                            className={cn(
                              "text-[10px] font-semibold uppercase tracking-[0.12em]",
                              difficulty >=
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

                  {/* FOOTNOTE */}
                  <div className="mt-8 flex items-center justify-between rounded-[22px] bg-clay-canvas px-5 py-4">

                    <p className="max-w-xl text-[13px] leading-[1.7] text-clay-muted">
                      Mobility patterns often
                      reveal hidden strain before
                      pain becomes more severe.
                      Consistent tracking helps
                      identify recovery progress.
                    </p>

                    <ArrowRight
                      size={18}
                      className="text-clay-muted"
                    />

                  </div>

                </div>

              </Card>
            );
          }
        )}

      </div>

    </div>
  );
}

export default StepMobility;