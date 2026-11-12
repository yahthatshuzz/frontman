# Frontman Terminal

The agent that studies a business, then writes trust-building scripts in the owner's voice.

**What works today**

- **Add a business:** website, socials, audience, offer, and the owner's brain-dump transcript.
- **Analysis agent (Claude Opus 5.5):** reads the website and the owner's words, then writes a Brand Brief. The brief covers core association, voice, origin story, stories by pillar, beliefs, customer questions, trust gaps, the target pillar mix, and questions to ask the owner next.
- **Script agent:** writes the weekly script bank. Each script gets a pillar, a format from the library, 3 hooks, the spoken script, shot notes, a CTA, platforms, and why it builds trust.
- **Owner review:** choose a hook, approve, edit inline, or "Tweak with Claude" using a plain-language note.
- **Pillar mix:** the target mix next to the owner's actual mix (approved scripts), with what each pillar builds.
- **References:** paste a TikTok, Instagram, YouTube or LinkedIn link. Claude breaks down its structure from the public caption and the owner's note, and the script agent uses it as a style signal. "Save as format" adds it to the library. Only links, notes and breakdowns are stored.
- **What your audience is watching:** web research (Claude's web search tool) into content popular with the business's buyers. Every item links to a source the search actually returned.
- **Settings:** teleprompter defaults (Voice, Timed, Manual; target length) and the Raw ↔ Polished edit style, ready for the Shoot and Edit stages.
- **MCP server:** run Frontman from Claude and other agent tools with a per-workspace API key.
- **Format library:** proven video structures, plus formats each business saved.

- **Accounts:** email + password sign-in (Supabase Auth), one workspace per owner, operators see every workspace, optional invite code.
- **Shoot:** a QR code opens a teleprompter recorder on the owner's phone (Voice, Timed or Manual scrolling). Takes upload straight to Supabase Storage and appear on the dashboard. Owners can also upload videos they already shot.

**Coming next:** Edit (Claude-planned cuts and captions, rendered to 9:16), and Post (official platform APIs). See `CLAUDE.md` for the roadmap.

## Run it

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
npm test                     # teleprompter tracking + source guard
```

- **No API key:** the app runs in demo mode with sample output. Audience research is off in demo mode, because it never shows made-up posts.
- **No Supabase keys:** data is saved to `.data/db.json`.

## Production

1. Create a Supabase project and run every file in `supabase/migrations/` in order (`0001` through `0005`). `0005` also creates the private `takes` storage bucket.
2. In Supabase → Authentication → URL Configuration, set the Site URL to your deployed URL and add `https://YOUR_HOST/auth/callback` to the redirect URLs.
3. Set on your host: `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `FRONTMAN_INVITE_CODE`, `FRONTMAN_OPERATOR_EMAILS`. Optional: `META_OEMBED_TOKEN`.
4. Deploy. Until the Supabase keys are set, a hosted deploy shows an "Almost live" page listing what's missing.

Supabase's built-in email sender is rate-limited; add your own SMTP (Authentication → Emails) before inviting many pilots. The free plan caps each upload at 50 MB.

## MCP server (headless Frontman)

Power users can drive Frontman from Claude instead of the dashboard. The server lives in `mcp/` and exposes these tools, each a thin wrapper over `src/lib/service.ts`:

| Tool | What it does |
| --- | --- |
| `list_businesses` | Businesses in the key's workspace |
| `get_brand_brief` | A business's Brand Brief, target mix and edit style |
| `write_scripts` | Write this week's batch (1-12 scripts, drafts) |
| `list_scripts` | Scripts, filtered by status and pillar |
| `revise_script` | Rewrite one script from a plain-language note |
| `approve_script` | Approve a script |
| `add_reference` | Save a reference video and get its breakdown |

`post_video` comes with the Post stage.

**1. Create a key.** In the dashboard, open **API keys**, name the key, and copy it (it's shown once; only a SHA-256 hash is stored). Every call is limited to that key's workspace. Revoke a key from the same page.

**2a. Connect over HTTP (Streamable HTTP).** The endpoint is `https://YOUR_HOST/api/mcp`, with the key as a bearer token. For Claude Code:

```bash
claude mcp add --transport http frontman https://YOUR_HOST/api/mcp --header "Authorization: Bearer fm_..."
```

Any MCP client that lets you set a request header works the same way. (Custom connectors on claude.ai use OAuth, which Frontman doesn't support yet.)

**2b. Run it locally over stdio.** For Claude Desktop or any client that launches a local process, add this to its MCP config, using the absolute path to this folder:

```json
{
  "mcpServers": {
    "frontman": {
      "command": "/path/to/frontman-terminal/node_modules/.bin/tsx",
      "args": ["/path/to/frontman-terminal/mcp/stdio.ts"],
      "env": {
        "FRONTMAN_API_KEY": "fm_...",
        "ANTHROPIC_API_KEY": "sk-ant-...",
        "SUPABASE_URL": "",
        "SUPABASE_SERVICE_ROLE_KEY": ""
      }
    }
  }
}
```

Or run it by hand with `FRONTMAN_API_KEY=fm_... npm run mcp`. With no Supabase keys it reads the same `.data/db.json` as the dashboard.
