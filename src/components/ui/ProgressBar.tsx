'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number;
  total: number;
  showLabel?: boolean;
  animated?: boolean;
  ariaLabel?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      current,
      total,
      showLabel = true,
      animated = true,
      ariaLabel = 'Progress',
      className,
      ...rest
    },
    ref
  ) => {
    const percentage = Math.max(0, Math.min(100, Math.round((current / Math.max(1, total)) * 100)));

    return (
      <div ref={ref} className={cn('w-full space-y-3', className)} {...rest}>
        {showLabel && (
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-clay-muted uppercase tracking-[0.2em]">
              Synthesis Progress: <span className="text-clay-ink">{current}</span> <span className="opacity-40">/</span> {total}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-clay-primary tabular-nums">{percentage}%</span>
            </div>
          </div>
        )}

        <div
          className="relative w-full h-1.5 rounded-full overflow-hidden bg-clay-surface-strong shadow-inner"
          role="progressbar"
          aria-label={ariaLabel}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className={cn('relative h-full rounded-full bg-clay-primary')}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: animated ? 0.8 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            {animated && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </motion.div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;