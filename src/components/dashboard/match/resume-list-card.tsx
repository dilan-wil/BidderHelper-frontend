"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Resume {
  id: string;
  filename: string;
  size: string;
  skills: string[];
}

interface ResumeCardProps {
  resume: Resume;
}

export function ResumeListCard({ resume }: ResumeCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-card/40 hover:bg-card/80 transition-colors group">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary/30 transition-colors">
          <FileText className="h-4 w-4 text-white group-hover:text-primary transition-colors" />
        </div>
        <div className="min-w-0 flex flex-col">
          <span className="text-sm font-bold font-mono text-white truncate">
            {resume.filename}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {resume.size} • {resume.skills.length} skills indexed
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-white"
        asChild
      >
        <Link href={`/resumes/${resume.id}`}>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
