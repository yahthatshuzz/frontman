import { NextResponse } from "next/server";
import { scriptFor, requireCtx } from "@/lib/session";
import { updateScript } from "@/lib/service";
import type { ScriptStatus } from "@/lib/types";
import { fail } from "../../_util";

const STATUSES: ScriptStatus[] = ["draft", "approved", "shot", "posted"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await scriptFor(await requireCtx(), id);
    const body = await req.json();
    if (body.status && !STATUSES.includes(body.status)) return fail(new Error("Unknown status."), 400);
    return NextResponse.json({ script: await updateScript(id, body) });
  } catch (e) {
    return fail(e);
  }
}
