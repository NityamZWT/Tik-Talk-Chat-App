import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

function Signup() {
  return (
    <>
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center p-4 w-full max-w-[400px] gap-8 bg-white dark:bg-slate-800 rounded-lg px-8'>
                <h1 className='text-4xl font-bold text-shadow-lg text-shadow-gray-400 dark:text-shadow-none text-gray-600'>Hey! Let's Connect</h1>
                <form className={'flex flex-col w-full gap-4'} onSubmit={handleRegistration}>
                    <Input type={"text"} placeholder={"Enter your name"} className={'ring-0'}/>
                    <Input type={"email"} placeholder={"Enter your email"}/>
                    <Input type={"password"} placeholder={"Enter your password"}/>
                    <Input type={"password"} placeholder={"Confirm your password"}/>
                    <Button className={'rounded-xl py-6'}>Sign Up</Button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Signup