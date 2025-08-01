"use client"

import { useTranslations } from "next-intl"

import { RideGroupTrackerDriversList } from "./drivers-list"
import { RideGroupTrackerFilters } from "./filters"
import { RideGroupTrackerMap } from "./map"

type Props = {
  searchParams: TObject
}

type TMutation = {
  groupId: number
  driverId: number
}

export function RideGroupTracker({ searchParams }: Props) {
  const t = useTranslations()

  return (
    <div className='grid xl:grid-cols-9 gap-4 grid-cols-1'>
      <RideGroupTrackerDriversList searchParams={searchParams} />
      <RideGroupTrackerMap />
      <RideGroupTrackerFilters searchParams={searchParams} />
    </div>
  )
}
