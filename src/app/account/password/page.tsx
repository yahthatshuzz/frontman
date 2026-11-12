"use client";

import { useState } from "react";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/auth/password", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(json.error || "Couldn't update your password. Try again.");
    window.location.href = "/";
  }

  return (
    <main className="auth">
      <form className="auth-card panel form" onSubmit={submit}>
        <h1>Set a new password</h1>
        <label className="field">
          <span className="label">New password</span>
          <input className="input" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="hint">At least 8 characters.</span>
        </label>
        {error && (
          <p className="err" role="alert">
            {error}
          </p>
        )}
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save and continue"}
        </button>
      </form>
    </main>
  );
}
