import { NextResponse } from "next/server";
import { finishTake, linkFromToken } from "@/lib/shoot";
import { fail } from "../../../../../_util";

export async function POST(_req: Request, { params }: { params: Promise<{ token: string; takeId: string }> }) {
  try {
    const { token, takeId } = await params;
    const { business } = await linkFromToken(token);
    return NextResponse.json({ take: await finishTake(business, takeId) });
  } catch (e) {
    return fail(e);
  }
}
