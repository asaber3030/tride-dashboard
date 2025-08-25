"use client"

import { useRideGroupTrackerStore } from "@/store/ride-group-store"
import { usePaginatedRideGroups } from "../../_helpers/hooks"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

import { DefaultLoading } from "@/components/common/loader"
import { Building2Icon } from "lucide-react"
import { Label } from "@/components/ui/label"

type Props = {
  searchParams: TObject
}

export const RideGroupTrackerRGList = ({ searchParams }: Props) => {
  const t = useTranslations()

  const { data: rideGroups, isLoading, isRefetching, isError, error } = usePaginatedRideGroups(searchParams)
  const { rideGroupId, setRideGroupId } = useRideGroupTrackerStore()

  if (isLoading || isRefetching) return <LoadingState />
  if (isError) return <ErrorState error={error} />
  if (!rideGroups || rideGroups?.rideGroups?.length === 0) return <EmptyState />

  return (
    <div className='space-y-2'>
      <Label>{t("allRideGroups")}</Label>
      {rideGroups?.rideGroups?.map((rg) => (
        <div onClick={() => setRideGroupId(rg.id)} key={`ride_group_${rg.id}`} className={cn("p-2 bg-white rounded-lg cursor-pointer space-y-4 hover:bg-gray-50 select-none border-2 border-transparent", rideGroupId == rg.id && "border-2 border-blue-300")}>
          <div className='flex gap-2 items-center'>
            <div className='bg-yellow-50 size-12 rounded-full flex items-center justify-center'>
              <Building2Icon className='text-gray-500' />
            </div>
            <p className='truncate max-w-44'>{rg?.school?.school_name}</p>
          </div>

          <ul className='space-y-2'>
            <li className='flex items-center justify-between'>
              <span className='text-gray-700 font-semibold text-sm'>{t("groupId")}</span>
              <span className='text-gray-700 font-semibold text-sm'>{rg.id}</span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-gray-700 font-semibold text-sm'>{t("days")}</span>
              <span className='text-gray-700 font-semibold text-sm flex gap-2 truncate'>
                {rg.dayDates.map((item) => (
                  <span className='text-xs' key={`ride_group_day_${item.id}`}>
                    {item.date_day}
                  </span>
                ))}
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-gray-700 font-semibold text-sm'>{t("allSeatsTaken")}</span>
              <span className='text-gray-700 font-semibold text-sm'>{rg.current_seats_taken}</span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-gray-700 font-semibold text-sm'>{t("inviteCode")}</span>
              <span className='text-gray-700 font-semibold text-sm'>{rg.invite_code || "N/A"}</span>
            </li>
            {rg.driver && (
              <li className='flex items-center justify-between'>
                <span className='text-gray-700 font-semibold text-sm'>{t("driver")}</span>
                <span className='text-gray-700 font-semibold text-sm'>{rg.driver?.name || "N/A"}</span>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}

const LoadingState = () => {
  return <DefaultLoading variant='pinwheel' className='h-96 w-full' />
}

const ErrorState = ({ error }: { error: Error | null }) => {
  return <p className='text-red-500'>{error ? error.message : "An unknown error occurred while loading ride groups."}</p>
}

const EmptyState = () => {
  return <p className='text-gray-500'>No ride groups found.</p>
}
