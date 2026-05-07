'use client';

import { useNavigate } from "react-router-dom"
import { useAssessment } from "@context/AssessmentContext"
import { useFormContext } from "react-hook-form"
import type { AssessmentFormValues } from "@utils/schemas"

import StepPainMap from "./StepPainMap"
import StepPainIntensity from "./StepPainIntensity"
import StepMobility from "./StepMobility"
import StepImpact from "./StepImpact"
import StepReview from "./StepReview"

import { Button } from "@components/ui/Button"
import Stepper from "@components/ui/Stepper"

import {
  motion,
  AnimatePresence
} from "framer-motion"

import {
  Activity,
  CheckCircle2,
} from "lucide-react"

const STEPS = [
  {
    id: 0,
    title: "Where do you feel discomfort?",
    desc: "Select the areas where you currently experience pain or tension.",
    label: "Pain Areas"
  },
  {
    id: 1,
    title: "How intense is the discomfort?",
    desc: "Rate the severity of your pain on a structured clinical scale.",
    label: "Pain Intensity"
  },
  {
    id: 2,
    title: "How is your mobility today?",
    desc: "Identify movements that currently feel restricted or difficult.",
    label: "Mobility"
  },
  {
    id: 3,
    title: "How does this affect your day?",
    desc: "Understand how recovery impacts daily activity, sleep, and work.",
    label: "Lifestyle Impact"
  },
  {
    id: 4,
    title: "Review your assessment",
    desc: "Confirm your responses before generating movement insights.",
    label: "Review"
  }
]

