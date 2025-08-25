import React from "react"
import { MergeManyRideGroupsFilters } from "./_components/list-filter"
import { MergeManyRideGroupsList } from "./_components/merge"
import { PageHeader } from "@/components/dashboard/page-header"

export default function MergeManyRideGroupsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader hasSearch={false} title='Merge Many Ride Groups' description='Merge multiple ride groups into one. Select the ride groups you want to merge and choose a destination ride group.' />
      <MergeManyRideGroupsList />
    </div>
  )
}
