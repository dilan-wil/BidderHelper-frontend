"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUserProfile } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Loader2, ShieldAlert, KeyRound, User } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast("Credentials Upadted", {
        description: "New authentication keys generated successfully.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  const initials = mockUserProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Identity Column */}
        <div className="md:col-span-1 space-y-6">
          <div className="glow-card rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"></div>
            <div className="p-8 flex flex-col items-center text-center relative z-10">
              <Avatar className="h-28 w-28 border-4 border-background shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-6 ring-2 ring-primary/50">
                <AvatarFallback className="text-3xl font-black font-mono bg-black text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 w-full">
                <h3 className="font-bold text-xl text-white tracking-tight">
                  {mockUserProfile.name}
                </h3>
                <p className="text-xs font-mono text-muted-foreground bg-white/5 rounded mx-auto py-1 w-full truncate px-2 border border-white/5">
                  {mockUserProfile.email}
                </p>
              </div>
              <div className="w-full pt-6 mt-6 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Access Granted
                </span>
                <span className="font-bold font-mono text-white">
                  {mockUserProfile.joinDate}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card/30 border border-white/10 p-6 backdrop-blur">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Subscription
            </h4>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-primary font-bold text-lg mb-1 tracking-tight">
                PRO TIER
              </div>
              <div className="text-xs font-mono text-primary/70">
                Unlimited Semantic Matching
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="glow-card rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-white/10 bg-black/20 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <KeyRound className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Authentication</h3>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Rotate credentials to maintain workspace security.
                </p>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="current"
                    className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                  >
                    Current Key
                  </Label>
                  <Input
                    id="current"
                    type="password"
                    required
                    disabled={isLoading}
                    className="h-12 bg-black/50 border-white/10 focus-visible:ring-primary/30 font-mono tracking-widest text-white"
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="new"
                      className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                    >
                      New Key
                    </Label>
                    <Input
                      id="new"
                      type="password"
                      required
                      disabled={isLoading}
                      className="h-12 bg-black/50 border-white/10 focus-visible:ring-primary/30 font-mono tracking-widest text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm"
                      className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                    >
                      Verify New Key
                    </Label>
                    <Input
                      id="confirm"
                      type="password"
                      required
                      disabled={isLoading}
                      className="h-12 bg-black/50 border-white/10 focus-visible:ring-primary/30 font-mono tracking-widest text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 px-8 font-bold glow-btn bg-primary text-primary-foreground border-none"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Update Keys
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="rounded-2xl bg-red-950/10 border border-red-900/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
            <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" /> Critical Action
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
                  Permanently wipe your workspace. All assets, match history,
                  and profile data will be irrevocably deleted.
                </p>
              </div>
              <Button
                variant="destructive"
                className="shrink-0 h-11 px-6 font-bold font-mono tracking-wider bg-red-600 hover:bg-red-700"
                onClick={() => toast("SYS_ERR: Action locked in demo mode")}
              >
                PURGE WORKSPACE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
