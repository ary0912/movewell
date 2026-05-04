// React import not required with `jsx: react-jsx`
import { cn } from '@/lib/utils'

interface StepperProps {
  steps: string[]
  current: number
  onSelect?: (index: number) => void
}

export function Stepper({ steps, current, onSelect }: StepperProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center gap-3">
        {steps.map((label, i) => {
          const isActive = i === current
          const isDone = i < current

          return (
            <li key={label} className="flex items-center">
              <button
                onClick={() => onSelect && onSelect(i)}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                  isDone ? 'bg-primary text-primary-foreground' : isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                )}
              >
                {i + 1}
              </button>

              {i < steps.length - 1 && (
                <div className="w-8 h-[2px] bg-muted ml-3 mr-3" aria-hidden />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Stepper
