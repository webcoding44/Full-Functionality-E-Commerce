import { withSentryConfig } from "@sentry/nextjs/config";
// import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withSentryConfig(nextConfig, {
  org: "نام-سازمان-تو",
  project: "نام-پروژه-تو",
  silent: !process.env.CI,
  sourcemaps: {
    disable: false,
  },
  telemetry: false,
});