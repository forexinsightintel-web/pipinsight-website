// Course access without accounts: a paid Stripe Checkout session unlocks courses, and the
// unlocked list is kept in a signed, httpOnly cookie. "all" means the All-Access Pass.
// The cookie is HMAC-signed so it cannot be edited by hand.
import crypto from "crypto";

export const COOKIE = "tf_access";
const secret = () => process.env.ACCESS_SECRET || process.env.STRIPE_SECRET_KEY || "dev-only-secret";

export type Access = { s: string[]; e?: string; p?: string }; // p = paid All-Access checkout id (unlocks playbook downloads)

export function sign(a: Access): string {
  const body = Buffer.from(JSON.stringify(a)).toString("base64url");
  const mac = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${mac}`;
}

export function verify(v?: string | null): Access {
  if (!v || !v.includes(".")) return { s: [] };
  const [body, mac] = v.split(".");
  const good = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (mac.length !== good.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(good))) return { s: [] };
  try { return JSON.parse(Buffer.from(body, "base64url").toString()) as Access; } catch { return { s: [] }; }
}

export const canRead = (a: Access, slug: string) => a.s.includes("all") || a.s.includes(slug);
export const merge = (a: Access, add: string[], email?: string, pass?: string): Access => ({ s: Array.from(new Set([...a.s, ...add])), e: email || a.e, p: pass || a.p });
