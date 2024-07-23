---
layout: post
title: "Python의 배열(Array) - 효율적인 데이터 처리하기"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-array/title.jpg
featured: true
toc: true
---

파이썬은 다양한 자료형(data type)을 제공합니다. 그 중에서도 배열(Array)은 확장 자료형으로 효율적인 데이터 처리를 위해 반드시 알아야 할 중요한 개념입니다. 이번 포스팅에서는 파이썬의 배열에 대해 자세히 알아보겠습니다.

파이썬의 기본 문법에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/python-tutorial/" target="_blank">Python Tutorial</a> 포스팅을 참고하시기 바랍니다. 또, 파이썬의 자료형에 대해서는 <a href="https://chloeeekim.github.io/python-data-types/" target="_blank">Python의 자료형 살펴보기</a> 포스팅을 참고하시기 바랍니다.

# 배열(Array)이란?

배열은 동일한 자료형의 요소들을 저장하는 자료구조입니다. 파이썬에서는 기본적으로 리스트(List)를 사용하지만, 배열(Array)을 사용하면 더 효율적인 메모리 사용과 성능을 얻을 수 있습니다. 배열은 특히 대량의 데이터 처리에 유리합니다.

# Python에서 배열 사용하기

파이썬에서 배열을 사용하기 위해서는 `array` 모듈을 임포트해야 합니다. 배열은 리스트와 유사하지만, 모든 요소가 동일한 자료형이어야 한다는 점에서 차이가 있습니다.

## 배열 생성하기

배열을 생성하려면 `array.array` 메소드를 사용합니다. 이 때, 배열의 자료형과 초기 요소들을 지정해줍니다.

```python
import array
my_array = array.array('i', [1, 2, 3, 4, 5])
print(my_array) # array('i', [1, 2, 3, 4, 5])
```

위 코드에서 `'i'`는 배열이 정수형(integer) 요소들로 구성된다는 것을 의미합니다. 파이썬의 array 모듈은 다양한 자료형 코드를 지원합니다.

| 자료형 코드 | 설명 | 최소 크기 |
| :---: | :---: | :---: |
| `'b'` | 부호 있는 정수 | 1 byte |
| `'B'` | 부호 없는 정수 | 1 byte |
| `'h'` | 부호 있는 정수 | 2 byte |
| `'H'` | 부호 없는 정수 | 2 byte |
| `'i'` | 부호 있는 정수 | 2 byte |
| `'I'` | 부호 없는 정수 | 2 byte |
| `'l'` | 부호 있는 정수 | 4 byte |
| `'L'` | 부호 없는 정수 | 4 byte |
| `'q'` | 부호 있는 정수 | 8 byte |
| `'Q'` | 부호 없는 정수 | 8 byte |
| `'f'` | 부동 소수점 | 4 byte |
| `'d'` | 부동 소수점 | 8 byte |

## 배열 요소 접근

배열 요소에 접근하는 방법은 리스트와 동일합니다. 인덱스를 사용하여 요소를 조회하거나, 변경할 수 있습니다.

```python
import array
my_array = array.array('i', [1, 2, 3, 4, 5])
print(my_array[0]) # 1
my_array[1] = 10
print(my_array) # array('i', [1, 10, 3, 4, 5])
```

## 배열 메서드

배열은 다양한 메서드를 제공하여 요소를 추가, 제거, 검색할 수 있습니다.

- `append()` : 배열 끝에 요소를 추가합니다.
- `insert()` : 특정 인덱스에 요소를 추가합니다.
- `pop()` : 특정 인덱스의 요소를 제거하고 반환합니다.
- `remove()` : 첫 번째로 일치하는 요소를 제거합니다.

```python
import array
my_array = array.array('i', [1, 2, 3, 4, 5])

# append()
my_array.append(6)
print(my_array) # array('i', [1, 2, 3, 4, 5, 6])

# insert()
my_array.insert(2, 7)
print(my_array) # array('i', [1, 2, 7, 3, 4, 5, 6])

# pop()
my_array.pop(3)
print(my_array) # array('i', [1, 2, 7, 4, 5, 6])

# remove()
my_array.remove(7)
print(my_array) # array('i', [1, 2, 4, 5, 6])
```

# 배열 vs. 리스트

파이썬에서 리스트와 배열은 비슷해 보이지만, 몇 가지 중요한 차이점이 있습니다.

1. 자료형 : 리스트는 서로 다른 자료형의 요소들을 가질 수 있지만, 배열은 동일한 자료형의 요소들로만 구성됩니다.
2. 성능 : 배열은 메모리 효율성과 성능 면에서 리스트보다 뛰어납니다. 이는 배열이 메모리 상에서 연속된 공간을 차지하기 때문입니다.
3. 용도 : 리스트는 일반적인 용도로, 배열은 대량의 데이터 처리가 필요한 경우에 적합합니다.

파이썬에서 배열은 효율적인 데이터 처리를 위해 중요한 자료구조입니다. 배열을 사용하면 메모리 효율성과 성능을 크게 향상시킬 수 있습니다. 배열에 대한 더 자세한 내용은 파이썬 공식 문서를 참고해 보시길 바랍니다.
