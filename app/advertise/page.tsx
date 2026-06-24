import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

const placementOptions = [
  "Sponsored listing review for eligible adult AI software",
  "Featured placement on relevant category, best-of, pricing, or alternatives pages",
  "Affiliate partnership setup with approved tracking URLs stored separately",
  "Vendor-supplied data refreshes for pricing, policy, privacy, and feature fields"
] as const;

const requiredVendorSignals = [
  "Official website and product owner contact",
  "Pricing model, free trial, and payment method notes",
  "Policy boundaries for adult use, privacy, and prohibited content",
  "Affiliate program terms, network, commission notes, and tracking rules"
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Advertise and Partner",
  description:
    "Advertise on NSFW AI Hunt with labeled sponsored placements, affiliate partnerships, and vendor data updates for adult AI software.",
  path: "/advertise"
});

export default function AdvertisePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Commercial partnerships</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
        Advertise or partner with NSFW AI Hunt
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
        NSFW AI Hunt is a software research directory for adult AI tools. We support labeled
        sponsored placements, affiliate partnerships, and vendor data updates without hosting
        explicit media or changing rankings into fake recommendations.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-md border bg-card p-5">
          <BarChart3 className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">High-intent pages</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Sponsorship is considered for category, best-of, alternatives, pricing, and tool-detail
            pages where users are actively comparing software.
          </p>
        </div>
        <div className="rounded-md border bg-card p-5">
          <ShieldCheck className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Clear safety boundary</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We do not accept explicit media, user-upload campaigns, deepfake positioning, leaked
            content, celebrity sexual content, or anything involving minors or coercion.
          </p>
        </div>
        <div className="rounded-md border bg-card p-5">
          <CheckCircle2 className="size-5 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">Labeled monetization</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Paid placements must be labeled. Affiliate URLs stay separate from official URLs and
            route through tracked outbound links.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-md border bg-card p-5">
          <h2 className="text-xl font-semibold">Available partnership formats</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
            {placementOptions.map((option) => (
              <li key={option} className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border bg-card p-5">
          <h2 className="text-xl font-semibold">What vendors should send</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
            {requiredVendorSignals.map((signal) => (
              <li key={signal} className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-5 rounded-md border bg-secondary p-5">
        <h2 className="text-lg font-semibold">Editorial rule</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Sponsored or affiliate relationships can influence visibility only when clearly labeled.
          They do not permit fake coupons, unsupported pricing claims, unsafe content framing, or
          hidden adult media hosting.
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <a href="mailto:wosenkeji@gmail.com?subject=Advertising%20or%20affiliate%20partnership%20for%20NSFW%20AI%20Hunt">
            Email partnership request
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/affiliate-disclosure">Read affiliate disclosure</Link>
        </Button>
      </div>
    </article>
  );
}
