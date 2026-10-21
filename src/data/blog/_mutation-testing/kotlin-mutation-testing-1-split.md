---
title: "Kotlin 뮤테이션 테스트 도구 만들기 1: 뮤테이션 테스트와 기존 도구"
description: "AI가 쓴 테스트는 늘어나는데 무엇을 검증하는지는 알기 어렵다. 커버리지가 놓치는 빈틈을 재는 뮤테이션 테스트의 개념과, Kotlin에서 쓸 수 있는 PIT, Arcmutate, Stryker, mutflow 같은 도구의 현황을 정리했다."
pubDatetime: 2026-10-13T09:00:00+09:00
author: "Chloe Jungah Kim"
tags:
  - kotlin
  - testing
  - mutation-testing
featured: false
draft: true
---

## Table of contents

요즘은 테스트 코드를 AI가 많이 쓴다. 테스트를 작성해 달라고 하면 몇 분 만에 수십 개가 생기고 커버리지도 금방 오른다. 그런데 들여다보면 함수를 호출만 하고 아무것도 검증하지 않는 테스트, 검증은 하는데 정작 지켜야 할 동작은 건드리지 않는 테스트가 섞여 있다. 테스트 케이스가 늘어난 만큼 의미 없는 테스트 케이스도 늘어난다. 그중 어느 것이 실제로 버그를 잡을 수 있는지 사람이 하나씩 리뷰하기에는 양이 너무 많다.

커버리지로는 이걸 가려낼 수 없다. 커버리지는 코드가 실행됐는지만 보고, 실행 결과를 검증했는지는 보지 않기 때문이다. 테스트가 정말 동작을 지키고 있는지 재는 방법이 뮤테이션 테스트이고, AI가 테스트를 대량으로 쓰기 시작하면서 다시 주목받고 있다.

Kotlin용 Stryker 스타일 뮤테이션 테스트 도구를 직접 만들어 보려 한다. 그 전에 뮤테이션 테스트가 무엇이고, Kotlin에서 쓸 수 있는 도구가 지금 어떤 상태인지부터 정리해 둔다.

# 커버리지가 보지 않는 것

```kotlin
fun isAdult(age: Int) = age >= 18

@Test
fun isAdultTest() {
    isAdult(30)
}
```

이 테스트만으로 `isAdult`의 라인 커버리지는 100%다. 그런데 assert가 없으니 `isAdult`가 무엇을 반환하든 통과한다.

assert를 넣어도 빈틈은 남는다.

```kotlin
@Test
fun isAdultTest() {
    assertTrue(isAdult(30))
    assertFalse(isAdult(10))
}
```

`>=`를 `>`로 바꿔도 30과 10의 결과는 그대로라 테스트가 통과한다. 18이라는 경계값을 확인하지 않았기 때문이다. 누군가 실수로 `>`를 쓰면 18세가 성인 판정에서 빠지는데, 이 테스트는 그걸 잡지 못한다.

뮤테이션 테스트는 이런 실수를 일부러 만든다. 프로덕션 코드에 작은 변경(뮤턴트)을 하나 심고 기존 테스트를 돌려서 결과를 판정한다.

- **Killed**: 테스트가 실패했다. 테스트가 변경을 잡아냈다
- **Survived**: 테스트가 통과했다. 테스트의 빈틈이다
- **No coverage**: 변경된 코드를 지나는 테스트가 없다
- **Timeout**: 변경 때문에 무한 루프 등에 빠져 제한 시간 안에 끝나지 않았다. 보통 잡아낸 것으로 센다

죽인 뮤턴트 수를 전체 뮤턴트 수로 나눈 값이 뮤테이션 스코어다. 위 예시에서 `>=` → `>` 뮤턴트는 Survived로 남고, 리포트를 본 사람은 18을 넣는 테스트가 빠졌다는 걸 알게 된다.

