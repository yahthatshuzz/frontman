import { NextResponse } from "next/server";
import { scriptFor, requireCtx } from "@/lib/session";
import { reviseWithNote } from "@/lib/service";
import { fail, str } from "../../../_util";

export const maxDuration = 120;

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await scriptFor(await requireCtx(), id);
    const body = await req.json();
    const note = str(body.note, 2000);
    if (!note) return fail(new Error("Say what you want changed."), 400);
    return NextResponse.json({ script: await reviseWithNote(id, note) });
  } catch (e) {
    return fail(e);
  }
}
