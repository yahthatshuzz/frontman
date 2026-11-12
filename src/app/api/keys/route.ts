import { NextResponse } from "next/server";
import { createApiKey, publicKey } from "@/lib/apiKeys";
import { requireCtx } from "@/lib/session";
import { store } from "@/lib/store";
import { fail, str } from "../_util";

export async function GET() {
  try {
    return NextResponse.json({ keys: (await store().listApiKeys((await requireCtx()).workspaceId)).map(publicKey) });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { key, record } = await createApiKey((await requireCtx()).workspaceId, str(body.name, 80));
    return NextResponse.json({ key, record: publicKey(record) });
  } catch (e) {
    return fail(e);
  }
}
