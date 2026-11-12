import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createFrontmanServer } from "../../../../mcp/server";
import { verifyApiKey } from "@/lib/apiKeys";

// Streamable HTTP, stateless: a fresh server and transport per request, scoped to the API key's workspace.
export const maxDuration = 300;
export const dynamic = "force-dynamic";

function unauthorized() {
  return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32001, message: "Missing or invalid API key. Create one under API keys in Frontman." }, id: null }), {
    status: 401,
    headers: { "content-type": "application/json", "www-authenticate": 'Bearer realm="frontman"' },
  });
}

async function handle(req: Request): Promise<Response> {
  const auth = req.headers.get("authorization") ?? "";
  const key = await verifyApiKey(auth.replace(/^Bearer\s+/i, "").trim());
  if (!key) return unauthorized();
  const server = createFrontmanServer(key.workspaceId);
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await server.connect(transport);
  try {
    return await transport.handleRequest(req);
  } finally {
    // Stateless: nothing to keep between requests.
    void server.close();
  }
}

export const POST = handle;
export const GET = handle;
export const DELETE = handle;
