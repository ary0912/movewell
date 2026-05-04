import { Card } from './Card'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface InsightCardProps {
  title: string
  body: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export default function InsightCard({ title, body, actionLabel = 'Take action', onAction, className }: InsightCardProps) {
  return (
    <Card className={cn('p-6 md:p-8', className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-prose">{body}</p>
        </div>

        {onAction && (
          <div>
            <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
          </div>
        )}
      </div>
    </Card>
  )
}
