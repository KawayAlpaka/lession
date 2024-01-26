import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "路由示例",
  description: "路由示例描述",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>routes/layout</div>
      <div>{children}</div>
    </div>
  );
}
