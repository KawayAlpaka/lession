import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "路由示例-deep-routes",
  description: "路由示例描述-deep-routes",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>routes/deep-routes/layout</div>
      <div>{children}</div>
    </div>
  );
}
