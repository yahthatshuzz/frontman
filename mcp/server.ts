import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { allFormats } from "../src/lib/formats";
import { PILLAR_BY_ID } from "../src/lib/pillars";
import { workspaceService } from "../src/lib/service";
import { store } from "../src/lib/store";
import type { Business, Script } from "../src/lib/types";

/**
 * Headless Frontman. Every tool is a thin wrapper over src/lib/service.ts, limited to the API key's workspace.
 * post_video is not here yet: the Post stage (roadmap step 5) hasn't been built.
 */

const PILLARS = ["teach", "show", "believe", "entertain"] as const;
const STATUSES = ["draft", "approved", "shot", "posted"] as const;

function ok(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}
function err(e: unknown) {
  return { content: [{ type: "text" as const, text: e instanceof Error ? e.message : "Something went wrong." }], isError: true };
}
async function run(fn: () => Promise<unknown>) {
  try {
    return ok(await fn());
  } catch (e) {
    return err(e);
  }
}

function businessSummary(b: Business) {
  return {
    id: b.id,
    name: b.name,
    owner: b.owner.name ? `${b.owner.name}${b.owner.role ? `, ${b.owner.role}` : ""}` : null,
    status: b.status,
    knownFor: b.brief?.coreAssociation ?? null,
    analyzed: !!b.brief,
  };
}

function scriptView(s: Script, formatNames: Record<string, string>) {
  return {
    id: s.id,
    status: s.status,
    pillar: s.pillar,
    format: formatNames[s.formatId] ?? s.formatId,
    title: s.title,
    selectedHook: s.hooks[s.selectedHook] ?? s.hooks[0],
    hooks: s.hooks,
    body: s.body,
    cta: s.cta,
    shotNotes: s.shotNotes,
    platforms: s.platforms,
    estSeconds: s.estSeconds,
    whyItBuildsTrust: s.whyItBuildsTrust,
    batch: s.batch,
    revisionNote: s.revisionNote ?? null,
  };
}

async function formatNames(businessId: string) {
  return Object.fromEntries(allFormats(await store().listFormats(businessId)).map((f) => [f.id, f.name]));
}

export function createFrontmanServer(workspaceId: string): McpServer {
  const ws = workspaceService(workspaceId);
  const server = new McpServer(
    { name: "frontman", version: "0.1.0" },
    {
      instructions:
        "Frontman turns business owners into the trusted face of their business through short-form video. " +
        "Start with list_businesses to get a business id. Scripts contain [FILL: ...] placeholders where a real detail is needed; " +
        "never fill them with made-up facts. Approve only scripts the owner has seen or asked you to approve.",
    },
  );

  server.registerTool(
    "list_businesses",
    {
      title: "List businesses",
      description: "List the businesses in this workspace, with each one's id, owner, analysis status and what the owner should be known for.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    async () => run(async () => (await ws.listBusinesses()).map(businessSummary)),
  );

  server.registerTool(
    "get_brand_brief",
    {
      title: "Get the Brand Brief",
      description:
        "Get a business's Brand Brief: one-liner, audience, offer, core association, voice, origin story, proof points, stories, beliefs, " +
        "customer questions, trust gaps, the target pillar mix, and questions to ask the owner. Returns null for the brief if the business hasn't been analyzed.",
      inputSchema: { businessId: z.string().describe("The business id from list_businesses.") },
      annotations: { readOnlyHint: true },
    },
    async ({ businessId }) =>
      run(async () => {
        const b = await ws.business(businessId);
        return { business: businessSummary(b), editStyle: b.settings.editStyle, brief: b.brief };
      }),
  );

  server.registerTool(
    "write_scripts",
    {
      title: "Write this week's scripts",
      description:
        "Write a new batch of scripts for a business in the owner's voice, following its target pillar mix and avoiding ideas already written. " +
        "Each script has three hooks, a spoken body, shot notes and a call to action. New scripts start as drafts for the owner to review. " +
        "Takes one to three minutes. The business must be analyzed first.",
      inputSchema: {
        businessId: z.string().describe("The business id from list_businesses."),
        count: z.number().int().min(1).max(12).default(8).describe("How many scripts to write, 1-12. Default 8."),
      },
    },
    async ({ businessId, count }) =>
      run(async () => {
        const scripts = await ws.writeScripts(businessId, count);
        const names = await formatNames(businessId);
        return scripts.map((s) => scriptView(s, names));
      }),
  );

  server.registerTool(
    "list_scripts",
    {
      title: "List scripts",
      description: "List a business's scripts, newest first. Filter by status (draft = needs the owner's review) and by pillar.",
      inputSchema: {
        businessId: z.string().describe("The business id from list_businesses."),
        status: z.enum(STATUSES).optional().describe("Only scripts with this status."),
        pillar: z.enum(PILLARS).optional().describe("Only scripts in this pillar: teach, show, believe or entertain."),
        limit: z.number().int().min(1).max(100).default(50).describe("Maximum scripts to return. Default 50."),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ businessId, status, pillar, limit }) =>
      run(async () => {
        const list = await ws.listScripts(businessId, { status, pillar, limit });
        const names = await formatNames(businessId);
        return list.map((s) => scriptView(s, names));
      }),
  );

  server.registerTool(
    "revise_script",
    {
      title: "Revise a script",
      description:
        "Rewrite one script from a plain-language note, keeping the owner's voice (for example: 'shorter', 'more personal', 'mention the new location'). " +
        "The revised script goes back to draft for the owner to review.",
      inputSchema: {
        scriptId: z.string().describe("The script id from list_scripts or write_scripts."),
        note: z.string().min(1).max(2000).describe("What to change, in plain words."),
      },
    },
    async ({ scriptId, note }) =>
      run(async () => {
        const s = await ws.reviseScript(scriptId, note);
        return scriptView(s, await formatNames(s.businessId));
      }),
  );

  server.registerTool(
    "approve_script",
    {
      title: "Approve a script",
      description: "Mark a script as approved, ready to shoot. Only do this when the owner has approved it or asked you to.",
      inputSchema: { scriptId: z.string().describe("The script id from list_scripts.") },
      annotations: { idempotentHint: true },
    },
    async ({ scriptId }) =>
      run(async () => {
        const s = await ws.approveScript(scriptId);
        return { id: s.id, status: s.status, title: s.title, pillar: PILLAR_BY_ID[s.pillar]?.name ?? s.pillar };
      }),
  );

  server.registerTool(
    "add_reference",
    {
      title: "Add a reference video",
      description:
        "Save a TikTok, Instagram, YouTube or LinkedIn video the owner likes, with a note on what they like about it. " +
        "Frontman stores only the link, the note and a structural breakdown (hook, beats, pillar, length, why it works), never the video. " +
        "Anything not visible from the post's public caption or the note comes back as [FILL: ...]. References shape future scripts as style signals.",
      inputSchema: {
        businessId: z.string().describe("The business id from list_businesses."),
        url: z.url().describe("Full link to the post."),
        note: z.string().max(1000).default("").describe("What the owner likes about it. The more specific, the better the breakdown."),
      },
    },
    async ({ businessId, url, note }) => run(async () => ws.addReference(businessId, url, note)),
  );

  return server;
}
