import type { CollectionEntry } from "astro:content";
import { getPath } from "./getPath";

export type ContentEntry = CollectionEntry<"blog">;

export const getEntryPath = (
  entry: Pick<ContentEntry, "collection" | "id" | "filePath">
) => getPath(entry.id, entry.filePath);

export const getEntryPublishedMs = (entry: ContentEntry) => {
  const modDatetime = "modDatetime" in entry.data ? entry.data.modDatetime : null;
  return new Date(modDatetime ?? entry.data.pubDatetime).getTime();
};
