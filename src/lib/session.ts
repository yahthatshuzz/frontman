import { DEFAULT_WORKSPACE } from "./settings";
import { newId, store } from "./store";
import { authClient, authEnabled } from "./supabase/server";
import type { Business, ReferenceVideo, Script } from "./types";

/** Who is making this request and which workspace they act in. */
export interface Ctx {
  workspaceId: string;
  userId: string | null;
  email: string | null;
  /** Frontman team members (FRONTMAN_OPERATOR_EMAILS) can see every workspace's businesses. */
  operator: boolean;
  /** Local mode: no Supabase Auth configured, everything is in the default workspace. */
  local: boolean;
}

export class AuthError extends Error {
  status = 401;
  constructor(message = "Sign in to continue.") {
    super(message);
  }
}
export class NotFoundError extends Error {
  status = 404;
}

function operators(): string[] {
  return (process.env.FRONTMAN_OPERATOR_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** The signed-in user's context, or null. Creates the user's workspace the first time they sign in. */
export async function getCtx(): Promise<Ctx | null> {
  if (!authEnabled()) return { workspaceId: DEFAULT_WORKSPACE, userId: null, email: null, operator: true, local: true };
  const supabase = await authClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return null;
  const email = (user.email ?? "").toLowerCase();
  const s = store();
  let member = await s.getMembership(user.id);
  if (!member) {
    const workspace = { id: newId(), name: email ? `${email.split("@")[0]}'s workspace` : "Workspace", createdAt: new Date().toISOString() };
    member = await s.createWorkspace(workspace, { workspaceId: workspace.id, userId: user.id, email, role: "owner", createdAt: workspace.createdAt });
  }
  return { workspaceId: member.workspaceId, userId: user.id, email, operator: operators().includes(email), local: false };
}

export async function requireCtx(): Promise<Ctx> {
  const ctx = await getCtx();
  if (!ctx) throw new AuthError();
  return ctx;
}

export function canSee(ctx: Ctx, b: Pick<Business, "workspaceId">): boolean {
  return ctx.operator || b.workspaceId === ctx.workspaceId;
}

/** Guards: anything outside the caller's workspace looks exactly like something that doesn't exist. */
export async function businessFor(ctx: Ctx, id: string): Promise<Business> {
  const b = await store().getBusiness(id);
  if (!b || !canSee(ctx, b)) throw new NotFoundError("Business not found.");
  return b;
}
export async function scriptFor(ctx: Ctx, id: string): Promise<Script> {
  const sc = await store().getScript(id);
  if (!sc) throw new NotFoundError("Script not found.");
  await businessFor(ctx, sc.businessId).catch(() => {
    throw new NotFoundError("Script not found.");
  });
  return sc;
}
export async function referenceFor(ctx: Ctx, id: string): Promise<ReferenceVideo> {
  const r = await store().getReference(id);
  if (!r) throw new NotFoundError("Reference not found.");
  await businessFor(ctx, r.businessId).catch(() => {
    throw new NotFoundError("Reference not found.");
  });
  return r;
}
export async function visibleBusinesses(ctx: Ctx): Promise<Business[]> {
  return (await store().listBusinesses()).filter((b) => canSee(ctx, b));
}
