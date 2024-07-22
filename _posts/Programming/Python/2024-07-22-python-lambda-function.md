---
layout: post
title: "Python Lambda Function에 대하여"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-lambda-function/title.png
featured: true
toc: true
---

파이썬에서는 람다 함수(lambda function)를 사용하여 익명 함수(Anonymous Function)를 간단하게 정의할 수 있습니다. 람다 함수는 이름이 없는 함수로, 주로 짧은 코드 블럭에서 일회성으로 사용됩니다. 이번 포스팅에서는 파이썬 람다 함수의 개념과 사용법, 그리고 예제를 통해 람다 함수를 어떻게 활용할 수 있는지에 대해 자세히 설명하겠습니다.

# 람다 함수란?

람다 함수는 `lambda` 키워드를 사용하여 정의되는 익명 함수입니다. 일반적인 함수 정의 방식과는 다르게, 람다 함수는 한 줄로 간결하게 작성할 수 있습니다. 기본 문법은 다음과 같습니다.

```python
lambda arguments: expression
```

여기서 `arguments`는 함수의 인자들을, `expression`은 인자들을 사용하여 계산되는 표현식을 의미합니다. 람다 함수는 값으로 평가되며, 주로 다른 함수의 인자로 전달되거나 변수에 할당됩니다.

## 람다 함수의 장점

람다 함수는 다음과 같은 장점을 가지고 있습니다.

1. 간결성 : 짧고 간결하게 함수를 정의할 수 있어 코드의 가독성을 높입니다.
2. 일회성 사용 : 일회성으로 사용되는 간단한 함수를 정의할 때 유용합니다.
3. 고차 함수와 함께 사용 : 고차 함수와 함께 사용하여 더욱 직관적인 코드를 작성할 수 있습니다.

## 간단한 람다 함수의 예시

다음은 간단한 람다 함수를 사용하는 예제입니다. `lambda x, y: x + y`는 두 인자를 더하는 람다 함수를 정의하고, 이를 `add` 변수에 할당합니다.

```python
add = lambda x, y: x + y
print(add(5, 3)) # 8
```

# 고차 함수와 Lambda 함수

파이썬에서 제공하는 다양한 고차 함수들과 람다 함수는 함께 사용할 때 더욱 직관적이고 효율적인 코드를 작성할 수 있게 됩니다. 파이썬의 고차 함수에 대해서는 <a href="https://chloeeekim.github.io/python-higher-order-function/" target="_blank">Python에서의 고차 함수 (feat. map, filter, reduce)</a>포스팅을 참고 부탁드립니다.

## `map()` 함수와 람다 함수

`map()` 함수와 람다 함수를 같이 사용할 수 있습니다. 람다 함수를 사용하면 따로 함수를 선언하지 않으므로 간결한 코드가 됩니다.

```python
numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(lambda x: x * x, numbers))
print(squared_numbers) # [1, 4, 9, 16, 25]
```

## `filter()` 함수와 람다 함수

`filter()` 함수와도 람다 함수를 같이 사용할 수 있습니다.

```python
numbers = [1, 2, 3, 4, 5]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers) # [2, 4]
```

## `reduce()` 함수와 람다 함수

`reduce()` 함수를 사용하여 리스트의 요소를 누적하는 경우에도 사용이 가능합니다.

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]
sum_of_numbers = reduce(lambda x, y: x + y, numbers)
print(sum_of_numbers) # 15
```

## `sorted()` 함수와 람다 함수

`sorted()` 함수를 사용하면서 람다 함수를 사용하여 `key` 인자를 함수로 받아 정렬 기준을 정의할 수 있습니다.

```python
students = [
    {'name': 'Alice', 'grade': 'B'},
    {'name': 'Bob', 'grade': 'A'},
    {'name': 'Charlie', 'grade': 'C'},
]

sotred_students = sorted(students, key=lambda student: student['grade'])
print(sorted_students) # [{'name': 'Bob', 'grade': 'A'}, {'name': 'Alice', 'grade': 'B'}, {'name': 'Charlie', 'grade': 'C'}]
```

# 람다 함수 사용 시의 주의사항

람다 함수는 간결하고 일회성으로 사용하기 좋지만, 복잡한 로직을 포함하는 경우에는 일반 함수를 사용하는 것이 더 적합할 수 있습니다. 다음은 람다 함수를 사용할 때의 몇 가지 주의사항입니다.

1. 가독성 : 너무 복잡한 람다 함수를 사용하면 코드의 가독성이 오히려 떨어질 수 있습니다. 간단한 함수를 정의하는 경우에만 사용하는 것이 좋습니다.
2. 디버깅 : 람다 함수는 이름이 없기 때문에 디버깅이 어려울 수 있습니다. 복잡한 로직이 필요한 경우 일반 함수를 사용하는 것이 좋습니다.

파이썬의 람다 함수는 코드의 간결성과 가독성을 높이는 강력한 도구입니다. 짧고 단순한 함수를 정의할 때 유용하며, 특히 고차 함수와 함께 사용하면 더욱 효과적입니다. 하지만 복잡한 로직을 처리할 때에는 일반 함수를 사용하는 것이 좋을 수 있습니다. 람다 함수의 개념과 사용법을 잘 이해하고, 적절히 활용하면 더욱 효율적이고 직관적인 파이썬 코드를 작성할 수 있을 것입니다.
