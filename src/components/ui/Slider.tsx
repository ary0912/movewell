'use client';

import React from 'react';
import { cn } from '@/lib/utils';

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
      <div className={cn("w-full space-y-4", className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && <label className="text-[10px] font-bold text-clay-muted uppercase tracking-[0.2em]">{label}</label>}
            {showValue && <div className="text-sm font-black text-clay-primary tabular-nums">{numeric}{unit}</div>}
          </div>
        )}

        <div className="relative h-6 flex items-center group">
          {/* TRACK BACKGROUND */}
          <div className="h-1.5 w-full rounded-full bg-clay-surface-strong shadow-inner" aria-hidden />

          {/* FILL TRACK */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-clay-primary transition-all duration-300" 
            style={{ width: `${percentage}%` }} 
          />

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
            className={cn(
              "absolute top-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10",
              "focus:outline-none"
            )}
            {...rest}
          />

          <style>{`
            input[type='range']::-webkit-slider-thumb { 
              appearance: none; 
              width: 24px; 
              height: 24px; 
              border-radius: 6px; 
              background: white; 
              border: 1px solid #e0e0e0; 
              box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); 
              transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
            }
            input[type='range']::-webkit-slider-thumb:hover { 
              transform: scale(1.1); 
              box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); 
            }
            input[type='range']::-webkit-slider-thumb:active { 
              transform: scale(0.95); 
            }
            input[type='range']::-moz-range-thumb { 
              width: 24px; 
              height: 24px; 
              border-radius: 6px; 
              background: white; 
              border: 1px solid #e0e0e0; 
              box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); 
            }
          `}</style>
        </div>

        <div className="flex justify-between text-[10px] font-bold text-clay-muted uppercase tracking-widest">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider';

export default Slider;