import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  affiliateApplications,
  getAffiliateApplicationSummary
} from "@/data/seed/affiliate-applications";

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AdminAffiliateApplicationsPage() {
  const summary = getAffiliateApplicationSummary();

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Badge variant="secondary">Affiliate operations</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal">
            Affiliate application tracker
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Track priority programs, public payout signals, owner email, next actions, and approval
            status without storing passwords, payout details, affiliate IDs, or private dashboard
            links in the repository.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/advertise">Partner page</Link>
        </Button>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Total</p>
          <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Todo</p>
          <p className="mt-2 text-2xl font-semibold">{summary.todo}</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Applied</p>
          <p className="mt-2 text-2xl font-semibold">{summary.applied}</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Approved</p>
          <p className="mt-2 text-2xl font-semibold">{summary.approved}</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Paused</p>
          <p className="mt-2 text-2xl font-semibold">{summary.paused}</p>
        </div>
      </section>

      <div className="mt-8 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[1160px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Tool</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Network</th>
              <th className="px-4 py-3 font-medium">Public payout signal</th>
              <th className="px-4 py-3 font-medium">Next action</th>
              <th className="px-4 py-3 font-medium">Owner email</th>
              <th className="px-4 py-3 font-medium">Account context</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {affiliateApplications.map((application) => (
              <tr key={application.toolSlug} className="bg-card align-top">
                <td className="px-4 py-4 font-medium">#{application.priority}</td>
                <td className="px-4 py-4">
                  <Link className="font-medium underline-offset-4 hover:underline" href={`/tools/${application.toolSlug}`}>
                    {application.toolName}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Checked {application.lastCheckedAt}
                  </p>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{formatStatus(application.status)}</td>
                <td className="px-4 py-4 text-muted-foreground">{application.network}</td>
                <td className="px-4 py-4 text-muted-foreground">{application.publicPayoutSignal}</td>
                <td className="px-4 py-4 text-muted-foreground">{application.nextAction}</td>
                <td className="px-4 py-4 text-muted-foreground">{application.ownerEmail}</td>
                <td className="px-4 py-4 text-muted-foreground">
                  {application.accountContextNote ?? "Default NSFW AI Hunt account context"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
