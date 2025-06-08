import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left side - Forgot Password Form */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-6'>
          {/* Back button */}
          <Link href='/login' className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to login
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
            <h2 className='text-xl font-semibold text-gray-900'>Forgot Password</h2>
            <p className='text-sm text-gray-600'>No worries, we'll send you reset instructions.</p>
          </div>

          {/* Form */}
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                Email
              </Label>
              <Input id='email' type='email' placeholder='Enter your email' className='w-full' />
            </div>

            <Button className='w-full bg-blue-600 hover:bg-blue-700'>Send Link</Button>
          </form>

          {/* Back to login */}
          <div className='text-center'>
            <Link href='/login' className='text-sm text-gray-600 hover:text-gray-900'>
              ← Back to log in
            </Link>
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
