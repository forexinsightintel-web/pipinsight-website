import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Trading School — Learn Forex Free | PIP:Insight",
  description: "A free structured trading school: 6 levels, 36 plain-English lessons with quizzes, from absolute zero to a written trading plan. No account, no catch.",
  alternates: { canonical: "/school" },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
