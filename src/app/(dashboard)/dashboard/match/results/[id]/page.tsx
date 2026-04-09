"use client";

import { Button } from "@/components/ui/button";
import { mockMatchResults, mockResumes } from "@/lib/mock-data";
import {
  FileText,
  Download,
  Check,
  Copy,
  Loader2,
  ArrowLeft,
  Terminal,
  FileCode2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Match } from "@/lib/types";
import { recommendationApi } from "@/lib/api";

export default function MatchResult() {
  const params = useParams();
  const matchId = params.id as string;
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const getResume = async () => {
      const { data, error } = await recommendationApi.getMatchById(matchId);
      if (data && !error) {
        setMatch(data);
      }
    };
    getResume();
  }, []);
  const bestResume = match?.matchedResumes[0];

  const [generatingLetter, setGeneratingLetter] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [letterContent, setLetterContent] = useState(
    "Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position. Based on the requirements, my background aligns perfectly...\n\nSincerely,\nAlex"
  );
  const [copied, setCopied] = useState(false);

  if (!bestResume) return null;

  const handleGenerateLetter = () => {
    setGeneratingLetter(true);
    setTimeout(() => {
      setGeneratingLetter(false);
      setShowLetter(true);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    toast("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    toast("Copied to clipboard");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-card/30 p-6 rounded-2xl border border-white/5 backdrop-blur">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Analysis Complete
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {match.jobTitle}
          </h2>
          <p className="text-primary font-mono text-sm bg-primary/10 w-fit px-2 py-0.5 rounded border border-primary/20">
            {/* {result.company} */}
          </p>
        </div>
        <Button
          variant="outline"
          className="border-white/10 hover:bg-white/5 text-white"
          asChild
        >
          <Link href="/dashboard/match">
            <ArrowLeft className="mr-2 h-4 w-4" /> New Execution
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Best Match Card */}
        <div className="lg:col-span-2 glow-card rounded-2xl bg-card/40 backdrop-blur-xl border border-primary/30 p-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500"></div>
          <div className="bg-black/40 rounded-xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" /> Optimal Asset
              </h3>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                Confidence Score
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 flex-1">
              <div className="relative shrink-0 flex items-center justify-center w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-white/5"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="283"
                    strokeDashoffset={
                      283 - (283 * bestResume.similarity * 100) / 100
                    }
                    className="text-primary drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]"
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black font-mono text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {Math.round(bestResume.similarity * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-6 w-full text-center sm:text-left">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-mono text-primary flex items-center justify-center sm:justify-start gap-2">
                    <FileCode2 className="h-5 w-5" />
                    {bestResume.filename}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    High alignment detected across technical requirements.
                    Vector proximity strong for{" "}
                    <span className="text-white">
                      {/* {bestResume.skills.slice(0, 3).join(", ")} */}
                    </span>
                    .
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 h-11 font-semibold bg-white text-black hover:bg-white/90"
                  >
                    <Download className="mr-2 h-4 w-4" /> Fetch PDF
                  </Button>
                  <Button
                    onClick={handleGenerateLetter}
                    disabled={generatingLetter || showLetter}
                    className="flex-1 h-11 font-semibold glow-btn bg-primary text-primary-foreground border-none"
                  >
                    {generatingLetter ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Synthesizing...
                      </>
                    ) : showLetter ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Synthesized
                      </>
                    ) : (
                      <>
                        <Terminal className="mr-2 h-4 w-4" /> Build Cover Letter
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Matches */}
        <div className="rounded-2xl bg-card/30 border border-white/10 backdrop-blur p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-6 pb-4 border-b border-white/10">
            Variant Ranking
          </h3>
          <div className="space-y-3 flex-1">
            {match.matchedResumes.slice(1).map((m, i) => {
              return (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden group"
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-white/5"
                    style={{ width: `${Math.round(m.similarity * 100)}%` }}
                  ></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="min-w-0 pr-4">
                      <p className="text-sm font-mono text-white truncate">
                        {m.filename}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase mt-1">
                        Rank 0{i + 2}
                      </p>
                    </div>
                    <div className="font-bold font-mono text-sm text-purple-400 shrink-0">
                      {Math.round(m.similarity * 100)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showLetter && (
        <div className="glow-card rounded-2xl bg-card/40 backdrop-blur-xl border border-primary/30 p-1 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-black/60 rounded-xl h-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Generated Artifact
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    cover_letter_v1.txt
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-none h-9 border-white/10 hover:bg-white/5"
                >
                  {copied ? (
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="flex-1 sm:flex-none h-9 bg-white text-black hover:bg-white/90"
                >
                  <Download className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>
            </div>
            <div className="p-6">
              <Textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="min-h-[400px] border-0 rounded bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed p-4 font-mono text-white/90 resize-y shadow-inner shadow-black/50"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
