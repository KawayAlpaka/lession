import { getUser } from "@/app/_api/user.mock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const user = await getUser(id as string);

  return Response.json({ user });
}
