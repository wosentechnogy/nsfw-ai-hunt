import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo/metadata";

const sections = [
  {
    title: "Information we collect",
    body:
      "The site may collect basic analytics events, page views, outbound click events, and messages sent voluntarily by email. It does not provide user accounts for public visitors in v1."
  },
  {
    title: "Affiliate and outbound links",
    body:
      "Outbound tool links may route through /go/[toolSlug] so clicks can be counted before redirecting to an official or affiliate destination."
  },
  {
    title: "Adult content boundary",
    body:
      "NSFW AI Hunt is a software directory. It does not host explicit media, user uploads, comments, adult galleries, or private adult user content."
  },
  {
    title: "Contact",
    body:
      "For privacy questions or listing corrections, contact wosenkeji@gmail.com during launch. Do not send explicit media or sensitive personal data unless it is necessary for the request."
  }
] as const;

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for NSFW AI Hunt, including analytics, outbound click tracking, and adult content boundaries.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Privacy</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
        Privacy policy
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        Last updated: June 23, 2026. This policy summarizes how NSFW AI Hunt handles basic site
        data for a software comparison directory.
      </p>
      <div className="mt-8 grid gap-5">
        {sections.map((section) => (
          <section key={section.title} className="rounded-md border bg-card p-5">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
