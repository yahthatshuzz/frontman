import type { Metadata, Viewport } from "next";
import { Recorder } from "@/components/Recorder";
import { phoneSession, ShootError } from "@/lib/shoot";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Frontman · Record", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, viewportFit: "cover", themeColor: "#000000" };

export default async function RecordPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ preview?: string }> }) {
  const { token } = await params;
  const { preview } = await searchParams;
  try {
    const session = await phoneSession(token, { preview: preview === "1" });
    return <Recorder token={token} session={session} />;
  } catch (e) {
    const message = e instanceof ShootError ? e.message : "Something went wrong opening this shoot. Scan the QR code again.";
    return (
      <main className="rec rec-msg">
        <div>
          <p className="rec-brand">Frontman</p>
          <h1>Can&apos;t open this shoot</h1>
          <p>{message}</p>
        </div>
      </main>
    );
  }
}
