---
title: Nextjs에서 외부 라이브러리 사용 시 발생했던 문제와 해결과정
description: 프로젝트를 진행하면서 Ant Design 라이브러리를 사용했습니다. 설치 후 적용 시 문제가 발생했고, 해결했던 과정들을 풀면서 잘 모르는 키워드들은 한번 더 적어보았습니다.
tags:
  - Nextjs
date: 2024-04-10
category: 💻 Dev
---

현재 프로젝트 구조는 현재 모노레포로 구성 되어있고, `src/client` 와 `src/admin` 프로젝트가 존재한다.
두 프로젝트 Antd Design 라이브러리를 사용하고 있는데, `src/client`에서는 문제가 없고, `src/admin`에서만 문제가 발생한다.

## 해결과정

### 1. 버전을 맞춰보자

`src/client`의 Ant Design 버전은 **v5.13.2** 버전을 사용하고, `src/admin`의 Ant Design 버전은 **v5.16.1** 버전을 사용 중이다. 버전이 업데이트 되면서 이전 버전의 호환이 제대로 이뤄지지 않은 것으로 추측된다.
우선 **v5.13.2** 버전으로 맞춰서 테스트를 진행해보았다.

![image](/images/2024/nextjs-external-library-issues-solutions/cannot-use-import-in-nextjs.png)

똑같은 오류가 발생했다..

버전 문제는 아닌 모듈 import를 할 수 없다는 에러인거 같아 좀 더 검색해보았다.

### 2. 공식문서를 살펴보자.

[Usage with Next.js - Ant Design](https://ant.design/docs/react/use-with-next#using-pages-router)

위 링크를 보니 Ant Design 공식문서에서 **page router**를 사용할 때, 새로고침 시 페이지의 깜박임이 발생하여 그것을 해결해주기 위해 `@ant-design/cssinjs` 모듈을 설치하라는 글이 있다.

새로고침 시 모듈을 가져오지 못하는 문제 때문에 발생한 오류일까..?

_고민은 테스트 시간만 늦출 뿐.._

설치방법과 코드는 간단하다.

```bash
yarn add @ant-design/cssinjs
```

```tsx:pages/_document.tsx
import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

const MyDocument = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;
```

Nextjs 문서에서는 `_document` 폴더에서 `getInitialProps` 하는 것을 추천하지 않는다.
그 이유는 `pages/_document` 폴더는 html 문서 구조를 정의하는데 사용되므로 정적인 페이지다. 그러나 `getInitialProps`를 하므로서 모든 페이지 요청에 해당 함수가 실행되므로 페이지 로딩시간에 부정적인 영향을 줄 수 있다고 한다.
그럼에도 CSS-in-JS와 같은 라이브러리가 서버 측 렌더링을 지원하는 경우에만 사용해도 좋다고 되어있다.

데이터 요청에는 `getInitialProps` 대신 `getServerSideProps` 나 `getStaticProps`를 이용하자. [[링크](https://nextjs.org/docs/pages/building-your-application/routing/custom-document#customizing-renderpage)]

### 3. next.config.js transpilePackages 옵션 이용하기

검색을 하다보니 나와 비슷한 상황의 질문글을 보았다. [[링크](https://www.inflearn.com/questions/1087222/next-13-14버전으로-하고-있는데-antd에서-다음과같은-오류가-발생합니다)]

`transpilePackages`를 이용해서 문제를 해결했다고 한다. 그래서 한번 따라해봤다.

```jsx:next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-tree",
    "rc-table",
  ],
};

export default nextConfig;
```

위와 같이 작성하니 정말 문제가 해결되었다.

_대체 왜? `transpilePackages` 가 뭐길래?_

공식문서에서 보면 `transpilePackages` 옵션을 사용하면 Nextjs에서는 로컬 패키지(예: 모노레포) 또는 외부 의존성(node_modules)에서 의존성을 자동으로 변환하고 번들링 할 수 있다고 한다. [[링크](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages)]

> [**의존성을 자동으로 변환한다는게 뭔데요?**](https://fe-developers.kakaoent.com/2023/230420-beyond-solving-problem-part-1/)
> Next.js는 Node.js에서 돌아간다. 즉 자바스크립트 코드가 **Node.js 서버 환경에서도 실행**될 수 있다.
> Node.js 서버 환경에서는 CommonJS 모듈 시스템만을 지원하기 때문에 import 대신 CommonJS 문법인 require를 통해 모듈을 가져오려고 시도한다.
> 그렇기에 CommonJS를 지원하지 않는 라이브러리를 추가한다면 의존성을 변환 시켜준다는 의미다.
> Nextjs 13.1 버전에서 추가된 부분으로 이전 버전을 사용하고 있다면 `next-transpile-modules`라이브러리를 사용하면 된다.

> [**CommonJS, ES Modules가 뭔데요?**](https://toss.tech/article/commonjs-esm-exports-field)
> CJS는 `require` / `module.exports` 를 사용하고, ESM은 `import` / `export` 문을 사용한다.
> CJS module loader는 동기적으로 작동하고, ESM module loader는 비동기적으로 작동한다.
> ESM은 [Top-level Await](https://nodejs.org/api/esm.html#top-level-await)을 지원하기 때문에 비동기적으로 동작한다.
> 따라서 ESM에서 CJS를 `import` 할 수는 있지만, CJS에서 ESM을 `require` 할 수는 없다. 왜냐하면 CJS는 Top-level Await을 지원하지 않기 때문이다.
> 이 외에도 두 Module System은 기본적으로 동작이 다르다.
> 따라서 두 Module System은 서로 호환되기 어렵다.

## 후기

처음에 버전 맞추는 것으로 시작했다가 traspilePackages, Module System 까지 왔다.
Module System 관련하여 외부 라이브러리가 CJS, ESM 각각 지원하거나 하지 않을 수 있음을 처음 알게 되었다.
모르는 것들을 하나하나 적어가며 채워가니 끝도 없는 것 같다. 모르는 게 너무 많고 정보도 너무 많다.
기초가 부족함을 다시 깨달으며, 이 글을 적기 전보다는 지식이 조금 상승 했음에 기뻐해야지 😁
