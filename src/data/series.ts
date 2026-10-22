import type { ContentEntry } from "@/utils/contentEntry";

export type Series = {
  /** URL 에 쓰이는 슬러그. /series/<slug> */
  slug: string;
  title: string;
  /** 시리즈 페이지와 본문 목차에서 함께 쓰는 소개문 */
  description: string;
  /**
   * 시리즈에 속한 글의 슬러그(파일명). 순서는 상관없다.
   *
   * 읽는 순서는 여기서 정하지 않고 pubDatetime 오름차순으로 정렬한다.
   * 쓴 순서가 곧 읽는 순서인 글들이라 순서를 따로 적을 이유가 없고,
   * 두 곳에 적으면 어긋날 수 있다. 순서를 바꾸고 싶으면 발행 시각을
   * 조정한다.
   *
   * 아직 발행하지 않은 글을 미리 적어 둬도 된다. 발행 전에는 목록에서
   * 조용히 빠지고, 발행하는 순간 날짜에 맞는 자리에 들어간다.
   */
  members: string[];
};

// 배열 순서는 화면에 영향을 주지 않는다. /series 는 각 시리즈의 최신 글
// 기준 내림차순으로 정렬한다 (getAllSeries 참고).
export const SERIES: Series[] = [
  {
    slug: "cuda",
    title: "CUDA 프로그래밍",
    description:
      "CUDA 툴킷 설치와 예제 실행에서 시작해 __global__ 같은 확장 키워드, 글로벌 메모리 결합과 뱅크 충돌, cudaEvent 로 커널 실행 시간 재기까지.",
    members: [
      "cuda-install",
      "cuda-samples",
      "cuda-syntax-highlighting",
      "cuda-syntax-device",
      "cuda-c-extension-1",
      "cuda-c-extension-2",
      "cuda-memory-optimization",
      "cpp-cuda-function",
      "cudaEvent",
    ],
  },
  {
    slug: "github-pages-blog",
    title: "GitHub Pages 블로그 만들기",
    description:
      "GitHub Pages 에 블로그를 띄우고 굴러가게 만들기까지. Jekyll 설치와 테마 적용, GA4 연결, 사이트맵 제출과 색인 요청.",
    members: [
      "jekyll-setup-windows",
      "jekyll-google-analytics",
      "jekyll-search",
      "jekyll-to-astro",
    ],
  },
  {
    slug: "kotlin-mutation-testing",
    title: "Kotlin 뮤테이션 테스트 도구 만들기",
    description:
      "Kotlin용 Stryker 스타일 뮤테이션 테스트 도구를 직접 만드는 기록. 소스 변형을 고른 이유와 첫 버전의 범위에서 시작해, 파싱과 뮤턴트 탐색, 테스트 실행, 리포트까지.",
    members: ["kotlin-mutation-testing-1"],
  },
  {
    slug: "ai-reports",
    title: "AI·기술 보고서 읽기",
    description:
      "AI 연구소와 기관이 낸 중요한 보고서를 한국어로 요약한다. 핵심 수치와 그래프, 결론, 그리고 읽을 때 주의할 점까지.",
    // 슬러그는 원문 URL 의 마지막 경로를 그대로 쓴다. 원문과 1:1 로 대응되고,
    // 원문 제목 전체보다 짧다. URL 이 의미 없는 ID 면 원문 제목을 줄여 쓴다.
    // 여러 보고서를 비교하는 글은 공통 주제를 담은 쪽의 슬러그를 쓴다.
    members: [
      "employment-at-anthropic",
      "ai-expectations-gap",
      "recursive-self-improvement",
    ],
  },
  {
    slug: "state-of-ai-2026",
    title: "State of AI 2026 읽기",
    description:
      "Air Street Capital의 연례 보고서 State of AI Report 2026을 주제별로 나눠 한국어로 정리한다. 에이전트와 AI 연구 자동화, 피지컬 AI, 과학, 비즈니스, 인프라, 정치와 안전까지.",
    // 보고서에 주제별 URL 이 없어서 `state-of-ai-2026-<주제>` 로 짓는다.
    members: [
      "state-of-ai-2026-overview",
      "state-of-ai-2026-agents",
      "state-of-ai-2026-ai-research",
      "state-of-ai-2026-physical-ai",
      "state-of-ai-2026-science",
      "state-of-ai-2026-business",
    ],
  },
];

/** 글의 슬러그. id 는 `_blog/jekyll-search` 처럼 디렉토리를 포함한다. */
export const getSlug = (post: Pick<ContentEntry, "id">) =>
  post.id.split("/").at(-1)!;
