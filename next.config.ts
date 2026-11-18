import type { NextConfig } from "next";

// Old PIP:Insight routes are retired; send visitors somewhere useful.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tape", destination: "/courses", permanent: true },
      { source: "/leaderboard", destination: "/courses", permanent: true },
      { source: "/analysis", destination: "/courses", permanent: true },
      { source: "/analysis/:path*", destination: "/courses", permanent: true },
      // The old Free School and Free Toolkit pages are replaced by the complete free course.
      { source: "/school", destination: "/courses/forex-from-zero", permanent: true },
      { source: "/school/:path*", destination: "/courses/forex-from-zero", permanent: true },
      { source: "/free", destination: "/courses/forex-from-zero", permanent: true },
      // The Foundry Journal is switched off until the new version is ready.
      { source: "/journal", destination: "/", permanent: false },
      { source: "/journal/:path*", destination: "/", permanent: false },
      // old ebook receipts pointed at /courses?purchased=…&session_id=…
      { source: "/courses", has: [{ type: "query", key: "purchased" }], destination: "/playbooks", permanent: false },
    ];
  },
};

export default nextConfig;
