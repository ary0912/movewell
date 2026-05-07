'use client'

import React from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import { motion } from "framer-motion"

interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  body?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  variant?: "ochre" | "teal" | "peach" | "lavender" | "cream"
}

export default function InsightCard({
  title,
  description,
  body,
  actionLabel = 'Execute Protocol',
  onAction,
  icon,
  variant = "ochre",
  className,
  ...rest
}: InsightCardProps) {

  const content = description ?? body ?? ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        variant={variant}
        className={cn(
          "relative overflow-hidden p-8 group transition-all duration-500",
          className
        )}
        {...rest}
      >
        {/* TOP DECORATIVE ELEMENT */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:bg-white/10 transition-all duration-700" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* LEFT CONTENT */}
          <div className="flex items-start gap-6 max-w-2xl">

            {icon && (
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-sm">
                {icon}
              </div>
            )}

            <div className="space-y-3">
              {title && (
                <h3 className={cn(
                  "text-2xl font-bold tracking-tight",
                  variant === "cream" ? "text-clay-ink" : "text-white"
                )}>
                  {title}
                </h3>
              )}

              <p className={cn(
                "text-sm font-medium leading-relaxed max-w-xl",
                variant === "cream" ? "text-clay-body" : "text-white/80"
              )}>
                {content}
              </p>
            </div>

          </div>

          {/* CTA */}
          {onAction && (
            <div className="flex-shrink-0 pt-4 md:pt-0">
              <Button
                variant={variant === "cream" ? "primary" : "onColor"}
                onClick={onAction}
                className="whitespace-nowrap px-8 h-12 shadow-lg group-hover:scale-105 transition-transform"
              >
                {actionLabel}
              </Button>
            </div>
          )}

        </div>

      </Card>
    </motion.div>
  )
}