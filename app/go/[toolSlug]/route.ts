import { NextRequest, NextResponse } from "next/server";
import { getToolBySlug } from "@/data/seed/tools";
import { normalizeSourcePath } from "@/lib/analytics/source-path";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";

type RouteContext = {
  params: Promise<Readonly<{ toolSlug: string }>>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { toolSlug } = await context.params;
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  const destinationUrl = tool.affiliateUrl ?? tool.websiteUrl;
  const sourcePath = normalizeSourcePath({
    explicitSource: request.nextUrl.searchParams.get("source_path"),
    referrer: request.headers.get("referer"),
    requestOrigin: request.nextUrl.origin
  });

  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase.from("outbound_clicks").insert({
      tool_slug: tool.slug,
      destination_url: destinationUrl,
      source_path: sourcePath,
      referrer: request.headers.get("referer"),
      user_agent: request.headers.get("user-agent")
    });

    if (error) {
      console.error("Failed to insert outbound click", {
        toolSlug: tool.slug,
        message: error.message
      });
    }
  } catch {
    // Redirect should still succeed even if logging is unavailable.
  }

  return NextResponse.redirect(destinationUrl);
}
