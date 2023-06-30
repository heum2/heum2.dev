import { Providers } from "./providers";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import { Metadata } from "next";

const notosans = Noto_Sans_KR({ weight: "700", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "heum.dev",
  description: "개발 및 일기를 끄적이는 블로그",
  verification: {
    google: "wqdMVCQQf_90q8KKZXOk13hsMOSNhs6646sM8giTGpY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ko">
      <head />
      <body className={(notosans.className, "min-h-screen")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
