/**
 * Where raw takes live. Supabase Storage (private bucket "takes") in production; `.data/takes/` in local mode.
 * Phones upload straight to storage with a one-time signed URL, so big videos never pass through a Vercel function
 * (those cap request bodies at 4.5 MB).
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const BUCKET = "takes";

/** How the browser should send the file. Always a raw PUT of the file body with these headers. */
export interface UploadTarget {
  url: string;
  headers: Record<string, string>;
}

function cloud(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

let client: SupabaseClient | null = null;
function sb(): SupabaseClient {
  if (!client) client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  return client;
}

const LOCAL_DIR = path.join(process.cwd(), ".data", "takes");
function localSecret(): string {
  return process.env.FRONTMAN_LOCAL_SECRET ?? "frontman-local-dev";
}
export function localSig(p: string): string {
  return createHmac("sha256", localSecret()).update(p).digest("base64url");
}
export function localSigOk(p: string, sig: string): boolean {
  const a = Buffer.from(localSig(p));
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}
function safeLocal(p: string): string {
  const full = path.join(LOCAL_DIR, p);
  if (!full.startsWith(LOCAL_DIR + path.sep)) throw new Error("Bad path.");
  return full;
}

export async function uploadTarget(p: string, mime: string): Promise<UploadTarget> {
  if (!cloud()) {
    return { url: `/api/uploads?path=${encodeURIComponent(p)}&sig=${localSig(p)}`, headers: { "content-type": mime } };
  }
  const { data, error } = await sb().storage.from(BUCKET).createSignedUploadUrl(p);
  if (error || !data) throw new Error(`Couldn't start the upload: ${error?.message ?? "no URL returned"}.`);
  return { url: data.signedUrl, headers: { "content-type": mime, "x-upsert": "false", "cache-control": "max-age=3600" } };
}

/** A short-lived URL the dashboard can play. */
export async function playbackUrl(p: string, takeId: string): Promise<string> {
  if (!cloud()) return `/api/takes/${takeId}/file`;
  const { data, error } = await sb().storage.from(BUCKET).createSignedUrl(p, 60 * 60 * 6);
  if (error || !data) return "";
  return data.signedUrl;
}

/** Size in bytes if the object exists, otherwise null. Used to confirm an upload really landed. */
export async function objectSize(p: string): Promise<number | null> {
  if (!cloud()) {
    try {
      return (await fs.stat(safeLocal(p))).size;
    } catch {
      return null;
    }
  }
  const dir = p.split("/").slice(0, -1).join("/");
  const name = p.split("/").pop()!;
  const { data } = await sb().storage.from(BUCKET).list(dir, { search: name, limit: 5 });
  const hit = data?.find((o) => o.name === name);
  if (!hit) return null;
  const size = (hit.metadata as { size?: number } | null)?.size;
  return typeof size === "number" ? size : 0;
}

export async function removeObject(p: string): Promise<void> {
  if (!cloud()) {
    await fs.rm(safeLocal(p), { force: true });
    return;
  }
  await sb().storage.from(BUCKET).remove([p]);
}

// Local mode only.
export async function writeLocal(p: string, body: ArrayBuffer): Promise<void> {
  const full = safeLocal(p);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, Buffer.from(body));
}
export async function readLocal(p: string): Promise<Buffer> {
  return fs.readFile(safeLocal(p));
}
export function isCloudStorage(): boolean {
  return cloud();
}
