import { TOC_HEADING } from "./remarkTocCollapse";

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

/** 글 제목이 h1 을 쓰므로 본문은 h2 에서 시작한다. */
const BODY_TOP = 2;

const textOf = (node: HastNode): string =>
  node.value ?? (node.children ?? []).map(textOf).join("");

const isToc = (node: HastNode) => TOC_HEADING.test(textOf(node).trim());

/**
 * 본문 제목을 h2 에서 시작하도록 내린다.
 *
 * 레이아웃이 글 제목을 h1 로 내보내는데 본문에서도 `#` 을 섹션 제목으로 써
 * 왔다. 그래서 한 페이지에 h1 이 여럿이었다. 스크린 리더는 모든 섹션을 글
 * 제목과 같은 최상위로 읽고, 검색 엔진은 주제를 하나로 잡지 못한다. 본문 h1
 * 은 앵커(`#`) 도 못 받았다. PostDetails 의 addHeadingLinks 가 글 제목을
 * 피하려고 h2 부터만 훑기 때문이다.
 *
 * 글 서른 편 중 스물넷이 이렇게 쓰여 있어서, 마크다운을 고치는 대신 렌더링
 * 에서 내린다. 쓰던 대로 `#` 으로 써도 결과가 맞는다.
 *
 * 한 단계씩 고정으로 내리지 않고, 그 글에서 가장 얕은 제목이 h2 가 되도록
 * 필요한 만큼만 내린다. 그래서 `##` 부터 시작하는 글은 건드리지 않는다.
 * 고정이면 그런 글을 h3 으로 밀어 h1 다음 단계를 건너뛰게 만든다. 지금은
 * 그렇게 쓴 글이 없지만, 앞으로 제대로 쓴 글이 손해를 보면 안 된다.
 *
 * 목차 제목("Table of contents")은 늘 h2 에 둔다. 목차는 글의 한 섹션이고,
 * 같이 밀리면 h1 다음이 h3 이 된다.
 *
 * 본문에서 가장 깊은 제목이 h3 이라 내려도 h4 를 넘지 않는다. h6 아래로는
 * 더 내릴 곳이 없어 그대로 둔다. 그쯤 되면 글의 구조를 손봐야 할 문제다.
 */
export function rehypeDemoteHeadings() {
  return (tree: HastNode) => {
    const headings: HastNode[] = [];

    const collect = (node: HastNode) => {
      for (const child of node.children ?? []) {
        if (child.tagName && HEADINGS.includes(child.tagName)) {
          headings.push(child);
        }
        collect(child);
      }
    };
    collect(tree);

    const levelOf = (node: HastNode) => HEADINGS.indexOf(node.tagName!) + 1;
    const sections = headings.filter(node => !isToc(node));
    const top = Math.min(...sections.map(levelOf));
    const shift = Math.max(0, BODY_TOP - top);

    for (const heading of headings) {
      const level = isToc(heading)
        ? BODY_TOP
        : Math.min(levelOf(heading) + shift, HEADINGS.length);
      heading.tagName = HEADINGS[level - 1];
    }
  };
}
