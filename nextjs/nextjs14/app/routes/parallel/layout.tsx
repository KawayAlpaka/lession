import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "路由示例",
  description: "路由示例描述",
};

export default function RootLayout({
  children,
  parallel1,
  parallel2,
}: Readonly<{
  children: React.ReactNode;
  parallel1: React.ReactNode;
  parallel2: React.ReactNode;
}>) {
  return (
    <div>
      <div>routes/parallel/layout</div>
      <div>{children}</div>
      <div>{parallel1}</div>
      <div>{parallel2}</div>
    </div>
  );
}
