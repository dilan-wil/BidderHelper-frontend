import { AppLayout } from "@/components/layout/AppLayout";
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
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Resumes() {
  const { toast } = useToast();
  const [resumes, setResumes] = useState(mockResumes);

  const handleDelete = (id: string) => {
    setResumes(resumes.filter((r) => r.id !== id));
    toast({
      title: "Asset Removed",
      description: "Resume purged from library.",
    });
  };

  return (
    <AppLayout title="Asset Library">
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
              <div
                key={resume.id}
                className="glow-card group bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1"
              >
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
                          className="h-8 w-8 text-muted-foreground hover:text-white"
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
                          <Link href={`/resumes/${resume.id}`}>
                            <ExternalLink className="mr-2 h-4 w-4" /> Inspect
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 focus:text-red-300 hover:bg-red-400/10 focus:bg-red-400/10 cursor-pointer"
                          onClick={() => handleDelete(resume.id)}
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
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
