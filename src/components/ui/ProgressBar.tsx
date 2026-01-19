/**
 * ProgressBar component - visual indicator of progress
 * Used in multi-step forms and data visualization
 */

import React, { type HTMLAttributes } from 'react';
import clsx from 'clsx';

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
      <div ref={ref} className={clsx('w-full', className)} {...rest}>
        {showLabel && (
          <div className="flex justify-between items-center mb-md">
            <p className="text-sm font-medium text-slate-700">
              Step {current} of {total}
            </p>
            <p className="text-sm font-semibold text-primary-600">
              {percentage}%
            </p>
          </div>
        )}
        <div
          className="w-full h-2 bg-slate-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Progress: Step ${current} of ${total}`}
        >
          <div
            className={clsx(
              'h-full bg-primary-600 rounded-full',
              animated && 'transition-all duration-500'
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
