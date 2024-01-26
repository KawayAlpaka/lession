import Link from "next/link";
import style from "./MenuList.module.css";

const links = [
  "/",
  "/routes",
  "/routes/deep-routes",
  "/routes/template",
  "/routes/template/group",
  "/routes/template/group1",
  "/routes/template/group2",
  "/routes/error",
  "/routes/users/1",
  "/routes/users/2",
  "/routes/parallel",
  "/routes/parallel/hello",
];

export const MenuList = () => {
  return (
    <div>
      {links.map((pathname) => {
        return (
          <Link
            className={style["menu-item"]}
            key={`${pathname}`}
            href={pathname}
          >
            {pathname}
          </Link>
        );
      })}
    </div>
  );
};
