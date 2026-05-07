'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const MotionDiv = motion.div

/* =========================================================
   VARIANTS
========================================================= */

type CardVariant =
  | 'default'
  | 'glass'
  | 'cream'
  | 'pink'
  | 'teal'
  | 'lavender'
  | 'peach'
  | 'ochre'
  | 'dark'

const variantStyles: Record<CardVariant, string> = {

  /* =====================================================
     DEFAULT
  ===================================================== */

  default: `
    border border-clay-hairline

    bg-white/92
    text-clay-ink

    backdrop-blur-xl

    shadow-[0_8px_40px_rgba(0,0,0,0.035)]
  `,

  /* =====================================================
     GLASS
  ===================================================== */

  glass: `
    border border-white/40

    bg-white/70
    text-clay-ink

    backdrop-blur-2xl

    shadow-[0_8px_40px_rgba(0,0,0,0.045)]
  `,

  /* =====================================================
     CREAM
  ===================================================== */

  cream: `
    border border-clay-hairline/50

    bg-clay-surface-card
    text-clay-ink

    shadow-[0_4px_20px_rgba(0,0,0,0.02)]
  `,

  /* =====================================================
     FEATURE SURFACES
  ===================================================== */

  pink: `
    border border-transparent

    bg-clay-brand-pink
    text-white

    shadow-[0_18px_50px_rgba(0,0,0,0.08)]
  `,

  teal: `
    border border-transparent

    bg-clay-brand-teal
    text-white

    shadow-[0_18px_50px_rgba(0,0,0,0.08)]
  `,

  lavender: `
    border border-transparent

    bg-clay-brand-lavender
    text-clay-ink

    shadow-[0_18px_50px_rgba(0,0,0,0.06)]
  `,

  peach: `
    border border-transparent

    bg-clay-brand-peach
    text-clay-ink

    shadow-[0_18px_50px_rgba(0,0,0,0.06)]
  `,

  ochre: `
    border border-transparent

    bg-clay-brand-ochre
    text-clay-ink

    shadow-[0_18px_50px_rgba(0,0,0,0.06)]
  `,

  /* =====================================================
     DARK
  ===================================================== */

  dark: `
    border border-white/5

    bg-clay-surface-dark-elevated
    text-white

    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
  `,
}

/* =========================================================
   TYPES
========================================================= */

export interface CardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onDragEnter'
    | 'onDragLeave'
    | 'onDragOver'
    | 'onDrop'
  > {

  variant?: CardVariant

  hover?: boolean

  interactive?: boolean

  glow?: boolean
}

/* =========================================================
   HELPERS
========================================================= */

const FEATURE_VARIANTS: CardVariant[] = [
  'pink',
  'teal',
  'lavender',
  'peach',
  'ochre',
]

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
      variant = 'default',

      hover = true,
      interactive = false,
      glow = true,

      children,

      ...props
    },
    ref
  ) => {

    const isFeatureCard =
      FEATURE_VARIANTS.includes(variant)

    const isDark =
      variant === 'dark'

    return (
      <MotionDiv
        ref={ref}
        whileHover={
          hover
            ? {
              y: isFeatureCard ? -3 : -2,
            }
            : undefined
        }
        transition={{
          duration: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(

          /* =================================================
             BASE
          ================================================= */

          `
          group
          relative

          w-full

          overflow-hidden

          transition-all duration-300

          will-change-transform
          `,

          /* =================================================
             RADIUS
          ================================================= */

          isFeatureCard
            ? 'rounded-[30px]'
            : 'rounded-[26px]',

          /* =================================================
             PADDING
          ================================================= */

          isFeatureCard
            ? 'p-8 md:p-10'
            : 'p-6 md:p-8',

          /* =================================================
             INTERACTIVE
          ================================================= */

          interactive &&
          `
          cursor-pointer
          `,

          /* =================================================
             HOVER STATES
          ================================================= */

          hover &&
          !isFeatureCard &&
          `
          hover:border-clay-muted/15
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.055)]
          `,

          hover &&
          isFeatureCard &&
          `
          hover:brightness-[1.015]
          `,

          /* =================================================
             VARIANT
          ================================================= */

          variantStyles[variant],

          className
        )}
        {...props}
      >

        {/* =================================================
            AMBIENT GLOW
        ================================================= */}

        {glow && !isDark && (
          <div
            className="
              pointer-events-none
              absolute inset-0

              opacity-60

              transition-opacity duration-500

              group-hover:opacity-90

              bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_34%)]
            "
          />
        )}

        {/* =================================================
            FEATURE LIGHT
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

              group-hover:scale-105
            "
          />
        )}

        {/* =================================================
            SUBTLE BORDER SHINE
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute inset-0

            rounded-[inherit]

            ring-1 ring-inset ring-white/[0.025]
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

Card.displayName = 'Card'

export { Card }