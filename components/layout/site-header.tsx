import Link from "next/link";
import { Database, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-card text-primary">
            <Database className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-normal">
              {siteConfig.name}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              Adult AI tools intelligence
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {siteConfig.mainNav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
        </nav>

        <Button variant="outline" size="sm" className="shrink-0" asChild>
          <Link href="/tools">
            <Search className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Find tools</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

