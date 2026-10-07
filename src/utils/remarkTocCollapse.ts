/**
 * 목차를 접어서 보여주되, 목차 제목 아래 쓴 도입부는 그대로 살린다.
 *
 * remark-toc 는 "Table of contents" 제목부터 같은 깊이의 다음 제목까지를
 * 생성한 목차로 통째로 갈아끼운다(문서에 명시된 동작이다). 그래서 제목 아래
 * 도입부를 쓰면 렌더링에서 조용히 사라진다. 숨는 게 아니라 HTML 에 아예
 * 나오지 않는다.
 *
 * remark-collapse 도 섹션 전체를 <details> 로 감싸므로, 설령 살아남아도
 * 도입부까지 같이 접힌다.
 *
 * 그래서 둘 다 쓰지 않고 remark-toc 앞뒤로 두 단계를 끼운다.
 *
 *   1. remarkTocPreserveIntro  목차 섹션의 내용을 빼서 보관한다
 *   2. remark-toc              빈 섹션에 목차를 만들어 넣는다
 *   3. remarkTocCollapse       목차만 <details> 로 감싸고 보관분을 되돌린다
 *
 * 결과는 제목 -> 접힌 목차 -> 도입부 -> 본문 순서다. 목차 생성은 remark-toc
 * 에 그대로 맡기므로 제목 id(rehype-slug) 와 링크가 어긋날 일이 없다.
 */

type MdNode = {
  type: string;
  depth?: number;
  value?: string;
  children?: MdNode[];
};

type Root = { type: "root"; children: MdNode[] };
type VFile = { data: Record<string, unknown> };

/** remark-toc 의 기본값과 같은 패턴 */
const TOC_HEADING = /^(table[ -]of[ -])?contents?$|^toc$/i;

const DATA_KEY = "tocIntroNodes";

const textOf = (node: MdNode): string =>
  node.value ?? (node.children ?? []).map(textOf).join("");

/** 목차 제목의 위치와 깊이. 없으면 null */
const findTocHeading = (tree: Root) => {
  const index = tree.children.findIndex(
    node => node.type === "heading" && TOC_HEADING.test(textOf(node).trim())
  );
  if (index === -1) return null;
  return { index, depth: tree.children[index].depth ?? 1 };
};

/** 1단계: remark-toc 이 지워 버리기 전에 목차 섹션의 내용을 빼 둔다 */
export function remarkTocPreserveIntro() {
  return (tree: Root, file: VFile) => {
    const found = findTocHeading(tree);
    if (!found) return;

    const { index, depth } = found;

    // 같은 깊이 이상의 다음 제목까지가 remark-toc 이 갈아끼우는 범위다
    let end = index + 1;
    while (end < tree.children.length) {
      const node = tree.children[end];
      if (node.type === "heading" && (node.depth ?? 1) <= depth) break;
      end++;
    }

    const intro = tree.children.slice(index + 1, end);
    if (intro.length === 0) return;

    tree.children.splice(index + 1, intro.length);
    file.data[DATA_KEY] = intro;
  };
}

/** 3단계: 목차만 <details> 로 감싸고, 빼 뒀던 도입부를 그 뒤에 되돌린다 */
export function remarkTocCollapse(options?: {
  /** 접힌 상태에서 보일 문구. 기본값은 "Open <제목>" */
  summary?: (headingText: string) => string;
}) {
  const summarize = options?.summary ?? ((text: string) => `Open ${text}`);

  return (tree: Root, file: VFile) => {
    const found = findTocHeading(tree);
    if (!found) return;

    const { index } = found;
    const intro = (file.data[DATA_KEY] as MdNode[] | undefined) ?? [];
    const list = tree.children[index + 1];

    // 루트 레벨 html 노드라 <p> 로 감싸이지 않는다
    const wrapped: MdNode[] =
      list?.type === "list"
        ? [
            {
              type: "html",
              value: `<details>\n<summary>${summarize(
                textOf(tree.children[index]).trim()
              )}</summary>`,
            },
            list,
            { type: "html", value: "</details>" },
          ]
        : [];

    tree.children.splice(index + 1, wrapped.length ? 1 : 0, ...wrapped, ...intro);
  };
}
