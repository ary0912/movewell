'use client';

import type { BodyArea } from "../../types";
import { BODY_AREA_LABELS } from "@utils/constants";

import HumanSilhouette from "@components/ui/HumanSilhouette";
import { Card } from "@components/ui/Card";

import { useFormContext } from "react-hook-form";
import type { AssessmentFormValues } from "@utils/schemas";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  MousePointerClick,
  Sparkles,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const painAreaMeta: Record<
  string,
  {
    accent: string;
    glow: string;
  }
> = {
  neck: {
    accent:
      "bg-clay-brand-lavender/20 text-clay-ink",
    glow:
      "from-clay-brand-lavender/10 to-transparent",
  },

  shoulder: {
    accent:
      "bg-clay-brand-peach/20 text-clay-ink",
    glow:
      "from-clay-brand-peach/10 to-transparent",
  },

  upperBack: {
    accent:
      "bg-clay-brand-ochre/20 text-clay-ink",
    glow:
      "from-clay-brand-ochre/10 to-transparent",
  },

  lowerBack: {
    accent:
      "bg-clay-brand-mint/25 text-clay-ink",
    glow:
      "from-clay-brand-mint/10 to-transparent",
  },

  hip: {
    accent:
      "bg-clay-brand-pink/15 text-clay-ink",
    glow:
      "from-clay-brand-pink/10 to-transparent",
  },

  knee: {
    accent:
      "bg-clay-brand-lavender/20 text-clay-ink",
    glow:
      "from-clay-brand-lavender/10 to-transparent",
  },
};

