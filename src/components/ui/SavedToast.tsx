'use client'

import {
  useEffect,
  useState,
} from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Check } from 'lucide-react'

import { useAssessment } from '@/context/AssessmentContext'

/* =========================================================
   COMPONENT
========================================================= */

export default function SavedToast() {

  const { lastSavedAt } =
    useAssessment()

  const [visible, setVisible] =
    useState(false)

  /* =====================================================
     VISIBILITY
  ===================================================== */

  useEffect(() => {

    if (!lastSavedAt) {
      return
    }

    setVisible(true)

    const timeout =
      setTimeout(() => {
        setVisible(false)
      }, 2200)

    return () =>
      clearTimeout(timeout)

  }, [lastSavedAt])

  return (
    <AnimatePresence>

      {visible && lastSavedAt && (

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 6,
            scale: 0.98,
          }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-live="polite"
          className="
            fixed bottom-5 right-5 z-[120]

            flex items-center gap-3

            rounded-2xl

            border border-black/[0.05]

            bg-white/92

            px-4 py-3

            shadow-[0_8px_30px_rgba(0,0,0,0.06)]

            backdrop-blur-xl
          "
        >

          {/* STATUS ICON */}
          <div
            className="
              flex h-7 w-7
              items-center justify-center

              rounded-full

              bg-emerald-500/10

              text-emerald-600
            "
          >

            <Check size={14} />

          </div>

          {/* CONTENT */}
          <div
            className="
              flex flex-col
            "
          >

            <span
              className="
                text-[13px]
                font-medium

                tracking-[-0.01em]

                text-clay-ink
              "
            >
              Progress saved
            </span>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  )
}