---
title: Next.js에서 페이지 이동 시 스크롤 위치가 유지되지 않는 문제 해결하기
description: Next.js 환경에서 레이아웃 시프트로 인해 페이지 이동 시 스크롤이 최상단으로 가지 않는 문제를 해결하는 방법을 소개한다.
tags:
  - Web Performance
  - Next.js
  - 스크롤 문제 해결
  - 웹 성능 최적화
  - 이미지 최적화
date: 2025-04-17
thumbnailUrl: 2025/layout-shift/thumbnail.png
category: 💻 Dev
---

Next.js로 개발한 웹사이트에서 페이지를 이동할 때, 예상과 다르게 스크롤이 최상단이 아니라 이전 페이지에서 사용자가 보던 콘텐츠 위치 또는 페이지 하단으로 유지되는 문제가 발생했다.

원인을 조사한 결과, 이는 **콘텐츠 및 이미지 로딩 과정에서 발생하는 레이아웃 시프트(Layout Shift)** 로 인해 페이지의 콘텐츠가 뒤늦게 로드되며 스크롤 위치가 변경되었기 때문이었다. 즉, 초기 렌더링 과정에서 콘텐츠 및 이미지 높이가 확보되지 않아 브라우저가 렌더링 후 스크롤 위치를 다시 계산한 결과였다.

이 글에서는 실제로 내가 경험했던 이러한 문제 상황과 이를 해결하기 위해 적용한 최적화 방법을 소개한다.

## 콘텐츠 접기·펼치기 기능에서의 레이아웃 시프트 문제

웹페이지의 다양한 콘텐츠 중, 설명이나 본문 내용이 길어질 때 흔히 사용되는 기능이 **접기·펼치기(toggle)** 기능이다. 이 기능을 구현할 때 자주 발생하는 문제는 초기 렌더링 후 콘텐츠의 높이가 제한되면서 발생하는 레이아웃 시프트 현상이다.

### 문제 원인

- 콘텐츠의 높이가 정해지지 않은 채로 렌더링된 후 JavaScript나 CSS로 높이가 제한되면서 레이아웃이 순간적으로 변경된다.
- 브라우저가 높이를 두 번 이상 계산하게 되면서, 사용자가 보던 스크롤 위치가 변경된다.

아래는 예시 코드이다.

```tsx
"use client";

import { useState, useRef } from "react";
import styled, { css } from "styled-components";

const MINIMUM_DESCRIPTION_HEIGHT = 125;

const DescriptionText = styled.span<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    !isOpen &&
    css`
      max-height: 125px;
      overflow: hidden;
      word-break: break-all;
    `}
`;

const ToggleButton = styled.button<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

interface TextProps {
  description: string;
}

const Text = ({ description }: TextProps) => {
  const [showToggle, setShowToggle] = useState(false);
  const [isToggleDescription, setToggleDescription] = useState(false);

  const descriptionRef = useRef<HTMLSpanElement>(null);

  const handleToggle = () => {
    setToggleDescription(prev => !prev);
  };

  useLayoutEffect(() => {
    if (isToggleDescription || !descriptionRef.current) return;

    const { scrollHeight } = descriptionRef.current;

    setShowToggle(scrollHeight > MINIMUM_DESCRIPTION_HEIGHT);
  }, [isToggleDescription]);

  return (
    <>
      <DescriptionText
        ref={descriptionRef}
        isOpen={!showToggle || isToggleDescription}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />

      <ToggleButton type="button" visible={showToggle} onClick={handleToggle}>
        {isToggleDescription ? "접기" : "더보기"}
      </ToggleButton>
    </>
  );
};

export default Text;
```

### 해결 방법

이 문제를 효과적으로 방지하는 방법은 **높이를 제어하는 기능과 콘텐츠 렌더링을 분리하는 것**이다. 즉, 콘텐츠를 담는 컨테이너 요소에서 최대 높이(max-height)를 미리 지정하고, CSS의 overflow 속성을 통해 콘텐츠를 감추는 방식을 적용한다.

예를 들면 아래와 같은 구조로 적용할 수 있다.

```tsx
"use client";

import { useState, useRef } from "react";
import styled, { css } from "styled-components";

const MINIMUM_DESCRIPTION_HEIGHT = 125;

const DescriptionContainer = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    !isOpen
      ? css`
          max-height: 125px;
          overflow: hidden;
          word-break: break-all;
        `
      : css`
          height: auto;
        `}
`;

const DescriptionText = styled.span``;

const ToggleButton = styled.button<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

interface TextProps {
  description: string;
}

const Text = ({ description }: TextProps) => {
  const [showToggle, setShowToggle] = useState(false);
  const [isToggleDescription, setToggleDescription] = useState(false);

  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setToggleDescription(prev => !prev);
  };

  useLayoutEffect(() => {
    if (isToggleDescription || !descriptionRef.current) return;

    const { scrollHeight } = descriptionRef.current;

    setShowToggle(scrollHeight > MINIMUM_DESCRIPTION_HEIGHT);
  }, [isToggleDescription]);

  return (
    <>
      <DescriptionTextContainer
        ref={descriptionRef}
        isOpen={isToggleDescription}
      >
        <DescriptionText
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </DescriptionTextContainer>

      <ToggleButton type="button" visible={showToggle} onClick={handleToggle}>
        {isToggleDescription ? "접기" : "더보기"}
      </ToggleButton>
    </>
  );
};

export default Text;
```

