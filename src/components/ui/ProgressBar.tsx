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
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Step {current} of {total}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary tabular-nums">{percentage}%</span>
              <span className="text-xs text-muted-foreground">Complete</span>
            </div>
          </div>
        )}

        <div
          className="relative w-full h-3 rounded-full overflow-hidden bg-muted"
          role="progressbar"
          aria-label={ariaLabel}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-emerald-400/10" />

          <motion.div
            className={cn('relative h-full rounded-full bg-gradient-to-r from-primary via-primary to-emerald-400')}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: animated ? 0.3 : 0, ease: 'easeOut' }}
          >
            {animated && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-[-40%] w-[40%] h-full bg-white/20 blur-sm animate-shimmer" />
              </div>
            )}
          </motion.div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Start</span>
          <span>Finish</span>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;