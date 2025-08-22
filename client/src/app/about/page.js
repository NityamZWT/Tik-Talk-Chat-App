import { cookies } from "next/headers";

export default async function About() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token");
  console.log("Server Token:", token); // should log your JWT

  return <div>About Page {token.value}</div>;
}
