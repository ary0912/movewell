/**
 * Slider component - for numeric input in a range
 * Fully accessible with ARIA labels and keyboard support
 */

import React, { type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  unit?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      min = 0,
      max = 10,
      step = 1,
      showValue = true,
      unit = '',
      value = 0,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-sm">
            <label className="font-medium text-sm text-slate-700">
              {label}
            </label>
            {showValue && (
              <span
                className="text-lg font-semibold text-primary-600"
                aria-live="polite"
                aria-atomic="true"
              >
                {value}{unit}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={clsx(
            'w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer',
            'accent-primary-600',
            className
          )}
          {...rest}
        />
        <div className="flex justify-between text-xs text-slate-500 mt-sm">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
