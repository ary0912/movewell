"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div className={cn("w-full px-6 sm:px-8 lg:px-12", className)} {...rest}>
      <div className="mx-auto max-w-[1100px]">{children}</div>
    </div>
  )
}

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-clay-canvas text-clay-ink antialiased">
      <main className="py-12 md:py-16">
        <Container>{children}</Container>
      </main>
    </div>
  )
}

export default MainLayout
