import React, { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  total: number;
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ current, total, showLabel = true, animated = true, className, ...rest }, ref) => {
    const percentage = Math.round((current / total) * 100);

    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        {showLabel && (
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Phase {current} of {total}
            </p>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              {percentage}% Complete
            </p>
          </div>
        )}
        <div
          className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          <div
            className={cn(
              'h-full bg-emerald-600 rounded-full',
              animated && 'transition-all duration-700 ease-in-out'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
