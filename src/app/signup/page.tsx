import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { authEnabled } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  if (!authEnabled()) redirect("/");
  return <AuthForm mode="signup" needsInvite={!!process.env.FRONTMAN_INVITE_CODE} />;
}
