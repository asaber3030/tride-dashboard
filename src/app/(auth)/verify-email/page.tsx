import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function VerifyEmailPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left side - Verify Email Form */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-6'>
          {/* Back button */}
          <Link href='/forgot-password' className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back
          </Link>

          {/* Logo */}
          <div className='text-center'>
            <h1 className='text-2xl font-bold'>
              <span className='text-blue-500'>T</span>
              <span className='text-green-500'>r</span>
              <span className='text-yellow-500'>i</span>
              <span className='text-red-500'>p</span>
              <span className='text-purple-500'>e</span>
            </h1>
          </div>

          {/* Header */}
          <div className='text-center space-y-2'>
            <h2 className='text-xl font-semibold text-gray-900'>Verify Email Address</h2>
            <p className='text-sm text-gray-600'>We've sent a verification code to your email address.</p>
          </div>

          {/* Form */}
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='code' className='text-sm font-medium text-gray-700'>
                Verification Code
              </Label>
              <Input id='code' type='text' placeholder='Enter verification code' className='w-full text-center tracking-widest' maxLength={6} />
            </div>

            <Button className='w-full bg-blue-600 hover:bg-blue-700'>Verify</Button>
          </form>

          {/* Resend link */}
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              {"Didn't receive the code? "}
              <button className='text-blue-600 hover:text-blue-500 font-medium'>Resend</button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className='flex-1 bg-blue-600 flex items-center justify-center p-8'>
        <div className='text-center space-y-4'>
          <div className='bg-white rounded-lg p-6 shadow-lg max-w-sm mx-auto'>
            <Image src='/placeholder.svg?height=200&width=300' alt='Dashboard illustration' width={300} height={200} className='w-full h-auto' />
          </div>
          <div className='text-white'>
            <h3 className='text-lg font-semibold'>WELCOME TO TRIPE DASHBOARD</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
