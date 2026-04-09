"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: "default" | "primary" | "purple" | "highlight";
  valueClassName?: string;
  children?: ReactNode;
}

export function MetricCard({
  title,
  value,
  icon,
  variant = "default",
  valueClassName,
  children,
}: MetricCardProps) {
  const getIconStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary/20 text-primary drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]";
      case "purple":
        return "bg-purple-500/10 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]";
      case "highlight":
        return "bg-primary/20 text-primary drop-shadow-[0_0_10px_rgba(0,217,255,1)]";
      default:
        return "bg-white/5 text-muted-foreground border border-white/10";
    }
  };

  const getValueStyles = () => {
    switch (variant) {
      case "highlight":
        return "text-primary drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]";
      default:
        return "text-white";
    }
  };

  return (
    <div
      className={cn(
        "glow-card bg-card/40 backdrop-blur-md rounded-xl p-6 flex flex-col",
        variant === "highlight" && "border-primary/30 relative overflow-hidden"
      )}
    >
      {variant === "highlight" && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
      )}

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div
          className={cn(
            "h-8 w-8 rounded flex items-center justify-center",
            getIconStyles()
          )}
        >
          {icon}
        </div>
      </div>

      <div
        className={cn(
          "text-3xl font-black font-mono mt-auto relative z-10",
          getValueStyles(),
          valueClassName
        )}
      >
        {value}
      </div>

      {children}
    </div>
  );
}
