---
title: 자바스크립트에서 비동기 처리 다루기
description: 비동기 처리
tags:
  - JavaScript
  - ES6
  - async await
  - 비동기 처리
date: 2020-05-23
thumbnailUrl: 2020/async-process/thumbnail.png
category: 💻 Dev
---

## 비동기 처리

> 비동기처리방식 공부해야지 생각만하다가.. 오늘 공부합니다!

비동기 처리란 특정 코드의 연산이 끝날 때까지 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것을 의미합니다.

### 사용 이유

```javascript
function add(a, b) {
  const sum = a + b;
  return sum;
}

function print(data) {
  console.log(data);
}

print(add(1, 2));
```

위의 코드는 `add()`의 결과 값을 `print()`로 전달해 출력하는 일반적인 함수입니다. `print()`가 실행되기 위해서는 `add()` 실행이 전부 완료가 되어야합니다.

만약 웹서비스를 한다고 가정했을 때 서버에 데이터 요청을 하고, 응답을 받을 때 웹사이트의 모든 동작이 멈춰버리는 사태가 벌어집니다.

이러한 문제점을 해결하기 위해 나온 것이 **Callback Function(콜백 함수)** 입니다.

## Callback Function

비동기 처리 방식으로 함수를 인자로 받아, 인자로 받은 함수를 이용해 값을 넘겨주기에 **Callback Function**라고 불려집니다.

```javascript
function add(a, b, callback) {
  const sum = a + b;
  callback(sum);
}

function print(result) {
  setTimeout(function () {
    console.log(result);
  }, 1000);
}

console.log(1);
console.log(2);
add(1, 2, print);
console.log(4);
```

위의 결과 값이 어떻게 나올지 아시겠나요?
비동기 처리를 이해를 아직 못하신 분들은 `1 -> 2 -> (1+2) 3 -> 4` 가 나온다고 생각 할 수 있겠네요.

이를 이해하기 위해서는 JavaScript의 동작원리를 이해하면 좋습니다.

### 동작원리

1. JavaScript에는 함수를 호출할 때 **Stack**이라는 공간에 push가 됩니다. 연산이 끝난 함수는 pop으로 결과 값을 반환합니다.
2. 브라우저 및 서버에서 실행되는 함수인 경우(setTimeout, setInterval 등) **Web APIs**에서 해당하는 연산을 시작하며 **Stack**에서의 함수는 반환됩니다.(Timer)
3. **Web APIs**의 연산이 끝나면 **Task Queue**로 결과 값이 이동합니다.
4. **Stack** 함수들이 모두 반환되어 빈 상태가 되면 **Event loop**가 실행되어 **Task Queue**에 있던 결과 값들이 **Stack**으로 이동합니다.
5. 결과 값을 받은 **Stack**은 pop으로 반환하여 결과를 내보냅니다.

