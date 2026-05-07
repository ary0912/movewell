'use client'

import React from 'react'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {

  current: number

  total: number

  showLabel?: boolean

  animated?: boolean

  ariaLabel?: string

  size?: 'sm' | 'md'

  tone?: 'primary' | 'teal'
}

/* =========================================================
   COMPONENT
========================================================= */

const ProgressBar = React.forwardRef<
  HTMLDivElement,
  ProgressBarProps
>(
  (
    {
      current,
      total,

      showLabel = true,
      animated = true,

      ariaLabel = 'Progress',

      size = 'md',
      tone = 'primary',

      className,

      ...rest
    },
    ref
  ) => {

    /* =====================================================
       PROGRESS
    ===================================================== */

    const safeTotal =
      Math.max(1, total)

    const percentage =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (current / safeTotal) * 100
          )
        )
      )

    /* =====================================================
       STYLES
    ===================================================== */

    const barHeight =
      size === 'sm'
        ? 'h-1'
        : 'h-1.5'

    const fillColor =
      tone === 'teal'
        ? 'bg-clay-brand-teal'
        : 'bg-clay-primary'

    return (
      <div
        ref={ref}
        className={cn(
          `
          w-full
          space-y-3
          `,
          className
        )}
        {...rest}
      >

        {/* =================================================
            LABEL ROW
        ================================================= */}

        {showLabel && (
          <div
            className="
              flex items-center
              justify-between
              gap-4
            "
          >

            {/* LEFT */}
            <div
              className="
                flex items-center
                gap-2
              "
            >

              <span
                className="
                  text-[12px]
                  font-medium

                  tracking-[-0.01em]

                  text-clay-muted
                "
              >
                Progress
              </span>

              <span
                className="
                  text-[12px]

                  text-clay-body
                "
              >
                {current}
                <span className="px-1 opacity-40">
                  /
                </span>
                {total}
              </span>

            </div>

            {/* RIGHT */}
            <div
              className="
                text-[13px]
                font-medium

                tracking-[-0.02em]

                text-clay-ink

                tabular-nums
              "
            >
              {percentage}%
            </div>

          </div>
        )}

        {/* =================================================
            TRACK
        ================================================= */}

        <div
          role="progressbar"
          aria-label={ariaLabel}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn(

            `
            relative

            w-full

            overflow-hidden

            rounded-full

            bg-clay-surface-strong
            `,

            barHeight
          )}
        >

          {/* =============================================
              FILL
          ============================================= */}

          <motion.div
            animate={{
              width: `${percentage}%`,
            }}
            transition={{
              duration:
                animated
                  ? 0.65
                  : 0,

              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(

              `
              relative

              h-full

              rounded-full
              `,

              fillColor
            )}
          >

            {/* =========================================
                SUBTLE SHEEN
            ========================================= */}

            {animated && (
              <div
                className="
                  absolute inset-0

                  bg-gradient-to-r
                  from-transparent
                  via-white/15
                  to-transparent
                "
              />
            )}

          </motion.div>

        </div>

      </div>
    )
  }
)

ProgressBar.displayName =
  'ProgressBar'

export default ProgressBar