/**
 * draft: true 인 글을 보여줄지 정한다.
 *
 * dev 서버에서만 보여준다. 쓰는 중인 글을 실제 화면에서 확인하려고 draft 를
 * 잠깐 false 로 바꿔 두면, 그대로 커밋해 발행해 버리기 쉽다.
 *
 * import.meta.env.DEV 는 번들러가 빌드 때 false 로 치환하므로 발행본에서는
 * 아래 분기가 통째로 사라진다. 드래프트가 새어 나갈 길이 없다. 예약 발행
 * (pubDatetime 이 미래인 글)도 postFilter 에서 같은 방식으로 다룬다.
 */
export const showDrafts = import.meta.env.DEV;

/**
 * getCollection 의 필터로 쓴다.
 *
 * 드래프트를 막는 곳이 목록·글 상세·아카이브·OG 이미지·태그까지 흩어져 있어
 * 한 곳을 빠뜨리면 목록에 없는 글의 페이지만 생기는 식으로 어긋난다. 판단을
 * 여기 하나로 모은다.
 */
export const isDraftVisible = ({ data }: { data: { draft?: boolean } }) =>
  showDrafts || !data.draft;
