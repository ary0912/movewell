'use client';

import React from 'react';
import clsx from 'clsx';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
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
    const numeric = Number(value ?? min)
    const percentage = Math.max(0, Math.min(100, ((numeric - min) / Math.max(1, max - min)) * 100))

    return (
      <div className="w-full space-y-md">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            {showValue && <div className="text-sm font-semibold text-primary tabular-nums">{numeric}{unit}</div>}
          </div>
        )}

        <div className="relative">
          <div className="h-2 w-full rounded-full bg-muted" aria-hidden />

          <div className="absolute top-0 h-2 rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-300" style={{ width: `${percentage}%` }} />

          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={numeric}
            aria-valuetext={`${numeric}${unit}`}
            className={clsx(
              "absolute top-0 w-full h-2 appearance-none bg-transparent cursor-pointer",
              "focus:outline-none",
              className
            )}
            {...rest}
          />

          <style>{`
            input[type='range']::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; border-radius: 9999px; background: white; border: 2px solid rgba(2,6,23,0.06); box-shadow: 0 4px 12px rgba(2,6,23,0.06); transition: transform 0.2s ease, box-shadow 0.2s ease; }
            input[type='range']::-webkit-slider-thumb:hover { transform: scale(1.06); box-shadow: 0 6px 18px rgba(2,6,23,0.08); }
            input[type='range']::-webkit-slider-thumb:active { transform: scale(0.96); }
            input[type='range']::-moz-range-thumb { width: 18px; height: 18px; border-radius: 9999px; background: white; border: 2px solid rgba(2,6,23,0.06); box-shadow: 0 4px 12px rgba(2,6,23,0.06); }
          `}</style>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider';

export default Slider;