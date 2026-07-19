import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Free Trading Journal — Equity Curve, Discipline Score & AI Analysis | PIP:Insight",
  description: "A proper trading journal, free in your browser: equity curve, calendar heatmap, discipline score, your playbook priced per setup — and an AI analyst on Pro.",
  alternates: { canonical: "/journal" },
};
export default function L({ children }: { children: React.ReactNode }) { return children; }
