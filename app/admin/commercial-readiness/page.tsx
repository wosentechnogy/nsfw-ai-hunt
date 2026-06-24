import { Badge } from "@/components/ui/badge";
import {
  commercialReadinessItems,
  getCommercialReadinessSummary,
  type CommercialReadinessStatus
} from "@/lib/ops/commercial-readiness";

const statusLabels: Record<CommercialReadinessStatus, string> = {
  ready: "Ready",
  blocked: "Blocked",
  manual: "Manual"
};

const statusClasses: Record<CommercialReadinessStatus, string> = {
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
  blocked: "border-red-200 bg-red-50 text-red-800",
  manual: "border-amber-200 bg-amber-50 text-amber-800"
};

export default function AdminCommercialReadinessPage() {
  const summary = getCommercialReadinessSummary();

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <Badge variant="secondary">Launch operations</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal">
          Commercial readiness dashboard
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Track the production blockers that still stand between the current live site and a
          revenue-ready affiliate operation. This page stores no passwords, API keys, payout
          details, or private affiliate IDs.
        </p>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Total checks</p>
          <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Ready</p>
          <p className="mt-2 text-2xl font-semibold">{summary.ready}</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Blocked</p>
          <p className="mt-2 text-2xl font-semibold">{summary.blocked}</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Manual</p>
          <p className="mt-2 text-2xl font-semibold">{summary.manual}</p>
        </div>
      </section>

      <div className="mt-8 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Check</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Evidence</th>
              <th className="px-4 py-3 font-medium">Next action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {commercialReadinessItems.map((item) => (
              <tr key={item.id} className="bg-card align-top">
                <td className="px-4 py-4 font-medium">{item.label}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-md border px-2 py-1 text-xs ${statusClasses[item.status]}`}>
                    {statusLabels[item.status]}
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{item.owner}</td>
                <td className="px-4 py-4 text-muted-foreground">{item.evidence}</td>
                <td className="px-4 py-4 text-muted-foreground">{item.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
