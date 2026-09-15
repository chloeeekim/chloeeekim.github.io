export const SITE = {
  website: "https://chloeeekim.github.io/",
  author: "Chloe Jungah Kim",
  profile: process.env.PUBLIC_SOCIAL_GITHUB ?? "", // set in .env
  desc: "Chloeeekim's Blog - All about everything",
  title: "Chloeeekim",
  ogImage: "", // 비우면 src/pages/og.png.ts 가 동적 생성한 /og.png 사용
  googleAnalyticsId: "G-5DB4C9PFP7", // GA4 측정 ID. 비우면 스크립트를 넣지 않음
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 12,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showGalleries: false,
  showGalleriesInIndex: false, // Show galleries in the general paginated list (only if showGalleries is true)
  showBackButton: true, // show back button in post detail
  showTagsInCards: true, // show tag pills at the bottom of post cards
  showCoverImages: false, // show cover images (OG) in post cards (requires pnpm build in dev mode)
  indexPostsGrid: false, // show recent/featured posts in grid layout on the home page (like /posts page)
  heroTerminalPrompt: {
    prefix: "~", // highlighted part on the left
    path: "/ready-to-go", // central prompt text
    suffix: "$", // terminal symbol on the right
  },
  backdropEffects: {
    cursorGlow: true, // cursor tracking with soft halo
    grain: true, // background visual noise layer
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "ko", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Seoul", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  introAudio: {
    enabled: false, // show/hide intro player in home and compact player while navigating
    // src: path to file (relative to /public or absolute URL). Example: "/intro.mp3" or "https://example.com/stream"
    src: "https://fluxfm.streamabc.net/flx-chillhop-mp3-128-8581707",
    // src: "/audio/intro-web.mp3",
    isStream: true, // true for radio/live stream URLs (example: https://fluxfm.streamabc.net/flx-chillhop-mp3-128-8581707)
    label: "LOFI", // display label in player
    duration: 30, // duration in seconds (used for local files, ignored on streams)
  },
} as const;
