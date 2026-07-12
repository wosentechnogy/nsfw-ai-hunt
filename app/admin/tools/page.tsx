import Link from "next/link";
import { Button } from "@/components/ui/button";
import { directoryTools, getStaleToolRecords } from "@/data/seed/tools";

export const dynamic = "force-dynamic";

export default function AdminToolsPage() {
  const staleTools = getStaleToolRecords();

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">Tool admin</h1>
          <p className="mt-3 text-muted-foreground">
            Published and draft tool records for owner review.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tools/new">Create tool</Link>
        </Button>
      </div>

      <section className="mt-8 rounded-md border bg-card p-5" aria-labelledby="freshness-heading">
        <h2 id="freshness-heading" className="text-lg font-semibold">
          Freshness review queue
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {staleTools.length} published records are older than the 30-day review window and should be
          checked against their official pages before the next release.
        </p>
        {staleTools.length > 0 ? (
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {staleTools.slice(0, 12).map((tool) => (
              <li key={tool.slug} className="flex items-center justify-between gap-4 rounded-md border p-3">
                <span className="font-medium">{tool.name}</span>
                <span className="text-muted-foreground">{tool.lastCheckedAt}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <div className="mt-8 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Pricing</th>
              <th className="px-4 py-3 font-medium">Last checked</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {directoryTools.map((tool) => (
              <tr key={tool.slug} className="bg-card">
                <td className="px-4 py-4 font-medium">{tool.name}</td>
                <td className="px-4 py-4 text-muted-foreground">{tool.slug}</td>
                <td className="px-4 py-4 text-muted-foreground">
                  {tool.status === "published" ? "Published" : tool.status}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{tool.pricingModel}</td>
                <td className="px-4 py-4 text-muted-foreground">{tool.lastCheckedAt}</td>
                <td className="px-4 py-4">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/tools/${tool.slug}`}>Edit</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