function AssessmentPage() {
  const navigate = useNavigate()

  const {
    currentStep,
    setCurrentStep
  } = useAssessment()

  const { trigger } =
    useFormContext<AssessmentFormValues>()

  const progress =
    ((currentStep + 1) / STEPS.length) * 100

  const handleNext = async () => {
    let isValid = false

    if (currentStep === 0)
      isValid = await trigger("painAreas")
    else if (currentStep === 1)
      isValid = await trigger("painIntensity")
    else if (currentStep === 2)
      isValid = await trigger("mobilityDifficulty")
    else if (currentStep === 3)
      isValid = await trigger("dailyImpact")
    else isValid = true

    if (
      isValid &&
      currentStep < STEPS.length - 1
    ) {
      setCurrentStep(currentStep + 1)

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepPainMap />

      case 1:
        return <StepPainIntensity />

      case 2:
        return <StepMobility />

      case 3:
        return <StepImpact />

      case 4:
        return (
          <StepReview
            onComplete={() =>
              navigate("/results")
            }
          />
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-clay-canvas text-clay-ink overflow-x-hidden">

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-240px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-clay-brand-teal/5 blur-[120px]" />

        <div className="absolute right-[-120px] top-[20%] h-[320px] w-[320px] rounded-full bg-clay-brand-lavender/10 blur-[120px]" />

      </div>

      {/* TOP HEADER */}
      <section
        className="
          sticky top-0 z-50
          border-b border-clay-hairline
          bg-clay-canvas/90
          backdrop-blur-2xl
        "
      >

        <div className="mx-auto max-w-[1280px] px-5 md:px-8">

          {/* TOP ROW */}
          <div className="flex items-center justify-between py-5">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  bg-clay-primary
                  text-white
                  shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                "
              >
                <Activity size={21} />
              </div>

              <div>

                <div
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-clay-muted
                  "
                >
                  Clinical Assessment
                </div>

                <div
                  className="
                    mt-1
                    text-lg
                    font-semibold
                    tracking-[-0.03em]
                    text-clay-ink
                    clay-display
                  "
                >
                  Movement Evaluation
                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div
              className="
                hidden md:flex
                items-center gap-3
                rounded-2xl
                border border-clay-hairline
                bg-white/80
                px-4 py-3
              "
            >

              <CheckCircle2
                size={16}
                className="text-clay-brand-teal"
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-clay-body
                "
              >
                Progress automatically saved
              </span>

            </div>

          </div>

          {/* PROGRESS */}
          <div className="pb-5">

            <div className="mb-3 flex items-center justify-between">

              <div
                className="
                  text-sm
                  font-semibold
                  text-clay-ink
                "
              >
                Step {currentStep + 1} of {STEPS.length}
              </div>

              <div
                className="
                  text-sm
                  font-medium
                  text-clay-muted
                "
              >
                {Math.round(progress)}% completed
              </div>

            </div>

            {/* BAR */}
            <div
              className="
                h-2 overflow-hidden
                rounded-full
                bg-clay-surface-strong
              "
            >

              <motion.div
                initial={false}
                animate={{
                  width: `${progress}%`
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="
                  h-full rounded-full
                  bg-clay-brand-teal
                "
              />

            </div>

          </div>

          {/* DESKTOP STEPPER */}
          <div className="hidden lg:block pb-6">

            <Stepper
              steps={STEPS.map((s) => s.label)}
              current={currentStep}
              onSelect={(i) =>
                setCurrentStep(i)
              }
            />

          </div>

        </div>

      </section>

      {/* MAIN */}
      <section
        className="
          relative z-10
          px-5 md:px-8
          pt-10 md:pt-14
          pb-32 md:pb-20
        "
      >

        <div className="mx-auto max-w-[1280px]">

          <AnimatePresence mode="wait">

            <motion.div
              key={currentStep}
              initial={{
                opacity: 0,
                y: 12
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1]
              }}
            >

              {/* STICKY CONTEXT HEADER */}
              <div
                className="
                  sticky top-[132px]
                  z-30
                  bg-clay-canvas/92
                  backdrop-blur-xl
                  pb-8
                "
              >

                <div className="mx-auto max-w-3xl text-center">

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: 0.04
                    }}
                    className="mb-5"
                  >

                    <span
                      className="
                        inline-flex items-center
                        rounded-full
                        border border-clay-hairline
                        bg-white/90
                        px-4 py-2
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-clay-brand-teal
                        shadow-sm
                      "
                    >
                      {STEPS[currentStep].label}
                    </span>

                  </motion.div>

                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: 0.08
                    }}
                    className="
                      text-[2.5rem]
                      md:text-[4.2rem]
                      font-medium
                      leading-[0.98]
                      tracking-[-0.055em]
                      text-clay-ink
                      clay-display
                    "
                  >
                    {STEPS[currentStep].title}
                  </motion.h1>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: 0.12
                    }}
                    className="
                      mx-auto mt-5
                      max-w-2xl
                      text-[16px] md:text-[18px]
                      font-medium
                      leading-[1.85]
                      text-clay-body
                    "
                  >
                    {STEPS[currentStep].desc}
                  </motion.p>

                </div>

              </div>

              {/* CONTENT */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 14
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.16
                }}
                className="mt-4"
              >

                <div
                  className="
                    rounded-[36px]
                    border border-clay-hairline
                    bg-white/85
                    backdrop-blur-xl
                    p-5 md:p-10
                    shadow-[0_10px_50px_rgba(0,0,0,0.04)]
                  "
                >

                  {/* STEP CONTENT */}
                  <div
                    className="
                      min-h-[68vh]
                      lg:min-h-[72vh]
                    "
                  >
                    {renderStep()}
                  </div>

                  {/* FOOTER */}
                  <div
                    className="
                      mt-10
                      border-t border-clay-hairline
                      pt-8
                    "
                  >

                    <div
                      className="
                        flex flex-col gap-6
                        md:flex-row
                        md:items-center
                        md:justify-between
                      "
                    >

                      {/* LEFT */}
                      <div className="flex items-center gap-4">

                        <Button
                          variant="secondary"
                          onClick={handlePrevious}
                          disabled={currentStep === 0}
                          className="
                            h-12
                            rounded-2xl
                            border border-clay-hairline
                            bg-white
                            px-6
                            text-[13px]
                            font-semibold
                            transition-all duration-300
                            hover:bg-clay-surface-soft
                          "
                        >
                          Back
                        </Button>

                        <div
                          className="
                            hidden md:block
                            text-sm
                            font-medium
                            text-clay-muted
                          "
                        >
                          Responses are securely stored during assessment
                        </div>

                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-4">

                        {/* STEP INDICATOR */}
                        <div
                          className="
                            hidden sm:flex
                            items-center gap-2
                            rounded-2xl
                            bg-clay-surface-soft
                            px-4 py-3
                          "
                        >

                          <div
                            className="
                              h-2 w-2 rounded-full
                              bg-clay-brand-teal
                            "
                          />

                          <span
                            className="
                              text-sm
                              font-medium
                              text-clay-body
                            "
                          >
                            {currentStep + 1} / {STEPS.length}
                          </span>

                        </div>

                        {/* NEXT */}
                        {currentStep <
                          STEPS.length - 1 && (
                            <Button
                              onClick={handleNext}
                              className="
                                h-12
                                rounded-2xl
                                bg-clay-primary
                                px-7
                                text-[13px]
                                font-semibold
                                uppercase
                                tracking-[0.08em]
                                text-white
                                shadow-[0_12px_30px_rgba(0,0,0,0.10)]
                                transition-all duration-300
                                hover:scale-[1.02]
                                hover:bg-clay-brand-teal
                              "
                            >
                              Continue
                            </Button>
                          )}

                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>

            </motion.div>

          </AnimatePresence>

        </div>

      </section>

    </main>
  )
}

export default AssessmentPage