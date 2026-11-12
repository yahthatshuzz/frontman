import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { authClient } from "@/lib/supabase/server";

/** Email links (confirm signup, reset password) land here. Handles both the PKCE `code` and `token_hash` styles. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const nextParam = url.searchParams.get("next") ?? "/";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/";
  const supabase = await authClient();
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  let ok = false;
  if (code) ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  else if (tokenHash && type) ok = !(await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).error;
  // A confirmed signup is now signed in, so skip the "sign in" notice and go straight in.
  const dest = ok ? (next.startsWith("/login") ? "/" : next) : "/login?notice=expired";
  return NextResponse.redirect(new URL(dest, url.origin));
}
