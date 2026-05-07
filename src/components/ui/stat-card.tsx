'use client'

import * as React from 'react'

import {
  animate,
  motion,
  useSpring,
  useTransform,
} from 'framer-motion'

import { Card } from './Card'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement> {

  title: string

  value: number

  change: number

  changeDescription: string

  icon: React.ReactNode

  suffix?: string
}

/* =========================================================
   COMPONENT
========================================================= */

const StatCard = React.forwardRef<
  HTMLDivElement,
  StatCardProps
>(
  (
    {
      title,

      value,

      change,

      changeDescription,

      icon,

      suffix = '%',

      className,

      ...props
    },
    ref
  ) => {

    /* =====================================================
       TREND
    ===================================================== */

    const isPositive =
      change >= 0

    /* =====================================================
       MOTION VALUE
    ===================================================== */

    const motionValue =
      useSpring(0, {
        damping: 60,
        stiffness: 100,
      })

    const displayValue =
      useTransform(
        motionValue,
        (latest) =>
          Math.round(latest)
      )

    React.useEffect(() => {

      const controls =
        animate(
          motionValue,
          value,
          {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }
        )

      return controls.stop

    }, [value, motionValue])

    return (
      <Card
        ref={ref}
        variant="cream"
        hover
        className={cn(

          `
          relative

          p-6
          `,

          className
        )}
        {...props}
      >

        <div
          className="
            flex h-full flex-col
            justify-between
          "
        >

          {/* =============================================
              TOP
          ============================================= */}

          <div
            className="
              flex items-start
              justify-between
              gap-4
            "
          >

            {/* LEFT */}
            <div>

              <p
                className="
                  text-[12px]
                  font-medium

                  tracking-[-0.01em]

                  text-clay-muted
                "
              >
                {title}
              </p>

              <div
                className="
                  mt-4

                  flex items-end gap-1
                "
              >

                <motion.h3
                  className="
                    text-[38px]
                    font-semibold

                    leading-none
                    tracking-[-0.05em]

                    text-clay-ink

                    tabular-nums
                  "
                >
                  {displayValue}
                </motion.h3>

                {suffix && (
                  <span
                    className="
                      mb-1

                      text-[14px]
                      font-medium

                      text-clay-muted
                    "
                  >
                    {suffix}
                  </span>
                )}

              </div>

            </div>

            {/* RIGHT */}
            <div
              className="
                flex h-11 w-11
                items-center justify-center

                rounded-2xl

                bg-clay-surface-soft

                text-clay-body
              "
            >
              {icon}
            </div>

          </div>

          {/* =============================================
              BOTTOM
          ============================================= */}

          <div
            className="
              mt-6

              flex items-center gap-3

              border-t border-clay-hairline

              pt-4
            "
          >

            {/* TREND */}
            <div
              className={cn(

                `
                flex items-center gap-1

                rounded-full

                px-2.5 py-1

                text-[11px]
                font-medium
                `,

                isPositive
                  ? `
                    bg-emerald-500/10
                    text-emerald-600
                    `
                  : `
                    bg-amber-500/10
                    text-amber-600
                    `
              )}
            >

              <span aria-hidden="true">
                {isPositive
                  ? '↑'
                  : '↓'}
              </span>

              <span>
                {Math.abs(change)}%
              </span>

            </div>

            {/* CONTEXT */}
            <p
              className="
                text-[12px]

                text-clay-body
              "
            >
              Compared to{' '}
              {changeDescription}
            </p>

          </div>

        </div>

      </Card>
    )
  }
)

StatCard.displayName =
  'StatCard'

export { StatCard }