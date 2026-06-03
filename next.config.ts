import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");
const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  basePath: "/bejady",
  output: "standalone",
  outputFileTracingRoot: projectRoot,
  outputFileTracingExcludes: {},
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default withNextIntl(nextConfig);
