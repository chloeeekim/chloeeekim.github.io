import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import type { ContentEntry } from "./contentEntry";
import { SITE } from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 시리즈가 걸친 기간. "2024.06 – 2024.07" 처럼 첫 글과 마지막 글의 달을 보여준다.
 *
 * 같은 달에 다 쓴 시리즈면 한쪽만 남긴다. 날짜까지 적으면 카드 한 줄에
 * 들어가는 정보가 순서보다 길어져 오히려 읽기 어려워진다.
 */
export const formatSeriesRange = (posts: ContentEntry[]) => {
  if (posts.length === 0) return "";

  const fmt = (post: ContentEntry) =>
    dayjs(post.data.pubDatetime)
      .tz(post.data.timezone || SITE.timezone)
      .format("YYYY.MM");

  const first = fmt(posts[0]);
  const last = fmt(posts.at(-1)!);

  return first === last ? first : `${first} – ${last}`;
};
