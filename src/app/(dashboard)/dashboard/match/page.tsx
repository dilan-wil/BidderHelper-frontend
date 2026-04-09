"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Target, Loader2, Cpu, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { MatchCardList } from "@/components/dashboard/match/match-card-list";
import { mockMatchResults } from "@/lib/mock-data";

export default function MatchJob() {
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const router = useRouter();

  const handleMatch = () => {
    if (!jobDescription.trim()) return;

    setIsMatching(true);
    setTimeout(() => {
      router.push("/dashboard/match/result");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glow-card bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>

        <div className="p-6 md:p-10">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,217,255,0.2)]">
              <Cpu className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Configure Match Parameters
              </h2>
              <p className="text-sm font-mono text-muted-foreground mt-1">
                Input target job description for semantic analysis.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
              <Textarea
                placeholder="const JOB_DESCRIPTION = `Paste raw text here...`;"
                className="relative w-full min-h-[350px] text-sm md:text-base resize-y p-6 bg-black/60 border-white/10 font-mono text-white placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 shadow-inner rounded-xl leading-relaxed"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={isMatching}
                spellCheck={false}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                size="lg"
                className="h-14 px-10 text-base font-bold glow-btn bg-primary text-primary-foreground border-none rounded-xl"
                disabled={!jobDescription.trim() || isMatching}
                onClick={handleMatch}
              >
                {isMatching ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    EXECUTING_ANALYSIS...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Target className="mr-3 h-5 w-5" />
                    Execute Match
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            Previous Executions
          </h3>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="space-y-3">
          <MatchCardList
            matches={mockMatchResults}
            isLoading={false}
            href="/dashboard/match"
            onCardClick={(match) => console.log(match)}
          />
        </div>
      </div>

      {isMatching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
          <div className="flex flex-col items-center space-y-8 p-10 rounded-2xl border border-primary/30 bg-card/50 shadow-[0_0_50px_rgba(0,217,255,0.15)] max-w-sm w-full">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border border-white/10"></div>
              <div
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin"
                style={{ animationDuration: "1s" }}
              ></div>
              <div
                className="absolute inset-2 rounded-full border-b-2 border-l-2 border-purple-500 animate-spin"
                style={{
                  animationDuration: "1.5s",
                  animationDirection: "reverse",
                }}
              ></div>
              <Target className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse drop-shadow-[0_0_10px_rgba(0,217,255,1)]" />
            </div>
            <div className="text-center space-y-2 w-full">
              <h3 className="text-xl font-bold tracking-tight text-white">
                Semantic Engine Active
              </h3>
              <div className="font-mono text-xs text-primary bg-primary/10 px-3 py-1.5 rounded border border-primary/20 animate-pulse">
                Vectorizing job requirements...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
