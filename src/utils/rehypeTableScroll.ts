type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

/**
 * 표를 가로 스크롤 컨테이너로 감싼다.
 *
 * 마크다운은 <table> 을 그대로 내놓아 본문 폭에 그대로 맞춰진다. 좁은 화면에서
 * 열이 글자 하나 폭까지 눌려 읽을 수 없었다. 표를 줄이는 대신 넘치는 만큼
 * 옆으로 밀어서 보게 한다. 폭 제한과 스크롤 모양은 typography.css 의
 * .table-scroll 이 맡고, 여기서는 감싸기만 한다.
 *
 * rehype-wrap 같은 패키지 대신 직접 순회한다. rehypeExternalLinks 와 같은
 * 이유로 의존성을 늘리지 않는다.
 *
 * tabindex="0" 을 준다. 스크롤되는 영역은 키보드로도 밀 수 있어야 한다
 * (WCAG 2.1.1). 넘치지 않는 넓은 화면에서도 탭 순서에 한 칸이 생기는 건
 * 감수한다.
 */
export function rehypeTableScroll() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      const children = node.children;
      if (!children) return;

      children.forEach((child, index) => {
        if (child.tagName === "table") {
          children[index] = {
            type: "element",
            tagName: "div",
            properties: { className: ["table-scroll"], tabIndex: 0 },
            children: [child],
          };
          // 감싼 표 안에는 또 감쌀 표가 없다
          return;
        }
        walk(child);
      });
    };

    walk(tree);
  };
}
