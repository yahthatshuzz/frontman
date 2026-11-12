import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { saveAudienceItemAsFormat } from "@/lib/service";
import { fail } from "../../../../../_util";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string; itemId: string }> }) {
  try {
    const { id, itemId } = await params;
    await businessFor(await requireCtx(), id);
    return NextResponse.json(await saveAudienceItemAsFormat(id, itemId));
  } catch (e) {
    return fail(e);
  }
}
