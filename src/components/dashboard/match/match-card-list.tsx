"use client";

import { Match, MatchCard } from "./match-card";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox } from "lucide-react";

interface MatchCardListProps {
  matches: Match[];
  href?: string;
  onCardClick?: (match: Match) => void;
  delayPerCard?: number;
  isLoading?: boolean;
}

export function MatchCardList({
  matches,
  href,
  onCardClick,
  delayPerCard = 0.07,
  isLoading = false,
}: MatchCardListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <Card className="border-white/10 bg-card/30">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Inbox className="h-6 w-6 text-primary/60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No matches found
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload resumes and run the match engine to see results here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((match, index) => (
        <MatchCard
          key={match.id}
          match={match}
          index={index}
          delay={delayPerCard}
          href={href}
          onClick={() => onCardClick?.(match)}
        />
      ))}
    </div>
  );
}

// Skeleton Component
function MatchCardSkeleton() {
  return (
    <Card className="border-white/10 bg-card/30 animate-pulse">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-10 w-10 rounded-lg bg-primary/10" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-48 bg-primary/10 rounded" />
              <div className="flex gap-3">
                <div className="h-5 w-24 bg-primary/10 rounded" />
                <div className="h-5 w-20 bg-primary/10 rounded" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-16 bg-primary/10 rounded-full" />
            <div className="h-4 w-4 bg-primary/10 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
