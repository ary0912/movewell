import React from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  children: React.ReactNode
  content: string
  id?: string
  className?: string
}

export default function Tooltip({ children, content, id, className }: TooltipProps) {
  const tooltipId = id ?? `tooltip-${Math.random().toString(36).slice(2, 9)}`

  return (
    <span className={cn('relative inline-block group', className)}>
      <span aria-describedby={tooltipId} tabIndex={0} className="inline-flex items-center">
        {children}
      </span>

      <span 
        role="tooltip" 
        id={tooltipId} 
        className="
          pointer-events-none absolute z-50 
          opacity-0 group-hover:opacity-100 group-focus:opacity-100 
          bottom-full left-1/2 -translate-x-1/2 mb-3 
          w-max max-w-xs rounded-sm 
          bg-clay-ink text-white text-[10px] font-bold uppercase tracking-widest 
          px-3 py-1.5 shadow-2xl transition-all duration-300
        "
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-clay-ink" />
      </span>
    </span>
  )
}
