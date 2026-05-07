'use client'

import React from 'react'

import { motion } from 'framer-motion'

import { Card } from './Card'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

type KpiItem = {
  label: string

  value: number | string

  suffix?: string

  meta?: string

  trend?: 'up' | 'down' | 'neutral'
}

interface KpiStripProps
  extends React.HTMLAttributes<HTMLDivElement> {

  items: KpiItem[]
}

/* =========================================================
   HELPERS
========================================================= */

function TrendIndicator({
  trend,
}: {
  trend?: KpiItem['trend']
}) {

  if (!trend || trend === 'neutral') {
    return null
  }

  return (
    <div
      className={cn(
        `
        flex items-center gap-1

        rounded-full

        px-2 py-1

        text-[11px]
        font-medium
        `,
        trend === 'up'
          ? `
            bg-emerald-500/10
            text-emerald-600
            `
          : `
            bg-amber-500/10
            text-amber-600
            `
      )}
    >

      <span aria-hidden="true">
        {trend === 'up' ? '↑' : '↓'}
      </span>

      <span>
        {trend === 'up'
          ? 'Improving'
          : 'Declining'}
      </span>

    </div>
  )
}

/* =========================================================
   COMPONENT
========================================================= */

export default function KpiStrip({
  items,
  className,
  ...rest
}: KpiStripProps) {

  return (
    <div
      className={cn(

        `
        grid gap-5

        md:grid-cols-3
        `,

        className
      )}
      {...rest}
    >

      {items.map((item, index) => (

        <motion.div
          key={item.label}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.06,
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <Card
            variant="cream"
            hover
            className="
              h-full

              p-6
            "
          >

            <div
              className="
                flex h-full flex-col
                justify-between
              "
            >

              {/* =========================================
                  TOP
              ========================================= */}

              <div
                className="
                  flex items-start
                  justify-between
                  gap-4
                "
              >

                <div>

                  <p
                    className="
                      text-[12px]
                      font-medium

                      tracking-[0.01em]

                      text-clay-muted
                    "
                  >
                    {item.label}
                  </p>

                </div>

                <TrendIndicator
                  trend={item.trend}
                />

              </div>

              {/* =========================================
                  VALUE
              ========================================= */}

              <div className="mt-8">

                <div
                  className="
                    flex items-end
                    gap-1
                  "
                >

                  <div
                    className="
                      text-[34px]
                      font-semibold

                      leading-none
                      tracking-[-0.05em]

                      text-clay-ink

                      tabular-nums
                    "
                  >
                    {item.value}
                  </div>

                  {item.suffix && (
                    <div
                      className="
                        mb-1

                        text-[14px]
                        font-medium

                        text-clay-muted
                      "
                    >
                      {item.suffix}
                    </div>
                  )}

                </div>

                {/* =====================================
                    META
                ===================================== */}

                {item.meta && (
                  <p
                    className="
                      mt-3

                      text-[13px]
                      leading-[1.6]

                      text-clay-body
                    "
                  >
                    {item.meta}
                  </p>
                )}

              </div>

            </div>

          </Card>

        </motion.div>

      ))}

    </div>
  )
}