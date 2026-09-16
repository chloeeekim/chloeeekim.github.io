/**
 * OG 이미지 공통 색상.
 * src/styles/global.css 의 라이트 모드 토큰과 맞춘다.
 * OG 이미지는 상대방 앱(카카오톡·슬랙 등)이 자기 배경 위에 그리므로
 * 다크 모드를 따라가지 않고 라이트 팔레트 하나로 고정한다.
 */
export const OG = {
  background: "#f8f8f2", // --background
  foreground: "#232630", // --foreground
  accent: "#0e7490", // --accent
  featured: "#8d5aaf", // --featured
  border: "#9db4be", // --border
  surface: "#e9eff0", // 배지 배경 (--muted 를 배경 쪽으로 당김)
  secondary: "#55606e", // 보조 텍스트 (배경 대비 약 6:1)
  dot: "#c2d0cf", // 배경 점 패턴
};
