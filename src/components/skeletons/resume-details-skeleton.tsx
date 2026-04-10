"use client";

export function ResumeDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* Header buttons */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-32 bg-white/10 rounded" />
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-white/10 rounded" />
          <div className="h-10 w-20 bg-white/10 rounded" />
        </div>
      </div>

      {/* Main Card */}
      <div className="border-t-4 border-t-primary/30 shadow-md rounded-lg bg-card/40 backdrop-blur-md overflow-hidden">
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="h-16 w-16 rounded-xl bg-primary/10" />

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="h-8 w-3/4 bg-white/10 rounded" />
              <div className="flex flex-wrap gap-4">
                <div className="h-5 w-32 bg-white/10 rounded" />
                <div className="h-5 w-24 bg-white/10 rounded" />
                <div className="h-5 w-20 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-8">
          {/* Skills section */}
          <div>
            <div className="h-7 w-40 bg-white/10 rounded mb-3" />
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 bg-white/10 rounded" />
              <div className="h-8 w-24 bg-white/10 rounded" />
              <div className="h-8 w-16 bg-white/10 rounded" />
              <div className="h-8 w-28 bg-white/10 rounded" />
            </div>
          </div>

          {/* Content Preview */}
          <div>
            <div className="h-7 w-48 bg-white/10 rounded mb-3" />
            <div className="p-6 rounded-lg bg-muted/50 border space-y-2">
              <div className="h-4 w-full bg-white/10 rounded" />
              <div className="h-4 w-[95%] bg-white/10 rounded" />
              <div className="h-4 w-[90%] bg-white/10 rounded" />
              <div className="h-4 w-[85%] bg-white/10 rounded" />
              <div className="h-4 w-[88%] bg-white/10 rounded" />
              <div className="h-4 w-[80%] bg-white/10 rounded" />
              <div className="h-4 w-[75%] bg-white/10 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
