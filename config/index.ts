export const config = {
  // profile setting (required)
  profile: {
    name: "heum2",
    image: "/images/profile.jpg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "frontend developer",
    bio: "Coffee is my power ☕️",
    email: "jwh6295@gmail.com",
    linkedin: "eunheum-jo-b9459a1b4",
    github: "heum2",
    instagram: "",
    twitter: "",
  },
  // blog setting (required)
  blog: {
    title: "heum.dev",
    description: "개발 및 일기를 끄적이는 블로그",
  },
  // CONFIG configration (required)
  link: "https://heum2-dev.vercel.app",
  since: 2023, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash
  seo: {
    keywords: ["Blog", "Website", "Notion"],
  },

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: process.env.NODE_ENV === "production",
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: process.env.NODE_ENV === "production",
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchConsole: {
    enable: process.env.NODE_ENV === "production",
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "heum2/heum2.dev",
      "issue-term": "title",
      label: "💬 Utterances",
    },
  },
};
