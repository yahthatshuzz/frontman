import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { finishTake } from "@/lib/shoot";
import { store } from "@/lib/store";
import { fail } from "../../../_util";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const take = await store().getTake(id);
    if (!take) return fail(new Error("Take not found."), 404);
    const b = await businessFor(await requireCtx(), take.businessId);
    return NextResponse.json({ take: await finishTake(b, id) });
  } catch (e) {
    return fail(e);
  }
}
