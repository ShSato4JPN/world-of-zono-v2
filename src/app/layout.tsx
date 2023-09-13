import "./globals.scss";
import SwrConfig from "@/components/SwrConfig";
import localFont from "next/font/local";
import { ReactNode } from "react";
import fetcher from "@/libs/fetcher";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WozRoot from "@/components/WozRoot";
import GaScript from "@/components/GaScript";

export const metadata = {
  title: "World-Of-Zono",
  description: "WOZ（World-Of-Zono）の公式サイトです",
  openGraph: {
    title: "World-Of-Zono",
    description: "WOZ（World-Of-Zono）の公式サイトです",
    siteName: "World-Of-Zono",
  },
};

const zenMaruGothic = localFont({
  fallback: ["sans-serif"],
  src: [
    { path: "./ZenMaruGothic-Light.ttf", weight: "300", style: "light" },
    { path: "./ZenMaruGothic-Regular.ttf", weight: "400", style: "normal" },
    { path: "./ZenMaruGothic-Medium.ttf", weight: "500", style: "medium" },
    { path: "./ZenMaruGothic-Bold.ttf", weight: "700", style: "bold" },
    { path: "./ZenMaruGothic-Black.ttf", weight: "900", style: "black" },
  ],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={zenMaruGothic.className}>
        <GaScript />
        <SwrConfig value={{ fetcher }}>
          <Header />
          <WozRoot>{children}</WozRoot>
          <Footer />
        </SwrConfig>
      </body>
    </html>
  );
}