뮤턴트를 만드는 규칙은 연산자(mutator)라고 부른다. 경계 조건(`<` → `<=`), 조건 반전(`==` → `!=`), 산술(`+` → `-`), 반환값 변경(`return x` → `return null`), 증감(`i++` → `i--`), 호출 제거(메서드 호출 한 줄 삭제)가 대표적이다.

대가도 있다. 뮤턴트마다 테스트를 돌리니 비용이 크다. 실무에서는 바뀐 코드만 분석하거나, PR 단위로 돌리거나, 대상 패키지를 좁혀서 감당한다. 또 원본과 동작이 똑같은 뮤턴트(동등 뮤턴트)는 어떤 테스트로도 죽일 수 없어서 100%는 현실적인 목표가 아니다. 스코어를 목표 수치로 걸면 테스트가 아니라 숫자를 맞추게 된다. **살아남은 뮤턴트를 하나씩 보면서 테스트의 빈틈을 찾는 리뷰 도구**로 쓰는 편이 맞다.

# 이미 있는 도구

## PIT

JVM에서 뮤테이션 테스트라고 하면 PIT(Pitest)다. 오픈소스이고, Gradle에서는 `info.solidsoft.pitest` 플러그인으로 붙인다. 컴파일된 바이트코드를 변형하기 때문에 Kotlin 프로젝트에서도 그대로 돈다.

문제는 Kotlin 컴파일러가 소스에 없는 코드를 많이 만든다는 점이다.

- 파라미터마다 들어가는 `Intrinsics.checkNotNullParameter` null 체크
- data class가 만드는 `equals`, `hashCode`, `toString`, `copy`, `componentN`
- `suspend` 함수의 코루틴 상태 머신
- `when`, `lateinit`, 기본 인자를 위한 보조 코드

PIT는 이 코드를 개발자가 쓴 코드와 구분하지 못하고 똑같이 변형한다. 개발자가 고칠 수도 없고 고칠 필요도 없는 뮤턴트(junk mutant)가 리포트를 채운다. 생존 뮤턴트를 리뷰하려고 쓰는 도구인데, 리뷰할 목록에 노이즈가 섞인다.

## Arcmutate

PIT 개발팀이 만든 상용 확장이다. Kotlin 플러그인이 위의 junk mutant를 걸러준다. 그 밖에 git diff 기반 분석, GitHub/GitLab PR 요약 코멘트, 확장 연산자와 Spring 전용 연산자, 실행을 빠르게 하는 accelerator를 제공한다. 예전에 오픈소스로 있던 `pitest-kotlin`은 관리가 멈췄고 그 역할이 Arcmutate로 넘어갔다. 가격과 라이선스 조건은 공식 사이트에서 확인해야 한다.

## Stryker

