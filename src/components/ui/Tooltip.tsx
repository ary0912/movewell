import React from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  children: React.ReactNode
  label: string
  id?: string
  className?: string
}

export default function Tooltip({ children, label, id, className }: TooltipProps) {
  const tooltipId = id ?? `tooltip-${Math.random().toString(36).slice(2, 9)}`

  return (
    <span className={cn('relative inline-block', className)}>
      <span aria-describedby={tooltipId} tabIndex={0} className="inline-flex items-center">
        {children}
      </span>

      <span role="tooltip" id={tooltipId} className="pointer-events-none absolute z-50 hidden group-hover:block group-focus:block bottom-full mb-2 w-max max-w-xs rounded-md bg-foreground/95 text-background text-xs p-2">
        {label}
      </span>
    </span>
  )
}
