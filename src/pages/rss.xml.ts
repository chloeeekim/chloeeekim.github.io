import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getEntryPath } from "@/utils/contentEntry";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const sortedPosts = getSortedPosts(await getCollection("blog"));
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(entry => ({
      link: getEntryPath(entry),
      title: entry.data.title,
      description: entry.data.description,
      // 목록과 같은 기준. modDatetime 을 쓰면 오래된 글을 고칠 때마다
      // 구독자의 리더에서 새 글처럼 맨 위로 올라온다.
      pubDate: new Date(entry.data.pubDatetime),
    })),
  });
}
