"use client"

import { RideGroupInstance } from "@/types/models"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import moment from "moment"

type Props = {
  instance: RideGroupInstance
  checkpointsLength: number
}

export const InstanceDetails = ({ instance, checkpointsLength }: Props) => {
  const t = useTranslations()

  const statusColor = instance.status === "active" ? "bg-green-100 text-green-800" : instance.status === "ended" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"

  return (
    <Card className='rounded-2xl shadow-md border bg-white'>
      <CardHeader className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <CardTitle className='text-lg font-semibold'>
          {t("rideInstance")} #{instance.id}
        </CardTitle>
        <Badge className={`${statusColor} px-3 py-1 rounded-full capitalize`}>{instance.status}</Badge>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* Driver Info */}
        <div className='flex items-center gap-4'>
          <Image src={instance.driver?.profile_pic || "/images/default-avatar.png"} alt={instance.driver?.name || "Driver"} width={64} height={64} className='rounded-full border shadow-sm object-cover' />
          <div>
            <p className='text-base font-medium'>{instance.driver?.name}</p>
            <p className='text-sm text-gray-500'>{instance.driver?.phone}</p>
            <p className='text-xs text-gray-400'>
              {t("license")}: {instance.driver?.license_number}
            </p>
          </div>
        </div>

        {/* Instance Info */}
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div>
            <span className='block font-medium text-gray-600'>{t("groupId")}</span>
            <span className='block'>{instance.group_id}</span>
          </div>
          <div>
            <span className='block font-medium text-gray-600'>{t("checkpoints")}</span>
            <span className='block'>{checkpointsLength}</span>
          </div>
          <div>
            <span className='block font-medium text-gray-600'>{t("startedAt")}</span>
            <span className='block'>{instance.started_at ? moment(instance.started_at).format("LLL") : "-"}</span>
          </div>
          <div>
            <span className='block font-medium text-gray-600'>{t("endedAt")}</span>
            <span className='block'>{instance.ended_at ? moment(instance.ended_at).format("LLL") : "-"}</span>
          </div>
          <div>
            <span className='block font-medium text-gray-600'>{t("type")}</span>
            <span className='block capitalize'>{instance.type}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
