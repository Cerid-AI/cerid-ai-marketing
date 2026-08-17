import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  turbopack: {},
  // Local agents/browsers often hit 127.0.0.1 while Next binds "localhost".
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // /pro is baked into released Cerid binaries (the community Plan & Billing
  // pane links there), so it has to keep resolving for the life of those
  // builds — it 404'd from v1.0.0 through v1.0.1. Permanent, not temporary:
  // the canonical destination is /pricing and that will not move back.
  async redirects() {
    return [{ source: "/pro", destination: "/pricing", permanent: true }];
  },
};

export default withSentryConfig(nextConfig, {
  org: "cerid-ai",
  project: "cerid-ai-marketing",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
});
