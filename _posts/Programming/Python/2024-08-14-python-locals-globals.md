---
layout: post
title: "Python의 locals()와 globals() 함수 이해하기"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-locals-globals/title.jpg
featured: true
toc: true
---

Python은 많은 내장 함수를 제공하고 있습니다. 덕분에 코드를 보다 효율적이고 이해하기 쉽게 작성할 수 있습니다. 그 중에서도 `locals()`와 `globals()` 함수는 현재 상태를 이해하고 디버깅하는 데 매우 유용하게 사용될 수 있습니다. 이번 포스팅에서는 `locals()`와 `globals()` 함수에 대해 알아보도록 하겠습니다.

# `locals()` 함수란?

`locals()` 함수는 현재의 지역 스코프(local scope) 내에 있는 모든 변수를 딕셔너리 형태로 반환해주는 파이썬 내장 함수입니다. 이 함수는 호출된 위치에 따라서 반환하는 값이 달라지며, 반환되는 딕셔너리는 변수 이름을 key로, 변수 값을 value로 가집니다. 다음 예제는 `example()` 함수 내의 변수들을 딕셔너리 형태로 출력하게 됩니다.

```python
def example() :
    a = 10
    b = 20
    print(locals())

example() # {'a': 10, 'b': 20}
```

참고로 `locals()` 함수는 현재 로컬 스코프의 복사본을 반환하기 때문에, 반환된 딕셔너리를 수정하더라도 실제 로컬 변수에는 반영되지 않습니다.

```python
def modify_locals() :
    a = 1
    b = 2
    locals()['a'] = 100
    print(locals())

modify_locals() # {'a': 1, 'b': 2}
```

# `globals()` 함수란?

`globals()` 함수는 현재의 전역 스코프(global scope) 내에 있는 모든 변수를 딕셔너리 형태로 반환해주는 파이썬 내장 함수입니다. 이 함수는 언제나 전역 변수를 참조하며, 반환되는 딕셔너리는 변수 이름을 key로, 변수 값을 value로 가집니다. 다음 예제는 전역 스코프의 모든 변수들을 딕셔너리 형태로 출력하게 됩니다.

```python
a = 10
b = 20

def example() :
    print(globals())

example() # {'__name__': '__main__', '__doc__': None, '__packeage__': None, 'a': 10, 'b': 20}
```

참고로 `globals()` 함수로 반환된 딕셔너리는 실제 전역 변수를 참조하고 있기 때문에, 이 딕셔너리를 수정하면 실제 전역 변수도 수정되게 됩니다.

```python
a = 1
b = 2

def modify_gloabls() :
    globals()['a'] = 100
    print(globals())

modify_globals() # {'__name__': '__main__', '__doc__': None, '__packeage__': None, 'a': 100, 'b': 2}
```

# `locals()`와 `globals()` 비교하기

두 함수의 가장 큰 차이는 `locals()`는 현재 지역 스코프의 변수를 반환하고, `globals()`는 현재 전역 스코프의 변수를 반환한다는 것입니다. 즉, 호출 위치에 따라 반환되는 변수의 범위가 달라집니다. 다음 예제를 통해 두 함수의 차이점을 비교해 볼 수 있습니다.

```python
a = 10
b = 20

def example() :
    c = 30
    d = 40
    print("Locals:", locals())
    print("Globals:", globals())

example()
```

위 예제를 실행하면 다음과 같은 결과가 출력됩니다.

```bash
Locals: {'c': 30, 'd': 40}
Globals: {'__name__': '__main__', '__doc__': None, '__package__': None, 'a': 10, 'b': 20, ...}
```

또, 앞서 설명했듯 `locals()` 함수는 복사본이기 때문에 해당 딕셔너리를 수정하더라도 지역 변수의 값에는 변화가 없지만, `globals()` 함수는 실제 전역 변수를 참조하고 있기 때문에 해당 딕셔너리를 수정하면 전역 변수의 값에 변화가 생긴다는 차이점이 있습니다. 따라서 이러한 특성을 잘 이해하고 유의하여 사용해야 합니다.

Python의 `locals()`와 `globals()` 함수는 현재 스코프의 변수를 딕셔너리 형태로 반환해줍니다. 디버깅, 로깅, 동적 변수 처리 등 다양한 상황에서 활용할 수 있는 강력한 도구입니다. `locals()` 함수는 주로 함수 내부에서 사용되며, `globals()` 함수는 전역 변수 관리를 위해 사용됩니다. 이번 포스팅이 두 함수에 대한 이해를 높이고, 실제 활용에 도움이 될 수 있기를 바랍니다.
