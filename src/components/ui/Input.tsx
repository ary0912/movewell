import * as React from 'react'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {

  label?: string

  error?: string | boolean

  hint?: string

  leftIcon?: React.ReactNode

  rightIcon?: React.ReactNode
}

/* =========================================================
   COMPONENT
========================================================= */

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,

      type = 'text',

      label,
      id,

      error,
      hint,

      leftIcon,
      rightIcon,

      disabled,

      ...props
    },
    ref
  ) => {

    const generatedId =
      React.useId()

    const inputId =
      id ?? generatedId

    const hasError =
      Boolean(error)

    return (
      <div
        className="
          w-full
          space-y-2.5
        "
      >

        {/* =================================================
            LABEL
        ================================================= */}

        {label && (
          <label
            htmlFor={inputId}
            className="
              block

              text-[12px]
              font-medium

              tracking-[-0.01em]

              text-clay-muted
            "
          >
            {label}
          </label>
        )}

        {/* =================================================
            INPUT WRAPPER
        ================================================= */}

        <div className="relative group">

          {/* =============================================
              LEFT ICON
          ============================================= */}

          {leftIcon && (
            <div
              className="
                pointer-events-none

                absolute left-4 top-1/2 z-10

                flex -translate-y-1/2
                items-center justify-center

                text-clay-muted
              "
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {/* =============================================
              INPUT
          ============================================= */}

          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={cn(

              /* =========================================
                 BASE
              ========================================= */

              `
              flex w-full

              rounded-2xl

              border

              bg-clay-surface-soft

              text-[15px]
              font-medium

              text-clay-ink

              placeholder:text-clay-muted

              transition-all duration-200

              outline-none

              disabled:cursor-not-allowed
              disabled:opacity-50
              `,

              /* =========================================
                 HEIGHT
              ========================================= */

              `
              h-14
              `,

              /* =========================================
                 PADDING
              ========================================= */

              leftIcon
                ? 'pl-12 pr-5'
                : 'px-5',

              rightIcon || hasError
                ? 'pr-12'
                : '',

              /* =========================================
                 STATES
              ========================================= */

              hasError
                ? `
                  border-clay-brand-pink/60

                  focus:border-clay-brand-pink
                  focus:ring-4
                  focus:ring-clay-brand-pink/10
                `
                : `
                  border-clay-hairline

                  hover:border-clay-muted/30

                  focus:border-clay-primary/40
                  focus:ring-4
                  focus:ring-clay-primary/10
                `,

              className
            )}
            {...props}
          />

          {/* =============================================
              RIGHT ICON
          ============================================= */}

          {!hasError && rightIcon && (
            <div
              className="
                pointer-events-none

                absolute right-4 top-1/2 z-10

                flex -translate-y-1/2
                items-center justify-center

                text-clay-muted
              "
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}

          {/* =============================================
              ERROR INDICATOR
          ============================================= */}

          {hasError && (
            <div
              className="
                pointer-events-none

                absolute right-4 top-1/2

                h-2.5 w-2.5

                -translate-y-1/2

                rounded-full

                bg-clay-brand-pink
              "
              aria-hidden="true"
            />
          )}

        </div>

        {/* =================================================
            FOOTER TEXT
        ================================================= */}

        <div className="min-h-[18px]">

          {hasError && typeof error === 'string' ? (
            <p
              id={`${inputId}-error`}
              role="alert"
              className="
                text-[12px]
                font-medium

                tracking-[-0.01em]

                text-clay-brand-pink
              "
            >
              {error}
            </p>
          ) : hint ? (
            <p
              id={`${inputId}-hint`}
              className="
                text-[12px]

                tracking-[-0.01em]

                text-clay-muted
              "
            >
              {hint}
            </p>
          ) : null}

        </div>

      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }