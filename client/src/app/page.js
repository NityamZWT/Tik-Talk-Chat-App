// import Image from "next/image";

import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 bg-radial-[at_50%_90%] from-slate-100 to-slate-500 dark:from-slate-800 dark:to-slate-900">
        <div className="flex flex-col items-center justify-center p-4 w-full max-w-[700px]">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-shadow-lg text-shadow-gray-400 dark:text-shadow-none text text-gray-600">Welcome to the Chat App</h1>
            <p className="mt-2 text-lg font-medium opacity-50">Connect with your friends and start chatting!</p>
          </div>
          <div className="flex flex-row item-center justify-center w-full gap-4">
            <Button size={"lg"} className={"cursor-pointer"}>
              <Link href={"/signup"}>
                Sign up
              </Link>
            </Button>
            <Button size={"lg"} className={"cursor-pointer"}>
              <Link href={"/login"}>
                Login  
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </>
  );
}
