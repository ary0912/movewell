'use client';

import { DAILY_IMPACT_QUESTIONS } from "@utils/constants";
import { Card } from "@components/ui/Card";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import type { AssessmentFormValues } from "@utils/schemas";

import {
  Briefcase,
  Moon,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const categoryConfig = {
  work: {
    icon: Briefcase,
    label: "Work Performance",
    accent:
      "bg-clay-brand-lavender/20 text-clay-ink",
    glow:
      "from-clay-brand-lavender/20 to-transparent",
  },

  sleep: {
    icon: Moon,
    label: "Sleep Recovery",
    accent:
      "bg-clay-brand-peach/20 text-clay-ink",
    glow:
      "from-clay-brand-peach/20 to-transparent",
  },

  activity: {
    icon: Activity,
    label: "Daily Movement",
    accent:
      "bg-clay-brand-mint/30 text-clay-ink",
    glow:
      "from-clay-brand-mint/20 to-transparent",
  },
};

function StepImpact() {
  const { watch, setValue } =
    useFormContext<AssessmentFormValues>();

  const dailyImpact =
    watch("dailyImpact") || [];

  const handleImpactChange = (
    questionId: string,
    impact: number
  ) => {
    const question =
      DAILY_IMPACT_QUESTIONS.find(
        (q) => q.id === questionId
      );

    if (!question) return;

    const updated = [...dailyImpact];

    const index = updated.findIndex(
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
        description: question.description,
      });
    }

    setValue("dailyImpact", updated, {
      shouldValidate: true,
    });
  };

  const getSeverity = (impact: number) => {
    if (impact <= 2)
      return {
        label: "Minimal",
        tone:
          "bg-clay-brand-mint/25 text-clay-ink",
      };

    if (impact <= 5)
      return {
        label: "Moderate",
        tone:
          "bg-clay-brand-peach/20 text-clay-ink",
      };

    if (impact <= 7)
      return {
        label: "Elevated",
        tone:
          "bg-clay-brand-ochre/25 text-clay-ink",
      };

    return {
      label: "Significant",
      tone:
        "bg-clay-brand-pink/20 text-clay-ink",
    };
  };

  const overallAverage =
    dailyImpact.length > 0
      ? Math.round(
        dailyImpact.reduce(
          (acc, item) => acc + item.impact,
          0
        ) / dailyImpact.length
      )
      : 0;

  return (
    <div className="space-y-14">

      {/* INTRO */}
      <section className="max-w-3xl">

        <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
          <Sparkles size={14} />
          Lifestyle Impact Analysis
        </div>

        <h2 className="mt-7 clay-display text-[2.2rem] leading-[1.02] tracking-[-0.05em] text-clay-ink md:text-[3rem]">
          Understand how recovery affects
          your daily life.
        </h2>

        <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-clay-body md:text-[1.05rem]">
          Evaluate how discomfort influences
          focus, recovery quality, movement,
          and overall day-to-day performance.
          The assessment helps surface patterns
          beyond pain alone.
        </p>

      </section>

      {/* OVERVIEW */}
      <section className="relative overflow-hidden rounded-[32px] bg-clay-surface-card px-7 py-7 md:px-10 md:py-9">

        <div className="absolute inset-0 bg-gradient-to-br from-clay-brand-lavender/10 via-transparent to-clay-brand-peach/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}
          <div className="max-w-xl">

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
              Overall Daily Impact
            </p>

            <div className="mt-4 flex items-end gap-3">

              <div className="clay-display text-[4.5rem] leading-none tracking-[-0.07em] text-clay-ink">
                {overallAverage}
              </div>

              <div className="pb-3 text-sm text-clay-muted">
                /10 impact score
              </div>

            </div>

            <p className="mt-5 text-[15px] leading-[1.9] text-clay-body">
              Your current lifestyle impact
              reflects how symptoms influence
              work performance, sleep recovery,
              and physical activity throughout
              the day.
            </p>

          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-3 gap-4">

            {[
              {
                label: "Focus",
                value:
                  dailyImpact.find(
                    (q) => q.category === "work"
                  )?.impact || 0,
                bg:
                  "bg-clay-brand-lavender/20",
              },

              {
                label: "Sleep",
                value:
                  dailyImpact.find(
                    (q) =>
                      q.category === "sleep"
                  )?.impact || 0,
                bg:
                  "bg-clay-brand-peach/20",
              },

              {
                label: "Movement",
                value:
                  dailyImpact.find(
                    (q) =>
                      q.category ===
                      "activity"
                  )?.impact || 0,
                bg:
                  "bg-clay-brand-mint/25",
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

        {DAILY_IMPACT_QUESTIONS.map(
          (question) => {
            const answer =
              dailyImpact.find(
                (q) => q.id === question.id
              );

            const impact =
              answer?.impact || 0;

            const severity =
              getSeverity(impact);

            const config =
              categoryConfig[
              question.category as keyof typeof categoryConfig
              ];

            const Icon = config.icon;

            return (
              <Card
                key={question.id}
                variant="cream"
                hover={false}
                className="relative overflow-hidden rounded-[32px] border border-clay-hairline/60 bg-clay-surface-card px-6 py-7 md:px-8 md:py-8"
              >

                {/* Glow */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-70 pointer-events-none",
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

                        <h3 className="mt-4 text-[1.35rem] font-semibold leading-[1.3] tracking-[-0.03em] text-clay-ink md:text-[1.5rem]">
                          {
                            question.description
                          }
                        </h3>

                        <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-clay-body">
                          Adjust the scale based
                          on how strongly this area
                          currently affects your
                          everyday routine and
                          overall comfort.
                        </p>

                      </div>

                    </div>

                    {/* SCORE */}
                    <div className="flex items-center gap-4 self-start rounded-[24px] bg-clay-canvas px-5 py-4">

                      <div className="text-right">

                        <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-clay-muted">
                          Current Score
                        </div>

                        <div className="mt-2 text-[2.1rem] font-semibold leading-none tracking-[-0.06em] text-clay-ink">
                          {impact}
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

                      {/* Track */}
                      <div className="h-[10px] overflow-hidden rounded-full bg-clay-surface-strong">

                        <div
                          className="h-full rounded-full bg-clay-primary transition-all duration-500"
                          style={{
                            width: `${impact * 10}%`,
                          }}
                        />

                      </div>

                      {/* Input */}
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={impact}
                        onChange={(e) =>
                          handleImpactChange(
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
                        "No Impact",
                        "Mild",
                        "Moderate",
                        "Strong",
                        "Severe",
                      ].map((label, i) => (
                        <div
                          key={label}
                          className="flex flex-col items-center gap-2"
                        >

                          <div
                            className={cn(
                              "h-2.5 w-2.5 rounded-full transition-all duration-300",
                              impact >= i * 2
                                ? "bg-clay-primary"
                                : "bg-clay-hairline"
                            )}
                          />

                          <span
                            className={cn(
                              "text-[10px] font-semibold uppercase tracking-[0.12em]",
                              impact >= i * 2
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
                      Small daily limitations can
                      compound over time. Monitoring
                      consistency helps improve
                      long-term recovery outcomes.
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

export default StepImpact;