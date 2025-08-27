import { cookies } from "next/headers";

export default async function About() {

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token");
  console.log("Server Token:", token); 

  const response = await fetch("http://localhost:5000/api/auth/users", {
    cache: "no-store",
    headers: {
      Cookie: `jwt_token=${token?.value}` 
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const usersList = await response.json();

  return (
    <>
      <h1>About Page</h1>
      <p>Server Token: {token?.value}</p>
      <h2>Users List</h2>
      <ul>
        {usersList.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
}
