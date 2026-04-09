import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockResumes } from "@/lib/mock-data";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  Download,
  Trash2,
  FileText,
  Calendar,
  HardDrive,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function ResumeDetail() {
  const [, params] = useRoute("/resumes/:id");
  const resume = mockResumes.find((r) => r.id === params?.id);
  const { toast } = useToast();

  if (!resume) {
    return (
      <AppLayout title="Resume Not Found">
        <div className="p-8 text-center">
          <p className="mb-4">The resume you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/resumes">Back to Resumes</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleDownload = () => {
    toast({
      title: "Downloading...",
      description: "Your file will be saved shortly.",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Resume Deleted",
      description: "You will be redirected to the library.",
    });
  };

  return (
    <AppLayout title="Resume Details">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="-ml-4">
            <Link href="/resumes">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>

        <Card className="border-t-4 border-t-primary shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  {resume.filename}
                </CardTitle>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {resume.uploadDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <HardDrive className="h-4 w-4" /> {resume.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" /> {resume.matchCount} Matches
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Extracted Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-3 py-1 bg-secondary hover:bg-secondary/80 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">
                Parsed Content Preview
              </h3>
              <div className="p-6 rounded-lg bg-muted/50 border text-sm leading-relaxed font-mono whitespace-pre-wrap text-muted-foreground">
                {resume.content}
                {"\n\n[Remaining content truncated for preview]"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
