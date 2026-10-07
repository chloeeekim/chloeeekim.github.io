import type { APIRoute } from "astro";

// 템플릿 리터럴이 줄바꿈으로 시작하면 robots.txt 첫 줄이 빈 줄이 된다.
// 표준상 허용되지만 굳이 남길 이유가 없어 첫 줄부터 지시문으로 시작한다.
const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
