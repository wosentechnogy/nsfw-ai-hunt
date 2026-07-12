import { z } from "zod";

const outboundClickRowSchema = z.object({
  tool_slug: z.string().min(1),
  source_path: z.string().nullable(),
  destination_url: z.string().url(),
  created_at: z.string().datetime({ offset: true })
});

export type OutboundClickReport = Readonly<{
  total: number;
  attributed: number;
  unattributed: number;
  last7Days: number;
  last28Days: number;
  topSources: readonly Readonly<{
    toolSlug: string;
    sourcePath: string;
    clicks: number;
  }>[];
}>;

function isWithinDays(createdAt: string, now: Date, days: number) {
  const timestamp = Date.parse(createdAt);
  return Number.isFinite(timestamp) && now.getTime() - timestamp <= days * 24 * 60 * 60 * 1000;
}

export function buildOutboundClickReport(
  rows: readonly unknown[],
  now = new Date()
): OutboundClickReport {
  const parsedRows = rows.flatMap((row) => {
    const result = outboundClickRowSchema.safeParse(row);
    return result.success ? [result.data] : [];
  });
  const sourceCounts = new Map<string, { toolSlug: string; sourcePath: string; clicks: number }>();

  for (const row of parsedRows) {
    if (!row.source_path) continue;
    const key = `${row.tool_slug}\u0000${row.source_path}`;
    const current = sourceCounts.get(key);
    sourceCounts.set(key, {
      toolSlug: row.tool_slug,
      sourcePath: row.source_path,
      clicks: (current?.clicks ?? 0) + 1
    });
  }

  return {
    total: parsedRows.length,
    attributed: parsedRows.filter((row) => row.source_path !== null).length,
    unattributed: parsedRows.filter((row) => row.source_path === null).length,
    last7Days: parsedRows.filter((row) => isWithinDays(row.created_at, now, 7)).length,
    last28Days: parsedRows.filter((row) => isWithinDays(row.created_at, now, 28)).length,
    topSources: [...sourceCounts.values()]
      .sort((left, right) => right.clicks - left.clicks || left.sourcePath.localeCompare(right.sourcePath))
      .slice(0, 20)
  };
}
