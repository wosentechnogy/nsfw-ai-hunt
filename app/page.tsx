import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  LockKeyhole,
  Search,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageJsonLd } from "@/lib/seo/schema";
import {
  featuredTools,
  homepageCategories,
  recentlyUpdatedTools,
  useCaseLinks
} from "@/data/seed/homepage";

export default function Home() {
  const homeJsonLd = buildWebPageJsonLd({
    title: "NSFW AI Hunt",
    description:
      "Compare adult AI software by features, price, privacy, policies, and limits.",
    path: "/",
    type: "CollectionPage"
  });

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-14">
          <div className="min-w-0 max-w-3xl">
            <Badge variant="secondary">18+ software directory</Badge>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-balance md:text-5xl">
              Find adult AI tools by features, price, privacy, and limits.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Search NSFW AI chatbots, AI companion apps, image-capable tools, voice
              experiences, free trials, and privacy-friendly alternatives.
            </p>
            <form className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-md border bg-card p-2">
              <Search className="ml-3 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Search tools, features, or use cases"
                aria-label="Search tools"
              />
              <Button type="submit">
                Explore
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-accent" aria-hidden="true" />
                Official and affiliate URLs stay separate
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-accent" aria-hidden="true" />
                No explicit media hosted
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-accent" aria-hidden="true" />
                Last checked dates visible
              </span>
            </div>
          </div>

          <aside className="rounded-md border bg-card p-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-sm font-medium">Featured tools</h2>
                <p className="text-xs text-muted-foreground">Launch data preview</p>
              </div>
              <Badge>v0</Badge>
            </div>
            <div className="mt-5 space-y-4">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="block min-h-40 rounded-md border bg-background p-4 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{tool.name}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.summary}</p>
                    </div>
                    <div className="rounded-md bg-secondary px-2 py-1 text-sm font-semibold">
                      {tool.score}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {tool.pricing} · Last checked {tool.lastChecked}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-2 border-b pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Top categories</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Start with the highest-value discovery paths for adult AI software research.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/tools">Browse all tools</Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {homepageCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="min-h-28 rounded-md border bg-card p-4 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-medium">{category.label}</span>
                <span className="shrink-0 rounded-sm bg-secondary px-2 py-1 text-xs text-muted-foreground">
                  {category.count}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3">
        <div className="rounded-md border bg-card p-5">
          <ShieldCheck className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Policy-aware listings</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Tool pages track restrictions, age gates, privacy notes, and verified update dates.
          </p>
        </div>
        <div className="rounded-md border bg-card p-5">
          <LockKeyhole className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Privacy-first comparisons</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Decision pages compare login requirements, payment options, and data posture.
          </p>
        </div>
        <div className="rounded-md border bg-card p-5">
          <CalendarCheck className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Freshness-first data</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Pricing, policies, and affiliate status are designed to carry visible checked dates.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="rounded-md border bg-card p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Best use-case pages</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                High-intent pages connect directory data to privacy, pricing, free-trial, and
                payment-method searches.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {useCaseLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border bg-background p-3 text-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="mt-2 block leading-5 text-muted-foreground">{item.summary}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="flex flex-col gap-2 border-b pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recently updated tools</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Early seed records show how pricing, NSFW support, and freshness will be tracked.
            </p>
          </div>
          <Badge variant="outline">Last checked 2026-06-14</Badge>
        </div>
        <div className="mt-5 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Pricing</th>
                <th className="px-4 py-3 font-medium">NSFW support</th>
                <th className="px-4 py-3 font-medium">Last checked</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentlyUpdatedTools.map((tool) => (
                <tr key={tool.name} className="bg-card">
                  <td className="px-4 py-4 font-medium">
                    <Link href={tool.href} className="underline-offset-4 hover:underline">
                      {tool.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{tool.category}</td>
                  <td className="px-4 py-4 text-muted-foreground">{tool.pricing}</td>
                  <td className="px-4 py-4 text-muted-foreground">{tool.nsfwSupport}</td>
                  <td className="px-4 py-4 text-muted-foreground">{tool.lastChecked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
