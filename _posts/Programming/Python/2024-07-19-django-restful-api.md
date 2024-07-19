---
layout: post
title: "Django를 사용하여 RESTful API 구축하기"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/django-restful-api/title.jpg
featured: true
toc: true
---

Django는 웹 개발을 위한 강력한 프레임워크로, RESTful API를 빠르고 쉽게 구축할 수 있습니다. 이번 포스팅에서는 Django와 Django REST framework를 사용하여 RESTful API를 구축하는 방법에 대해 설명하겠습니다. RESTful API는 클라이언트와 서버 간의 통신을 효율적으로 관리하는 방법으로, CRUD(Create, Read, Update, Delete) 작업을 쉽게 수행할 수 있습니다.

우선 Python이 설치되어 있어야 합니다. 파이썬을 설치하는 과정과 기본 문법에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/python-tutorial/" target="_blank">Python Tutorial</a> 포스팅을 참고하시기 바랍니다.

# 환경 설정

## Django 프레임워크 설치

먼저, 터미널이나 명령 프롬프트에서 다음 명령어를 통해 Django와 Django REST framework를 설치합니다.

```bash
pip install django djangorestframework
```

## Django 어플리케이션 생성

그리고 적절한 디렉토리로 이동하여 새로운 Django 프로젝트와 어플리케이션을 생성합니다.

```bash
django-admin startproject myproject
cd myproject
django-admin startapp myapp
```

생성된 기본 프로젝트와 어플리케이션의 구조는 다음과 같습니다.

```markdown
myproject/
    manage.py
    myproject/
        __init__.py
        settings.py
        urls.py
        wsgi.py
    myapp/
        __init__.py
        admin.py
        apps.py
        models.py
        tests.py
        views.py
```

## 설정 파일 수정

myproject 디렉토리 하에 있는 `settings.py` 파일을 수정해줍니다. `INSTALLED_APPS` 항목에 `rest_framework`와 `myapp`을 추가합니다.

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'myapp',
]
```

# 모델 생성

이번에는 간단한 Todo 리스트를 관리하는 API를 생성해보겠습니다. 먼저, `models.py` 파일에서 Todo 모델을 생성합니다. 제목(title)과 설명(description), 그리고 완료 여부(completed) 세 가지 필드를 가지는 모델입니다.

```python
from django.db import models

class ToDo(models.Model) :
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self) :
        return self.title
```

모델을 생성해 준 후, 데이터베이스를 마이그레이션 합니다. `python` 명령어를 못 찾는 경우, `python3` 명령어를 사용하셔도 무방합니다.

```bash
python manage.py makemigrations
python manage.py migrate
```

# 직렬화

다음으로, `myapp` 디렉토리 하에 `serializers.py` 파일을 생성하고, 위에서 만든 모델을 직렬화하는 코드를 작성해줍니다.

```python
from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = ToDo
        fields = '__all__'
```

# Viewset 생성

`views.py` 파일을 수정해서 ToDo API 뷰셋을 생성합니다.

```python
from rest_framework import viewsets
from .models import ToDo
from .serializers import ToDoSerializer

class ToDoViewSet(viewsets.ModelViewSet) :
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
```

# URL 설정

마지막으로, `urls.py` 파일을 수정하여 API 엔드포인트를 설정해줍니다.

```python
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import ToDoViewSet

router = DefaultRouter()
router.register(r'todos', ToDoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
```

# 서버 실행 및 테스트

이제 `/api/todos` 엔드포인트를 통해 CRUD 기능을 사용할 수 있습니다. 서버는 다음 명령어를 통해 실행 가능합니다.

```bash
python manage.py runserver
```

서버는 `http://127.0.0.1:8000/`에서 실행되며, 브라우저나 postman 같은 도구를 사용하여 API 요청을 보내며 테스트 해 볼 수 있습니다. 참고로 다음 요청들이 가능합니다.

| Endpoint | Description |
| :--- | :--- |
| GET /api/todos/ | 모든 ToDo 항목을 조회합니다. |
| POST /api/todos/ | 새로운 ToDo 항목을 생성합니다. |
| PUT /api/todos/{id}/ | 특정 ToDo 항목을 수정합니다. |
| DELETE /api/todos/{id} | 특정 ToDo 항목을 삭제합니다. |

# API 보안 설정

추가로, API 보안을 위해 Django REST framework에서 제공하는 인증 기능을 사용할 수 있습니다. `settings.py` 파일에서 인증 설정을 다음과 같이 추가해줍니다.

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}
```

그리고 `views.py` 파일에서 뷰에 인증을 적용해줍니다.

```python
from rest_framework.permissions import IsAuthenticated

class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]
```

이번 포스팅에서는 파이썬과 Django, Django REST framework를 사용하여 RESTful API를 구축하는 방법을 다루어보았습니다. 모델 생성, 직렬화, 뷰 설정, URL 라우팅, API 보안 설정까지의 과정을 단계별로 설명하였습니다. Django와 DRF는 강력한 기능을 제공하여 보다 신속하고 효율적인 API 개발이 가능하다는 장점이 있습니다. RESTful API 설계와 구현에 대해 더 많은 정보를 원하신다면, Django REST framework 공식 문서와 RESTful API 디자인 원칙을 참고하면 좋습니다.
