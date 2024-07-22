---
layout: post
title: "Python에서의 고차 함수 (feat. map, filter, reduce)"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-higher-order-function/title.jpg
featured: true
toc: true
---

프로그래밍 언어에서 고차 함수(Higher-order function)는 함수를 인자로 받거나, 함수를 반환하는 함수를 의미합니다. 이러한 함수들은 함수형 프로그래밍의 핵심 요소로, 코드의 재사용성과 가독성을 높이는 데 큰 역할을 합니다. 특히 파이썬에서는 고차 함수를 활용하기 좋습니다.

# 고차 함수의 개념

고차 함수는 다음 두 가지 특성 중 하나 이상을 만족하는 함수입니다.

1. 하나 이상의 함수를 인자로 받을 수 있다.
2. 함수를 반환할 수 있다.

이러한 특성 덕분에 고차 함수는 매우 유연하고 강력한 도구로 사용됩니다. 대표적인 고차 함수로는 `map()`, `filter()`, `reduce()` 등이 있습니다.

## 고차 함수의 장점

고차 함수는 다음의 여러 가지 장점을 가지고 있습니다.

1. 코드의 재사용성 : 고차 함수를 사용하면 동일한 코드 블럭을 여러 번 사용할 수 있어 코드의 재사용성이 높아집니다.
2. 가독성 향상 : 고차 함수를 사용하면 코드를 간결하게 작성할 수 있어 가독성이 향상됩니다. 특히, 익명 함수(lambda 함수)를 사용하면 더 짧고 명료한 코드를 작성할 수 있습니다.
3. 유연성 : 함수를 인자로 받거나 반환할 수 있어 매우 유연한 코드를 설계할 수 있습니다.

## 함수를 인자로 받는 함수의 예시

다음 예시는 함수를 인자로 받는 고차 함수를 생성합니다. `apply_function` 함수는 함수를 인자로 받아 해당 함수를 실행하게 됩니다.

```python
def apply_function(func, value) :
    return func(value)

def square(x) :
    return x * x

result = apply_function(square, 5)
print(result) # 25
```

## 함수를 반환하는 함수의 예시

다음 예시는 함수를 반환하는 고차 함수를 생성합니다. `create_multiplier` 함수는 입력값에 특정 값을 곱하는 기능을 하는 함수를 반환합니다.

```python
def create_multiplier(n) :
    def multiplier(x) :
        return x * n
    return multiplier

multiply_by_3 = create_multiplier(3)
print(multiply_by_3(10)) # 30
```

# Python에서의 고차 함수

파이썬은 고차 함수를 매우 효율적으로 지원합니다. 파이썬에서 자주 사용되는 몇 가지 고차 함수들에 대해서 설명하도록 하겠습니다.

## `map()`

`map()` 함수는 주어진 함수와 iterable을 인자로 받아, iterable의 각 요소에 함수를 적용한 결과를 반환합니다.

```python
def square(x) :
    return x * x

numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(square, numbers))
print(squared_numbers) # [1, 4, 9, 16, 25]
```

## `filter()`

`filter()` 함수는 주어진 함수와 iterable을 인자로 받아, 함수의 조건을 만족하는 요소만을 포함하는 iterable을 반환합니다.

```python
def is_even(n) :
    return n % 2 == 0

numbers = [1, 2, 3, 4, 5]
even_numbers = list(filter(is_even, numbers))
print(even_numbers) # [2, 4]
```

## `reduce()`

`reduce()` 함수는 iterable의 각 요소에 누적 함수를 적용하여 단일 값을 반환합니다. 이 함수는 `functools` 모듈에서 제공됩니다.

```python
from functools import reduce

def add(x, y) :
    return x + y

numbers = [1, 2, 3, 4, 5]
sum_of_numbers = reduce(add, numbers)
print(sum_of_numbers) # 15
```

고차 함수는 파이썬을 비롯한 여러 프로그래밍 언어에서 강력한 도구로 활용됩니다. 함수를 인자로 받거나 반환하는 이러한 함수들은 코드의 재사용성과 가독성을 높이며, 유연하고 간결한 코드를 작성하는 데 큰 도움이 됩니다. 이러한 고차 함수를 잘 활용하면 더욱 효율적인 코드를 작성할 수 있을 것입니다.
