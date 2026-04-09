"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function ScoreBadge({
  score,
  size = "md",
  showLabel = false,
  variant = "default",
}: ScoreBadgeProps) {
  const getScoreVariant = (
    score: number
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Work";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/15";
    if (score >= 60)
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/15";
    return "border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/15";
  };

  const sizes = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <Badge
      variant={variant === "default" ? getScoreVariant(score) : variant}
      className={cn(
        "font-mono font-bold text-sm px-2.5 py-3 rounded-none",
        getScoreColor(score)
      )}
    >
      {score}%
    </Badge>
  );
}
