"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { UserNav } from "./user-nav"
import { SettingsTabs } from "@/lib/lists"
import { useTranslations } from "next-intl"

export function SettingsHeader() {
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <div className='border-b border-gray-200'>
      <div className='flex items-center justify-between py-4'>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
          <Input type='search' placeholder='Search' className='w-[240px] pl-8 bg-gray-50' />
        </div>
        <UserNav />
      </div>

      <div className='flex space-x-8'>
        {SettingsTabs.map((tab) => (
          <Link key={tab.name} href={tab.href} className={cn("py-3 border-b-2 text-sm font-medium", pathname === tab.href ? "border-[#1890ff] text-[#1890ff]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}>
            {t(tab.name)}
          </Link>
        ))}
      </div>
    </div>
  )
}
