import { cn } from '@/lib/utils'

interface Kpi {
  id: string
  label: string
  value: string | number
  delta?: string
}

interface KpiStripProps {
  items: Kpi[]
  className?: string
}

export default function KpiStrip({ items, className }: KpiStripProps) {
  return (
    <div className={cn('flex gap-4 items-stretch', className)}>
      {items.map((k) => (
        <div key={k.id} className="flex-1 bg-card border border-border rounded-md p-3">
          <div className="text-xs text-muted-foreground">{k.label}</div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-xl font-semibold text-foreground tabular-nums">{k.value}</div>
            {k.delta && <div className="text-sm text-muted-foreground">{k.delta}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
