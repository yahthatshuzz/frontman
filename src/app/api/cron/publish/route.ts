import { NextResponse } from "next/server";
import { publishDue } from "@/lib/social/service";
import { fail } from "../../_util";

export const maxDuration = 300;

/** The scheduler. Called every few minutes with `Authorization: Bearer $CRON_SECRET`. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return fail(new Error("Not allowed."), 401);
  try {
    return NextResponse.json(await publishDue());
  } catch (e) {
    return fail(e);
  }
}
export const POST = GET;