function StepPainMap() {
  const { watch, setValue } =
    useFormContext<AssessmentFormValues>();

  const painAreas =
    (watch("painAreas") || []) as BodyArea[];

  const togglePainArea = (
    area: BodyArea
  ) => {
    const newAreas =
      painAreas.includes(area)
        ? painAreas.filter(
          (a: BodyArea) => a !== area
        )
        : [...painAreas, area];

    setValue("painAreas", newAreas, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-14">

      {/* HEADER */}
      <section className="max-w-3xl">

        <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
          <Sparkles size={14} />
          Anatomical Mapping
        </div>

        <h2 className="mt-7 clay-display text-[2.2rem] leading-[1.02] tracking-[-0.05em] text-clay-ink md:text-[3rem]">
          Identify where discomfort begins.
        </h2>

        <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-clay-body md:text-[1.05rem]">
          Select the regions where you
          currently experience discomfort,
          tension, stiffness, or movement
          limitation. Multiple regions can be
          selected simultaneously for a more
          accurate movement baseline.
        </p>

      </section>

      {/* MAIN EXPERIENCE */}
      <section
        className="
          grid gap-8
          xl:grid-cols-[1.05fr_0.95fr]
          items-start
        "
      >

        {/* LEFT PANEL */}
        <Card
          variant="cream"
          hover={false}
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-clay-hairline/60
            bg-clay-surface-card
            px-5 py-6
            md:px-8 md:py-8
            min-h-[720px]
            xl:sticky xl:top-28
          "
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-clay-brand-lavender/10 via-transparent to-clay-brand-peach/10 pointer-events-none" />

          <div className="relative z-10 flex h-full flex-col">

            {/* TOP */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

              <div className="max-w-lg">

                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">

                  <Activity size={14} />

                  Anatomical Interface

                </div>

                <h3 className="mt-4 text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.04em] text-clay-ink">
                  Interactive body mapping
                </h3>

                <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-clay-body">
                  Tap directly on body regions
                  to define your affected
                  movement zones and pain
                  locations.
                </p>

              </div>

              {/* STATUS */}
              <div className="flex items-center gap-3 rounded-[24px] bg-clay-canvas px-5 py-4 shadow-sm">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-primary text-white">

                  <CheckCircle2 size={20} />

                </div>

                <div>

                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clay-muted">
                    Active Regions
                  </div>

                  <div className="mt-1 text-[1.5rem] font-semibold leading-none tracking-[-0.05em] text-clay-ink">
                    {painAreas.length}
                  </div>

                </div>

              </div>

            </div>

            {/* SILHOUETTE */}
            <div
              className="
                flex flex-1 items-center justify-center
                py-8
                min-h-[560px]
              "
            >

              <div className="w-full max-w-[420px]">

                <HumanSilhouette
                  selectedAreas={painAreas}
                  onAreaToggle={togglePainArea}
                />

              </div>

            </div>

            {/* FOOTNOTE */}
            <div className="mt-auto rounded-[24px] bg-clay-canvas px-5 py-4">

              <div className="flex items-start gap-4">

                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-clay-surface-strong">

                  <MousePointerClick
                    size={16}
                    className="text-clay-ink"
                  />

                </div>

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-clay-muted">
                    Selection Guidance
                  </p>

                  <p className="mt-2 text-[13px] leading-[1.75] text-clay-body">
                    Choose all affected regions
                    even if discomfort feels mild
                    or intermittent during
                    movement.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </Card>

        {/* RIGHT PANEL */}
        <Card
          variant="default"
          hover={false}
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-clay-hairline/60
            bg-clay-canvas
            px-6 py-7
            md:px-8 md:py-8
            min-h-[720px]
          "
        >

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-clay-brand-ochre/5 via-transparent to-clay-brand-pink/5 pointer-events-none" />

          <div className="relative z-10 flex h-full flex-col">

            {/* TITLE */}
            <div>

              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">

                <Sparkles size={14} />

                Focus Node Synthesis

              </div>

              <h3 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.05em] text-clay-ink">
                Active movement regions
              </h3>

              <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-clay-body">
                Your selected areas will define
                the baseline for pain intensity,
                mobility evaluation, and recovery
                recommendations.
              </p>

            </div>

            {/* EMPTY STATE */}
            {painAreas.length === 0 ? (

              <div className="flex flex-1 items-center justify-center py-10">

                <div
                  className="
                    flex w-full max-w-md flex-col items-center
                    rounded-[32px]
                    border border-dashed border-clay-hairline
                    bg-clay-surface-soft
                    px-8 py-14
                    text-center
                  "
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-clay-canvas shadow-sm">

                    <Activity
                      size={28}
                      className="text-clay-muted"
                    />

                  </div>

                  <h4 className="mt-7 text-[1.4rem] font-semibold tracking-[-0.03em] text-clay-ink">
                    No regions selected
                  </h4>

                  <p className="mt-4 max-w-xs text-[14px] leading-[1.8] text-clay-body">
                    Use the anatomical interface
                    on the left to select pain or
                    movement discomfort regions.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-10 flex-1">

                {/* GRID */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {painAreas.map(
                    (area, index) => {
                      const meta =
                        painAreaMeta[area] || {
                          accent:
                            "bg-clay-surface-strong text-clay-ink",
                          glow:
                            "from-clay-surface-strong/10 to-transparent",
                        };

                      return (
                        <div
                          key={area}
                          className={cn(
                            "relative overflow-hidden rounded-[28px] border border-clay-hairline/60 bg-clay-surface-card p-6",
                            "bg-gradient-to-br",
                            meta.glow
                          )}
                        >

                          {/* INDEX */}
                          <div className="absolute right-5 top-4 text-[3.2rem] font-semibold leading-none tracking-[-0.08em] text-black/[0.04]">
                            0{index + 1}
                          </div>

                          <div className="relative z-10">

                            <div
                              className={cn(
                                "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                                meta.accent
                              )}
                            >
                              Focus Node
                            </div>

                            <h4 className="mt-5 text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.03em] text-clay-ink">
                              {
                                BODY_AREA_LABELS[
                                area
                                ]
                              }
                            </h4>

                            <p className="mt-3 text-[13px] leading-[1.8] text-clay-body">
                              Included in movement
                              baseline evaluation
                              and recovery analysis.
                            </p>

                            {/* ACTION */}
                            <button
                              type="button"
                              onClick={() =>
                                togglePainArea(
                                  area
                                )
                              }
                              className="
                                mt-6
                                inline-flex items-center gap-2
                                rounded-full
                                bg-clay-primary
                                px-4 py-2
                                text-[11px]
                                font-semibold
                                uppercase tracking-[0.12em]
                                text-white
                                transition-all duration-300
                                hover:scale-[1.02]
                                hover:bg-clay-primary/90
                              "
                              aria-label={`Remove ${BODY_AREA_LABELS[area]}`}
                            >

                              Remove

                              <X size={14} />

                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

                {/* SUMMARY */}
                <div className="mt-8 rounded-[28px] bg-clay-surface-soft px-6 py-6">

                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div>

                      <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-clay-muted">
                        Current Baseline
                      </p>

                      <p className="mt-3 max-w-lg text-[14px] leading-[1.85] text-clay-body">
                        {painAreas.length} active
                        movement region
                        {painAreas.length > 1
                          ? "s"
                          : ""}{" "}
                        currently included in your
                        physiological recovery
                        profile.
                      </p>

                    </div>

                    <div className="flex items-center gap-3 rounded-full bg-clay-canvas px-5 py-3 shadow-sm">

                      <div className="h-2.5 w-2.5 rounded-full bg-clay-primary animate-pulse" />

                      <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-clay-ink">
                        Mapping Active
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            )}

            {/* FOOTER */}
            <div className="mt-10 flex items-center justify-between border-t border-clay-hairline/70 pt-6">

              <div>

                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-clay-muted">
                  Assessment Stage
                </div>

                <div className="mt-2 text-[14px] font-medium text-clay-body">
                  Anatomical pain mapping
                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-clay-muted"
              />

            </div>

          </div>

        </Card>

      </section>

    </div>
  );
}

export default StepPainMap;