Stryker는 언어별로 구현이 따로 있다. StrykerJS(JS/TS), Stryker.NET(C#), Stryker4s(Scala). **Kotlin과 Java는 지원하지 않는다.** 뮤테이션 테스트 도입 사례를 찾아보면 Stryker를 쓰는 회사가 많이 보이는데, 대부분 JS/TS나 .NET 스택이다.

접근 방식이 PIT와 다르다.

- 소스 코드(AST)를 변형한다. 리포트가 소스 위치 기준이라 읽기 쉽다
- **Mutant Schemata**: 모든 뮤턴트를 한 번에 코드에 심어 두고, 어느 뮤턴트를 켤지 런타임 스위치로 고른다. 소스를 변형하는데도 빌드는 한 번이다
- 테스트별 커버리지(perTest)를 모아서 뮤턴트마다 그 코드를 지나는 테스트만 돌린다
- TypeScript에서는 checker로 컴파일 에러가 나는 뮤턴트를 실행 전에 걸러낸다
- 증분 모드가 있다 (StrykerJS `--incremental`, Stryker.NET `--since`)
- 리포트 형식을 `mutation-testing-elements`라는 공개 스키마로 정의하고, 이 JSON을 읽는 인터랙티브 HTML 리포트를 제공한다
- Stryker Dashboard에 결과를 올리고 배지로 붙일 수 있다
- `// Stryker disable next-line` 주석으로 특정 줄을 제외한다
- `npx stryker init`으로 설정 파일을 대화형으로 만든다

Kotlin에서 원하는 경험이 이쪽이다. 소스 기준으로 읽히는 리포트, 주석 한 줄로 끄는 예외 처리, 명령 하나로 시작하는 설정.

## 그 밖에

[mutant-kraken](https://github.com/JosueMolinaMorales/mutant-kraken)은 Kotlin 소스를 직접 변형하는 도구다. Rust로 만들었고 tree-sitter로 Kotlin을 파싱한다. `?.`를 `!!`로 바꾸거나 `?:`를 지우는 Kotlin 전용 연산자가 있고, ICST 2024 뮤테이션 워크숍에서 논문으로 발표됐다. 다만 README에 아직 베타이고 실무용으로는 준비되지 않았다고 적혀 있고, 마지막 릴리스는 2025년 11월(v0.1.6)이다.

[mutflow](https://github.com/anschnapp/mutflow)는 2026년에 나온 오픈소스 도구로, 지금도 활발하게 업데이트되고 있다. K2 컴파일러 플러그인으로 IR 단계에서 모든 뮤턴트를 조건 분기로 심어 두고 한 번만 컴파일한다. 독립 실행 도구가 아니라 테스트 안에서 `MutFlow.underTest { }` 블록으로 돌리는 방식이고, 결과는 테스트 실행 중 요약으로 보여준다. 1.x 버전으로 Maven Central에 배포되고 있지만, 공개된 지 1년이 안 됐고 커밋 대부분을 작성자 한 명이 쓴 프로젝트라 실무에서 검증됐다고 보기는 아직 이르다. 모든 뮤턴트를 심어 두고 한 번만 컴파일한다는 점은 Stryker의 schemata와 같은 발상이다.

## 나란히 놓으면

| | Stryker | PIT | PIT + Arcmutate | mutflow |
| --- | --- | --- | --- | --- |
| 지원 언어 | JS/TS, C#, Scala | JVM 언어 | JVM 언어 | Kotlin (JVM, Native) |
| Kotlin 지원 | 없음 | 바이트코드라 동작은 함 | Kotlin 플러그인 | Kotlin 전용 |
| 변형 대상 | 소스(AST) | 바이트코드 | 바이트코드 | IR (K2 컴파일러 플러그인) |
| 재빌드 비용 | schemata로 빌드 1회 | 재컴파일 없음 | 재컴파일 없음 | 조건 분기로 심어 컴파일 1회 |
| junk mutant | 구조적으로 적음 | Kotlin에서 많음 | 걸러줌 | 지정한 대상 클래스만 변형 |
| 증분 실행 | 지원 | 히스토리 파일 기반 | git diff 기반 | README에 없음 |
| PR 연동 | Dashboard, 배지 | 없음 | PR 요약 코멘트 | README에 없음 |
| 리포트 | 공개 스키마 + 인터랙티브 HTML | HTML | HTML + PR 코멘트 | 테스트 실행 요약, 마크다운 |
| 라이선스 | 오픈소스 | 오픈소스 | 상용 | 오픈소스 |

Kotlin 팀이 지금 뮤테이션 테스트를 실무에 도입한다면 가장 현실적인 선택은 PIT와 Arcmutate 조합이다. Stryker처럼 소스를 직접 변형하면서 프로젝트 밖에서 독립 실행되는 도구는 Kotlin에 아직 실무에서 쓸 만한 것이 없다. 이 빈자리를 사이드 프로젝트로 직접 채워 보려 한다.

다음 글에서는 어떤 방식으로 만들지, 왜 그렇게 정했는지를 정리한다.
