import { NextResponse } from "next/server";
import { requestOrigin } from "@/lib/origin";
import { authClient } from "@/lib/supabase/server";
import { fail, str } from "../../api/_util";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    await (await authClient()).auth.resetPasswordForEmail(str(body.email, 320), {
      redirectTo: `${await requestOrigin()}/auth/callback?next=/account/password`,
    });
    // Same answer whether or not the account exists, so the form can't be used to check emails.
    return NextResponse.json({ message: "If that email has an account, a reset link is on its way." });
  } catch (e) {
    return fail(e);
  }
}
