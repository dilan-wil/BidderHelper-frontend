"use client";

export function ResumeCardSkeleton() {
  return (
    <div className="glow-card group bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20" />
          <div className="h-8 w-8 rounded bg-white/5" />
        </div>

        <div className="flex-1 space-y-3">
          <div className="h-6 bg-white/10 rounded-lg w-3/4" />
          <div className="flex items-center gap-2 mt-3">
            <div className="h-5 w-16 bg-white/10 rounded" />
            <div className="h-5 w-16 bg-white/10 rounded" />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 bg-primary/20 rounded" />
          <div className="h-3 w-12 bg-white/10 rounded" />
        </div>
        <div className="h-6 w-10 bg-white/10 rounded" />
      </div>
    </div>
  );
}
