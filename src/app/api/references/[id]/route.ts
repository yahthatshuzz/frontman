import { NextResponse } from "next/server";
import { referenceFor, requireCtx } from "@/lib/session";
import { removeReference } from "@/lib/service";
import { fail } from "../../_util";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await referenceFor(await requireCtx(), id);
    await removeReference(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
