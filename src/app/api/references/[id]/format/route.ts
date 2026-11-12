import { NextResponse } from "next/server";
import { referenceFor, requireCtx } from "@/lib/session";
import { saveReferenceAsFormat } from "@/lib/service";
import { fail } from "../../../_util";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await referenceFor(await requireCtx(), id);
    return NextResponse.json(await saveReferenceAsFormat(id));
  } catch (e) {
    return fail(e);
  }
}
