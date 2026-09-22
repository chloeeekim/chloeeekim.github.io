import { SITE } from "../config";

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

/**
 * 외부 링크를 새 탭에서 열고 rel 을 붙인다.
 *
 * Jekyll 시절 본문에는 raw <a href="..." target="_blank"> 가 박혀 있었다.
 * 마크다운 링크로 바꾸면 문법상 target 을 표현할 수 없어, 새 탭 동작을
 * 본문이 아니라 빌드 단계로 옮긴 것이다. 본문은 [텍스트](주소) 만 쓰고
 * 링크 동작은 여기 한 곳에서 정한다.
 *
 * 같은 일을 하는 rehype-external-links 패키지가 있지만, 규칙이
 * "호스트가 다르면 외부" 한 줄이라 의존성을 늘리지 않고 직접 둔다.
 * (src/utils/transformers/fileName.ts 의 shiki transformer 와 같은 방식)
 *
 * rel="noopener" 는 새 탭이 window.opener 로 원래 페이지를 조작하지
 * 못하게 막는다. raw HTML 로 박혀 있던 기존 링크에는 없던 속성이다.
 */
export function rehypeExternalLinks() {
  const siteHost = new URL(SITE.website).host;

  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (node.tagName === "a" && node.properties) {
        const href = node.properties.href;
        if (typeof href === "string" && /^https?:\/\//i.test(href)) {
          let host = "";
          try {
            host = new URL(href).host;
          } catch {
            // 파싱이 안 되는 주소는 건드리지 않는다
          }
          if (host && host !== siteHost) {
            node.properties.target = "_blank";
            node.properties.rel = "noopener noreferrer";
          }
        }
      }
      node.children?.forEach(walk);
    };

    walk(tree);
  };
}
