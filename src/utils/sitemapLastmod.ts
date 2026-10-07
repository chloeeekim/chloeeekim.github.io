import { readFileSync, readdirSync } from "node:fs";
import { join, extname, basename } from "node:path";

const BLOG_DIR = "src/data/blog";

/** 프론트매터에서 한 키의 값만 꺼낸다. 따옴표는 벗기고, null 은 비운다. */
const readKey = (frontmatter: string, key: string) => {
  const m = frontmatter.match(new RegExp(`^${key}:[ \\t]*(.+)$`, "m"));
  if (!m) return null;
  const value = m[1].trim().replace(/^["']|["']$/g, "");
  return value && value !== "null" ? value : null;
};

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    // content.config 의 glob 과 같은 규칙: 파일명이 _ 로 시작하면 글이 아니다
    if (entry.name.startsWith("_")) return [];
    return [".md", ".mdx"].includes(extname(entry.name)) ? [path] : [];
  });

/**
 * 글 슬러그 -> lastmod 로 쓸 ISO 문자열.
 *
 * 슬러그를 키로 쓰는 이유: 퍼머링크가 평평해서 URL 의 마지막 칸이 곧 파일명이다
 * (getPath 참고). 디렉토리 규칙을 여기서 또 구현하면 양쪽이 어긋날 수 있는데,
 * 마지막 칸만 보면 _cuda/ 같은 디렉토리가 생기든 말든 그대로 맞는다.
 *
 * 값은 modDatetime ?? pubDatetime 이다. 글 메타의 "Updated:" 표시, JSON-LD 의
 * dateModified 와 같은 기준이다. 목록 정렬은 여기에 엮이지 않는다 - 그쪽은
 * 언제나 pubDatetime 이다(getEntryPublishedMs 참고).
 *
 * astro.config.ts 에서 부르므로 의존성 없이 node:fs 만 쓴다. 프론트매터도
 * 날짜 두 줄만 필요해서 YAML 파서를 들이지 않았다.
 */
export const getPostLastmods = (): Map<string, string> => {
  const map = new Map<string, string>();

  for (const file of walk(BLOG_DIR)) {
    const source = readFileSync(file, "utf-8");
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (!frontmatter) continue;

    if (readKey(frontmatter, "draft") === "true") continue;

    const value =
      readKey(frontmatter, "modDatetime") ?? readKey(frontmatter, "pubDatetime");
    if (!value) continue;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) continue;

    map.set(basename(file, extname(file)), date.toISOString());
  }

  return map;
};

/**
 * 글 퍼머링크일 때만 슬러그를 돌려준다.
 *
 * 글 주소는 /cudaEvent/ 처럼 칸이 하나뿐이다. /tags/cuda/ 나 /series/cuda/ 는
 * 마지막 칸만 보면 글 슬러그와 겹칠 수 있으므로 칸 수로 먼저 걸러낸다.
 */
export const getPostSlugFromUrl = (url: string) => {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    return segments.length === 1 ? segments[0] : "";
  } catch {
    return "";
  }
};
