import { NextResponse } from "next/server";
import { coachInput } from "@/lib/coachInput";
import { coachTakeFor, linkFromToken } from "@/lib/shoot";
import { fail } from "../../../../../_util";

export const maxDuration = 300;

/** Public (token): the phone sends sampled frames right after a take uploads. */
export async function POST(req: Request, { params }: { params: Promise<{ token: string; takeId: string }> }) {
  try {
    const { token, takeId } = await params;
    const { business } = await linkFromToken(token);
    const t = await coachTakeFor(business, takeId, coachInput(await req.json().catch(() => ({}))));
    return NextResponse.json({ coach: t.coach });
  } catch (e) {
    return fail(e);
  }
}
