"use client"

import { usePaginatedRideGroups } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { RideGroupColumns } from "./columns"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TableAction } from "@/components/common/table-action"
import { RideGroupFilters } from "./filters"

type Props = {
  sp: TObject
}

export const RideGroupsTable = ({ sp }: Props) => {
  const { data: rideGroups, isLoading, isError, error } = usePaginatedRideGroups(sp)

  console.log(rideGroups)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-4'>
      <TableAction className='justify-end w-full block'>
        <RideGroupFilters sp={sp} />
      </TableAction>
      <DataTable data={rideGroups?.rows!} columns={RideGroupColumns} />
      <SimplePagination hasNextPage={rideGroups?.hasNextPage} hasPrevPage={rideGroups?.hasPrevPage} />
    </div>
  )
}
