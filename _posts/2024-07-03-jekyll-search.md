---
layout: post
title: "Jekyll Blog(Github Pages) 검색 엔진에 노출시키기 (Google, Naver)"
author: chloeeekim
categories: [Jekyll]
image: assets/images/jekyll-search/title.jpg
featured: false
hidden: true
toc: true
---

블로그를 만들었다면 다른 사람들이 내 블로그를 검색해서 유입되길 기대할 겁니다. 하지만 Github Pages와 Jekyll로 만든 블로그의 경우 검색 엔진에 자동으로 노출되지 않기 때문에 직접 사이트맵을 등록하여 데이터가 수집되도록 해야 합니다. Google Search Console, Naver Search Advisor 등을 사용하여 각 검색 엔진마다 등록해 줄 수 있습니다. 이번 포스팅에서는 구글과 네이버 두 곳에 등록하는 방법에 대해서 소개하도록 하겠습니다.

# Google Search Console

구글에서는 구글 서치 콘솔(Google Search Console)을 통해 사이트맵을 등록하고, 검색을 통해 노출된 양과 유입된 내용을 확인할 수 있습니다. 참고로 구글 서치봇이 정보를 수집하는 데에 길게는 한 달까지도 소요될 수 있으며, 수집이 완료되었다고 해서 검색 상단에 노출되는 것이 보장되지는 않습니다.

## Google Search Console


Github Pages와 Jekyll로 생성한 블로그의 경우, 트래픽 분석 등을 따로 제공하지 않기 때문에 누가 어떤 방식으로 내 블로그에 유입되었는지 알기 힘들다는 한계점이 있습니다. 이를 보완하기 위하여 Google Analytics를 통해 누가, 얼마나, 어떤 방식으로, 어느 지역에서 유입되는지를 확인할 수 있습니다. 참고로, 2024년 현재 구글 애널리틱스(Google Analytics, GA)는 GA4 버전만 생성 가능합니다. 이전 버전인 유니버셜 애널리틱스(Universal Analytics, UA)는 추후 지원이 되지 않을 수 있습니다.

# GA 계정 만들기

우선 GA를 적용하기 위해 GA 계정부터 생성해야 합니다. <a href="https://analytics.google.com/" _target="blank">Google Analytics</a>에 접속하여 계정부터 설정해줍니다.

첫 번째로 계정 ID를 등록합니다. 여러 개의 ID를 생성할 수도 있습니다.

<img src="/assets/images/jekyll-google-analytics/1.jpg" alt="create account" class="post-img">

두 번째로 GA를 통해 관리할 url을 속성에 넣어줍니다. 저는 제 github.io 주소를 입력하였습니다. 또, 시간대와 통화 등을 대한민국으로 설정을 바꿔주면 되는데, 추후에 변경할 수도 있으니 넘어가셔도 좋습니다.

<img src="/assets/images/jekyll-google-analytics/2.jpg" alt="create attribute" class="post-img">

이후에 비즈니스 세부정보, 목표 등을 적당히 설정해주고, 데이터 수집과 관련한 사항에 동의해줍니다. 마지막으로 데이터 소스 플랫폼을 `웹`으로 선택해줍니다.

<img src="/assets/images/jekyll-google-analytics/3.jpg" alt="select data source" class="post-img">

데이터 스트림 설정에서는 관리할 사이트의 url을 입력하고, 우측 상단의 `만들고 계속하기`를 클릭합니다.

<img src="/assets/images/jekyll-google-analytics/4.jpg" alt="setup data stream" class="post-img">

이제 측정 ID가 부여됩니다. 이 ID가 `G-XXXXXXXX` 형식인 것이 GA4 버전입니다. UA 버전의 경우 `UA-XXXXXXXX-X`와 같은 형식으로 나타납니다.

<img src="/assets/images/jekyll-google-analytics/5.jpg" alt="measurement ID" class="post-img">

여기서 태그 사용을 선택하고 다음으로 넘어가면, 아래와 같은 화면이 표시됩니다. 아직 태그를 설정해주지 않았기 때문에 데이터 수집이 활성화되어 있지 않은 상태입니다. 이제 블로그에 GA를 연결할 준비가 완료되었습니다. 참고로 아래 내용은 `설정 > 데이터 수집 및 수정 > 데이터 스트림`에서도 확인할 수 있습니다.

<img src="/assets/images/jekyll-google-analytics/6.jpg" alt="web stream details" class="post-img">

# Jekyll 블로그에 GA 연결하기

블로그의 설정 등에 따라 방법이 여러 가지로 나뉠 수 있습니다. 저처럼 특정 테마를 사용하여 블로그를 세팅한 경우에는 블로그에서 지원하는 버전이 UA일 수 있습니다. 사용하고 있는 테마의 document나 `_config.yml` 파일을 살펴봅니다. 

## 예시가 GA4 버전인 경우

여기서 `G-XXXXXXXX` 형식의 태그가 예시로 되어 있다면 별다른 변경 없이 발급받은 측정 ID를 `_config.yml`에 다음과 같이 추가해주기만 하면 됩니다.

```yml
google_analytics: "G-XXXXXXXX"
```

## 예시가 UA 버전인 경우

하지만 `UA-XXXXXXXX-X`와 같은 형식의 태그가 예시로 되어 있다면, 유니버셜 애널리틱스를 기준으로 테마가 만들어져 있는 상태입니다. 따라서 GA4 태그를 사용하기 위해서는 수정이 불가피합니다.

우선 `설정 > 데이터 수집 및 수정 > 데이터 스트림 > 태그 안내 보기`로 들어갑니다. 상단의 탭에서 `직접 설치`를 클릭하면 다음과 같이 gtag 코드가 나옵니다.

<img src="/assets/images/jekyll-google-analytics/7.jpg" alt="gtag information" class="post-img">

```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

설명에도 나와있듯, 해당 코드를 `<head>` 요소 안에 붙여 넣으면 됩니다. 여기서도 테마마다 설정하는 방법이 달라집니다. `_includes` 폴더에 `analytics.html`이 있는 경우에는 해당 파일을 수정하면 되는데, 없는 경우에는 `<head>` 요소를 붙이는 파일을 찾아야 합니다. 저는 `_layouts` 폴더에 있는 `default.html` 파일을 수정하였습니다.

# GA 연결 확인하기

수정된 코드를 github에 올리고, 빌드가 완료될 때까지 몇 분 정도 기다려줍니다. 빠르게 확인할 수 있는 방법으로 `개발자 도구 > Console`에 `gtag`를 입력해 볼 수 있습니다. 제대로 연결되지 않았다면 `Uncaught ReferenceError`가 발생하고, 제대로 연결된 경우 다음과 같이 gtag를 확인할 수 있습니다.

<img src="/assets/images/jekyll-google-analytics/8.jpg" alt="gtag: console" class="post-img">

Google Analytics에서는 `보고서 > 실시간` 탭에서 사용자가 확인되면 GA 연결은 성공적으로 끝납니다.

<img src="/assets/images/jekyll-google-analytics/9.jpg" alt="google analytics check" class="post-img">
