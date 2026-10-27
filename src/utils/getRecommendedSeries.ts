import { type ContentEntry } from "./contentEntry";
import { getAllSeries, type SeriesWithPosts } from "./getSeries";

/**
 * 시리즈에 속하지 않은 글 하단에 추천할 시리즈.
 *
 * 시리즈 글은 하단에 자기 목차가 있는데 낱개 글은 아무것도 없었다. 전체
 * 발행일순 prev/next 를 달아 두면 시리즈 중간으로 떨어뜨리게 되고, 거기서는
 * 목차가 시리즈 안만 보여줘서 오히려 길이 끊긴다. 순서를 잇는 대신 "다음에
 * 읽을 묶음" 을 권한다.
 *
 * 고르는 기준은 태그가 몇 개나 겹치는지다. 겹치는 게 없으면 최신 시리즈로
 * 떨어진다. 어떤 글에서든 보여 줄 게 하나는 있다.
 */
const tagsOf = (entry: ContentEntry): string[] =>
  "tags" in entry.data && Array.isArray(entry.data.tags) ? entry.data.tags : [];

/** 시리즈에 속한 글들의 태그 전부 */
const seriesTags = ({ posts }: SeriesWithPosts): Set<string> =>
  new Set(posts.flatMap(tagsOf));

export const getRecommendedSeries = (
  post: ContentEntry,
  posts: ContentEntry[],
  limit = 2
): SeriesWithPosts[] => {
  const mine = new Set(tagsOf(post));

  // getAllSeries 가 이미 최신순이라, 점수가 같으면 최신 시리즈가 앞에 온다.
  return getAllSeries(posts)
    .map(entry => {
      const tags = seriesTags(entry);
      let score = 0;
      for (const tag of mine) if (tags.has(tag)) score += 1;
      return { entry, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
};
