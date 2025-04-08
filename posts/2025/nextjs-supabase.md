---
title: Next.js와 Supabase로 간단하고 강력한 백엔드 구축하기
description: Next.js와 Supabase를 함께 사용하면 복잡한 서버 관리 없이 빠르게 웹사이트의 백엔드를 구현할 수 있다.
tags:
  - Next.js
  - Supabase
  - 실시간 통신
  - 백엔드 개발
  - 인증
date: 2025-04-08
thumbnailUrl: 2025/nextjs-supabase/thumbnail.png
category: 💻 Dev
---

Next.js를 이용해 웹사이트를 개발할 때, 백엔드 서버를 직접 구성하고 관리하는 일은 생각보다 많은 시간과 노력이 든다. Supabase는 이러한 고민을 해결해 줄 수 있는 훌륭한 서비스다. 이번 글에서는 Next.js와 Supabase를 결합해 간편하면서도 강력한 백엔드를 구축하는 방법을 소개한다.

## Supabase 프로젝트 생성

먼저 [Supabase 공식 사이트](https://supabase.com/)에서 회원가입 후 프로젝트를 만든다.

생성 후 다음 두 가지를 저장한다.

- 프로젝트 URL
- API 키 (anon public key)

## Next.js 프로젝트에 Supabase 설치 및 설정

Supabase 자바스크립트 클라이언트를 설치한다.

```bash
npm install @supabase/supabase-js
# 또는 yarn add @supabase/supabase-js
```

이제 클라이언트를 초기화해보자.

```tsx:utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

환경 변수는 `.env.local` 파일에 추가한다.

```tsx:.env.local
NEXT_PUBLIC_SUPABASE_URL = 여기_프로젝트_URL;
NEXT_PUBLIC_SUPABASE_ANON_KEY = 여기_API_키;
```

---

## Next.js API 라우트에서 Supabase 활용

**데이터 가져오기 예시**

```tsx:pages/api/posts.js
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) return res.status(500).json({ error });

  res.status(200).json({ data });
}
```

**데이터 저장하기 예시**

```tsx:pages/api/createPost.js
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
  const { title, content } = req.body;

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content }])
    .select();

  if (error) return res.status(500).json({ error });

  res.status(201).json({ data });
}
```

---

## 실시간(Realtime) 기능 연동하기

Supabase는 간단한 코드로도 실시간 데이터를 제공한다.

```tsx:components/RealtimePosts.js
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function RealtimePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 초기 데이터 로드
    supabase
      .from("posts")
      .select("*")
      .then(({ data }) => setPosts(data));

    // 실시간 업데이트 구독
    const subscription = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        payload => {
          setPosts(prevPosts => [...prevPosts, payload.new]);
        }
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해제
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

이 코드로 데이터 변경사항이 있을 때 실시간으로 화면에 반영된다.

---

## 인증(Auth) 기능 사용하기

Supabase는 기본적인 인증 기능을 제공한다.

```tsx
// 로그인 예시
await supabase.auth.signInWithPassword({
  email: "example@email.com",
  password: "password123",
});

// 로그아웃 예시
await supabase.auth.signOut();
```

이메일과 소셜 로그인 등 다양한 방법으로 사용자를 인증하고 관리할 수 있다.

---

## 주의해야 할 사항

- **권한 관리 중요**: 직접 데이터베이스에 접근 시, Supabase의 Row Level Security(RLS) 기능을 활용하여 데이터를 보호하자.

---

## 마치며

Next.js와 Supabase를 함께 사용하면, 별도의 복잡한 백엔드 구성 없이도 빠르고 효율적으로 웹 애플리케이션을 개발할 수 있다. Supabase의 데이터베이스, 인증, 실시간 기능은 Next.js와 강력한 시너지를 만들어낸다.

위 기술들을 가지고 프로젝트를 만들어보면 좋을 것 같다.
