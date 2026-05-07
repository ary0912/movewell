'use client'

import React from 'react'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type'
  > {

  label?: string

  min?: number

  max?: number

  step?: number

  showValue?: boolean

  unit?: string

  leftLabel?: string

  rightLabel?: string
}

/* =========================================================
   COMPONENT
========================================================= */

const Slider = React.forwardRef<
  HTMLInputElement,
  SliderProps
>(
  (
    {
      label,

      min = 0,
      max = 10,
      step = 1,

      showValue = true,

      unit = '',

      leftLabel,
      rightLabel,

      value = 0,

      className,

      ...rest
    },
    ref
  ) => {

    /* =====================================================
       VALUE
    ===================================================== */

    const numericValue =
      Number(value ?? min)

    const percentage =
      Math.max(
        0,
        Math.min(
          100,
          (
            (numericValue - min) /
            Math.max(1, max - min)
          ) * 100
        )
      )

    return (
      <div
        className={cn(

          `
          w-full
          space-y-3
          `,

          className
        )}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        {(label || showValue) && (
          <div
            className="
              flex items-center
              justify-between
              gap-4
            "
          >

            {/* LABEL */}
            {label && (
              <label
                className="
                  text-[13px]
                  font-medium

                  tracking-[-0.01em]

                  text-clay-ink
                "
              >
                {label}
              </label>
            )}

            {/* VALUE */}
            {showValue && (
              <div
                className="
                  text-[14px]
                  font-medium

                  tracking-[-0.02em]

                  text-clay-body

                  tabular-nums
                "
              >
                {numericValue}
                {unit}
              </div>
            )}

          </div>
        )}

        {/* =================================================
            SLIDER
        ================================================= */}

        <div
          className="
            relative

            flex items-center
          "
        >

          {/* TRACK */}
          <div
            className="
              absolute

              h-1.5 w-full

              overflow-hidden

              rounded-full

              bg-clay-surface-strong
            "
            aria-hidden="true"
          >

            {/* FILL */}
            <div
              className="
                h-full

                rounded-full

                bg-clay-primary

                transition-all duration-200
              "
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

          {/* INPUT */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={numericValue}
            aria-valuetext={`${numericValue}${unit}`}
            className="
              slider-thumb

              relative z-10

              h-6 w-full

              cursor-pointer

              appearance-none

              bg-transparent

              focus:outline-none
            "
            {...rest}
          />

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            flex items-center
            justify-between

            text-[12px]

            text-clay-muted
          "
        >

          <span>
            {leftLabel ??
              `${min}${unit}`}
          </span>

          <span>
            {rightLabel ??
              `${max}${unit}`}
          </span>

        </div>

        {/* =================================================
            STYLES
        ================================================= */}

        <style>{`

          .slider-thumb::-webkit-slider-thumb {

            appearance: none;

            height: 18px;
            width: 18px;

            border-radius: 9999px;

            border: 1px solid rgba(0,0,0,0.08);

            background: white;

            box-shadow:
              0 2px 8px rgba(0,0,0,0.08);

            transition:
              transform 0.16s ease,
              box-shadow 0.16s ease;
          }

          .slider-thumb::-webkit-slider-thumb:hover {

            transform: scale(1.03);

            box-shadow:
              0 4px 14px rgba(0,0,0,0.12);
          }

          .slider-thumb::-webkit-slider-thumb:active {

            transform: scale(0.98);
          }

          .slider-thumb::-moz-range-thumb {

            height: 18px;
            width: 18px;

            border-radius: 9999px;

            border: 1px solid rgba(0,0,0,0.08);

            background: white;

            box-shadow:
              0 2px 8px rgba(0,0,0,0.08);
          }

        `}</style>

      </div>
    )
  }
)

Slider.displayName =
  'Slider'

export default Slider