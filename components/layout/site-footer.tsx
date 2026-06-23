import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold">{siteConfig.name}</p>
            <Badge variant="outline">18+</Badge>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {siteConfig.ageNotice}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            {siteConfig.affiliateDisclosure}
          </p>
        </div>

        <nav
          className="grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:grid-cols-3"
          aria-label="Footer navigation"
        >
          {siteConfig.footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

