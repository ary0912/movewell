import React, {
  type ReactNode,
  type HTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
  | 'pink'
  | 'teal'
  | 'lavender'
  | 'peach'
  | 'ochre'
  | 'cream'
  | 'neutral'

  size?: 'sm' | 'md' | 'lg'

  children: ReactNode
}

const variantStyles: Record<
  NonNullable<BadgeProps['variant']>,
  string
> = {
  pink:
    'bg-clay-brand-pink text-white border border-transparent',

  teal:
    'bg-clay-brand-teal text-white border border-transparent',

  lavender:
    'bg-clay-brand-lavender text-clay-ink border border-transparent',

  peach:
    'bg-clay-brand-peach text-clay-ink border border-transparent',

  ochre:
    'bg-clay-brand-ochre text-clay-ink border border-transparent',

  cream:
    'bg-clay-surface-card text-clay-ink border border-clay-hairline',

  neutral:
    'bg-clay-surface-strong text-clay-muted border border-transparent',
}

const sizeStyles: Record<
  NonNullable<BadgeProps['size']>,
  string
> = {
  sm:
    `
    h-6
    px-2.5
    text-[11px]
    font-medium
    tracking-[0.02em]
    `,

  md:
    `
    h-7
    px-3
    text-[12px]
    font-medium
    tracking-[0.03em]
    `,

  lg:
    `
    h-8
    px-4
    text-[13px]
    font-semibold
    tracking-[0.03em]
    `,
}

const Badge = React.forwardRef<
  HTMLSpanElement,
  BadgeProps
>(
  (
    {
      variant = 'neutral',
      size = 'md',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          `
          inline-flex items-center justify-center
          whitespace-nowrap
          rounded-full

          transition-colors duration-200

          select-none

          leading-none
          `,

          variantStyles[variant],
          sizeStyles[size],

          className
        )}
        {...rest}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge