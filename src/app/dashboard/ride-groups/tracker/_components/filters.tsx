"use client"

import { RideGroupTrackerGroupTypeFilter } from "./group-type-filter"
import { RideGroupTrackerSchoolFilter } from "./school-filter"
import { RideGroupTrackerRGList } from "./ride-groups-list"
import { SearchBar } from "@/components/dashboard/search-bar"

type Props = {
  searchParams: TObject
}

export const RideGroupTrackerFilters = ({ searchParams }: Props) => {
  return (
    <div className='col-span-2 p-4 space-y-8 h-screen overflow-y-scroll bg-blue-50 rounded-md shadow-sm'>
      <RideGroupTrackerGroupTypeFilter searchParams={searchParams} />
      <RideGroupTrackerSchoolFilter searchParams={searchParams} />
      <SearchBar parentClassName='my-0 xl:w-full' inputClassName='w-full' />
      <RideGroupTrackerRGList searchParams={searchParams} />
    </div>
  )
}
