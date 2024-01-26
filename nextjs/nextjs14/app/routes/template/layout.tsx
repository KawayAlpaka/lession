"use client";

import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log("routes/template/layout");
  const [conut, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCount((prev) => {
        return prev + 1;
      });
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <div>
      <div>routes/template/layout({conut})</div>
      <div>{children}</div>
    </div>
  );
}
