"use client";
import { Button } from "@/components/ui/button";
import { UploadModal } from "@/components/upload-modal";
import {
  FileText,
  MoreVertical,
  Trash2,
  ExternalLink,
  Zap,
} from "lucide-react";
import { mockResumes } from "@/lib/mock-data";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { ResumeCard } from "@/components/dashboard/resume/resume-card";

export default function Resumes() {
  const [resumes, setResumes] = useState(mockResumes);

  const handleDelete = (id: string) => {
    setResumes(resumes.filter((r) => r.id !== id));
    toast.success("Asset Removed", {
      description: "Resume purged from library.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-card/30 p-4 rounded-xl border border-white/5 backdrop-blur">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Active Resumes
          </h2>
          <p className="text-xs font-mono text-muted-foreground">
            System indexing {resumes.length} documents
          </p>
        </div>
        <UploadModal>
          <Button className="h-10 font-semibold bg-white text-black hover:bg-white/90">
            <FileText className="mr-2 h-4 w-4" /> Ingest
          </Button>
        </UploadModal>
      </div>

      {resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center border rounded-2xl bg-card/20 border-white/10 border-dashed">
          <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Library Empty</h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-6 font-mono">
            Upload resume assets to initialize the match engine.
          </p>
          <UploadModal>
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10"
            >
              Select Files
            </Button>
          </UploadModal>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard 
            key={resume.id} 
            resume={resume} 
            onDelete={handleDelete}
          />
          ))}
        </div>
      )}
    </div>
  );
}
