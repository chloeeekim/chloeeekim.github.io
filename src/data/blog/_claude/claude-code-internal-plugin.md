---
title: "사내 전용 Claude Code 플러그인 만들기"
description: "팀에서 쓰는 스킬과 에이전트를 플러그인 하나로 묶어 private 마켓플레이스로 배포하기. 저장소 구조부터 설치·업데이트 전파, 삽질 포인트까지."
pubDatetime: 2026-09-17T09:00:00+09:00
author: "Chloe Jungah Kim"
tags:
  - claude-code
  - ai
featured: false
draft: false
---

## Table of contents

Claude Code를 팀에서 쓰다 보면 같은 작업을 반복하게 된다. 정해진 템플릿대로 티켓을 만들고, 새 API 명세를 mock 서버에 반영하고, 사내 컨벤션에 맞춰 커밋 메시지를 쓰는 일들. 이런 절차는 스킬(skill)로 한 번 정리해두면 꽤 편해진다. 문제는 **그 다음**이다.

처음엔 `~/.claude/skills/` 에 파일을 만들어두고 "이거 복사해서 쓰세요"라고 공유했다. 그런데 스킬을 고칠 때마다 다시 공유해야 하고, 누가 어떤 버전을 쓰는지 알 수가 없다. 절차가 바뀌었는데 옛날 스킬을 그대로 쓰는 사람이 생기는 순간, 자동화가 오히려 일을 늘린다.

Claude Code의 **플러그인(plugin)** 과 **마켓플레이스(marketplace)** 는 정확히 이 문제를 위한 장치다. 사내 전용 private 마켓플레이스를 만들어 팀 공용 플러그인을 배포한 과정을 정리해본다.

# 플러그인과 마켓플레이스

용어부터 정리하자.

- **플러그인**: 스킬·에이전트·슬래시 커맨드·훅·MCP 서버를 하나로 묶은 **설치 단위**. 플러그인 하나를 설치하면 그 안의 도구를 전부 얻는다.
- **마켓플레이스**: 플러그인들의 **카탈로그**. `.claude-plugin/marketplace.json` 하나만 있으면 어떤 git 저장소든 마켓플레이스가 된다.

중요한 건 마켓플레이스가 **public일 필요가 없다**는 점이다. private 저장소를 그대로 쓸 수 있고, 인증은 이미 로그인된 git 자격증명(`gh auth login` 또는 SSH 키)을 그대로 쓴다. 토큰 환경변수를 따로 세팅할 필요가 없다. 사내 절차나 내부 시스템 이름이 스킬 본문에 들어가기 마련이니, 사내용이라면 private으로 시작하는 게 낫다.

# 저장소 구조

전체 구조는 이렇다. 마켓플레이스 저장소 하나에 플러그인 여러 개가 들어간다.

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json            # 마켓플레이스 선언 (카탈로그)
└── plugins/
    └── dev-tools/                  # 플러그인 하나 = 도구 묶음
        ├── .claude-plugin/
        │   └── plugin.json         # 플러그인 매니페스트
        ├── skills/
        │   └── my-skill/
        │       ├── SKILL.md
        │       └── template.md     # 보조 파일
        ├── agents/
        │   └── my-agent.md
        └── hooks/
            └── hooks.json
