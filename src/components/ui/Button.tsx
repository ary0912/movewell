import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Motion helper (use the motion object directly to preserve types)
const Motion = motion

/* =========================
   VARIANTS
   ========================= */
const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2
  whitespace-nowrap text-sm font-medium
  transition-all duration-300 ease-out
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
  disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {

        /* primary */
        primary: `
          bg-primary text-primary-foreground rounded-lg px-lg py-sm
          shadow-[0_8px_20px_rgba(2,6,23,0.08)]
          hover:shadow-[0_12px_30px_rgba(2,6,23,0.1)]
        `,

        /* secondary */
        secondary: `
          bg-card text-foreground border border-border rounded-lg px-lg py-sm
          hover:bg-muted
        `,

        clinical: `
          bg-foreground text-background rounded-lg px-lg py-sm
          shadow-[0_8px_24px_rgba(0,0,0,0.08)]
        `,

        rich: `relative overflow-hidden text-left w-full rounded-lg p-md
          bg-card border border-border shadow-[0_10px_30px_rgba(2,6,23,0.04)]
          hover:shadow-[0_20px_50px_rgba(2,6,23,0.06)]
        `,
      },

      size: {
        default: "",
        sm: "text-xs px-md py-sm",
        lg: "text-md px-xl py-md",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

/* =========================
   PROPS
   ========================= */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean

  /* NEW */
  icon?: React.ReactNode
  subtitle?: string
}

/* =========================
   COMPONENT
   ========================= */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      icon,
      subtitle,
      children,
      ...props
    },
    ref
  ) => {
    const Comp: React.ElementType = asChild ? Slot : Motion.button

    // Filter out native HTML drag/animation handlers to avoid conflicting framer-motion types
    const { onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDragOver: _onDragOver, onDrop: _onDrop, onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration, ...htmlProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>

    if (variant === "rich") {
      return (
        <Comp
          ref={ref}
          type={htmlProps.type ?? "button"}
          aria-busy={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn("group", buttonVariants({ variant, size }), className)}
          {...htmlProps}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4 w-full">
            {icon && (
              <div className="p-3 rounded-lg bg-primary/10 text-primary transition-all">
                {icon}
              </div>
            )}

            <div className="flex-1 text-left">
              <p className="text-foreground font-semibold text-base">{children}</p>
              {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
            </div>

            <div className="text-muted-foreground transition-all">→</div>
          </div>
        </Comp>
      )
    }

    return (
      <Motion.button
        ref={ref}
        type={htmlProps.type ?? "button"}
        aria-busy={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={htmlProps.disabled || isLoading}
        {...htmlProps}
      >
        {isLoading ? (
          <div className="flex items-center gap-2" aria-hidden>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="sr-only">Loading</span>
          </div>
        ) : (
          children
        )}
      </Motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button }