"use client"

import { useRideGroupTrackerStore } from "@/store/ride-group-store"
import { usePaginatedDrivers } from "@/app/dashboard/drivers/_helpers/hooks"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"

import { assignDriverToRideGroupAction } from "../../_helpers/actions"
import { cn, handleError, showResponse } from "@/lib/utils"
import { toast } from "react-toastify"

import { IMAGES } from "@/lib/constants"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingButton } from "@/components/common/loading-button"
import { SearchBar } from "@/components/dashboard/search-bar"

type Props = {
  searchParams: TObject
}

type TMutation = {
  driverId: number
  rideGroupId: number
}

export const RideGroupTrackerDriversList = ({ searchParams }: Props) => {
  const t = useTranslations()

  const { data, isLoading, isError, error } = usePaginatedDrivers(searchParams)
  const { driverId, rideGroupId, setRideGroupId, setDriverId } = useRideGroupTrackerStore()

  const assignMutation = useMutation({
    mutationFn: ({ rideGroupId, driverId }: TMutation) => assignDriverToRideGroupAction(rideGroupId, driverId),
    onSuccess: (data) =>
      showResponse(data, () => {
        setRideGroupId(null)
        setDriverId(null)
      }),
    onError: (error) => handleError(error)
  })

  const handleAssigningDriver = () => {
    if (!driverId || !rideGroupId) {
      toast.error(t("youHaveToSelectDriverAndRideGroup"))
      return
    }

    assignMutation.mutate({
      driverId,
      rideGroupId
    })
  }

  if (isLoading) return <RideGroupTrackerDriversListLoading />
  if (isError) return <RideGroupTrackerDriversListError error={error} />
  if (!data) return <RideGroupTrackerDriversListEmpty />
  if (data.drivers.length === 0) return <RideGroupTrackerDriversListEmpty />

  return (
    <div className='col-span-2 bg-gray-50 px-2 space-y-4'>
      <div>
        <SearchBar parentClassName='xl:w-full w-full' inputClassName='xl:w-full w-full' />
      </div>

      <div className='space-y-4'>
        {data?.drivers?.map((driver) => (
          <div key={`driver_${driver.id}`} onClick={() => setDriverId(driver.id)} className={cn("flex cursor-pointer border-2 border-transparent hover:bg-gray-100 p-2 rounded-md gap-2 transition-all items-center", driverId === driver.id && "bg-gray-100 border-blue-400")}>
            <Avatar>
              <AvatarFallback>{driver.name[0] + driver.name[1]}</AvatarFallback>
              <AvatarImage src={driver.profile_pic || IMAGES.user} />
            </Avatar>
            <p className='font-semibold'>{driver.name}</p>
          </div>
        ))}
      </div>

      {driverId && rideGroupId && (
        <LoadingButton className='w-full' onClick={handleAssigningDriver} loading={assignMutation.isPending}>
          {t("assignDriver")}
        </LoadingButton>
      )}
    </div>
  )
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='col-span-2 bg-gray-50 px-2 space-y-4'>
      <div>
        <SearchBar parentClassName='xl:w-full w-full' inputClassName='xl:w-full w-full' />
      </div>
      {children}
    </div>
  )
}

const RideGroupTrackerDriversListError = ({ error }: { error: Error }) => {
  return (
    <Wrapper>
      <div className='col-span-2 bg-red-50 px-2'>
        <p className='text-red-600'>Error loading drivers: {error.message}</p>
      </div>
    </Wrapper>
  )
}

const RideGroupTrackerDriversListEmpty = () => {
  return (
    <Wrapper>
      <div className='col-span-2 bg-gray-50 px-2'>
        <p className='text-gray-600'>No drivers found</p>
      </div>
    </Wrapper>
  )
}

const RideGroupTrackerDriversListLoading = () => {
  return (
    <Wrapper>
      <div className='col-span-2 bg-gray-50 px-2'>
        <div className='animate-pulse'>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
          <div className='h-10 bg-gray-200 rounded-md mb-4'></div>
        </div>
      </div>
    </Wrapper>
  )
}
