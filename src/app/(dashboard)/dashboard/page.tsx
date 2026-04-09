"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      <div className="hidden md:flex w-1/2 bg-card/20 border-r border-white/5 relative overflow-hidden flex-col justify-center p-12 lg:p-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="relative z-10 space-y-6">
          <div className="inline-flex h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-[0_0_30px_rgba(0,217,255,0.4)] items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl leading-none">
              B
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Welcome back.
          </h1>
          <p className="text-lg text-muted-foreground max-w-md font-light leading-relaxed">
            Access your dashboard to run new matches, update your resume
            library, and generate tailored cover letters.
          </p>
        </div>

        <div className="absolute bottom-12 left-12 lg:left-24 right-12 text-sm font-mono text-muted-foreground/50 border-l border-primary/30 pl-4 py-1">
          SYS_MSG: Authenticating user...
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-background relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left space-y-2 md:hidden">
            <div className="inline-flex h-10 w-10 mx-auto rounded-lg bg-gradient-to-br from-primary to-purple-600 items-center justify-center mb-2">
              <span className="text-white font-bold text-xl leading-none">
                B
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="glow-card bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    disabled={isLoading}
                    className="h-12 bg-background border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                    >
                      Password
                    </Label>
                    <a
                      href="#"
                      className="text-xs font-mono text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    disabled={isLoading}
                    className="h-12 bg-background border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all font-mono text-sm tracking-widest"
                  />
                </div>
              </div>
              <div className="pt-2">
                <Button
                  className="w-full h-12 text-sm font-bold glow-btn bg-primary text-primary-foreground border-none"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {isLoading ? "Authenticating..." : "Sign In"}
                </Button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
