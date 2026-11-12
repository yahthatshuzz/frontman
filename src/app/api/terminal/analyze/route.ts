import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { analyzeForTerminal } from "@/lib/terminal/state";
import { fail, str } from "../../_util";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const ctx = await requireCtx();
    const body = await req.json().catch(() => ({}));
    const id = str(body.businessId, 100);
    if (!id) return fail(new Error("Finish the company questions first."), 400);
    return NextResponse.json(await analyzeForTerminal(ctx, id));
  } catch (e) {
    return fail(e);
  }
}
