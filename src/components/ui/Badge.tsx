import React, { type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'pink' | 'teal' | 'lavender' | 'peach' | 'ochre' | 'cream' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  pink: 'bg-clay-brand-pink text-white border-none',
  teal: 'bg-clay-brand-teal text-white border-none',
  lavender: 'bg-clay-brand-lavender text-clay-ink border-none',
  peach: 'bg-clay-brand-peach text-clay-ink border-none',
  ochre: 'bg-clay-brand-ochre text-clay-ink border-none',
  cream: 'bg-clay-surface-card text-clay-ink border border-clay-hairline',
  neutral: 'bg-clay-surface-strong text-clay-muted border-none',
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-[10px] leading-none',
  md: 'px-3 py-1 text-[11px] font-bold uppercase tracking-widest',
  lg: 'px-4 py-1.5 text-xs font-bold uppercase tracking-widest',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', className, children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-sm transition-all',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
