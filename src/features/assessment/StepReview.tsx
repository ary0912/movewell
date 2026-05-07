'use client';

import {
  useMemo,
  useState,
} from "react";

import {
  useAssessment,
} from "@context/AssessmentContext";

import {
  submitAssessment,
} from "@services/assessmentService";

import {
  BODY_AREA_LABELS,
} from "@utils/constants";

import {
  useFormContext,
} from "react-hook-form";

import type {
  AssessmentFormValues,
} from "@utils/schemas";

import {
  Button,
} from "@components/ui/Button";

import {
  Card,
} from "@components/ui/Card";

import Badge from "@components/ui/Badge";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  cn,
} from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

interface StepReviewProps {
  onComplete: () => void;
}

/* =========================================================
   GRADIENTS
========================================================= */

const sectionGradients = [
  "from-clay-brand-lavender/6 via-transparent to-transparent",
  "from-clay-brand-peach/6 via-transparent to-transparent",
  "from-clay-brand-mint/6 via-transparent to-transparent",
];

/* =========================================================
   COMPONENT
========================================================= */

function StepReview({
  onComplete,
}: StepReviewProps) {

  const {
    getValues,
  } =
    useFormContext<AssessmentFormValues>();

  const formValues =
    getValues();

  const {
    isLoading,
    setIsLoading,
    setResult,
    error,
    setError,
  } =
    useAssessment();

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  /* =====================================================
     AVERAGE PAIN
  ===================================================== */

  const averagePain =
    useMemo(() => {

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
              formValues
                .painIntensity[
              area
              ] || 0
            ),
          0
        );

      return Math.round(
        total /
        formValues.painAreas.length
      );

    }, [formValues]);

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit =
    async () => {

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
                area:
                  item.area as never,
              })
            ),

          timestamp:
            new Date().toISOString(),
        };

        const result =
          await submitAssessment(
            payload
          );

        setResult(result);

        setSubmitted(true);

        window.setTimeout(() => {
          onComplete();
        }, 1500);

      } catch (err) {

        setError(
          "Unable to generate your assessment. Please try again."
        );

        console.error(err);

      } finally {

        setIsLoading(false);

      }
    };

  /* =====================================================
     SUCCESS STATE
  ===================================================== */

  if (submitted) {

    return (

      <div
        className="
          flex min-h-[65vh]
          items-center justify-center
          py-10
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 10,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}

          className="
            w-full
            max-w-xl
          "
        >

          <Card
            variant="teal"
            hover={false}
            className="
              relative overflow-hidden

              rounded-[36px]

              px-8 py-12

              text-center
            "
          >

            <div
              className="
                absolute inset-0

                bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]
              "
            />

            <div
              className="
                relative z-10
                flex flex-col items-center
              "
            >

              <div
                className="
                  flex h-20 w-20
                  items-center justify-center

                  rounded-[26px]

                  bg-white/12

                  backdrop-blur-xl
                "
              >

                <CheckCircle2
                  size={42}
                  className="text-white"
                />

              </div>

              <div
                className="
                  mt-8

                  inline-flex items-center gap-2

                  rounded-full

                  bg-white/10

                  px-4 py-2

                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[0.14em]

                  text-white/80
                "
              >

                <Sparkles size={12} />

                Analysis Ready

              </div>

              <h2
                className="
                  mt-6

                  text-[2.4rem]

                  leading-[0.96]

                  tracking-[-0.06em]

                  text-white

                  clay-display
                "
              >
                Your recovery
                insights are ready.
              </h2>

              <p
                className="
                  mt-4

                  max-w-sm

                  text-[14px]

                  leading-[1.8]

                  text-white/75
                "
              >
                Generating your personalized
                mobility and recovery analysis.
              </p>

            </div>

          </Card>

        </motion.div>

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

            from-clay-brand-lavender/5
            via-transparent
            to-clay-brand-mint/5
          "
        />

        <div
          className="
            relative z-10

            flex flex-col gap-7

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
                Assessment Review
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

                md:text-[3.1rem]
              "
            >
              Review your movement baseline.
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
              Verify your selected movement
              regions and intensity before
              generating your final insights.
            </p>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex items-center gap-4
            "
          >

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
                Regions
              </div>

              <div
                className="
                  mt-2

                  text-[2.5rem]

                  leading-none

                  tracking-[-0.06em]

                  text-clay-ink

                  clay-display
                "
              >
                {
                  formValues
                    .painAreas.length
                }
              </div>

            </div>

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

                  text-[2.5rem]

                  leading-none

                  tracking-[-0.06em]

                  text-clay-ink

                  clay-display
                "
              >
                {averagePain}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN GRID
      ================================================= */}

      <section
        className="
          grid gap-5

          xl:grid-cols-[1fr_360px]
        "
      >

        {/* =============================================
            LEFT
        ============================================= */}

        <div className="space-y-5">

          {/* STATS */}

          <div
            className="
              grid gap-4

              sm:grid-cols-3
            "
          >

            {[
              {
                label:
                  "Focus Regions",
                value:
                  formValues
                    .painAreas.length,
                icon: Activity,
              },

              {
                label:
                  "Average Pain",
                value:
                  `${averagePain}/10`,
                icon: Sparkles,
              },

              {
                label:
                  "Assessment",
                value: "Ready",
                icon:
                  CheckCircle2,
              },
            ].map(
              (
                item,
                index
              ) => {

                const Icon =
                  item.icon;

                return (

                  <Card
                    key={item.label}
                    variant="cream"
                    hover={false}
                    className="
                      relative overflow-hidden

                      rounded-[26px]

                      border border-clay-hairline/60

                      px-5 py-5
                    "
                  >

                    <div
                      className={cn(

                        `
                        absolute inset-0

                        bg-gradient-to-br
                        `,

                        sectionGradients[
                        index
                        ]
                      )}
                    />

                    <div className="relative z-10">

                      <div
                        className="
                          flex items-center
                          justify-between
                        "
                      >

                        <div
                          className="
                            flex h-10 w-10
                            items-center justify-center

                            rounded-[14px]

                            bg-clay-canvas
                          "
                        >

                          <Icon
                            size={18}
                            className="
                              text-clay-ink
                            "
                          />

                        </div>

                        <div
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-clay-muted
                          "
                        >
                          Overview
                        </div>

                      </div>

                      <div
                        className="
                          mt-6

                          text-[1.9rem]

                          leading-none

                          tracking-[-0.05em]

                          text-clay-ink

                          clay-display
                        "
                      >
                        {item.value}
                      </div>

                      <p
                        className="
                          mt-2

                          text-[12px]

                          font-medium

                          text-clay-body
                        "
                      >
                        {item.label}
                      </p>

                    </div>

                  </Card>
                );
              }
            )}

          </div>

          {/* REGIONS */}

          <Card
            variant="default"
            hover={false}
            className="
              relative overflow-hidden

              rounded-[30px]

              border border-clay-hairline/60

              px-6 py-6
            "
          >

            <div
              className="
                absolute inset-0

                bg-gradient-to-br

                from-clay-brand-lavender/5
                via-transparent
                to-transparent
              "
            />

            <div className="relative z-10">

              <div
                className="
                  flex flex-col gap-4

                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div>

                  <div
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-clay-muted
                    "
                  >
                    Selected Regions
                  </div>

                  <h3
                    className="
                      mt-3

                      text-[1.5rem]

                      tracking-[-0.04em]

                      text-clay-ink
                    "
                  >
                    Movement focus areas
                  </h3>

                </div>

                <div
                  className="
                    rounded-full

                    bg-clay-surface-soft

                    px-4 py-2

                    text-[10px]
                    font-semibold

                    uppercase

                    tracking-[0.12em]

                    text-clay-body
                  "
                >
                  {
                    formValues
                      .painAreas.length
                  } selected
                </div>

              </div>

              <div
                className="
                  mt-7

                  flex flex-wrap gap-3
                "
              >

                {formValues
                  .painAreas.map(
                    (
                      area,
                      index
                    ) => (

                      <Badge
                        key={area}
                        variant="ochre"
                        size="lg"

                        className="
                          flex items-center gap-2

                          rounded-full

                          px-4 py-2.5

                          text-[11px]
                          font-semibold

                          shadow-none
                        "
                      >

                        <span
                          className="
                            flex h-5 w-5
                            items-center justify-center

                            rounded-full

                            bg-white/20

                            text-[9px]
                          "
                        >
                          0{
                            index + 1
                          }
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

        {/* =============================================
            RIGHT
        ============================================= */}

        <div className="space-y-5">

          {/* GENERATE */}

          <Card
            variant="teal"
            hover={false}
            className="
              relative overflow-hidden

              rounded-[30px]

              px-6 py-7
            "
          >

            <div
              className="
                absolute inset-0

                bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_35%)]
              "
            />

            <div className="relative z-10">

              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  bg-white/10

                  px-4 py-2

                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[0.13em]

                  text-white/75
                "
              >

                <ShieldCheck
                  size={12}
                />

                Ready

              </div>

              <h3
                className="
                  mt-6

                  text-[1.8rem]

                  leading-[1.02]

                  tracking-[-0.05em]

                  text-white
                "
              >
                Generate your
                recovery insights.
              </h3>

              <p
                className="
                  mt-4

                  text-[14px]

                  leading-[1.8]

                  text-white/75
                "
              >
                Create your personalized
                movement and mobility
                analysis report.
              </p>

              {/* ACTIONS */}

              <div className="mt-8 space-y-3">

                {/* PRIMARY CTA */}

                <Button
                  size="lg"
                  variant="onColor"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  className="
                    group

                    h-14 w-full

                    rounded-[20px]

                    bg-white
                    text-black

                    transition-all duration-300

                    hover:scale-[1.01]
                    hover:bg-white/95

                    active:scale-[0.99]
                  "
                >

                  <span
                    className="
                      flex items-center gap-2

                      text-[12px]
                      font-semibold

                      uppercase

                      tracking-[0.08em]
                    "
                  >

                    {isLoading
                      ? "Generating Analysis..."
                      : "Generate Analysis"}

                    {!isLoading && (

                      <ArrowRight
                        size={15}
                        className="
                          transition-transform duration-300

                          group-hover:translate-x-0.5
                        "
                      />

                    )}

                  </span>

                </Button>

                {/* SECONDARY TEXT */}

                <div
                  className="
                    text-center

                    text-[12px]

                    font-medium

                    text-white/65
                  "
                >
                  You can still go back and edit your
                  responses before generating insights.
                </div>

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
                    rounded-[24px]

                    border border-clay-brand-pink/20

                    bg-clay-brand-pink/5

                    px-5 py-5
                  "
                >

                  <div
                    className="
                      flex items-start gap-4
                    "
                  >

                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center

                        rounded-[14px]

                        bg-clay-brand-pink/10
                      "
                    >

                      <TriangleAlert
                        size={18}
                        className="
                          text-clay-brand-pink
                        "
                      />

                    </div>

                    <div>

                      <h4
                        className="
                          text-[14px]
                          font-semibold

                          text-clay-brand-pink
                        "
                      >
                        Analysis Error
                      </h4>

                      <p
                        className="
                          mt-2

                          text-[13px]

                          leading-[1.75]

                          text-clay-body
                        "
                      >
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