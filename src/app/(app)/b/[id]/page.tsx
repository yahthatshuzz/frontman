import { notFound, redirect } from "next/navigation";
import { canSee, getCtx } from "@/lib/session";
import { Terminal } from "@/components/Terminal";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function BusinessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ analyze?: string }>;
}) {
  const { id } = await params;
  const { analyze } = await searchParams;
  const ctx = await getCtx();
  if (!ctx) redirect("/login");
  const s = store();
  const business = await s.getBusiness(id);
  if (!business || !canSee(ctx, business)) notFound();
  const [scripts, references, formats] = await Promise.all([s.listScripts(id), s.listReferences(id), s.listFormats(id)]);
  return (
    <Terminal initialBusiness={business} initialScripts={scripts} initialReferences={references} initialFormats={formats} autoAnalyze={analyze === "1"} />
  );
}
