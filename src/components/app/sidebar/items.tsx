"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { SidebarLinks } from "@/lib/lists"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export const SidebarItems = () => {
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <nav className='flex-1 p-2'>
      <ul className='space-y-1'>
        {SidebarLinks.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === item.href ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/10")}>
              <item.icon className='h-5 w-5' />
              {t(item.name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
