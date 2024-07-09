---
layout: post
title: "Jekyll Blog(Github Pages) 검색 엔진에 노출시키기 (Google, Naver)"
author: chloeeekim
categories: [Jekyll]
image: assets/images/jekyll-search/title.png
featured: false
hidden: true
toc: true
---

블로그를 만들었다면 다른 사람들이 내 블로그를 검색해서 유입되길 기대할 겁니다. 하지만 Github Pages와 Jekyll로 만든 블로그의 경우 검색 엔진에 자동으로 노출되지 않기 때문에 직접 사이트맵을 등록하여 데이터가 수집되도록 해야 합니다. Google Search Console, Naver Search Advisor 등을 사용하여 각 검색 엔진마다 등록해 줄 수 있습니다. 이번 포스팅에서는 구글과 네이버 두 곳에 등록하는 방법에 대해서 소개하도록 하겠습니다.

# Google Search Console

구글에서는 구글 서치 콘솔(Google Search Console)을 통해 사이트맵을 등록하고, 검색을 통해 노출된 양과 유입된 내용을 확인할 수 있습니다. 참고로 구글 서치봇이 정보를 수집하는 데에 길게는 한 달까지도 소요될 수 있으며, 수집이 완료되었다고 해서 검색 상단에 노출되는 것이 보장되지는 않습니다.

# 시작하기

우선 <a href="https://search.google.com/search-console" target="_blank">구글 서치 콘솔(Google Search Console)</a> 사이트에 접속합니다. 여기서 `URL 접두어` 항목에 github pages blog url을 입력하고 `계속`을 클릭합니다. 만약 도메인을 따로 구매한 경우라면, 왼쪽에 위치한 `도메인` 항목에 입력하면 됩니다.

<img src="/assets/images/jekyll-search/1.jpg" alt="google search console - add url" class="post-img">

# 소유권 확인하기

다음으로 소유권 확인 과정이 필요합니다. 여기서 선택할 수 있는 방법들이 몇 가지 있는데, <a href="https://chloeeekim.github.io/jekyll-google-analytics/" target="_blank">이전 포스팅</a>을 통해 Google Analytics를 설정한 상태라면 보다 편리하게 소유권을 확인할 수도 있습니다.

<img src="/assets/images/jekyll-search/2.jpg" alt="google search console - check ownership" class="post-img">

## HTML 파일 업로드

첫 번째로 권장되는 방법은 HTML 파일을 직접 업로드하는 것입니다. 올려져 있는 `.html` 파일을 다운 받아 가장 상위 폴더에 해당 파일을 위치시키면 됩니다. 특정 URL에 파일을 업로드할 수 없는 경우에는 사용할 수 없지만, github pages로 만든 블로그에는 적용이 가능합니다.

<img src="/assets/images/jekyll-search/3.jpg" alt="check ownership - html file upload" class="post-img">

## HTML 태그

두 번째 방법은 HTML 메타 태그를 추가하는 것입니다. jekyll에서는 header 부분을 세팅할 수 있기 때문에 해당 

<img src="/assets/images/jekyll-search/4.jpg" alt="check ownership - html meta tag" class="post-img">