'use client'

import { motion } from 'framer-motion'

import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface StepperProps {
  steps: string[]

  current: number

  onSelect?: (
    index: number
  ) => void
}

/* =========================================================
   COMPONENT
========================================================= */

export function Stepper({
  steps,
  current,
  onSelect,
}: StepperProps) {

  return (
    <nav
      aria-label="Progress"
      className="w-full"
    >

      {/* =============================================
          SCREEN READER
      ============================================= */}

      <div
        aria-live="polite"
        className="sr-only"
      >
        Step {current + 1} of{' '}
        {steps.length}:{' '}
        {steps[current]}
      </div>

      {/* =============================================
          DESKTOP
      ============================================= */}

      <ol
        className="
          hidden
          items-center
          justify-center

          md:flex
        "
      >

        {steps.map((
          label,
          index
        ) => {

          const isActive =
            index === current

          const isComplete =
            index < current

          return (

            <li
              key={label}
              className="
                flex items-center
              "
            >

              {/* STEP */}
              <button
                type="button"
                onClick={() =>
                  onSelect?.(index)
                }
                aria-current={
                  isActive
                    ? 'step'
                    : undefined
                }
                className={cn(

                  `
                  group
                  relative

                  flex flex-col
                  items-center
                  gap-3

                  transition-all duration-200

                  focus:outline-none
                  `,

                  onSelect
                    ? 'cursor-pointer'
                    : 'cursor-default'
                )}
              >

                {/* CIRCLE */}
                <motion.div
                  animate={{
                    scale:
                      isActive
                        ? 1
                        : 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className={cn(

                    `
                    relative z-10

                    flex h-11 w-11
                    items-center justify-center

                    rounded-2xl

                    border

                    text-[13px]
                    font-medium

                    transition-all duration-200
                    `,

                    isComplete
                      ? `
                        border-transparent

                        bg-clay-primary

                        text-white
                        `

                      : isActive
                        ? `
                          border-black/[0.06]

                          bg-white

                          text-clay-ink

                          shadow-[0_4px_16px_rgba(0,0,0,0.05)]
                          `

                        : `
                          border-clay-hairline

                          bg-clay-surface-soft

                          text-clay-muted

                          hover:border-black/[0.08]
                          `
                  )}
                >

                  {isComplete ? (
                    <Check size={15} />
                  ) : (
                    <span>
                      {index + 1}
                    </span>
                  )}

                </motion.div>

                {/* LABEL */}
                <span
                  className={cn(

                    `
                    max-w-[100px]

                    text-center

                    text-[12px]
                    font-medium

                    leading-[1.4]

                    transition-colors duration-200
                    `,

                    isActive
                      ? `
                        text-clay-ink
                        `
                      : `
                        text-clay-muted
                        `
                  )}
                >
                  {label}
                </span>

              </button>

              {/* CONNECTOR */}
              {index <
                steps.length - 1 && (
                  <div
                    className="
                    relative

                    mx-3 mb-7

                    h-px w-16

                    overflow-hidden

                    rounded-full

                    bg-clay-hairline
                  "
                    aria-hidden="true"
                  >

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width:
                          isComplete
                            ? '100%'
                            : '0%',
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
                      className="
                      absolute left-0 top-0

                      h-full

                      bg-clay-primary
                    "
                    />

                  </div>
                )}

            </li>
          )
        })}

      </ol>

      {/* =============================================
          MOBILE
      ============================================= */}

      <div
        className="
          flex flex-col gap-4

          md:hidden
        "
      >

        {/* TOP */}
        <div
          className="
            flex items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                text-[12px]
                font-medium

                text-clay-muted
              "
            >
              Step {current + 1}
              <span className="px-1 opacity-40">
                /
              </span>
              {steps.length}
            </p>

            <h3
              className="
                mt-1

                text-[15px]
                font-medium

                tracking-[-0.02em]

                text-clay-ink
              "
            >
              {steps[current]}
            </h3>

          </div>

        </div>

        {/* PROGRESS */}
        <div
          className="
            relative

            h-1.5 w-full

            overflow-hidden

            rounded-full

            bg-clay-surface-strong
          "
        >

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${((current + 1) /
                steps.length) *
                100
                }%`,
            }}
            transition={{
              duration: 0.4,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              h-full

              rounded-full

              bg-clay-primary
            "
          />

        </div>

      </div>

    </nav>
  )
}

export default Stepper