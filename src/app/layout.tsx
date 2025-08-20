import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalProgressBar } from "@/components/common/GlobalProgressBar";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "疾驰广州 -电动自行车跃居出行'头牌'背后的困局",
  description:
    "以数据新闻的形式展现广州非机动车的发展、问题与治理路径，包含趋势、地图、违法事故、人群画像与治理经验等模块。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProgressBar />
        {children}
      </body>
    </html>
  );
}
