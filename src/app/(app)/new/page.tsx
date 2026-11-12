"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const BRAIN_DUMP_PROMPTS = [
  "Why did you start this business? What was the moment?",
  "What do customers always ask you?",
  "What does your industry get wrong?",
  "A time something went badly wrong, and what you changed",
  "What will you never do, even if it makes money?",
  "Where is this business going in 5 years?",
];

export default function NewBusiness() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!String(data.name || "").trim()) {
      setError("Add the business name to continue.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't save the business.");
      router.push(`/b/${json.business.id}?analyze=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save the business.");
      setBusy(false);
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Onboarding</p>
          <h1>Add a business</h1>
          <p className="sub">The agent reads the website, then studies the owner&apos;s own words. The brain dump matters most.</p>
        </div>
      </div>

      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="panel" style={{ display: "grid", gap: 16 }}>
          <h2>The business</h2>
          <div className="two">
            <div className="field">
              <label htmlFor="name">Business name</label>
              <input className="input" id="name" name="name" placeholder="Acme Coffee" required />
            </div>
            <div className="field">
              <label htmlFor="website">Website</label>
              <input className="input" id="website" name="website" placeholder="acmecoffee.com" />
            </div>
          </div>
          <div className="two">
            <div className="field">
              <label htmlFor="ownerName">Owner&apos;s name</label>
              <input className="input" id="ownerName" name="ownerName" placeholder="Jordan Lee" />
            </div>
            <div className="field">
              <label htmlFor="ownerRole">Owner&apos;s role</label>
              <input className="input" id="ownerRole" name="ownerRole" placeholder="Founder and head roaster" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="socials">Social profiles</label>
            <input className="input" id="socials" name="socials" placeholder="instagram.com/acmecoffee, tiktok.com/@jordanroasts" />
          </div>
          <div className="two">
            <div className="field">
              <label htmlFor="audience">Who they serve</label>
              <textarea className="textarea" id="audience" name="audience" rows={3} placeholder="Commuters and remote workers in Oxford, Ohio" />
            </div>
            <div className="field">
              <label htmlFor="offer">What they sell</label>
              <textarea className="textarea" id="offer" name="offer" rows={3} placeholder="Specialty coffee, roasted in-house; wholesale beans" />
            </div>
          </div>
        </div>

        <div className="panel" style={{ display: "grid", gap: 16 }}>
          <div>
            <h2>The owner, in their own words</h2>
            <p className="sub">Paste a transcript of a 20-minute voice memo or interview. This is where the stories, opinions, and voice come from.</p>
          </div>
          <div className="field">
            <label htmlFor="brainDump">Brain dump transcript</label>
            <textarea className="textarea" id="brainDump" name="brainDump" rows={12} placeholder="Talk through the questions below. Messy is fine." />
            <ul className="prompts">
              {BRAIN_DUMP_PROMPTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="field">
            <label htmlFor="notes">Anything else</label>
            <textarea className="textarea" id="notes" name="notes" rows={4} placeholder="Podcast transcripts, press, reviews, notes from your discovery call" />
            <span className="hint">Paste text from podcasts, interviews, press, or reviews.</span>
          </div>
        </div>

        {error && <p className="err">{error}</p>}
        <div className="row">
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save and analyze"}
          </button>
          <span className="faint" style={{ fontSize: 13 }}>
            Analysis takes about a minute.
          </span>
        </div>
      </form>
    </>
  );
}
