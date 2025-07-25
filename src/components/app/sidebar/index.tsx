"use client"

import { SidebarHeader } from "./header"
import { SidebarItems } from "./items"
import { SidebarFooter } from "./footer"

export function DashboardSidebar() {
  return (
    <div className='w-full min-h-screen border-r bg-light-primary xl:flex hidden flex-col py-4'>
      <SidebarHeader />
      <SidebarItems />
      <SidebarFooter />
    </div>
  )
}
