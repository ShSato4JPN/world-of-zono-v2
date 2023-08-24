import "./globals.scss";
import SwrConfig from "@/components/SwrConfig";
import localFont from "next/font/local";
import { ReactNode } from "react";
import fetcher from "@/libs/fetcher";

export const metadata = {
  title: "World-Of-Zono",
  description: "WOZ（World-Of-Zono）の公式サイトです。",
  openGraph: {
    title: "World-Of-Zono",
    description: "world of zono v2",
    siteName: "World-Of-Zono",
  },
};

const zenMaruGothic = localFont({
  fallback: ["sans-serif"],
  src: [
    { path: "./ZenMaruGothic-Black.ttf" },
    { path: "./ZenMaruGothic-Bold.ttf" },
    { path: "./ZenMaruGothic-Light.ttf" },
    { path: "./ZenMaruGothic-Medium.ttf" },
    { path: "./ZenMaruGothic-Regular.ttf" },
  ],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={zenMaruGothic.className}>
        <SwrConfig value={{ fetcher }}>{children}</SwrConfig>
      </body>
    </html>
  );
}
