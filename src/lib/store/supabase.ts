import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Format } from "../formats";
import type { ApiKey, Business, Member, ReferenceVideo, Script, ShootLink, Take } from "../types";
import type { Store, StoredRecord } from "./index";

// Rows keep queryable columns flat and the rest of the record in a jsonb `data` column.
// Schema: supabase/migrations/

let client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

type Row = { id: string; created_at: string; data: Record<string, unknown> };

function toBusiness(r: Row): Business {
  return { ...(r.data as unknown as Business), id: r.id, createdAt: r.created_at };
}
function toScript(r: Row): Script {
  return { ...(r.data as unknown as Script), id: r.id, createdAt: r.created_at };
}

function toReference(r: Row): ReferenceVideo {
  return { ...(r.data as unknown as ReferenceVideo), id: r.id, createdAt: r.created_at };
}
function toFormat(r: Row): Format {
  return { ...(r.data as unknown as Format), id: r.id, createdAt: r.created_at };
}

function check<T>(res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  return res.data;
}

export function supabaseStore(): Store {
  return {
    async listBusinesses() {
      const rows = check(await db().from("businesses").select("id, created_at, data").order("created_at", { ascending: false }));
      return (rows as Row[]).map(toBusiness);
    },
    async getBusiness(id) {
      const rows = check(await db().from("businesses").select("id, created_at, data").eq("id", id).limit(1));
      return rows && (rows as Row[])[0] ? toBusiness((rows as Row[])[0]) : null;
    },
    async saveBusiness(b) {
      check(
        await db()
          .from("businesses")
          .upsert({
            id: b.id,
            created_at: b.createdAt,
            workspace_id: b.workspaceId || "default",
            name: b.name,
            status: b.status,
            edit_style: b.settings?.editStyle ?? 2,
            data: b,
          }),
      );
      return b;
    },
    async listScripts(businessId) {
      const rows = check(
        await db()
          .from("scripts")
          .select("id, created_at, data")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false }),
      );
      return (rows as Row[]).map(toScript);
    },
    async getScript(id) {
      const rows = check(await db().from("scripts").select("id, created_at, data").eq("id", id).limit(1));
      return rows && (rows as Row[])[0] ? toScript((rows as Row[])[0]) : null;
    },
    async saveScripts(scripts) {
      if (!scripts.length) return scripts;
      check(
        await db()
          .from("scripts")
          .upsert(
            scripts.map((s) => ({
              id: s.id,
              created_at: s.createdAt,
              business_id: s.businessId,
              status: s.status,
              pillar: s.pillar,
              edit_style: s.editStyle ?? null,
              data: s,
            })),
          ),
      );
      return scripts;
    },
    async listReferences(businessId) {
      const rows = check(
        await db().from("reference_videos").select("id, created_at, data").eq("business_id", businessId).order("created_at", { ascending: false }),
      );
      return (rows as Row[]).map(toReference);
    },
    async getReference(id) {
      const rows = check(await db().from("reference_videos").select("id, created_at, data").eq("id", id).limit(1));
      return rows && (rows as Row[])[0] ? toReference((rows as Row[])[0]) : null;
    },
    async saveReference(r) {
      check(await db().from("reference_videos").upsert({ id: r.id, created_at: r.createdAt, business_id: r.businessId, url: r.url, data: r }));
      return r;
    },
    async deleteReference(id) {
      check(await db().from("reference_videos").delete().eq("id", id));
    },
    async listFormats(businessId) {
      const rows = check(
        await db().from("custom_formats").select("id, created_at, data").eq("business_id", businessId).order("created_at", { ascending: false }),
      );
      return (rows as Row[]).map(toFormat);
    },
    async saveFormat(f) {
      check(await db().from("custom_formats").upsert({ id: f.id, created_at: f.createdAt, business_id: f.businessId, data: f }));
      return f;
    },
    async listApiKeys(workspaceId) {
      const rows = check(await db().from("api_keys").select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false }));
      return (rows as KeyRow[]).map(toKey);
    },
    async findApiKeyByHash(hash) {
      const rows = check(await db().from("api_keys").select("*").eq("key_hash", hash).limit(1));
      return rows && (rows as KeyRow[])[0] ? toKey((rows as KeyRow[])[0]) : null;
    },
    async saveApiKey(k) {
      check(
        await db()
          .from("api_keys")
          .upsert({
            id: k.id,
            workspace_id: k.workspaceId,
            name: k.name,
            prefix: k.prefix,
            key_hash: k.hash,
            created_at: k.createdAt,
            last_used_at: k.lastUsedAt ?? null,
            revoked_at: k.revokedAt ?? null,
          }),
      );
      return k;
    },
    async getMembership(userId) {
      const rows = check(await db().from("workspace_members").select("*").eq("user_id", userId).order("created_at").limit(1));
      const r = (rows as MemberRow[] | null)?.[0];
      return r ? { workspaceId: r.workspace_id, userId: r.user_id, email: r.email, role: r.role, createdAt: r.created_at } : null;
    },
    async createWorkspace(w, first) {
      check(await db().from("workspaces").insert({ id: w.id, name: w.name, created_at: w.createdAt }));
      check(
        await db()
          .from("workspace_members")
          .insert({ workspace_id: first.workspaceId, user_id: first.userId, email: first.email, role: first.role, created_at: first.createdAt }),
      );
      return first;
    },
    async saveShootLink(l) {
      check(
        await db().from("shoot_links").upsert({
          token: l.token,
          business_id: l.businessId,
          workspace_id: l.workspaceId,
          script_id: l.scriptId,
          created_at: l.createdAt,
          expires_at: l.expiresAt,
          opened_at: l.openedAt ?? null,
        }),
      );
      return l;
    },
    async getShootLink(token) {
      const rows = check(await db().from("shoot_links").select("*").eq("token", token).limit(1));
      const r = (rows as LinkRow[] | null)?.[0];
      return r ? toLink(r) : null;
    },
    async latestShootLink(businessId) {
      const rows = check(await db().from("shoot_links").select("*").eq("business_id", businessId).order("created_at", { ascending: false }).limit(1));
      const r = (rows as LinkRow[] | null)?.[0];
      return r ? toLink(r) : null;
    },
    async listTakes(businessId) {
      const rows = check(await db().from("takes").select("id, created_at, data").eq("business_id", businessId).order("created_at", { ascending: false }));
      return (rows as Row[]).map(toTake);
    },
    async getTake(id) {
      const rows = check(await db().from("takes").select("id, created_at, data").eq("id", id).limit(1));
      return rows && (rows as Row[])[0] ? toTake((rows as Row[])[0]) : null;
    },
    async saveTake(t) {
      check(await db().from("takes").upsert({ id: t.id, created_at: t.createdAt, business_id: t.businessId, script_id: t.scriptId, status: t.status, data: t }));
      return t;
    },
    async deleteTake(id) {
      check(await db().from("takes").delete().eq("id", id));
    },
    async listRecords<T extends StoredRecord>(kind: string, businessId: string) {
      const rows = check(await db().from("records").select("data").eq("kind", kind).eq("business_id", businessId).order("created_at", { ascending: false }));
      return (rows as { data: T }[]).map((r) => r.data);
    },
    async dueRecords<T extends StoredRecord>(kind: string, status: string, before: string) {
      const rows = check(await db().from("records").select("data").eq("kind", kind).eq("status", status).lte("due_at", before).limit(50));
      return (rows as { data: T }[]).map((r) => r.data);
    },
    async getRecord<T extends StoredRecord>(id: string): Promise<T | null> {
      const rows = check(await db().from("records").select("data").eq("id", id).limit(1));
      return (rows as { data: T }[])[0]?.data ?? null;
    },
    async saveRecord<T extends StoredRecord>(r: T) {
      check(await db().from("records").upsert({ id: r.id, kind: r.kind, business_id: r.businessId, status: r.status ?? null, due_at: r.dueAt ?? null, created_at: r.createdAt, data: r }));
      return r;
    },
    async deleteRecord(id: string) {
      check(await db().from("records").delete().eq("id", id));
    },
  };
}

type MemberRow = { workspace_id: string; user_id: string; email: string; role: Member["role"]; created_at: string };
type LinkRow = { token: string; business_id: string; workspace_id: string; script_id: string; created_at: string; expires_at: string; opened_at: string | null };
function toLink(r: LinkRow): ShootLink {
  return { token: r.token, businessId: r.business_id, workspaceId: r.workspace_id, scriptId: r.script_id, createdAt: r.created_at, expiresAt: r.expires_at, openedAt: r.opened_at };
}
function toTake(r: Row): Take {
  return { ...(r.data as unknown as Take), id: r.id, createdAt: r.created_at };
}

type KeyRow = {
  id: string;
  workspace_id: string;
  name: string;
  prefix: string;
  key_hash: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
};
function toKey(r: KeyRow): ApiKey {
  return {
    id: r.id,
    workspaceId: r.workspace_id,
    name: r.name,
    prefix: r.prefix,
    hash: r.key_hash,
    createdAt: r.created_at,
    lastUsedAt: r.last_used_at ?? undefined,
    revokedAt: r.revoked_at ?? undefined,
  };
}
