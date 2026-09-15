// Jekyll 의 jekyll-feed 가 제공하던 /feed.xml 주소를 유지하기 위한 별칭.
// 기존 RSS 구독자의 링크가 깨지지 않도록 /rss.xml 과 동일한 내용을 제공한다.
// 신규 노출(head 의 rel="alternate")은 /rss.xml 을 정본으로 쓴다.
export { GET } from "./rss.xml";
