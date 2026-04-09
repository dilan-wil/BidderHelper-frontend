import { useState, useCallback } from "react";
import { UploadCloud, X, File as FileIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  children?: React.ReactNode;
  onUploadComplete?: () => void;
}

export function UploadModal({ children, onUploadComplete }: UploadModalProps) {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<
    {
      file: File;
      progress: number;
      status: "uploading" | "completed" | "error";
    }[]
  >([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (fileObj: { file: File }) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.file === fileObj.file
              ? { ...f, progress: 100, status: "completed" }
              : f
          )
        );
        setTimeout(() => {
          onUploadComplete?.();
        }, 1000);
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.file === fileObj.file ? { ...f, progress } : f))
        );
      }
    }, 500);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach(simulateUpload);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach(simulateUpload);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((f) => f.file !== fileToRemove));
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset after a delay to allow animation to finish
      setTimeout(() => setFiles([]), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || <Button>Upload Resume</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Resumes</DialogTitle>
          <DialogDescription>
            Drag and drop your resume PDFs here, or click to browse.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors duration-200",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="p-4 bg-background rounded-full shadow-sm border mb-4">
              <UploadCloud className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              PDF, DOCX, TXT (max. 5MB)
            </p>

            <input
              type="file"
              id="file-upload"
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInput}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Select Files
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              {files.map((fileObj, idx) => (
                <div key={idx} className="bg-card border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {fileObj.file.name}
                      </span>
                    </div>
                    {fileObj.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => removeFile(fileObj.file)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  {fileObj.status === "uploading" && (
                    <div className="space-y-1">
                      <Progress value={fileObj.progress} className="h-1" />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Uploading...</span>
                        <span>{Math.round(fileObj.progress)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => setOpen(false)}
            variant={
              files.length > 0 && files.every((f) => f.status === "completed")
                ? "default"
                : "outline"
            }
          >
            {files.length > 0 && files.every((f) => f.status === "completed")
              ? "Done"
              : "Cancel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
