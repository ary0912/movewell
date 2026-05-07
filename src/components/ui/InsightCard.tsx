'use client'

import React from 'react'

import { motion } from 'framer-motion'

import { Card } from './Card'
import { Button } from './Button'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface InsightCardProps
  extends React.HTMLAttributes<HTMLDivElement> {

  title?: string

  description?: string

  body?: string

  actionLabel?: string

  onAction?: () => void

  icon?: React.ReactNode

  variant?:
  | 'ochre'
  | 'teal'
  | 'peach'
  | 'lavender'
  | 'cream'

  badge?: string

  meta?: string
}

/* =========================================================
   COMPONENT
========================================================= */

export default function InsightCard({
  title,

  description,
  body,

  actionLabel = 'View insights',

  onAction,

  icon,

  variant = 'ochre',

  badge,
  meta,

  className,

  ...rest
}: InsightCardProps) {

  const content =
    description ?? body ?? ''

  const isLightVariant =
    variant === 'cream' ||
    variant === 'lavender' ||
    variant === 'ochre' ||
    variant === 'peach'

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
    >

      <Card
        variant={variant}
        className={cn(

          `
          relative

          overflow-hidden

          p-6 md:p-7
          `,

          className
        )}
        {...rest}
      >

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            relative z-10

            flex flex-col

            gap-8
          "
        >

          {/* =============================================
              TOP
          ============================================= */}

          <div
            className="
              flex items-start
              justify-between
              gap-6
            "
          >

            {/* LEFT */}
            <div
              className="
                flex items-start
                gap-4
              "
            >

              {/* ICON */}
              {icon && (
                <div
                  className={cn(
                    `
                    flex h-11 w-11 shrink-0
                    items-center justify-center

                    rounded-2xl

                    border
                    `,

                    isLightVariant
                      ? `
                        border-black/5
                        bg-white/60
                        `
                      : `
                        border-white/10
                        bg-white/10
                        `
                  )}
                >
                  {icon}
                </div>
              )}

              {/* TEXT */}
              <div className="space-y-3">

                {/* META */}
                {(badge || meta) && (
                  <div
                    className="
                      flex flex-wrap
                      items-center
                      gap-2
                    "
                  >

                    {badge && (
                      <div
                        className={cn(
                          `
                          rounded-full

                          px-2.5 py-1

                          text-[11px]
                          font-medium

                          tracking-[0.02em]
                          `,
                          isLightVariant
                            ? `
                              bg-black/5
                              text-clay-muted
                              `
                            : `
                              bg-white/10
                              text-white/80
                              `
                        )}
                      >
                        {badge}
                      </div>
                    )}

                    {meta && (
                      <span
                        className={cn(
                          `
                          text-[12px]
                          `,
                          isLightVariant
                            ? 'text-clay-muted'
                            : 'text-white/70'
                        )}
                      >
                        {meta}
                      </span>
                    )}

                  </div>
                )}

                {/* TITLE */}
                {title && (
                  <h3
                    className={cn(
                      `
                      text-[24px]
                      font-semibold

                      leading-[1.08]
                      tracking-[-0.03em]
                      `,
                      isLightVariant
                        ? 'text-clay-ink'
                        : 'text-white'
                    )}
                  >
                    {title}
                  </h3>
                )}

                {/* DESCRIPTION */}
                <p
                  className={cn(
                    `
                    max-w-2xl

                    text-[15px]
                    leading-[1.75]
                    `,
                    isLightVariant
                      ? 'text-clay-body'
                      : 'text-white/80'
                  )}
                >
                  {content}
                </p>

              </div>

            </div>

            {/* CTA */}
            {onAction && (
              <div className="shrink-0">

                <Button
                  variant={
                    isLightVariant
                      ? 'primary'
                      : 'onColor'
                  }
                  onClick={onAction}
                  className="
                    h-11

                    whitespace-nowrap

                    px-5
                  "
                >
                  {actionLabel}
                </Button>

              </div>
            )}

          </div>

        </div>

      </Card>

    </motion.div>
  )
}