'use client'

import * as React from 'react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface TooltipProps {
  children: React.ReactNode

  content: string

  className?: string
}

/* =========================================================
   COMPONENT
========================================================= */

export default function Tooltip({
  children,
  content,
  className,
}: TooltipProps) {

  const [visible, setVisible] =
    React.useState(false)

  const tooltipId =
    React.useId()

  return (
    <span
      className={cn(

        `
        relative
        inline-flex
        `,

        className
      )}
      onMouseEnter={() =>
        setVisible(true)
      }
      onMouseLeave={() =>
        setVisible(false)
      }
      onFocus={() =>
        setVisible(true)
      }
      onBlur={() =>
        setVisible(false)
      }
    >

      {/* =============================================
          TRIGGER
      ============================================= */}

      <span
        aria-describedby={
          visible
            ? tooltipId
            : undefined
        }
        tabIndex={0}
        className="
          inline-flex
          items-center
        "
      >
        {children}
      </span>

      {/* =============================================
          TOOLTIP
      ============================================= */}

      <AnimatePresence>

        {visible && (
          <motion.span
            role="tooltip"
            id={tooltipId}
            initial={{
              opacity: 0,
              y: 4,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 2,
              scale: 0.98,
            }}
            transition={{
              duration: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              pointer-events-none

              absolute bottom-[calc(100%+10px)]
              left-1/2 z-50

              w-max max-w-[220px]

              -translate-x-1/2

              rounded-xl

              border border-white/[0.06]

              bg-[#1C1C1C]/96

              px-3 py-2

              text-[12px]
              font-medium

              leading-[1.45]

              tracking-[-0.01em]

              text-white/90

              shadow-[0_8px_30px_rgba(0,0,0,0.18)]

              backdrop-blur-xl
            "
          >
            {content}
          </motion.span>
        )}

      </AnimatePresence>

    </span>
  )
}