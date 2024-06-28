---
layout: post
title: "Github pages와 Jekyll 설치하기 - Windows ver."
author: chloeeekim
categories: [Jekyll]
image: assets/images/jekyll-setup-windows/title.png
featured: true
toc: true
---

jekyll은 github pages를 지원하는 정적 웹사이트 생성기입니다. 저장되어 있는 html, markdown 파일을 그대로 가져와서 선택한 레이아웃에 따라 html 코드로 변환해 정적 웹사이트를 생성해줍니다. jekyll은 매우 가벼우며, liquid 언어를 지원하여 동적 컨텐츠 로드가 가능하다는 장점이 있습니다. 또한 markdown 언어를 사용하기 때문에 문법이 쉽고, 작성이 간편하다는 것도 장점입니다.

사실 windows는 jekyll이 공식적으로 지원되는 플랫폼은 아닙니다. 하지만 실행이 불가능한 것은 아니기 때문에 약간의 수정을 통해 실행시킬 수 있습니다.

# Github Pages 생성하기

github 계정이 있다는 전제하에, 새 repository를 생성하는 것으로 시작합니다. github pages를 사용하기 위해서는 특정한 repository의 이름을 설정해야 하는데, `githubId.github.io`와 같은 형식으로 설정해줘야 합니다. github id가 아닌 다른 repository 이름을 설정하는 경우, 추가적인 세팅이 필요해지기 때문에 되도록이면 id를 사용합니다.

<img src="/assets/images/jekyll-setup-windows/1.jpg" alt="create github pages" class="post-img">

저의 경우에는 이미 `chloeeekim.github.io` repository가 있다고 표시됩니다. repository의 세팅은 변경할 내용 없이 생성해도 괜찮습니다. repository가 만들어지면 github pages도 생성이 완료된 것입니다.

github pages가 잘 동작하는지 알고 싶다면, repository에 `index.html`이라는 이름으로 원하는 내용을 입력하고 commit 해줍니다. 약간의 시간이 지나고 나서 `githubId.github.io`에 접속하면, 입력한 내용이 표시되는 것을 확인할 수 있습니다.

이제 github pages를 사용할 준비는 끝났습니다.

# Ruby 및 Jekyll 설치하기

jekyll을 사용하기 위해서는 먼저 ruby를 설치해야 합니다. ruby를 설치하는 방법은 다양하지만, windows에서는 ruby installer를 이용하면 간단하게 설치할 수 있습니다. <a href="https://rubyinstaller.org/downloads/" target="_blank">ruby installer download</a> 페이지에 가서 ruby installer를 다운받아 주면 됩니다.

<img src="/assets/images/jekyll-setup-windows/2.jpg" alt="ruby installer download" class="post-img">

사이트 좌측 상단을 보면 `WITH DEVKIT` 항목이 있는데, 꼭 Ruby+Devkit 버전을 다운받아야 합니다. 설치는 간단하게 진행되며, optional한 부분은 건드릴 필요 없이 기본 옵션으로 설치하면 됩니다. ruby installer는 windows를 기반으로 ruby 언어와 실행 환경 등을 포함하고 있습니다. 참고로 ruby installer 2.4 버전 이전의 경우에는 devkit을 따로 설치해야 합니다.

ruby installer 설치가 완료되었다면, ruby command prompt를 실행해줍니다.

<img src="/assets/images/jekyll-setup-windows/3.jpg" alt="ruby command prompt" class="post-img">

```ruby
% ruby --version
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [x64-mingw-ucrt]
```

`ruby --version` 명령어로 루비 정보가 표시된다면 정상적으로 설치가 완료된 것입니다. 그런 다음, jekyll과 bundler를 설치해 줍니다.

```ruby
gem install jekyll bundler
```

설치가 완료되면, 다음 명령어로 jekyll이 잘 설치되었는지도 확인할 수 있습니다.

```ruby
% jekyll -v
jekyll 4.3.3
```

# Jekyll Theme 적용

기존에 존재하는 테마를 사용하지 않을 수도 있지만, jekyll의 또 다른 장점 중 하나가 무료로 제공되는 다양한 테마가 굉장히 많다는 것입니다. 다음 사이트들에서 어마어마한 테마들을 구경하고 선택할 수 있습니다.

