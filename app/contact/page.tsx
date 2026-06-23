import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact NSFW AI Hunt for tool corrections, affiliate partnerships, listing requests, or safety concerns.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="secondary">Contact</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">
        Contact NSFW AI Hunt
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        Use this contact route for listing corrections, affiliate partnership questions, vendor
        updates, privacy requests, and content safety concerns.
      </p>

      <section className="mt-8 rounded-md border bg-card p-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Mail className="size-4 text-accent" aria-hidden="true" />
          Email
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Launch inbox:{" "}
          <a className="underline underline-offset-4" href="mailto:wosenkeji@gmail.com">
            wosenkeji@gmail.com
          </a>
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Brand email routing for contact@nsfwaihunt.com is being prepared. Vendors can also start
          with the structured submission page so pricing, policy, and affiliate fields stay
          separate.
        </p>
      </section>

      <section className="mt-5 rounded-md border bg-secondary p-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ShieldAlert className="size-4 text-accent" aria-hidden="true" />
          Safety and abuse notes
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Do not send explicit media, private personal data, leaked content, celebrity sexual
          content, or any material involving minors or non-consensual framing.
        </p>
      </section>

      <div className="mt-8">
        <Button asChild>
          <Link href="/submit-tool">Submit a tool</Link>
        </Button>
      </div>
    </article>
  );
}
