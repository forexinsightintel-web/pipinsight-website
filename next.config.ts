import type { NextConfig } from "next";

// Old PIP:Insight daily-analysis routes are retired; send visitors to the learning pages.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tape", destination: "/", permanent: true },
      { source: "/leaderboard", destination: "/", permanent: true },
      { source: "/analysis", destination: "/school", permanent: true },
      { source: "/analysis/:path*", destination: "/school", permanent: true },
    ];
  },
};

export default nextConfig;
