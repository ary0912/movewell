/**
 * Step 1: Pain Map - select body areas with pain
 * Visual body diagram for intuitive selection
 */

import type { BodyArea } from '../../types'
import { useAssessment } from '@context/AssessmentContext'
import { BODY_AREAS, BODY_AREA_LABELS } from '@utils/constants'
import Card from '@components/ui/Card'

function StepPainMap() {
  const { formData, setPainAreas } = useAssessment()

  const togglePainArea = (area: BodyArea) => {
    const newAreas = formData.painAreas.includes(area)
      ? formData.painAreas.filter((a) => a !== area)
      : [...formData.painAreas, area]
    setPainAreas(newAreas)
  }

  return (
    <div>
      <p className="text-slate-600 mb-lg">
        Click on the body areas where you experience pain. You can select multiple areas.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-md">
        {BODY_AREAS.map((area) => (
          <button
            key={area}
            onClick={() => togglePainArea(area as BodyArea)}
            className={`
              p-md rounded-lg border-2 transition-colors duration-250
              text-left font-medium text-sm
              ${
                formData.painAreas.includes(area as BodyArea)
                  ? 'bg-primary-50 border-primary-600 text-primary-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
            `}
            aria-pressed={formData.painAreas.includes(area as BodyArea)}
          >
            {BODY_AREA_LABELS[area]}
          </button>
        ))}
      </div>

      {formData.painAreas.length === 0 && (
        <Card className="mt-lg bg-slate-50 border-slate-300">
          <p className="text-slate-600 text-sm">
            👉 Select at least one area to continue
          </p>
        </Card>
      )}

      {formData.painAreas.length > 0 && (
        <Card className="mt-lg bg-primary-50 border-primary-200">
          <p className="text-primary-900 text-sm">
            ✓ You've selected <strong>{formData.painAreas.length}</strong> area(s): {' '}
            {formData.painAreas.map((a) => BODY_AREA_LABELS[a]).join(', ')}
          </p>
        </Card>
      )}
    </div>
  )
}

export default StepPainMap
