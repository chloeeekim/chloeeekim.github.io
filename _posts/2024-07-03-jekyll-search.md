---
layout: post
title: "Jekyll Blog(Github Pages) 검색 엔진에 노출시키기 (Google Search Console)"
author: chloeeekim
categories: [Jekyll]
image: assets/images/jekyll-search/title.png
featured: true
toc: true
---

블로그를 만들었다면 다른 사람들이 내 블로그를 검색해서 유입되길 기대할 겁니다. 하지만 Github Pages와 Jekyll로 만든 블로그의 경우 검색 엔진에 자동으로 노출되지 않기 때문에 직접 사이트맵을 등록하여 데이터가 수집되도록 해야 합니다. Google Search Console, Naver Search Advisor 등을 사용하여 각 검색 엔진마다 등록해 줄 수 있습니다. 이번 포스팅에서는 구글 검색 엔진에 등록하는 방법에 대해서 소개하도록 하겠습니다.

# Google Search Console

구글에서는 구글 서치 콘솔(Google Search Console)을 통해 사이트맵을 등록하고, 검색을 통해 노출된 양과 유입된 내용을 확인할 수 있습니다. 참고로 구글 서치봇이 정보를 수집하는 데에 길게는 한 달까지도 소요될 수 있으며, 수집이 완료되었다고 해서 검색 상단에 노출되는 것이 보장되지는 않습니다.

## 시작하기

우선 <a href="https://search.google.com/search-console" target="_blank">구글 서치 콘솔(Google Search Console)</a> 사이트에 접속합니다. 여기서 `URL 접두어` 항목에 github pages blog url을 입력하고 `계속`을 클릭합니다. 만약 도메인을 따로 구매한 경우라면, 왼쪽에 위치한 `도메인` 항목에 입력하면 됩니다.

<img src="/assets/images/jekyll-search/1.jpg" alt="google search console - add url" class="post-img">

## 소유권 확인하기

다음으로 소유권 확인 과정이 필요합니다. 여기서 선택할 수 있는 방법들이 몇 가지 있는데, 사용 중인 테마에 따라서 특정 방법을 사용해야 한다던가 하는 제약이 있을 수는 있습니다. 참고로, <a href="https://chloeeekim.github.io/jekyll-google-analytics/" target="_blank">이전 포스팅</a>을 통해 Google Analytics를 설정한 상태라면 보다 편리하게 소유권을 확인할 수도 있습니다.

<img src="/assets/images/jekyll-search/2.jpg" alt="google search console - check ownership" class="post-img">

### HTML 파일 업로드

첫 번째로 권장되는 방법은 HTML 파일을 직접 업로드하는 것입니다. 올려져 있는 `.html` 파일을 다운 받아 가장 상위 폴더에 해당 파일을 위치시키면 됩니다. 특정 URL에 파일을 업로드할 수 없는 경우에는 사용할 수 없지만, github pages로 만든 블로그에는 적용이 가능합니다.

<img src="/assets/images/jekyll-search/3.jpg" alt="check ownership - html file upload" class="post-img">

### HTML 태그 추가

두 번째 방법은 HTML 메타 태그를 추가하는 것입니다. jekyll에서는 header 부분을 세팅할 수 있기 때문에 적용이 가능합니다. 다만, header를 수정할 수 없는 경우에는 사용할 수 없다는 단점이 있습니다.

<img src="/assets/images/jekyll-search/4.jpg" alt="check ownership - html meta tag" class="post-img">

### Google 애널리틱스 계정 사용

또 다른 방법으로, <a href="https://chloeeekim.github.io/jekyll-google-analytics/" target="_blank">Google Analytics 연결하기</a>를 마친 경우라면, 별다른 코드의 수정이나 파일 업로드 없이 소유권 확인이 가능합니다. 보다 간편한 방법이기도 하고, Google Analytics를 사용하는 경우라면 해당 방법을 추천드립니다.

<img src="/assets/images/jekyll-search/5.jpg" alt="check ownership - google analytics" class="post-img">

설정을 마친 후, `확인` 버튼을 클릭하면, 정상적으로 소유권 확인이 되었다면 다음과 같은 화면이 표시됩니다.

<img src="/assets/images/jekyll-search/6.jpg" alt="check ownership - done" class="post-img">

## sitemap 제출하기

이제 sitemap을 제출하여 서치봇이 블로그의 글들을 크롤링할 수 있도록 해 줍니다. sitemap을 만드는 방법에 대해서는 다음 포스팅에서 따로 정리하도록 하고, 여기서는 이미 생성되어 있는 sitemap을 제출하는 과정에 대해서만 설명하겠습니다. 참고로, `https://chloeeekim.github.io/sitemap.xml`과 같이 블로그 주소 뒤에 `sitemap.xml`을 붙여 sitemap 파일이 존재하는지 확인할 수 있습니다. 특정 테마들의 경우 이미 sitemap이 생성되어 있을 것입니다.

왼쪽 메뉴 탭에서 `색인 > Sitemaps` 메뉴로 이동합니다. 그런 다음, URL에 `sitemap.xml`을 입력하고 제출합니다.

<img src="/assets/images/jekyll-search/7.jpg" alt="add sitemap.xml" class="post-img">

시간이 지나면 자동으로 구글 서치봇이 sitemap에 있는 페이지들을 크롤링하여 색인을 생성하게 됩니다. 이 시간은 경우에 따라 시간이 오래 걸릴 수 있기 때문에 빠른 색인 생성을 위해 추가적인 작업을 해 주면 좋습니다.

## URL 검사를 통한 색인 생성 요청

왼쪽 메뉴 탭에서 `URL 검사`를 클릭하거나, 상단에 위치한 서치 바에서 원하는 url을 입력하여 검사를 시도합니다. `https://chloeeekim.github.io/jekyll-search/`와 같이 특정 포스팅을 검사해줍시다. 다음과 같이 표시되면 해당 페이지는 아직 색인이 생성되지 않은 상태인 것을 알 수 있습니다.

<img src="/assets/images/jekyll-search/8.jpg" alt="check url" class="post-img">

여기서 `색인 생성 요청`을 통해 해당 페이지의 색인 생성을 요청할 수 있습니다. 클릭하면 색인을 생성할 수 있는지를 테스트하면서 약 1~2분의 시간이 지난 후 색인 생성이 요청됩니다. 

<img src="/assets/images/jekyll-search/9.jpg" alt="create index - request" class="post-img">

구글의 경우 색인 생성이 완료되기까지 그렇게 오랜 시간이 소요되지는 않았습니다. 제 경험상 24시간 이내로 색인 생성이 완료되었습니다. 하지만 상황에 따라 시간이 더 많이 걸리거나 적게 걸릴 수 있다는 점 참고 부탁드립니다.

색인이 생성된 url을 검사하면 다음과 같이 표시되어 상세한 정보를 확인할 수 있습니다.

<img src="/assets/images/jekyll-search/10.jpg" alt="create index - done" class="post-img">

이렇게 구글 서치 콘솔을 이용하여 구글에 블로그 포스팅이 검색되도록 해보았습니다. 검색 엔진에 노출시키는 과정은 시간이 오래 걸리기 때문에 최대한 빠르게 등록해주시는 게 좋습니다. 참고로 저의 경우에는 sitemap을 통해 색인 생성이 완료되는 데까지 1주일 이내의 시간이 소요되었습니다.
