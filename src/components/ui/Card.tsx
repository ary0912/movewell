'use client'

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const MotionDiv = motion.div

/* =========================================================
   VARIANTS
========================================================= */

type CardVariant =
  | "default"
  | "glass"
  | "cream"
  | "pink"
  | "teal"
  | "lavender"
  | "peach"
  | "ochre"
  | "dark"

const variantStyles: Record<CardVariant, string> = {
  /* =====================================================
     DEFAULT
  ===================================================== */
  default: `
    bg-white/92
    border border-clay-hairline
    text-clay-ink
    backdrop-blur-xl
    shadow-[0_8px_40px_rgba(0,0,0,0.04)]
  `,

  /* =====================================================
     GLASS
  ===================================================== */
  glass: `
    border border-white/40
    bg-white/70
    text-clay-ink
    backdrop-blur-2xl
    shadow-[0_8px_40px_rgba(0,0,0,0.05)]
  `,

  /* =====================================================
     CREAM
  ===================================================== */
  cream: `
    border border-clay-hairline/50
    bg-clay-surface-card
    text-clay-ink
    shadow-[0_4px_20px_rgba(0,0,0,0.025)]
  `,

  /* =====================================================
     FEATURE SURFACES
  ===================================================== */
  pink: `
    border-none
    bg-clay-brand-pink
    text-white
    shadow-[0_20px_50px_rgba(0,0,0,0.10)]
  `,

  teal: `
    border-none
    bg-clay-brand-teal
    text-white
    shadow-[0_20px_50px_rgba(0,0,0,0.10)]
  `,

  lavender: `
    border-none
    bg-clay-brand-lavender
    text-clay-ink
    shadow-[0_20px_50px_rgba(0,0,0,0.08)]
  `,

  peach: `
    border-none
    bg-clay-brand-peach
    text-clay-ink
    shadow-[0_20px_50px_rgba(0,0,0,0.08)]
  `,

  ochre: `
    border-none
    bg-clay-brand-ochre
    text-clay-ink
    shadow-[0_20px_50px_rgba(0,0,0,0.08)]
  `,

  /* =====================================================
     DARK
  ===================================================== */
  dark: `
    border border-white/5
    bg-clay-surface-dark-elevated
    text-white
    shadow-[0_20px_60px_rgba(0,0,0,0.22)]
  `,
}

/* =========================================================
   TYPES
========================================================= */

export interface CardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragLeave"
    | "onDragOver"
    | "onDrop"
  > {
  variant?: CardVariant
  hover?: boolean
  interactive?: boolean
  glow?: boolean
}

/* =========================================================
   COMPONENT
========================================================= */

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(
  (
    {
      className,
      variant = "default",
      hover = true,
      interactive = false,
      glow = true,
      children,
      ...props
    },
    ref
  ) => {

    const isFeatureCard = [
      "pink",
      "teal",
      "lavender",
      "peach",
      "ochre",
    ].includes(variant)

    const isDark =
      variant === "dark"

    return (
      <MotionDiv
        ref={ref}
        whileHover={
          hover
            ? {
              y: isFeatureCard ? -3 : -2,
              scale: 1.002,
            }
            : undefined
        }
        transition={{
          duration: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(

          /* BASE */
          `
          group
          relative
          w-full
          overflow-hidden
          transition-all duration-300
          will-change-transform
          `,

          /* RADIUS */
          isFeatureCard
            ? "rounded-[30px]"
            : "rounded-[26px]",

          /* PADDING */
          isFeatureCard
            ? "p-8 md:p-10"
            : "p-6 md:p-8",

          /* INTERACTIVE */
          interactive &&
          `
            cursor-pointer
            `,

          /* HOVER */
          hover &&
          !isFeatureCard &&
          `
            hover:border-clay-muted/20
            hover:shadow-[0_18px_60px_rgba(0,0,0,0.07)]
            `,

          hover &&
          isFeatureCard &&
          `
            hover:brightness-[1.02]
            `,

          variantStyles[variant],

          className
        )}
        {...props}
      >

        {/* =================================================
            AMBIENT GLOW
        ================================================= */}

        {glow &&
          !isDark && (
            <div
              className="
                pointer-events-none
                absolute inset-0
                opacity-70
                transition-opacity duration-500
                group-hover:opacity-100
                bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_34%)]
              "
            />
          )}

        {/* =================================================
            FEATURE CARD LIGHT
        ================================================= */}

        {isFeatureCard && (
          <div
            className="
              pointer-events-none
              absolute right-[-80px] top-[-80px]
              h-[220px] w-[220px]
              rounded-full
              bg-white/10
              blur-3xl
              transition-transform duration-700
              group-hover:scale-110
            "
          />
        )}

        {/* =================================================
            BORDER SHINE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            rounded-[inherit]
            ring-1 ring-inset ring-white/[0.03]
          "
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="relative z-10">
          {children}
        </div>

      </MotionDiv>
    )
  }
)

Card.displayName = "Card"

export { Card }