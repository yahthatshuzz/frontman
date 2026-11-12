"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "login" | "signup" | "forgot";

const COPY: Record<Mode, { title: string; sub: string; cta: string }> = {
  login: { title: "Sign in", sub: "Your scripts, shoots and Brand Brief are waiting.", cta: "Sign in" },
  signup: { title: "Create your account", sub: "Frontman turns you into the trusted face of your business.", cta: "Create account" },
  forgot: { title: "Reset your password", sub: "We'll email you a link to set a new one.", cta: "Send the link" },
};

export function AuthForm({ mode, next, needsInvite, notice }: { mode: Mode; next?: string; needsInvite?: boolean; notice?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");
  const c = COPY[mode];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/auth/${mode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, invite }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "That didn't work. Try again.");
      if (json.message) setSent(json.message);
      else window.location.href = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't work. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth-card panel">
        <div className="brand" aria-hidden="true">
          <i className="dot" />
          <div style={{ display: "grid", gap: 0 }}>
            <b>Frontman</b>
            <small>Terminal</small>
          </div>
        </div>
        <div>
          <h1>{c.title}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {c.sub}
          </p>
        </div>
        {notice && <p className="note">{notice}</p>}
        {sent ? (
          <p className="note" role="status">
            {sent}
          </p>
        ) : (
          <form onSubmit={submit} className="form" style={{ gap: 14 }}>
            <label className="field">
              <span className="label">Email</span>
              <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            {mode !== "forgot" && (
              <label className="field">
                <span className="label">Password</span>
                <input
                  className="input"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  minLength={mode === "signup" ? 8 : undefined}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {mode === "signup" && <span className="hint">At least 8 characters.</span>}
              </label>
            )}
            {mode === "signup" && needsInvite && (
              <label className="field">
                <span className="label">Invite code</span>
                <input className="input" required value={invite} onChange={(e) => setInvite(e.target.value)} />
                <span className="hint">Frontman is invite-only during the pilot. Your code came with your invite.</span>
              </label>
            )}
            {error && (
              <p className="err" role="alert">
                {error}
              </p>
            )}
            <button className="btn primary" type="submit" disabled={busy}>
              {busy ? "One moment…" : c.cta}
            </button>
          </form>
        )}
        <div className="auth-links">
          {mode === "login" ? (
            <>
              <Link href="/signup">Create an account</Link>
              <Link href="/login?mode=forgot">Forgot password?</Link>
            </>
          ) : (
            <Link href="/login">Back to sign in</Link>
          )}
        </div>
      </div>
    </main>
  );
}
