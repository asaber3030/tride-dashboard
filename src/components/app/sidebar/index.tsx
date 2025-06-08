"use client"

import { usePathname } from "next/navigation"

import { useTranslations } from "next-intl"

import { SidebarHeader } from "./header"
import { SidebarItems } from "./items"
import { SidebarFooter } from "./footer"

export function DashboardSidebar() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <div className='w-[240px] min-h-screen border-r bg-light-primary xl:flex hidden flex-col py-4'>
      <SidebarHeader />
      <SidebarItems />
      <SidebarFooter />
    </div>
  )
}
