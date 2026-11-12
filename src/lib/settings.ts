import { DEFAULT_EDIT_STYLE, isEditStyle } from "./editStyles";
import { DEFAULT_TELEPROMPTER, normalizeTeleprompter } from "./teleprompter";
import type { Business, BusinessSettings, EditStyleStep, TeleprompterSettings } from "./types";

/** Until Accounts (roadmap step 1) ships, every business and API key belongs to this workspace. */
export const DEFAULT_WORKSPACE = "default";

export function defaultSettings(): BusinessSettings {
  return { teleprompter: { ...DEFAULT_TELEPROMPTER }, editStyle: DEFAULT_EDIT_STYLE };
}

/** Fill in fields that older saved records don't have, so every reader gets a complete Business. */
export function normalizeBusiness(b: Business): Business {
  const s = (b.settings ?? {}) as Partial<BusinessSettings>;
  return {
    ...b,
    workspaceId: b.workspaceId || DEFAULT_WORKSPACE,
    settings: {
      teleprompter: normalizeTeleprompter(s.teleprompter),
      editStyle: isEditStyle(s.editStyle) ? s.editStyle : DEFAULT_EDIT_STYLE,
    },
  };
}

export interface SettingsPatch {
  teleprompter?: Partial<TeleprompterSettings>;
  editStyle?: EditStyleStep;
}

export function applySettingsPatch(cur: BusinessSettings, patch: SettingsPatch): BusinessSettings {
  return {
    ...cur,
    teleprompter: patch.teleprompter ? normalizeTeleprompter({ ...cur.teleprompter, ...patch.teleprompter }) : cur.teleprompter,
    editStyle: isEditStyle(patch.editStyle) ? patch.editStyle : cur.editStyle,
  };
}
