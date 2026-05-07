import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, id, error, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    return (
      <div className={cn("w-full space-y-2", className)}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-[10px] font-bold text-clay-muted uppercase tracking-[0.2em]"
          >
            {label}
          </label>
        )}

        <div className="relative group">
          <input
            id={inputId}
            ref={ref}
            type={type}
            aria-invalid={!!error}
            className={cn(
              "flex h-14 w-full rounded-md border bg-clay-surface-soft px-5 py-4 text-sm font-medium text-clay-ink",
              "ring-offset-white placeholder:text-clay-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary/20",
              "disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
              error ? "border-clay-brand-pink" : "border-clay-hairline group-hover:border-clay-muted",
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-clay-brand-pink" />
          )}
        </div>

        {error && typeof error === "string" && (
          <p className="text-[11px] font-bold text-clay-brand-pink uppercase tracking-wider" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
