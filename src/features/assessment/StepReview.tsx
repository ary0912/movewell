'use client';

import { useMemo, useState } from "react";

import { useAssessment } from "@context/AssessmentContext";
import { submitAssessment } from "@services/assessmentService";

import { BODY_AREA_LABELS } from "@utils/constants";

import { useFormContext } from "react-hook-form";
import type { AssessmentFormValues } from "@utils/schemas";

import { Button } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import Badge from "@components/ui/Badge";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepReviewProps {
  onComplete: () => void;
}

const sectionGradients = [
  "from-clay-brand-lavender/10 to-transparent",
  "from-clay-brand-peach/10 to-transparent",
  "from-clay-brand-ochre/10 to-transparent",
  "from-clay-brand-mint/10 to-transparent",
];

function StepReview({
  onComplete,
}: StepReviewProps) {

  const { getValues } =
    useFormContext<AssessmentFormValues>();

  const formValues = getValues();

  const {
    isLoading,
    setIsLoading,
    setResult,
    error,
    setError,
  } = useAssessment();

  const [submitted, setSubmitted] =
    useState(false);

  const averagePain = useMemo(() => {

    if (
      !formValues.painAreas ||
      formValues.painAreas.length === 0
    ) {
      return 0;
    }

    const total =
      formValues.painAreas.reduce(
        (acc, area) =>
          acc +
          (
            formValues.painIntensity[
            area
            ] || 0
          ),
        0
      );

    return Math.round(
      total / formValues.painAreas.length
    );

  }, [formValues]);

  const handleSubmit = async () => {

    try {

      setIsLoading(true);

      setError(null);

      const payload = {
        ...formValues,

        painAreas:
          formValues.painAreas as never,

        mobilityDifficulty:
          formValues.mobilityDifficulty.map(
            (item) => ({
              ...item,
              area: item.area as never,
            })
          ),

        timestamp:
          new Date().toISOString(),
      };

      const result =
        await submitAssessment(payload);

      setResult(result);

      setSubmitted(true);

      window.setTimeout(() => {
        onComplete();
      }, 1600);

    } catch (err) {

      setError(
        "Unable to complete the synthesis. Please verify your connection and try again."
      );

      console.error(err);

    } finally {

      setIsLoading(false);

    }
  };

  /* =========================
     SUCCESS STATE
  ========================= */

  if (submitted) {

    return (

      <div className="flex min-h-[70vh] items-center justify-center py-16">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-2xl"
        >

          <Card
            variant="teal"
            hover={false}
            className="
              relative overflow-hidden
              rounded-[40px]
              px-8 py-14
              md:px-12 md:py-16
              text-center
            "
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />

            <div className="relative z-10 flex flex-col items-center">

              <motion.div
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 180,
                }}
                className="
                  flex h-24 w-24 items-center justify-center
                  rounded-[30px]
                  bg-white/12
                  backdrop-blur-xl
                "
              >

                <CheckCircle2
                  size={50}
                  className="text-white"
                />

              </motion.div>

              <div className="mt-10">

                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">

                  <Sparkles size={14} />

                  Analysis Completed

                </div>

                <h2 className="mt-7 clay-display text-[2.8rem] leading-[0.98] tracking-[-0.06em] text-white md:text-[4rem]">
                  Your movement
                  <br />
                  blueprint is ready.
                </h2>

                <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.9] text-white/75 md:text-[16px]">
                  We’ve generated your
                  personalized mobility and
                  recovery analysis based on
                  your assessment inputs.
                </p>

              </div>

            </div>

          </Card>

        </motion.div>

      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HERO */}
      <section className="max-w-3xl">

        <div className="inline-flex items-center gap-2 rounded-full bg-clay-surface-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">

          <Sparkles size={14} />

          Assessment Review

        </div>

        <h2 className="mt-7 clay-display text-[2.2rem] leading-[1.02] tracking-[-0.05em] text-clay-ink md:text-[3.2rem]">
          Review your movement baseline.
        </h2>

        <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-clay-body">
          Before generating your recovery
          insights, verify that your selected
          movement regions and discomfort
          intensity accurately reflect your
          current physical condition.
        </p>

      </section>

      {/* MAIN GRID */}
      <section className="grid gap-8 xl:grid-cols-12">

        <div className="space-y-8 xl:col-span-8">

          {/* SUMMARY STATS */}
          <div className="grid gap-5 sm:grid-cols-3">

            {[
              {
                label: "Focus Regions",
                value:
                  formValues.painAreas.length,
                icon: Activity,
              },
              {
                label: "Avg Intensity",
                value: `${averagePain}/10`,
                icon: Sparkles,
              },
              {
                label: "Assessment",
                value: "Ready",
                icon: CheckCircle2,
              },
            ].map((item, index) => {

              const Icon = item.icon;

              return (

                <Card
                  key={item.label}
                  variant="cream"
                  hover={false}
                  className="
                    relative overflow-hidden
                    rounded-[28px]
                    border border-clay-hairline/60
                    px-6 py-6
                  "
                >

                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      sectionGradients[index]
                    )}
                  />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-clay-canvas shadow-sm">

                        <Icon
                          size={22}
                          className="text-clay-ink"
                        />

                      </div>

                      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clay-muted">
                        Overview
                      </div>

                    </div>

                    <div className="mt-8 text-[2rem] font-semibold leading-none tracking-[-0.06em] text-clay-ink">
                      {item.value}
                    </div>

                    <p className="mt-3 text-[13px] font-medium text-clay-body">
                      {item.label}
                    </p>

                  </div>

                </Card>
              );
            })}

          </div>

          {/* PAIN REGIONS */}
          <Card
            variant="default"
            hover={false}
            className="
              relative overflow-hidden
              rounded-[34px]
              border border-clay-hairline/60
              px-6 py-7
              md:px-8 md:py-8
            "
          >

            <div className="absolute inset-0 bg-gradient-to-br from-clay-brand-lavender/5 via-transparent to-transparent" />

            <div className="relative z-10">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
                    Selected Movement Regions
                  </div>

                  <h3 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.04em] text-clay-ink">
                    Anatomical focus nodes
                  </h3>

                </div>

                <div className="rounded-full bg-clay-surface-soft px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-clay-body">
                  {formValues.painAreas.length} regions selected
                </div>

              </div>

              <div className="mt-8 flex flex-wrap gap-3">

                {formValues.painAreas.map(
                  (area, index) => (

                    <Badge
                      key={area}
                      variant="ochre"
                      size="lg"
                      className="
                        flex items-center gap-3
                        rounded-full
                        px-5 py-3
                        text-[12px]
                        font-semibold
                        shadow-none
                      "
                    >

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px]">
                        0{index + 1}
                      </span>

                      {
                        BODY_AREA_LABELS[
                        area
                        ]
                      }

                    </Badge>
                  )
                )}

              </div>

            </div>

          </Card>

        </div>

        {/* RIGHT */}
        <div className="space-y-6 xl:col-span-4">

          <Card
            variant="teal"
            hover={false}
            className="
              relative overflow-hidden
              rounded-[34px]
              px-7 py-8
            "
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_35%)]" />

            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-white/75">

                <ShieldCheck size={14} />

                Ready For Synthesis

              </div>

              <h3 className="mt-7 text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                Generate your
                movement insights.
              </h3>

              <p className="mt-5 text-[14px] leading-[1.85] text-white/75">
                We’ll synthesize your
                movement baseline into a
                personalized recovery and
                mobility analysis report.
              </p>

              <div className="mt-10">

                <Button
                  size="lg"
                  variant="onColor"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  className="
                    h-14 w-full
                    rounded-[20px]
                    text-[13px]
                    font-semibold
                    uppercase tracking-[0.08em]
                  "
                >

                  {isLoading
                    ? "Synthesizing..."
                    : "Generate Analysis"}

                  {!isLoading && (
                    <ArrowRight size={16} />
                  )}

                </Button>

              </div>

            </div>

          </Card>

          {/* ERROR */}
          <AnimatePresence>

            {error && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
              >

                <Card
                  hover={false}
                  className="
                    rounded-[28px]
                    border border-clay-brand-pink/20
                    bg-clay-brand-pink/5
                    px-6 py-5
                  "
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-clay-brand-pink/10">

                      <TriangleAlert
                        size={20}
                        className="text-clay-brand-pink"
                      />

                    </div>

                    <div>

                      <h4 className="text-[15px] font-semibold text-clay-brand-pink">
                        Synthesis Error
                      </h4>

                      <p className="mt-2 text-[13px] leading-[1.8] text-clay-body">
                        {error}
                      </p>

                    </div>

                  </div>

                </Card>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </section>

    </div>
  );
}

export default StepReview;