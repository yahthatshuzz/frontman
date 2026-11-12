import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { saveTerminalState } from "@/lib/terminal/state";
import type { TerminalState } from "@/lib/types";
import { fail } from "../../_util";

/** The Terminal autosaves its state here (debounced). Returns the business id, created on first save. */
export async function PUT(req: Request) {
  try {
    const ctx = await requireCtx();
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || typeof body.state !== "object" || !body.state) return fail(new Error("Nothing to save."), 400);
    const b = await saveTerminalState(ctx, typeof body.businessId === "string" ? body.businessId : null, body.state as TerminalState);
    return NextResponse.json({ businessId: b.id, updatedAt: b.terminal?.updatedAt ?? null });
  } catch (e) {
    return fail(e);
  }
}
export const POST = PUT;