```

`skills/`, `agents/`, `hooks/` 는 넣을 수 있는 항목의 예시일 뿐이고, 필요한 것만 두면 된다. 우리 팀은 실제로 `skills/` 만 쓰고 있다.

# 마켓플레이스 선언하기

저장소 루트에 `.claude-plugin/marketplace.json` 을 만든다.

```json
{
  "name": "myorg-tools",
  "owner": { "name": "MyOrg" },
  "plugins": [
    {
      "name": "dev-tools",
      "source": "./plugins/dev-tools",
      "description": "사내 공용 Claude Code 도구 모음 (개발용)"
    }
  ]
}
```

- `name` 이 마켓플레이스 식별자다. 나중에 `dev-tools@myorg-tools` 처럼 `<플러그인>@<마켓플레이스>` 형태로 설치할 때 쓰인다.
- `source` 는 마켓플레이스 루트 기준 **상대경로**다.

이 글에 나오는 `myorg`(GitHub 조직), `myorg-tools`(마켓플레이스 이름), `MyOrg`(소유자)는 전부 예시다. 실제로는 각자 조직 이름으로 바꿔서 쓰면 된다.

# 플러그인 매니페스트

플러그인 디렉토리 안에 `.claude-plugin/plugin.json` 을 만든다.

```json
{
  "name": "dev-tools",
  "description": "사내 공용 Claude Code 도구 모음 (개발용)",
  "author": { "name": "MyOrg" }
}
```

여기서 선택지가 하나 있다. **`version` 필드를 넣을지 말지**다.

- **생략**하면 플러그인은 브랜치의 최신 커밋을 버전으로 추종한다. `main` 에 push하는 순간이 곧 새 버전이고, version bump가 필요 없다.
- **명시**하면 그 값이 바뀔 때만 업데이트가 감지된다. 의도한 릴리스만 내보내고 싶을 때 쓴다.

사내 도구는 고쳤을 때 바로 반영되는 쪽이 편해서 `version` 을 생략했다. 반대로 오타 하나 고칠 때마다 전원에게 업데이트가 나가는 게 부담이면 `version` 을 두는 편이 낫다.

또 하나, `plugin.json` 의 `name` 이 곧 **네임스페이스**가 된다. 설치하고 나면 스킬은 `dev-tools:my-skill` 처럼 플러그인 이름이 앞에 붙은 형태로 호출된다.

# 스킬 추가하기

스킬 하나가 디렉토리 하나다. `plugins/dev-tools/skills/my-skill/SKILL.md` 를 만든다.

```markdown
---
name: my-skill
description: (무엇을, 언제 쓰는지. 자동 트리거 판단의 근거가 된다)
---

# 스킬 제목

(Claude가 따라야 할 절차와 규칙을 단계로 서술)
```

여기서 가장 중요한 건 **`description`** 이다. 본문을 아무리 잘 써도 `description` 이 부실하면 Claude가 그 스킬을 꺼내 쓸 타이밍을 못 잡는다. Claude는 이 한 줄을 보고 "지금 이걸 써야 하나"를 판단하기 때문이다.

그러니 *무엇을 / 언제 쓰는지* 를 구체적으로, 사용자가 실제로 쓸 법한 표현까지 넣어서 적는 게 좋다. 이슈 트래커에 개발 티켓을 만드는 스킬의 `description` 은 이렇게 생겼다.

```
description: AI 에이전트에게 작업을 맡기기 위한 개발 태스크를 정해진 템플릿 양식에 맞춰
  이슈 트래커에 생성한다. 사용자가 개발 태스크 만들기/생성, AI 에이전트용 작업 티켓
  작성 등을 요청할 때 사용. (...) 단순 문서 작성·회의록·조사 등 비개발 태스크에는
  사용하지 말 것.
```

**쓰면 안 되는 경우까지 적는 것**이 포인트다. 이 문장 하나로 엉뚱한 상황에서 스킬이 발동하는 오작동이 눈에 띄게 줄었다.

참고로 `name` 은 생략하면 디렉토리명이 기본값으로 들어가서 기술적으로는 선택 사항이다. 다만 나중에 파일을 찾을 때 헷갈리지 않도록 디렉토리명과 똑같이 명시하는 걸 규칙으로 삼았다.

## 보조 파일 사용하기

스킬 디렉토리에는 `SKILL.md` 외의 파일도 같이 둘 수 있다. 템플릿 마크다운이나 파이썬 스크립트 같은 것들이다. `SKILL.md` 안에서 **같은 디렉토리 기준 상대경로**로 참조하면 된다.

이게 생각보다 유용하다. 티켓 템플릿을 `SKILL.md` 본문에 하드코딩하는 대신 `template.md` 로 분리해두고, 스킬 절차에 이렇게 적어두는 식이다.

```markdown
1. **양식 로드**: 먼저 이 스킬 디렉토리의 `template.md`를 Read 한다.
   (양식은 바뀔 수 있으므로 매번 파일에서 읽는다 — 이 문서에 양식을 하드코딩하지 말 것.)
