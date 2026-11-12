# Frontman Terminal

B2B SaaS that turns business owners into the trusted face of their business through short-form video.
An agent studies the business, Claude Opus 5.5 writes scripts in the owner's voice, the owner approves and shoots,
and the Terminal edits and posts to Instagram, TikTok, YouTube Shorts, and LinkedIn.

## The method (product logic, keep it consistent)

- Thesis: AI can fake any ad, so audiences trust the real owner. Every video builds trust in the person and the vision.
- Trust over virality: give real value away, problem + solution content, borrow wrappers from outside the niche,
  accordion one idea across lengths, balance width (reach) and depth (trust), one core association per owner.
- Four pillars, defined in `src/lib/pillars.ts`. Each maps to how people decide to trust someone:
  - Teach: ability and goodwill
  - Show: honesty and proof
  - Believe: shared values and vision
  - Entertain: likability and reach
- Format library (`src/lib/formats.ts`) stores proven structures, never other creators' videos.
- Agents never invent facts. Unknown specifics become `[FILL: ...]` placeholders, which the UI highlights.

## Stack

- Next.js 16 (App Router, TypeScript), plain CSS in `src/app/globals.css` (tokens at the top, light and dark).
- Claude API via `@anthropic-ai/sdk`. Model `claude-opus-5-5` (override with `FRONTMAN_MODEL`).
  `src/lib/claude.ts` has `structured()`, which streams and uses `output_config.format` (JSON schema) plus `effort`.
  Schemas: every object lists all keys in `required` and sets `additionalProperties: false`.
  `webResearch()` (same file) runs the web search tool (`web_search_20260318`, handles `pause_turn`) and returns notes plus
  the URLs the searches really returned. Web search citations can't be combined with a JSON output format, so agents
  research first, then call `structured()`, then drop anything whose source isn't in that URL set (`src/lib/sourcing.ts`).
- MCP server in `mcp/` (`@modelcontextprotocol/sdk`): Streamable HTTP at `/api/mcp` (stateless, bearer API key) and stdio
  (`npm run mcp`). Tools wrap `workspaceService()` in `src/lib/service.ts`, which limits every call to the key's workspace.
- Storage behind the `Store` interface (`src/lib/store`): Supabase when `SUPABASE_URL` and
  `SUPABASE_SERVICE_ROLE_KEY` are set, otherwise `.data/db.json`. Schema in `supabase/migrations`.
- No API key means demo mode: `src/lib/mock.ts` returns clearly labeled sample output.

## The Terminal app (what owners use)

`/` serves the Terminal: the design prototype turned into the real app. `src/app/route.ts` returns one HTML page
(markup in `src/lib/terminal/body.ts`, styles `public/terminal/terminal.css`, app `public/terminal/app.js`) with
`window.FM_BOOT` (signed-in user, their business, saved state). app.js is a vanilla hash-routed SPA (Home, Studio, Shoot,
Edit, Post, Library, Insights, Brand). In live mode (`LIVE`) it drops all sample data, loads `BOOT.state`, and autosaves
its state (the keys in `SAVE_KEYS`) to `PUT /api/terminal/state`, which stores it on `business.terminal` and mirrors the
onboarding answers into the business fields the agents read (`src/lib/terminal/state.ts`).
- Studio's story bank (`S.bank`, same shape as the prototype's `CATS`) is written by `src/lib/agents/storyBank.ts`
  (`POST /api/terminal/bank`), run from the onboarding build screen or the Studio's empty state.
- "Tell my story" drafts instantly in the browser, then `POST /api/terminal/story` has Claude rewrite it from the
  owner's answers.
- Sections still showing example numbers say so in the UI. Wire each to real data before removing that note.
- Model per agent: `modelFor()` in `src/lib/claude.ts` (Opus 5.5 for writing and judging, Haiku 5.5 for per-frame checks).
- The older React dashboard (businesses list, script board, API keys, Shoot tab) lives under `/workspace`.
- Brand: `src/lib/agents/brandAudit.ts` (master prompt: trust score, known-for, pillar mix and needs, audiences, voice,
  trust gaps, a review of every onboarding answer, first three moves). Run from the build screen and the Brand page.
