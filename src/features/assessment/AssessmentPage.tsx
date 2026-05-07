'use client';

import { useNavigate } from "react-router-dom";
import { useAssessment } from "@context/AssessmentContext";
import { useFormContext } from "react-hook-form";

import type {
  AssessmentFormValues,
} from "@utils/schemas";

import type {
  BodyArea,
} from "@/types";

import StepPainIntensity from "./StepPainIntensity";
import StepMobility from "./StepMobility";
import StepImpact from "./StepImpact";
import StepReview from "./StepReview";

import HumanSilhouette from "@/components/ui/HumanSilhouette";

import { Button } from "@components/ui/Button";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Activity,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* =========================================================
   STEPS
========================================================= */

const STEPS = [
  {
    id: 0,
    title: "Where do you feel discomfort?",
    desc: "Select the affected movement regions.",
    label: "Pain Areas",
  },

  {
    id: 1,
    title: "How intense is the discomfort?",
    desc: "Rate your current pain intensity.",
    label: "Intensity",
  },

  {
    id: 2,
    title: "How is your mobility today?",
    desc: "Understand movement restrictions.",
    label: "Mobility",
  },

  {
    id: 3,
    title: "How does this affect your day?",
    desc: "Measure lifestyle and recovery impact.",
    label: "Impact",
  },

  {
    id: 4,
    title: "Review your assessment",
    desc: "Confirm before generating insights.",
    label: "Review",
  },
];

/* =========================================================
   LABELS
========================================================= */

const AREA_LABELS: Record<string, string> = {
  neck: "Neck",
  shoulder: "Shoulders",
  elbow: "Elbows",
  wrist: "Wrists",
  upperBack: "Upper Back",
  lowerBack: "Lower Back",
  hip: "Hips",
  knee: "Knees",
  ankle: "Ankles",
};

/* =========================================================
   COMPONENT
========================================================= */

