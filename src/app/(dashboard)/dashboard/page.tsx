"use client";
import { Button } from "@/components/ui/button";
import { UploadModal } from "@/components/upload-modal";
import {
  FileText,
  Target,
  Activity,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { mockMatchResults, mockResumes } from "@/lib/mock-data";
import { toast } from "sonner";
import Link from "next/link";
import { MatchCardList } from "../../../components/dashboard/match/match-card-list";
import { ResumeListCard } from "@/components/dashboard/resume/resume-list-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { useEffect, useState } from "react";
import { resumeApi } from "@/lib/api";
import { useAppStore } from "@/lib/store";

export default function Dashboard() {
  const [resumesLoading, setResumesLoading] = useState(false);
  const { resumes, setResumes } = useAppStore();

  const fetchResumes = async () => {
    setResumesLoading(true);
    const { data, error } = await resumeApi.getAll();
    if (data && !error) {
      console.log(data);
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

  // Get matches
  useEffect(() => {
    const fetchMatches = async () => {
      // if (matches.length === 0) {
      //   setLoading(true);
      //   const { data, error } = await recommendationApi.getHistory();
      //   if (data && !error) {
      //     setMatches(data);
      //   }
      //   setLoading(false);
      // }
    };

    fetchMatches();
  }, []);

  const handleUploadComplete = () => {
    toast.success("Upload Successful", {
      description: "Resumes ingested and processed.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-5 rounded-xl border border-white/5 bg-card/30 backdrop-blur">
        {/* Left side - Optional stats */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Ready to match</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" />
            <span>{resumes.length} resumes</span>
          </div>
        </div>

        {/* Right side - Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <UploadModal
            onDone={fetchResumes}
            onUploadComplete={handleUploadComplete}
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto h-10 border-primary/20 hover:border-primary/50 hover:bg-primary/5"
            >
              <FileText className="mr-2 h-4 w-4" />
              Ingest Resumes
            </Button>
          </UploadModal>
          <Button
            className="w-full sm:w-auto h-10 bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all"
            asChild
          >
            <Link href="/dashboard/match">
              <Target className="mr-2 h-4 w-4" />
              Run Match Engine
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Library Size"
          value={resumes.length}
          icon={<FileText className="h-4 w-4" />}
          variant="primary"
        />

        <MetricCard
          title="Matches Run"
          value={7}
          icon={<Activity className="h-4 w-4" />}
          variant="purple"
        />

        <MetricCard
          title="Peak Score"
          value="96%"
          icon={<Target className="h-4 w-4" />}
          variant="highlight"
        />

        <MetricCard
          title="Top Asset"
          value=""
          icon={<CheckCircle2 className="h-4 w-4" />}
          variant="default"
        >
          <div
            className="text-sm font-bold font-mono text-white truncate mt-auto bg-white/5 px-2 py-1.5 rounded border border-white/5 inline-block w-fit max-w-full"
            title="Engineering_Manager.pdf"
          >
            Eng_Manager.pdf
          </div>
        </MetricCard>
      </div>

      {/* Content Areas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white border-b border-white/10 pb-2">
            Match History
          </h2>
          <div className="space-y-3">
            <MatchCardList
              matches={mockMatchResults}
              isLoading={false}
              href="/dashboard/match"
              onCardClick={(match) => console.log(match)}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white border-b border-white/10 pb-2">
            Asset Library
          </h2>
          <div className="space-y-3">
            {resumes.slice(0, 4).map((resume) => (
              <ResumeListCard key={resume.id} resume={resume} />
            ))}
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full h-10 border-white/10 text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard/resumes">Browse Full Library</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
