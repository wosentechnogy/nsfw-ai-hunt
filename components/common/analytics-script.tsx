import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function AnalyticsScript() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {domain ? (
        <Script
          defer
          data-domain={domain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
