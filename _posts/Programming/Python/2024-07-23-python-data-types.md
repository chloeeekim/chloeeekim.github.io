---
layout: post
title: "Python의 자료형 살펴보기"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-data-types/title.jpg
featured: true
toc: true
---

파이썬은 많은 개발자들에게 사랑 받는 프로그래밍 언어입니다. 파이썬을 잘 사용하기 위해서는 자료형(data type)을 이해하는 것이 무엇보다 중요합니다. 이번 포스팅에서는 파이썬의 자료형에 대해 자세히 알아보도록 하겠습니다.

파이썬의 기본 문법에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/python-tutorial/" target="_blank">Python Tutorial</a> 포스팅을 참고하시기 바랍니다.

# 기본 자료형

파이썬의 기본 자료형은 크게 숫자형, 문자열, 리스트, 튜플, 세트, 딕셔너리가 있습니다. 각 자료형은 고유한 특성과 용도를 가지고 있기 때문에, 상황에 맞게 적절히 사용해야 합니다.

## 숫자형

숫자형에는 정수형(`int`), 실수형(`float`), 복소수형(`complex`) 등이 존재합니다.

- 정수형(`int`) : 정수 값을 나타냅니다. (`x = 10`)
- 실수형(`float`) : 부동 소수점을 포함한 실수 값을 나타냅니다. (`y = 10.5`)
- 복소수형(`complex`) : 실수부와 허수부로 구성된 복소수를 나타냅니다. (`z = 1 + 2j`)

## 문자열 (String)

문자열은 큰따옴표(`""`)나 작은 따옴표(`''`)로 감싸서 선언할 수 있습니다. 문자열은 불변(immutable) 자료형으로, 생성 후에는 변경할 수 없으나, 다양한 메서드를 이용하여 조작할 수 있습니다.

```python
s = "Hello, world!"
```

## 리스트 (List)

리스트는 여러 값을 하나의 변수에 저장할 수 있는 자료형으로, 대괄호(`[]`)를 사용하여 정의합니다. 리스트는 가변(mutable) 자료형으로, 요소를 추가, 삭제, 변경할 수 있습니다.

```python
my_list = [1, 2, 3, 4, 5]
```

## 튜플 (Tuple)

튜플은 리스트와 유사하지만, 불변(immutable) 자료형입니다. 소괄호(`()`)를 사용하여 정의합니다.

```python
my_tuple = (1, 2, 3, 4, 5)
```

## 세트 (Set)

세트는 중복을 허용하지 않는 자료형으로, 중괄호(`{}`)를 사용하여 정의합니다. 순서가 없기 때문에 인덱싱이 불가능하다는 특징이 있습니다.

```python
my_set = {1, 2, 3}
```

## 딕셔너리 (Dictionary)

딕셔너리는 키-값(key-value) 쌍으로 데이터를 저장하는 자료형입니다. 중괄호(`{}`)를 사용하여 정의하며, 키를 통해 값을 조회할 수 있습니다.

```python
my_dict = {"name": "Alice", "age": 23}
```

# 자료형 변환

파이썬에서는 자료형 간의 변환이 매우 용이합니다. 이를 통해 다양한 형태의 데이터를 유연하게 처리할 수 있습니다.

## 암시적 형변환

파이썬은 필요에 따라 자동으로 자료형을 변환합니다. 이를 암시적 형변환(implicit type conversion)이라고 합니다. 아래 예시에서 int 형과 float 형을 더하기 위해 암시적으로 float 형으로 변환되는 것을 확인할 수 있습니다.

```python
x = 10
y = 2.5
z = x + y # 12.5 (float)
```

## 명시적 형변환

명시적 형변환(explicit type conversion)이란 사용자가 직접 자료형을 변환하는 방법을 의미합니다. 아래 예시에서 string 타입을 int 형으로 명시적으로 변환한 것을 확인할 수 있습니다.

```python
x = 10
y = "20"
z = x + int(y) # 30 (int)
```

# 확장 자료형

기본 자료형 이외에도 파이썬은 데이터 처리를 위한 다양한 확장 자료형을 제공합니다.

## 배열 (Array)

배열은 동일한 자료형의 요소들을 저장하는 자료형으로, `array` 모듈을 사용하여 정의할 수 있습니다. 배열은 리스트와 유사하지만, 더 효율적인 메모리 사용과 성능을 제공합니다. 배열의 사용법에 대해서는 <a href="https://chloeeekim.github.io/python-array/" target="_blank">Python의 배열(Array) - 효율적인 데이터 처리하기</a> 포스팅을 참고하시기 바랍니다.

```python
import array as arr
my_array = arr.array('i', [1, 2, 3, 4])
```

## 데이터프레임 (DataFrame)

데이터프레임은 표 형태의 데이터를 저장하고 조작하기 위한 자료형으로, 주로 `pandas` 라이브러리를 사용하여 정의합니다.

```python
import pandas as pd
data = {'name': ['Alice', 'Bob'], 'age': [25, 30]}
df = pd.DataFrame(data)
```

# 사용자 정의 자료형

파이썬에서는 클래스(class)를 사용하여 사용자 정의 자료형을 만들 수 있습니다. 이를 통해 객체 지향 프로그래밍(OOP)의 강력한 기능을 활용할 수 있습니다. 아래 예시는 이름과 나이를 가지는 클래스를 생성하고, `greet` 함수를 정의한 것입니다.

```python
class Person :
    def __init__(self, name, age) :
        self.name = name
        self.age = age
    
    def greet(self) :
        return f"Hello, my name is {self.name}. I'm {self.age} years old."

p = Person("Alice", 25)
print(p.greet()) # Hello, my name is Alice. I'm 25 years old.
```

파이썬의 자료형은 매우 다양하고 강력하며, 이를 잘 이해하고 활용하면 효율적이고 안정적인 코드를 작성할 수 있습니다. 이번 포스팅에서는 파이썬의 기본 자료형부터 확장 자료형, 그리고 사용자 정의 자료형까지 다뤘습니다. 파이썬의 자료형을 제대로 이해하고 활용하면 더욱 발전된 프로그래밍을 할 수 있을 것입니다. 파이썬의 자료형에 대한 더 많은 정보가 필요하다면 파이썬 공식 문서를 참고하시길 바랍니다.
