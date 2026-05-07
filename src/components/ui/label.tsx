'use client'

import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface LabelProps
  extends React.ComponentPropsWithoutRef<
    typeof LabelPrimitive.Root
  > {

  variant?: 'default' | 'muted' | 'section'

  required?: boolean
}

/* =========================================================
   VARIANTS
========================================================= */

const variantStyles = {
  default: `
    text-[13px]
    font-medium

    tracking-[-0.01em]

    text-clay-ink
  `,

  muted: `
    text-[12px]
    font-medium

    tracking-[0.01em]

    text-clay-muted
  `,

  section: `
    text-[11px]
    font-medium

    uppercase

    tracking-[0.08em]

    text-clay-muted
  `,
}

/* =========================================================
   COMPONENT
========================================================= */

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(
  (
    {
      className,

      variant = 'default',

      required = false,

      children,

      ...props
    },
    ref
  ) => {

    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(

          `
          inline-flex items-center
          gap-1.5

          leading-[1.2]

          transition-colors duration-200

          peer-disabled:cursor-not-allowed
          peer-disabled:opacity-50
          `,

          variantStyles[variant],

          className
        )}
        {...props}
      >

        <span>
          {children}
        </span>

        {required && (
          <span
            className="
              text-clay-brand-coral
            "
            aria-hidden="true"
          >
            *
          </span>
        )}

      </LabelPrimitive.Root>
    )
  }
)

Label.displayName =
  LabelPrimitive.Root.displayName

export { Label }