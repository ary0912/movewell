"use client";

import * as React from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  change: number;
  changeDescription: string;
  icon: React.ReactNode;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, change, changeDescription, icon, className, ...props }, ref) => {
    
    const isPositive = change >= 0;

    const motionValue = useSpring(0, {
      damping: 80,
      stiffness: 100,
    });

    const displayValue = useTransform(motionValue, (latest) =>
      Math.round(latest)
    );

    React.useEffect(() => {
      const controls = animate(motionValue, value, {
        duration: 1.5,
        ease: "easeOut",
      });
      return controls.stop;
    }, [value, motionValue]);

    return (
      <Card
        ref={ref}
        variant="cream"
        className={cn(
          "relative p-8 group transition-all duration-500",
          className
        )}
        {...props}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-clay-surface-strong opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-3xl" />

        <div className="relative z-10 space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-clay-muted">
                {title}
              </p>
              <div className="flex items-baseline gap-1">
                <motion.h3 className="text-5xl font-bold clay-display text-clay-ink leading-none">
                  {displayValue}
                </motion.h3>
                <span className="text-xl font-bold text-clay-muted">%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-clay-surface-strong flex items-center justify-center text-xl shadow-sm group-hover:bg-clay-primary group-hover:text-white transition-colors duration-500">
              {icon}
            </div>
          </div>

          {/* CHANGE */}
          <div className="flex items-center gap-3 pt-4 border-t border-clay-hairline">
            <div className={cn(
              "px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter",
              isPositive ? "bg-clay-brand-teal/10 text-clay-brand-teal" : "bg-clay-brand-pink/10 text-clay-brand-pink"
            )}>
              {isPositive ? "↗" : "↘"} {Math.abs(change)}%
            </div>
            <p className="text-[11px] font-medium text-clay-muted uppercase tracking-wider">
              Vs {changeDescription}
            </p>
          </div>
        </div>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };