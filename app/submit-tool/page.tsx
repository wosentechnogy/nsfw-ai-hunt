import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

const requiredFields = [
  "Tool name and official URL",
  "Primary category and supported platforms",
  "Pricing model, free plan, or trial status",
  "NSFW policy summary and visible restrictions",
  "Privacy, payment, and data retention notes",
  "Affiliate program URL, if available"
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Submit a Tool",
  description:
    "Submit an adult AI software listing for review with official URL, pricing, policy, privacy, and affiliate fields.",
  path: "/submit-tool"
});

export default function SubmitToolPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Vendor submissions</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
        Submit an adult AI tool
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        NSFW AI Hunt accepts software listing suggestions for adult AI tools that can be evaluated
        without hosting explicit media. Submissions are reviewed before publication.
      </p>

      <section className="mt-8 rounded-md border bg-card p-5">
        <h2 className="text-lg font-semibold">What to include</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
          {requiredFields.map((field) => (
            <li key={field} className="flex gap-2">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{field}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5 rounded-md border bg-secondary p-5">
        <h2 className="text-lg font-semibold">Content boundary</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Do not submit tools focused on celebrity sexual content, leaked content, real-person
          sexual deepfakes, minors, coercion, non-consensual framing, or explicit media hosting.
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <a href="mailto:contact@nsfwaihunt.com?subject=Tool%20submission%20for%20NSFW%20AI%20Hunt">
            Email submission
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/affiliate-disclosure">Affiliate policy</Link>
        </Button>
      </div>
    </article>
  );
}
