'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


export default async function CreateUser(formData) {
    try {
        const userData = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log("Form Data:", userData);
        const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type":"application/json"
            },
            credentials: 'include' // Important for cookies
        })

        const data = await res.json();

        if(!res.ok){
            console.error("Error:", data);
            throw new Error(data.message || 'Something went wrong!');
        } 
        console.log("Response Data:", data);
        // If your Express server returns the token in the response body
        if (data.token) {
            const cookieStore = await cookies();
            cookieStore.set('jwt_token', data.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60, // 1 day
            });
        }
        
        console.log("User created successfully:", data.token);
    } catch (error) {
        console.error(error);
        redirect('/signup');
    }
    redirect('/about');
}