![](https://images.velog.io/images/heumheum2/post/797823d9-fb2d-41c1-b93d-2b295fb284f8/%EC%BD%9C%EB%B0%B1.png)

자세한 내용은 [영상](https://youtu.be/8aGhZQkoFbQ)을 참고해주세요.

### Callback hell(콜백 지옥)

실제 웹서비스를 돌리면서 **콜백함수**로 로그인 한다고 가정했을 때 인코딩, 사용자 인증 등을 처리해야되는 경우가 있습니다. 순서를 제어하기 위해 callback 안에 callback 안에 callback... 이른 바 **Callback hell(콜백 지옥)** 이 발생합니다.

```javascript
a(function (resultsFromA) {
  b(resultsFromA, function (resultsFromB) {
    c(resultsFromB, function (resultsFromC) {
      d(resultsFromC, function (resultsFromD) {
        e(resultsFromD, function (resultsFromE) {
          f(resultsFromE, function (resultsFromF) {
            console.log(resultsFromE);
          });
        });
      });
    });
  });
});
```

이러한 코드구조들은 가독성도 떨어지고, 나중가서 변경하기도 어렵습니다. 또한 에러가 발생했을 때 어디서 발생했는지 찾기조차 힘듭니다. 이러한 문제점을 해결하기 위해 나온 함수가 **Promise** 입니다.

## Promise

**Promise**는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용합니다. 또, 콜백 함수의 문제점을 해결했다는 점이 있습니다.

콜백 함수로 서버에게 데이터 요청을 보내면, 서버가 응답을 해 데이터를 전송합니다.하지만 데이터를 다 받아오기도 전에 데이터를 화면에 표시하게 되면 오류를 발생시키거나 빈 화면을 보여주게 됩니다. 그렇기에 조건문을 걸어 콜백 함수의 가독성을 더 떨어뜨리는 문제가 있었습니다.

아래의 코드를 보겠습니다.

```javascript
function getData(num) {
  return new Promise(function (resolve, reject) {
    if (num) {
      resolve(num);
    }
    reject(new Error("0을 넣었네요!"));
  });
}

getData(1)
  .then(function (data) {
    console.log(data + " 을 넣었어요!");
  })
  .catch(function (err) {
    console.error(err);
  });
```

사용방법은 콜백함수랑 비슷해보입니다.

**Promise**는 3가지의 상태 값을 가집니다.

### 상태값

1. Pending(대기) : `new Promise()` 메소드를 호출하면 대기 상태가 됩니다.
2. Fulfilled(이행) : `new Promise()`의 콜백 함수의 인자로 `resolve`가 실행되면 이행 상태가 됩니다. 이행 상태가 되면 `then()`을 이용해 결과 값을 받을 수 있습니다.
3. Rejected(실패) ; 콜백 함수의 인자로 `reject`가 실행되면 실패 상태가 됩니다. 실패 상태가 되면 `catch()`를 이용해 실패 이유를 받을 수 있습니다.

즉, 처리가 완료되면 `then()`을 통해 결과 값을 받아올 수 있을 뿐만 아니라, 요청도중 에러가 발생했을 때 `catch()`로 에러를 받아올수 있기에 콜백 함수의 문제점을 해결했다는 것을 알 수 있습니다.

또한, 여러번 콜백 함수를 사용했을 때 나온 콜백 지옥 문제도 해결했는데 아래 코드를 보겠습니다.

```javascript
a()
  .then(function (resultsFromA) {
    console.log(resultsFromA);
  })
  .then(function (resultsFormB) {
    console.log(resultsFormB);
  })
  .then(function (resultFormC) {
    console.log(resultFormC);
  });
```

콜백 함수의 가독성 문제도 해결하는 것을 볼 수 있네요. ㅎㅎ

## Async & Await

Promise 이후에 나온 비동기 처리 방식입니다. Promise객체를 반환해야 의도한 대로 동작하며, 비동기 코드의 동작을 좀 더 동기 코드와 유사하게 만들기 위해 사용합니다.

아래의 코드를 보겠습니다.

```javascript
function getData() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const items = [1, 2, 3];
      resolve(items);
    }, 3000);
  });
}

async function printData() {
  const data = await getData();
  console.log(data);
}

printData();
```

먼저 `getData()` 함수는 Promise 객체를 반환하는 함수입니다. `getData()`가 실행되면 Promise가 이행 상태가 되며 결과 값은 `items` 배열이 됩니다.

`printData()`함수를 실행하면 `getData()`함수의 결과 값인 `items` 배열이 3초 후 `data` 변수에 담깁니다. 따라서 `[1, 2, 3]`이 출력되는 코드입니다.

여기서 `await`을 사용하지 않으면 어떻게 될까요?
`data` 변수에 값이 들어오기 전에 출력이 되는 것을 볼 수 있습니다. 그렇기에 `await`은 말 그대로 데이터를 받아오기 전까지 기다린다는 사실을 알 수 있습니다.

비동기에 대한 사고를 하지 않아도 되기에 개발에 있어서 큰 도움이 될 것 같네요.

콜백 함수의 문제점이였던 예외처리 또한, try catch문으로 처리할 수 있습니다.

```javascript
async function hello() {
  try {
    const user = await fetchUser();
    if (user.id === 1) {
      const post = await fetchPost();
      res.stats(200).json(post);
    }
  } catch (err) {
    console.error(err);
  }
}
```

코드를 실행하다가 발생한 네트워크 통신 오류뿐만 아니라 간단한 타입 오류 등의 일반적인 오류까지 `catch`로 잡아 낼 수 있습니다. 발견 된 에러는 `err`객체에 담기기 때문에 에러의 유형에 맞게 에러 코드를 처리하면 되겠습니다.

## 참고

[https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
[https://joshua1988.github.io/web-development/javascript/promise-for-beginners/](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
[https://joshua1988.github.io/web-development/javascript/js-async-await/](https://joshua1988.github.io/web-development/javascript/js-async-await/)

---
