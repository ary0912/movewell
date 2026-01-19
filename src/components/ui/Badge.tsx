/**
 * Badge component - visual indicator for status, labels, or scores
 * Color-coded for different states with accessible contrast
 */

import React, { type ReactNode, type HTMLAttributes } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantStyles = {
  success: 'bg-gradient-to-r from-green-100 to-green-50 text-green-900 border-green-300 font-semibold shadow-sm',
  warning: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border-amber-300 font-semibold shadow-sm',
  danger: 'bg-gradient-to-r from-red-100 to-red-50 text-red-900 border-red-300 font-semibold shadow-sm',
  info: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 border-blue-300 font-semibold shadow-sm',
  neutral: 'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-900 border-slate-300 font-semibold shadow-sm',
};

const sizeStyles = {
  sm: 'px-sm py-xs text-xs',
  md: 'px-md py-sm text-sm',
  lg: 'px-lg py-md text-base',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', className, children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center font-semibold rounded-md border',
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
