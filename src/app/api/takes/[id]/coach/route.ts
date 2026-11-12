import { NextResponse } from "next/server";
import { coachInput } from "@/lib/coachInput";
import { businessFor, requireCtx } from "@/lib/session";
import { coachTakeFor } from "@/lib/shoot";
import { store } from "@/lib/store";
import { fail } from "../../../_util";

export const maxDuration = 300;

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const take = await store().getTake(id);
    if (!take) return fail(new Error("Take not found."), 404);
    const b = await businessFor(await requireCtx(), take.businessId);
    return NextResponse.json({ take: await coachTakeFor(b, id, coachInput(await req.json().catch(() => ({})))) });
  } catch (e) {
    return fail(e);
  }
}
