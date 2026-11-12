export type PillarId = "teach" | "show" | "believe" | "entertain";

export type Platform = "instagram" | "tiktok" | "youtube_shorts" | "linkedin";

export interface Owner {
  name: string;
  role: string;
}

export interface Source {
  url: string;
  title: string;
  chars: number;
}

export interface Story {
  title: string;
  summary: string;
  pillar: PillarId;
}

export interface TrustGap {
  gap: string;
  fix: string;
}

export interface PillarPlan {
  pillar: PillarId;
  weight: number; // share of the weekly mix, 0-100
  angle: string;
  examples: string[];
}

/** What the analysis agent learns about a business. Every claim must trace to the sources or the owner's own words. */
export interface BrandBrief {
  oneLiner: string;
  whoTheyServe: string;
  whatTheySell: string;
  coreAssociation: string;
  voice: { traits: string[]; phrases: string[]; avoid: string[] };
  originStory: string;
  proofPoints: string[];
  stories: Story[];
  beliefs: string[];
  expertiseTopics: string[];
  customerQuestions: string[];
  trustGaps: TrustGap[];
  pillarStrategy: PillarPlan[];
  missingInfo: string[];
}

export type BusinessStatus = "new" | "analyzing" | "ready" | "error";

/** Teleprompter (Shoot stage). Voice follows the owner's speech; timed hits a target length; manual is a fixed pace. */
export type TeleprompterMode = "voice" | "timed" | "manual";

export interface TeleprompterSettings {
  mode: TeleprompterMode;
  /** Target length for timed mode, in seconds. */
  targetSeconds: number;
  /** How much of the script shows on screen. */
  narration: "full" | "bullets" | "hook" | "off";
  /** Font size in px. */
  textSize: number;
  /** Speed for manual mode, in words per minute. */
  manualWpm: number;
}

/** 1 = Raw (jump cuts, plain captions) … 5 = Polished (fully produced). See src/lib/editStyles.ts. */
export type EditStyleStep = 1 | 2 | 3 | 4 | 5;

/** Per-business defaults the Shoot and Edit stages read. */
export interface BusinessSettings {
  teleprompter: TeleprompterSettings;
  editStyle: EditStyleStep;
}

export interface Business {
  id: string;
  createdAt: string;
  /** Who owns this business. Until Accounts ships, everything lives in the "default" workspace. */
  workspaceId: string;
  name: string;
  website: string;
  owner: Owner;
  socials: string;
  audience: string;
  offer: string;
  brainDump: string;
  notes: string;
  sources: Source[];
  brief: BrandBrief | null;
  status: BusinessStatus;
  error?: string;
  settings: BusinessSettings;
  audienceResearch?: AudienceResearch | null;
}

export type ScriptStatus = "draft" | "approved" | "shot" | "posted";

export interface Script {
  id: string;
  businessId: string;
  createdAt: string;
  batch: string;
  pillar: PillarId;
  formatId: string;
  title: string;
  hooks: string[];
  selectedHook: number;
  body: string;
  shotNotes: string[];
  cta: string;
  platforms: Platform[];
  estSeconds: number;
  whyItBuildsTrust: string;
  status: ScriptStatus;
  revisionNote?: string;
  /** Overrides the business's edit style for this video. Unset means use the business default. */
  editStyle?: EditStyleStep | null;
}

/** Where a pasted video link comes from. */
export type VideoPlatform = "tiktok" | "instagram" | "youtube" | "linkedin";

/** What the platform's public oEmbed endpoint says about a post. Never the video itself. */
export interface VideoMeta {
  title: string;
  author: string;
  provider: string;
}

/** A structural breakdown of a video. Anything not visible in the metadata or the owner's note is a [FILL: ...]. */
export interface VideoBreakdown {
  name: string;
  hook: string;
  structure: string[];
  pillar: PillarId;
  length: string;
  whyItWorks: string;
}

/** A video the owner likes. Stores only the link, their note, and the breakdown. */
export interface ReferenceVideo {
  id: string;
  businessId: string;
  createdAt: string;
  url: string;
  platform: VideoPlatform;
  note: string;
  meta: VideoMeta | null;
  breakdown: VideoBreakdown;
  /** Set once the owner saves it to the format library. */
  formatId?: string;
}

/** Content popular with the business's buyers, found with web search. Every item has a real source URL. */
export interface AudienceItem {
  id: string;
  title: string;
  /** Link to the post or video itself when a search returned it; otherwise the same as sourceUrl. */
  url: string;
  /** The page where it was found. Always a URL the search actually returned. */
  sourceUrl: string;
  sourceTitle: string;
  creator: string;
  platform: string;
  breakdown: VideoBreakdown;
  formatId?: string;
}

export interface AudienceResearch {
  ranAt: string;
  /** The audience description the research was run for. */
  audience: string;
  summary: string;
  items: AudienceItem[];
  searches: number;
  /** Items the agent proposed but we dropped because their source wasn't in the search results. */
  dropped: number;
}

export interface NewBusinessInput {
  name: string;
  website: string;
  owner: Owner;
  socials: string;
  audience: string;
  offer: string;
  brainDump: string;
  notes: string;
}

/** A per-workspace API key for the MCP server. Only the SHA-256 hash is stored; the key is shown once. */
export interface ApiKey {
  id: string;
  workspaceId: string;
  name: string;
  /** First characters of the key, for recognizing it in the list. */
  prefix: string;
  hash: string;
  createdAt: string;
  lastUsedAt?: string;
  revokedAt?: string;
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}

/** owner = the business owner (CEO). Operators are Frontman team members, set by FRONTMAN_OPERATOR_EMAILS. */
export interface Member {
  workspaceId: string;
  userId: string;
  email: string;
  role: "owner" | "operator";
  createdAt: string;
}

/** A private link that opens the phone recorder for one business's shoot. The token is the permission. */
export interface ShootLink {
  token: string;
  businessId: string;
  workspaceId: string;
  /** The script the owner opened the link for; the phone can switch to other approved scripts. */
  scriptId: string;
  createdAt: string;
  expiresAt: string;
  /** Set the first time the phone opens the link, so the dashboard can say "Phone connected". */
  openedAt?: string | null;
}

export interface Take {
  id: string;
  businessId: string;
  scriptId: string;
  createdAt: string;
  source: "phone" | "upload";
  /** Path in the takes storage bucket. */
  path: string;
  mime: string;
  status: "uploading" | "ready";
  bytes?: number;
  seconds?: number;
}
