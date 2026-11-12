/** Platform tokens are encrypted at rest (AES-256-GCM) with FRONTMAN_TOKEN_KEY. OAuth state is HMAC-signed with it. */
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

function key(): Buffer {
  const k = process.env.FRONTMAN_TOKEN_KEY ?? (process.env.VERCEL ? "" : "frontman-local-dev-key");
  if (!k) throw Object.assign(new Error("Connecting accounts isn't set up yet: add FRONTMAN_TOKEN_KEY in Vercel."), { status: 503 });
  return createHash("sha256").update(k).digest();
}

export function seal(plain: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), enc].map((b) => b.toString("base64url")).join(".");
}

export function open(sealed: string): string {
  const [iv, tag, enc] = sealed.split(".").map((s) => Buffer.from(s, "base64url"));
  const d = createDecipheriv("aes-256-gcm", key(), iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(enc), d.final()]).toString("utf8");
}

export function signState(payload: Record<string, string>): string {
  const body = Buffer.from(JSON.stringify({ ...payload, n: randomBytes(8).toString("hex"), t: Date.now() })).toString("base64url");
  return `${body}.${createHmac("sha256", key()).update(body).digest("base64url")}`;
}

export function readState(state: string): Record<string, string> | null {
  const [body, sig] = state.split(".");
  if (!body || !sig) return null;
  const want = Buffer.from(createHmac("sha256", key()).update(body).digest("base64url"));
  const got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Record<string, string> & { t: number };
  if (Date.now() - Number(p.t) > 20 * 60_000) return null;
  return p;
}
