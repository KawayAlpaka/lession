export interface IUser {
  id: string;
  name: string;
  age: number;
}

const users: IUser[] = [
  { id: "1", name: "lilei", age: 13 },
  { id: "2", name: "hanmeimei", age: 12 },
];

export const getUser = async (id: string): Promise<IUser | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.find((u) => u.id === id));
    }, 2000);
  });
};
