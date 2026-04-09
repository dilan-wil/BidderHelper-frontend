"use client";

import Link from "next/link";
import {
  FileText,
  MoreVertical,
  ExternalLink,
  Trash2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Resume {
  id: string;
  filename: string;
  size: string;
  uploadDate: string;
  matchCount: number;
}

interface ResumeCardProps {
  resume: Resume;
  onDelete?: (id: string) => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const handleDelete = () => {
    onDelete?.(resume.id);
  };

  return (
    <div className="glow-card group bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-200">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,217,255,0.15)] group-hover:shadow-[0_0_25px_rgba(0,217,255,0.3)] transition-all shrink-0">
            <FileText className="h-6 w-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-white"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-card border-white/10"
            >
              <DropdownMenuItem
                asChild
                className="hover:bg-white/5 focus:bg-white/5 cursor-pointer"
              >
                <Link href={`/dashboard/resumes/${resume.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Inspect
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400 focus:text-red-300 hover:bg-red-400/10 focus:bg-red-400/10 cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Purge
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1">
          <h3
            className="font-bold text-lg text-white font-mono break-all line-clamp-2 leading-tight"
            title={resume.filename}
          >
            {resume.filename}
          </h3>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {resume.size}
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {resume.uploadDate}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" /> Matches
        </div>
        <div
          className={`text-xs font-bold font-mono px-2 py-1 rounded border ${
            resume.matchCount > 0
              ? "bg-primary/10 border-primary/30 text-primary shadow-[0_0_10px_rgba(0,217,255,0.2)]"
              : "bg-white/5 border-white/10 text-muted-foreground"
          }`}
        >
          {resume.matchCount}
        </div>
      </div>
    </div>
  );
}
