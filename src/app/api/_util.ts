import { NextResponse } from "next/server";

export function fail(e: unknown, status?: number) {
  const message = e instanceof Error ? e.message : "Something went wrong.";
  const own = e && typeof e === "object" && "status" in e && typeof e.status === "number" ? e.status : undefined;
  return NextResponse.json({ error: message }, { status: status ?? own ?? 500 });
}

export function str(v: unknown, max = 20000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
