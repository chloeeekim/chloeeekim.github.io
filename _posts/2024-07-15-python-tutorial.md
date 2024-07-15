---
layout: post
title: "Python Tutorial - 5분만에 훑어보기"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-tutorial/title.png
featured: true
toc: true
---

파이썬(Python)은 간결함과 직관성 덕분에 프로그래밍 입문자 뿐만 아니라 숙련된 개발자들 사이에서도 널리 사용되고 있는 프로그래밍 언어입니다. 이번 포스팅에서는 파이썬의 기초를 간략하게 다루어 짧은 시간 안에 훑어볼 수 있도록 작성하겠습니다. 파이썬의 기본 문법과 데이터 타입, 변수, 제어문 등을 빠르게 살펴보실 수 있습니다.

# 파이썬 설치하기

파이썬을 시작하려면 우선 <a href="https://www.python.org" target="_blank">공식 웹사이트</a>에서 최신 버전을 다운로드하고 설치하셔야 합니다. 설치는 installer를 사용하여 간단하게 진행되며, 설치가 완료되면 명령 프롬프트나 터미널 등에서 `python --version` 명령어를 통해 설치된 파이썬의 버전을 확인하실 수 있습니다.

```bash
$ python --version
Python 3.12.4
```

만약 `command not found: python` 명령어가 표시된다면, `python3 --version` 명령어를 사용하면 됩니다.

# 파이썬 기본 문법

파이썬은 간결한 문법을 자랑합니다. 다른 언어와 달리 중괄호(`{}`)를 사용하지 않고, 대신 들여쓰기를 사용하여 코드 블록을 구분합니다. 들여쓰기가 잘못 되면 잘못된 코드가 실행될 수 있지만, 가독성이 높아지는 효과가 있습니다.

## 주석

코드를 작성함에 있어 코드를 설명하는 주석은 코드의 가독성을 높이는 데 중요한 역할을 하기 때문에 필수적인 요소입니다. 파이썬에서는 한 줄과 여러 줄 주석을 다른 방법으로 작성할 수 있습니다.

```python
# 한 줄 주석은 샵(#)으로 시작합니다.

"""
이 부분은 여러 줄 주석입니다.
여러 줄에 걸쳐 작성할 수 있습니다.
"""
```

## 문자열

파이썬에서 문자열은 큰따옴표(`"`)나 작은따옴표(`'`)로 감싸서 선언합니다. 만약 문자열 안에 큰따옴표가 있다면, 작은따옴표로 감싸 문자열을 생성하면 큰따옴표까지 문자열에 포함시킬 수 있습니다. 반대도 마찬가지로, 상황에 맞게 큰따옴표와 작은따옴표를 사용하면 됩니다.

```python
>>> print("Hello, world!")
Hello, world!
>>> print('"Hi, My name is Chloe."')
"Hi, My name is Chloe."
```

# 변수와 데이터 타입

변수란 값을 저장하는 공간으로, 파이썬에서는 값이 할당되면 자동으로 데이터 타입이 지정됩니다.

## 기본 데이터 타입

기본 데이터 타입으로는, 정수(Integer, `int`), 실수(Floating point, `float`), 문자열(String, `str`), 불린(Boolean, `bool`)이 있습니다. 참고로, 불린 값은 대문자(`True, False`)로 시작해야 한다는 것에 주의해야 합니다. 

```python
>>> a = 10
>>> b = 3.14
>>> c = "Python"
>>> d = True

>>> print(type(a))
<class 'int'>
>>> print(type(b))
<class 'float'>
>>> print(type(c))
<class 'str'>
>>> print(type(d))
<class 'bool'>
```

## 리스트와 튜플

리스트와 튜플은 여러 개의 값을 저장할 수 있는 데이터 타입입니다. 리스트는 대괄호(`[]`)를 사용하며, 값의 변경이 가능합니다. 반면에 튜플은 소괄호(`()`)를 사용하며, 값의 변경이 허용되지 않는다는 차이점이 있습니다.

```python
# list
fruits = ["apple", "banana", "cherry"]
print(fruits[0])
fruits[1] = "blueberry"
print(fruits)

# tuple
colors = ("red", "green", "blue")
print(colors[1])
colors[1] = "yellow" # 에러 발생 (값 변경 불가)
```

## 딕셔너리

딕셔너리는 키-값(key-value) 쌍으로 이루어진 데이터 타입입니다. 중괄호(`{}`)를 사용하여 정의하며, 키를 통해 값에 접근할 수 있습니다.

```python
student = {
    "name": "John",
    "age": 21,
    "major": "Computer Science"
}

print(student["name"])
student["age"] = 22
print(student)
```

# 연산자

파이썬은 다양한 연산자를 지원합니다. 기본적인 산술 연산자와 비교 연산자, 논리 연산자 등을 통해 연산을 수행할 수 있습니다.

## 산술 연산자

```python
>>> x = 10
>>> y = 3
>>> print(x + y)
13
>>> print(x - y)
7
>>> print(x * y)
30
>>> print(x / y)
3.33333...
>>> print(x % y)
1
>>> print(x ** y)
1000
```

## 비교 연산자

```python
>>> x = 10
>>> y = 3
>>> print(x == y)
False
>>> print(x != y)
True
>>> print(x > y)
True
>>> print(x < y)
False
>>> print(x >= y)
True
>>> print(x <= y)
False
```

## 논리 연산자

```python
>>> a = True
>>> b = False
>>> print(a anad b)
False
>>> print(a or b)
True
>>> print(not a)
False
```

# 제어문

제어문을 통해 코드의 분기를 만들고, 동일한 작업을 반복시킬 수 있습니다. 파이썬에서는 다른 언어들과 마찬가지로 조건문과 반복문을 제공합니다.

## 조건문

파이썬의 조건문은 `if`, `elif`, `else` 키워드를 사용하여 조건에 따라 실행할 코드를 결정할 수 있습니다.

```python
age = 18
if age >= 20 :
    print("Adult")
elif age >= 13 :
    print("Teenager")
else :
    print("Child")
```

## 반복문

파이썬의 반복문은 `for` 혹은 `while` 키워드를 사용하여 특정 코드를 반복 실행하도록 할 수 있습니다. 아래 두 코드는 동일한 결과를 출력합니다.

```python
# for 문
for i in range(5) :
    print(i)

# while 문
count = 0
while count < 5 :
    print(count)
    count += 1
```

# 함수

함수는 코드의 재사용성을 높이고, 코드를 구조화하는 데 유용합니다. 파이썬에서는 `def` 키워드를 사용하여 함수를 정의할 수 있습니다.

```python
def add(a, b) :
    return a + b

result = add(3, 5)
print(result)
```

파이썬은 배우기 쉽고 강력한 기능을 제공하는 프로그래밍 언어로, 다양한 분야에서 활용되고 있습니다. 이번 포스팅에서는 파이썬의 기본 문법, 변수와 데이터 타입, 연산자, 제어문, 함수 등에 대하여 소개하였습니다. 이후 포스팅에서 파이썬에 대하여 보다 자세하게 설명하도록 하겠습니다.
