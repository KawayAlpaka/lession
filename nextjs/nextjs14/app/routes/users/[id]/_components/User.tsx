import { IUser } from "@/app/_api/user.mock";

export const User = ({ user }: { user: IUser | undefined }) => {
  return (
    <>
      <div>user:{user?.id}</div>
      <div>name:{user?.name}</div>
      <div>age:{user?.age}</div>
    </>
  );
};
