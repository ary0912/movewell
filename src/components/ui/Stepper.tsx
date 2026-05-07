import { cn } from '@/lib/utils'

interface StepperProps {
  steps: string[]
  current: number
  onSelect?: (index: number) => void
}

export function Stepper({ steps, current, onSelect }: StepperProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <div aria-live="polite" className="sr-only">
        Step {current + 1} of {steps.length}: {steps[current]}
      </div>
      <ol className="flex items-center justify-center gap-4">
        {steps.map((label, i) => {
          const isActive = i === current
          const isDone = i < current

          return (
            <li key={label} className="flex items-center">
              <button
                onClick={() => onSelect && onSelect(i)}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-md text-sm font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary/20 cursor-pointer',
                  isDone ? 'bg-clay-primary text-white' 
                    : isActive ? 'bg-clay-primary text-white shadow-xl scale-110' 
                    : 'bg-clay-surface-soft text-clay-muted border border-clay-hairline hover:border-clay-muted'
                )}
              >
                {i + 1}
              </button>

              {i < steps.length - 1 && (
                <div className={cn(
                  "w-10 h-[2px] mx-1 transition-colors duration-500",
                  isDone ? "bg-clay-primary" : "bg-clay-hairline"
                )} aria-hidden />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Stepper
