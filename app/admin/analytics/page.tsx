import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";
import { buildOutboundClickReport } from "@/lib/analytics/outbound-click-report";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const supabase = createServiceRoleSupabaseClient();
  const { data, error } = await supabase
    .from("outbound_clicks")
    .select("tool_slug, source_path, destination_url, created_at")
    .order("created_at", { ascending: false })
    .limit(500);
  const report = buildOutboundClickReport(error ? [] : data ?? []);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Outbound click report</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Owner-only view of recent affiliate-intent clicks grouped by tool and normalized source
          page. This report does not expose visitor identifiers or payment data.
        </p>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Loaded clicks", report.total],
          ["Attributed", report.attributed],
          ["Unattributed", report.unattributed],
          ["Last 7 days", report.last7Days],
          ["Last 28 days", report.last28Days]
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border bg-card p-4">
            <p className="text-xs uppercase text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Tool</th>
              <th className="px-4 py-3 font-medium">Source page</th>
              <th className="px-4 py-3 font-medium">Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {report.topSources.map((source) => (
              <tr key={`${source.toolSlug}-${source.sourcePath}`} className="bg-card">
                <td className="px-4 py-4 font-medium">{source.toolSlug}</td>
                <td className="px-4 py-4 text-muted-foreground">{source.sourcePath}</td>
                <td className="px-4 py-4 text-muted-foreground">{source.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
