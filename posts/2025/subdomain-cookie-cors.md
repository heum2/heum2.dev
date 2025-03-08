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

## 1. 쿠키 공유 vs. CORS

### 쿠키 공유

- 쿠키의 **Domain 옵션**을 설정하면 서브도메인 간 쿠키를 공유할 수 있다.
  ```
  Set-Cookie: session=abc123; Domain=.mycompany.com
  ```
- 이렇게 설정하면 `frontend.mycompany.com`과 `api.mycompany.com` 등 같은 상위 도메인을 가진 서브도메인끼리 쿠키 공유가 가능하다.

### CORS (Cross-Origin Resource Sharing)

- 브라우저는 **동일 출처 정책(Same-Origin Policy)**을 따른다. 즉, 프로토콜, 도메인, 포트가 모두 같아야 동일 출처로 본다.
- 서브도메인이 다르면 다른 출처로 판단하여 CORS 정책이 적용된다.

## 2. CORS 문제 해결을 위한 프록시 서버

쿠키 공유는 도메인 설정으로 해결할 수 있지만, CORS 문제는 프록시를 통해 해결한다.

### Nginx 프록시 설정 예제

프론트엔드(`frontend.mycompany.com`)에서 API 서버(`api.mycompany.com`)로 요청을 전달하는 프록시 설정 예시다.

```nginx
server {
    listen 80;
    server_name frontend.mycompany.com;

    location /api/ {
        proxy_pass https://api.mycompany.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- 이렇게 하면 브라우저는 동일 오리진에서 요청이 발생한 것으로 인식해 CORS 문제를 피할 수 있다.

### 로컬 환경과 운영 환경의 차이

- 로컬 환경에서는 CRA(Create React App) 같은 도구의 프록시 설정을 간단히 활용할 수 있다.
- 운영 환경에서는 Nginx, API Gateway 등을 통해 보안과 성능까지 고려한 구성이 필요하다.

## 3. Next.js(Vercel)의 프록시 설정

Next.js는 rewrite 기능을 통해 프록시를 설정할 수 있다.

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

- 위 설정을 통해 CORS 문제 없이 동일 오리진에서 API 요청을 처리한다.

## 4. 정리

- **쿠키 공유:** 쿠키의 Domain 옵션으로 서브도메인 간 공유 가능
- **CORS 문제:** 다른 서브도메인 간 요청 시 브라우저가 다른 출처로 인식해 발생
- **해결 방법:** Nginx 프록시 또는 Next.js의 rewrite 설정으로 해결 가능

이 방법들을 통해 보안과 성능을 유지하면서 효율적인 API 통신 환경을 구축할 수 있다.
