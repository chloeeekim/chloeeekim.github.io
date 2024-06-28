---
layout: post
title:  "Python String Formatting 방법"
author: chloeeekim
categories: [ Python, Programming ]
image: assets/images/python-string-formatting/title.png
featured: false
hidden: true
toc: true
---

python은 다양한 문자열 포맷팅 방법을 지원합니다. python의 버전에 따라 지원되는 포맷팅 방법이 달라지기도 하니 사용하는 python의 버전을 확인하고 사용하시기 바랍니다.

# % operator

C 스타일로 문자열을 포맷팅하는 방법입니다. python3 이전에 사용되던 방법으로, python 버전에 상관이 없으며, C 문법에 익숙하다면 간단하게 사용할 수 있습니다. % operator를 사용하는 경우, 포맷팅하고자 하는 자료형의 데이터 타입이 동일해야 하는데, 때문에 자료형 별로 어떠한 문자열 포맷 코드를 사용해야 하는지를 알고 있어야 합니다. 사용 예시는 다음과 같습니다.

```python
>>> "Hello %s" % "World"
'Hello World'
```

많이 사용되는 포맷 코드는 다음과 같습니다. 참고로 `%` 문자 자체를 출력하고 싶은 경우에는 `%%`를 사용합니다.

| 포맷 코드 | 설명 |
| :---: | :--- |
| `%s` | 문자열 |
| `%d` | 정수 |
| `%f` | 실수 |
| `%o` | 8진수 |
| `%x`, `%X` | 16진수 (lowercase, uppercase) |
| `%c` | 단일 문자 |

포맷 코드와 연결된 데이터의 타입이 다를 경우에는 에러가 발생하게 됩니다. 예를 들어, `%d` 포맷 코드를 사용하였는데 문자열을 넣어주는 경우 `TypeError`가 발생합니다. 하지만 특이하게 `%s` 포맷 코드의 경우에는 어떠한 타입의 값이건 넣을 수 있습니다.

```python
>>> "I am %s years old" % 31
'I am 31 years old'
>>> "Pi number is %s" % 3.14
'Pi number is 3.14'
```

위와 같이 정수 타입인 `%d`나 실수 타입인 `%f`를 쓰지 않아도 `%s`를 사용하면 자동으로 넘어오는 값들을 문자열로 바꾸어 대입해주게 됩니다.

## 여러 개의 값 사용하기

문자열 안에 여러 개의 포맷 코드를 사용하는 경우에는 % 뒤에 오는 값들을 콤마로 구분하여 소괄호로 감싸야 합니다. 소괄호로 묶지 않으면 에러가 발생하게 됩니다. 값들은 순서대로 연결되며, 포맷 코드의 개수와 변수의 개수가 동일하여야 합니다.

```python
>>> "%d + %d = %d" % (1, 2, 3)
'1 + 2 = 3'
>>> "Today is %d %s" % (6, 'June')
'Today is 6 June'
```

값들이 소괄호로 묶여 있지 않다거나(이 경우 값이 하나만 넘어온 것으로 간주됩니다), 값이 적거나 많은 경우에는 다음과 같이 에러가 발생합니다.

```python
>>> "%d + %d = %d" % 1, 2, 3
TypeError: not enough arguments for format string
>>> "%d + %d = %d" % (1, 2)
TypeError: not enough arguments for format string
>>> "%d + %d = %d" % (1, 2, 3, 4, 5)
TypeError: not all arguments converted during string formatting
```

## 자릿수 지정하기



## 문자열 정렬하기
