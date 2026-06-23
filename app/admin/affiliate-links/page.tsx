import { directoryTools } from "@/data/seed/tools";

export default function AdminAffiliateLinksPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Affiliate link admin</h1>
        <p className="mt-3 text-muted-foreground">
          Manage Primary link selection, network attribution, commission notes, and pause state.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-md border">
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Tool</th>
              <th className="px-4 py-3 font-medium">Primary link</th>
              <th className="px-4 py-3 font-medium">network</th>
              <th className="px-4 py-3 font-medium">commission</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {directoryTools.map((tool) => (
              <tr key={tool.slug} className="bg-card">
                <td className="px-4 py-4 font-medium">{tool.name}</td>
                <td className="px-4 py-4 text-muted-foreground">{tool.affiliateUrl ?? "Official URL fallback"}</td>
                <td className="px-4 py-4 text-muted-foreground">{tool.affiliateNetwork ?? "Unassigned network"}</td>
                <td className="px-4 py-4 text-muted-foreground">{tool.commissionRate ?? "No commission note"}</td>
                <td className="px-4 py-4 text-muted-foreground">{tool.affiliateProgramStatus}</td>
                <td className="px-4 py-4 text-muted-foreground">Pause link</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
