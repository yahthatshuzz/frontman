import { NextResponse } from "next/server";
import { createBusiness } from "@/lib/service";
import { requireCtx, visibleBusinesses } from "@/lib/session";
import { fail, str } from "../_util";

export async function GET() {
  try {
    return NextResponse.json({ businesses: await visibleBusinesses(await requireCtx()) });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    const ctx = await requireCtx();
    const body = await req.json();
    const name = str(body.name, 200);
    if (!name) return fail(new Error("Add the business name."), 400);
    const b = await createBusiness({
      name,
      website: str(body.website, 500),
      owner: { name: str(body.ownerName, 200), role: str(body.ownerRole, 200) },
      socials: str(body.socials, 2000),
      audience: str(body.audience, 2000),
      offer: str(body.offer, 2000),
      brainDump: str(body.brainDump, 60000),
      notes: str(body.notes, 20000),
    }, ctx.workspaceId);
    return NextResponse.json({ business: b });
  } catch (e) {
    return fail(e);
  }
}
