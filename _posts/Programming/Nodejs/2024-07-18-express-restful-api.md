---
layout: post
title: "Express.js를 사용하여 RESTful API 구축하기 (feat. MongoDB)"
author: chloeeekim
categories: [Nodejs, Programming]
image: assets/images/express-restful-api/title.jpg
featured: true
toc: true
---

Node.js와 Express.js를 사용하면 빠르고 간단하게 RESTful API를 구축할 수 있습니다. 이번 포스팅에서는 Express.js를 사용하여 RESTful API를 구축하는 방법에 대해 설명하겠습니다. RESTful API는 클라이언트와 서버 간의 통신을 효율적으로 관리하는 방법으로, CRUD(Create, Read, Update, Delete) 작업을 쉽게 수행할 수 있습니다.

우선 Node.js와 npm, express.js가 설치되어 있어야 합니다. Node.js 및 패키지를 설치하는 과정과 서버를 실행하는 과정에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/nodejs-tutorial/" target="_blank">Node.js Tutorial</a> 포스팅을 참고하시기 바랍니다.

# `index.js` 파일 생성

프로젝트 폴더로 이동하여 `index.js` 파일을 생성하고, 기본적인 Express.js 서버를 설정합니다. 다음 코드는 기본 Express.js 서버를 설정하고, JSON 요청을 파싱할 수 있도록 합니다.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
```

이제 서버에서 `node index.js` 명령어를 실행하면 서버가 `http://localhost:3000/`에서 실행됩니다.

# RESTful API 엔드포인트 정의

RESTful API의 주요 작업인 CRUD(Create, Read, Update, Delete) 작업을 위한 엔드포인트를 정의합니다. 이번 포스팅에서는 예제로 간단한 사용자 관리 API를 만들어 보도록 하겠습니다.

## 사용자 데이터

우선은 메모리 내에서 데이터를 저장하는 방식으로 구현해보겠습니다. 

```javascript
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];
```

## CRUD Endpoint

여기서는 다음 엔드포인트들을 생성하겠습니다.

| Endpoint | Description |
| :--- | :--- |
| GET /users | 모든 사용자 목록을 가져옵니다. |
| GET /users/:id | 특정 사용자의 정보를 가져옵니다. |
| POST /users | 새로운 사용자를 추가합니다. |
| PUT /users/:id | 특정 사용자의 정보를 업데이트합니다. |
| DELETE /users/:id | 특정 사용자를 삭제합니다. |

위 엔드포인트들을 구현한 코드는 다음과 같습니다. 참고로, 아래 예시에서 사용자를 생성할 때 id를 부여하는 방식은 id가 중복될 수 있기 때문에 예시로만 봐주시면 좋을 것 같습니다. 실제 MongoDB 등을 사용하면 id를 이러한 방식으로 지정하지 않습니다.

```javascript
// Create
app.post('/users', (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).send(user);
});

// Read all
app.get('/users', (req, res) => {
    res.send(users);
});

// Read one
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

// Update
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    user.email = req.body.email;
    res.send(user);
});

// Delete
app.delete('/users/:id', (req, res) => {
    const userIdx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIdx === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(userIdx, 1);
    res.send(deletedUser);
});
```

# 데이터베이스 연동

실제 어플리케이션에서는 데이터를 메모리가 아닌 데이터베이스(DB)에 저장합니다. 여기서는 MongoDB를 사용하여 데이터를 관리하는 방법에 대해 설명하겠습니다.

## MongoDB와 Mongoose 설치

다음 명령어를 통해 MongoDB, Mongoose를 설치해줍니다.

```bash
$ npm install mongoose
```

## MongoDB 연결 및 schema 정의

`index.js` 파일을 수정하여 MondoDB에 연결하고, 사용자 스키마를 정의해줍니다.

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => cconsole.log('MongoDB connected'))
    .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', UserSchema);
```

## CRUD Endpoint 수정

이제 CRUD 엔드포인트를 MongoDB와 연동되도록 수정합니다.

```javascript
// Create
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

// Read all
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Read one
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

// Update
app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

// Delete
app.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});
```

이번 포스팅에서는 Node.js와 Express.js를 사용하여 RESTful API를 구축하는 방법을 다루어보았습니다. Node.js와 Express.js는 빠르고 유연한 개발 환경을 제공하여 RESTful API를 구축하는 데 있어 좋은 선택입니다. 기본 서버 설정부터 CRUD 엔드포인트 정의, 그리고 MongoDB와의 연동까지 단계별로 설명하였는데요. 이를 통해 간단한 RESTful API를 만들 수 있으며, 더 복잡한 어플리케이션으로 확장할 수 있을 것입니다. 예를 들어, 인증 및 권한 부여, 데이터 검증, 오류 처리 등을 추가하여 실제 어플리케이션에 가까운 API를 만들어 볼 수 있을 것입니다.
