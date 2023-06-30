import { Noto_Sans_KR } from "next/font/google";
import { Metadata } from "next";

import { config } from "config";
import { Providers } from "./providers";
import Scripts from "src/components/scripts";

import "./globals.css";

const notosans = Noto_Sans_KR({ weight: "700", subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.blog.title,
  description: config.blog.description,
  keywords: config.seo.keywords,
  verification: {
    google: config.googleSearchConsole.config.siteVerification,
    other: {
      "naver-site-verification":
        config.naverSearchConsole.config.siteVerification,
    },
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    description: config.blog.description,
    title: config.blog.title,
    url: config.link,
    siteName: config.blog.title,
    locale: "ko_KR",
    images: "https://heum2.github.io/next.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ko">
      <head>
        <Scripts />
      </head>
      <body
        className={
          (notosans.className, "min-h-screen bg-slate-100 dark:bg-black")
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
