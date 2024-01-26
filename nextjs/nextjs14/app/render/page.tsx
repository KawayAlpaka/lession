// "use client";

import { useEffect } from "react";
import { Button } from "./_components/Button";

export default function Home() {
  console.log("render render/page");

  // useEffect(() => {
  //   console.log("enter render/page");
  //   return () => {
  //     console.log("leave render/page");
  //   };
  // }, []);

  return (
    <div>
      <div>render/page</div>
      <Button
      // onClick={() => {
      //   alert("hello lilei");
      // }}
      ></Button>
    </div>
  );
}
