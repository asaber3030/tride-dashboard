"use client"

import { RideGroupTrackerGroupTypeFilter } from "./group-type-filter"
import { RideGroupTrackerSchoolFilter } from "./school-filter"
import { RideGroupTrackerRGList } from "./ride-groups-list"

type Props = {
  searchParams: TObject
}

export const RideGroupTrackerFilters = ({ searchParams }: Props) => {
  return (
    <div className='col-span-2 p-4 space-y-8 h-screen overflow-y-scroll bg-blue-50 rounded-md shadow-sm'>
      <RideGroupTrackerGroupTypeFilter searchParams={searchParams} />
      <RideGroupTrackerSchoolFilter searchParams={searchParams} />
      <RideGroupTrackerRGList searchParams={searchParams} />
    </div>
  )
}
