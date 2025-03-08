---
title: 서브도메인 간 쿠키 공유와 CORS 문제 해결하기
description: 서브도메인 간 쿠키 공유가 가능한 이유와 CORS 이슈가 발생하는 원인을 알아보고, Nginx 프록시와 Next.js 리라이트를 활용한 실용적인 해결 방법을 소개합니다.
tags:
  - CORS
  - 쿠키
  - 서브도메인
  - Nginx
  - Next.js
  - 프록시
  - 웹 보안
date: 2025-03-08
thumbnailUrl: 2025/subdomain-cookie-cors/thumbnail.png
category: 💻 Dev
---

웹 애플리케이션을 개발하면서 종종 **쿠키 공유**와 **CORS** 문제를 겪는다. 이 글에서는 아래 내용을 다룬다.

- 왜 서브도메인 간 쿠키 공유는 가능한지
- 왜 API 요청 시 CORS 문제가 발생하는지
- 이러한 문제를 해결하는 방법들

## 1. 쿠키 공유 | CORS

### 쿠키 공유

쿠키의 **Domain 옵션**을 설정하면 서브도메인 간 쿠키를 공유할 수 있다.

```
Set-Cookie: session=abc123; Domain=.mycompany.com
```

이렇게 와일드카드로 `.mycompany.com`을 설정하면 `frontend.mycompany.com`과 `api.mycompany.com` 등 같은 상위 도메인을 가진 서브도메인끼리 쿠키 공유가 가능하다.

### CORS (Cross-Origin Resource Sharing)

브라우저는 **동일 출처 정책(Same-Origin Policy)** 을 따른다. 즉, 프로토콜, 도메인, 포트가 모두 같아야 동일 출처로 본다.

예를 들어,프론트엔드 주소: `frontend.mycompany.com`, API 주소: `api.mycompany.com` 는 상위 도메인 `mycompany.com`을 공유하지만, 서브도메인이 다르므로 브라우저는 이를 서로 다른 오리진으로 인식한다.
그 결과, API 서버에 요청할 때 CORS 정책에 의해 차단될 수 있다.

## 2. CORS 문제 해결을 위한 프록시 서버

쿠키 공유는 도메인 설정으로 해결할 수 있지만, CORS 문제는 문제는 별도로 다뤄야 한다.
이를 해결하는 한 가지 방법은 **프록시 서버**를 이용해 API 요청을 동일한 오리진에서 보내는 것처럼 보이게 하는 것이다.

### Nginx 프록시 설정 예제

프론트엔드(`frontend.mycompany.com`)에서 API 서버(`api.mycompany.com`)로 요청을 전달하는 프록시 설정 예시다.

```nginx
server {
    listen 80;
    server_name frontend.mycompany.com;

    location /api/ {
        proxy_pass https://api.mycompany.com/;

        # 클라이언트의 요청 정보를 API 서버로 전달
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

위 설정을 통해 클라이언트는 `frontend.mycompany.com/api/` 경로로 요청을 보내지만, 실제로는 Nginx가 이를 `https://api.mycompany.com/`로 전달한다.
이 경우 브라우저는 요청이 동일 오리진(`frontend.mycompany.com`)에서 이루어지는 것으로 인식하게 되어 CORS 이슈를 피할 수 있다.

### 로컬 환경과 운영 환경의 차이

로컬 환경에서는 CRA(Create React App) 같은 도구의 프록시 설정을 간단히 활용할 수 있다.
운영 환경에서는 Nginx, API Gateway 등을 통해 보안과 성능까지 고려한 구성이 필요하다.

## 3. Next.js(Vercel)의 프록시 설정

Next.js를 사용하고 Vercel에 배포하는 경우에도 rewrite 설정을 이용해 API 프록시를 구현할 수 있다.
이는 Next.js 서버가 클라이언트의 요청을 받아 내부적으로 API 서버로 전달하는 방식이다.

### next.config.js 예제

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.mycompany.com/:path*",
      },
    ];
  },
};
```

위 설정을 적용하면 클라이언트는 /api/ 경로로 요청을 보내고, Next.js 서버는 해당 요청을 `https://api.mycompany.com`로 프록시하여 전달한다.
이로써 클라이언트는 동일 오리진에서 API 요청을 보내는 것으로 인식하게 되어 CORS 문제를 회피할 수 있다.

## 4. 정리

- **쿠키 공유:** 쿠키의 Domain 옵션으로 서브도메인 간 공유 가능
- **CORS 문제:** 다른 서브도메인 간 요청 시 브라우저가 다른 출처로 인식해 발생
- **해결 방법:** Nginx 프록시 또는 Next.js의 rewrite 설정으로 해결 가능

이 방법들을 통해 보안과 성능을 유지하면서 효율적인 API 통신 환경을 구축할 수 있다.