```

양식이 바뀌면 `template.md` 만 고치면 되고, 스킬의 절차 자체는 건드릴 필요가 없어진다.

# 에이전트 추가하기

에이전트는 파일 하나다. `plugins/dev-tools/agents/code-reviewer.md` 처럼 만든다.

```markdown
---
name: code-reviewer
description: 코드 품질·베스트프랙티스를 리뷰한다. 코드 작성/수정 후 사용.
tools: Read, Grep, Glob
model: sonnet
---

(에이전트의 시스템 프롬프트 본문 — 역할, 절차, 제약)
```

`name` 과 `description` 은 필수, `tools`(허용 도구 화이트리스트)와 `model` 은 선택이다.

제약이 하나 있다. **플러그인으로 배포되는 에이전트는 `hooks`, `mcpServers`, `permissionMode` frontmatter를 지원하지 않는다.** 넣어도 로드할 때 무시된다. 이 기능이 꼭 필요하면 해당 에이전트 파일을 `~/.claude/agents/` 에 직접 두고 개인 설정으로 쓰는 수밖에 없다.

# 설치하기

## 수동 설치

```bash
# 1. 마켓플레이스 등록
/plugin marketplace add myorg/claude-plugins

# 2. 플러그인 설치
/plugin install dev-tools@myorg-tools
```

GitHub 저장소는 `owner/repo` 단축형으로 쓸 수 있다. private 저장소여도 접근 권한이 있는 계정으로 `gh auth login` 이 되어 있으면 그대로 동작한다.

## 자동 설치 (권장)

팀원마다 위 명령을 치게 하는 대신, `~/.claude/settings.json` 에 이걸 넣어두면 `claude` 실행만으로 마켓플레이스 등록과 플러그인 활성화가 자동으로 된다.

```json
{
  "extraKnownMarketplaces": {
    "myorg-tools": {
      "source": { "source": "github", "repo": "myorg/claude-plugins" },
      "autoUpdate": true
    }
  },
  "enabledPlugins": { "dev-tools@myorg-tools": true }
}
```

온보딩 문서에 이 JSON 조각 하나만 넣어두면 되니 팀 배포에는 이쪽이 훨씬 편하다.

다만 **반영 시점에 주의**해야 한다. settings를 작성한다고 실행 중인 세션에 바로 설치되지는 않는다. 마켓플레이스 등록·클론·플러그인 설치는 **Claude Code를 새로 시작할 때** 일어나므로, 자동 설정을 넣었다면 **재시작해야** 반영된다. 세션 도중에 즉시 설치하려면 위의 수동 설치 명령을 쓰면 된다.

# 로컬 테스트

배포 전에 로컬에서 확인하려면 `--plugin-dir` 옵션으로 세션을 띄운다.

```bash
claude --plugin-dir ./plugins/dev-tools
```

세션이 뜨면 `/plugin` 이나 스킬 목록에 `dev-tools:<스킬명>` 이 보이는지 확인한다. 커밋 전에 이 단계를 한 번 거치면 frontmatter 오타나 JSON 문법 오류로 팀원들이 겪을 삽질을 미리 막을 수 있다.

# 업데이트 전파

`version` 을 생략한 구성에서는 스킬을 고쳐 `main` 에 push하는 순간이 곧 새 버전이다. 팀원에게 반영되는 경로는 두 가지다.

- **`autoUpdate` 가 켜진 경우**: Claude Code 시작 후 백그라운드로 최신 커밋을 받고, 다운로드가 끝나면 `/reload-plugins` 를 실행하라는 알림이 뜬다.
- **꺼진 경우**: 각자 수동으로 최신화한다.

  ```bash
  /plugin update dev-tools@myorg-tools       # 이 플러그인만
  /plugin marketplace update myorg-tools     # 카탈로그 새로고침 + 업데이트
  ```

기존 세션에 곧바로 반영하고 싶으면 `/reload-plugins` 를 실행하면 된다.

# 삽질 포인트

여기서부터는 실제로 겪은 헷갈리는 지점들이다.

## `/reload-plugins` 의 "0 skills" 는 오해하기 쉽다

`/reload-plugins` 를 실행했을 때 출력에 `0 skills` 라고 찍히는 경우가 있다. 스킬이 정상 로드됐는데도 카운트가 0으로 표시될 수 있으니 **이 숫자로 성공 여부를 판단하면 안 된다.**

로드 여부는 `/plugin` 으로 설치·활성 상태를 보거나, 스킬 목록에 `dev-tools:<스킬명>` 이 보이는지로 확인하는 게 확실하다.

## 자동 업데이트가 바로 안 돈다

`autoUpdate: true` 로 해뒀는데도 세션을 새로 켜자마자 확인하면 여전히 옛 버전인 경우가 있다. 백그라운드 업데이트 체크가 시작 직후가 아니라 **최대 10분 정도의 랜덤 지연 뒤에** 돌기 때문이다. 급하지 않으면 잠시 기다리거나 다음 실행 때 반영되고, 급하면 `/plugin update` 로 직접 당겨오면 된다.

## 자동 업데이트가 아예 안 될 때

그래도 갱신이 안 되면 두 군데를 확인한다.

첫째, **마켓플레이스 단위의 자동 업데이트가 꺼져 있는지** 본다. `/plugin` → Marketplaces → 해당 마켓플레이스를 열었을 때 `Enable auto-update` 가 보이면 지금 꺼져 있다는 뜻이니 이 항목을 선택해 켠다. (이미 켜져 있으면 반대로 `Disable auto-update` 로 표시된다.)

둘째, **Claude Code 전체 자동 업데이터가 꺼져 있는지** 본다. `~/.claude.json` 의 `autoUpdates` 값이 `false` 이면 플러그인을 포함한 백그라운드 자동 업데이트가 통째로 꺼진 상태다.

```bash
python3 -c "import json;print(json.load(open('$HOME/.claude.json')).get('autoUpdates', '<missing>'))"
```

`false` 라면 `true` 로 바꾼 뒤 **모든 세션을 종료했다가 다시 시작**한다. 실행 중이던 세션이 종료하면서 값을 되돌릴 수 있으니, 재시작 후 값이 유지됐는지 한 번 더 확인하는 게 좋다.

참고로 `/config` 에는 자동 업데이트 on/off 토글이 없어서 위처럼 파일을 직접 확인해야 한다. 그리고 `settings.json` 의 `env` 나 셸에 `DISABLE_AUTOUPDATER` 가 설정돼 있어도 자동 업데이트가 꺼지니 함께 확인하자.

## JSON 문법 오류

플러그인을 새로 추가할 때는 `plugin.json` 과 `marketplace.json` **두 파일을 모두** 만들거나 고쳐야 한다. 특히 `marketplace.json` 의 `plugins[]` 배열에 항목을 추가할 때 콤마를 빠뜨리기 쉬운데, JSON이 깨지면 마켓플레이스 전체가 로드되지 않는다. 앞서 말한 로컬 테스트로 먼저 확인하는 습관이 도움이 된다.

# 마치며

플러그인으로 옮기고 나서 가장 크게 달라진 건 **"스킬 고쳤어요, 다시 받아가세요"라는 말을 할 필요가 없어졌다**는 점이다. push하면 끝이고, 팀원들은 다음에 Claude Code를 켤 때 최신 버전을 쓰게 된다.

시작하는 데 필요한 건 JSON 두 개와 마크다운 한 개뿐이다. 팀에서 반복해서 설명하고 있는 절차가 있다면 그것부터 스킬로 옮겨보길 권한다. 그리고 그 스킬의 `description` 을 쓰는 데 시간을 가장 많이 들이자. 자동화가 실제로 작동할지 아닐지는 거기서 갈린다.
