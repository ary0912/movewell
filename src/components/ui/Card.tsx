'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Motion = motion

/* =========================
   BASE CARD (UNCHANGED CORE)
   ========================= */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Filter out native HTML drag/animation handlers to avoid conflicting framer-motion types
  // Remove native drag/animation event handlers to avoid Framer Motion type conflicts
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...rest
  } = props as React.HTMLAttributes<HTMLDivElement>

  return (
    <Motion.div
      ref={ref}
      role="group"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "rounded-lg p-lg md:p-xl",
        "bg-card border border-border",
        "shadow-[0_6px_20px_rgba(2,6,23,0.06)]",
        "transition-all duration-300",
        className
      )}
      {...rest}
    />
  )
})
Card.displayName = "Card"

/* =========================
   PREMIUM INTERACTIVE CARD
   ========================= */
interface Card3DProps {
  title: string
  description: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

const Card3D = ({
  title,
  description,
  icon,
  onClick,
  className,
}: Card3DProps) => {
  const [hovered, setHovered] = React.useState(false)

    return (
    <Motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      type="button"
      aria-label={title}
      className={cn(
          "group w-full text-left cursor-pointer rounded-lg p-lg",
          "bg-card border border-border",
          "transition-all duration-300",
          "shadow-sm hover:shadow-xl",
          className
        )}
      animate={{ y: hovered ? -6 : 0, scale: hovered ? 1.02 : 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {icon && <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{icon}</div>}

        <h3 className="text-lg font-semibold text-foreground">{title}</h3>

        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        {onClick && <div className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all">Explore →</div>}
      </div>
    </Motion.button>
  )
}

/* =========================
   SUB COMPONENTS (UNCHANGED)
   ========================= */
interface CardSubProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CardHeader = ({ className, ...props }: CardSubProps) => (
  <div className={cn("mb-6 space-y-1.5", className)} {...props} />
)

const CardTitle = ({ className, ...props }: CardSubProps) => (
  <h3 className={cn("text-xl font-semibold text-slate-900", className)} {...props} />
)

const CardDescription = ({ className, ...props }: CardSubProps) => (
  <p className={cn("text-sm text-slate-500", className)} {...props} />
)

const CardContent = ({ className, ...props }: CardSubProps) => (
  <div className={cn("", className)} {...props} />
)

const CardFooter = ({ className, ...props }: CardSubProps) => (
  <div className={cn("pt-4", className)} {...props} />
)

/* =========================
   EXPORTS
   ========================= */
export {
  Card,
  Card3D,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
}