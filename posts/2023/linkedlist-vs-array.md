---
title: "Linked List와 Array 비교"
description: "Linked List와 Array 비교"
tags:
  - 자료구조
  - JavaScript
date: 2023-08-24
category: "💻 Dev"
thumbnailUrl: "linkedlist-vs-array.png"
---

## Linked List

노드에서 값과 다음 항목에 대한 주소를 가지고 있는 자료구조를 `Linked List`라고 한다.

A → B → C 의 노드가 있다고 하면 A는 B의 주소를 가지고 있고, B는 C의 주소를 가지고 있는 셈이 된다.

### Linked List - 조회

C가 가지고 있는 값을 찾기 위해서는 A가 가지고 있는 B의 주소와 B가 가지고 있는 C의 주소를 알고 있어야 한다. 한 노드씩 순회를 해야한다.

- 시간복잡도: O(n)

### Linked List - 삽입

만약 여기서 A"가 추가되어 A → A" → B → C 순으로 되어야 한다고 가정하면, A가 가지고 있던 B의 주소를 A"에게 주고, A는 A"의 주소를 가지고 있으면 된다.

- 시간복잡도: O(1)

### Linked List - 삭제

A → B → C 의 순으로 다시 되돌리고 싶은 경우, A"가 가지고 있는 B의 주소를 A에게 넘기기만 하면 된다.
그렇게 되면 A → B → C, A" → B → C 이 두 가지의 경로가 생길 수 있는데, A"를 사용하지 않는다면 Java에서는 가비지 컬렉션으로 메모리에서 지워줄 것이다.
사용하고 있는 언어가 메모리를 시간이 지나도 비워주는 기능이 없다면 직접 지워줘야 한다.

- 시간복잡도: O(1)

## Array

이름에 `List`가 들어가다 보니 결국 `Array`와 비교를 많이 하게 된다.

`Array`는 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열되어있는 자료구조이다.

### Array - 조회

메모리에 할당된 주소 공간의 인덱스로 조회를 할 수 있다. 인덱스만 알면 조회를 빠르게 할 수 있다.

- 시간복잡도: O(1)

### Array - 삽입 및 삭제

메모리에 데이터를 삽입 및 삭제한다고 하면, 배열의 끝 부분은 빠르게 동작한다.

- 시간복잡도: O(1)

다만 중간 지점인 경우, 뒤의 원소들을 이동시키거나 메모리의 크기를 새롭게 할당 받은 뒤, 이전 데이터를 복사하여 붙여 넣고, 그 이후 데이터가 삽입이 된다.

- 시간복잡도: O(n)

## Linked List와 Array 비교

- 삽입과 삭제가 빈번하다면 **Linked List**
- 데이터를 접근이 빈번하다면 **Array**

## Javascript Array

**JavaScript**의 `Array`는 길이와 어떤 자료형도 삽입이 가능하기에 유연한 것으로 알고 있다.

MDN에서는 아래와 같이 정의를 내리고 있다.

> 배열의 길이가 언제든지 늘어나거나 줄어들 수 있고 데이터를 연속적이지 않은 곳에 저장할 수 있으므로, JavaScript 배열은 밀집성을 보장하지 않습니다.

빈 값도 가질 수 있기에 중간에 원소를 삽입 또는 삭제할 때 뒤의 원소들을 이동시키지 않는다.
메모리 공간이 동일한 크기를 갖지 않아도 되는 것으로 보아 일반적인 배열로 보이지는 않기에 찾아보았다.

[**모던 자바스크립트 Deep Dive**](https://poiemaweb.com/js-array-is-not-arrray) 책에서는 아래와 같이 정의를 내리고 있다.

> 자바스크립트 배열은 해시 테이블로 구현된 객체이므로 인덱스로 배열 요소에 접근하는 경우, 일반적인 배열보다 성능적인 면에서 느릴 수 밖에 없는 구조적인 단점을 갖는다. 하지만 특정 요소를 탐색하거나 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다.

### Javascript Array - 조회

일반적인 배열보다 인덱스로 접근하는게 느릴 수 있다지만, 순차로 접근하는 `Linked List`보다는 `Array`가 더 빠르다.

### Javascript Array - 삽입 및 삭제

Javascript Array는 해시 테이블이기에 어디에서 삽입, 삭제를 하던 O(1)의 시간복잡도를 가진다.

### Linked List와 Javascript Array 비교

`Linked List`와 비교했을 때, 조회에서는 `Array`가 더 좋고, 삽입 시 `Linked Array`와 유사하다.

## 참고

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
