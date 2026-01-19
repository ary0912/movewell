/**
 * Progress Indicator - shows current step in multi-step form
 * Accessible with proper ARIA labels
 */

interface Step {
  id: number
  title: string
  description?: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
}

function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div 
      className="flex items-center justify-between"
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${currentStep + 1} of ${steps.length}`}
    >
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          {/* Step Circle */}
          <div
            className={`
              relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
              transition-all duration-250 shadow-md
              ${
                index <= currentStep
                  ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-400'
              }
            `}
            aria-current={index === currentStep ? 'step' : undefined}
          >
            {index < currentStep ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className={`
                flex-1 h-1.5 mx-sm transition-all duration-250
                ${index < currentStep ? 'bg-gradient-to-r from-primary-600 to-primary-500' : 'bg-slate-200'}
              `}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ProgressIndicator
