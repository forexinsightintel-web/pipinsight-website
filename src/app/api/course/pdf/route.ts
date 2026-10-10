// Course playbook PDF: free for Forex From Zero, otherwise only for buyers of that course
// (or All-Access Pass holders), checked against the signed access cookie.
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { getCourse } from "../../../../lib/academy";
import { COOKIE, verify, canRead } from "../../../../lib/access";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") || "";
  const c = getCourse(slug);
  if (!c) return new Response("Unknown course.", { status: 404 });
  const access = verify((await cookies()).get(COOKIE)?.value);
  if (c.price_gbp > 0 && !canRead(access, slug)) return new Response("Buy the course to download its playbook.", { status: 402 });
  const file = path.join(process.cwd(), "content", "course-pdfs", `${c.slug}.pdf`);
  if (!fs.existsSync(file)) return new Response("Playbook not available yet.", { status: 404 });
  return new Response(fs.readFileSync(file), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="Trading-Foundry-${c.slug}-playbook.pdf"`, "Cache-Control": "private, no-store" },
  });
}
