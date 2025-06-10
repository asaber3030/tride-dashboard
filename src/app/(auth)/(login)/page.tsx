import Image from "next/image"

import AppLogo from "@/components/common/logo"
import { LoginForm } from "./_components/login-form"
import { getTranslations } from "next-intl/server"

export default async function LoginPage() {
  const t = await getTranslations()

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left side - Login Form */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='w-fit'>
            <AppLogo />
          </div>

          {/* Welcome Text */}
          <div className='text-left space-y-2'>
            <h2 className='text-xl font-semibold text-gray-900'>{t("welcomeBack")}</h2>
            <p className='text-sm text-gray-600'>{t("welcomeBackText")}</p>
          </div>

          <LoginForm />
        </div>
      </div>

      {/* Right side */}
      <div className='flex-1 bg-primary flex items-center justify-center p-8'>
        <div className='text-center space-y-4'>
          <div className='rounded-lg p-6 max-w-xl mx-auto w-xl'>
            <Image src={"/defaults/auth/login.png"} alt='Dashboard illustration' width={300} height={200} className='w-full h-auto' />
          </div>
          <div className='text-white'>
            <h3 className='text-lg font-semibold'>{t("loginWelcomeText")}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
