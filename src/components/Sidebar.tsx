"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({ email, local }: { email: string | null; local: boolean }) {
  const path = usePathname();
  const on = (href: string) => (href === "/" ? path === "/" || path.startsWith("/b/") : path.startsWith(href));
  return (
    <aside className="side">
      <Link className="brand" href="/">
        <i className="dot" aria-hidden="true" />
        <div style={{ display: "grid", gap: 0 }}>
          <b>Frontman</b>
          <small>Terminal</small>
        </div>
      </Link>
      <nav className="nav" aria-label="Main">
        <div className="nav-label">Workspace</div>
        <Link className={on("/") ? "on" : ""} href="/">
          Businesses
        </Link>
        <Link className={on("/new") ? "on" : ""} href="/new">
          Add a business
        </Link>
        <Link className={on("/formats") ? "on" : ""} href="/formats">
          Format library
        </Link>
        <Link className={on("/settings") ? "on" : ""} href="/settings/api-keys">
          API keys
        </Link>
      </nav>
      <nav className="nav" aria-label="Coming next">
        <div className="nav-label">Coming next</div>
        <span className="soon">
          Edit <span className="tag">Next</span>
        </span>
        <span className="soon">
          Post <span className="tag">Next</span>
        </span>
      </nav>
      <div className="side-foot">
        {!local && email && (
          <form action="/auth/signout" method="post" className="who">
            <span title={email}>{email}</span>
            <button className="linkish" type="submit">
              Sign out
            </button>
          </form>
        )}
        Scripts by Claude Opus 5.5
      </div>
    </aside>
  );
}
