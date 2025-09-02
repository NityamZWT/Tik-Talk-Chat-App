'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function CreateUser(formData) {
  try {
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
      department: formData.get("department"),
      action: formData.get("action"),
    };

    console.log("Form Data:", userData);

    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error:", data);
      throw new Error(data.message || "Something went wrong!");
    }

    console.log("Response Data:", data);

    if (data.token) {
      const cookieStore = await cookies();   // ✅ async version
      cookieStore.set("jwt_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 1 day
      });
    }

    // console.log("User created successfully:", data.token);
    } catch (error) {
        console.error(error);
        
        // ✅ failure
        redirect("/signup");
    }
    // ✅ success
    redirect("/about");
}