- <a href="http://jekyllthemes.org" target="_blank">https://jekyllthemes.org</a>
- <a href="https://jekyllthemes.io/free" target="_blank">https://jekyllthemes.io/free</a>
- <a href="http://themes.jekyllrc.org" target="_blank">http://themes.jekyllrc.org</a>

위 사이트에서 마음에 드는 테마를 찾아 사용하거나 혹은 github에서 `jekyll-theme` 등으로 검색하여 찾을 수도 있습니다. 우선 테마를 사용하여 설정을 마친 다음에는 원하는 대로 커스터마이징을 할 수 있기도 하고, 언제든 테마를 바꿀 수도 있으니 마음 편하게 테마를 고르시면 됩니다.

저는 <a href="https://jekyllthemes.io/theme/mediumish" target="_blank">mediumish</a>라는 테마를 선택하였습니다. 꼭 같은 테마가 아니어도 상관 없으니, 원하시는 테마를 선택합니다. 테마를 골랐다면, 해당 테마의 github 페이지로 이동하여 code를 다운받아 줍니다. clone을 해도 상관없고, `.zip` 파일로 받아도 됩니다. 다운받은 파일들을 위에서 생성한 github pages repository에 옮겨줍니다.

ruby command prompt에서 내 repository가 가져와진 경로로 이동하여 아래 명령어들을 순서대로 실행해줍니다.

```ruby
bundle install
bundle update
```

문제 없이 설치가 끝났다면, 로컬 서버를 실행할 시간입니다.

# 로컬 서버 실행

아래 명령어 중 하나로 jekyll server를 로컬에서 실행할 수 있습니다.

```ruby
bundler exec jekyll serve
jekyll serve
```

실행시키면 `Server address: http://127.0.0.1:4000/`와 같이 로컬 서버 주소가 표시됩니다. 참고로 `--serve` 옵션을 통해 변경사항을 자동으로 감지하도록 할 수도 있습니다. 이후에는 <a href="http://127.0.0.1:4000" target="_blank">로컬 서버</a>에 접속하여 실제로 실행시켜 볼 수 있습니다.

# 각종 에러에 대처하기

jekyll을 설치하고 실행할 수 있다고는 하지만, windows는 공식적으로 지원되는 플랫폼이 아니기 때문에 에러가 발생하는 경우가 있습니다. 아래에서 몇 가지 에러에 대처하는 방법을 설명하겠습니다.

## `Liquid Exception: Incompatible character encoding`

UTF-8 인코딩을 사용하는 경우 발생할 수 있는 에러입니다. 예를 들어, windows 게정명이 한글인 경우가 있을 수 있습니다. `C:\User\계정명`처럼 한글이 포함된 경로 때문에 에러가 발생할 수 있습니다. 이 경우 다음 명령어를 통해 UTF-8 인코딩 옵션을 켜주면 해결이 가능합니다.

```ruby
chcp 65001
```

## `cannot load such file -- webrick (LoadError)`

webrick을 찾을 수 없어서 발생하는 에러입니다. 따라서 webrick을 추가해주면 해결이 가능합니다.

```ruby
bundle add webrick
```

## `An error occurred while installing wdm (0.1.1), and Bundler cannot continue.`

wdm 설치에 실패하여 발생하는 에러입니다. windows에서 `--watch` 옵션을 사용하기 위해서는 wdm을 설치해야 하는데, 만약 `--watch` 옵션을 사용하지 않을 것이라면 Gemfile에서 아래 코드를 주석 처리하여 줍니다.

```ruby
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
```

`--watch` 옵션을 사용하고 싶은 경우에는 현재 ruby의 버전을 특정 버전으로 낮추는 방법 밖에는 없습니다. 우선 설치되어 있는 ruby를 완전히 삭제하고, `C:\` 드라이브에 있는 Ruby 관련 폴더도 삭제헤줍니다. 이후 <a href="https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-3.1.2-1/rubyinstaller-devkit-3.1.2-1-x64.exe" target="_blank">ruby 3.1.2-1 버전</a>을 다운받아 설치한 후, `bundle install`부터 다시 실행시켜 주면 해결이 가능합니다.
