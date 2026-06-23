import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo/metadata";

const terms = [
  {
    title: "18+ audience",
    body:
      "This site is intended only for adults who are legally allowed to research adult AI software in their jurisdiction."
  },
  {
    title: "Research directory",
    body:
      "NSFW AI Hunt provides software information, comparisons, and outbound links. It does not sell access to third-party tools or guarantee tool availability, pricing, or policy terms."
  },
  {
    title: "No prohibited content",
    body:
      "Visitors and vendors must not send or request explicit media hosting, leaked content, celebrity sexual content, minor-related content, coercion, non-consensual framing, or real-person sexual deepfake workflows."
  },
  {
    title: "Affiliate disclosure",
    body:
      "Some outbound links may be affiliate links. Sponsored or paid placements must be labeled, and coupon claims should not be assumed unless explicitly verified."
  }
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description:
    "Terms for using NSFW AI Hunt as an adult AI software research and affiliate comparison directory.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Terms</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">Terms of use</h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        Last updated: June 23, 2026. By using this site, you agree to use it only as an adult
        software research directory.
      </p>
      <div className="mt-8 grid gap-5">
        {terms.map((term) => (
          <section key={term.title} className="rounded-md border bg-card p-5">
            <h2 className="text-lg font-semibold">{term.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{term.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
