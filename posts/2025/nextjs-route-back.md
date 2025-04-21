---
title: Next.js에서 뒤로가기 커스텀 버튼 로직 개선하기
description: Next.js에서 URL로 직접 접근했을 때 뒤로가기 버튼 클릭 시 메인으로 이동하는 로직 구현 및 이슈 해결 방법
tags:
  - Next.js
  - App Router
  - JavaScript
  - History API
  - 세션 스토리지
  - 웹 개발
date: 2025-04-21
thumbnailUrl: 2025/nextjs-route-back/thumbnail.png
category: 💻 Dev
---

Next.js로 웹 서비스를 개발하다 보면 사용자가 URL을 직접 입력하거나 새 탭으로 접근한 상황에서, 브라우저의 뒤로가기 버튼을 눌렀을 때 예기치 않은 동작이 발생할 수 있다. 사용자 경험 개선을 위해 요구사항이 있었다.

> "사용자가 URL을 직접 입력하거나 새 탭으로 페이지에 접근한 뒤, 브라우저의 뒤로가기 버튼을 클릭하면 메인 페이지로 이동시켜 주세요."

이 글에서는 **Next.js App Router** 환경에서 위 요구사항을 구현하면서 겪은 다양한 이슈들과 해결 방법을 정리했다.

## 초기 구현

일반적으로 사용하는 뒤로가기 로직은 다음과 같다.

```tsx
"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button type="button" onClick={handleBack}>
      뒤로가기
    </button>
  );
};

export default BackButton;
```

하지만 이 방법으로 구현하면 다음과 같은 문제가 발생한다.

## 발생한 문제점

- **새 탭으로 페이지에 접근했을 때** 히스토리 스택이 존재하지 않아 router.back()이 동작하지 않는다.
- **URL을 직접 입력해서 접근했을 때** 뒤로가기 버튼을 누르면 이전 페이지가 없어 브라우저가 닫히거나 페이지가 이탈하게 된다.

사용자의 페이지 이탈을 방지하고 항상 안정적인 탐색을 제공하기 위해 여러 방법을 고민했다.

## 해결을 위한 여러 방법 시도

### 1. document.referrer

처음에는 `document.referrer`를 통해 이전 페이지를 판단하려 했다. 그러나 이 방법은 SPA(Single Page Application) 방식으로 페이지를 이동할 때 정상적으로 동작하지 않았다.

SPA 환경에서 페이지 간 이동은 브라우저가 인식하지 못하므로 `document.referrer`가 빈 문자열이거나 항상 개발한 페이지의 주소였다.

### 2. history.length

브라우저 히스토리 스택의 길이인 `history.length`를 활용해 해결해보려 했다.

새로운 탭에서 페이지를 열고 이동을 하면 히스토리의 길이가 늘어나지만, 뒤로 가기 버튼 클릭 시 히스토리 길이가 감소하지 않아 판단의 근거로 활용하기 어려웠다.

### 3. navigation.canGoBack

`navigation.canGoBack`을 이용하면 브라우저의 뒤로가기 버튼이 비활성화 되었을 때, false로 변경되기에 이를 이용하려 했다.

그러나 이 기능은 현재 실험적인 요소이고 Chrome 일부에서만 지원되며, Safari와 Firefox와 같은 주요 브라우저에서는 지원하지 않아 범용적으로 사용할 수 없었다.

### 4. 세션 스토리지(Session Storage)를 이용한 방식 (채택)

결국 최종적으로는 세션 스토리지에 최초로 접근한 URL을 저장하여 로직을 구성했다.

구현 방식은 다음과 같았다.

1. 사용자가 처음 접근한 URL을 세션 스토리지에 저장한다.
2. 뒤로가기 버튼 클릭 시, 현재 URL과 세션 스토리지에 저장된 최초 접근 URL을 비교한다.
   - URL이 같으면 메인으로 이동한다.
   - URL이 다르면 router.back()을 수행한다.
3. 메인 페이지 접근 시에는 세션 스토리지에 메인 URL을 저장해둔다.

그러나 이 방식에서도 몇 가지 추가 이슈가 발생했다.

#### 세션 스토리지를 활용한 방법의 추가 이슈

위 구현 방식의 문제점은 다음과 같았다.

- 사용자가 메인 페이지를 거치지 않고 다른 페이지로 이동하다 최초 접근한 페이지로 돌아왔을 때 뒤로가기 버튼을 누르면 메인 페이지로 이동하는 문제가 발생한다.
- 사용자가 페이지 이동 중 메인 페이지를 거쳤다가 뒤로가기 버튼으로 최초 접근 페이지까지 도달했을 때, 이후 뒤로가기를 눌러도 아무 동작도 발생하지 않는다.

이 문제는 사용자 경험에 부정적인 영향을 줄 수 있다.

### 5. 모든 주소를 세션 스토리지에 저장하는 방식 (미채택)

대안으로 모든 주소를 세션 스토리지에 저장해 히스토리를 직접 관리하려 했다. 그러나 Next.js의 `router.push`, `router.replace` 및 `<Link>` 컴포넌트 등 다양한 경로 전환 방법이 존재해, 모든 이동 지점에 별도의 로직을 추가해야 하므로 유지보수 및 Side Effect 위험이 커서 이 방법은 채택하지 않았다.

## 최종 결론

최종적으로 채택한 방법은 **최초 접근 주소를 세션 스토리지에 저장**하여 비교하는 방식이다.

```tsx
"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const HOME_ROUTE = "/home";
const PREV_ROUTE_SESSION_KEY = "initial-pathname";

const useCustomBackNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const clearInitialRoute = useCallback(() => {
    if (pathname === HOME_ROUTE) {
      sessionStorage.removeItem(PREV_ROUTE_SESSION_KEY);
    }
  }, [pathname]);

  const saveInitialRoute = useCallback(() => {
    const initialPathname = sessionStorage.getItem(PREV_ROUTE_SESSION_KEY);

    if (initialPathname === null) {
      sessionStorage.setItem(PREV_ROUTE_SESSION_KEY, pathname);
    }
  }, [pathname]);

  const handleBackNavigation = useCallback(() => {
    const initialPathname = sessionStorage.getItem(PREV_ROUTE_SESSION_KEY);

    if (pathname === HOME_ROUTE) {
      router.back();
      return;
    }

    if (initialPathname === pathname) {
      router.replace(HOME_ROUTE);
    } else {
      router.back();
    }
  }, [pathname, router]);

  useEffect(() => {
    clearInitialRoute();
    saveInitialRoute();
  }, [clearInitialRoute, saveInitialRoute]);

  return { handleBackNavigation };
};

export default useCustomBackNavigation;
```

위 방법을 채택한 가장 큰 이유는 페이지 이탈을 막기 위함이였다. 현재 [Next.js discussions](https://github.com/vercel/next.js/discussions/58476)에서 아직 논의중이기에 더 좋은 방법이 있다면 내용을 적어주는 것도 좋을 것 같다.
