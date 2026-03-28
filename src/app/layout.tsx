import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "社团星图 - 用智能匹配，帮新生找到真正适合自己的社团",
  description: "面向高校新生的社团招新智能匹配平台，通过兴趣建档、AI推荐、标准化比较、报名管理和治理后台，解决传统招新中的信息不对称问题。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
