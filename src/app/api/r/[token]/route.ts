import { NextResponse } from "next/server";
import { phoneSession } from "@/lib/shoot";
import { fail } from "../../_util";

/** Public: the phone recorder's data. The token is the permission. */
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    return NextResponse.json(await phoneSession(token), { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return fail(e);
  }
}
