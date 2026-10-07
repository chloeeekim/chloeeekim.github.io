import type { CollectionEntry } from "astro:content";
import { getPath } from "./getPath";

export type ContentEntry = CollectionEntry<"blog">;

export const getEntryPath = (
  entry: Pick<ContentEntry, "collection" | "id" | "filePath">
) => getPath(entry.id, entry.filePath);

/**
 * 목록 정렬에 쓰는 시각. 언제나 pubDatetime 이고 modDatetime 은 보지 않는다.
 *
 * modDatetime 을 섞으면 오타 하나 고친 2016 년 글이 목록 맨 위로 올라와
 * 최신 글처럼 보인다. 수정 시각은 크롤러에게 "이 글이 바뀌었다" 를 알리는
 * 용도이고(사이트맵 lastmod, JSON-LD dateModified), 읽는 순서는 쓴 순서다.
 */
export const getEntryPublishedMs = (entry: ContentEntry) =>
  new Date(entry.data.pubDatetime).getTime();
