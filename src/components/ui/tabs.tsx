'use client'

import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

/* =========================================================
   ROOT
========================================================= */

const Tabs =
  TabsPrimitive.Root

/* =========================================================
   LIST
========================================================= */

const TabsList = React.forwardRef<
  React.ElementRef<
    typeof TabsPrimitive.List
  >,
  React.ComponentPropsWithoutRef<
    typeof TabsPrimitive.List
  >
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (

    <TabsPrimitive.List
      ref={ref}
      className={cn(

        `
        inline-flex
        items-center

        rounded-2xl

        border border-black/[0.04]

        bg-clay-surface-soft/80

        p-1

        backdrop-blur-sm
        `,

        className
      )}
      {...props}
    />

  )
)

TabsList.displayName =
  TabsPrimitive.List.displayName

/* =========================================================
   TRIGGER
========================================================= */

const TabsTrigger = React.forwardRef<
  React.ElementRef<
    typeof TabsPrimitive.Trigger
  >,
  React.ComponentPropsWithoutRef<
    typeof TabsPrimitive.Trigger
  >
>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => (

    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(

        `
        group
        relative

        inline-flex
        items-center
        justify-center

        whitespace-nowrap

        rounded-xl

        px-4 py-2.5

        text-[13px]
        font-medium

        tracking-[-0.01em]

        text-clay-muted

        transition-all duration-200

        focus-visible:outline-none

        disabled:pointer-events-none
        disabled:opacity-50

        data-[state=active]:text-clay-ink
        `,

        className
      )}
      {...props}
    >

      {/* ACTIVE SURFACE */}
      <div
        className="
          absolute inset-0

          rounded-xl

          bg-white

          opacity-0

          shadow-[0_2px_10px_rgba(0,0,0,0.04)]

          transition-all duration-200

          group-data-[state=active]:opacity-100
        "
      />

      {/* CONTENT */}
      <span
        className="
          relative z-10
        "
      >
        {children}
      </span>

    </TabsPrimitive.Trigger>

  )
)

TabsTrigger.displayName =
  TabsPrimitive.Trigger.displayName

/* =========================================================
   CONTENT
========================================================= */

const TabsContent = React.forwardRef<
  React.ElementRef<
    typeof TabsPrimitive.Content
  >,
  React.ComponentPropsWithoutRef<
    typeof TabsPrimitive.Content
  >
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => (

    <TabsPrimitive.Content
      ref={ref}
      className={cn(

        `
        mt-6

        focus-visible:outline-none
        `,

        className
      )}
      {...props}
    />

  )
)

TabsContent.displayName =
  TabsPrimitive.Content.displayName

/* =========================================================
   EXPORTS
========================================================= */

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
}