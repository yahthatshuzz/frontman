"use client";

import { useState } from "react";

interface KeyView {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
}

function day(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Never";
}

export function ApiKeys({ initialKeys, endpoint }: { initialKeys: KeyView[]; endpoint: string }) {
  const [keys, setKeys] = useState(initialKeys);
  const [name, setName] = useState("");
  const [fresh, setFresh] = useState<{ key: string; name: string } | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy("create");
    setError("");
    try {
      const res = await fetch("/api/keys", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't create a key.");
      setKeys([json.record, ...keys]);
      setFresh({ key: json.key, name: json.record.name });
      setName("");
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't create a key.");
    } finally {
      setBusy("");
    }
  }

  async function revoke(id: string) {
    setBusy(id);
    setError("");
    try {
      const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't revoke the key.");
      setKeys(keys.map((k) => (k.id === id ? json.record : k)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't revoke the key.");
    } finally {
      setBusy("");
    }
  }

  async function copy() {
    if (!fresh) return;
    try {
      await navigator.clipboard.writeText(fresh.key);
      setCopied(true);
    } catch {
      setError("Couldn't copy. Select the key and copy it instead.");
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16 }}>
      <form className="panel ref-form" onSubmit={create}>
        <h3 style={{ margin: 0 }}>Create a key</h3>
        <div className="field">
          <label htmlFor="key-name">Name</label>
          <input id="key-name" className="input" placeholder="e.g. Claude Desktop on my Mac" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
          <span className="hint">So you can tell keys apart later.</span>
        </div>
        <div>
          <button className="btn primary" type="submit" disabled={busy === "create"}>
            {busy === "create" ? "Creating…" : "Create key"}
          </button>
        </div>
      </form>

      {fresh && (
        <div className="panel key-fresh" role="status">
          <b>Copy your new key now. You won&apos;t see it again.</b>
          <code className="key">{fresh.key}</code>
          <div className="row">
            <button className="btn sm primary" type="button" onClick={copy}>
              {copied ? "Copied" : "Copy key"}
            </button>
            <button className="btn sm ghost" type="button" onClick={() => setFresh(null)}>
              I&apos;ve saved it
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}

      <section className="panel">
        <h3>Your keys</h3>
        {keys.length === 0 ? (
          <p className="faint" style={{ margin: 0 }}>
            No keys yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                  <th>Created</th>
                  <th>Last used</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id}>
                    <td style={{ fontWeight: 600 }}>{k.name}</td>
                    <td>
                      <code>{k.prefix}…</code>
                    </td>
                    <td>{day(k.createdAt)}</td>
                    <td>{day(k.lastUsedAt)}</td>
                    <td style={{ textAlign: "right" }}>
                      {k.revokedAt ? (
                        <span className="chip neutral">Revoked</span>
                      ) : (
                        <button className="btn sm ghost" onClick={() => revoke(k.id)} disabled={busy === k.id}>
                          {busy === k.id ? "Revoking…" : "Revoke"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel" style={{ display: "grid", gap: 10 }}>
        <h3 style={{ margin: 0 }}>Connect to Claude</h3>
        <p className="muted" style={{ margin: 0, fontSize: 14 }}>
          Add Frontman as a remote MCP server with this URL, and send your key as a bearer token:
        </p>
        <code className="key">{endpoint}</code>
        <p className="muted" style={{ margin: 0, fontSize: 14 }}>
          Claude Code: <code>claude mcp add --transport http frontman {endpoint} --header &quot;Authorization: Bearer YOUR_KEY&quot;</code>
        </p>
        <p className="faint" style={{ margin: 0, fontSize: 13 }}>
          Running Frontman locally? The README also shows how to run it over stdio for Claude Desktop.
        </p>
      </section>
    </div>
  );
}
