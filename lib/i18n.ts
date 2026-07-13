import vi from "@/messages/vi.json";

export type Dictionary = typeof vi;

const dictionaries: Record<string, Dictionary> = { vi };

export const defaultLocale = "vi" as const;

export function t(): Dictionary {
  return dictionaries[defaultLocale];
}
