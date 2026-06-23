import Link from "next/link";
import { Button } from "@/components/ui/button";
import { directoryTools } from "@/data/seed/tools";

export default function AdminToolsPage() {
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

      <div className="mt-8 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Pricing</th>
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
