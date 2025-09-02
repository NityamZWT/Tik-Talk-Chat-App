// import { LoginUser } from "@/app/lib/actions";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

function Login() {

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center justify-center p-4 w-full max-w-[400px] gap-8 bg-white dark:bg-slate-800 rounded-lg px-8">
            <h1 className='text-4xl font-bold text-shadow-lg text-shadow-gray-400 dark:text-shadow-none text-gray-600'>Welcome Back!</h1>
            <form className={'flex flex-col w-full gap-4'}>
                <Input type={"email"} name={"email"} placeholder={"Enter your email"}/>
                <Input type={"password"} name={"password"} placeholder={"Enter your password"}/>
                <Button className={'rounded-xl py-6'}>Log In</Button>
            </form>
            <p className="text-gray-500 dark:text-gray-400">Don&apos;t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </>
  )
}

export default Login;