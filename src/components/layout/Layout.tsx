"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div className={cn("w-full px-4 sm:px-6 lg:px-8", className)} {...rest}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  )
}

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="py-8">
        <Container>{children}</Container>
      </main>
    </div>
  )
}

export default MainLayout
