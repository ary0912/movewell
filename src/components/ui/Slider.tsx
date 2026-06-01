'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type'
  > {

  id?: string

  label?: string

  min?: number

  max?: number

  step?: number

  showValue?: boolean

  showTooltip?: boolean

  showTicks?: boolean

  unit?: string

  leftLabel?: string

  rightLabel?: string

  tickLabels?: string[]

  helperText?: string
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
      id,
      label,

      min = 0,
      max = 10,
      step = 1,

      showValue = true,
      showTooltip = false,
      showTicks = true,

      unit = '',

      leftLabel,
      rightLabel,
      tickLabels,
      helperText,

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

    const generatedId = React.useId()
    const inputId = id || generatedId

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

    const hasTicks =
      Array.isArray(tickLabels) &&
      tickLabels.length > 0

    const shouldRenderTicks =
      showTicks && hasTicks

    const activeTickIndex = hasTicks
      ? Math.round(
        (numericValue - min) /
        Math.max(1, max - min) *
        (tickLabels.length - 1)
      )
      : 0

    return (
      <div
        className={cn(
          `
          w-full
          space-y-4
          `,
          className
        )}
      >

        {(label || showValue) && (
          <div
            className="
              flex flex-wrap
              items-center
              justify-between
              gap-4
            "
          >

            {label && (
              <label
                htmlFor={inputId}
                className="
                  text-[13px]
                  font-semibold
                  tracking-[-0.01em]
                  text-clay-ink
                "
              >
                {label}
              </label>
            )}

            {showValue && (
              <div
                className="
                  rounded-full
                  border border-clay-hairline
                  bg-clay-surface-soft
                  px-4 py-2
                  text-[13px]
                  font-semibold
                  tracking-[-0.02em]
                  text-clay-ink
                  tabular-nums
                "
              >
                {numericValue}
                {unit}
              </div>
            )}

          </div>
        )}

        <div className="space-y-4">

          <div className="relative">

            <div
              className="
                pointer-events-none
                absolute inset-x-0
                top-1/2
                h-1.5
                -translate-y-1/2
                rounded-full
                bg-clay-surface-strong
              "
              aria-hidden="true"
            />

            <motion.div
              initial={false}
              animate={{ width: `${percentage}%` }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                pointer-events-none
                absolute
                left-0
                top-1/2
                h-1.5
                -translate-y-1/2
                rounded-full
                bg-clay-primary
                shadow-[0_0_0_1px_rgba(16,185,129,0.12)]
              "
            />

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
                relative z-20
                h-9 w-full
                cursor-pointer
                appearance-none
                bg-transparent
                focus:outline-none
              "
              {...rest}
            />
          </div>

          {showTooltip && (
            <div
              className="
                relative
                flex
                justify-center
              "
            >
              <div
                className="
                  pointer-events-none
                  relative
                  inline-flex
                  flex-col
                  items-center
                  gap-1
                "
                style={{
                  left: `${percentage}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div
                  className="
                    rounded-full
                    bg-white
                    px-3 py-1.5
                    text-[12px]
                    font-semibold
                    text-clay-ink
                    shadow-[0_10px_35px_rgba(0,0,0,0.08)]
                    ring-1 ring-clay-hairline
                  "
                >
                  {numericValue}
                  {unit}
                </div>
                <div
                  className="
                    h-2 w-2
                    rounded-full
                    bg-clay-primary
                  "
                />
              </div>
            </div>
          )}

        </div>

        {shouldRenderTicks ? (
          <div className="
            grid
            grid-cols-5
            gap-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.12em]
          ">
            {tickLabels?.map((tickLabel, index) => (
              <div
                key={tickLabel}
                className={cn(
                  'text-center',
                  index <= activeTickIndex
                    ? 'text-clay-ink'
                    : 'text-clay-muted'
                )}
              >
                {tickLabel}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              flex items-center
              justify-between
              text-[12px]
              text-clay-muted
            "
          >
            <span>{leftLabel ?? `${min}${unit}`}</span>
            <span>{rightLabel ?? `${max}${unit}`}</span>
          </div>
        )}

        {helperText && (
          <p className="
            text-[13px]
            leading-[1.6]
            text-clay-body
          ">
            {helperText}
          </p>
        )}

        <style>{`
          .slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            margin: 0;
            background: transparent;
            outline: none;
          }

          .slider-thumb::-webkit-slider-runnable-track {
            background: transparent;
            border: none;
            height: 0;
          }

          .slider-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 18px;
            width: 18px;
            border-radius: 9999px;
            border: 1px solid rgba(0,0,0,0.08);
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: transform 0.16s ease, box-shadow 0.16s ease;
            cursor: pointer;
          }

          .slider-thumb::-webkit-slider-thumb:hover {
            transform: scale(1.06);
            box-shadow: 0 14px 32px rgba(0,0,0,0.12);
          }

          .slider-thumb::-webkit-slider-thumb:focus,
          .slider-thumb:focus-visible::-webkit-slider-thumb {
            box-shadow: 0 0 0 6px rgba(16,185,129,0.16);
          }

          .slider-thumb::-webkit-slider-thumb:active {
            transform: scale(0.95);
          }

          .slider-thumb::-moz-range-track {
            background: transparent;
            border: none;
            height: 0;
          }

          .slider-thumb::-moz-range-thumb {
            height: 18px;
            width: 18px;
            border-radius: 9999px;
            border: 1px solid rgba(0,0,0,0.08);
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            cursor: pointer;
          }

          .slider-thumb::-moz-range-thumb:hover {
            transform: scale(1.06);
          }

          .slider-thumb::-moz-range-thumb:active {
            transform: scale(0.95);
          }
        `}</style>
      </div>
    )
  }
)

Slider.displayName =
  'Slider'

export default Slider