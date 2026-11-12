import { headers } from "next/headers";

/** The public origin of this request (https://your-app.vercel.app), for links in emails and QR codes. */
export async function requestOrigin(): Promise<string> {
  if (process.env.FRONTMAN_PUBLIC_URL) return process.env.FRONTMAN_PUBLIC_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}
