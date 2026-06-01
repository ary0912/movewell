'use client'

import * as React from 'react'

import Slider from './Slider'

export interface AssessmentSliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Slider>, 'label'> {
  title: string
  description?: string
  valueLabel?: string
  valueSuffix?: string
}

function AssessmentSlider({
  title,
  description,
  valueLabel,
  valueSuffix,
  showValue = false,
  helperText,
  ...props
}: AssessmentSliderProps) {
  const sliderId = React.useId()
  const titleId = `${sliderId}-title`
  const descriptionId = description ? `${sliderId}-description` : undefined
  const helperId = helperText ? `${sliderId}-helper` : undefined

  const describedBy = [descriptionId, helperId]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div
            id={titleId}
            className="text-[13px] font-semibold tracking-[-0.01em] text-clay-ink"
          >
            {title}
          </div>
          {description && (
            <p
              id={descriptionId}
              className="max-w-2xl text-[13px] leading-[1.7] text-clay-muted"
            >
              {description}
            </p>
          )}
        </div>

        {valueLabel !== undefined && (
          <div className="rounded-full border border-clay-hairline bg-clay-surface-soft px-4 py-2 text-[13px] font-semibold text-clay-ink">
            {valueLabel}
            {valueSuffix}
          </div>
        )}
      </div>

      <Slider
        id={sliderId}
        aria-labelledby={titleId}
        aria-describedby={describedBy}
        showValue={showValue}
        helperText={helperText}
        {...props}
      />
    </div>
  )
}

export default AssessmentSlider
