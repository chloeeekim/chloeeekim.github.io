import { SERIES, getSlug, type Series } from "@/data/series";
import type { ContentEntry } from "./contentEntry";
import postFilter from "./postFilter";

export type SeriesWithPosts = {
  series: Series;
  /** 발행 시각 오름차순. 쓴 순서가 곧 읽는 순서다. */
  posts: ContentEntry[];
};

export type SeriesContext = SeriesWithPosts & {
  /** 시리즈 안에서 현재 글의 위치 (0-based) */
  index: number;
};

/**
 * 시리즈의 글을 읽는 순서(발행 시각 오름차순)로 돌려준다.
 *
 * getSortedPosts 와 달리 modDatetime 을 보지 않는다. 나중에 오타 하나
 * 고쳤다고 시리즈 순서가 뒤바뀌면 안 되기 때문이다.
 *
 * members 에 있지만 아직 없는 글(드래프트, 예약 발행)은 조용히 건너뛴다.
 */
export const getSeriesPosts = (
  series: Series,
  posts: ContentEntry[]
): ContentEntry[] => {
  const members = new Set(series.members);

  return posts
    .filter(post => members.has(getSlug(post)) && postFilter(post))
    .sort(
      (a, b) =>
        new Date(a.data.pubDatetime).getTime() -
        new Date(b.data.pubDatetime).getTime()
    );
};

/**
 * 발행된 글이 하나라도 있는 시리즈만, 최근에 글이 추가된 순서로.
 *
 * 각 시리즈의 posts 는 오름차순이라 마지막 원소가 그 시리즈의 최신 글이다.
 * 블로그의 다른 목록이 모두 최신순이라 여기만 정의 순서로 두면 어긋나고,
 * 시리즈가 늘 때마다 배열 위치를 손으로 옮겨야 한다.
 */
export const getAllSeries = (posts: ContentEntry[]): SeriesWithPosts[] =>
  SERIES.map(series => ({
    series,
    posts: getSeriesPosts(series, posts),
  }))
    .filter(({ posts }) => posts.length > 0)
    .sort(
      (a, b) =>
        new Date(b.posts.at(-1)!.data.pubDatetime).getTime() -
        new Date(a.posts.at(-1)!.data.pubDatetime).getTime()
    );

/** 글이 속한 시리즈와 그 안에서의 위치. 시리즈에 속하지 않으면 null */
export const getSeriesOfPost = (
  post: ContentEntry,
  posts: ContentEntry[]
): SeriesContext | null => {
  const slug = getSlug(post);

  for (const series of SERIES) {
    if (!series.members.includes(slug)) continue;

    const seriesPosts = getSeriesPosts(series, posts);
    const index = seriesPosts.findIndex(p => getSlug(p) === slug);
    if (index === -1) continue; // 아직 발행 전인 글 자신

    return { series, posts: seriesPosts, index };
  }

  return null;
};

export const getSeriesBySlug = (slug: string) =>
  SERIES.find(series => series.slug === slug);
