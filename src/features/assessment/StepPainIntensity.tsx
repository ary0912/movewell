'use client';

import type { BodyArea } from "../../types";
import { BODY_AREA_LABELS } from "@utils/constants";
import { Card } from "@components/ui/Card";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import type { AssessmentFormValues } from "@utils/schemas";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  HeartPulse,
  Sparkles,
  Waves,
} from "lucide-react";

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
    label: "Neck Region",
    accent:
      "bg-clay-brand-lavender/20 text-clay-ink",
    glow:
      "from-clay-brand-lavender/15 to-transparent",
    icon: Waves,
  },

  shoulder: {
    label: "Shoulder Region",
    accent:
      "bg-clay-brand-peach/20 text-clay-ink",
    glow:
      "from-clay-brand-peach/15 to-transparent",
    icon: Activity,
  },

  upperBack: {
    label: "Upper Back",
    accent:
      "bg-clay-brand-ochre/20 text-clay-ink",
    glow:
      "from-clay-brand-ochre/15 to-transparent",
    icon: Activity,
  },

  lowerBack: {
    label: "Lower Back",
    accent:
      "bg-clay-brand-mint/25 text-clay-ink",
    glow:
      "from-clay-brand-mint/15 to-transparent",
    icon: Activity,
  },

  knee: {
    label: "Knee Joint",
    accent:
      "bg-clay-brand-pink/15 text-clay-ink",
    glow:
      "from-clay-brand-pink/10 to-transparent",
    icon: HeartPulse,
  },

  hip: {
    label: "Hip Region",
    accent:
      "bg-clay-brand-lavender/20 text-clay-ink",
    glow:
      "from-clay-brand-lavender/15 to-transparent",
    icon: Activity,
  },
};

