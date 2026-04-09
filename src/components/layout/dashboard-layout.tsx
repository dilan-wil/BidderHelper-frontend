"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Files,
  Target,
  FileText,
  User,
  Menu,
  LogOut,
  X,
} from "lucide-react";
import { mockUserProfile } from "@/lib/mock-data";
import { useAuth } from "@/contexts/auth-context";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Files, label: "Resumes", href: "/dashboard/resumes" },
  { icon: Target, label: "Match Job", href: "/dashboard/match" },
  // { icon: FileText, label: "Cover Letters", href: "/dashboard/cover/cov_1" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

// Map routes to page titles
const getPageTitle = (pathname: string): string => {
  const match = sidebarItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href))
  );

  if (match) return match.label;

  if (pathname.startsWith("/cover/")) return "Cover Letter";
  if (pathname.startsWith("/resumes/")) return "Resume Details";

  return "Dashboard";
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTitle = getPageTitle(pathname);
  const { logout } = useAuth();
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-[0_0_15px_rgba(0,217,255,0.3)]">
            <span className="text-white font-bold text-lg leading-none">B</span>
          </div>
          <span className="font-bold text-xl tracking-tight">
            Bidder Helper
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="text-primary hover:bg-primary/10 hover:text-primary"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0",
          "transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          "shadow-[4px_0_24px_rgba(0,0,0,0.5)]",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border shrink-0 bg-sidebar">
          <Link href="/dashboard" className="flex items-center gap-3 w-full">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-[0_0_10px_rgba(0,217,255,0.4)]">
              <span className="text-white font-bold text-lg leading-none">
                B
              </span>
            </div>
            <span className="font-bold tracking-tight flex-1">
              Bidder Helper
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-primary/20 text-primary border border-primary/30">
              AI
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto min-h-0">
          {sidebarItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary shadow-[inset_2px_0_10px_rgba(0,217,255,0.1)]"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground border-l-2 border-transparent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-primary drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]"
                      : "text-muted-foreground"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Section  */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar/50 shrink-0">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <Avatar className="h-9 w-9 border-2 border-primary/50 shadow-[0_0_10px_rgba(0,217,255,0.2)]">
              <AvatarFallback className="bg-background text-primary text-xs font-bold font-mono">
                {mockUserProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-sm font-medium truncate">
                {mockUserProfile.name}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground truncate">
                {mockUserProfile.email}
              </span>
            </div>
            <Button
              variant="ghost"
              size={"icon-sm"}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              title="Log out"
              onClick={logout}
              asChild
            >
              {/* <Link href="/"> */}
              <LogOut className="h-4 w-4" />
              {/* </Link> */}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area  */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header - Fixed */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-border/40 bg-background/80 backdrop-blur-xl shrink-0">
          <h1 className="text-xl font-bold tracking-tight gradient-text">
            {currentTitle}
          </h1>
        </header>

        {/* Mobile Title Bar */}
        <div className="md:hidden px-4 py-3 border-b border-border/40 bg-background/80 backdrop-blur-md shrink-0">
          <h1 className="text-xl font-bold tracking-tight gradient-text">
            {currentTitle}
          </h1>
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1200px] mx-auto w-full">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-md z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