- Shoot (Terminal): Studio approvals become Script rows (`POST /api/terminal/approve`) so the QR, phone recorder and takes
  work. Delivery coach: `src/lib/agents/coach.ts` (Deepgram words + Haiku per-frame checks + Opus tips); the browser
  samples frames and loudness (`src/lib/coachSample.ts`, `sampleTake()` in app.js) and posts them to the coach routes.
- Edit: `src/lib/agents/edit.ts` (edit plan from word timings; reference-video style profiles from sampled frames),
  `src/lib/render.ts` (Creatomate RenderScript, POST /v2/renders), `src/lib/terminal/edit.ts` (render records on
  `business.terminal.renders`, finished MP4 copied into storage, own-edit uploads).
- Post/Insights: `src/lib/social/` (OAuth per platform, tokens sealed with FRONTMAN_TOKEN_KEY, publish, metrics) on the
  generic `records` table (`kind` = account | post). Supabase pg_cron calls `/api/cron/publish` every 5 minutes with
  CRON_SECRET (stored in Vault). Insights only shows numbers the platforms return; missing ones show a dash.

## Layout

```
src/lib/types.ts          Business, BrandBrief, Script
src/lib/pillars.ts        The four pillars
src/lib/formats.ts        Format library
src/lib/crawl.ts          Website reader (homepage + priority pages)
src/lib/agents/analyze.ts Analysis agent -> BrandBrief
src/lib/agents/scripts.ts Script agent (batch) and revise-with-note; gets saved formats + references as style signals
src/lib/agents/references.ts  Breakdown of a pasted reference video (oEmbed caption + owner's note only)
src/lib/agents/audience.ts    "What your audience is watching" (web search, sourced items only)
src/lib/oembed.ts         Link parsing and public oEmbed metadata (never downloads video)
src/lib/sourcing.ts       URL matching and the keep-only-sourced guard
src/lib/teleprompter.ts   Teleprompter engine for Shoot: voice tracking, timed pace, fallback
src/lib/editStyles.ts     Raw ↔ Polished scale and the brief the Edit stage passes to its prompt
src/lib/settings.ts       Business settings defaults; DEFAULT_WORKSPACE is local mode and pre-Accounts data
src/lib/session.ts        Signed-in context (getCtx/requireCtx), workspace guards businessFor/scriptFor/referenceFor
src/lib/supabase/server.ts  Supabase Auth client (cookies); src/proxy.ts refreshes sessions and redirects to /login
src/lib/shoot.ts          Shoot links (QR), phone session, takes; src/lib/storage.ts signed upload/playback URLs
src/lib/setup.ts          Hosted deploys refuse to run without Supabase keys and show what's missing
src/components/ShootView.tsx  Dashboard Shoot tab (QR + upload in one panel, takes, polling)
src/components/Recorder.tsx   Phone recorder at /r/[token] (teleprompter overlay, MediaRecorder, direct upload)
src/lib/apiKeys.ts        Per-workspace API keys (hashed)
mcp/                      MCP server (server.ts tools, stdio.ts entry); HTTP route at src/app/api/mcp
src/lib/service.ts        Orchestration used by the API routes
src/app/api/...           Route handlers (JSON in, JSON out, { error } on failure)
src/components/Terminal.tsx  Business view: analysis progress, Brand Brief, script board
```

## Commands

- `npm run dev` / `npm run build` / `npm run typecheck` / `npm test` / `npm run mcp` (stdio MCP server)

## Conventions

- All Claude calls go through `structured()` and live in `src/lib/agents`. Prompts share `FRONTMAN_METHOD`.
- Route handlers stay thin and call `src/lib/service.ts`.
- UI copy: plain words from the owner's side ("Approve", "Write this week's scripts"), errors say what to do next.
- Keep the Apple-calm look: white panels, one blue accent, pillar colors only for pillar meaning.

## Roadmap (build in this order)

Steps 1-5 are built in the Terminal (Nov 2026); 3-5 go live as their keys are added (Deepgram, Creatomate, platform apps).
Steps 1 and 2 shipped (Nov 2026). Notes: data access stays server-side with the service role key and code-level workspace
checks; RLS is on with no policies (deny all to the publishable key). The Shoot tab polls every 4 s instead of Realtime.
Uploads are single PUTs to signed URLs (TUS resumable uploads are a later upgrade). Page routes live in `src/app/(app)`.