function StepPainIntensity() {
  const { watch, setValue } =
    useFormContext<AssessmentFormValues>();

  const painAreas =
    (watch("painAreas") || []) as BodyArea[];

  const painIntensity =
    watch("painIntensity") || {};

  const handleIntensityChange = (
    area: BodyArea,
    value: number
  ) => {
    setValue(
      `painIntensity.${area}`,
      value,
      {
        shouldValidate: true,
      }
    );
  };

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

  const getSeverity = (
    intensity: number
  ) => {
    if (intensity <= 2)
      return {
        label: "Minimal",
        tone:
          "bg-clay-brand-mint/25 text-clay-ink",
      };

    if (intensity <= 5)
      return {
        label: "Moderate",
        tone:
          "bg-clay-brand-peach/20 text-clay-ink",
      };

    if (intensity <= 7)
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

  return (
    <div className="space-y-14">

      {/* INTRO */}
      <section className="max-w-3xl">

        <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
          <Sparkles size={14} />
          Pain Signal Mapping
        </div>

        <h2 className="mt-7 clay-display text-[2.2rem] leading-[1.02] tracking-[-0.05em] text-clay-ink md:text-[3rem]">
          Measure the intensity of your
          movement discomfort.
        </h2>

        <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-clay-body md:text-[1.05rem]">
          Quantify how strong each pain signal
          feels during natural movement,
          recovery, and day-to-day activity.
          This helps identify high-stress
          movement patterns more accurately.
        </p>

      </section>

      {/* OVERVIEW */}
      <section className="relative overflow-hidden rounded-[32px] bg-clay-surface-card px-7 py-7 md:px-10 md:py-9">

        <div className="absolute inset-0 bg-gradient-to-br from-clay-brand-pink/10 via-transparent to-clay-brand-lavender/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}
          <div className="max-w-xl">

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
              Pain Intensity Baseline
            </p>

            <div className="mt-4 flex items-end gap-3">

              <div className="clay-display text-[4.5rem] leading-none tracking-[-0.07em] text-clay-ink">
                {overallAverage}
              </div>

              <div className="pb-3 text-sm text-clay-muted">
                /10 average intensity
              </div>

            </div>

            <p className="mt-5 text-[15px] leading-[1.9] text-clay-body">
              Your baseline reflects how intense
              discomfort currently feels across
              selected movement regions and
              affected anatomical zones.
            </p>

          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-3 gap-4">

            {[
              {
                label: "Low",
                value:
                  painAreas.filter(
                    (area) =>
                      (painIntensity[area] ||
                        0) <= 3
                  ).length,
                bg:
                  "bg-clay-brand-mint/25",
              },

              {
                label: "Moderate",
                value:
                  painAreas.filter(
                    (area) => {
                      const value =
                        painIntensity[area] ||
                        0;

                      return (
                        value >= 4 &&
                        value <= 6
                      );
                    }
                  ).length,
                bg:
                  "bg-clay-brand-peach/20",
              },

              {
                label: "High",
                value:
                  painAreas.filter(
                    (area) =>
                      (painIntensity[area] ||
                        0) >= 7
                  ).length,
                bg:
                  "bg-clay-brand-pink/15",
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

      {/* PAIN CARDS */}
      <div className="space-y-8">

        {painAreas.map((area) => {
          const intensity =
            painIntensity[area] || 0;

          const severity =
            getSeverity(intensity);

          const config =
            painAreaConfig[area] || {
              label: "Pain Region",
              accent:
                "bg-clay-surface-strong text-clay-ink",
              glow:
                "from-clay-surface-strong/20 to-transparent",
              icon: Activity,
            };

          const Icon = config.icon;

          return (
            <Card
              key={area}
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
                        htmlFor={`intensity-${area}`}
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
                        {
                          BODY_AREA_LABELS[
                          area
                          ]
                        }
                      </label>

                      <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-clay-body">
                        Evaluate how strong or
                        noticeable discomfort feels
                        in this region during normal
                        movement and physical
                        activity.
                      </p>

                    </div>

                  </div>

                  {/* SCORE */}
                  <div className="flex items-center gap-4 self-start rounded-[24px] bg-clay-canvas px-5 py-4">

                    <div className="text-right">

                      <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-clay-muted">
                        Intensity
                      </div>

                      <div className="mt-2 text-[2.1rem] font-semibold leading-none tracking-[-0.06em] text-clay-ink">
                        {intensity}
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
                          width: `${intensity * 10}%`,
                        }}
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
                          parseInt(
                            e.target.value
                          )
                        )
                      }
                      aria-label={`Pain intensity for ${BODY_AREA_LABELS[area]}`}
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
                      "None",
                      "Mild",
                      "Moderate",
                      "High",
                      "Severe",
                    ].map((label, i) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-2"
                      >

                        <div
                          className={cn(
                            "h-2.5 w-2.5 rounded-full transition-all duration-300",
                            intensity >= i * 2
                              ? "bg-clay-primary"
                              : "bg-clay-hairline"
                          )}
                        />

                        <span
                          className={cn(
                            "text-[10px] font-semibold uppercase tracking-[0.12em]",
                            intensity >= i * 2
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
                    Pain intensity can fluctuate
                    depending on posture, stress,
                    movement quality, and recovery
                    load throughout the day.
                  </p>

                  <ArrowRight
                    size={18}
                    className="text-clay-muted"
                  />

                </div>

              </div>

            </Card>
          );
        })}

      </div>

      {/* EMPTY STATE */}
      {painAreas.length === 0 && (

        <div className="relative overflow-hidden rounded-[32px] border border-dashed border-clay-hairline bg-clay-surface-soft px-8 py-14">

          <div className="absolute inset-0 bg-gradient-to-br from-clay-brand-peach/10 via-transparent to-clay-brand-lavender/10" />

          <div className="relative z-10 flex flex-col items-center text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-clay-canvas shadow-sm">

              <AlertTriangle
                size={28}
                className="text-clay-muted"
              />

            </div>

            <h3 className="mt-7 text-[1.6rem] font-semibold tracking-[-0.04em] text-clay-ink">
              No pain regions selected
            </h3>

            <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-clay-body">
              Return to the previous step and
              select at least one affected body
              area to continue with intensity
              evaluation.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default StepPainIntensity;