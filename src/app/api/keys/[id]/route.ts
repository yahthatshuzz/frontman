import { NextResponse } from "next/server";
import { publicKey, revokeApiKey } from "@/lib/apiKeys";
import { requireCtx } from "@/lib/session";
import { fail } from "../../_util";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return NextResponse.json({ record: publicKey(await revokeApiKey((await requireCtx()).workspaceId, id)) });
  } catch (e) {
    return fail(e);
  }
}
