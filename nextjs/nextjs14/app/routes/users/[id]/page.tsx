import { getUser } from "@/app/_api/user.mock";
import { User } from "./_components/User";

export default async function Home({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const text = await fetch("https://www.baidu.com", { cache: "no-store" }).then(
    (res) => res.text()
  );

  return (
    <div>
      {/* <div>user:{user?.id}</div>
      <div>name:{user?.name}</div>
      <div>age:{user?.age}</div>
      <div>loginInfo:{loginInfo.errorCode}</div> */}

      <User user={user}></User>
      <div>text:{text.slice(0, 100)}</div>
    </div>
  );
}
