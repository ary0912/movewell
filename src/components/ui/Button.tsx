'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const MotionButton = motion.button

/* =========================================================
   VARIANTS
========================================================= */

const buttonVariants = cva(
  `
  relative inline-flex shrink-0 items-center justify-center gap-2
  whitespace-nowrap
  overflow-hidden
  select-none

  font-semibold
  tracking-[-0.01em]

  transition-all duration-300 ease-out

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-clay-primary/20

  disabled:pointer-events-none
  disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-clay-primary
          text-white
          shadow-[0_10px_30px_rgba(0,0,0,0.10)]
          hover:bg-clay-primary/92
        `,

        secondary: `
          border border-clay-hairline
          bg-white
          text-clay-ink
          hover:bg-clay-surface-soft
        `,

        outline: `
          border border-clay-hairline
          bg-transparent
          text-clay-ink
          hover:bg-clay-surface-soft
        `,

        ghost: `
          bg-transparent
          text-clay-ink
          hover:bg-clay-surface-soft
        `,

        onColor: `
          bg-white
          text-clay-ink
          hover:bg-clay-surface-soft
        `,

        teal: `
          bg-clay-brand-teal
          text-white
          shadow-[0_12px_30px_rgba(26,58,58,0.18)]
          hover:bg-[#244848]
        `,

        rich: `
          border border-clay-hairline
          bg-white/90
          backdrop-blur-xl
          shadow-[0_6px_24px_rgba(0,0,0,0.04)]

          hover:bg-white
          hover:border-clay-muted/20
        `,
      },

      size: {
        sm: `
          h-9
          rounded-xl
          px-4
          text-[13px]
        `,

        default: `
          h-11
          rounded-2xl
          px-6
          text-[14px]
        `,

        lg: `
          h-[52px]
          rounded-2xl
          px-8
          text-[15px]
        `,

        xl: `
          h-[60px]
          rounded-[20px]
          px-10
          text-[15px]
        `,

        icon: `
          h-11 w-11
          rounded-2xl
        `,
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

/* =========================================================
   TYPES
========================================================= */

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragLeave"
    | "onDragOver"
    | "onDrop"
  >,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
  subtitle?: string
}

/* =========================================================
   COMPONENT
========================================================= */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,

      asChild = false,
      isLoading = false,

      icon,
      subtitle,
      children,

      disabled,

      type,

      ...props
    },
    ref
  ) => {

    /* =========================================
       AS CHILD
    ========================================= */

    if (asChild) {
      return (
        <Slot
          className={cn(
            buttonVariants({
              variant,
              size,
            }),
            className
          )}
        >
          {children}
        </Slot>
      )
    }

    /* =========================================
       SPINNER COLOR
    ========================================= */

    const spinnerColor =
      variant === "secondary" ||
        variant === "outline" ||
        variant === "ghost" ||
        variant === "onColor" ||
        variant === "rich"
        ? "border-clay-ink border-t-transparent"
        : "border-white border-t-transparent"

    /* =========================================
       RICH BUTTON
    ========================================= */

    if (variant === "rich") {
      return (
        <MotionButton
          ref={ref}
          type={type ?? "button"}
          aria-busy={isLoading}
          disabled={disabled || isLoading}
          whileHover={{
            y: -1,
          }}
          whileTap={{
            scale: 0.99,
          }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            buttonVariants({
              variant,
              size,
            }),
            `
            group
            w-full
            items-start
            justify-between
            p-5
            text-left
            `,
            className
          )}
          {...props}
        >

          {/* GLOW */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
              bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_35%)]
            "
          />

          {/* CONTENT */}
          <div className="relative z-10 flex w-full items-start justify-between gap-6">

            <div className="flex items-start gap-4">

              {icon && (
                <div
                  className="
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-clay-surface-soft
                    text-clay-brand-teal
                  "
                >
                  {icon}
                </div>
              )}

              <div className="space-y-1">

                <div
                  className="
                    text-[15px]
                    font-semibold
                    tracking-[-0.02em]
                    text-clay-ink
                  "
                >
                  {children}
                </div>

                {subtitle && (
                  <p
                    className="
                      text-sm
                      leading-relaxed
                      text-clay-body
                    "
                  >
                    {subtitle}
                  </p>
                )}

              </div>

            </div>

            <div
              className="
                mt-1
                text-clay-muted
                transition-transform duration-300
                group-hover:translate-x-0.5
              "
            >
              →
            </div>

          </div>

        </MotionButton>
      )
    }

    /* =========================================
       STANDARD BUTTON
    ========================================= */

    return (
      <MotionButton
        ref={ref}
        type={type ?? "button"}
        aria-busy={isLoading}
        disabled={disabled || isLoading}
        whileHover={{
          y: -1,
        }}
        whileTap={{
          scale: 0.985,
        }}
        transition={{
          duration: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          "group",
          className
        )}
        {...props}
      >

        {/* HOVER LIGHT */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
            bg-white/[0.06]
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 flex items-center gap-2">

          {isLoading ? (
            <>
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 animate-spin",
                  spinnerColor
                )}
              />

              <span className="sr-only">
                Loading
              </span>
            </>
          ) : (
            <>
              {icon && (
                <span className="flex items-center justify-center">
                  {icon}
                </span>
              )}

              <span>{children}</span>
            </>
          )}

        </div>

      </MotionButton>
    )
  }
)

Button.displayName = "Button"

export { Button }