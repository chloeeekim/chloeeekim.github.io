---
layout: post
title: "Node.js Tutorial - 5분만에 훑어보기"
author: chloeeekim
categories: [Nodejs, Programming]
image: assets/images/nodejs-tutorial/title.jpg
featured: true
toc: true
---

Node.js란 javascript를 사용하여 서버 측 어플리케이션을 개발할 수 있는 런타임 환경입니다. Chrome의 V8 Javascript 엔진을 기반으로 하며, 비동기 이벤트 기반 아키텍쳐로 고성능과 확장성을 제공합니다.

# Node.js 설치하기

Node.js를 설치하려면 <a href="https://www.nodejs.org" target="_blank">공식 웹사이트</a>에서 최신 LTS(Long Term Support) 버전을 다운로드하고 설치하셔야 합니다. 기본 설정으로 설치하면 대부분의 경우 문제가 발생하지 않으므로, 우선은 기본 설정 그대로 설치합니다. 설치가 완료되면 명령 프롬프트나 터미널 등에서 `node -v` 명령어를 통해 설치된 Node.js의 버전을 확인하실 수 있습니다. 또, `npm -v` 명령어로 Node.js와 함께 설치되는 npm(Node Package Manager)의 버전도 확인하실 수 있습니다. npm은 Node.js 패키지 관리를 도와주는 도구입니다.

```bash
$ node -v
v20.15.1
$ npm -v
10.7.0
```

# Node.js 프로젝트 시작하기

## 프로젝트 폴더 생성

우선 터미널에서 프로젝트를 저장할 폴더를 생성하고, 해당 폴더로 이동해줍니다. 여기서는 예시로 `my-first-node-project`라는 폴더를 생성하였습니다.

```bash
$ mkdir my-first-node-project
$ cd my-first-node-project
```

## `package.json` 파일 생성

`package.json` 파일은 프로젝트의 metadata를 포함하는 파일로, 프로젝트의 의존성, 스크립트 등을 관리하게 됩니다. npm을 사용하여 `package.json` 파일을 생성할 수 있습니다.

```bash
$ npm init -y
```

위 명령어를 실행하면 기본 설정으로 `package.json` 파일이 생성됩니다. 생성된 `package.json` 파일을 열어보면 다음과 같은 내용이 포함되어 있습니다.

```json
{
  "name": "my-first-node-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

## `index.js` 파일 생성

`package.json` 파일을 살펴보면, `"main": "index.js"`라는 구문을 보실 수 있습니다. 어플리케이션을 실행했을 때 가장 처음으로 실행되는 js 파일을 의미합니다. 프로젝트 폴더에 `index.js` 파일을 생성하고, 간단한 코드를 작성해보겠습니다.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

위 코드는 http 서버를 생성하여, `http://127.0.0.1:3000/`에서 `Hello, World!` 메시지를 반환하는 내용입니다. 이제 이 서버를 실행시켜 봅시다.

## 서버 실행

터미널에서 `node index.js` 명령을 실행하여 서버를 시작합니다.

```bash
$ node index.js
```

브라우저를 열고, `http://127.0.0.1:3000/`에 접속하면, `Hello, World!` 메시지를 확인하실 수 있습니다.

<img src="/assets/images/nodejs-tutorial/1.jpg" alt="first nodejs application" class="post-img">

# Node.js 프로젝트 관리 및 확장

기본적인 Node.js 프로젝트를 설정하고, 서버를 실행해보는 것에 더하여 프로젝트를 관리하고 확장하는 방법에 대하여 설명하겠습니다.

## Express.js

Express.js는 Node.js를 위한 빠르고 간단한 웹 프레임워크로, 서버 어플리케이션 개발을 더욱 쉽게 만들어줍니다. 다음 명령어로 express를 설치해줍니다.

```bash
$ npm install express
```

Express.js를 설치한 후, 서버 코드를 수정하여 Express.js를 사용하도록 변경해보겠습니다. 위에서 작성했던 `index.js` 파일을 다음과 같이 수정합니다.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

위 코드는 Express.js를 사용하여 동일한 서버 기능을 구현한 것입니다. 터미널에서 다시 서버를 실행하고, 브라우저를 새로고침하면 동일하게 `Hello, World!` 메시지를 확인하실 수 있습니다.

## Nodemon

현재는 개발 중 코드 변경 시마다 서버를 수동으로 재시작해야 하는 불편함이 있습니다. Nodemon은 이러한 문제를 해결해주는 도구로, 코드 변경을 감지하여 자동으로 서버를 재시작해줍니다. 다음 명령어로 Nodemon을 설치할 수 있습니다.

```bash
$ npm install nodemon
```

Nodemon을 설치햇다면, `node index.js` 명령어 대신 `nodemon index.js` 명령어를 통해 서버를 실행하실 수 있습니다.

```bash
$ nodemon index.js
```

이렇게하면 코드 변경 시마다 Nodemon이 자동으로 서버를 재시작해주기 때문에 편하게 개발을 진행할 수 있습니다.

이번 포스팅에서는 Node.js 설치부터 첫 프로젝트를 시작하는 방법을 다루었습니다. Node.js는 서버 측 어플리케이션 개발에 강력한 도구이며, Express.js와 Nodemon 같은 도구를 사용하면 개발 생산성을 크게 향상시킬 수 있습니다. 이 튜토리얼이 여러분의 프로젝트에 도움이 되기를 바랍니다.
