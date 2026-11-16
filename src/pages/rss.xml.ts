import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getEntryPath } from "@/utils/contentEntry";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const sortedPosts = getSortedPosts(await getCollection("blog"));

  // 채널이 마지막으로 바뀐 시각. 빌드 시각을 쓰면 글이 그대로여도 배포할
  // 때마다 바뀌어서 리더에게 거짓말이 된다. 글의 작성·수정 시각 중
  // 가장 나중 것을 쓴다.
  const lastBuildDate = new Date(
    Math.max(
      ...sortedPosts.flatMap(entry =>
        [entry.data.pubDatetime, entry.data.modDatetime]
          .filter(Boolean)
          .map(d => new Date(d!).getTime())
      )
    )
  );

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    // 글은 한국어다. 채널 설명이 영어라 리더가 언어를 넘겨짚지 않도록 밝힌다.
    //
    // atom:link rel="self" 는 /feed.xml 로 받아 가더라도 /rss.xml 을 가리킨다.
    // 둘은 같은 내용이고 /feed.xml 은 Jekyll 시절 주소를 살려 둔 별칭이라,
    // 정본이 어느 쪽인지 알려 주는 편이 맞다.
    customData: [
      `<language>ko</language>`,
      `<lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>`,
      `<atom:link href="${new URL("rss.xml", SITE.website).href}" rel="self" type="application/rss+xml"/>`,
    ].join(""),
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
