import { createHash, randomBytes } from "crypto";
import { newId, store } from "./store";
import type { ApiKey } from "./types";

const PREFIX = "fm_";

export function hashKey(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

/** Create a key. The full key is returned once and never stored, only its hash. */
export async function createApiKey(workspaceId: string, name: string): Promise<{ key: string; record: ApiKey }> {
  const key = PREFIX + randomBytes(32).toString("base64url");
  const record: ApiKey = {
    id: newId(),
    workspaceId,
    name: name.trim().slice(0, 80) || "API key",
    prefix: key.slice(0, 10),
    hash: hashKey(key),
    createdAt: new Date().toISOString(),
  };
  await store().saveApiKey(record);
  return { key, record };
}

export async function revokeApiKey(workspaceId: string, id: string): Promise<ApiKey> {
  const s = store();
  const k = (await s.listApiKeys(workspaceId)).find((x) => x.id === id);
  if (!k) throw new Error("Key not found.");
  if (k.revokedAt) return k;
  return s.saveApiKey({ ...k, revokedAt: new Date().toISOString() });
}

/** Returns the key's record if it's valid and not revoked. Records use at most once a minute to avoid write churn. */
export async function verifyApiKey(raw: string | null | undefined): Promise<ApiKey | null> {
  if (!raw || !raw.startsWith(PREFIX) || raw.length < 20) return null;
  const s = store();
  const k = await s.findApiKeyByHash(hashKey(raw.trim()));
  if (!k || k.revokedAt) return null;
  const now = Date.now();
  if (!k.lastUsedAt || now - new Date(k.lastUsedAt).getTime() > 60_000) {
    await s.saveApiKey({ ...k, lastUsedAt: new Date(now).toISOString() }).catch(() => undefined);
  }
  return k;
}

/** Public view of a key: never includes the hash. */
export function publicKey(k: ApiKey) {
  return { id: k.id, name: k.name, prefix: k.prefix, createdAt: k.createdAt, lastUsedAt: k.lastUsedAt ?? null, revokedAt: k.revokedAt ?? null };
}