function AssessmentPage() {

  const navigate = useNavigate();

  const {
    currentStep,
    setCurrentStep,
    painAreas,
    setPainAreas,
  } = useAssessment();

  const { trigger } =
    useFormContext<AssessmentFormValues>();

  const progress =
    ((currentStep + 1) / STEPS.length) * 100;

  /* =====================================================
     TOGGLE AREA
  ===================================================== */

  const handleAreaToggle = (
    area: BodyArea
  ) => {

    const current =
      Array.isArray(painAreas)
        ? painAreas
        : [];

    if (current.includes(area)) {

      setPainAreas(
        current.filter(
          (a) => a !== area
        )
      );

    } else {

      setPainAreas([
        ...current,
        area,
      ]);
    }
  };

  /* =====================================================
     NEXT
  ===================================================== */

  const handleNext = async () => {

    let isValid = false;

    if (currentStep === 0) {

      isValid =
        await trigger("painAreas");

    } else if (
      currentStep === 1
    ) {

      isValid =
        await trigger(
          "painIntensity"
        );

    } else if (
      currentStep === 2
    ) {

      isValid =
        await trigger(
          "mobilityDifficulty"
        );

    } else if (
      currentStep === 3
    ) {

      isValid =
        await trigger(
          "dailyImpact"
        );

    } else {

      isValid = true;
    }

    if (
      isValid &&
      currentStep <
      STEPS.length - 1
    ) {

      setCurrentStep(
        currentStep + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =====================================================
     PREVIOUS
  ===================================================== */

  const handlePrevious = () => {

    if (currentStep > 0) {

      setCurrentStep(
        currentStep - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =====================================================
     STEP CONTENT
  ===================================================== */

  const renderStep = () => {

    if (currentStep === 0) {

      return (

        <div
          className="
            grid gap-6
            xl:grid-cols-[1fr_1fr]
          "
        >

          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              relative overflow-hidden

              rounded-[34px]

              border border-clay-hairline

              bg-white/[0.72]

              p-6

              backdrop-blur-2xl

              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            "
          >

            {/* AMBIENT */}

            <div
              className="
                pointer-events-none
                absolute right-[-100px] top-[-100px]

                h-[240px] w-[240px]

                rounded-full

                bg-clay-brand-peach/8

                blur-[110px]
              "
            />

            {/* HEADER */}

            <div
              className="
                relative z-10

                flex items-start
                justify-between
                gap-5
              "
            >

              <div>

                <div
                  className="
                    inline-flex items-center gap-2

                    rounded-full

                    border border-clay-hairline

                    bg-clay-surface-soft

                    px-3 py-2
                  "
                >

                  <div
                    className="
                      h-2 w-2
                      rounded-full
                      bg-clay-brand-coral
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-clay-muted
                    "
                  >
                    Body Mapping
                  </span>

                </div>

                <h2
                  className="
                    mt-5

                    max-w-[320px]

                    text-[2.3rem]

                    leading-[0.95]

                    tracking-[-0.06em]

                    text-clay-ink

                    clay-display
                  "
                >
                  Select affected regions.
                </h2>

                <p
                  className="
                    mt-4

                    max-w-[320px]

                    text-[15px]

                    leading-[1.8]

                    text-clay-body
                  "
                >
                  Tap movement regions where
                  discomfort or stiffness exists.
                </p>

              </div>

              <div
                className="
                  flex h-12 w-12
                  shrink-0
                  items-center justify-center

                  rounded-2xl

                  bg-[#111111]

                  text-white
                "
              >
                <Activity size={18} />
              </div>

            </div>

            {/* SILHOUETTE */}

            <div
              className="
                relative z-10

                mt-8

                flex items-center
                justify-center
              "
            >

              <HumanSilhouette
                compact
                selectedAreas={
                  painAreas || []
                }
                onAreaToggle={
                  handleAreaToggle
                }
                className="
                  scale-[0.96]
                "
              />

            </div>

            {/* FOOTER */}

            <div
              className="
                relative z-10

                mt-6

                flex items-center
                justify-between

                border-t border-clay-hairline

                pt-5
              "
            >

              <div>

                <div
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-clay-muted
                  "
                >
                  Active Regions
                </div>

                <div
                  className="
                    mt-2

                    text-[2.3rem]

                    leading-none

                    tracking-[-0.05em]

                    text-clay-ink

                    clay-display
                  "
                >
                  {painAreas?.length || 0}
                </div>

              </div>

              <div
                className="
                  rounded-2xl

                  border border-clay-hairline

                  bg-clay-surface-soft

                  px-4 py-3
                "
              >

                <div
                  className="
                    text-[11px]
                    font-medium
                    text-clay-body
                  "
                >
                  Multi-select enabled
                </div>

              </div>

            </div>

          </motion.div>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.04,
            }}
            className="
              relative overflow-hidden

              rounded-[34px]

              border border-clay-hairline

              bg-white/[0.72]

              p-6

              backdrop-blur-2xl

              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            "
          >

            <div
              className="
                pointer-events-none
                absolute bottom-[-120px] right-[-100px]

                h-[260px] w-[260px]

                rounded-full

                bg-clay-brand-lavender/8

                blur-[120px]
              "
            />

            <div
              className="
                relative z-10

                flex items-start
                justify-between
                gap-5
              "
            >

              <div>

                <div
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-clay-muted
                  "
                >
                  Selected Regions
                </div>

                <h3
                  className="
                    mt-3

                    text-[2.5rem]

                    leading-[0.95]

                    tracking-[-0.06em]

                    text-clay-ink

                    clay-display
                  "
                >
                  {painAreas?.length || 0}
                </h3>

              </div>

              <div
                className="
                  flex h-12 w-12
                  items-center justify-center

                  rounded-2xl

                  bg-[#111111]

                  text-white
                "
              >
                <Sparkles size={18} />
              </div>

            </div>

            <div
              className="
                relative z-10

                mt-7

                min-h-[430px]

                rounded-[28px]

                border border-clay-hairline

                bg-[#F8F5EE]

                p-5
              "
            >

              {painAreas?.length > 0 ? (

                <div
                  className="
                    flex h-full
                    flex-col
                    justify-between
                  "
                >

                  <div
                    className="
                      flex flex-wrap gap-3
                    "
                  >

                    {painAreas.map(
                      (area) => (

                        <motion.button
                          key={area}

                          whileHover={{
                            y: -1,
                          }}

                          whileTap={{
                            scale: 0.98,
                          }}

                          onClick={() =>
                            handleAreaToggle(
                              area
                            )
                          }

                          className="
                            inline-flex items-center gap-2.5

                            rounded-full

                            border border-clay-hairline

                            bg-white

                            px-4 py-3

                            transition-all duration-300

                            hover:border-black/10
                            hover:shadow-sm
                          "
                        >

                          <div
                            className="
                              h-2 w-2
                              rounded-full
                              bg-clay-brand-coral
                            "
                          />

                          <span
                            className="
                              text-[13px]
                              font-medium
                              text-clay-ink
                            "
                          >
                            {
                              AREA_LABELS[
                              area
                              ]
                            }
                          </span>

                        </motion.button>
                      )
                    )}

                  </div>

                  <div
                    className="
                      mt-8

                      rounded-[24px]

                      border border-clay-hairline

                      bg-white/80

                      p-5
                    "
                  >

                    <div
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-clay-muted
                      "
                    >
                      Initial Insight
                    </div>

                    <p
                      className="
                        mt-4

                        max-w-lg

                        text-[14px]

                        leading-[1.8]

                        text-clay-body
                      "
                    >
                      Selected movement regions
                      suggest potential mobility
                      stress patterns. Continue to
                      generate recovery insights.
                    </p>

                  </div>

                </div>

              ) : (

                <div
                  className="
                    flex h-full min-h-[320px]
                    flex-col items-center
                    justify-center
                    text-center
                  "
                >

                  <div
                    className="
                      flex h-16 w-16
                      items-center justify-center

                      rounded-full

                      bg-white

                      shadow-sm
                    "
                  >
                    <Activity size={22} />
                  </div>

                  <h4
                    className="
                      mt-7

                      text-[2rem]

                      leading-[1]

                      tracking-[-0.05em]

                      text-clay-ink

                      clay-display
                    "
                  >
                    No regions selected
                  </h4>

                  <p
                    className="
                      mt-4

                      max-w-md

                      text-[15px]

                      leading-[1.8]

                      text-clay-body
                    "
                  >
                    Select regions on the body map
                    to build your movement profile.
                  </p>

                </div>

              )}

            </div>

          </motion.div>

        </div>
      );
    }

    switch (currentStep) {

      case 1:
        return <StepPainIntensity />;

      case 2:
        return <StepMobility />;

      case 3:
        return <StepImpact />;

      case 4:
        return (
          <StepReview
            onComplete={() =>
              navigate("/results")
            }
          />
        );

      default:
        return null;
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (

    <main
      className="
        min-h-screen
        overflow-x-hidden
        bg-clay-canvas
        text-clay-ink
      "
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none
          fixed inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute left-1/2 top-[-240px]

            h-[720px] w-[720px]

            -translate-x-1/2

            rounded-full

            bg-clay-brand-peach/10

            blur-[140px]
          "
        />

      </div>

      {/* =================================================
          TOP BAR
      ================================================= */}

      <section
        className="
          sticky top-0 z-40

          border-b border-clay-hairline

          bg-clay-canvas/88

          backdrop-blur-2xl
        "
      >

        <div
          className="
            mx-auto
            w-full
            max-w-[1280px]

            px-6
            py-5
          "
        >

          <div
            className="
              flex items-center
              justify-between
            "
          >

            <div
              className="
                flex items-center gap-4
              "
            >

              <div
                className="
                  flex h-12 w-12
                  items-center justify-center

                  rounded-2xl

                  bg-[#111111]

                  text-white
                "
              >
                <Activity size={20} />
              </div>

              <div>

                <div
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-clay-muted
                  "
                >
                  Movement Assessment
                </div>

                <div
                  className="
                    mt-1

                    text-[22px]

                    tracking-[-0.05em]

                    text-clay-ink

                    clay-display
                  "
                >
                  Clinical Evaluation
                </div>

              </div>

            </div>

            <div
              className="
                hidden md:flex
                items-center gap-2

                rounded-full

                border border-clay-hairline

                bg-white/80

                px-4 py-3
              "
            >

              <CheckCircle2
                size={14}
                className="
                  text-clay-brand-teal
                "
              />

              <span
                className="
                  text-[13px]
                  font-medium
                  text-clay-body
                "
              >
                Auto-saved
              </span>

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-5">

            <div
              className="
                flex items-center
                justify-between
              "
            >

              <div
                className="
                  flex items-center gap-4
                "
              >

                <div
                  className="
                    rounded-full

                    border border-clay-hairline

                    bg-white

                    px-3 py-1.5

                    text-[12px]
                    font-semibold

                    text-clay-ink
                  "
                >
                  {currentStep + 1} /{" "}
                  {STEPS.length}
                </div>

                <div
                  className="
                    text-[14px]
                    font-medium
                    text-clay-body
                  "
                >
                  {
                    STEPS[
                      currentStep
                    ].label
                  }
                </div>

              </div>

              <div
                className="
                  text-[14px]
                  font-medium
                  text-clay-body
                "
              >
                {Math.round(progress)}%
              </div>

            </div>

            <div
              className="
                mt-4

                h-[2px]

                overflow-hidden

                rounded-full

                bg-clay-hairline
              "
            >

              <motion.div
                initial={false}

                animate={{
                  width: `${progress}%`,
                }}

                transition={{
                  duration: 0.45,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}

                className="
                  h-full
                  bg-[#111111]
                "
              />

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          pt-14
          px-6
        "
      >

        <div
          className="
            mx-auto
            w-full
            max-w-[1280px]
          "
        >

          <div
            className="
              max-w-[1000px]
              text-center
              mx-auto
            "
          >

            <div
              className="
                inline-flex items-center

                rounded-full

                border border-clay-hairline

                bg-white/80

                px-4 py-2

                text-[11px]
                font-semibold

                uppercase

                tracking-[0.16em]

                text-clay-muted
              "
            >
              {
                STEPS[
                  currentStep
                ].label
              }
            </div>

            <h1
              className="
                mx-auto
                mt-7

                max-w-[860px]

                text-[54px]
                leading-[0.92]

                tracking-[-0.08em]

                text-clay-ink

                clay-display

                md:text-[84px]
              "
            >
              {
                STEPS[
                  currentStep
                ].title
              }
            </h1>

            <p
              className="
                mx-auto
                mt-6

                max-w-xl

                text-[17px]

                leading-[1.8]

                text-clay-body
              "
            >
              {
                STEPS[
                  currentStep
                ].desc
              }
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section
        className="
          pt-12
          pb-24
          px-6
        "
      >

        <div
          className="
            mx-auto
            w-full
            max-w-[1280px]
          "
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={currentStep}

              initial={{
                opacity: 0,
                y: 12,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -10,
              }}

              transition={{
                duration: 0.35,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >

              {renderStep()}

            </motion.div>

          </AnimatePresence>

          {/* FOOTER */}

          <div
            className="
              mt-12

              flex items-center
              justify-between
            "
          >

            <Button
              variant="secondary"
              onClick={
                handlePrevious
              }
              disabled={
                currentStep === 0
              }
              className="
                h-12
                rounded-2xl
                px-6
              "
            >
              Back
            </Button>

            {currentStep <
              STEPS.length - 1 && (

                <Button
                  onClick={
                    handleNext
                  }
                  className="
                    h-12

                    rounded-2xl

                    bg-[#111111]

                    px-7

                    text-white
                  "
                >
                  Continue
                </Button>

              )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default AssessmentPage;