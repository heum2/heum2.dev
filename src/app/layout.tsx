import { Providers } from "./providers";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const notosans = Noto_Sans_KR({ weight: "700", subsets: ["latin"] });

export const metadata = {
  title: "heum.dev",
  description: "개발 및 일기를 끄적이는 블로그",
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
