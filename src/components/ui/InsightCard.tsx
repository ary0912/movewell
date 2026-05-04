import React from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  body?: string
  actionLabel?: string
  onAction?: () => void
}

export default function InsightCard({ title, description, body, actionLabel = 'Take action', onAction, className, ...rest }: InsightCardProps) {
  const content = description ?? body ?? ''

  return (
    <Card className={cn('p-6 md:p-8', className)} {...rest}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          <p className="text-sm text-muted-foreground mt-2 max-w-prose">{content}</p>
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
