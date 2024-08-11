---
title: React Query로 useLazyQuery 구현하기
description: 이 글에서는 React Query에서 useLazyQuery를 사용하여 데이터 페칭을 효율적으로 관리하는 방법을 다룬다. 코드 예제와 함께 실습을 통해 useLazyQuery의 기본 사용법을 알 수 있다.
tags:
  - React
  - React Query
  - JavaScript
  - TypeScript
date: 2024-08-11
thumbnailUrl: 2024/react-query-lazy-query/thumbnail.png
category: 💻 Dev
---

## 개요

`React Query`에서는 네트워크 요청을 할 때 주로 `useQuery` 훅을 사용한다. 이 훅은 기본적으로 자동으로 네트워크 요청을 수행하지만, 특정 이벤트(예: 버튼 클릭) 시 네트워크 요청을 제어하려면 **enabled** 옵션을 사용해야한다.

```tsx
const [enabled, setEnabled] = useState(false);

const { data } = useQuery(key, () => fetchAPI, {
  enabled: enabled,
});

const handleClick = () => {
  // 클릭 시 네트워크 요청
  setEnabled(true);
};
```

이와 같은 기본적인 구조에서는 문제가 없지만, 검색 기능이 추가되는 경우, 검색어를 **state**로 관리해야 하는 번거로움이 생긴다.

```tsx
const [enabled, setEnabled] = useState(false);
const [searchWord, setSearchWord] = useState("");

const { data } = useQuery([key, searchWord], () => fetchAPI(searchWord), {
  enabled: enabled,
});

const handleClick = (search: string) => {
  // 클릭 시 네트워크 요청
  setSearchWord(search);
  setEnabled(true);
};
```

이 경우 **enabled**와 **searchWord**를 함께 관리해야 하는 번거로움이 있다. 이와 같은 상황을 개선하기 위해, `Apollo Client`의 `useLazyQuery`와 유사한 기능을 `React Query`에서 구현해보았다.

## useLazyQuery 구현 코드

아래는 `useLazyQuery` 훅을 구현한 코드이다. 이 훅은 함수 호출을 통해 데이터를 페칭하고, 성공 및 실패 시 콜백을 실행하는 기능을 제공한다.

```tsx:useLazyQuery
import { useCallback, useEffect, useState } from "react";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface Callbacks<TData> {
  onCompleted?: (data: TData) => void;
  onError?: (error: Error) => void;
}

interface Options<TData, TParams> extends Callbacks<TData> {
  variables: TParams;
}

const useLazyQuery = <TData, TParams>(
  queryKey: string,
  queryFn: (params: TParams) => Promise<TData>
): [
  (options: Options<TData, TParams>) => void,
  UseQueryResult<TData, Error>
] => {
  const [trigger, setTrigger] = useState(false);
  const [args, setArgs] = useState<TParams>();
  const [callbacks, setCallbacks] = useState<Callbacks<TData>>({});

  const query = useQuery({
    queryKey: [queryKey, args],
    queryFn: () => {
      if (args === undefined) {
        return Promise.reject(new Error("Args are undefined"));
      }
      return queryFn(args);
    },
    enabled: trigger,
  });

  useEffect(() => {
    if (query.isSuccess && callbacks.onCompleted) {
      callbacks.onCompleted(query.data as TData);
      setCallbacks({});
    }

    if (query.isError && callbacks.onError) {
      callbacks.onError(query.error as Error);
      setCallbacks({});
    }
  }, [query.data, query.error, query.isSuccess, query.isError, callbacks]);

  const refetch = useCallback(
    ({ variables, onCompleted, onError }: Options<TData, TParams>) => {
      setArgs(variables);
      setTrigger(true);
      setCallbacks({ onCompleted, onError });
    },
    []
  );

  return [refetch, query];
};

export default useLazyQuery;
```

## useLazyQuery 사용 예제

아래는 `useLazyQuery`를 사용하여 검색 기능을 구현한 예제이다. `getSearch` 함수를 호출하여 데이터 페칭을 수행하고, 결과를 처리한다.

```tsx
const fetchAPI = async (search: string) => {
  // 데이터 패칭 로직
};

const useGetSearchQuery = () =>
  useLazyQuery<string[], string>(["search"], fetchAPI);
```

```tsx
const Example = () => {
  const [search, setSearch] = useState("");

  const [getSearch, { data, isSuccess, isError }] = useGetSearchQuery();

  const handleClick = (search: string) => {
    getSearch({
      variables: search,
      onCompleted: response => {
        // 조회 성공 시 처리
        console.log("Success:", response);
      },
      onError: error => {
        // 조회 실패 시 처리
        console.error("Error:", error);
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={() => handleClick(search)}>클릭</button>
      {isSuccess && <div>데이터: {JSON.stringify(data)}</div>}
      {isError && <div>에러가 발생했습니다.</div>}
    </div>
  );
};

export default Example;
```

## 마치며

`Apollo Client`의 `useLazyQuery`를 참고하여 `React Query`에서도 비슷한 기능을 구현해보았다. 이 훅은 데이터 페칭을 더욱 유연하게 관리할 수 있도록 도와주며, 성공 및 실패 콜백을 통해 추가적인 로직을 처리할 수 있다. 이 글을 통해 `useLazyQuery`를 활용한 효율적인 데이터 페칭 방법을 이해하고, 여러분의 프로젝트에 도움이 되길 바란다.
