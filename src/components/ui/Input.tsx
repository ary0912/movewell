/**
 * Input component - text input field with label
 * Accessible form control with proper associations and focus states
 */

import React, { type InputHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helpText, fullWidth = true, className, id, ...rest },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className={clsx(fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block font-medium text-sm text-slate-700 mb-xs"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-md py-sm',
            'rounded-lg border-2',
            'text-slate-900 placeholder-slate-400',
            'transition-all duration-250',
            'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400',
            'font-medium text-sm',
            error
              ? 'border-danger-400 focus:ring-danger-400 focus:border-danger-400 bg-danger-50'
              : 'border-slate-200 hover:border-slate-300 focus:ring-primary-400',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-xs text-sm text-danger-600">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id={`${inputId}-help`} className="mt-xs text-sm text-slate-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
