---
layout: post
title: "Node.js에서 Typescript 사용하기"
author: chloeeekim
categories: [Nodejs, Programming]
image: assets/images/nodejs-typescript/title.png
featured: true
toc: true
---

Typescript와 Node.js를 함께 사용하는 것은 더 강력하고 유지보수성이 좋은 어플리케이션을 만드는 데 큰 도움이 됩니다. Typescript는 Javascript의 슈퍼셋으로, 몇 가지 장점들이 존재합니다.

1. 타입스크립트는 변수와 함수에 타입을 지정할 수 있어 코드 작성 시 타입 오류를 미리 찾아낼 수 있습니다. 이는 런타임 에러를 줄이고, 코드의 안정성을 높여줍니다.
2. 타입스크립트는 코드 자동 완성, 리팩토링, 내비게이션 등의 기능을 제공하여 개발 생산성을 높여줍니다.
3. 클래스, 인터페이스, 제네릭 등 객체 지향 프로그래밍(OOP)의 개념을 잘 지원하여 더 구조화되고 재사용 가능한 코드를 작성할 수 있습니다.
4. 코드 베이스가 커질수록 타입 시스템이 유지보수를 쉽게 만들어줍니다. 타입을 지정함으로써 다른 개발자들이 코드를 이해하고 수정하기 쉬워집니다.
5. 기존 자바스크립트 프로젝트를 점진적으로 타입스크립트로 전환할 수 있어, 새로운 프로젝트 뿐만 아니라 기존 프로젝트에도 쉽게 적용할 수 있습니다.

이번 포스팅에서는 Typescript와 Node.js를 함께 사용하는 방법에 대해 다뤄보도록 하겠습니다. 우선 Node.js와 npm, express.js가 설치되어 있어야 합니다. Node.js 및 패키지를 설치하는 과정과 서버를 실행하는 과정에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/nodejs-tutorial/" target="_blank">Node.js Tutorial</a> 포스팅을 참고하시기 바랍니다.

# 프로젝트 초기화

우선 프로젝트 디렉토리를 생성하고, 해당 디렉토리로 이동한 후 npm 초기화를 진행하여 기본 설정을 가진 `package.json` 파일을 생성합니다.

```bash
$ mkdir my-project
$ cd my-project
$ npm init -y
```

# Typescript 설치

터미널 혹은 명령 프롬프트를 열어서 Typescript와 ts-node를 설치합니다. `ts-node`는 Typescript 파일을 직접 실행할 수 있게 해주는 패키지이며, `@types/node`는 node에 사용되는 타입스크립트의 타입이 정의된 라이브러리입니다.

```bash
$ npm install typescript ts-node @types/node
```

# `tsconfig.json` 파일 생성

타입스크립트 설정을 위해 `tsconfig.json` 파일을 생성합니다.

```bash
$ npx tsc --init
```

그리고 생성된 `tsconfig.json` 파일을 다음과 같이 수정해줍니다. 다음 코드는 타입스크립트가 ES2020 기능을 사용하고, 소스 파일은 `src` 디렉토리에, 컴파일된 파일은 `dist` 디렉토리에 저장되도록 합니다.

```json
{
  "compilerOptions": {
    "target": "ES2020",                        
    "module": "commonjs",                      
    "outDir": "./dist",                        
    "rootDir": "./src",                        
    "strict": true,                            
    "esModuleInterop": true,                   
    "skipLibCheck": true,                      
    "forceConsistentCasingInFileNames": true   
  }
}
```

# `index.ts` 파일 생성

다음으로, `src` 디렉토리를 생성하고, 그 안에 `index.ts` 파일을 생성해줍니다. 이제 `index.ts` 파일을 열어 간단한 예제 코드를 작성해 봅시다.

```javascript
const sayHello = (name: string): string => {
    return `Hello, ${name}!`;
};

console.log(sayHello("World"));
```

# 스크립트 설정

`package.json` 파일에 타입스크립트 컴파일 및 실행 스크립트를 추가합니다.

```json
{
    "scripts": {
        "build": "tsc",
        "start": "node dist/index.js",
        "dev": "ts-node src/index.ts"
    }
}
```

# 빌드 및 실행

이제 `npm run dev` 명령어로 개발 모드에서 타입스크립트 파일을 실행할 수 있습니다. 다음 명령어는 `src/index.ts` 파일을 ts-node를 통해 직접 실행하게 됩니다.

```bash
$ npm run dev
```

그리고 개발이 완료되면, 타입스크립트 파일을 자바스크립트로 컴파일하고 실행해줍니다. `npm run build` 명령어는 타입스크립트 파일을 컴파일하여 `dist` 디렉토리에 저장하고, `npm start`는 컴파일된 자바스크립트 파일을 실행합니다.

```bash
$ npm run build
$ npm start
```

타입스크립트와 Node.js를 함께 사용하면 다양한 타입스크립트의 이점을 누릴 수 있습니다. 이는 개발 생산성 향상에 큰 도움이 됩니다. 이번 포스팅에서는 환경 설정부터 간단한 어플리케이션 실행까지 다루었는데, 이를 바탕으로 원하는 어플리케이션을 개발할 수 있기를 바랍니다.
