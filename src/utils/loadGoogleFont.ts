import fs from "fs";
import path from "path";

/**
 * OG 이미지 생성(satori)에 쓰는 폰트를 읽어온다.
 * 본문 폰트와 동일한 Pretendard(SIL OFL 1.1)를 써서 한글 제목이 깨지지 않게 한다.
 * satori 는 woff2 를 읽지 못하므로 woff 를 사용한다.
 * 이 파일들은 빌드 시점에만 읽히고 브라우저로 전송되지 않는다.
 */
async function loadGoogleFonts(): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const read = (file: string) =>
    fs.readFileSync(path.resolve(`./src/assets/fonts/${file}`)).buffer;

  const regular = read("Pretendard-Regular.woff");
  const bold = read("Pretendard-Bold.woff");

  return [
    { name: "Pretendard", data: regular, weight: 400, style: "normal" },
    { name: "Pretendard", data: bold, weight: 600, style: "normal" },
    { name: "Pretendard", data: bold, weight: 700, style: "normal" },
    { name: "Pretendard", data: bold, weight: 900, style: "normal" },
  ];
}

export default loadGoogleFonts;
