import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { deleteTake } from "@/lib/shoot";
import { store } from "@/lib/store";
import { fail } from "../../_util";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const take = await store().getTake(id);
    if (!take) return fail(new Error("Take not found."), 404);
    await deleteTake(await businessFor(await requireCtx(), take.businessId), id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
