/**
 * Local MCP server over stdio, for Claude Desktop, Claude Code and other agent tools on this machine.
 * Run: FRONTMAN_API_KEY=fm_... npm run mcp
 * Uses the same storage as the app: Supabase if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set, otherwise .data/db.json.
 * Never write to stdout here except through the transport; it's the protocol channel.
 */
import path from "path";
import { fileURLToPath } from "url";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { verifyApiKey } from "../src/lib/apiKeys";
import { createFrontmanServer } from "./server";

async function main() {
  // The JSON store lives next to the app, so run from the project root wherever the client starts us.
  process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
  const key = await verifyApiKey(process.env.FRONTMAN_API_KEY);
  if (!key) {
    console.error("Frontman MCP: set FRONTMAN_API_KEY to a valid key (create one under API keys in the Frontman dashboard).");
    process.exit(1);
  }
  const server = createFrontmanServer(key.workspaceId);
  await server.connect(new StdioServerTransport());
  console.error(`Frontman MCP running over stdio for workspace "${key.workspaceId}".`);
}

main().catch((e) => {
  console.error("Frontman MCP failed to start:", e instanceof Error ? e.message : e);
  process.exit(1);
});
