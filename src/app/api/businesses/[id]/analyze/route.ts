import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { runAnalysis } from "@/lib/service";
import { fail } from "../../../_util";

export const maxDuration = 300;

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await businessFor(await requireCtx(), id);
    return NextResponse.json({ business: await runAnalysis(id) });
  } catch (e) {
    return fail(e);
  }
}
