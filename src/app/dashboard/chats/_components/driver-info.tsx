"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTranslations } from "next-intl"

interface DriverInfoProps {
  onViewChange: (view: "chat" | "info" | "sidebar") => void
}

export function DriverInfo({ onViewChange }: DriverInfoProps) {
  const isMobile = useIsMobile()
  const t = useTranslations()

  return (
    <div className='h-full flex flex-col'>
      {isMobile && (
        <div className='p-4 border-b border-gray-200'>
          <Button variant='ghost' size='sm' className='flex items-center' onClick={() => onViewChange("chat")}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            {t("backToChat")}
          </Button>
        </div>
      )}

      <div className='flex-1 p-6 overflow-y-auto'>
        <div className='flex flex-col items-center mb-6'>
          <Avatar className='h-24 w-24 mb-4'>
            <AvatarImage src='/placeholder.svg?height=96&width=96' alt={t("driverName")} />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
          <h2 className='text-lg font-medium'>{t("driverName")}</h2>
          <span className='text-xs px-2 py-1 rounded bg-orange-100 text-orange-800 mt-1'>{t("driverRole")}</span>
        </div>

        <div className='space-y-4'>
          <InfoItem label={t("driverIdLabel")} value='INR-20230529-438' />
          <InfoItem label={t("groupIdLabel")} value='SGA-0579-A3F' />
          <InfoItem label={t("schoolLabel")} value={t("schoolName")} />
          <InfoItem label={t("phoneNumberLabel")} value='01234567890' />
          <InfoItem label={t("scheduledTimeLabel")} value='7:00 am - 2:00 pm' />
        </div>
      </div>
    </div>
  )
}

interface InfoItemProps {
  label: string
  value: string
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className='border-b border-gray-100 pb-3'>
      <p className='text-sm text-gray-500 mb-1'>{label}</p>
      <p className='text-sm font-medium'>{value}</p>
    </div>
  )
}
