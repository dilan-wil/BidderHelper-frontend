"use client";

import Link from "next/link";
import { Target, Building2, CalendarDays, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "@/components/score-badge";
import { Match } from "@/lib/types";

interface MatchCardProps {
  match: Match;
  index: number;
  delay?: number;
  href?: string;
  onClick?: () => void;
}

export function MatchCard({
  match,
  index,
  delay = 0.07,
  href = "/match/result",
  onClick,
}: MatchCardProps) {
  const getScoreVariant = (
    score: number
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/15";
    if (score >= 60)
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/15";
    return "border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/15";
  };

  const cardContent = (
    <Card
      data-testid={`card-match-${match.id}`}
      className={cn(
        "group cursor-pointer transition-all duration-200",
        "border-white/10 bg-card/30 hover:bg-card/60",
        "hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.07)]"
      )}
      onClick={onClick}
    >
      <CardContent className="">
        <div className="flex items-center justify-between gap-4">
          {/* Left section */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {/* Icon Badge */}
            <Badge
              variant="outline"
              className={cn(
                "h-10 w-10 rounded-lg p-0 flex items-center justify-center shrink-0",
                "border-primary/15 bg-primary/5 transition-colors",
                "group-hover:border-primary/35"
              )}
            >
              <Target
                className={cn(
                  "h-4 w-4 transition-colors",
                  "text-primary/60 group-hover:text-primary"
                )}
              />
            </Badge>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground truncate">
                {match.jobTitle}
              </p>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <Badge
                  variant="secondary"
                  className="gap-1 text-xs font-mono font-normal bg-secondary/50 text-muted-foreground"
                >
                  <Building2 className="h-3 w-3" />
                  {/* {match.company} */}
                </Badge>
                <Badge
                  variant="secondary"
                  className="gap-1 text-xs font-mono font-normal bg-secondary/50 text-muted-foreground"
                >
                  <CalendarDays className="h-3 w-3" />
                  {/* {match.date} */}
                </Badge>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-end gap-1">
              {/* <ScoreBadge score={match.matchedResumes} /> */}
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                Confidence
              </div>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-all",
                "text-muted-foreground",
                "group-hover:text-primary group-hover:translate-x-0.5"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>{href ? <Link href={href}>{cardContent}</Link> : cardContent}</div>
  );
}
