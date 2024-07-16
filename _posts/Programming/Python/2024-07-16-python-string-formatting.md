---
layout: post
title:  "Python String Formatting 방법"
author: chloeeekim
categories: [ Python, Programming ]
image: assets/images/python-string-formatting/title.png
featured: true
toc: true
---

python은 다양한 문자열 포맷팅 방법을 지원합니다. 본 포스팅에서는 각 방법의 사용법과 장단점 등에 대하여 설명하도록 하겠습니다. 참고로, python의 버전에 따라 지원되는 포맷팅 방법이 달라지기도 하니 사용하는 python의 버전을 확인하고 사용하시기 바랍니다.

# % operator

% operator는 C 스타일로 문자열을 포맷팅하는 방법입니다. python3 이전에 사용되던 방법으로, python 버전에 상관이 없으며, C 문법에 익숙하다면 간단하게 사용할 수 있습니다. % operator를 사용하는 경우, 포맷팅하고자 하는 자료형의 데이터 타입이 동일해야 하는데, 때문에 자료형 별로 어떠한 문자열 포맷 코드를 사용해야 하는지를 알고 있어야 합니다. 사용 예시는 다음과 같습니다.

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

## 장단점

낮은 버전의 python에서도 호환이 된다는 장점이 있으나, % operator의 경우, 사용하고자 하는 데이터의 타입이 정확히 일치해야 한다는 단점이 있습니다. 또한, 포맷팅할 문자열이 길어지는 경우 가독성이 매우 떨어집니다. 때문에 사용을 권장하지는 않습니다.

# `str.format()`

python3에서 도입된 방법으로, % operator보다 더 유연하고 읽기 쉬운 포맷팅을 제공합니다. 사용 예시는 다음과 같습니다.

```python
>>> name = "Bob"
>>> age = 25
>>> "Hi, my name is {}. I'm {} years old.".format(name, age)
"Hi, my name is Bob. I'm 25 years old."
```

## 인덱스 및 키워드를 사용한 포맷팅

다음과 같이 인덱스를 사용하여 순서를 지정해 줄 수도 있습니다.

```python
>>> greeting = "Hi, my name is {0}. I'm {1} years old."
>>> greeting.format('Bob', 25)
"Hi, my name is Bob. I'm 25 years old."
```

혹은 다음과 같이 키워드를 사용하여 포맷팅을 할 수도 있습니다. 이 경우에는 매개변수의 순서가 상관이 없어집니다.

```python
>>> greeting = "Hi, my name is {name}. I'm {age} years old."
>>> greeting.format(name='Bob', age=25)
"Hi, my name is Bob. I'm 25 years old."
```

## 장단점

`str.format()` 메소드는 % operator보다는 가독성이 좋아졌지만, 여러 매개변수와 긴 문자열을 처리할 때는 역시나 가독성이 떨어진다는 단점이 있습니다. 때문에 python3.6 이상이라면 아래에서 설명할 f-string 사용이 권장됩니다. 하지만 낮은 버전의 python3와의 하위 호환이 필요한 경우, `str.format()` 메소드를 사용하는 것이 좋습니다.

# f-string (문자열 리터럴)

f-string은 python3.6부터 도입된 가장 현대적인 포맷팅 방법으로, 표현식의 삽입이 가능하다는 장점이 있습니다. 가독성이 매우 뛰어나며, 속도도 빠르기 때문에 하위 버전 호환이 필요한 경우가 아니라면 f-string 사용이 권장됩니다. f-string을 사용하려면 문자열 앞에 `f` 혹은 `F`를 붙이고, 중괄호(`{}`) 안에 매개변수를 입력해주면 됩니다. 사용 예시는 다음과 같습니다.

```python
>>> name = "Bob"
>>> age = 25
>>> greeting = f"Hi, my name is {name}. I'm {age} years old."
"Hi, my name is Bob. I'm 25 years old."
```

## 다양한 f-string 사용 방법

f-string을 사용하면 다음과 같이 표현식을 사용하여 문자열을 포맷팅 할 수도 있습니다.

```python
>>> a = 5
>>> b = 10
>>> f"{a} plus {b} is {a + b}"
'5 plus 10 is 15'
```

f-string은 여러 줄에 걸쳐서 사용할 수도 있습니다. 다중 라인 포맷팅을 위해 삼중 따옴표(`'''` 혹은 `"""`)를 사용합니다.

```python
>>> name = "Alice"
>>> age = 30
>>> address = "Seoul"
>>> f"""
Name = {name}
Age = {age}
Address = {address}
"""
```

## 장단점

f-string은 간결하고 강력한 문자열 포맷팅 방법입니다. 변수, 표현식, 함수 호출 등 다양한 요소를 삽입하여 손쉽게 문자열 포맷팅을 할 수 있습니다. f-string을 사용하면 코드의 가독성이 높아질 뿐만 아니라, 문자열 처리 속도 또한 향상됩니다. 하지만 파이썬 3.6 이상에서만 사용할 수 있기 때문에 하위 버전과의 호환이 필요한 경우 사용이 제한된다는 단점이 있습니다. 또, 외부 입력값을 f-string에 직접 사용할 때는 악의적인 코드가 실행될 수 있기 때문에 주의가 필요합니다.

# 문자열 포맷팅 옵션

## 정렬

간단한 옵션 사용을 통해 문자열을 왼쪽, 오른쪽, 가운데 정렬하여 표시되도록 할 수 있습니다. 왼쪽 정렬은 `{:<}`, 오른쪽 정렬은 `{:>}`, 가운데 정렬은 `{:^}`를 사용합니다. 뒤에 따라오는 숫자는 몇 칸을 사용할 것인지를 의미하며, 문자열의 길이가 해당 숫자보다 긴 경우에는 정렬이 적용되지 않습니다. 사용 예시는 다음과 같습니다.

```python
>>> text = "align"
>>> f"{text:<10}"
'align     '
>>> f"{text:>10}"
'     align'
>>> f"{text:^10}"
'  align   '
```

참고로, 정렬은 남는 공간이 공백으로 채워지는 것으로, 공백이 아닌 다른 문자로 채우고 싶다면 `<`, `>`, `^` 기호 앞에 원하는 특정 문자를 입력하면 됩니다.

```python
>>> text = "align"
>>> f"{text:.^10}"
'..align...'
```

## 숫자 포맷팅

숫자에 대해서도 마찬가지로 간단한 옵션 사용을 통해 소수점 이하 자리수를 지정하거나(`{:.nf}`), 천 단위 구분 기호를 추가하는 등(`{:,.nf}`)의 동작을 할 수 있습니다. 사용 예시는 다음과 같습니다.

```python
>>> number = 1234.56789
>>> f"{number:.2f}"
'1234.57'
>>> f"{number:,.2f}"
'1,234.57'
```

여기까지 파이썬에서 제공하는 문자열 포맷팅 방법에 대하여 알아보았습니다. 문자열 포맷팅 방법은 기본적으로 f-string의 사용을 권장하지만, 상황에 맞게 최적의 포맷팅 방법을 선택하여 사용하는 것이 필요합니다. 때문에 각 방식의 특징을 이해할 필요가 있습니다. 적절한 방법을 사용하는 것이 코드의 가독성을 높이고, 데이터를 더 효과적으로 표현할 수 있을 것입니다.
