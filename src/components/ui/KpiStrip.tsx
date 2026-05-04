import React from 'react'
import { Card } from './Card'
import { cn } from '@/lib/utils'

type Kpi = { label: string; value: number }

interface KpiStripProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Kpi[]
}

export default function KpiStrip({ items, className, ...rest }: KpiStripProps) {
  return (
    <div className={cn('grid md:grid-cols-3 gap-6', className)} {...rest}>
      {items.map((m) => (
        <Card key={m.label} className="p-6 text-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">{m.label}</p>
          <p className="text-3xl font-semibold text-foreground tabular-nums">{m.value}</p>
          <div className="mt-5 h-[3px] bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-700" style={{ width: `${m.value}%` }} />
          </div>
        </Card>
      ))}
    </div>
  )
}
