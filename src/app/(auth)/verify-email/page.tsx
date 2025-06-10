import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { getTranslations } from "next-intl/server"
import routes from "@/lib/routes"
import AppLogo from "@/components/common/logo"
import { VerifyEmailForm } from "./_components/form"
import { IMAGES } from "@/lib/constants"

export default async function VerifyEmailPage() {
  const t = await getTranslations()

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left side */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-md space-y-10'>
          <Link href={routes.forgotPassword} className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t("back")}
          </Link>

          <AppLogo />

          <div className='space-y-2 mt-10'>
            <h2 className='text-xl font-semibold text-gray-900'>{t("verifyEmailAddress")}</h2>
            <p className='text-sm text-gray-600'>{t("weHaveSent")}</p>
          </div>

          <VerifyEmailForm />

          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              {t("didNotReceiveCode")} <button className='text-blue-600 hover:text-blue-500 font-medium'>{t("resend")}</button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
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
