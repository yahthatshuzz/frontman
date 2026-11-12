import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { updateBusinessSettings } from "@/lib/service";
import { fail } from "../../../_util";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await businessFor(await requireCtx(), id);
    const body = await req.json().catch(() => ({}));
    const patch = typeof body === "object" && body ? body : {};
    return NextResponse.json({ business: await updateBusinessSettings(id, patch) });
  } catch (e) {
    return fail(e);
  }
}
