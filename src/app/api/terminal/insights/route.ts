import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { insights } from "@/lib/social/service";
import { fail } from "../../_util";

export const maxDuration = 120;

export async function GET(req: Request) {
  try {
    return NextResponse.json(await insights(await requireCtx(), new URL(req.url).searchParams.get("b") ?? ""), { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return fail(e);
  }
}
