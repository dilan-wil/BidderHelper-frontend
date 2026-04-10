import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-[0_1px_15px_rgba(0,217,255,0.05)]">
        <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-[0_0_15px_rgba(0,217,255,0.3)]">
              <span className="text-white font-bold text-lg leading-none">
                B
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:flex items-center gap-2">
              Bidder Helper
              <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-primary/20 text-primary border border-primary/30">
                AI
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.8)] transition-all"
            >
              Sign In
            </Link>
            <Button
              asChild
              className="glow-btn bg-primary text-primary-foreground border-none"
            >
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col relative z-10">{children}</main>
    </div>
  );
}
