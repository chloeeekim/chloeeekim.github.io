---
layout: post
title: "Python에서 MongoDB를 사용하여 CRUD 작업 수행하기 (feat. pymongo)"
author: chloeeekim
categories: [Python, Programming]
image: assets/images/python-pymongo/title.png
featured: true
toc: true
---

MongoDB는 NoSQL 데이터베이스로, 스키마 없는 데이터 모델을 사용하여 데이터를 문서 형태로 저장합니다. 이번 포스팅에서는 Python과 MongoDB를 연동하여 데이터를 저장하고 관리하는 방법에 대해 설명하도록 하겠습니다. 파이썬에서 MongoDB를 사용하면 빠르고 유연한 데이터 처리를 할 수 있어 다양한 프로젝트에 유용하게 사용할 수 있습니다.

# MongoDB란?

MongoDB는 JSON과 유사한 BJSON(Binary JSON) 형식으로 데이터를 저장하는 NoSQL 데이터베이스입니다. 관계형 데이터베이스와는 달리 테이블, 행, 열 구조가 아닌 컬렉션과 문서 구조를 사용합니다. 이로 인해 스키마를 유연하게 관리할 수 있으며, 대용량 데이터 처리에 적합합니다.

# Python과 MongoDB 연동하기

우선 MongoDB를 설치해야 합니다. <a href="https://www.mongodb.com/try/download/community" target="_blank">MongoDB 공식 사이트</a>에서 운영 체제에 맞는 설치 파일을 다운로드하고 설치합니다.

파이썬에서 MongoDB를 사용할 때는 `pymongo` 라이브러리를 사용합니다. 설치는 다음 명령어로 이루어집니다.

```bash
$ pip install pymongo
```

그런 다음, MongoDB 서버에 연결하려면 MongoDB 클라이언트를 생성해야 합니다. 다음 코드는 로컬호스트에서 실행 중인 MongoDB 서버에 연결하고, `mydatabase`라는 데이터베이스를 선택하고, `mycollection`이라는 컬렉션을 사용합니다.

```python
from pymongo import MongoClient

client = MongoClient('mongodb://localhost/27017/')
db = client['mydatabase']
collection = db['mycollection']
```

# MongoDB를 사용하여 CRUD 작업 수행하기

pymongo를 사용하여 기본적인 CRUD(Create, Read, Update, Delete) 작업을 수행하는 방법에 대해 살펴보겠습니다.

## Create

데이터를 삽입하려면 `insert_one` 또는 `insert_many` 메서드를 사용합니다.

```python
# 단일 문서 삽입
document = {"name": "Alice", "age": 30, "address": "New York"}
db.users.insert_one(document)

# 다중 문서 삽입
documents = [
    {"name": "Alice", "age": 30, "address": "New York"},
    {"name": "Bob", "age": 25, "address": "LA"}
]
db.users.insert_many(documents)
```

## Read

데이터를 조회하려면 `find_one` 또는 `find` 메서드를 사용합니다.

```python
# 단일 문서 조회
user = db.users.find_one({"name": "Alice"})

# 다중 문서 조회
users = db.users.find({"city": "New York"})
```

## Update

데이터를 수정하려면 `update_one` 또는 `update_many` 메서드를 사용합니다.

```python
# 단일 문서 수정
db.users.update_one({"name": "Alice"}, {"$set": {"age": 31}})

# 다중 문서 수정
db.users.update_many({"city": "New York"}, {"$set": {"city": "Seoul"}})
```

## Delete

데이터를 삭제하려면 `delete_one` 또는 `delete_many` 메서드를 사용합니다.

```python
# 단일 문서 삭제
db.users.delete_one({"name": "Alice"})

# 다중 문서 삭제
db.users.delete_many({"age": {"$lt": 30}})
```

이번 포스팅에서는 파이썬에서 MongoDB를 사용하여 CRUD 작업을 수행하는 방법을 다루었습니다. pymongo 라이브러리를 사용하여 MongoDB와 연결하고, 데이터를 삽입, 조회, 업데이트, 삭제할 수 있습니다. MongoDB는 대규모 데이터를 효율적으로 처리할 수 있는 강력한 도구로, 파이썬과 함께 사용하면 강력한 데이터베이스 어플리케이션을 구축할 수 있을 것입니다.
