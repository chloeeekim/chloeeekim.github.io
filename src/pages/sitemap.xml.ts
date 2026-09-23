import type { APIRoute } from "astro";

/**
 * Jekyll 의 jekyll-sitemap 이 제공하던 /sitemap.xml 주소를 유지하기 위한 별칭.
 *
 * @astrojs/sitemap 은 인덱스를 /sitemap-index.xml 로 내보내기 때문에, 예전에
 * Search Console 에 제출했거나 외부에서 링크한 /sitemap.xml 이 404 가 된다.
 * /feed.xml 과 같은 이유로 옛 주소를 살려 둔다.
 *
 * 정본은 /sitemap-index.xml 이다. robots.txt 가 선언하는 주소도 그쪽이고,
 * 이 라우트는 같은 내용을 옛 주소로 한 번 더 제공할 뿐이다.
 *
 * 인덱스가 가리키는 sitemap-0.xml 은 @astrojs/sitemap 이 만든다. URL 수가
 * entryLimit(기본 45,000) 을 넘으면 sitemap-1.xml 부터 파일이 늘어나는데,
 * 그때는 여기 목록도 함께 늘려야 한다. 현재는 30 개라 한참 멀었다.
 */
const SITEMAP_FILES = ["sitemap-0.xml"];

export const GET: APIRoute = ({ site }) => {
  const entries = SITEMAP_FILES.map(
    file => `<sitemap><loc>${new URL(file, site).href}</loc></sitemap>`
  ).join("");

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries +
    `</sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
