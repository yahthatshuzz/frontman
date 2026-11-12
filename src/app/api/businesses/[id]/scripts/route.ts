import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { createScripts } from "@/lib/service";
import { store } from "@/lib/store";
import { fail } from "../../../_util";

export const maxDuration = 300;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await businessFor(await requireCtx(), id);
    return NextResponse.json({ scripts: await store().listScripts(id) });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await businessFor(await requireCtx(), id);
    const body = await req.json().catch(() => ({}));
    const count = typeof body.count === "number" ? body.count : 8;
    return NextResponse.json({ scripts: await createScripts(id, count) });
  } catch (e) {
    return fail(e);
  }
}
