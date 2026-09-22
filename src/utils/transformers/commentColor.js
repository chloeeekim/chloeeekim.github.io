/**
 * 코드블록 토큰 색을 치환하는 Shiki transformer.
 *
 * 두 테마 모두 주석 색이 배경과 너무 가깝다. 라이트(min-light)의 `#C2C3C5`는
 * 코드블록 배경(`--code-bg: #eef2f1`) 위에서 대비가 1.56:1 이라 거의 안 보이고,
 * 다크(dracula)의 `#6272A4`도 `#282a36` 위에서 3.03:1 에 그친다.
 *
 * 주석이 코드보다 도드라지지 않을 만큼만 올린다. 실제 값은 astro.config.ts 참고.
 *
 * Shiki 자체에 `colorReplacements` 옵션이 있지만 Astro 의 `shikiConfig` 는 그
 * 키를 Shiki 로 넘기지 않는다(타입에도 없고 실제로 무시된다). 그래서 렌더된
 * span 의 인라인 스타일을 직접 바꾼다.
 *
 * `--shiki-light:` / `--shiki-dark:` 접두어까지 포함해 치환하므로, 우연히 같은
 * 값을 반대쪽 테마에서 쓰더라도 건드리지 않는다.
 *
 * @param {Record<string, string>} replacements - `"--shiki-dark:#6272A4"` 처럼
 *   접두어를 포함한 문자열을 키로, 바꿀 문자열을 값으로 준다.
 */
export const transformerTokenColor = (replacements = {}) => ({
  name: "token-color",
  span(node) {
    const style = node.properties?.style;
    if (typeof style !== "string") return;

    let next = style;
    for (const [from, to] of Object.entries(replacements)) {
      next = next.replaceAll(from, to);
    }
    if (next !== style) node.properties.style = next;
  },
});