이 방식을 통해 초기 렌더링 시에도 콘텐츠의 높이가 확보되기 때문에, 접기·펼치기 동작 시에도 레이아웃 시프트 없이 자연스럽게 콘텐츠가 표시된다.

## 이미지 렌더링 시 발생하는 레이아웃 시프트 문제

웹사이트를 제작할 때 이미지 로딩으로 인한 레이아웃 시프트는 매우 흔한 문제이다. 특히 이미지의 height를 `auto`로 설정하는 경우, 이미지를 로딩하는 동안에는 높이가 확보되지 않아 레이아웃이 갑자기 변경될 수 있다.

### 문제 원인

- 이미지의 실제 크기를 브라우저가 미리 알 수 없기 때문에 로딩 전에는 높이가 0으로 설정되어 있다.
- 이미지 다운로드가 완료된 후 실제 높이로 변경되면서 콘텐츠가 밀리는 현상이 발생한다.

### 해결 방법

이 문제를 해결하려면 이미지를 로딩하는 동안에도 공간을 미리 확보해 두는 것이 중요하다. 실제 개발 환경에서는 이미지의 너비(width)가 정해진 상태에서, 높이(height)를 이미지 비율(aspect ratio)에 따라 맞추는 방식이 일반적이다.

Next.js 환경에서는 아래처럼 이미지 최적화 컴포넌트인 `next/image`를 사용하면 간단히 해결할 수 있다.

```tsx
import Image from "next/image";

const Example = () => {
  const SIZE = 100;
  const ASPECT_RATIO = 1.45;
  /* 외부 서버에서 이미지를 호출하면 base64로 blur 이미지를 불러와야함 */
  const DEFAULT_BLUR_DATA_URL = "data:image/png;base64,...";

  return (
    <Image
      src="https://example.jpg"
      alt="예시 이미지"
      sizes="(max-width: 768px) 100vw, 50vw"
      placeholder="blur"
      blurDataURL={DEFAULT_BLUR_DATA_URL}
      width={SIZE}
      height={SIZE * ASPECT_RATIO}
      style={{
        height: "auto",
        maxHeight: SIZE * ASPECT_RATIO,
      }}
    />
  );
};
```

이 방식은 이미지를 로딩하기 전부터 공간을 안정적으로 확보하며, `sizes` 속성을 통해 최적의 이미지 크기를 지정하면 로딩 성능을 더욱 높일 수 있다.

위 코드처럼, 이미지를 포함한 컨테이너 요소에 미리 이미지가 차지할 공간을 확보하고, 브라우저가 이미지를 로드하기 전에도 공간을 유지하도록 하면 된다. 또한 이미지 크기 문제가 있을 경우, Next.js의 `sizes` 속성을 사용해 미리 최적의 크기를 지정해두면 이미지 로딩 성능 또한 향상될 수 있었다.

![image](/images/2025/layout-shift/image.png)

실제로 이미지 포맷을 webp로 변환하고 lazy loading을 적용했더니, 이미지 리소스 크기는 **6.2MB → 4.8MB로 감소**했고 로딩 속도도 **1.63초에서 204ms로 대폭 개선**했다.

## 성능 개선 결과

위 방법을 적용한 결과, 웹사이트의 전반적인 성능 지표가 다음과 같이 개선되었다.

![web-performance](/images/2025/layout-shift/web-performance.png)

| 항목                     | 개선 전 | 개선 후 | 변화                                       |
| ------------------------ | ------- | ------- | ------------------------------------------ |
| First Contentful Paint   | 0.3초   | 0.3초   | 동일                                       |
| Largest Contentful Paint | 3.5초   | 2.7초   | 👍 0.8초 감소 → 주요 콘텐츠 표시 시간 개선 |
| Total Blocking Time      | 90ms    | 80ms    | 🔽 개선 (main thread blocking 줄었음)      |
| Speed Index              | 3.4초   | 1.9초   | 🔥 대폭 개선 (사용자 체감 로딩 속도 향상)  |
| Cumulative Layout Shift  | 0       | 0.002   | 사실상 동일 (shift 거의 없음)              |

## 마무리

Next.js 환경에서 페이지 이동 시 스크롤 위치가 올바르게 유지되지 않는 문제는 대부분 레이아웃 시프트에서 비롯된다. 콘텐츠 및 이미지 로딩 방식을 최적화하면 이 문제를 효과적으로 해결할 수 있을 뿐만 아니라, 웹사이트 성능과 사용자 경험 또한 크게 개선할 수 있다.

이번 글에서 소개한 방법이 비슷한 문제를 겪고 있는 개발자에게 도움이 되길 바란다.
