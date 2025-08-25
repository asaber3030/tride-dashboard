"use client"

import routes from "@/lib/routes"

import { useTranslations } from "next-intl"

import { Users, Calendar, School, User } from "lucide-react"
import { FullRideGroup } from "@/types/models"
import { LinkBtn } from "@/components/common/link-button"
import { Badge } from "@/components/ui/badge"

type Props = {
  group: FullRideGroup
}

export const SingleRideGroupTrackingDetails = ({ group }: Props) => {
  const t = useTranslations()
  return (
    <div className='w-[420px] space-y-6 p-4 shadow rounded-md border bg-white'>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>{group.group_name}</h2>
          <Badge variant='secondary' className='text-xs'>
            ID: {group.id}
          </Badge>
        </div>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <Users className='h-4 w-4' />
            <span>
              {group.current_seats_taken} {t("seats")}
            </span>
          </div>
          <Badge variant='outline' className='text-xs'>
            {group.group_type}
          </Badge>
        </div>
      </div>

      <div className='space-y-3'>
        <h3 className='text-base font-medium flex items-center gap-2'>
          <User className='h-4 w-4' />
          {t("driverDetails")}
        </h3>
        {group.driver ? (
          <div className='space-y-3 pl-6'>
            <div className='flex items-center gap-3'>
              <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                <User className='h-5 w-5 text-primary' />
              </div>
              <div>
                <p className='font-medium'>{group.driver?.name}</p>
                <p className='text-sm text-muted-foreground'>{group.driver.phone}</p>
              </div>
            </div>
            <div className='bg-muted/30 rounded-lg p-3 border shadow-sm'>
              <p className='text-sm text-muted-foreground'>{group.driver.formatted_address}</p>
            </div>
          </div>
        ) : (
          <p className='text-sm text-muted-foreground'>{t("noDriverAssigned")}</p>
        )}
      </div>

      <div className='space-y-3'>
        <h3 className='text-base font-medium flex items-center gap-2'>
          <School className='h-4 w-4' />
          {t("schoolDetails")}
        </h3>
        <div className='space-y-3 pl-6'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center'>
              <School className='h-5 w-5 text-secondary-foreground' />
            </div>
            <div>
              <p className='font-medium'>{group.school.school_name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <h3 className='text-base font-medium flex items-center gap-2'>
          <Calendar className='h-4 w-4' />
          {t("scheduledDays")}
        </h3>
        <div className='pl-6'>
          <div className='grid grid-cols-2 gap-2'>
            {group.dayDates.map((day) => (
              <div key={day.id} className='bg-accent/50 rounded-lg p-2 text-center border shadow-sm'>
                <p className='text-xs font-medium text-accent-foreground'>{day.date_day}</p>
              </div>
            ))}
          </div>
          {group.dayDates.length === 0 && <p className='text-sm text-muted-foreground text-center py-4'>No scheduled days available</p>}
        </div>
      </div>

      <LinkBtn href={routes.liveTracking.singleHistory(group.id)} className='w-full mt-4'>
        {t("viewHistory")}
      </LinkBtn>
    </div>
  )
}
