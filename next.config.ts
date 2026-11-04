import type { NextConfig } from "next";
const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  async rewrites() {
    return ["projects", "writing"].map((kind) => ({
      source: `/:locale(zh|en)/${kind}/:slug.md`,
      destination: `/:locale/raw/${kind}/:slug`,
    }));
  },
  async redirects() {
    return [
      ...["projects", "writing", "about", "now"].map((p) => ({
        source: `/${p}/:path*`,
        destination: `/zh/${p}/:path*`,
        permanent: true,
      })),
      ...["feed.xml", "llms.txt", "llms-full.txt"].map((p) => ({
        source: `/${p}`,
        destination: `/zh/${p}`,
        permanent: true,
      })),
      {
        source: "/posts/:slug",
        destination: "/zh/writing/:slug",
        permanent: true,
      },
      {
        source: "/:locale(zh|en)/posts/:slug",
        destination: "/:locale/writing/:slug",
        permanent: true,
      },
      { source: "/rss.xml", destination: "/zh/feed.xml", permanent: true },
      {
        source: "/:locale(zh|en)/rss.xml",
        destination: "/:locale/feed.xml",
        permanent: true,
      },
    ];
  },
};
export default config;
