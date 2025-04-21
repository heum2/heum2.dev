---
title: "Arrow Function에 대해 알아보자."
description: "ES6에서 사용되고 있는 Arrow Function대해 알아보자."
tags:
  - JavaScript
  - ES6
date: 2023-07-16
series: "Mordern JavaScript (ES6+)"
category: "💻 Dev"
---

## Arrow Function

함수를 화살표로 표현한 방식이다. 코드가 간결하다는 장점이 있다.
바깥에 있던 `this` 값을 내부에서 그대로 사용하기에 함수 내의 `this`값을 변경시키지 않는다.
예시를 살펴보자.

```jsx
document.addEventListener("click", function (e) {
  console.log(this); // event.currentTarget
});
```

일반 함수의 `this`는 `event.currentTarget`을 가르킨다.

```jsx
document.addEventListener("click", e => {
  console.log(this); // window
});
```

화살표 함수의 `this`는 부모의 `this`에 영향(lexical context)을 받아 `window`객체를 가르킨다.

아래는 다른 예시이다.

```jsx
const obj = {
  names: ["김", "이", "박"],
  fnc: function () {
    console.log(this); // obj를 가르킨다.
    obj.names.forEach(function () {
      console.log(this); // window를 가르킨다.
    });
  },
};
```

일반함수에서의 `this`이기에 `window`객체를 가르키는 것을 볼 수 있다. 그렇기에 `window`객체가 아닌 다른 객체를 사용하고 싶다면 `bind, aplly, call`을 사용하여 `window`가 아닌 다른 객체로 적용 시켜줘야한다.

**Arrow function**으로 변경해보자.

```jsx
const obj = {
  names: ["김", "이", "박"],
  fnc: function () {
    console.log(this); // obj를 가르킨다.
    obj.names.forEach(() => {
      console.log(this); // obj를 가르킨다.
    });
  },
};
```

상위에 `this`가 오브젝트이기에 **Arrow function** 안에 있는 `this`도 오브젝트를 가르키는 것을 볼 수 있다.

그래서 `bind, call, apply`를 사용할 이유가 없다.

## 참고

[https://codingapple.com/unit/es6-3-arrow-function-why/?id=2447](https://codingapple.com/unit/es6-3-arrow-function-why/?id=2447)