1. **Accounts (shipped).** Supabase Auth, workspaces, roles (operator = Frontman team, owner = the CEO). Owners see only their
   business. Add row level security policies keyed on workspace membership. `businesses.workspace_id` and `api_keys`
   already exist (everything is in workspace "default"); add a workspaces table + membership, scope the dashboard and
   the API keys page to the signed-in user's workspace, and replace `DEFAULT_WORKSPACE` in the routes.
2. **Shoot (shipped).** In-browser teleprompter for approved scripts (selected hook + body), `MediaRecorder` capture, multiple
   takes per script, uploads to Supabase Storage. One Shoot screen with two ways in, side by side: the phone recorder
   (QR code) and file upload. No laptop-camera recording; owners record on their phone or upload what they shot:
   - Each script gets a `shoot_links` row: random token, script id, workspace id, expires after 24 hours. The Shoot
     page shows a QR for `/r/[token]` (generate with the `qrcode` package).
   - `/r/[token]` is a public, mobile-first page (no login, the token is the permission). It loads the script,
     lets the owner switch scripts from the same shoot, choose narration (full script, bullets, hook only, off),
     text size and scroll speed, and records with `getUserMedia` + `MediaRecorder` (iOS Safari records MP4).
     Must be served over HTTPS.
   - Uploads go straight from the phone to Supabase Storage using a signed upload URL issued per take
     (`createSignedUploadUrl`); use resumable (TUS) uploads for long takes so bad cell signal doesn't lose them.
   - A `takes` row is inserted when the upload finishes; the dashboard subscribes with Supabase Realtime so the
     take appears in the dashboard instantly and the QR status flips to "iPhone connected".
   - Fallback button on the phone page: "Use my camera app" (`<input type="file" accept="video/*" capture>`),
     for best quality or 4K, without the teleprompter overlay.
   - Teleprompter controls on the phone page: Voice / Timed / Manual next to narration,
     text size and speed, starting from `business.settings.teleprompter`. Voice uses `createTracker()` from
     `src/lib/teleprompter.ts` with SpeechRecognition / webkitSpeechRecognition; on iOS Safari restart recognition on
     `end`, and fall back to Timed with `FALLBACK_NOTE` if it keeps failing. Timed uses `timedPace()` and shows the wpm.
3. **Delivery coach.** Score every take on upload, so Edit can pick the best one:
   - From the transcript's word timestamps: pace (words per minute), filler words, long pauses.
   - From sampled frames (face landmarks, e.g. MediaPipe in the browser or a worker): eye contact with the lens.
   - From the audio track: energy (loudness and pitch variation over time).
   - Claude turns the raw numbers into a score, timestamped moments, and 2 to 3 tips for the next take.
     Live version on the phone page: run the same checks in the browser while recording and show small pills.
4. **Edit.** Transcribe takes (Deepgram or AssemblyAI, word timestamps). Claude reads transcript + sampled frames and
   returns an edit decision list as JSON: chosen take, cut ranges, caption lines with timings, hook text overlay,
   B-roll cues. A render worker (Remotion or FFmpeg) turns the list into 9:16 MP4s. Owner can tweak captions and cuts.
   Put `editStyleBrief(effectiveEditStyle(business, script))` in the edit-decision-list prompt; it controls cut density,
   caption style, zooms, B-roll share and the hook overlay.
5. **Post.** Official APIs only, never browser automation on user accounts: Instagram Graph API (Reels, professional
   accounts), TikTok Content Posting API (needs app audit before public posts), YouTube Data API (Shorts upload,
   quota), LinkedIn Posts API (member video). Optionally start with a posting service (for example Ayrshare) and move
   to direct integrations. Claude writes platform-native captions per post. Add a `post_video` MCP tool when this ships.
   Count posted scripts in the actual pillar mix (already counted by status in `PillarMix`).
6. **Learn.** Pull post metrics on a schedule, attach them to scripts, feed winners and losers back into the script
   agent's prompt (hooks, formats, pillars that work for this owner).
7. **Format gallery.** Curated top-performing posts stored as links plus breakdowns (hook, structure, pillar, why it
   works), each convertible into a format template. Merge "What your audience is watching" (`business.audienceResearch`)
   in as an audience filter instead of its own tab; references and saved formats (`custom_formats`) already use the
   same breakdown shape.
