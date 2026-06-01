'use client'

import * as React from 'react'

import { Card } from './Card'
import { cn } from '@/lib/utils'

export interface AssessmentCardProps
  extends React.ComponentPropsWithoutRef<typeof Card> {
  categoryLabel: string
  title: string
  statusLabel?: string
  statusTone?: string
  icon?: React.ElementType
  iconAccent?: string
  glowClass?: string
  score?: number | string
  scoreSuffix?: string
  scoreDescription?: string
}

function AssessmentCard({
  categoryLabel,
  title,
  statusLabel,
  statusTone,
  icon: Icon,
  iconAccent,
  glowClass,
  score,
  scoreSuffix,
  scoreDescription,
  className,
  children,
  ...props
}: AssessmentCardProps) {
  return (
    <Card
      hover={false}
      variant="cream"
      className={cn(
        `
          relative overflow-hidden
          rounded-[28px]
          border border-clay-hairline/60
          bg-white/[0.78]
          px-6 py-6
          backdrop-blur-xl
          transition-all duration-300
          hover:border-black/5
          hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]
        `,
        className
      )}
      {...props}
    >
      {glowClass && (
        <div
          className={cn(
            `
              absolute inset-0
              bg-gradient-to-br
              opacity-70
            `,
            glowClass
          )}
        />
      )}

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            {Icon && (
              <div className={cn(
                `
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-[16px]
                `,
                iconAccent
              )}>
                <Icon size={18} />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-clay-muted">
                  {categoryLabel}
                </span>
                {statusLabel && (
                  <span className={cn(
                    `
                      rounded-full
                      px-2.5 py-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    `,
                    statusTone
                  )}>
                    {statusLabel}
                  </span>
                )}
              </div>

              <h3 className="text-[1.15rem] leading-[1.35] tracking-[-0.03em] text-clay-ink">
                {title}
              </h3>
            </div>
          </div>

          {score !== undefined && (
            <div className="flex flex-col items-end gap-2">
              <div className="rounded-[16px] border border-clay-hairline bg-clay-canvas px-4 py-3 text-right">
                <div className="text-[1.35rem] leading-none tracking-[-0.05em] text-clay-ink clay-display">
                  {score}
                </div>
                {scoreSuffix && (
                  <div className="text-[10px] font-medium text-clay-muted">
                    {scoreSuffix}
                  </div>
                )}
              </div>

              {scoreDescription && (
                <div className="text-[12px] text-clay-muted leading-[1.5]">
                  {scoreDescription}
                </div>
              )}
            </div>
          )}
        </div>

        {children}
      </div>
    </Card>
  )
}

export default AssessmentCard
