---
layout: post
title: "Python의 super 키워드와 다중 상속"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-super-multiple-inheritance/title.jpg
featured: true
toc: true
---

파이썬의 객체 지향 프로그래밍(OOP)에서 상속은 코드의 재사용성을 높이는 중요한 개념입니다. 이때 부모 클래스의 메서드를 자식 클래스에서 호출해야 하는 경우가 자주 발생합니다. 이러한 상황에서 `super` 키워드는 매우 유용하게 사용됩니다. `super` 키워드는 자식 클래스에서 부모 클래스의 메서드를 호출할 때 사용됩니다. 이를 통해 자식 클래스는 부모 클래스의 메서드를 재사용하거나 확장할 수 있습니다. 또, 파이썬은 다중 상속을 지원하는데, 다중 상속에서 발생할 수 있는 문제를 MRO를 통해 해결하게 됩니다. 이번 포스팅에서는 `super` 키워드와 파이썬의 다중 상속에 대해 자세히 알아보겠습니다.

# `super` 키워드 기본 사용법

`super` 키워드는 주로 클래스의 생성자 메서드인 `__init__` 메서드 내에서 사용되지만, 그 외의 메서드에서도 부모 클래스의 메서드를 호출하는 데 사용할 수 있습니다. 다음은 `super` 키워드를 사용하여 부모 클래스의 `__init__` 메서드를 호출하는 간단한 예제입니다.

```python
class Animal :
    def __init__(self, anme) :
        self.name = name

class Dog(Animal) :
    def __init__(self, name, breed) :
        super().__init__(name)
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name) # Buddy
print(dog.breed) # Golden Retriever
```

`super` 키워드는 부모 클래스의 다른 메서드를 호출하는 데도 사용할 수 있습니다. 다음은 `super`키워드를 사용하여 부모 클래스의 다른 메서드를 호출하는 예제입니다.

```python
class Animal :
    def __init__(self, name) :
        self.name = name
    
    def make_sound(self) :
        return "Some generic sound"

class Dog(Animal) :
    def __init__(self, name, breed) :
        super().__init__(name)
        self.breed = breed
    
    def make_sound(self) :
        original_sound = super().make_sound()
        return f"{original_sound} and Woof!"

dog = Dog("Buddy", "Golden Retriever")
print(dog.make_sound()) # Some generic sound and Woof!
```

# 다중 상속과 `super` 키워드

파이썬은 다중 상속을 지원하기 때문에 한 클래스가 여러 부모 클래스를 가질 수 있습니다. `super` 키워드는 다중 상속 시 메서드 호출 순서를 관리하는 데 중요한 역할을 합니다. 이를 메서드 탐색 순서(Method Resolution Order, MRO)라고 합니다. 다음은 다중 상속과 `super` 키워드를 사용한 예제입니다.

```python
class A :
    def __init__(self, name) :
        self.name = name
    
    def make_sound(self) :
        return f"My name is {self.name}."

class B(A) :    
    def make_sound(self) :
        return f"I'm {self.name}."

class C(A) :    
    def make_sound(self) :
        return f"Hi, I'm {self.name}."

class D(B, C) :    
    def make_sound(self) :
        return f"{super().make_sound()} Nice to meet you."

person = D("Alice")
print(person.make_sound()) # I'm Alice. Nice to meet you.
```

위 예제는 일명 다이아몬드 상속이라고 불리는 케이스입니다. 클래스 B와 C는 둘 다 클래스 A를 상속 받고, 클래스 D는 클래스 B와 C를 상속 받아서 만들어졌습니다. 그리고 모든 클래스들이 `make_sound` 메서드가 있는 경우인데요. 이 경우에 클래스 D의 `super` 메서드는 클래스 B의 `make_sound` 메서드를 호출한 것을 확인할 수 있습니다.

## 메서드 탐색 순서 (MRO)

파이썬에서는 `super` 키워드가 어떤 메서드를 우선해서 호출하는지는 메서드 탐색 순서(MRO)를 따릅니다. MRO는 `__mro__` 속성이나 `mro()` 메서드를 호출하여 확인할 수 있습니다.

```python
>>> print(D.__mro__)
(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)

>>> print(D.mro())
[<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]
```

위 예제에서 D 클래스의 MRO는 다음과 같습니다. MRO는 왼쪽에서 오른쪽 순으로 메서드를 찾게 됩니다. 파이썬은 다중 상속을 하는 경우, 부모 클래스의 목록 중에서 왼쪽에 있는 클래스들을 우선합니다. 즉, `class D(B, C)`와 같이 선언되었다면, 클래스 B가 클래스 C보다 우선하게 됩니다.

파이썬의 `super` 키워드는 객체 지향 프로그래밍에서 상속을 활용하여 코드의 재사용성과 확장성을 높이는 데 중요한 역할을 합니다. `super` 키워드를 사용하면 부모 클래스의 메서드를 호출하고 확장할 수 있으며, 다중 상속 시에도 사용이 가능합니다. 파이썬은 다중 상속을 지원하며, MRO를 통해 다중 상속 시에 발생할 수 있는 문제들을 해결합니다. 이번 포스팅이 파이썬의 `super` 키워드와 다중 상속에 대해 이해하는 데 도움이 되셨기를 바랍니다.
