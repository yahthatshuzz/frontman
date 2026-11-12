import { NextResponse } from "next/server";
import { authClient, authEnabled } from "@/lib/supabase/server";

export async function POST(req: Request) {
  if (authEnabled()) await (await authClient()).auth.signOut();
  return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
}
