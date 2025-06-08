import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLogo from "@/components/common/logo"

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left side - Login Form */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='w-fit'>
            <AppLogo />
          </div>

          {/* Welcome Text */}
          <div className='text-left space-y-2'>
            <h2 className='text-xl font-semibold text-gray-900'>Welcome back</h2>
            <p className='text-sm text-gray-600'>Welcome back! Please enter your details to sign in.</p>
          </div>

          {/* Login Form */}
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                Email
              </Label>
              <Input id='email' type='email' placeholder='Enter your email' className='w-full' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
                Password
              </Label>
              <Input id='password' type='password' placeholder='••••••••' className='w-full' />
            </div>

            <div className='flex items-center justify-between'>
              <Link href='/forgot-password' className='text-sm text-primary hover:text-blue-500'>
                Forgot password?
              </Link>
            </div>

            <Button className='w-full bg-primary hover:bg-primary mt-6'>Sign in</Button>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className='flex-1 bg-primary flex items-center justify-center p-8'>
        <div className='text-center space-y-4'>
          <div className='rounded-lg p-6 max-w-xl mx-auto w-xl'>
            <Image src={"/defaults/auth/login.png"} alt='Dashboard illustration' width={300} height={200} className='w-full h-auto' />
          </div>
          <div className='text-white'>
            <h3 className='text-lg font-semibold'>WELCOME TO TRide DASHBOARD</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
