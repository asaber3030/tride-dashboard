"use client"

import routes from "@/lib/routes"
import Link from "next/link"

import { LogOut, Settings } from "lucide-react"
import { useTranslations } from "next-intl"

export const SidebarFooter = () => {
  const t = useTranslations()
  return (
    <div className='p-2 border-t mt-auto'>
      <ul className='space-y-1'>
        <li>
          <Link href={routes.settings("account")} className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-primary/10'>
            <Settings className='h-5 w-5' />
            {t("settings")}
          </Link>
        </li>
        <li>
          <button className='flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-primary/10'>
            <LogOut className='h-5 w-5' />
            {t("logout")}
          </button>
        </li>
      </ul>
    </div>
  )
}
