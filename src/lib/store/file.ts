import { promises as fs } from "fs";
import path from "path";
import type { Format } from "../formats";
import type { ApiKey, Business, Member, ReferenceVideo, Script, ShootLink, Take, Workspace } from "../types";
import type { StoredRecord } from "./index";
import type { Store } from "./index";

interface Db {
  businesses: Business[];
  scripts: Script[];
  references: ReferenceVideo[];
  formats: Format[];
  apiKeys: ApiKey[];
  workspaces: Workspace[];
  members: Member[];
  shootLinks: ShootLink[];
  takes: Take[];
  records: StoredRecord[];
}

const DB_PATH = path.join(process.cwd(), ".data", "db.json");
let queue: Promise<unknown> = Promise.resolve();

async function read(): Promise<Db> {
  try {
    const db = JSON.parse(await fs.readFile(DB_PATH, "utf8")) as Partial<Db>;
    return { businesses: db.businesses ?? [], scripts: db.scripts ?? [], references: db.references ?? [], formats: db.formats ?? [], apiKeys: db.apiKeys ?? [], workspaces: db.workspaces ?? [], members: db.members ?? [], shootLinks: db.shootLinks ?? [], takes: db.takes ?? [], records: db.records ?? [] };
  } catch {
    return { businesses: [], scripts: [], references: [], formats: [], apiKeys: [], workspaces: [], members: [], shootLinks: [], takes: [], records: [] };
  }
}

async function write(db: Db): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  const tmp = DB_PATH + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(db, null, 2));
  await fs.rename(tmp, DB_PATH);
}

/** Serialize read-modify-write so concurrent requests don't clobber each other. */
function mutate<T>(fn: (db: Db) => T): Promise<T> {
  const run = queue.then(async () => {
    const db = await read();
    const out = fn(db);
    await write(db);
    return out;
  });
  queue = run.catch(() => undefined);
  return run;
}

export function fileStore(): Store {
  return {
    async listBusinesses() {
      const db = await read();
      return [...db.businesses].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async getBusiness(id) {
      return (await read()).businesses.find((b) => b.id === id) ?? null;
    },
    saveBusiness(b) {
      return mutate((db) => {
        const i = db.businesses.findIndex((x) => x.id === b.id);
        if (i >= 0) db.businesses[i] = b;
        else db.businesses.push(b);
        return b;
      });
    },
    async listScripts(businessId) {
      const db = await read();
      return db.scripts.filter((s) => s.businessId === businessId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async getScript(id) {
      return (await read()).scripts.find((s) => s.id === id) ?? null;
    },
    saveScripts(scripts) {
      return mutate((db) => {
        for (const s of scripts) {
          const i = db.scripts.findIndex((x) => x.id === s.id);
          if (i >= 0) db.scripts[i] = s;
          else db.scripts.push(s);
        }
        return scripts;
      });
    },
    async listReferences(businessId) {
      const db = await read();
      return db.references.filter((r) => r.businessId === businessId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async getReference(id) {
      return (await read()).references.find((r) => r.id === id) ?? null;
    },
    saveReference(r) {
      return mutate((db) => {
        const i = db.references.findIndex((x) => x.id === r.id);
        if (i >= 0) db.references[i] = r;
        else db.references.push(r);
        return r;
      });
    },
    async deleteReference(id) {
      await mutate((db) => {
        db.references = db.references.filter((r) => r.id !== id);
      });
    },
    async listFormats(businessId) {
      const db = await read();
      return db.formats.filter((f) => f.businessId === businessId).sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    },
    saveFormat(f) {
      return mutate((db) => {
        const i = db.formats.findIndex((x) => x.id === f.id);
        if (i >= 0) db.formats[i] = f;
        else db.formats.push(f);
        return f;
      });
    },
    async listApiKeys(workspaceId) {
      const db = await read();
      return db.apiKeys.filter((k) => k.workspaceId === workspaceId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async findApiKeyByHash(hash) {
      return (await read()).apiKeys.find((k) => k.hash === hash) ?? null;
    },
    saveApiKey(k) {
      return mutate((db) => {
        const i = db.apiKeys.findIndex((x) => x.id === k.id);
        if (i >= 0) db.apiKeys[i] = k;
        else db.apiKeys.push(k);
        return k;
      });
    },
    async getMembership(userId) {
      return (await read()).members.find((m) => m.userId === userId) ?? null;
    },
    createWorkspace(w, first) {
      return mutate((db) => {
        db.workspaces.push(w);
        db.members.push(first);
        return first;
      });
    },
    saveShootLink(l) {
      return mutate((db) => {
        const i = db.shootLinks.findIndex((x) => x.token === l.token);
        if (i >= 0) db.shootLinks[i] = l;
        else db.shootLinks.push(l);
        return l;
      });
    },
    async latestShootLink(businessId) {
      const all = (await read()).shootLinks.filter((l) => l.businessId === businessId);
      return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null;
    },
    async getShootLink(token) {
      return (await read()).shootLinks.find((l) => l.token === token) ?? null;
    },
    async listTakes(businessId) {
      const db = await read();
      return db.takes.filter((t) => t.businessId === businessId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async getTake(id) {
      return (await read()).takes.find((t) => t.id === id) ?? null;
    },
    saveTake(t) {
      return mutate((db) => {
        const i = db.takes.findIndex((x) => x.id === t.id);
        if (i >= 0) db.takes[i] = t;
        else db.takes.push(t);
        return t;
      });
    },
    async deleteTake(id) {
      await mutate((db) => {
        db.takes = db.takes.filter((t) => t.id !== id);
      });
    },
    async listRecords<T extends StoredRecord>(kind: string, businessId: string) {
      return (await read()).records.filter((r) => r.kind === kind && r.businessId === businessId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) as T[];
    },
    async dueRecords<T extends StoredRecord>(kind: string, status: string, before: string) {
      return (await read()).records.filter((r) => r.kind === kind && r.status === status && r.dueAt && r.dueAt <= before) as T[];
    },
    async getRecord<T extends StoredRecord>(id: string): Promise<T | null> {
      return ((await read()).records.find((r) => r.id === id) as T | undefined) ?? null;
    },
    saveRecord<T extends StoredRecord>(r: T) {
      return mutate((db) => {
        const i = db.records.findIndex((x) => x.id === r.id);
        if (i >= 0) db.records[i] = r;
        else db.records.push(r);
        return r;
      });
    },
    async deleteRecord(id: string) {
      await mutate((db) => {
        db.records = db.records.filter((r) => r.id !== id);
      });
    },
  };
}
