import Link from "next/link"
import Image from "next/image"
import AppLogo from "@/components/common/logo"

import routes from "@/lib/routes"

import { getTranslations } from "next-intl/server"

import { ArrowLeft } from "lucide-react"
import { ForgotPasswordForm } from "./_components/form"
import { IMAGES } from "@/lib/constants"

export default async function ForgotPasswordPage() {
  const t = await getTranslations()

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left side */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-6'>
          <Link href={routes.login} className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t("backToLogin")}
          </Link>

          <AppLogo />

          {/* Header */}
          <div className='space-y-2 mt-10'>
            <h2 className='text-xl font-semibold text-gray-900'>{t("forgotPassword")}</h2>
            <p className='text-sm text-gray-600'>{t("forgotPasswordDescription")}</p>
          </div>

          {/* Form */}
          <ForgotPasswordForm />

          <div className='text-center'>
            <Link href={routes.login} className='text-sm text-gray-600 hover:text-gray-900'>
              {t("backToLogin")}
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className='flex-1 bg-blue-600 flex items-center justify-center p-8'>
        <div className='text-center space-y-4'>
          <div className='bg-white rounded-lg p-6 shadow-lg max-w-sm mx-auto'>
            <Image src={IMAGES.auth} alt='Dashboard illustration' width={300} height={200} className='w-full h-auto' />
          </div>
          <div className='text-white'>
            <h3 className='text-lg font-semibold'>{t("loginWelcomeText")}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
