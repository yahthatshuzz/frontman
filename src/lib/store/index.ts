import { missingSetup, SetupError } from "../setup";
import { normalizeBusiness } from "../settings";
import type { Format } from "../formats";
import type { ApiKey, Business, Member, ReferenceVideo, Script, ShootLink, Take, Workspace } from "../types";
import { fileStore } from "./file";
import { supabaseStore } from "./supabase";

export interface Store {
  listBusinesses(): Promise<Business[]>;
  getBusiness(id: string): Promise<Business | null>;
  saveBusiness(b: Business): Promise<Business>;
  listScripts(businessId: string): Promise<Script[]>;
  getScript(id: string): Promise<Script | null>;
  saveScripts(scripts: Script[]): Promise<Script[]>;
  listReferences(businessId: string): Promise<ReferenceVideo[]>;
  getReference(id: string): Promise<ReferenceVideo | null>;
  saveReference(r: ReferenceVideo): Promise<ReferenceVideo>;
  deleteReference(id: string): Promise<void>;
  /** Formats a business saved (from references or audience research). Built-in formats live in formats.ts. */
  listFormats(businessId: string): Promise<Format[]>;
  saveFormat(f: Format): Promise<Format>;
  listApiKeys(workspaceId: string): Promise<ApiKey[]>;
  findApiKeyByHash(hash: string): Promise<ApiKey | null>;
  saveApiKey(k: ApiKey): Promise<ApiKey>;
  getMembership(userId: string): Promise<Member | null>;
  createWorkspace(w: Workspace, first: Member): Promise<Member>;
  saveShootLink(l: ShootLink): Promise<ShootLink>;
  getShootLink(token: string): Promise<ShootLink | null>;
  latestShootLink(businessId: string): Promise<ShootLink | null>;
  listTakes(businessId: string): Promise<Take[]>;
  getTake(id: string): Promise<Take | null>;
  saveTake(t: Take): Promise<Take>;
  deleteTake(id: string): Promise<void>;
  /** Generic records (social accounts, posts). `status` and `dueAt` are queryable for the scheduler. */
  listRecords<T extends StoredRecord>(kind: string, businessId: string): Promise<T[]>;
  dueRecords<T extends StoredRecord>(kind: string, status: string, before: string): Promise<T[]>;
  getRecord<T extends StoredRecord>(id: string): Promise<T | null>;
  saveRecord<T extends StoredRecord>(r: T): Promise<T>;
  deleteRecord(id: string): Promise<void>;
}

export interface StoredRecord {
  id: string;
  kind: string;
  businessId: string;
  createdAt: string;
  status?: string;
  dueAt?: string | null;
}

/** Supabase when configured, otherwise a local JSON file for development. Businesses come back with defaults filled in. */
export function store(): Store {
  // A hosted deployment has a read-only disk, so never fall back to the local file there.
  if (missingSetup().length) throw new SetupError();
  const base = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? supabaseStore() : fileStore();
  return {
    ...base,
    async listBusinesses() {
      return (await base.listBusinesses()).map(normalizeBusiness);
    },
    async getBusiness(id) {
      const b = await base.getBusiness(id);
      return b ? normalizeBusiness(b) : null;
    },
  };
}

export function newId(): string {
  return crypto.randomUUID();
}
