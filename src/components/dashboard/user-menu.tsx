"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/auth/use-logout"
import { useUser } from "@/hooks/auth/use-user"
import { IMAGES } from "@/lib/constants"
import routes from "@/lib/routes"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export function UserMenu() {
  const { user } = useUser()
  const router = useRouter()

  const logout = useLogout()

  const t = useTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex items-center gap-2 px-2'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.profile_pic || "/placeholder.svg"} alt={user?.first_name || "Name of user"} />
            <AvatarFallback>{user?.first_name?.[0]}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-start text-sm'>
            <span className='font-medium'>{t("welcomeBack")}</span>
            <span className='text-xs text-gray-500'>{user?.first_name}</span>
          </div>
          <ChevronDown className='h-4 w-4 text-gray-500' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(routes.settings("account"))}>{t("settings")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(routes.settings("roles"))}>{t("roles")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout.mutate()}>{t("logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
