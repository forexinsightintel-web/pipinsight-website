import type { NextConfig } from "next";

// Old PIP:Insight routes are retired; send visitors somewhere useful.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tape", destination: "/courses", permanent: true },
      { source: "/leaderboard", destination: "/courses", permanent: true },
      { source: "/analysis", destination: "/courses", permanent: true },
      { source: "/analysis/:path*", destination: "/courses", permanent: true },
      // old ebook receipts pointed at /courses?purchased=…&session_id=…
      { source: "/courses", has: [{ type: "query", key: "purchased" }], destination: "/playbooks", permanent: false },
    ];
  },
};

export default nextConfig;
