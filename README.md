# Chloeeekim's Blog

All about everything. — <https://chloeeekim.github.io>

[Astro](https://astro.build)로 만든 정적 블로그. GitHub Actions로 빌드해 GitHub Pages에 배포한다.

## 개발

필요 환경: Node.js 22 이상, pnpm 10

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # astro check + build + pagefind 색인 -> dist/
pnpm preview  # 빌드 결과 미리보기
```

검색(Pagefind)은 색인이 있어야 동작한다. `pnpm build`를 한 번 돌리면 `public/pagefind/`가 생성되어 `pnpm dev`에서도 검색을 쓸 수 있다.

## 글쓰기

`src/data/blog/` 아래 주제 디렉터리에 마크다운 파일을 만든다(`_blog/`, `_claude/`, `_cuda/`). **파일명이 곧 URL**이다. `_cuda/python-class.md` → `/python-class/`.

```markdown
---
title: "글 제목"
description: "목록 카드와 검색 결과에 노출되는 한 줄 요약"
pubDatetime: 2026-09-15T09:00:00+09:00
author: "Chloe Jungah Kim"
tags:
  - python
  - programming
featured: false
draft: false
---

## Table of contents

본문...
```

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title` | ✅ | |
| `description` | ✅ | 없으면 **빌드가 실패한다.** 목록 카드와 SEO 메타에 그대로 쓰인다 |
| `pubDatetime` | ✅ | KST는 `+09:00` |
| `author` | | 생략 시 `src/config.ts`의 값 |
| `tags` | | 생략 시 `["others"]` |
| `featured` | | 홈 상단 추천 영역에 노출 |
| `draft` | | `true`면 빌드에서 제외 |
| `modDatetime` | | 수정일 |
| `canonicalURL` | | 다른 곳에 원본이 있을 때만 |

- 목차가 필요하면 본문 맨 앞에 `## Table of contents` 한 줄을 넣는다. remark-toc가 자동으로 채운다.
- 본문 이미지는 `src/assets/images/<슬러그>/`에 넣고 마크다운 문법으로 참조한다. `public/`에 두면 Astro가 복사만 하고 최적화하지 않는다.

  ```markdown
  ![설명](../../../assets/images/<슬러그>/1.jpg)
  ```

  상대 경로이므로 글의 디렉터리 깊이에 맞춰야 한다. `src/data/blog/_cuda/foo.md`에서는 `../../../`다.
- **원본(JPG/PNG)을 그대로 넣는다.** Astro가 WebP로 변환하고 `srcset`, `width`/`height`, `loading="lazy"`를 붙인다. 이미 손실 압축된 WebP를 넣으면 재인코딩으로 손실이 두 번 얹힌다.
- 주제 디렉터리 이름은 **밑줄로 시작해야 한다.** `getPath`가 밑줄로 시작하는 디렉터리를 경로에서 빼기 때문에 URL이 `/:title/`로 유지된다. 밑줄이 없으면 그 이름이 URL에 붙는다.
- 밑줄은 디렉터리에만 붙인다. 파일명이 밑줄로 시작하면 컬렉션 glob 패턴(`**/[^_]*.{md,mdx}`)에서 제외된다.

## 배포

`main`에 push하면 `.github/workflows/deploy.yml`이 빌드해서 GitHub Pages에 올린다. 빌드에 `astro check`가 포함되어 있어 타입이나 프론트매터 스키마 오류가 있으면 배포되지 않는다.

## 설정

`src/config.ts` 한 곳에서 사이트 제목, 작성자, 페이지당 글 수, GA 측정 ID 등을 관리한다.

주요 경로:

| 경로 | 용도 |
| --- | --- |
| `src/data/blog/` | 글 |
| `src/assets/images/` | 본문 이미지, about 아바타 |
| `src/pages/[...slug]/` | 글 상세 라우트 |
| `src/content.config.ts` | 프론트매터 스키마 |
| `src/styles/` | 전역 스타일, 타이포그래피 |

## 라이선스

테마는 [0xdres/astro-devosfera](https://github.com/0xdres/astro-devosfera)(MIT)를 기반으로 수정해 사용한다. 원 저작권 표기는 `LICENSE`에 유지한다.

글과 이미지의 저작권은 작성자에게 있다.
