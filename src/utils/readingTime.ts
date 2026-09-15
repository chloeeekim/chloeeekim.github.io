/** 한국어 본문: 분당 읽는 글자 수 */
const KO_CHARS_PER_MIN = 500;
/** 라틴 문자 본문: 분당 읽는 단어 수 */
const EN_WORDS_PER_MIN = 200;
/** 코드: 정독하지 않고 훑는다고 보고 더 빠른 속도를 적용 */
const CODE_CHARS_PER_MIN = 1000;

/** 한글(음절·자모), 한자, 가나 */
const CJK = /[가-힣ᄀ-ᇿ㄰-㆏一-鿿㐀-䶿぀-ヿ]/g;

/**
 * 본문의 예상 읽기 시간을 계산한다.
 *
 * 원본 테마는 공백으로 쪼갠 단어 수를 200wpm 으로 나눴는데, 한국어 기술 글에는
 * 맞지 않았다. 28편 중 18편이 똑같이 "2 min read" 로 나와 변별력이 없었다.
 * - 한국어는 어절이 아니라 글자 수로 세고
 * - 코드는 버리지 않고 낮은 가중치로 반영하며(코드 비중이 78% 인 글도 있다)
 * - 옛 Jekyll 테마 때문에 본문에 남아 있는 raw HTML 태그는 단어로 세지 않는다
 *
 * @param body - 마크다운/MDX 원문
 * @returns "3 min read" 또는 "< 1 min read"
 */
export function getReadingTime(body: string): string {
  const withoutFrontmatter = body.replace(/^---[\s\S]*?---\n?/, "");

  // 코드는 본문에서 떼어내 따로 센다.
  // 들여쓰기와 줄바꿈이 분량으로 잡히지 않도록 공백을 제외한 글자만 센다.
  let codeChars = 0;
  const countCode = (block: string, fence: RegExp) => {
    codeChars += block.replace(fence, "").replace(/\s/g, "").length;
    return " ";
  };
  const withoutCode = withoutFrontmatter
    .replace(/```[\s\S]*?```/g, m => countCode(m, /```[a-zA-Z0-9]*|```/g))
    .replace(/`[^`]*`/g, m => countCode(m, /`/g));

  const plainText = withoutCode
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 링크 → 링크 텍스트만 남긴다
    .replace(/<[^>]+>/g, " ") // raw HTML 태그 (속성이 단어로 세어지는 것을 막는다)
    .replace(/^#{1,6}\s+/gm, "") // 헤딩 기호
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1") // 볼드/이탤릭
    .replace(/^\s*[-*+>|]\s*/gm, "") // 리스트·인용·표 기호
    .replace(/\s+/g, " ")
    .trim();

  const koChars = (plainText.match(CJK) ?? []).length;

  // CJK 를 걷어낸 나머지에서 라틴 단어를 센다
  const enWords = plainText
    .replace(CJK, " ")
    .split(/\s+/)
    .filter(token => /[a-zA-Z0-9]/.test(token)).length;

  const minutes = Math.ceil(
    koChars / KO_CHARS_PER_MIN +
      enWords / EN_WORDS_PER_MIN +
      codeChars / CODE_CHARS_PER_MIN
  );

  return minutes < 1 ? "< 1 min read" : `${minutes} min read`;
}
