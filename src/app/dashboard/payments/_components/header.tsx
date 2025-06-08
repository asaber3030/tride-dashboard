"use client"

import Link from "next/link"
import routes from "@/lib/routes"

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

import { UsersIcon, CarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const PaymentsHeader = () => {
  const pathname = usePathname()
  const t = useTranslations()

  const isDriversPayments = pathname === routes.payments("drivers")
  const isParentsPayments = pathname === routes.payments()

  return (
    <div className='flex flex-col space-x-2 mb-4 w-fit'>
      <div className='grid rounded-none grid-cols-2 p-0 h-auto bg-transparent border-b border-gray-200 gap-4'>
        <Link href={routes.payments()} className={cn("py-2 flex gap-2 items-center border-b-2 transition-colors", isParentsPayments ? "border-b-blue-500 text-blue-600" : "border-b-transparent")}>
          <UsersIcon className='size-4' />
          {t("parentsPayments")}
        </Link>

        <Link href={routes.payments("drivers")} className={cn("py-2 flex gap-2 items-center border-b-2 transition-colors", isDriversPayments ? "border-b-blue-500 text-blue-600" : "border-b-transparent")}>
          <CarIcon className='size-4' />
          {t("driversPayments")}
        </Link>
      </div>
    </div>
  )
}
