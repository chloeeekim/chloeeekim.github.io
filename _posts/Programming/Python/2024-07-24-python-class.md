---
layout: post
title: "Python에서 class 다루기"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-class/title.png
featured: true
toc: true
---

클래스(class)는 객체 지향 프로그래밍(Object-Oriented Programming, OOP)을 구현하는 데 핵심적인 역할을 하고 있습니다. 클래스는 객체 지향 프로그래밍에서 객체를 생성하기 위한 blueprint입니다. 클래스는 속성(attributes)과 메서드(methods)를 정의하며, 이를 통해 객체의 상태와 동작을 기술합니다. 클래스는 코드의 재사용성을 높이고, 구조화된 코드를 작성하는 데 도움을 줍니다. 이번 포스팅에서는 파이썬에서 클래스를 사용하는 방법에 대해 알아보도록 하겠습니다.

파이썬의 기본 문법에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/python-tutorial/" target="_blank">Python Tutorial</a> 포스팅을 참고하시기 바랍니다.

# class의 정의와 instance 생성

파이썬에서 클래스를 정의하려면 `class` 키워드를 사용합니다. 클래스명은 보통 대문자로 시작하는 것이 일반적입니다.

```python
class Dog :
    def __init__(self, name, age) :
        self.name = name
        self.age = age
    
    def bark(self) :
        return f"{self.name} is barking."

my_dog = Dog("Cookie", 3)
print(my_dog.bark()) # Cookie is barking.
```

## `__init__` 메서드

`__init__` 메서드는 클래스의 생성자(Constructor)로, 클래스 인스턴스가 생성될 때 자동으로 호출되는 메서드입니다. 이를 통해 객체의 초기 상태를 설정할 수 있습니다.

## `self` 키워드

인스턴스 속성은 `self` 키워드를 사용하여 정의합니다. `self`는 인스턴스 자신을 가리키며, 클래스 내에서 메서드와 속성에 접근할 때 사용됩니다.

# class의 상속

상속(Inheritance)은 기존 클래스의 속성과 메서드를 물려받아 새로운 클래스를 생성하는 방법입니다. 이를 통해 코드의 재사용성을 높일 수 있습니다. 참고로, 파이썬은 다중 상속을 지원하며, 어떤 부모 클래스의 메서드를 호출할 것인지는 메서드 해결 순서(Method Resolution Order, MRO)를 따르게 됩니다.

```python
class Animal :
    def __init__(self, name) :
        self.name = name
    
    def speak(self) :
        pass

class Dog(Animal) :
    def speak(self) :
        return f"{self.name} says Woof!"

class Cat(Animal) :
    def speak(self) :
        return f"{self.name} says Meow!"

dog = Dog("Buddy")
cat = Cat("Kitty")
print(dog.speak())  # Buddy says Woof!
print(cat.speak())  # Kitty says Meow!
```

## 메서드 오버라이딩

자식 클래스는 부모 클래스의 메서드를 오버라이딩(재정의) 할 수 있습니다. 이를 통해 자식 클래스는 부모 클래스와 다른 동작을 정의할 수 있습니다. 위 예제에서 `Dog`과 `Cat` 클래스는 각각 `speak` 메서드를 오버라이딩하여 다른 동작을 하도록 만들었습니다.

## `super` 키워드

`super` 키워드는 자식 클래스에서 부모 클래스의 메서드를 호출할 때 사용됩니다. 이를 통해 자식 클래스는 부모 클래스의 메서드를 재사용하거나 확장할 수 있습니다.

# class의 캡슐화

캡슐화(Encapsulation)은 객체의 속성과 메서드를 보호하여 객체의 내부 상태를 숨기고, 외부에서는 객체의 속성과 메서드에 직접 접근하지 못하도록 하는 개념입니다. 이를 통해 데이터의 무결성을 지키고, 객체 간의 결합도를 낮출 수 있습니다.

## 접근 제한자

파이썬에서는 접근 제한자를 통해 속성과 메서드의 접근 범위를 제어할 수 있습니다.

- 공개(Public) : 모든 곳에서 접근 가능. 이름 앞에 아무것도 붙이지 않는 경우입니다.
- 비공개(Private) : 클래스 내부에서만 접근 가능. 이름 앞에 밑줄 두 개(`__`)를 붙이는 경우입니다.

```python
class Person :
    def __init__(self, name, age) :
        self.name = name # public
        self.__age = age # private
    
    def get_age(self) :
        return self.__age
    
    def set_age(self, age) :
        if age > 0 :
            self.__age = age

p = Person("Alice", 30)
print(p.name) # Alice
print(p.get_age()) # 30
```

위 예제에서는 `age` 속성을 private으로 설정하여 클래스 외부에서는 메서드를 통해서만 접근할 수 있도록 하였습니다. 이러한 방식으로 캡슐화를 구현할 수 있습니다.

# class의 다형성

다형성(Polymorphism)은 동일한 인터페이스를 통해 서로 다른 데이터 타입의 객체를 다룰 수 있게 하는 개념입니다. 이를 통해 코드의 유연성과 재사용성을 높일 수 있습니다.

```python
class Shape :
    def area(self) :
        pass

class Rectangle(Shape) :
    def __init__(self, width, height) :
        self.width = width
        self.height = height
    
    def area(self) :
        return self.width * self.height

class Circle(Shape) :
    def __init__(self, radius):
        self.radius = radius
    
    def area(self) :
        return 3.14 * self.radius ** 2

shapes = [Rectangle(3, 4), Circle(5)]

for shape in shapes :
    print(shape.area())
```

위 예제에서 `Shape` 클래스는 공통 인터페이스를 제공하며, `Rectange`과 `Circle` 클래스는 이를 구현하여 각각의 면적을 계산합니다. 이러한 방식을 통해 다양한 형태의 객체를 동일한 방식으로 처리할 수 있습니다.

# class의 Metaclass

파이썬에서는 메타클래스(Metaclass)를 사용하여 클래스의 동작을 제어할 수 있습니다. 메타클래스는 클래스의 클래스이며, 클래스를 생성하고 조작하는 역할을 합니다.

```python
class MyMeta(type) :
    def __new__(cls, name, bases, dct) :
        print(f"Creating class {name}")
        return super().__new__(cls, name, bases, dct)

class MyClass(metaclass=MyMeta) :
    pass
```

위 코드를 실행하면 `Creating class MyClass` 문구가 출력됩니다. 메타클래스를 사용하면 클래스 생성 시점에서 추가적인 로직을 실행하거나, 클래스 속성과 메서드를 동적으로 변경할 수 있습니다.

파이썬의 클래스는 객체 지향 프로그래밍의 핵심 개념으로, 더욱 효율적이고 구조화된 코드를 작성할 수 있도록 해 주는 강력한 도구입니다. 이번 포스팅이 파이썬의 클래스에 대해 이해하는 데 도움이 되셨기를 바랍니다.
