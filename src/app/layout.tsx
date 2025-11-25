import { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { config } from "config";
import { Providers } from "src/app/providers";
import Scripts from "src/components/scripts";

import { cn } from "src/utils/style";

import "src/app/globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Thin.woff",
      weight: "100",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraLight.woff",
      weight: "200",
    },
    {
      path: "../../public/fonts/Pretendard-Light.woff",
      weight: "300",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.woff",
      weight: "400",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff",
      weight: "500",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff",
      weight: "600",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff",
      weight: "700",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "../../public/fonts/Pretendard-Black.woff",
      weight: "900",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: config.blog.title,
  description: config.blog.description,
  keywords: config.seo.keywords,
  verification: {
    google: config.googleSearchConsole.config.siteVerification,
    other: {
      "naver-site-verification":
        config.naverSearchConsole.config.siteVerification,
      ...(config.googleAdsense.enable && {
        "google-adsense-account": config.googleAdsense.config.client,
      }),
    },
  },
  icons: {
    icon: "./favicon.ico",
    apple: "./favicon.ico",
  },
  openGraph: {
    type: "website",
    description: config.blog.description,
    title: config.blog.title,
    url: config.link,
    siteName: config.blog.title,
    locale: "ko_KR",
    images: [
      {
        url: `${config.link}/images/profile.jpg`,
        width: 1200,
        height: 630,
        alt: config.blog.title,
      },
    ],
  },
  alternates: {
    canonical: config.link,
    types: {
      "application/rss+xml": `${config.link}/rss.xml`,
      "application/atom+xml": `${config.link}/rss-atom.xml`,
      "application/json": `${config.link}/feed.json`,
    },
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Scripts />
      </head>
      <body
        className={cn(
          "min-h-screen bg-slate-100 dark:bg-black transition-colors duration-200",
          pretendard.className
        )}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
