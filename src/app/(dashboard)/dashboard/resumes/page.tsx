"use client";
import { Button } from "@/components/ui/button";
import { UploadModal } from "@/components/upload-modal";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResumeCard } from "@/components/dashboard/resume/resume-card";
import { resumeApi } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { ResumeCardSkeleton } from "@/components/skeletons/resume-card-skeleton";

export default function Resumes() {
  const [resumesLoading, setResumesLoading] = useState(false);
  const { resumes, setResumes } = useAppStore();

  const fetchResumes = async () => {
    setResumesLoading(true);
    const { data, error } = await resumeApi.getAll();
    if (data && !error) {
      setResumes(data);
    }
    setResumesLoading(false);
  };

  // Get resumes if not already set in store
  useEffect(() => {
    if (resumes.length === 0) {
      fetchResumes();
    }
  }, []);

  const handleDelete = async (id: string) => {
    await resumeApi.delete(id);
    await fetchResumes();
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

      {resumesLoading ? (
        // Show skeletons while loading
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ResumeCardSkeleton key={i} />
          ))}
        </div>
      ) : resumes.length === 0 ? (
        // Show empty state when no resumes
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
        // Show resumes
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
