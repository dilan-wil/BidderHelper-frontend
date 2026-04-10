"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  Shield,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div>
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 overflow-hidden dot-grid">
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />

        <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-6xl text-center flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(0,217,255,0.15)]">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Bidder Helper AI Match Engine
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-[1.1]">
            Find Your Best Resume
            <br />
            <span className="gradient-text">Instantly.</span>
          </h1>

          <p className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8 mb-10 font-light">
            Upload multiple variations of your resume. Paste a job description.
            Our AI tells you exactly which one to submit and generates your
            cover letter in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="h-14 px-8 text-base font-bold glow-btn bg-primary text-primary-foreground border-none"
              asChild
            >
              <Link href="/auth/signup">
                Start Matching <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md"
              asChild
            >
              <Link href="/dashboard">View Demo</Link>
            </Button>
          </div>

          <div className="mt-20 relative w-full max-w-4xl mx-auto">
            <div className="glow-card rounded-2xl bg-card/60 backdrop-blur-xl border border-primary/20 p-2 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
              <div className="bg-background rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-white/5">
                <div className="relative shrink-0 flex items-center justify-center w-32 h-32 md:w-48 md:h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted/30"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="283"
                      strokeDashoffset="22"
                      className="text-primary drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-black gradient-text">
                      92%
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Match Score
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider">
                    <CheckCircle2 className="h-3 w-3" /> Best Fit
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-mono">
                      Software_Eng_Senior_v2.pdf
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Perfectly aligns with "React", "TypeScript", and "System
                      Design" requirements.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono">
                      React (100%)
                    </span>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono">
                      AWS (90%)
                    </span>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono">
                      Node.js (85%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background relative border-t border-white/5">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Precision execution
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[40rem] mx-auto font-light">
              Built for speed and accuracy. Our AI engine processes job
              requirements and your history to produce the optimal application
              package.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glow-card p-8 rounded-2xl bg-card/40 backdrop-blur-sm flex flex-col gap-5 group">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-[0_0_20px_rgba(0,217,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Semantic Matching
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                We don't just look for exact keyword matches. The AI understands
                the context and semantic meaning of your experience versus the
                role.
              </p>
            </div>
            <div className="glow-card p-8 rounded-2xl bg-card/40 backdrop-blur-sm flex flex-col gap-5 group">
              <div className="h-14 w-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-purple-500/20">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Instant Generation
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Drop in the job description and get actionable insights, score
                breakdowns, and a bespoke cover letter in milliseconds.
              </p>
            </div>
            <div className="glow-card p-8 rounded-2xl bg-card/40 backdrop-blur-sm flex flex-col gap-5 group">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-[0_0_20px_rgba(0,217,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Local-First Privacy
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Your career data remains yours. Secure processing ensures your
                resumes are never used to train generalized models.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-card/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                The optimal flow.
                <br />
                <span className="text-muted-foreground">No guesswork.</span>
              </h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
                {[
                  "Build your library with every resume variant.",
                  "Paste the target job description.",
                  "Engine calculates the highest probability match.",
                  "Export the customized application package.",
                ].map((step, i) => (
                  <div key={i} className="relative flex items-start gap-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-primary/50 text-primary font-mono font-bold shadow-[0_0_15px_rgba(0,217,255,0.2)] relative z-10 shrink-0">
                      0{i + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-lg text-foreground font-medium">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-xl border border-white/10 bg-black/50 backdrop-blur-xl p-6 shadow-2xl transform transition-transform duration-500 hover:rotate-y-2 hover:rotate-x-2">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <Layers className="h-8 w-8 text-primary animate-pulse" />
                  <div>
                    <div className="text-xs font-mono text-primary mb-1 tracking-widest uppercase">
                      Processing Request
                    </div>
                    <div className="text-xl font-bold text-white">
                      Analyzing Semantics
                    </div>
                  </div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-muted-foreground">
                      evaluating_frontend_v3.pdf
                    </span>
                    <span className="text-primary font-bold">81%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-primary/20 border border-primary/30 shadow-[0_0_10px_rgba(0,217,255,0.1)]">
                    <span className="text-white">
                      evaluating_fullstack_lead.pdf
                    </span>
                    <span className="text-primary font-bold">96%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-muted-foreground">
                      evaluating_manager.pdf
                    </span>
                    <span className="text-purple-400 font-bold">72%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center relative z-10">
          <div className="glow-card rounded-3xl bg-card/50 backdrop-blur-xl border border-primary/30 p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-purple-500/10 pointer-events-none"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Ready to upgrade your applications?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
              Join the developers landing their dream roles with
              precision-matched resumes.
            </p>
            <Button
              size="lg"
              className="h-14 px-10 text-lg font-bold glow-btn bg-primary text-primary-foreground border-none"
              asChild
            >
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 bg-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center opacity-80">
              <span className="text-white font-bold text-sm leading-none">
                B
              </span>
            </div>
            <span className="font-bold tracking-tight text-white">
              Bidder Helper
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground font-medium">
            <a
              href="https://github.com/dilan-wil/BidderHelper-frontend"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Bidder Helper.
          </p>
        </div>
      </footer>
    </div>
  );
}
