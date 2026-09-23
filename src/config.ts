export const SITE = {
  website: "https://chloeeekim.github.io/",
  author: "Chloe Jungah Kim",
  // 홈의 "Written by" 링크와 JSON-LD Person.url 에 쓰인다.
  // .env 는 gitignore 되어 CI 빌드에는 값이 없으므로 여기에 직접 둔다.
  profile: "https://github.com/chloeeekim",
  desc: "A developer's notes on architecture, tooling, and whatever else is worth writing down.",
  title: "chloeeekim.dev",
  ogImage: "", // 비우면 src/pages/og.png.ts 가 동적 생성한 /og.png 사용
  googleAnalyticsId: "G-5DB4C9PFP7", // GA4 측정 ID. 비우면 스크립트를 넣지 않음
  lightAndDarkMode: true,
  postPerIndex: 4, // 홈 Recent 에 보여줄 글 수
  postPerPage: 12,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  showTagsInCards: true, // show tag pills at the bottom of post cards
  indexPostsGrid: false, // 홈의 Recent 를 넓은 화면에서 3단까지 늘린다 (/posts 와 동일). 끄면 최대 2단
  heroTerminalPrompt: {
    prefix: "~", // highlighted part on the left
    path: "/still-curious", // central prompt text
    suffix: "$", // terminal symbol on the right
  },
  backdropEffects: {
    cursorGlow: true, // cursor tracking with soft halo
    grain: true, // background visual noise layer
  },
  about: {
    // src/assets/ 기준 경로. Astro 이미지 최적화를 받으려면 src/ 아래여야
    // 하고, AboutLayout 이 import.meta.glob 으로 이 경로를 찾는다.
    // 비우면 모노그램으로 대체된다.
    avatar: "/src/assets/images/profile.webp",
    badges: ["⚙️ Backend Engineer", "☕ Kotlin · Spring · Vert.x", "🎮 Gamer"],
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "ko", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Seoul", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
